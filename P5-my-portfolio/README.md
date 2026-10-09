# P5 – My Portfolio (Buổi 18–22 · Bài 3.6 Bootstrap)

Portfolio cá nhân responsive của một .NET developer giả định – **Nguyễn Văn A** – xây bằng **Bootstrap 5.3.3** và một ít **JavaScript thuần**.

- Bootstrap CSS/JS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/...` (có `integrity` SRI)
- Bootstrap Icons: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/...`
- `css/style.css`: chỉ những gì Bootstrap không có sẵn (hero, timeline, hiệu ứng) + đổi màu primary qua biến `--bs-*`.
- `js/main.js`: dark mode, smooth scroll, back-to-top, modal động, validation form.

## Đọc code ở đâu trước

1. `index.html` – comment trước mỗi section giải thích lưới `row`/`col-*`, utility class và thuộc tính `data-bs-*` bật component (navbar, carousel, tabs, modal).
2. `css/style.css` – cách ghi đè biến `--bs-*` và phần CSS tự viết (timeline, back-to-top).
3. `js/main.js` – đọc từ khối `DOMContentLoaded` rồi lần lượt 5 tính năng: dark mode (`localStorage` + try/catch), smooth scroll, back-to-top, modal đọc `data-*`, validation form.

## Mục tiêu

- Hiểu hệ thống **grid 12 cột** và 6 breakpoint: `xs` (<576), `sm` ≥576, `md` ≥768, `lg` ≥992, `xl` ≥1200, `xxl` ≥1400.
- Dùng **utilities** (spacing `m-*`/`p-*`/`g-*`, màu `text-*`/`bg-*`, display `d-*`, flex `d-flex gap-*`) thay vì viết CSS.
- Dùng các component: navbar collapse, carousel, card, badge, progress, modal, tabs/pills, alert, form.
- Biết tùy biến Bootstrap bằng CSS variables và chế độ màu `data-bs-theme`.
- Viết JS thuần cơ bản: `querySelector`, `addEventListener`, `classList`, `dataset`, `localStorage`.

## Kiến thức áp dụng

| Kiến thức | Vị trí |
|---|---|
| Navbar `navbar-expand-lg` + `collapse`, `fixed-top`, Scrollspy (`data-bs-spy`) | Đầu `index.html` |
| Carousel `carousel-fade`, indicators, controls ẩn trên mobile (`d-none d-md-flex`) | `#home` |
| Grid: `row`/`col-12 col-lg-5`, `row-cols-2 row-cols-md-4`, `g-*`, nested grid | `#about`, `#projects`, `#services` |
| Tabs (`nav-tabs`) & Pills (`nav-pills`) với `tab-content`/`tab-pane fade` | Kỹ năng, Dự án, Hành trình |
| Card + `h-100`, `stretched-link`, badge, progress | `#projects`, `#about` |
| Modal: 1 modal dùng chung, nội dung lấy từ `data-*` qua sự kiện `show.bs.modal` | `#projectModal`, `#cvModal` |
| Feature/Service: `col-12 col-md-6 col-xl-3` | `#services` |
| Timeline tự viết bằng `::before` + award card | `#journey` |
| Form Bootstrap + validation (`novalidate`, `.was-validated`, `.invalid-feedback`) | `#contact` |
| Utilities: `py-4`, `mb-0`, `text-body-secondary`, `bg-body-tertiary`, `shadow-sm`, `rounded-4`, `visually-hidden(-focusable)` | Toàn trang |
| Dark mode `data-bs-theme` + `localStorage` (try/catch) | `<head>` + `main.js` |
| Smooth scroll trừ chiều cao navbar, tự đóng menu mobile | `main.js` |
| Back-to-top hiện khi cuộn > 400px | `main.js` + `.back-to-top` |

## Các bước dựng theo buổi (live-code)

### Buổi 18 – Làm quen Bootstrap, grid, utilities

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 1 | Tạo `index.html`, nhúng Bootstrap CSS + JS bundle từ jsDelivr (ghim `5.3.3`, có `integrity`). Thêm `css/style.css` **sau** Bootstrap. | CDN, SRI, thứ tự CSS |
| 2 | Thử `container` vs `container-fluid`; dựng `row` + `col-*` với nhiều breakpoint, kéo DevTools để thấy cột đổi. | Grid 12 cột, breakpoints |
| 3 | Section `#about`: `col-12 col-lg-5` + `col-12 col-lg-7`, danh sách liên hệ có icon, khối số liệu `row-cols-2 row-cols-md-4`. | Grid lồng nhau, `row-cols-*` |
| 4 | Thay CSS tự viết bằng utilities: spacing, màu, `d-flex`, `gap-*`, `text-center`, `rounded`, `shadow`. | Utilities |

