require("dotenv").config();
const connectDB = require("./config/db");
const Product = require("./models/Product");
const User = require("./models/User");

const products = [
  { name: "iPhone 15 Pro Max 256GB", category: "phone", price: 29990000, oldPrice: 34990000, rating: 4.9, sold: 1200, stock: 15, icon: "📱", color: "#3b4a6b", specs: { "Chip": "A17 Pro 6 nhân", "RAM": "8GB", "Bộ nhớ": "256GB NVMe", "Pin": "4422mAh, sạc nhanh 27W + MagSafe", "Camera sau": "48MP + 12MP + 12MP tele 5x", "Camera trước": "12MP TrueDepth", "Màn hình": "6.7\" Super Retina XDR 120Hz", "Loa": "Stereo Dolby Atmos", "HĐH": "iOS 17" } },
  { name: "Samsung Galaxy S24 Ultra 512GB", category: "phone", price: 27490000, oldPrice: 31990000, rating: 4.8, sold: 890, stock: 0, icon: "📱", color: "#5a3b6b", specs: { "Chip": "Snapdragon 8 Gen 3", "RAM": "12GB", "Bộ nhớ": "512GB UFS 4.0", "Pin": "5000mAh, sạc 45W", "Camera sau": "200MP + 12MP + 50MP + 10MP", "Camera trước": "12MP", "Màn hình": "6.8\" Dynamic AMOLED 2X 120Hz", "Loa": "Stereo AKG", "Bút": "S Pen" } },
  { name: "Xiaomi 14T Pro 5G 12GB/512GB", category: "phone", price: 14990000, oldPrice: 17990000, rating: 4.7, sold: 2100, stock: 3, icon: "📱", color: "#2f5545", specs: { "Chip": "Dimensity 9300+", "RAM": "12GB LPDDR5X", "Bộ nhớ": "512GB UFS 4.0", "Pin": "5000mAh, sạc 120W", "Camera sau": "50MP Leica + 50MP + 12MP", "Camera trước": "32MP", "Màn hình": "6.67\" AMOLED 144Hz", "Loa": "Stereo Hi-Res" } },
  { name: "MacBook Air M3 13\" 8GB/256GB", category: "laptop", price: 26990000, oldPrice: 28990000, rating: 4.9, sold: 640, stock: 8, icon: "💻", color: "#4a4a55", specs: { "Chip": "Apple M3 8/10 nhân", "RAM": "8GB Unified", "Ổ cứng": "256GB SSD", "Pin": "52.6Wh ~18h", "Màn hình": "13.6\" Liquid Retina", "Loa": "4 loa Spatial Audio", "Camera": "1080p FaceTime" } },
  { name: "ASUS ROG Strix G16 RTX 4070", category: "laptop", price: 45990000, oldPrice: 52990000, rating: 4.8, sold: 320, stock: 0, icon: "💻", color: "#1f3a5f", specs: { "Chip": "i7-13650HX", "Card": "RTX 4070 8GB", "RAM": "16GB DDR5", "Ổ cứng": "1TB NVMe", "Màn hình": "16\" 2.5K 240Hz", "Loa": "Dolby Atmos" } },
  { name: "Lenovo ThinkPad X1 Carbon Gen 12", category: "laptop", price: 38990000, oldPrice: null, rating: 4.7, sold: 150, stock: 12, icon: "💻", color: "#33383d", specs: { "Chip": "Core Ultra 7 155H", "RAM": "32GB LPDDR5X", "Ổ cứng": "1TB SSD", "Màn hình": "14\" 2.8K OLED 120Hz", "Loa": "Harman 4 loa" } },
  { name: "iPad Pro M4 11\" WiFi 256GB", category: "tablet", price: 27990000, oldPrice: 30990000, rating: 4.9, sold: 430, stock: 5, icon: "📲", color: "#44465e", specs: { "Chip": "Apple M4", "RAM": "8GB", "Bộ nhớ": "256GB", "Pin": "38.99Wh", "Camera": "12MP + LiDAR", "Màn hình": "11\" Ultra Retina XDR OLED", "Loa": "4 loa" } },
  { name: "Samsung Galaxy Tab S9 FE+", category: "tablet", price: 11990000, oldPrice: 13990000, rating: 4.6, sold: 780, stock: 20, icon: "📲", color: "#2d4a3e", specs: { "Chip": "Exynos 1380", "RAM": "8GB", "Pin": "10090mAh", "Màn hình": "12.4\" IPS 90Hz", "Loa": "AKG Stereo", "Chống nước": "IP68 + S Pen" } },
  { name: "PC Gaming Ryzen 7 / RTX 4060 / 32GB", category: "pc", price: 24990000, oldPrice: 27990000, rating: 4.8, sold: 210, stock: 2, icon: "🖥️", color: "#3a2f52", specs: { "CPU": "Ryzen 7 7700", "GPU": "RTX 4060 8GB", "RAM": "32GB DDR5", "Ổ cứng": "1TB NVMe", "Nguồn": "650W Bronze", "Loa": "Onboard 7.1" } },
  { name: "iMac 24\" M3 8GB/256GB", category: "pc", price: 33990000, oldPrice: null, rating: 4.8, sold: 95, stock: 0, icon: "🖥️", color: "#4d5b70", specs: { "Chip": "Apple M3", "RAM": "8GB", "Màn hình": "24\" 4.5K Retina", "Loa": "6 loa Spatial Audio", "Camera": "1080p Center Stage" } },
  { name: "PC Đồ họa Core i9 / RTX 4070 Ti", category: "pc", price: 58990000, oldPrice: 64990000, rating: 4.9, sold: 60, stock: 4, icon: "🖥️", color: "#503048", specs: { "CPU": "i9-14900K", "GPU": "RTX 4070 Ti 12GB", "RAM": "64GB DDR5", "Ổ cứng": "2TB NVMe" } },
  { name: "Bàn phím cơ AKKO 5075B Plus", category: "gear", price: 1690000, oldPrice: 2190000, rating: 4.7, sold: 3400, stock: 30, icon: "⌨️", color: "#3d3560", specs: { "Switch": "Akko Cream Yellow V3", "Layout": "75% (81 phím)", "Kết nối": "BT5.0/2.4G/USB-C", "Pin": "3000mAh", "LED": "RGB" } },
  { name: "Chuột Logitech G Pro X Superlight 2", category: "gear", price: 2890000, oldPrice: 3490000, rating: 4.9, sold: 1800, stock: 1, icon: "🖱️", color: "#25384a", specs: { "Cảm biến": "HERO 2 32K DPI", "Nặng": "60g", "Pin": "95h", "Kết nối": "LIGHTSPEED" } },
  { name: "Tai nghe HyperX Cloud III", category: "gear", price: 2390000, oldPrice: 2990000, rating: 4.8, sold: 2600, stock: 0, icon: "🎮", color: "#46303a", specs: { "Driver": "53mm", "Mic": "10mm khử ồn", "Kết nối": "3.5mm/USB", "Loa": "DTS Headphone:X" } },
  { name: "Màn hình LG UltraGear 27\" 240Hz", category: "gear", price: 7890000, oldPrice: 9490000, rating: 4.8, sold: 520, stock: 7, icon: "🖲️", color: "#2c4038", specs: { "Kích thước": "27\" Fast IPS", "Độ phân giải": "2560x1440 QHD", "Tần số": "240Hz 1ms", "Cổng": "HDMI 2.1, DP" } },
  { name: "AirPods Pro 2 (USB-C)", category: "accessory", price: 5390000, oldPrice: 6290000, rating: 4.9, sold: 4100, stock: 25, icon: "🎧", color: "#374151", specs: { "Chip": "H2", "Pin": "6h (30h case)", "Chống ồn": "ANC", "Loa": "Spatial Audio", "Chống nước": "IP54" } },
  { name: "Sạc nhanh Anker 65W GaN 3 cổng", category: "accessory", price: 1090000, oldPrice: 1390000, rating: 4.8, sold: 5300, stock: 2, icon: "🔌", color: "#4a3b2a", specs: { "Công suất": "65W GaNPrime", "Cổng": "2x USB-C + USB-A", "Bảo vệ": "ActiveShield 2.0" } },
  { name: "Ổ cứng SSD Samsung 990 PRO 1TB", category: "accessory", price: 3290000, oldPrice: 4190000, rating: 4.9, sold: 2900, stock: 0, icon: "💾", color: "#2a3f52", specs: { "Dung lượng": "1TB", "Chuẩn": "NVMe PCIe 4.0", "Tốc độ": "7450/6900 MB/s" } }
];

async function seed() {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log(`✅ Đã nạp ${products.length} sản phẩm`);

  const adminExists = await User.findOne({ email: "admin@izumitech.vn" });
  if (!adminExists) {
    await User.create({ name: "Admin Izumi", email: "admin@izumitech.vn", password: "admin123", role: "admin" });
    console.log("✅ Tạo admin: admin@izumitech.vn / admin123");
  }
  process.exit(0);
}
seed();
