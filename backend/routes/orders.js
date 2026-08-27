const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.get("/", async (req, res) => {
  const list = await Order.find().populate("items.product").sort({ createdAt: -1 });
  res.json(list);
});

router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json(order);
});

router.get("/stats/bestsellers", async (req, res) => {
  const top = await Order.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$items.name", totalQty: { $sum: "$items.qty" }, revenue: { $sum: { $multiply: ["$items.price", "$items.qty"] } } } },
    { $sort: { totalQty: -1 } },
    { $limit: 5 }
  ]);
  res.json(top);
});

router.get("/stats/loyal", async (req, res) => {
  const loyal = await Order.aggregate([
    { $group: { _id: "$customerEmail", name: { $first: "$customerName" }, totalSpent: { $sum: "$total" }, orderCount: { $sum: 1 }, totalItems: { $sum: { $sum: "$items.qty" } } } },
    { $sort: { totalSpent: -1 } },
    { $limit: 5 }
  ]);
  res.json(loyal);
});

module.exports = router;
