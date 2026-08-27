const CATEGORIES = [
  { id: "all", label: "Tất cả", icon: "🛍️" },
  { id: "phone", label: "Điện thoại", icon: "📱" },
  { id: "laptop", label: "Laptop", icon: "💻" },
  { id: "tablet", label: "Tablet", icon: "📲" },
  { id: "pc", label: "PC - Máy tính bàn", icon: "🖥️" },
  { id: "gear", label: "Gear gaming", icon: "🎮" },
  { id: "accessory", label: "Phụ kiện", icon: "🎧" }
];

const CAT_GROUPS = [
  { id: "phone", icon: "📱", label: "Điện thoại", subs: ["iPhone", "Samsung", "Xiaomi", "OPPO / Vivo", "Realme / Nokia"] },
  { id: "laptop", icon: "💻", label: "Laptop", subs: ["MacBook", "ASUS ROG", "Lenovo", "Dell / HP", "Acer / MSI"] },
  { id: "tablet", icon: "📲", label: "Tablet", subs: ["iPad Pro / Air", "Samsung Tab", "Xiaomi Pad", "Lenovo Tab"] },
  { id: "pc", icon: "🖥️", label: "PC - Máy tính bàn", subs: ["PC Gaming", "PC Đồ họa", "iMac / All-in-One", "Linh kiện PC"] },
  { id: "gear", icon: "🎮", label: "Gear gaming", subs: ["Bàn phím cơ", "Chuột gaming", "Tai nghe", "Màn hình / Ghế"] },
  { id: "accessory", icon: "🎧", label: "Phụ kiện", subs: ["Tai nghe / Loa", "Sạc / Cáp", "Ốp lưng / Dán", "SSD / Thẻ nhớ"] }
];

const HOME_SECTIONS = [
  { id: "iphone", title: "🍎 iPhone mới nhất", filter: p => p.name.toLowerCase().includes("iphone") && p.category === "phone" },
  { id: "samsung-phone", title: "📱 Samsung Điện thoại", filter: p => p.name.toLowerCase().includes("samsung") && p.category === "phone" },
  { id: "xiaomi", title: "📱 Xiaomi & Điện thoại khác", filter: p => p.category === "phone" && !p.name.toLowerCase().includes("iphone") && !p.name.toLowerCase().includes("samsung") },
  { id: "samsung-storage", title: "💾 Samsung Lưu trữ (SSD/RAM)", filter: p => p.name.toLowerCase().includes("samsung") && p.category === "accessory" },
  { id: "laptop", title: "💻 Laptop", filter: p => p.category === "laptop" },
  { id: "tablet", title: "📲 Tablet", filter: p => p.category === "tablet" },
  { id: "pc", title: "🖥️ PC", filter: p => p.category === "pc" },
  { id: "gear", title: "🎮 Gear & Phụ kiện khác", filter: p => (p.category === "gear" || p.category === "accessory") && !p.name.toLowerCase().includes("samsung") }
];

