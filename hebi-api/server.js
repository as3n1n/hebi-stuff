const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");

const app = express();
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
});

app.use(cors({
  origin: ["https://javelin.asia", "https://www.javelin.asia"],
  credentials: true,
}));
app.use(express.json());

// root test
app.get("/", (req, res) => res.send("✅ Hebi API is running"));

// File upload (public)
app.post("/api/fileupload", upload.single("fileToUpload"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: "No file uploaded" });
  }

  const fileUrl = `https://api.javelin.asia/files/${req.file.filename}`;
  const previewUrl = `https://api.javelin.asia/f/${req.file.filename}`;

  return res.json({
    success: true,
    file: req.file.filename,
    url: fileUrl,
    preview: previewUrl,
  });
});

// Serve direct files (raw access)
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");

  const contentType = mime.lookup(filePath) || "application/octet-stream";
  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", "inline");

  return res.sendFile(filePath);
});

// Serve preview for Discord embeds
app.get("/f/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const mimeType = mime.lookup(filePath) || "application/octet-stream";
  const fileUrl = `https://api.javelin.asia/files/${req.params.filename}`;

  let metaTags = `
    <meta property="og:title" content="Hebi File" />
    <meta property="og:description" content="Shared via Hebi" />
  `;

  if (mimeType.startsWith("image/")) {
    //  Image preview
    metaTags += `<meta property="og:image" content="${fileUrl}" />`;
  } else if (mimeType.startsWith("video/")) {
    // Video preview
    metaTags += `
      <meta property="og:video" content="${fileUrl}" />
      <meta property="og:video:type" content="${mimeType}" />
      <meta property="og:image" content="${fileUrl}" />
    `;
  } else {
    // Default file
    metaTags += `<meta property="og:url" content="${fileUrl}" />`;
  }

  res.send(`
    <html>
      <head>
        ${metaTags}
      </head>
      <body style="background:black;color:white;text-align:center;padding:50px">
        <p>Redirecting to file...</p>
        <script>window.location.href="${fileUrl}"</script>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Hebi API running on port ${PORT}`));
