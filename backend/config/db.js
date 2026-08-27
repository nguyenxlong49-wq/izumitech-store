const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/izumitech";
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB đã kết nối:", uri);
  } catch (err) {
    console.error("❌ Lỗi kết nối MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
