const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const auth = require("./middleware/auth");

const app = express();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 200 * 1024 * 1024 } // 200MB
});

app.use(cors({
  origin: ["https://javelin.asia", "https://www.javelin.asia"],
  credentials: true
}));
app.use(express.json());

// ✅ root test
app.get("/", (req, res) => res.send("✅ Hebi API is running"));

// ✅ validate key
app.post("/api/validate-key", auth, (req, res) => {
  res.json({ success: true, message: "Key validated successfully" });
});

// ✅ file upload
app.post("/api/fileupload", auth, upload.single("fileToUpload"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });

  const fileUrl = `https://api.javelin.asia/files/${req.file.filename}`;
  const previewUrl = `https://api.javelin.asia/f/${req.file.filename}`;

  res.json({ success: true, file: req.file.filename, url: fileUrl, preview: previewUrl });
});

// ✅ url upload (simulé pour l’instant)
app.post("/api/urlupload", auth, (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ success: false, error: "No URL provided" });
  res.json({ success: true, url });
});

// ✅ delete files
app.post("/api/deletefiles", auth, (req, res) => {
  const { files } = req.body;
  if (!files) return res.status(400).json({ success: false, error: "Missing files" });
  res.json({ success: true, deleted: files });
});

// ✅ album routes
app.post("/api/createalbum", auth, (req, res) => res.json({ success: true, album: { id: "abc123", ...req.body } }));
app.post("/api/editalbum", auth, (req, res) => res.json({ success: true, album: req.body }));
app.post("/api/addtoalbum", auth, (req, res) => res.json({ success: true, added: req.body.files }));
app.post("/api/removefromalbum", auth, (req, res) => res.json({ success: true, removed: req.body.files }));
app.post("/api/deletealbum", auth, (req, res) => res.json({ success: true, deleted: req.body.short }));

// ✅ unban (admin only)
app.post("/api/unban", (req, res) => {
  const { ip, secret } = req.body;
  if (secret !== process.env.API_ADMIN_SECRET) {
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  const bansPath = path.join(__dirname, "data/bans.json");
  let bans = [];
  if (fs.existsSync(bansPath)) {
    bans = JSON.parse(fs.readFileSync(bansPath, "utf8"));
  }

  const index = bans.indexOf(ip);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "IP not found in bans" });
  }

  bans.splice(index, 1);
  fs.writeFileSync(bansPath, JSON.stringify(bans, null, 2));
  return res.json({ success: true, message: `IP ${ip} has been unbanned` });
});

// ✅ serve raw files
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");

  const contentType = mime.lookup(filePath) || "application/octet-stream";
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", "inline");

  res.sendFile(filePath);
});

// ✅ Discord embed preview
app.get("/f/:filename", (req, res) => {
  const fileUrl = `https://api.javelin.asia/files/${req.params.filename}`;
  res.send(`
    <html>
      <head>
        <meta property="og:title" content="Hebi File"/>
        <meta property="og:description" content="Shared via Hebi"/>
        <meta property="og:type" content="video.other"/>
        <meta property="og:video" content="${fileUrl}"/>
        <meta property="og:video:type" content="video/mp4"/>
        <meta property="og:image" content="${fileUrl}"/>
      </head>
      <body style="background:black;color:white;text-align:center;padding:50px">
        <p>Redirecting...</p>
        <script>window.location="${fileUrl}"</script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Hebi API running on port ${PORT}`));
