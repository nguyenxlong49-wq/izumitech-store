const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  phone: { type: String, default: "" },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    price: Number,
    qty: { type: Number, required: true, min: 1 }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "shipping", "done", "cancel"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
