const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// chemin vers le fichier partagé avec hebi-api
const keysPath = path.join(__dirname, "../../hebi-api/data/keys.json");

function readJSON(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function generateKey(ownerId) {
  const keys = readJSON(keysPath, {});
  const key = crypto.randomBytes(24).toString("hex");

  keys[key] = {
    ownerId,
    createdAt: new Date().toISOString(),
    lastIp: null
  };

  writeJSON(keysPath, keys);
  return key;
}

function validateKey(key, ip) {
  const keys = readJSON(keysPath, {});
  const record = keys[key];
  if (!record) return false;

  if (record.lastIp && record.lastIp !== ip) {
    return false; // ip mismatch
  }

  record.lastIp = ip;
  keys[key] = record;
  writeJSON(keysPath, keys);

  return true;
}

function getOwner(key) {
  const keys = readJSON(keysPath, {});
  return keys[key]?.ownerId || null;
}

module.exports = { generateKey, validateKey, getOwner };
