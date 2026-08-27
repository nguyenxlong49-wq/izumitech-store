const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  const { q, category, sort } = req.query;
  let filter = {};
  if (category && category !== "all") filter.category = category;
  if (q) {
    const qq = q.trim();
    filter.name = { $regex: `^${qq}`, $options: "i" };
  }
  let query = Product.find(filter);
  if (sort === "price-asc") query = query.sort({ price: 1 });
  else if (sort === "price-desc") query = query.sort({ price: -1 });
  else if (sort === "rating") query = query.sort({ rating: -1 });
  else query = query.sort({ sold: -1 });
  const list = await query;
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ msg: "Không tìm thấy sản phẩm" });
  res.json(p);
});

router.post("/", async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
});

router.put("/:id", async (req, res) => {
  const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!p) return res.status(404).json({ msg: "Không tìm thấy" });
  res.json(p);
});

router.delete("/:id", async (req, res) => {
  const p = await Product.findByIdAndDelete(req.params.id);
  if (!p) return res.status(404).json({ msg: "Không tìm thấy" });
  res.json({ msg: "Đã xóa" });
});

module.exports = router;
