const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email:    { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true },
  resetToken: { type: String, default: null },
  resetTokenExp: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
