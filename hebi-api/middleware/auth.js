const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

const keysPath = path.join(__dirname, "../data/keys.json");
const bansPath = path.join(__dirname, "../data/bans.json");

function readJSON(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// notify bot of abuse
async function alertBot(userId, ip, reason) {
  try {
    await fetch(process.env.BOT_ALERT_URL || "http://hebi-bot-service:3002/api/alert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, ip, reason })
    });
  } catch (err) {
    console.error("❌ Failed to notify bot:", err);
  }
}

function auth(req, res, next) {
  const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.ip;
  const key = req.headers["x-api-key"];

  let keys = readJSON(keysPath, {});
  let bans = readJSON(bansPath, []);

  // banned IP
  if (bans.includes(ip)) {
    alertBot(process.env.ADMIN_ID || "616042338325626890", ip, "Banned IP tried to connect");
    return res.status(403).json({ success: false, error: "You are permanently banned." });
  }

  // invalid key
  if (!key || !keys[key]) {
    alertBot(process.env.ADMIN_ID || "616042338325626890", ip, "Invalid or missing key");
    return res.status(401).json({ success: false, error: "Invalid or missing key." });
  }

  // first use → lock IP
  if (!keys[key].lastIp) {
    keys[key].lastIp = ip;
    writeJSON(keysPath, keys);
    return next();
  }

  // same IP → ok
  if (keys[key].lastIp === ip) {
    return next();
  }

  // IP mismatch → ban
  bans.push(ip);
  writeJSON(bansPath, bans);
  const owner = keys[key].ownerId;
  delete keys[key];
  writeJSON(keysPath, keys);

  alertBot(owner || process.env.ADMIN_ID || "616042338325626890", ip, "Key sharing detected");

  return res.status(403).json({ success: false, error: "Key misuse detected. You are banned." });
}

module.exports = auth;
