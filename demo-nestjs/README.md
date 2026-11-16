# Demo NestJS — REST API Quản lý Sản phẩm

- **Môn học:** Phát triển Web Front-End (`SW306DV01`)
- **Đề tài:** Đề tài 6 — Tìm hiểu về NestJS
- **Nhóm 5:**
  - Nguyễn Thái Bảo (`22501099`) — **Trưởng nhóm**
  - Trần Thành Đạt (`22503674`)
  - Đặng Quang Vinh (`22500202`)

## Cách cài đặt & chạy Demo

```bash
npm install
npm run start:dev
```

Sau khi chạy thành công:
- **Giao diện Web Demo (gọi API NestJS):** http://localhost:3000
- **Swagger UI (tài liệu & test API trực tiếp):** http://localhost:3000/api

## Kịch bản trình bày Demo trên lớp
1. **Cấu trúc Module - Controller - Service (`src/products/`):**
   - `products.module.ts`: gom Controller và Provider/Service vào một module độc lập.
   - `products.controller.ts`: định nghĩa endpoint `@Get`, `@Post`, `@Patch`, `@Delete`, sử dụng Dependency Injection tiêm `ProductsService`.
   - `products.service.ts`: đánh dấu `@Injectable()`, xử lý nghiệp vụ CRUD, lọc/tìm kiếm và ném `NotFoundException`.
   - `dto/create-product.dto.ts`: dùng decorator `class-validator` (`@IsNotEmpty`, `@MinLength`, `@Min`) kết hợp `ValidationPipe` toàn cục trong `main.ts`.
2. **Demo chạy thực tế:**
   - Mở `http://localhost:3000` để thêm/sửa/xóa/tìm kiếm sản phẩm và bấm **Test ValidationPipe** để cho thấy server tự chặn dữ liệu lỗi (`400 Bad Request`).
   - Mở `http://localhost:3000/api` (Swagger UI) để test endpoint trực tiếp bằng `Try it out`.
