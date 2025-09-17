const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const fetch = require("node-fetch"); // ➡️ pour récupérer fichiers distants

const app = express();

// 📂 Dossier uploads
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// 📄 Metadata des fichiers
const META_PATH = path.join(UPLOADS_DIR, "metadata.json");
if (!fs.existsSync(META_PATH)) fs.writeFileSync(META_PATH, "{}");

function readMeta() {
  return JSON.parse(fs.readFileSync(META_PATH, "utf8"));
}
function writeMeta(data) {
  fs.writeFileSync(META_PATH, JSON.stringify(data, null, 2));
}

// 📦 Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
});

app.use(cors({ origin: ["https://javelin.asia", "https://www.javelin.asia"], credentials: true }));
app.use(express.json());

// 🌐 Base URL
const BASE_URL = "https://upload.javelin.asia";

// ✅ Root test
app.get("/", (req, res) => res.send("✅ Hebi Upload is running"));

// ✅ File upload
app.post("/upload", upload.single("fileToUpload"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });

  const meta = readMeta();
  meta[req.file.filename] = { uploadedAt: Date.now() };
  writeMeta(meta);

  const fileUrl = `${BASE_URL}/files/${req.file.filename}`;
  const previewUrl = `${BASE_URL}/f/${req.file.filename}`;

  res.json({ success: true, url: fileUrl, preview: previewUrl, expiresIn: "7 days" });
});

// ✅ Upload depuis une URL (Insta / TikTok / YT / FB…)
app.post("/urlupload", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ success: false, error: "No URL provided" });

    // Téléchargement
    const response = await fetch(url);
    if (!response.ok) return res.status(400).json({ success: false, error: "Failed to fetch URL" });

    // Vérif taille
    const size = response.headers.get("content-length");
    if (size && parseInt(size) > 200 * 1024 * 1024) {
      return res.status(400).json({ success: false, error: "File too large (max 200MB)" });
    }

    // Extension approximative
    const contentType = response.headers.get("content-type") || "application/octet-stream";
    const ext = mime.extension(contentType) ? "." + mime.extension(contentType) : "";

    // Nom unique
    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    const filePath = path.join(UPLOADS_DIR, filename);

    // Sauvegarde fichier
    const buffer = await response.buffer();
    fs.writeFileSync(filePath, buffer);

    // Ajout metadata
    const meta = readMeta();
    meta[filename] = { uploadedAt: Date.now(), source: url };
    writeMeta(meta);

    const fileUrl = `${BASE_URL}/files/${filename}`;
    const previewUrl = `${BASE_URL}/f/${filename}`;

    res.json({ success: true, url: fileUrl, preview: previewUrl, expiresIn: "7 days" });
  } catch (err) {
    console.error("URL upload error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// ✅ Serve raw files
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("❌ File not found");

  const contentType = mime.lookup(filePath) || "application/octet-stream";
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", "inline");
  res.setHeader("Cache-Control", "public, max-age=31536000");

  res.sendFile(filePath);
});

// ✅ Preview
app.get("/f/:filename", (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("❌ File not found");

  const mimeType = mime.lookup(filePath) || "application/octet-stream";
  const fileUrl = `${BASE_URL}/files/${req.params.filename}`;

  let metaTags = `
    <meta property="og:title" content="Hebi File" />
    <meta property="og:description" content="Shared via Hebi (expires in 7 days)" />
    <meta property="og:url" content="${fileUrl}" />
  `;

  if (mimeType.startsWith("image/")) {
    metaTags += `<meta property="og:image" content="${fileUrl}" />`;
  } else if (mimeType.startsWith("video/")) {
    metaTags += `
      <meta property="og:type" content="video.other" />
      <meta property="og:video" content="${fileUrl}" />
      <meta property="og:video:type" content="${mimeType}" />
      <meta property="og:image" content="${fileUrl}" />
    `;
  }

  res.send(`
    <html>
      <head>${metaTags}<meta name="theme-color" content="#ff0000" /></head>
      <body style="background:black;color:white;text-align:center;padding:50px">
        <h2>📂 Hebi File</h2>
        <p>Redirecting to file...</p>
        <a href="${fileUrl}" style="color:red">Click here if not redirected</a>
        <script>setTimeout(()=>window.location.href="${fileUrl}", 1000)</script>
      </body>
    </html>
  `);
});

// ✅ Status route
app.get("/status", (req, res) => {
  const meta = readMeta();
  const filesCount = Object.keys(meta).length;

  const today = new Date().toDateString();
  const logFile = path.join(UPLOADS_DIR, "deletion.log");

  let deletedToday = 0;
  if (fs.existsSync(logFile)) {
    const lines = fs.readFileSync(logFile, "utf8").split("\n");
    deletedToday = lines.filter((l) => l.includes(today)).length;
  }

  res.json({ api: "online", filesCount, deletedToday, timestamp: new Date() });
});

// 🧹 Cron → auto delete après 7 jours
setInterval(() => {
  const meta = readMeta();
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  let changed = false;

  for (const [filename, info] of Object.entries(meta)) {
    if (now - info.uploadedAt > sevenDays) {
      const filePath = path.join(UPLOADS_DIR, filename);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      delete meta[filename];
      changed = true;
      fs.appendFileSync(path.join(UPLOADS_DIR, "deletion.log"), `${new Date().toISOString()} - Deleted ${filename}\n`);
      console.log(`🗑️ Deleted expired file: ${filename}`);
    }
  }

  if (changed) writeMeta(meta);
}, 1000 * 60 * 60);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Hebi Upload running on port ${PORT}`));
