# IzumiTech Backend — MongoDB

## Cài đặt
```bash
cd backend
npm install
cp .env.example .env   # sửa MONGO_URI nếu cần
```

## Chạy MongoDB
- Local: `mongod` (mặc định `mongodb://localhost:27017/izumitech`)
- Hoặc dùng Atlas: thay `MONGO_URI` bằng connection string Atlas

## Nạp dữ liệu mẫu
```bash
npm run seed
# tạo 14 sản phẩm + admin: admin@izumitech.vn / admin123
```

## Chạy server
```bash
npm run dev   # nodemon
npm start
# http://localhost:5000
```

## API

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | /api/products?q=i&category=phone&sort=price-asc | Tìm kiếm prefix `^q`, lọc danh mục |
| GET | /api/products/:id | Chi tiết |
| POST | /api/products | Tạo (admin) |
| PUT | /api/products/:id | Cập nhật |
| DELETE | /api/products/:id | Xóa |
| POST | /api/auth/signup | {name,email,password} |
| POST | /api/auth/login | {email,password} → {user,token} |
| GET | /api/users | Danh sách khách hàng |
| GET | /api/users/:id | Chi tiết |
| PUT | /api/users/:id | Cập nhật |
| DELETE | /api/users/:id | Xóa |

Frontend hiện đang dùng localStorage — để chuyển sang API, thay `fetch` trong `js/app.js`:
```js
const res = await fetch(`http://localhost:5000/api/products?q=${q}&category=${cat}`);
const products = await res.json();
```
