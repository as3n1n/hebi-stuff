const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const DIST = path.join(__dirname, "dist");

app.use(cors());
app.use(express.json());
app.use(express.static(DIST));

// Middleware pour check clé
async function checkKey(req, res, next) {
  const key = req.headers["x-api-key"] || req.query.key;
  if (!key) return res.sendFile(path.join(DIST, "invite.html"));

  try {
    const r = await fetch("https://api.javelin.asia/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key }
    });
    const data = await r.json();
    if (!data.success) return res.sendFile(path.join(DIST, "invite.html"));
    next();
  } catch {
    return res.sendFile(path.join(DIST, "invite.html"));
  }
}

// Routes publiques
app.get("/", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/faq", (req, res) => res.sendFile(path.join(DIST, "index.html")));

// Routes protégées
app.get("/upload", checkKey, (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/docs", checkKey, (req, res) => res.sendFile(path.join(DIST, "index.html")));

// Catch-all → React router
app.get("*", (req, res) => res.sendFile(path.join(DIST, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Hebi-site running on ${PORT}`));
