const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const app = express();

// 📂 Dossier uploads
const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// 📄 Metadata des fichiers (date d'upload)
const META_PATH = path.join(UPLOADS_DIR, "metadata.json");
if (!fs.existsSync(META_PATH)) fs.writeFileSync(META_PATH, "{}");

function readMeta() {
  return JSON.parse(fs.readFileSync(META_PATH, "utf8"));
}
function writeMeta(data) {
  fs.writeFileSync(META_PATH, JSON.stringify(data, null, 2));
}

// 📦 Multer config → max 200MB
const upload = multer({
  dest: UPLOADS_DIR,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
});

app.use(
  cors({
    origin: ["https://javelin.asia", "https://www.javelin.asia"],
    credentials: true,
  })
);
app.use(express.json());

// ✅ Root test
app.get("/", (req, res) => res.send("✅ Hebi API is running"));

// ✅ File upload
app.post("/api/fileupload", upload.single("fileToUpload"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  // Ajout dans metadata
  const meta = readMeta();
  meta[req.file.filename] = { uploadedAt: Date.now() };
  writeMeta(meta);

  const fileUrl = `https://api.javelin.asia/files/${req.file.filename}`;
  const previewUrl = `https://api.javelin.asia/f/${req.file.filename}`;

  return res.json({
    success: true,
    file: req.file.filename,
    url: fileUrl,
    preview: previewUrl,
    expiresIn: "7 days",
  });
});

// ✅ Serve raw files
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("❌ File not found");

  const contentType = mime.lookup(filePath) || "application/octet-stream";
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", "inline");
  res.setHeader("Cache-Control", "public, max-age=31536000");

  return res.sendFile(filePath);
});

// ✅ Serve preview (Discord embed)
app.get("/f/:filename", (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("❌ File not found");

  const mimeType = mime.lookup(filePath) || "application/octet-stream";
  const fileUrl = `https://api.javelin.asia/files/${req.params.filename}`;

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
app.get("/api/status", (req, res) => {
  const meta = readMeta();
  const filesCount = Object.keys(meta).length;

  // calcul fichiers supprimés aujourd’hui
  const today = new Date().toDateString();
  const logFile = path.join(UPLOADS_DIR, "deletion.log");

  let deletedToday = 0;
  if (fs.existsSync(logFile)) {
    const lines = fs.readFileSync(logFile, "utf8").split("\n");
    deletedToday = lines.filter((l) => l.includes(today)).length;
  }

  res.json({
    api: "online",
    filesCount,
    deletedToday,
    timestamp: new Date(),
  });
});

// 🧹 Cron → suppression auto après 7 jours
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

      // log suppression
      fs.appendFileSync(
        path.join(UPLOADS_DIR, "deletion.log"),
        `${new Date().toISOString()} - Deleted ${filename}\n`
      );

      console.log(`🗑️ Deleted expired file: ${filename}`);
    }
  }

  if (changed) writeMeta(meta);
}, 1000 * 60 * 60); // toutes les heures

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Hebi API running on port ${PORT}`));
