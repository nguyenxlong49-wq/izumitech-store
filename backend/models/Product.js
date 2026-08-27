const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ["phone", "laptop", "tablet", "pc", "gear", "accessory"] },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, default: null },
  rating: { type: Number, default: 4.5, min: 1, max: 5 },
  sold: { type: Number, default: 0, min: 0 },
  stock: { type: Number, default: 20, min: 0 },
  icon: { type: String, default: "📦" },
  color: { type: String, default: "#3b4a6b" },
  image: { type: String, default: "" },
  specs: { type: Map, of: String, default: {} }
}, { timestamps: true });

productSchema.index({ name: "text", category: 1 });

module.exports = mongoose.model("Product", productSchema);