const DEFAULT_PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro Max 256GB", category: "phone", price: 29990000, oldPrice: 34990000, rating: 4.9, sold: 1200, stock: 15, icon: "📱", color: "#3b4a6b", specs: { "Chip": "A17 Pro 6 nhân", "RAM": "8GB", "Bộ nhớ": "256GB NVMe", "Pin": "4422mAh, sạc nhanh 27W + MagSafe", "Camera sau": "48MP chính + 12MP góc rộng + 12MP tele 5x", "Camera trước": "12MP TrueDepth", "Màn hình": "6.7\" Super Retina XDR 120Hz", "Loa": "Stereo, Dolby Atmos", "HĐH": "iOS 17", "Kết nối": "5G, Wi-Fi 6E, BT 5.3" } },
  { id: 2, name: "Samsung Galaxy S24 Ultra 512GB", category: "phone", price: 27490000, oldPrice: 31990000, rating: 4.8, sold: 890, stock: 0, icon: "📱", color: "#5a3b6b", specs: { "Chip": "Snapdragon 8 Gen 3", "RAM": "12GB", "Bộ nhớ": "512GB UFS 4.0", "Pin": "5000mAh, sạc 45W + sạc không dây", "Camera sau": "200MP + 12MP + 50MP + 10MP, zoom 100x", "Camera trước": "12MP", "Màn hình": "6.8\" Dynamic AMOLED 2X 120Hz", "Loa": "Stereo AKG, Dolby Atmos", "HĐH": "Android 14, One UI 6.1", "Bút": "S Pen tích hợp" } },
  { id: 3, name: "Xiaomi 14T Pro 5G 12GB/512GB", category: "phone", price: 14990000, oldPrice: 17990000, rating: 4.7, sold: 2100, stock: 3, icon: "📱", color: "#2f5545", specs: { "Chip": "Dimensity 9300+", "RAM": "12GB LPDDR5X", "Bộ nhớ": "512GB UFS 4.0", "Pin": "5000mAh, sạc 120W (19 phút đầy)", "Camera sau": "50MP Leica + 50MP tele + 12MP góc rộng", "Camera trước": "32MP", "Màn hình": "6.67\" AMOLED 144Hz, 4000 nits", "Loa": "Stereo, Hi-Res", "HĐH": "HyperOS (Android 14)" } },
  { id: 4, name: "MacBook Air M3 13\" 8GB/256GB", category: "laptop", price: 26990000, oldPrice: 28990000, rating: 4.9, sold: 640, stock: 8, icon: "💻", color: "#4a4a55", specs: { "Chip": "Apple M3 8 nhân CPU / 10 nhân GPU", "RAM": "8GB Unified (tuỳ chọn 16/24GB)", "Ổ cứng": "256GB SSD", "Pin": "52.6Wh, ~18h", "Màn hình": "13.6\" Liquid Retina 2560x1664", "Loa": "4 loa, Spatial Audio", "Camera": "1080p FaceTime", "Cổng": "2x Thunderbolt, MagSafe, jack 3.5mm" } },
  { id: 5, name: "ASUS ROG Strix G16 RTX 4070", category: "laptop", price: 45990000, oldPrice: 52990000, rating: 4.8, sold: 320, stock: 0, icon: "💻", color: "#1f3a5f", specs: { "Chip": "Intel i7-13650HX", "Card": "RTX 4070 8GB", "RAM": "16GB DDR5", "Ổ cứng": "1TB NVMe PCIe 4.0", "Màn hình": "16\" 2.5K 240Hz 100% DCI-P3", "Pin": "90Wh", "Loa": "2 loa Dolby Atmos", "Tản nhiệt": "ROG Intelligent Cooling" } },
  { id: 6, name: "Lenovo ThinkPad X1 Carbon Gen 12", category: "laptop", price: 38990000, oldPrice: null, rating: 4.7, sold: 150, stock: 12, icon: "💻", color: "#33383d", specs: { "Chip": "Intel Core Ultra 7 155H", "RAM": "32GB LPDDR5X", "Ổ cứng": "1TB SSD", "Màn hình": "14\" 2.8K OLED 120Hz", "Pin": "57Wh, sạc 65W", "Loa": "4 loa Harman", "Bảo mật": "vân tay, IR camera, dTPM" } },
  { id: 7, name: "iPad Pro M4 11\" WiFi 256GB", category: "tablet", price: 27990000, oldPrice: 30990000, rating: 4.9, sold: 430, stock: 5, icon: "📲", color: "#44465e", specs: { "Chip": "Apple M4", "RAM": "8GB", "Bộ nhớ": "256GB", "Pin": "38.99Wh, ~10h", "Camera sau": "12MP + LiDAR", "Camera trước": "12MP góc rộng ngang", "Màn hình": "11\" Ultra Retina XDR OLED 120Hz", "Loa": "4 loa", "Bút": "Hỗ trợ Apple Pencil Pro" } },
  { id: 8, name: "Samsung Galaxy Tab S9 FE+", category: "tablet", price: 11990000, oldPrice: 13990000, rating: 4.6, sold: 780, stock: 20, icon: "📲", color: "#2d4a3e", specs: { "Chip": "Exynos 1380", "RAM": "8GB", "Bộ nhớ": "128GB + thẻ nhớ", "Pin": "10090mAh, sạc 45W", "Camera": "8MP sau + 12MP trước", "Màn hình": "12.4\" IPS 90Hz", "Loa": "Stereo AKG", "Chống nước": "IP68 + S Pen" } },
  { id: 9, name: "PC Gaming Ryzen 7 / RTX 4060 / 32GB", category: "pc", price: 24990000, oldPrice: 27990000, rating: 4.8, sold: 210, stock: 2, icon: "🖥️", color: "#3a2f52", specs: { "CPU": "Ryzen 7 7700", "GPU": "RTX 4060 8GB", "RAM": "32GB DDR5 5600MHz", "Ổ cứng": "1TB NVMe", "Nguồn": "650W 80+ Bronze", "Tản": "AIO 240mm", "Loa": "Onboard 7.1", "Kết nối": "Wi-Fi 6, Bluetooth 5.2" } },
  { id: 10, name: "iMac 24\" M3 8GB/256GB", category: "pc", price: 33990000, oldPrice: null, rating: 4.8, sold: 95, stock: 0, icon: "🖥️", color: "#4d5b70", specs: { "Chip": "Apple M3", "RAM": "8GB Unified", "Ổ cứng": "256GB SSD", "Màn hình": "24\" 4.5K Retina", "Camera": "1080p Center Stage", "Loa": "6 loa, Spatial Audio", "Mic": "3 mic chống ồn", "Cổng": "2x Thunderbolt, 2x USB-C" } },
  { id: 11, name: "PC Đồ họa Core i9 / RTX 4070 Ti", category: "pc", price: 58990000, oldPrice: 64990000, rating: 4.9, sold: 60, stock: 4, icon: "🖥️", color: "#503048", specs: { "CPU": "Core i9-14900K", "GPU": "RTX 4070 Ti 12GB", "RAM": "64GB DDR5", "Ổ cứng": "2TB NVMe + 2TB HDD", "Nguồn": "850W Gold", "Tản": "Custom nước", "Màn hình": "Kèm 27\" 4K (tuỳ chọn)" } },
  { id: 12, name: "Bàn phím cơ AKKO 5075B Plus", category: "gear", price: 1690000, oldPrice: 2190000, rating: 4.7, sold: 3400, stock: 30, icon: "⌨️", color: "#3d3560", specs: { "Switch": "Akko Cream Yellow V3 Pro", "Layout": "75% (81 phím)", "Kết nối": "Bluetooth 5.0 / 2.4G / USB-C", "Pin": "3000mAh, ~80h", "LED": "RGB south-facing", "Loa": "Không", "Keycap": "PBT double-shot" } },
  { id: 13, name: "Chuột Logitech G Pro X Superlight 2", category: "gear", price: 2890000, oldPrice: 3490000, rating: 4.9, sold: 1800, stock: 1, icon: "🖱️", color: "#25384a", specs: { "Cảm biến": "HERO 2, 32K DPI", "Nặng": "60g", "Pin": "95h, sạc USB-C", "Kết nối": "LIGHTSPEED 2.4G + Bluetooth", "Loa": "Không", "Switch": "Hybrid LIGHTFORCE" } },
  { id: 14, name: "Tai nghe HyperX Cloud III", category: "gear", price: 2390000, oldPrice: 2990000, rating: 4.8, sold: 2600, stock: 0, icon: "🎮", color: "#46303a", specs: { "Driver": "53mm", "Tần số": "10Hz-21kHz", "Mic": "10mm, khử ồn, tháo rời", "Kết nối": "3.5mm + USB-C + USB-A", "Loa": "DTS Headphone:X", "Pin": "Không (có dây)", "Đệm": "Memory foam da + vải" } },
  { id: 15, name: "Màn hình LG UltraGear 27\" 240Hz", category: "gear", price: 7890000, oldPrice: 9490000, rating: 4.8, sold: 520, stock: 7, icon: "🖲️", color: "#2c4038", specs: { "Kích thước": "27\" Fast IPS", "Độ phân giải": "2560x1440 (QHD)", "Tần số": "240Hz, 1ms GtG", "Loa": "Không", "Cổng": "HDMI 2.1 x2, DP 1.4, USB hub", "Công nghệ": "G-Sync Compatible, HDR400" } },
  { id: 16, name: "AirPods Pro 2 (USB-C)", category: "accessory", price: 5390000, oldPrice: 6290000, rating: 4.9, sold: 4100, stock: 25, icon: "🎧", color: "#374151", specs: { "Chip": "H2 + U1", "Pin": "6h (30h với case), sạc MagSafe/USB-C/Qi", "Chống ồn": "ANC gấp 2, Adaptive Transparency", "Loa": "Driver custom, Spatial Audio", "Mic": "Beamforming", "Chống nước": "IP54" } },
  { id: 17, name: "Sạc nhanh Anker 65W GaN 3 cổng", category: "accessory", price: 1090000, oldPrice: 1390000, rating: 4.8, sold: 5300, stock: 2, icon: "🔌", color: "#4a3b2a", specs: { "Công suất": "65W GaNPrime", "Cổng": "2x USB-C + 1x USB-A", "Sạc": "PD 3.0, PPS, PowerIQ 4.0", "Pin": "Không", "Loa": "Không", "Bảo vệ": "ActiveShield 2.0, quá nhiệt/quá áp" } },
  { id: 18, name: "Ổ cứng SSD Samsung 990 PRO 1TB", category: "accessory", price: 3290000, oldPrice: 4190000, rating: 4.9, sold: 2900, stock: 0, icon: "💾", color: "#2a3f52", specs: { "Dung lượng": "1TB", "Chuẩn": "NVMe PCIe 4.0 x4", "Tốc độ": "7450/6900 MB/s", "Loa": "Không", "Pin": "Không", "Tuổi thọ": "600 TBW, 5 năm BH" } }
];
const API_BASE = (location.hostname==="localhost"||location.hostname==="127.0.0.1") ? "http://localhost:5000" : "https://izumitech-api.onrender.com";
let PRODUCTS = (() => {
  try { const s = localStorage.getItem("izumitech-products"); return s ? JSON.parse(s) : DEFAULT_PRODUCTS; } catch { return DEFAULT_PRODUCTS; }
})();
function saveProducts() { localStorage.setItem("izumitech-products", JSON.stringify(PRODUCTS)); }

