# P4 – CyberShop (Buổi 15–17 · Bài 3.2 → 3.5)

Trang bán hàng kiểu sàn thương mại điện tử **CyberShop** (thương hiệu giả định, chỉ lấy cảm hứng bố cục từ các sàn TMĐT phổ biến).
Toàn bộ trình bày nằm trong **một file CSS external** viết theo hướng **mobile-first**.

| Trang | Nội dung |
|---|---|
| `index.html` | Header (top bar, logo, tìm kiếm, giỏ hàng), nav danh mục, banner động, danh mục nhanh, Flash Sale, bộ lọc + Gợi ý hôm nay, footer |
| `search.html` | Kết quả tìm kiếm – nhận dữ liệu từ form **GET** (`?q=...`) |
| `register.html` | Form đăng ký – **POST**, input types HTML5, thuộc tính validation |
| `css-lab.html` | Góc học tập: selector quan hệ, pseudo-class, specificity, `!important` |

## Đọc code ở đâu trước

1. `index.html` – comment đầu `<body>` tóm tắt các thẻ semantic; mỗi khối giải thích class nào được CSS dùng để làm gì.
2. `css/style.css` – đọc theo mục lục 1 → 13; mỗi nhóm rule có comment giải thích khái niệm (box model, Flexbox, Grid, position, `@keyframes`, media query) và các `⚠️ Lỗi hay gặp`.
3. `register.html` (form POST + validation) → `search.html` (form GET) → `css-lab.html` (specificity, mở cùng DevTools).

## Mục tiêu

- Tách nội dung (HTML) và trình bày (CSS) bằng `<link rel="stylesheet">`.
- Dùng thẻ **semantic HTML5** thay cho "div soup".
- Viết form chuẩn: `label`–`for`, `name`, GET vs POST, validation phía trình duyệt.
- Nắm selector, specificity, box model, Flexbox, Grid, position.
- Tạo hiệu ứng bằng transition/transform và `@keyframes`.
- Làm giao diện responsive mobile-first bằng media query; quản lý màu/khoảng cách bằng CSS variables.

## Kiến thức áp dụng

| Kiến thức | Vị trí |
|---|---|
| CSS variables (`:root`, `var()`) | `style.css` mục 1 |
| `box-sizing: border-box`, reset | mục 2 |
| Semantic: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`/`figcaption`, `address` | `index.html` |
| Flexbox: header, nav, card, footer payment | mục 4, 5, 8 (`display: flex`, `gap`, `order`, `flex-wrap`, `margin-left: auto`) |
| CSS Grid: danh mục nhanh, lưới sản phẩm, layout aside + nội dung, footer | mục 7, 8, 9, 11 (`grid-template-columns: repeat(...)`) |
| `position`: sticky header, badge giảm giá/“Yêu thích” (absolute trong relative), số lượng giỏ hàng | mục 4, 8 |
| Transition + transform khi hover thẻ sản phẩm, nút | mục 3, 8 |
| `@keyframes`: banner tự trượt, chấm chỉ báo; `animation-play-state` khi hover | mục 6 |
| Pseudo-class/element: `:hover`, `:focus-visible`, `:nth-child`, `:first-child`, `:last-child`, `:not()`, `:user-invalid`, `::before`, `::after` | rải rác, `css-lab.html` |
| Selector quan hệ: con `>`, hậu duệ, anh em kề `+`, anh em `~`, thuộc tính `[aria-current="page"]` | mục 4, 5, 13 |
| Specificity, `!important` | mục 13 + `css-lab.html` |
| Media query mobile-first: 576 / 768 / 992 / 1200px | mục 12 |
| `prefers-reduced-motion` | mục 6 |
| Form GET (tìm kiếm, bộ lọc) / POST (đăng ký) | `index.html`, `search.html`, `register.html` |
| Input types: `search`, `email`, `password`, `tel`, `date`, `number`, `url`, `range`, `color`, `checkbox`, `radio`, `hidden`; `select`/`optgroup`, `datalist`, `textarea` | `register.html` |
| Validation: `required`, `minlength`, `maxlength`, `pattern`, `min`, `max`, `step` | `register.html` |

> **Về form POST**: trang tĩnh không có server, nên `register.html` gửi tới `https://httpbin.org/post` (dịch vụ công khai
> trả lại dữ liệu bạn gửi dưới dạng JSON, mở tab mới) để học viên **nhìn thấy body của request POST**. Dặn học viên chỉ nhập dữ liệu giả.
> Nếu lớp không có Internet, đổi `action` thành `search.html` và `method="get"` để so sánh URL.

## Các bước dựng theo buổi (live-code)

### Buổi 15 – CSS cơ bản, selector, Flexbox (Bài 3.2, 3.3)

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 1 | Tạo `index.html`, `css/style.css`, gắn `<link rel="stylesheet" href="css/style.css">`. So sánh với inline style ở P3. | 3 cách nhúng CSS, thứ tự ưu tiên |
| 2 | Khai báo biến màu/khoảng cách trong `:root`; reset `box-sizing`, `body`. | CSS variables, box model |
| 3 | Header: `header.site-header` → `.topbar` (2 `ul`) + `.header-main` (logo, form tìm kiếm, giỏ hàng). | Flexbox: `justify-content`, `align-items`, `gap`, `flex: 1` |
| 4 | Badge số lượng giỏ hàng: `.cart { position: relative }`, `.cart-count { position: absolute }`. | position relative/absolute |
| 5 | Nav danh mục: `nav > ul` flex, `a` có `border-bottom` đổi màu khi `:hover` và `[aria-current="page"]`. | Pseudo-class, selector thuộc tính |
| 6 | Mở `css-lab.html`: cho học viên đoán màu từng đoạn trước khi giải thích specificity (a, b, c). | Specificity, selector quan hệ |

