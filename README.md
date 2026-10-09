# dotnet-web-design – Phần 3: Thiết kế Web (HTML, CSS, Bootstrap)

Kho mã nguồn mẫu cho **Phần 3** của khóa **.NET Full-stack**, buổi **14 → 22**.
Gồm 3 dự án học viên xây dựng trên lớp, đi từ HTML thuần → HTML5/CSS3 → Bootstrap 5.
Mỗi dự án là một **bản hoàn chỉnh để tham khảo** kèm **hướng dẫn dựng từng bước** cho giảng viên live-code.

- Giảng viên: **TienNHM**
- Xem trực tuyến (GitHub Pages): <https://tiennhm-edu.github.io/dotnet-web-design/>

## Mục đích

- Có sẵn sản phẩm "đích" để học viên hình dung trước khi code.
- Giảng viên dựng lại trên lớp theo từng **Step** trong README của mỗi dự án.
- Học viên đối chiếu, làm bài tập mở rộng và tự kiểm tra bằng checklist.

## Bản đồ buổi học → dự án → giáo trình

| Buổi | Bài giáo trình | Dự án | Nội dung chính |
|---|---|---|---|
| 14 | Bài 3.1 HTML | [P3 – Code Cafe](P3-code-cafe/) | Cấu trúc trang, heading, đoạn văn, liên kết, danh sách, ảnh, bảng (colspan/rowspan), block vs inline |
| 15 | Bài 3.2 Meipaly · Bài 3.3 CSS | [P4 – CyberShop](P4-layout-shop/) | CSS external, selector, specificity, box model, Flexbox cho header/nav |
| 16 | Bài 3.4 HTML5 | [P4 – CyberShop](P4-layout-shop/) | Thẻ semantic, form tìm kiếm (GET), form đăng ký (POST), input types & validation |
| 17 | Bài 3.5 CSS3 | [P4 – CyberShop](P4-layout-shop/) | CSS Grid, position, transition/transform, `@keyframes`, CSS variables, media query mobile-first |
| 18–22 | Bài 3.6 Bootstrap | [P5 – My Portfolio](P5-my-portfolio/) | Grid 12 cột, breakpoints, utilities, navbar, carousel, card, modal, tabs/pills, form validation, dark mode, JS cơ bản |

> Bài 3.2 (Meipaly) là bài cắt layout theo mẫu: dùng P4 làm khung luyện cắt layout trước khi học viên tự làm Meipaly.

## Cách chạy

Không cần cài đặt gì – tất cả là file tĩnh.

1. **Mở trực tiếp**: double-click `index.html` (hoặc file `index.html` trong từng thư mục dự án).
2. **VS Code + Live Server** (khuyến nghị, tự reload khi lưu):
   - Cài extension *Live Server* (Ritwick Dey).
   - Mở thư mục repo → chuột phải `index.html` → **Open with Live Server**.
3. P5 tải Bootstrap từ CDN jsDelivr nên cần có Internet.

## Cấu trúc thư mục

```text
dotnet-web-design/
├── index.html                 # Trang landing (trang chủ GitHub Pages)
├── assets/favicon.svg
├── P3-code-cafe/         # Buổi 14 – HTML thuần
│   ├── index.html, menu.html, contact.html
│   ├── images/                # SVG tự vẽ (logo, banner, món)
│   └── README.md
├── P4-layout-shop/            # Buổi 15–17 – HTML5 + CSS3
│   ├── index.html, search.html, register.html, css-lab.html
│   ├── css/style.css
│   ├── images/
│   └── README.md
├── P5-my-portfolio/           # Buổi 18–22 – Bootstrap 5.3
│   ├── index.html
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   └── README.md
├── tools/check-links.mjs      # Script kiểm tra liên kết nội bộ
├── .github/workflows/pages.yml
├── .htmlvalidate.json, .editorconfig, .gitignore, LICENSE
└── README.md
```

## Quy ước

- **Nội dung hiển thị**: tiếng Việt có dấu. **Tên class/id/biến**: tiếng Anh, kebab-case (`product-card`, `site-header`).
- Thụt lề 2 dấu cách, UTF-8, LF (xem `.editorconfig`).
- Không dùng ảnh/font/logo có bản quyền: hình minh họa là **SVG tự vẽ, gradient CSS, emoji**. Thư viện ngoài duy nhất là
  Bootstrap 5.3.3 và Bootstrap Icons 1.11.3 qua jsDelivr (ghim phiên bản chính xác).
- "CyberShop", "Code Cafe", "Nguyễn Văn A" và mọi dữ liệu (email `*.example`, số điện thoại 0900 000 000…) đều là **giả định**.
- Mỗi file có comment chia khu vực để giảng viên dễ tìm khi live-code.

## Kiểm tra chất lượng

Cần Node.js ≥ 18.

```bash
# 1. Kiểm tra HTML hợp lệ (cấu hình trong .htmlvalidate.json)
npx --yes html-validate@8 "**/*.html"

# 2. Kiểm tra mọi liên kết/ảnh/CSS tương đối đều trỏ tới file tồn tại (và #id tồn tại)
node tools/check-links.mjs
```

## Triển khai GitHub Pages

Workflow `.github/workflows/pages.yml` deploy **toàn bộ thư mục gốc** mỗi khi push lên `main` (hoặc chạy tay qua *Run workflow*).

1. Tạo repo `dotnet-web-design` trong tổ chức/tài khoản `tiennhm-edu`, push nhánh `main`.
2. Vào **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Sau khi workflow chạy xong, trang có tại `https://tiennhm-edu.github.io/dotnet-web-design/`.

## Giấy phép

[MIT](LICENSE) © TienNHM / tiennhm-edu