async function syncProductsFromAPI() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error("API fail");
    const data = await res.json();
    if (Array.isArray(data) && data.length) {
      PRODUCTS = data.map(p => ({ ...p, id: p._id || p.id }));
      saveProducts();
      renderProducts();
    }
  } catch (e) {
    console.log("API chưa chạy, dùng dữ liệu local:", e.message);
  }
}

const state = {
  category: "all",
  sub: "",
  search: "",
  sort: "popular",
  cart: JSON.parse(localStorage.getItem("izumitech-cart") || "{}"),
  user: JSON.parse(localStorage.getItem("izumitech-user") || "null")
};

const $ = (sel) => document.querySelector(sel);
const vnd = (n) => new Intl.NumberFormat("vi-VN").format(n) + "₫";

function renderCategories() {
  const menu = $("#catMenu");
  const active = state.category;
  const sub = state.sub;
  menu.innerHTML =
    `<div class="cat-group"><b data-cat="all" class="${active === "all" && !sub ? "active" : ""}">🛍️ Tất cả sản phẩm</b></div>` +
    CAT_GROUPS.map((g) => `
      <div class="cat-group">
        <b data-cat="${g.id}" class="${active === g.id && !sub ? "active" : ""}">${g.icon} ${g.label}</b>
        <ul>
          ${g.subs.map((s) => `<li data-cat="${g.id}" data-sub="${s}" class="${active === g.id && sub === s ? "active" : ""}">${s}</li>`).join("")}
        </ul>
      </div>`).join("");
  let label = "Tất cả sản phẩm";
  let icon = "🛍️";
  if (sub) {
    label = sub;
    icon = CATEGORIES.find((c) => c.id === active)?.icon || "🛍️";
  } else if (active !== "all") {
    label = CATEGORIES.find((c) => c.id === active)?.label || "Tất cả sản phẩm";
    icon = CATEGORIES.find((c) => c.id === active)?.icon || "🛍️";
  }
  const badge = $("#activeCat");
  if (badge) {
    badge.textContent = sub ? `${icon} ${label}` : `${icon} ${label}`;
    badge.classList.toggle("show", active !== "all" || !!sub);
  }
  const toggle = $("#catToggle");
  if (toggle) toggle.textContent = sub ? `${icon} ${sub}` : (active === "all" ? "☰ Danh mục" : `${icon} ${label}`);
}