### Buổi 16 – HTML5 semantic & Form (Bài 3.4)

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 7 | Dựng khung `main` > `section` (banner, danh mục, flash sale) + `div.content-layout` > `aside` + `section`; `footer` với 4 `section`. Chỉ HTML, chưa CSS. | Thẻ semantic, outline tài liệu |
| 8 | Thẻ sản phẩm: `article.product-card` > `a` > `figure` > (`.product-thumb`, `figcaption` > `h3`, giá, `del`). | `article`, `figure`, `figcaption`, `del` |
| 9 | Form tìm kiếm `method="get" action="search.html"`, `label.sr-only`, `type="search"`, `required minlength="2"`. Gõ thử → xem URL. | GET, query string, accessibility |
| 10 | Tạo `search.html` (dùng chung header/footer), form sắp xếp có `select`. | GET với nhiều tham số |
| 11 | Tạo `register.html`: `fieldset`/`legend`, các input types, `datalist`, `optgroup`, `hidden`; `method="post"`. Gửi thử → xem JSON trả về. | POST vs GET, input types |
| 12 | Thêm validation: `required`, `pattern="0[0-9]{9}"`, `minlength`, `min`/`max`; CSS `:user-invalid`, `.required::after`. | Validation HTML5, pseudo-element |

### Buổi 17 – CSS3: Grid, hiệu ứng, responsive (Bài 3.5)

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 13 | `.product-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap }` (mobile). | CSS Grid |
| 14 | Badge giảm giá `position: absolute; top: 0; right: 0` + `clip-path` hình lá cờ; nhãn "Yêu thích" bên trái. | position, `clip-path` |
| 15 | Hover thẻ: `transform: translateY(-4px)`, `box-shadow`, ảnh `scale(1.06)`; khai báo `transition`. | transition, transform |
| 16 | Banner: `.banner-track` rộng 300%, `@keyframes slide` dịch `translateX`; chấm chỉ báo với `animation-delay`; dừng khi hover. | `@keyframes`, `animation` |
| 17 | Thanh tiến độ Flash Sale (`span` absolute bên trong `.progress`), countdown. | Kết hợp position + gradient |
| 18 | Media query mobile-first: 576px (3 cột), 768px (hiện top bar, 4 cột, hero 2 cột), 992px (aside + 4 cột), 1200px (6 cột). Kéo thử DevTools → Toggle device toolbar. | Responsive, breakpoint |
| 19 | `prefers-reduced-motion`, `:focus-visible`, kiểm tra Tab bằng bàn phím. | Accessibility |
| 20 | Chạy validator + link checker, sửa lỗi. | Quy trình kiểm tra |

## Bài tập mở rộng cho học viên

1. Thêm trang `product.html` (chi tiết sản phẩm): ảnh lớn + thông tin dùng Grid 2 cột trên desktop, 1 cột trên mobile.
2. Thêm nhãn "Mới" (góc dưới trái) cho 2 sản phẩm bằng `position: absolute`.
3. Đổi bảng màu sang theme xanh lá chỉ bằng cách sửa CSS variables.
4. Làm mục "Thương hiệu nổi bật" dạng lưới `grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))` – không cần media query.
5. Thêm ô "Nhập lại mật khẩu" và thử giải thích vì sao HTML thuần không kiểm tra được hai ô khớp nhau (sẽ dùng JS ở P5).
6. (Nâng cao) Hiện bộ lọc `aside` trên mobile dưới dạng khối thu gọn bằng `<details>`.

## Checklist tự kiểm tra

- [ ] Không còn `style="..."` cho trình bày chung; mọi CSS nằm trong `css/style.css`.
- [ ] Trang dùng đúng `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `figure`.
- [ ] Mỗi `input` có `label` liên kết qua `for`/`id` (hoặc bọc trong `label`) và có `name`.
- [ ] Form tìm kiếm dùng GET, form đăng ký dùng POST – giải thích được khác biệt.
- [ ] Gửi form đăng ký trống → trình duyệt chặn và báo lỗi.
- [ ] Header và nav dùng Flexbox; lưới sản phẩm dùng Grid.
- [ ] Badge giảm giá nằm đúng góc thẻ dù thay đổi kích thước màn hình.
- [ ] Hover thẻ sản phẩm có hiệu ứng mượt; banner tự chạy và dừng khi rê chuột.
- [ ] Ở 375px không có thanh cuộn ngang; ở 1200px lưới hiển thị 6 cột.
- [ ] Màu sắc lấy từ CSS variables, không lặp mã màu.
- [ ] `npx --yes html-validate@8 "P4-layout-shop/**/*.html"` và `node tools/check-links.mjs` không báo lỗi.
