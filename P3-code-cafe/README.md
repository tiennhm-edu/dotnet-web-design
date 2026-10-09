# P3 – Code Cafe (Buổi 14 · Bài 3.1 HTML)

Website giới thiệu quán cà phê **Code Cafe** gồm 3 trang, viết bằng **HTML thuần**.

> **Quy ước bài này**: chưa học CSS nên chỉ dùng thuộc tính HTML (`width`, `height`, `border`, `colspan`, `rowspan`…)
> và **inline style** (`style="..."`) cho màu sắc cơ bản. Sang P4 ta sẽ tách toàn bộ ra file CSS và giải thích vì sao inline style khó bảo trì.

## Mục tiêu

Sau buổi học, học viên có thể:

- Viết khung một trang HTML chuẩn (`<!DOCTYPE html>`, `html`, `head`, `body`, `meta charset`, `title`).
- Dùng đúng heading `h1`–`h6`, đoạn văn và các thẻ định dạng chữ.
- Tạo liên kết nội bộ, liên kết ngoài, liên kết tới `#id`, `mailto:`, `tel:`.
- Dùng 3 loại danh sách `ul`, `ol`, `dl`.
- Chèn ảnh với `alt`, `width`, `height`.
- Dựng bảng có `caption`, `thead`/`tbody`/`tfoot`, `th scope`, `colspan`, `rowspan`.
- Phân biệt phần tử **block** và **inline**.

## Kiến thức áp dụng

| Kiến thức | Vị trí trong dự án |
|---|---|
| Cấu trúc trang, `meta`, `title`, favicon | Phần `<head>` cả 3 trang |
| Heading `h1`–`h6` | `index.html` – mục "Minh họa cấp bậc heading" |
| `p`, `br`, `hr`, `strong`, `em`, `mark`, `q`, `blockquote`, `code`, `small` | `index.html` – phần giới thiệu |
| HTML entities (`&lt;`, `&amp;`, `&copy;`, `&#8363;`, `&nbsp;`) | `index.html` |
| Liên kết nội bộ / ngoài (`target="_blank"` + `rel`) / `#id` | Thanh điều hướng, "Tài liệu tham khảo", "Đi nhanh tới" ở `menu.html` |
| `mailto:` (kèm `subject`, `cc`), `tel:`, `sms:` | Footer `index.html`, `contact.html` |
| `ul` lồng nhau, `ol` với `type`/`start`, `dl` | `index.html`, `contact.html` |
| `img` với `alt`, `title`, kích thước | Logo, banner, ảnh món ở `menu.html` |
| Bảng `colspan`, `rowspan`, `caption`, `tfoot` | `menu.html` (2 bảng), `contact.html` |
| `address` | `contact.html` |
| Block vs inline | `index.html` – mục "Góc học tập" |

## Các bước dựng theo buổi (live-code)

| Step | Thêm gì | Kiến thức |
|---|---|---|
| 1 | Tạo thư mục `P3-code-cafe/`, file `index.html`, gõ `!` + Tab (Emmet) để có khung. Đổi `lang="vi"`, sửa `title`. | Cấu trúc tài liệu, `meta charset`, `viewport` |
| 2 | Phần đầu trang: `div` chứa logo `img`, `h1` tên quán, `p` khẩu hiệu. Copy thư mục `images/`. | `img src/alt/width/height`, đường dẫn tương đối |
| 3 | Thanh điều hướng: các `a` trỏ `index.html`, `menu.html`, `contact.html`, `#gio-mo-cua`. | Liên kết nội bộ & liên kết tới `id` |
| 4 | Ảnh banner + phần giới thiệu: `h2`, `p`, `strong`, `em`, `mark`, `q`, `blockquote`. | Định dạng văn bản, ngữ nghĩa |
| 5 | Danh sách "Vì sao dân IT thích": `ul` có `ul` lồng; "Cách gọi món": `ol`; `ol type="a" start="3"`. | `ul`, `ol`, danh sách lồng |
| 6 | "Từ điển cà phê": `dl/dt/dd`. | Danh sách định nghĩa |
| 7 | "Góc học tập": 2 `div` và vài `span` có viền nét đứt → quan sát block xuống dòng, inline nằm cùng dòng. | Block vs inline |
| 8 | HTML entities, mục giờ mở cửa có `id="gio-mo-cua"`, minh họa `h3`–`h6`. | Entities, `id`, cấp bậc heading |
| 9 | Liên kết ngoài mở tab mới (`target="_blank" rel="noopener noreferrer"`), footer có `mailto:` và `tel:`. | Liên kết ngoài, bảo mật `rel` |
| 10 | Tạo `menu.html` (copy khung). Bảng giá: `caption`, `thead`, `th scope="col"`. | Bảng cơ bản |
| 11 | Gộp nhóm "Cà phê"/"Trà" bằng `rowspan`, giá bánh một size bằng `colspan="2"`, `tfoot` ghi chú. | `rowspan`, `colspan`, `tfoot` |
| 12 | Bảng Combo với header 2 tầng (`rowspan` + `colspan` ở `thead`). | Header phức tạp |
| 13 | Ảnh món nổi bật (4 `img` liền nhau) → chứng minh `img` là inline. | Ảnh inline |
| 14 | Tạo `contact.html`: `address`, bảng kênh liên hệ (`rowspan`), `sms:`, `mailto:?subject=&cc=`, FAQ bằng `dl`. | `address`, các scheme liên kết |
| 15 | Kiểm tra: bấm thử mọi liên kết, mở DevTools (F12) xem cây DOM, chạy validator. | Debug HTML |

## Bài tập mở rộng cho học viên

1. Thêm trang `about.html` (câu chuyện của quán) và nối vào thanh điều hướng của cả 4 trang.
2. Thêm bảng "Lịch sự kiện tháng" có ít nhất một ô `rowspan="3"` và một ô `colspan="3"`.
3. Thêm mục "Đội ngũ barista" dùng `figure` + `figcaption` cho 3 nhân viên (ảnh SVG/emoji tự làm).
4. Mục lục ở đầu `index.html` liên kết tới mọi `h2` của trang.
5. Thêm một liên kết tải về thực đơn (`<a href="..." download>`).
6. (Nâng cao) Dùng `<details>`/`<summary>` để làm phần FAQ thu gọn được.

## Checklist tự kiểm tra

- [ ] Mỗi trang có `<!DOCTYPE html>`, `lang="vi"`, `meta charset="UTF-8"`, `title` riêng.
- [ ] Mỗi trang chỉ có **một** `h1`; heading không nhảy cóc cấp.
- [ ] Mọi `img` đều có `alt` mô tả (logo trang trí có thể dùng `alt=""`).
- [ ] Liên kết ngoài có `target="_blank"` thì có `rel="noopener noreferrer"`.
- [ ] Liên kết `#id` nhảy đúng vị trí; không có liên kết hỏng.
- [ ] Bảng có `caption`, `th` có `scope`, tổng số ô mỗi hàng khớp sau khi tính `colspan`/`rowspan`.
- [ ] `mailto:` và `tel:` mở đúng ứng dụng.
- [ ] Giải thích được vì sao 2 `div` xuống dòng còn 2 `span` thì không.
- [ ] `npx --yes html-validate@8 "P3-code-cafe/**/*.html"` không báo lỗi.