function toggleCatMenu(force) {
  const menu = $("#catMenu");
  const btn = $("#catToggle");
  const show = typeof force === "boolean" ? force : menu.classList.contains("hidden");
  menu.classList.toggle("hidden", !show);
  btn.setAttribute("aria-expanded", String(show));
}

function matchesSub(productName, sub) {
  const name = productName.toLowerCase();
  const parts = sub.toLowerCase().split("/").map((s) => s.trim()).filter(Boolean);
  return parts.some((kw) => {
    const k = kw.toLowerCase();
    if (k === "iphone") return name.includes("iphone");
    if (k === "samsung") return name.includes("samsung");
    if (k === "xiaomi") return name.includes("xiaomi");
    return name.includes(k);
  });
}

function getFilteredProducts() {
  let list = [...PRODUCTS];

  if (state.category !== "all") {
    list = list.filter((p) => p.category === state.category);
  }
  if (state.sub) {
    list = list.filter((p) => matchesSub(p.name, state.sub));
  }

  if (state.search) {
    const q = state.search.toLowerCase().trim();
    list = list.filter((p) => p.name.toLowerCase().trim().startsWith(q));
  }

  switch (state.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    default:
      list.sort((a, b) => b.sold - a.sold);
  }
  return list;
}

function discountPercent(p) {
  if (!p.oldPrice) return null;
  return Math.round((1 - p.price / p.oldPrice) * 100);
}

function renderFilters() {
  const box = $("#activeFilters");
  if (!box) return;
  const tags = [];
  if (state.search) tags.push(`<span class="filter-tag">Tìm: <b>"${state.search}"</b> (đầu chữ) <button data-clear="search">✕</button></span>`);
  if (state.category !== "all") {
    const cat = CATEGORIES.find((c) => c.id === state.category);
    tags.push(`<span class="filter-tag">${cat?.icon || ""} ${cat?.label || state.category} <button data-clear="category">✕</button></span>`);
  }
  if (state.sub) tags.push(`<span class="filter-tag">→ <b>${state.sub}</b> <button data-clear="sub">✕</button></span>`);
  if (tags.length) tags.push(`<span class="filter-tag" style="cursor:pointer" data-clear="all">Xóa tất cả</span>`);
  box.innerHTML = tags.join("");
}

