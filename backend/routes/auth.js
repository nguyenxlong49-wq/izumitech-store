const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });
}

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: "Thiếu thông tin" });
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(400).json({ msg: "Email đã tồn tại" });
  const user = await User.create({ name, email: email.toLowerCase(), password });
  const token = signToken(user);
  res.status(201).json({ user, token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(400).json({ msg: "Email không tồn tại" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ msg: "Sai mật khẩu" });
  const token = signToken(user);
  res.json({ user, token });
});

module.exports = router;
