const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const u = await User.findById(req.params.id);
  if (!u) return res.status(404).json({ msg: "Không tìm thấy user" });
  res.json(u);
});

router.put("/:id", async (req, res) => {
  const { name, phone, address, role } = req.body;
  const u = await User.findByIdAndUpdate(req.params.id, { name, phone, address, role }, { new: true });
  if (!u) return res.status(404).json({ msg: "Không tìm thấy" });
  res.json(u);
});

router.delete("/:id", async (req, res) => {
  const u = await User.findByIdAndDelete(req.params.id);
  if (!u) return res.status(404).json({ msg: "Không tìm thấy" });
  res.json({ msg: "Đã xóa user" });
});

module.exports = router;