function productCardHTML(p, i){
  const d = discountPercent(p);
  const catLabel = CATEGORIES.find((c) => c.id === p.category)?.label || "";
  const stars = "★".repeat(Math.round(p.rating)) + "☆".repeat(5 - Math.round(p.rating));
  const stockBadge = p.stock === 0 ? `<span class="stock-badge out">Hết hàng</span>` : (p.stock <= 3 ? `<span class="stock-badge low">Sắp hết (${p.stock})</span>` : "");
  const img = p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'" /><span style="display:none">${p.icon}</span>` : p.icon;
  return `
    <article class="card" data-product="${p.id}" style="animation-delay:${Math.min(i * 40, 400)}ms;cursor:pointer">
      <div class="card-media" style="background:linear-gradient(145deg, ${p.color}, var(--surface));overflow:hidden" onclick="location.href='product.html?id=${p.id}'">
        ${img}
        ${d ? `<span class="card-badge">-${d}%</span>` : ""}
        ${stockBadge}
        <button class="card-fav" data-fav="${p.id}" aria-label="Yêu thích" onclick="event.stopPropagation()">♡</button>
      </div>
      <div class="card-body" onclick="location.href='product.html?id=${p.id}'">
        <span class="card-cat">${catLabel}</span>
        <h3 class="card-title">${p.name}</h3>
        <div class="card-rating">${stars}<span>${p.rating} · Đã bán ${p.sold.toLocaleString("vi-VN")}</span></div>
        <div class="card-price-row">
          <span class="price">${vnd(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${vnd(p.oldPrice)}</span>` : ""}
        </div>
        <button class="add-btn" data-add="${p.id}" ${p.stock===0?'disabled style="opacity:0.5;cursor:not-allowed;border-color:var(--border);color:var(--muted)"':''}>${p.stock===0?'Hết hàng':'＋ Thêm vào giỏ'}</button>
      </div>
    </article>`;
}

function renderHomeSections(){
  const box=$("#homeSections");
  if(!box) return;
  const sorted=[...PRODUCTS].sort((a,b)=> (b.id||0)-(a.id||0));
  box.innerHTML = HOME_SECTIONS.map(sec=>{
    const list = sorted.filter(sec.filter).slice(0,4);
    if(!list.length) return "";
    return `
      <div class="home-section">
        <div class="home-section-head">
          <h3>${sec.title}</h3>
          <a data-view="${sec.id}">Xem tất cả →</a>
        </div>
        <div class="product-grid">${list.map((p,i)=>productCardHTML(p,i)).join("")}</div>
      </div>`;
  }).join("");
}

function renderProducts() {
  renderFilters();
  const hasFilter = state.search || state.category !== "all" || state.sub;
  const singleWrap=$("#singleGridWrap");
  const homeBox=$("#homeSections");
  if(!hasFilter){
    if(singleWrap) singleWrap.classList.add("hidden");
    if(homeBox) homeBox.classList.remove("hidden");
    renderHomeSections();
    return;
  }
  if(homeBox) homeBox.classList.add("hidden");
  if(singleWrap) singleWrap.classList.remove("hidden");
  const grid = $("#productGrid");
  const list = getFilteredProducts();
  $("#emptyMsg").classList.toggle("hidden", list.length > 0);
  if (!list.length) {
    const hint = state.search ? `Không có sản phẩm nào bắt đầu bằng "${state.search}"` : (state.sub ? `Không có sản phẩm nào cho "${state.sub}"` : "");
    $("#emptyMsg").innerHTML = hint ? `${hint} 😢<br><small style="color:var(--muted)">Thử xóa bộ lọc hoặc tìm từ khóa khác</small>` : "Không tìm thấy sản phẩm nào 😢";
  }
  grid.innerHTML = list.map((p,i)=>productCardHTML(p,i)).join("");
}

function saveCart() {
  localStorage.setItem("izumitech-cart", JSON.stringify(state.cart));
}

function cartCount() {
  return Object.values(state.cart).reduce((s, q) => s + q.qty, 0);
}

function cartTotal() {
  return Object.entries(state.cart).reduce((sum, [id, item]) => {
    const p = PRODUCTS.find((x) => x.id === Number(id));
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}

function addToCart(id) {
  const found = state.cart[id];
  if (found) found.qty += 1;
  else state.cart[id] = { qty: 1 };
  saveCart();
  updateCartUI();
  showToast(`Đã thêm "${PRODUCTS.find((p) => p.id === id).name}" vào giỏ hàng 🛒`);
}

function changeQty(id, delta) {
  const item = state.cart[id];
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) delete state.cart[id];
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  $("#cartCount").textContent = cartCount();
  $("#cartTotal").textContent = vnd(cartTotal());

  const box = $("#cartItems");
  const entries = Object.entries(state.cart);

  if (!entries.length) {
    box.innerHTML = `<p class="cart-empty">Giỏ hàng trống trơn 😴<br /><small>Hãy thêm vài món đồ công nghệ nào!</small></p>`;
    return;
  }

  box.innerHTML = entries
    .map(([id, item]) => {
      const p = PRODUCTS.find((x) => x.id === Number(id));
      if (!p) return "";
      return `
        <div class="cart-item">
          <div class="ci-thumb" style="background:linear-gradient(145deg, ${p.color}, var(--surface-2))">${p.icon}</div>
          <div class="ci-info">
            <p class="ci-name">${p.name}</p>
            <p class="ci-price">${vnd(p.price)} × ${item.qty} = <b>${vnd(p.price * item.qty)}</b></p>
          </div>
          <div class="qty-group">
            <button class="qty-btn" data-dec="${id}">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-inc="${id}">＋</button>
          </div>
          <button class="ci-remove" data-remove="${id}" aria-label="Xóa">🗑</button>
        </div>`;
    })
    .join("");
}

let toastTimer;
function showToast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function openCart(open) {
  $("#cartDrawer").classList.toggle("open", open);
  $("#overlay").classList.toggle("show", open);
  $("#cartDrawer").setAttribute("aria-hidden", String(!open));
}

document.addEventListener("click", (e) => {
  const clear = e.target.closest("[data-clear]");
  if (clear) {
    const t = clear.dataset.clear;
    if (t === "search") { state.search = ""; $("#searchInput").value = ""; }
    if (t === "category") { state.category = "all"; state.sub = ""; }
    if (t === "sub") state.sub = "";
    if (t === "all") { state.search = ""; state.category = "all"; state.sub = ""; $("#searchInput").value = ""; }
    renderCategories();
    renderProducts();
    return;
  }
  if (e.target.closest("#catToggle")) {
    toggleCatMenu();
    return;
  }
  if (!e.target.closest("#catMenu") && !e.target.closest("#catToggle")) {
    toggleCatMenu(false);
  }
  const view = e.target.closest("[data-view]");
  if(view){
    const vid=view.dataset.view;
    if(vid==="iphone"){ state.search="iphone"; state.category="phone"; state.sub=""; }
    else if(vid==="samsung-phone"){ state.search="samsung"; state.category="phone"; state.sub=""; }
    else if(vid==="samsung-storage"){ state.search="samsung"; state.category="accessory"; state.sub=""; }
    else if(vid==="xiaomi"){ state.search="xiaomi"; state.category="phone"; state.sub=""; }
    else { state.category=vid; state.search=""; state.sub=""; }
    const si=$("#searchInput"); if(si) si.value=state.search;
    renderCategories();
    renderProducts();
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const catEl = e.target.closest("[data-cat]");
  if (catEl && catEl.closest("#catMenu")) {
    state.category = catEl.dataset.cat;
    if (catEl.dataset.sub) {
      state.sub = catEl.dataset.sub;
      showToast(`Đang xem: ${catEl.dataset.sub} → ${CATEGORIES.find((c) => c.id === catEl.dataset.cat)?.label}`);
    } else {
      state.sub = "";
      if (catEl.dataset.cat !== "all") showToast(`Đang xem: ${CATEGORIES.find((c) => c.id === catEl.dataset.cat)?.label}`);
      else showToast("Đang xem: Tất cả sản phẩm");
    }
    renderCategories();
    renderProducts();
    toggleCatMenu(false);
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const add = e.target.closest("[data-add]");
  if (add) {
    if (add.disabled) { showToast("Sản phẩm đã hết hàng 😢"); return; }
    const pid = add.dataset.add;
    const prod = PRODUCTS.find(p=>String(p.id)===String(pid));
    if(prod && prod.stock===0){ showToast("Sản phẩm đã hết hàng 😢"); return; }
    addToCart(Number(pid));
    return;
  }

  const fav = e.target.closest("[data-fav]");
  if (fav) {
    fav.textContent = fav.textContent === "♡" ? "❤️" : "♡";
    return;
  }

  if (e.target.closest("[data-inc]")) {
    changeQty(e.target.closest("[data-inc]").dataset.inc, 1);
    return;
  }
  if (e.target.closest("[data-dec]")) {
    changeQty(e.target.closest("[data-dec]").dataset.dec, -1);
    return;
  }
  if (e.target.closest("[data-remove]")) {
    delete state.cart[e.target.closest("[data-remove]").dataset.remove];
    saveCart();
    updateCartUI();
    return;
  }
});

function renderSearchSuggest(q){
  const box=$("#searchSuggest");
  if(!box) return;
  if(!q || !q.trim()){ box.classList.add("hidden"); box.innerHTML=""; return; }
  const qq=q.toLowerCase().trim();
  const list=PRODUCTS.filter(p=> p.name.toLowerCase().trim().startsWith(qq)).slice(0,6);
  if(!list.length){
    box.innerHTML=`<div class="search-suggest-empty">Không có sản phẩm nào bắt đầu bằng "${q}" 😢</div>`;
    box.classList.remove("hidden");
    return;
  }
  box.innerHTML = list.map(p=>`
    <div class="search-suggest-item" data-suggest="${p.id}">
      ${p.image ? `<img src="${p.image}" alt="" />` : `<span class="s-icon">${p.icon}</span>`}
      <div class="search-suggest-info"><b>${p.name}</b><small>${(CATEGORIES.find(c=>c.id===p.category)?.label||"")} · ★ ${p.rating} · ${p.stock===0?'Hết hàng':`Còn ${p.stock}`}</small></div>
      <span class="search-suggest-price">${vnd(p.price)}</span>
    </div>`).join("") + `<div style="padding:8px 12px;text-align:center"><small style="color:var(--muted)">Nhấn Enter để lọc tất cả</small></div>`;
  box.classList.remove("hidden");
}
$("#searchInput").addEventListener("input", (e) => {
  const v=e.target.value;
  state.search = v;
  renderCategories();
  renderProducts();
  renderSearchSuggest(v);
});
$("#searchInput").addEventListener("focus", (e)=> renderSearchSuggest(e.target.value));
$("#searchInput").addEventListener("keydown", (e)=>{
  if(e.key==="Escape"){ $("#searchSuggest")?.classList.add("hidden"); }
  if(e.key==="Enter"){ $("#searchSuggest")?.classList.add("hidden"); }
});
document.addEventListener("click", (e)=>{
  if(!e.target.closest(".search-wrap")) $("#searchSuggest")?.classList.add("hidden");
});
document.addEventListener("click", (e)=>{
  const it=e.target.closest("[data-suggest]");
  if(it){
    const pid=it.dataset.suggest;
    $("#searchSuggest")?.classList.add("hidden");
    location.href=`product.html?id=${pid}`;
  }
});

$("#sortSelect").addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderProducts();
});

$("#cartBtn").addEventListener("click", () => openCart(true));
$("#closeCart").addEventListener("click", () => openCart(false));
$("#overlay").addEventListener("click", () => openCart(false));

$("#checkoutBtn").addEventListener("click", async () => {
  if (!cartCount()) {
    showToast("Giỏ hàng đang trống, thêm sản phẩm trước nhé! 🙂");
    return;
  }
  const total = cartTotal();
  const items = Object.entries(state.cart).map(([id, it])=>{
    const p=PRODUCTS.find(x=>String(x.id)===String(id));
    return p?{ product: p._id||p.id, name:p.name, price:p.price, qty:it.qty }:null;
  }).filter(Boolean);
  const customer = state.user || { name: "Khách vãng lai", email: "guest@izumitech.vn" };
  const order = { customerName: customer.name, customerEmail: customer.email, phone: customer.phone||"", items, total, status:"pending", date: new Date().toISOString() };
  const orders = JSON.parse(localStorage.getItem("izumitech-orders")||"[]");
  orders.unshift(order);
  localStorage.setItem("izumitech-orders", JSON.stringify(orders));
  try{
    await fetch(`${API_BASE}/api/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ customerName: order.customerName, customerEmail: order.customerEmail, phone: order.phone, items: items.map(i=>({product:i.product,name:i.name,price:i.price,qty:i.qty})), total })});
  }catch{}
  showToast(`Đặt hàng thành công! Tổng tiền: ${vnd(total)} 💙 (+${Math.floor(total/10000)} điểm)`);
  state.cart = {};
  saveCart();
  updateCartUI();
  openCart(false);
});

