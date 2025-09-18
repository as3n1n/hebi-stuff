const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const fetch = require("node-fetch");
const crypto = require("crypto");
const AdmZip = require("adm-zip");
const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");

const app = express();

// 📂 Dossier uploads
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// 📄 Metadata
const META_PATH = path.join(UPLOADS_DIR, "metadata.json");
if (!fs.existsSync(META_PATH)) fs.writeFileSync(META_PATH, "{}");

function readMeta() {
  return JSON.parse(fs.readFileSync(META_PATH, "utf8"));
}
function writeMeta(data) {
  fs.writeFileSync(META_PATH, JSON.stringify(data, null, 2));
}

// 🧮 Hash
function getHashes(filePath) {
  const buffer = fs.readFileSync(filePath);
  return {
    md5: crypto.createHash("md5").update(buffer).digest("hex"),
    sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
  };
}

// 📦 Analyse interne
async function analyzeFile(filePath, ext) {
  let analysis = {};
  if (ext === ".zip") {
    try {
      const zip = new AdmZip(filePath);
      analysis.contents = zip.getEntries().map((e) => e.entryName);
    } catch {
      analysis.contents = ["Error reading archive"];
    }
  } else if ([".exe", ".dll", ".msi"].includes(ext)) {
    analysis.type = "executable";
  } else if ([".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
    analysis.type = "image";
    try {
      const imageBuffer = fs.readFileSync(filePath);
      const image = tf.node.decodeImage(imageBuffer, 3);
      const model = await nsfw.load();
      const predictions = await model.classify(image);
      image.dispose();
      analysis.nsfw = predictions.map(
        (p) => `${p.className}: ${(p.probability * 100).toFixed(2)}%`
      );
    } catch {
      analysis.nsfw = ["NSFW scan failed"];
    }
  }
  return analysis;
}

// 📤 Log vers HebiBot (webhook Discord)
async function logToDiscord(file, hashes, analysis) {
  if (!process.env.DISCORD_WEBHOOK) return;
  try {
    await fetch(process.env.DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "📂 New Upload",
            color: 0xff0000,
            fields: [
              { name: "File", value: file },
              { name: "MD5", value: hashes.md5 },
              { name: "SHA256", value: hashes.sha256 },
              ...(analysis.contents
                ? [{ name: "Archive Contents", value: analysis.contents.slice(0, 10).join("\n") }]
                : []),
              ...(analysis.type ? [{ name: "Detected Type", value: analysis.type }] : []),
              ...(analysis.nsfw ? [{ name: "NSFW Analysis", value: analysis.nsfw.join("\n") }] : []),
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch (err) {
    console.error("Discord log error:", err);
  }
}

// 📦 Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
});

app.use(
  cors({
    origin: ["https://javelin.asia", "https://www.javelin.asia"],
    credentials: true,
  })
);
app.use(express.json());

const BASE_URL = "https://upload.javelin.asia";

// ✅ Root test
app.get("/", (req, res) => res.send("✅ Hebi Upload is running"));

// ✅ Upload fichier local
app.post("/upload", upload.single("fileToUpload"), async (req, res) => {
  if (!req.file)
    return res.status(400).json({ success: false, error: "No file uploaded" });

  const filePath = path.join(UPLOADS_DIR, req.file.filename);
  const ext = path.extname(req.file.originalname).toLowerCase();

  const hashes = getHashes(filePath);
  const analysis = await analyzeFile(filePath, ext);

  const meta = readMeta();
  meta[req.file.filename] = {
    uploadedAt: Date.now(),
    hashes,
    analysis,
    isScreenshot: req.query.ss === "1" || false,
  };
  writeMeta(meta);

  await logToDiscord(req.file.filename, hashes, analysis);

  const fileUrl = `${BASE_URL}/files/${req.file.filename}`;
  const ssUrl = `${BASE_URL}/ss/${req.file.filename}`;
  const previewUrl = meta[req.file.filename].isScreenshot ? ssUrl : `${BASE_URL}/f/${req.file.filename}`;

  res.json({
    success: true,
    url: fileUrl,
    preview: previewUrl,
    delete: `${BASE_URL}/delete/${req.file.filename}`,
    analysis,
    expiresIn: meta[req.file.filename].isScreenshot ? "2 days" : "7 days",
  });
});

// ✅ Upload depuis une URL
app.post("/urlupload", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: false, error: "No URL provided" });

    const response = await fetch(url);
    if (!response.ok) return res.status(400).json({ success: false, error: "Failed to fetch URL" });

    const size = response.headers.get("content-length");
    if (size && parseInt(size) > 200 * 1024 * 1024) {
      return res.status(400).json({ success: false, error: "File too large (max 200MB)" });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const ext = mime.extension(contentType) ? "." + mime.extension(contentType) : "";

    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    const filePath = path.join(UPLOADS_DIR, filename);

    const buffer = await response.buffer();
    fs.writeFileSync(filePath, buffer);

    const hashes = getHashes(filePath);
    const analysis = await analyzeFile(filePath, ext);

    const meta = readMeta();
    meta[filename] = {
      uploadedAt: Date.now(),
      source: url,
      hashes,
      analysis,
      isScreenshot: false,
    };
    writeMeta(meta);

    await logToDiscord(filename, hashes, analysis);

    const fileUrl = `${BASE_URL}/files/${filename}`;
    const previewUrl = `${BASE_URL}/f/${filename}`;

    res.json({
      success: true,
      url: fileUrl,
      preview: previewUrl,
      delete: `${BASE_URL}/delete/${filename}`,
      analysis,
      expiresIn: "7 days",
    });
  } catch (err) {
    console.error("URL upload error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ✅ Fichiers bruts
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("❌ File not found");

  const contentType = mime.lookup(filePath) || "application/octet-stream";
  res.setHeader("Content-Type", contentType);
  res.sendFile(filePath);
});

// ✅ Preview screenshot (Discord embed utilise framed)
app.get("/ss/:filename", (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("Screenshot not found");

  const fileUrl = `${BASE_URL}/files/${req.params.filename}`;
  const framedUrl = `${BASE_URL}/framed/${req.params.filename}`;

  res.send(`
    <html>
      <head>
        <meta property="og:title" content="Hebi Screenshot" />
        <meta property="og:image" content="${framedUrl}" />
        <meta name="theme-color" content="#ff0000" />
        <style>
          body {
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .frame {
            border: 3px solid red;
            box-shadow: 0 0 30px rgba(255,0,0,0.8);
            border-radius: 12px;
            padding: 10px;
            background: black;
            max-width: 95%;
          }
          img {
            display: block;
            max-width: 100%;
            height: auto;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="frame">
          <img src="${fileUrl}" alt="Screenshot"/>
        </div>
      </body>
    </html>
  `);
});

// ✅ Image encadrée pour Discord embed
app.get("/framed/:filename", (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("❌ File not found");

  const fileUrl = `${BASE_URL}/files/${req.params.filename}`;
  res.send(`
    <html>
      <head>
        <style>
          body {
            margin: 0;
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .frame {
            border: 6px solid black;
            outline: 3px solid red;
            box-shadow: 0 0 40px rgba(255,0,0,0.9);
            border-radius: 12px;
            padding: 5px;
          }
          img {
            display: block;
            max-width: 90%;
            height: auto;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="frame">
          <img src="${fileUrl}" />
        </div>
      </body>
    </html>
  `);
});

// ✅ Delete (clé API)
app.delete("/delete/:filename", (req, res) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.API_KEY) return res.status(403).json({ success: false, error: "Forbidden" });

  const filename = req.params.filename;
  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) return res.status(404).json({ success: false, error: "File not found" });

  fs.unlinkSync(filePath);
  const meta = readMeta();
  delete meta[filename];
  writeMeta(meta);

  res.json({ success: true, message: `Deleted ${filename}` });
});

// 🧹 Auto-delete (2j screenshot / 7j autres)
setInterval(() => {
  const meta = readMeta();
  const now = Date.now();
  const twoDays = 2 * 24 * 60 * 60 * 1000;
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  let changed = false;

  for (const [filename, info] of Object.entries(meta)) {
    const maxAge = info.isScreenshot ? twoDays : sevenDays;
    if (now - info.uploadedAt > maxAge) {
      const filePath = path.join(UPLOADS_DIR, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      delete meta[filename];
      changed = true;
    }
  }
  if (changed) writeMeta(meta);
}, 1000 * 60 * 60);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Hebi Upload running on port ${PORT}`));
