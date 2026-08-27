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

// DEFAULT_PRODUCTS moved to js/products.js — single source of truth
const API_BASE = (location.hostname==="localhost"||location.hostname==="127.0.0.1") ? "http://localhost:5000" : "https://izumitech-api.onrender.com";
const _FALLBACK_PRODUCTS = (typeof DEFAULT_PRODUCTS !== "undefined" ? DEFAULT_PRODUCTS : []);
let PRODUCTS = (() => {
  try { const s = localStorage.getItem("izumitech-products"); return s ? JSON.parse(s) : _FALLBACK_PRODUCTS; } catch { return _FALLBACK_PRODUCTS; }
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
    list = list.filter((p) => p.name.toLowerCase().includes(q));
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
  if (state.search) tags.push(`<span class="filter-tag">Tìm: <b>"${state.search}"</b> <button data-clear="search">✕</button></span>`);
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
    const hint = state.search ? `Không tìm thấy "${state.search}"` : (state.sub ? `Không có sản phẩm nào cho "${state.sub}"` : "");
    $("#emptyMsg").innerHTML = hint ? `${hint} 😢<br><small style="color:var(--muted)">Thử từ khóa khác như "pro max" hay "samsung"</small>` : "Không tìm thấy sản phẩm nào 😢";
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
  const list=PRODUCTS.filter(p=> p.name.toLowerCase().includes(qq)).slice(0,6);
  if(!list.length){
    box.innerHTML=`<div class="search-suggest-empty">Không tìm thấy "${q}" 😢</div>`;
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

$("#checkoutBtn").addEventListener("click", () => {
  if (!cartCount()) {
    showToast("Giỏ hàng đang trống, thêm sản phẩm trước nhé! 🙂");
    return;
  }
  location.href="checkout.html";
});

function updateGreeting() {
  const h = new Date().getHours();
  let text;
  if (h >= 5 && h < 11) text = "Chào buổi sáng ☀️";
  else if (h < 13) text = "Chào buổi trưa 🌤️";
  else if (h < 18) text = "Chào buổi chiều 🌇";
  else text = "Chào buổi tối 🌙";
  const who = state.user?.name ? `, ${state.user.name} nhé!` : " bạn nhé!";
  const el=$("#heroGreet");
  if(el) el.textContent = `${text}${who}`;
}
updateGreeting();
document.addEventListener("userChanged", updateGreeting);

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
    setTimeout(() => {
    const n=state.user?.name ? ` ${state.user.name}` : " bạn";
    addChatMessage(`Xin chào${n}! 👋 Mình là bé Tư Vấn của IzumiTech. Bạn đang tìm món đồ công nghệ gì hôm nay?`, "bot");
  }, 300);
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
  document.dispatchEvent(new CustomEvent("userChanged"));
}
$("#logoutBtn")?.addEventListener("click", () => {
  state.user = null;
  localStorage.removeItem("izumitech-user");
  localStorage.removeItem("izumitech-token");
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
