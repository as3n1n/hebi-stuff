const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const DIST = path.join(__dirname, "dist");

app.use(cors());
app.use(express.json());
app.use(express.static(DIST));

// ✅ Routes publiques (plus de clés, tout est public)
app.get("/", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/faq", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/status", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/upload", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/docs", (req, res) => res.sendFile(path.join(DIST, "index.html")));

// ✅ Catch-all → React Router
app.get("*", (req, res) => res.sendFile(path.join(DIST, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Hebi-site running on ${PORT}`));