function updateGreeting() {
  const h = new Date().getHours();
  let text;
  if (h >= 5 && h < 11) text = "Chào buổi sáng ☀️";
  else if (h < 13) text = "Chào buổi trưa 🌤️";
  else if (h < 18) text = "Chào buổi chiều 🌇";
  else text = "Chào buổi tối 🌙";
  $("#heroGreet").textContent = `${text}, Izumi nhé!`;
}
updateGreeting();

const CHAT_REPLIES = [
  { keys: ["chào", "hello", "hi", "alo"], reply: "Chào bạn! 🥰 Mình có thể giúp gì cho bạn hôm nay — tìm máy, hỏi giá hay kiểm tra bảo hành?" },
  { keys: ["giảm", "sale", "khuyến mãi", "deal", "ưu đãi"], reply: "Tuần này đang giảm tới 50% 🎉 Kèm mã IZUMI200 giảm thêm 200K cho đơn đầu tiên nhé!" },
  { keys: ["bảo hành", "bảohanh", "warranty", "lỗi"], reply: "Tất cả máy bảo hành chính hãng 12 tháng, lỗi là đổi mới trong 30 ngày luôn nha 🛡️ Bạn cứ yên tâm!" },
  { keys: ["giao", "ship", "vận chuyển"], reply: "Nội thành HN & HCM giao trong 2h 🚚, tỉnh khác 1-3 ngày. Đơn từ 500K là free ship hết á!" },
  { keys: ["trả góp", "góp", "credit", "thẻ"], reply: "Trả góp 0% qua thẻ hoặc duyệt online chỉ cần CCCD 💳 Duyệt trong 5 phút, bạn muốn mình tư vấn cách làm không?" },
  { keys: ["mua", "đặt", "order", "giỏ hàng"], reply: "Bạn bấm \"＋ Thêm vào giỏ\" ở sản phẩm thích rồi bấm giỏ hàng 🛒 → Thanh toán là xong. Có gì thắc mắc gọi 1900 6868 nha!" },
  { keys: ["iphone", "samsung", "điện thoại", "phone"], reply: "Danh mục Điện thoại 📱 đang có iPhone 15 Pro Max giảm 5 triệu đó, hot lắm! Bạn thích máy nào?" },
  { keys: ["laptop", "macbook"], reply: "Laptop 💻 bên mình đủ từ MacBook Air M3 đến máy gaming ROG. Bạn dùng để học, làm việc hay chơi game để mình tư vấn đúng máy nha?" },
  { keys: ["cảm ơn", "thanks", "thank"], reply: "Không có gì đâu nha! 😊 Cần gì cứ nhắn mình, luôn đây nè 💙" }
];

