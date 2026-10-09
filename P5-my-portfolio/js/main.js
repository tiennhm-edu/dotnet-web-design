/* =========================================================
   P5 - My Portfolio - JavaScript thuần (vanilla JS)
   1. Dark mode (lưu localStorage, có try/catch)
   2. Smooth scroll + tự đóng menu trên mobile
   3. Nút back-to-top
   4. Modal chi tiết dự án (đọc data-* attributes)
   5. Validation form liên hệ + thông báo

   Ý tưởng chung của JS trên trang web (DOM = cây phần tử HTML):
     (1) TÌM phần tử   → document.getElementById / querySelector
     (2) NGHE sự kiện  → element.addEventListener('click', hàm)
     (3) THAY ĐỔI DOM  → textContent, classList, setAttribute
   Mọi thứ Bootstrap làm được bằng data-bs-* thì để Bootstrap lo;
   file này chỉ viết phần Bootstrap không có sẵn.
   Mẹo: mở DevTools (F12) → tab Console để xem lỗi và thử từng lệnh.
   ========================================================= */

// 'use strict': chế độ nghiêm ngặt – biến chưa khai báo sẽ báo lỗi ngay
// thay vì âm thầm tạo biến toàn cục (giúp bắt lỗi gõ sai tên biến).
'use strict';

// DOMContentLoaded: chạy khi trình duyệt đã đọc xong HTML (chưa cần chờ ảnh).
// Gom mọi hàm khởi tạo vào một chỗ → nhìn là biết trang có những tính năng gì.
// (Script đã nằm cuối <body> nên DOM có sẵn; vẫn dùng sự kiện này cho chắc chắn.)
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSmoothScroll();
  initBackToTop();
  initProjectModal();
  initCvModal();
  initContactForm();

  // Cập nhật năm ở footer. Luôn kiểm tra phần tử tồn tại trước khi dùng:
  // ⚠️ Lỗi hay gặp: getElementById trả về null (sai id) → "Cannot set properties of null".
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});

/* ---------- 1. DARK MODE ----------
   Theme được lưu bằng thuộc tính data-bs-theme trên thẻ <html>;
   Bootstrap 5.3 tự đổi toàn bộ màu theo thuộc tính này.
   localStorage: kho lưu trữ dạng chuỗi key → value trong trình duyệt,
   còn nguyên sau khi tải lại trang hay tắt máy (khác biến JS mất khi reload). */
const THEME_KEY = 'portfolio-theme';

// Lưu theme. Bọc try/catch vì localStorage có thể NÉM LỖI (chế độ ẩn danh
// của một số trình duyệt, bị chặn cookie, hết dung lượng...).
// ⚠️ Lỗi hay gặp: gọi localStorage trực tiếp không có try/catch → một lỗi
//    làm dừng cả đoạn script phía sau.
function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // Trình duyệt chặn localStorage: vẫn đổi theme, chỉ là không nhớ được.
    console.warn('Không thể lưu theme:', e);
  }
}

// Áp dụng theme lên trang + đồng bộ icon và nhãn của nút.
// aria-label / aria-pressed cho trình đọc màn hình biết trạng thái hiện tại.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  const isDark = theme === 'dark';
  // Toán tử 3 ngôi: điều_kiện ? giá_trị_khi_đúng : giá_trị_khi_sai
  icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  btn.setAttribute('aria-label', isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối');
  btn.setAttribute('aria-pressed', String(isDark));
}

// Gắn sự kiện click cho nút 🌙/☀️: đọc theme hiện tại → đảo ngược → áp dụng → lưu.
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  // Theme ban đầu đã được script trong <head> đặt sẵn → chỉ cần đồng bộ icon.
  applyTheme(document.documentElement.getAttribute('data-bs-theme') || 'light');

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });
}

/* ---------- 2. SMOOTH SCROLL ----------
   Cuộn mượt tới section khi bấm link nội bộ (#about, #projects...),
   có trừ chiều cao navbar fixed-top để tiêu đề section không bị che. */

// Tính vị trí cần cuộn tới:
// getBoundingClientRect().top = khoảng cách từ mép trên CỬA SỔ tới phần tử,
// cộng window.scrollY (đã cuộn bao nhiêu) = vị trí tuyệt đối trong trang.
// Tôn trọng prefers-reduced-motion: người dùng tắt chuyển động thì nhảy thẳng ('auto').
function scrollToTarget(target) {
  // ?. (optional chaining): nếu không tìm thấy #mainNav thì trả về undefined thay vì lỗi.
  const navHeight = document.getElementById('mainNav')?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function initSmoothScroll() {
  const navMenu = document.getElementById('navMenu');

  // Selector a[href^="#"]: mọi thẻ <a> có href BẮT ĐẦU bằng "#".
  // querySelectorAll trả về danh sách (NodeList) → duyệt bằng forEach.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;

      // preventDefault: chặn hành vi mặc định (nhảy tức thì) để tự cuộn mượt.
      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, '', id); // cập nhật URL mà không "nhảy" trang

      // Mobile: bấm link xong thì đóng menu collapse
      // (gọi API JavaScript của Bootstrap – window.bootstrap có từ bootstrap.bundle.min.js).
      if (navMenu && navMenu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });
}

