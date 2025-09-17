const crypto = require("crypto");

// keys stockées en mémoire { key: { ownerId, createdAt, lastIp } }
let keys = new Map();

function generateKey(ownerId) {
  const key = crypto.randomBytes(24).toString("hex");
  keys.set(key, { ownerId, createdAt: new Date(), lastIp: null });
  return key;
}

function validateKey(key, ip) {
  const record = keys.get(key);
  if (!record) return false;
  if (record.lastIp && record.lastIp !== ip) {
    return false; // ip mismatch
  }
  record.lastIp = ip;
  return true;
}

function getOwner(key) {
  return keys.get(key)?.ownerId || null;
}

module.exports = { generateKey, validateKey, getOwner };