const FALLBACK_REPLY = "Hình như mình chưa hiểu rõ câu hỏi 😅 Bạn thử nói lại giúp mình, hoặc gọi hotline 1900 6868 để gặp nhân viên ngay nghen!";

let chatOpened = false;

function addChatMessage(text, who) {
  const box = $("#chatMessages");
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

let chatHistory=[];
async function botReply(userText) {
  chatHistory.push({ role:"user", content: userText });
  if(chatHistory.length>12) chatHistory=chatHistory.slice(-12);
  const loading=document.createElement("div");
  loading.className="msg bot";
  loading.textContent="Đang trả lời...";
  loading.id="chatLoading";
  $("#chatMessages").appendChild(loading);
  $("#chatMessages").scrollTop=$("#chatMessages").scrollHeight;
  try{
    const r=await fetch(`${API_BASE}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:userText,history:chatHistory.slice(0,-1)})});
    const data=await r.json();
    document.getElementById("chatLoading")?.remove();
    const reply=data.reply || FALLBACK_REPLY;
    addChatMessage(reply,"bot");
    chatHistory.push({ role:"assistant", content: reply });
    return;
  }catch{
    document.getElementById("chatLoading")?.remove();
  }
  setTimeout(() => {
    const q = userText.toLowerCase();
    const hit = CHAT_REPLIES.find((r) => r.keys.some((k) => q.includes(k)));
    addChatMessage(hit ? hit.reply : FALLBACK_REPLY, "bot");
  }, 650);
}

$("#chatFab").addEventListener("click", () => {
  const box = $("#chatBox");
  const opening = box.classList.contains("hidden");
  box.classList.toggle("hidden", !opening);
  box.setAttribute("aria-hidden", String(!opening));
  if (opening && !chatOpened) {
    chatOpened = true;
    setTimeout(() => addChatMessage("Xin chào Izumi! 👋 Mình là bé Tư Vấn của IzumiTech. Bạn đang tìm món đồ công nghệ gì hôm nay?", "bot"), 300);
  }
});

$("#chatClose").addEventListener("click", () => {
  $("#chatBox").classList.add("hidden");
  $("#chatBox").setAttribute("aria-hidden", "true");
});

$("#chatForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = $("#chatInput");
  const text = input.value.trim();
  if (!text) return;
  addChatMessage(text, "user");
  input.value = "";
  botReply(text);
});

$("#newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = $("#newsletterEmail").value.trim();
  showToast(`Cảm ơn bạn nhiều! 💌 Mã IZUMI200 đã gửi tới ${email}`);
  $("#newsletterEmail").value = "";
});

document.querySelector(".logo")?.addEventListener("click", (e) => {
  e.preventDefault();
  state.category = "all";
  state.sub = "";
  state.search = "";
  const inp = document.getElementById("searchInput");
  if (inp) inp.value = "";
  state.sort = "popular";
  const sort = document.getElementById("sortSelect");
  if (sort) sort.value = "popular";
  renderCategories();
  renderProducts();
  window.scrollTo({ top: 0, behavior: "smooth" });
  showToast("Đã về trang chủ IzumiTech 🏠");
});

function renderAuth() {
  const hasUser = !!state.user;
  $("#loginBtn")?.classList.toggle("hidden", hasUser);
  $("#signupBtn")?.classList.toggle("hidden", hasUser);
  $("#userMenu")?.classList.toggle("hidden", !hasUser);
  if (hasUser) $("#userName").textContent = `👋 ${state.user.name || state.user.email}`;
}
$("#logoutBtn")?.addEventListener("click", () => {
  state.user = null;
  localStorage.removeItem("izumitech-user");
  renderAuth();
  showToast("Đã đăng xuất. Hẹn gặp lại! 👋");
});
renderAuth();

renderCategories();
renderProducts();
updateCartUI();
syncProductsFromAPI();

try {
  const token = localStorage.getItem("izumitech-token");
  if (state.user && token) {
    fetch(`${API_BASE}/api/users`, { headers: { Authorization: `Bearer ${token}` } }).catch(()=>{});
  }
} catch {}
