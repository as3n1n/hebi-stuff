const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const auth = require("./middleware/auth");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors({
  origin: ["https://javelin.asia", "https://www.javelin.asia"], // autoriser ton site
  credentials: true
}));
app.use(express.json());

// root
app.get("/", (req, res) => res.send("✅ Hebi API is running"));

// validate key (fixe pour ton site)
app.post("/api/validate-key", auth, (req, res) => {
  res.json({ success: true, message: "Key validated successfully" });
});

// file upload
app.post("/api/fileupload", auth, upload.single("fileToUpload"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });
  res.json({ success: true, file: req.file.filename });
});

// url upload
app.post("/api/urlupload", auth, (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ success: false, error: "No URL provided" });
  res.json({ success: true, url });
});

// delete files
app.post("/api/deletefiles", auth, (req, res) => {
  const { files } = req.body;
  if (!files) return res.status(400).json({ success: false, error: "Missing files" });
  res.json({ success: true, deleted: files });
});

// albums
app.post("/api/createalbum", auth, (req, res) => {
  res.json({ success: true, album: { id: "abc123", ...req.body } });
});
app.post("/api/editalbum", auth, (req, res) => {
  res.json({ success: true, album: req.body });
});
app.post("/api/addtoalbum", auth, (req, res) => {
  res.json({ success: true, added: req.body.files });
});
app.post("/api/removefromalbum", auth, (req, res) => {
  res.json({ success: true, removed: req.body.files });
});
app.post("/api/deletealbum", auth, (req, res) => {
  res.json({ success: true, deleted: req.body.short });
});

// unban route (admin only)
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

  // remove IP from bans.json
  bans.splice(index, 1);
  fs.writeFileSync(bansPath, JSON.stringify(bans, null, 2));

  return res.json({ success: true, message: `IP ${ip} has been unbanned` });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Hebi API running on port ${PORT}`));
