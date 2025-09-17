const express = require("express");
const path = require("path");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const DIST = path.join(__dirname, "dist");

app.use(cors());
app.use(express.json());
app.use(express.static(DIST));

// Middleware optionnel si tu veux protéger certaines routes
async function checkKey(req, res, next) {
  const key = req.headers["x-api-key"] || req.query.key;
  if (!key) return res.redirect("/"); // redirige vers home si pas de clé

  try {
    const r = await fetch("https://api.javelin.asia/api/validate-key", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key },
    });
    const data = await r.json();
    if (!data.success) return res.redirect("/");
    next();
  } catch {
    return res.redirect("/");
  }
}

// Routes publiques
app.get("/", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/faq", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/status", (req, res) => res.sendFile(path.join(DIST, "index.html")));

// Routes protégées (facultatif)
app.get("/upload", checkKey, (req, res) => res.sendFile(path.join(DIST, "index.html")));
app.get("/docs", checkKey, (req, res) => res.sendFile(path.join(DIST, "index.html")));

// Catch-all → React Router
app.get("*", (req, res) => res.sendFile(path.join(DIST, "index.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Hebi-site running on ${PORT}`));
