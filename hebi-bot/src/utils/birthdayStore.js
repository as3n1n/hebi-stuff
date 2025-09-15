const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../../birthdays.json");

function load() {
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file));
}

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function setBirthday(userId, date) {
  const db = load();
  db[userId] = date;
  save(db);
}

function getBirthday(userId) {
  const db = load();
  return db[userId] || null;
}

function deleteBirthday(userId) {
  const db = load();
  delete db[userId];
  save(db);
}

function getAll() {
  return load();
}

module.exports = { setBirthday, getBirthday, deleteBirthday, getAll };