/* ---------- 3. BACK TO TOP ----------
   Nghe sự kiện 'scroll' của cửa sổ: cuộn quá 400px thì hiện nút.
   - classList.toggle('show', điều_kiện): true → thêm class, false → bỏ class;
     hiệu ứng hiện/ẩn do CSS (.back-to-top.show) đảm nhận – JS chỉ đổi class.
   - { passive: true }: hứa không gọi preventDefault → trình duyệt cuộn mượt hơn.
   ⚠️ Lỗi hay gặp: làm việc nặng (đổi nhiều style, tính toán lớn) trong sự kiện scroll –
      sự kiện này bắn hàng chục lần mỗi giây. Muốn biết phần tử nào đang hiện trên
      màn hình thì nên dùng IntersectionObserver (Scrollspy của Bootstrap dùng cách này). */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggle = () => btn.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle(); // gọi một lần lúc đầu: trang có thể mở sẵn ở giữa (reload, link #id)

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- 4. MODAL CHI TIẾT DỰ ÁN ----------
   Một modal dùng chung cho mọi dự án. Mỗi nút "Chi tiết" mang dữ liệu riêng
   trong data-title / data-tech / data-desc; JS đọc qua thuộc tính dataset:
     data-title → dataset.title,  data-tech → dataset.tech  (data-foo-bar → dataset.fooBar) */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  // Sự kiện của Bootstrap: chạy ngay trước khi modal hiện ra
  modal.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget; // nút đã bấm
    if (!trigger) return;
    // textContent (không phải innerHTML): chèn CHỮ thuần, an toàn trước mã HTML lạ.
    modal.querySelector('#projectModalLabel').textContent = trigger.dataset.title || 'Chi tiết dự án';
    modal.querySelector('#projectModalDesc').textContent = trigger.dataset.desc || '';
    modal.querySelector('#projectModalTech').textContent = trigger.dataset.tech || '';
  });
}

// Nút "Liên hệ ngay" trong modal CV: đóng modal rồi cuộn tới form liên hệ.
// Dùng API Bootstrap: bootstrap.Modal.getOrCreateInstance(phần_tử).hide()
function initCvModal() {
  const modal = document.getElementById('cvModal');
  const btn = document.getElementById('cvContactBtn');
  if (!modal || !btn || !window.bootstrap) return;

  btn.addEventListener('click', () => {
    // Đợi modal đóng hẳn rồi mới cuộn tới form liên hệ
    // ({ once: true }: listener tự gỡ sau lần chạy đầu – không bị gắn chồng nhiều lần).
    modal.addEventListener('hidden.bs.modal', () => {
      const contact = document.getElementById('contact');
      if (contact) scrollToTarget(contact);
      document.getElementById('contactName')?.focus({ preventScroll: true });
    }, { once: true });
    bootstrap.Modal.getOrCreateInstance(modal).hide();
  });
}

/* ---------- 5. FORM LIÊN HỆ ----------
   Form có thuộc tính novalidate (tắt bong bóng lỗi mặc định), JS tự kiểm tra
   bằng Constraint Validation API của trình duyệt và hiển thị lỗi kiểu Bootstrap.
   ⚠️ Kiểm tra phía trình duyệt chỉ để trải nghiệm tốt hơn – người dùng có thể
      tắt JS hoặc sửa HTML; khi có server (ASP.NET Core) PHẢI kiểm tra lại ở server. */

// Hiện thông báo trong #formAlert. Template string `...${biến}...` ghép chuỗi
// → class thành "alert alert-success" hoặc "alert alert-danger".
// Gán lại className cũng xóa luôn class d-none → alert hiện ra.
function showAlert(type, message) {
  const alertBox = document.getElementById('formAlert');
  if (!alertBox) return;
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // Bộ đếm ký tự: sự kiện 'input' bắn mỗi lần nội dung thay đổi (gõ, dán, xóa).
  const message = form.querySelector('#contactMessage');
  const counter = document.getElementById('charCount');
  const updateCounter = () => {
    counter.textContent = message.value.length;
  };
  message.addEventListener('input', updateCounter);

  // Sự kiện 'submit' gắn vào FORM (không phải nút) → bắt được cả khi nhấn Enter.
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // trang tĩnh: không gửi lên server

    // checkValidity() dùng lại các thuộc tính HTML5: required, minlength, type="email"...
    if (!form.checkValidity()) {
      form.classList.add('was-validated'); // Bootstrap hiển thị .invalid-feedback
      showAlert('danger', 'Vui lòng kiểm tra lại các trường được đánh dấu đỏ.');
      // Đưa con trỏ tới ô lỗi đầu tiên – giúp người dùng bàn phím/trình đọc màn hình.
      form.querySelector(':invalid')?.focus();
      return;
    }

    // .trim() bỏ khoảng trắng thừa ở hai đầu chuỗi người dùng nhập.
    const name = form.querySelector('#contactName').value.trim();
    showAlert('success', `Cảm ơn ${name}! Lời nhắn đã được ghi nhận (bản demo – chưa gửi tới máy chủ).`);
    form.reset();
    form.classList.remove('was-validated');
    updateCounter();
  });

  // Nút "Xóa" (type="reset"): bỏ trạng thái báo lỗi.
  // setTimeout(..., 0): sự kiện reset chạy TRƯỚC khi trình duyệt xóa giá trị,
  // nên đợi một nhịp để đếm lại ký tự sau khi ô đã trống.
  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
    setTimeout(updateCounter, 0);
  });
}