### Buổi 19 – Navbar & Carousel

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 5 | Navbar `navbar-expand-lg fixed-top bg-body-tertiary`, nút `navbar-toggler`, `collapse` + `ms-auto`. `body { padding-top }`. | Navbar, collapse |
| 6 | Carousel 3 slide (nền gradient CSS, không cần ảnh), indicators, controls, `data-bs-interval`. | Carousel |
| 7 | Scrollspy: `data-bs-spy="scroll" data-bs-target="#mainNav"` trên `body`; style `.nav-link.active`. `scroll-margin-top` cho section. | Scrollspy |

### Buổi 20 – Card, Tabs/Pills, Modal

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 8 | `#projects`: pills 3 nhóm, mỗi pane là `row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4` các `card h-100`. | Card, pills, grid đều chiều cao |
| 9 | Nút "Chi tiết" có `data-bs-toggle="modal"` + `data-title`/`data-desc`/`data-tech`; một modal chung. | Modal |
| 10 | Tabs kỹ năng (Backend/Frontend/Công cụ) với progress bar, badge. | Tabs, progress, badge |
| 11 | Modal "CV tóm tắt" `modal-lg modal-dialog-scrollable`. | Kích thước modal |

### Buổi 21 – Feature, Timeline, Form, tùy biến

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 12 | `#services`: 4 feature `col-12 col-md-6 col-xl-3`, icon Bootstrap Icons. | Grid đa breakpoint |
| 13 | `#journey`: tabs Kinh nghiệm/Học tập, timeline (`ol.timeline` + `::before`), award card. | Kết hợp CSS riêng với Bootstrap |
| 14 | `#contact`: form `form-control`, `form-select`, `form-check`, `invalid-feedback`, `novalidate`. | Form Bootstrap |
| 15 | Đổi màu thương hiệu: ghi đè `--bs-primary`, `--bs-btn-*` trong `style.css`. Footer `data-bs-theme="dark"`. | Tùy biến bằng CSS variables |

### Buổi 22 – JavaScript cơ bản & hoàn thiện

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 16 | `js/main.js`: `DOMContentLoaded`, smooth scroll (`scrollTo` trừ chiều cao navbar), đóng menu mobile bằng `bootstrap.Collapse`. | DOM, sự kiện |
| 17 | Back-to-top: lắng nghe `scroll`, `classList.toggle('show', ...)`. | `classList`, scroll |
| 18 | Modal động: `show.bs.modal` → `event.relatedTarget.dataset`. | Sự kiện Bootstrap, `dataset` |
| 19 | Validation form: `checkValidity()`, `.was-validated`, alert thành công/thất bại, đếm ký tự. | Form API |
| 20 | Dark mode: nút đổi `data-bs-theme`, lưu `localStorage` trong `try/catch`; script nhỏ trong `<head>` áp theme trước khi vẽ trang. | `localStorage`, xử lý lỗi |
| 21 | Kiểm tra responsive ở 375 / 768 / 1200 / 1400px, chạy validator, deploy GitHub Pages. | Hoàn thiện, deploy |

## Bài tập mở rộng cho học viên

1. Thay "Nguyễn Văn A" bằng thông tin của chính bạn, thêm 3 dự án thật của bạn.
2. Thêm pill "Tất cả" hiển thị mọi dự án (gợi ý: lọc bằng JS theo `data-category` thay vì tab).
3. Thêm section "Blog" dùng `card` ngang (`row g-0` bên trong card).
4. Dùng **Offcanvas** thay cho collapse trên mobile.
5. Thêm **Toast** thông báo "Đã gửi" thay vì alert.
6. Nút "Tải CV" tải một file PDF (tự tạo) bằng thuộc tính `download`.
7. (Nâng cao) Khi chưa lưu theme, tự đổi theo hệ điều hành bằng `matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ...)`.

## Checklist tự kiểm tra

- [ ] Bootstrap được ghim phiên bản chính xác (`@5.3.3`) và có `integrity` + `crossorigin`.
- [ ] Ở mobile menu thu gọn thành nút hamburger; bấm link xong menu tự đóng.
- [ ] Bố cục đúng ở các mốc: 1 cột (xs), 2 cột (sm/md), 3–4 cột (lg/xl).
- [ ] Hạn chế CSS tự viết: những gì Bootstrap utilities làm được thì không viết lại.
- [ ] Tabs/pills dùng được bằng bàn phím (Tab, mũi tên).
- [ ] Modal "Chi tiết" hiển thị đúng thông tin của từng dự án.
- [ ] Gửi form trống → hiện viền đỏ + thông báo; gửi hợp lệ → thông báo thành công và form được xóa.
- [ ] Bật dark mode, tải lại trang → vẫn giữ dark mode. Ở chế độ ẩn danh/chặn storage trang vẫn không lỗi.
- [ ] Nút back-to-top chỉ hiện khi đã cuộn xuống.
- [ ] Console (F12) không có lỗi; `npx --yes html-validate@8 "P5-my-portfolio/**/*.html"` không báo lỗi.
