const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("./userModel");
const sendEmail = require("./sendEmail");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "changeme";

function signToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "7d" });
}

// Middleware pour vérifier le token
function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}

// ➕ Register
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Missing fields" });

  const exists = await User.findOne({ $or: [{ username }, { email }] });
  if (exists) return res.status(409).json({ message: "User already exists" });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hash });
  res.status(201).json({ id: user._id, username: user.username });
});

// 🔑 Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = signToken(user);
  res.json({ token });
});

// 🙍‍♂️ Me
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("username email createdAt");
  res.json({ user });
});

// 🔁 Forgot password
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ ok: true }); // ne révèle rien

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExp = new Date(Date.now() + 1000 * 60 * 30);
  await user.save();

  const resetUrl = `${process.env.FRONT_URL}/reset-password?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Reset your Hebi password",
    html: `<p>Hello ${user.username},</p>
           <p>Click to reset: <a href="${resetUrl}">${resetUrl}</a></p>`,
  });

  res.json({ ok: true });
});

// 🔒 Reset password
router.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExp: { $gt: new Date() },
  });
  if (!user) return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = null;
  user.resetTokenExp = null;
  await user.save();

  res.json({ ok: true });
});

module.exports = router;
