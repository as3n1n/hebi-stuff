const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Render mount path
const dataDir = process.env.DATA_DIR || "/opt/render/project/data";
const keysPath = path.join(dataDir, "keys.json");

// init file if missing
if (!fs.existsSync(keysPath)) {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(keysPath, "{}");
}

function readKeys() {
  return JSON.parse(fs.readFileSync(keysPath, "utf8"));
}

function writeKeys(keys) {
  fs.writeFileSync(keysPath, JSON.stringify(keys, null, 2));
}

function generateKey(ownerId) {
  try {
    const keys = readKeys();
    const key = crypto.randomBytes(24).toString("hex");

    keys[key] = {
      ownerId,
      createdAt: new Date().toISOString(),
      lastIp: null
    };

    writeKeys(keys);
    return key;
  } catch (err) {
    console.error("❌ Failed to generate key:", err);
    return null;
  }
}

function validateKey(key, ip) {
  const keys = readKeys();
  const record = keys[key];
  if (!record) return false;

  if (record.lastIp && record.lastIp !== ip) return false;

  record.lastIp = ip;
  writeKeys(keys);
  return true;
}

function getOwner(key) {
  const keys = readKeys();
  return keys[key]?.ownerId || null;
}

module.exports = { generateKey, validateKey, getOwner };
