/* =========================================================
   P5 - My Portfolio - JavaScript thuần (vanilla JS)
   1. Dark mode (lưu localStorage, có try/catch)
   2. Smooth scroll + tự đóng menu trên mobile
   3. Nút back-to-top
   4. Modal chi tiết dự án (đọc data-* attributes)
   5. Validation form liên hệ + thông báo
   ========================================================= */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSmoothScroll();
  initBackToTop();
  initProjectModal();
  initCvModal();
  initContactForm();

  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});

/* ---------- 1. DARK MODE ---------- */
const THEME_KEY = 'portfolio-theme';

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    // Trình duyệt chặn localStorage: vẫn đổi theme, chỉ là không nhớ được.
    console.warn('Không thể lưu theme:', e);
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-bs-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  const isDark = theme === 'dark';
  icon.className = isDark ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  btn.setAttribute('aria-label', isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối');
  btn.setAttribute('aria-pressed', String(isDark));
}

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

/* ---------- 2. SMOOTH SCROLL ---------- */
function scrollToTarget(target) {
  const navHeight = document.getElementById('mainNav')?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
}

function initSmoothScroll() {
  const navMenu = document.getElementById('navMenu');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, '', id); // cập nhật URL mà không "nhảy" trang

      // Mobile: bấm link xong thì đóng menu collapse
      if (navMenu && navMenu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });
}

/* ---------- 3. BACK TO TOP ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggle = () => btn.classList.toggle('show', window.scrollY > 400);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- 4. MODAL CHI TIẾT DỰ ÁN ---------- */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  // Sự kiện của Bootstrap: chạy ngay trước khi modal hiện ra
  modal.addEventListener('show.bs.modal', (event) => {
    const trigger = event.relatedTarget; // nút đã bấm
    if (!trigger) return;
    modal.querySelector('#projectModalLabel').textContent = trigger.dataset.title || 'Chi tiết dự án';
    modal.querySelector('#projectModalDesc').textContent = trigger.dataset.desc || '';
    modal.querySelector('#projectModalTech').textContent = trigger.dataset.tech || '';
  });
}

function initCvModal() {
  const modal = document.getElementById('cvModal');
  const btn = document.getElementById('cvContactBtn');
  if (!modal || !btn || !window.bootstrap) return;

  btn.addEventListener('click', () => {
    // Đợi modal đóng hẳn rồi mới cuộn tới form liên hệ
    modal.addEventListener('hidden.bs.modal', () => {
      const contact = document.getElementById('contact');
      if (contact) scrollToTarget(contact);
      document.getElementById('contactName')?.focus({ preventScroll: true });
    }, { once: true });
    bootstrap.Modal.getOrCreateInstance(modal).hide();
  });
}

/* ---------- 5. FORM LIÊN HỆ ---------- */
function showAlert(type, message) {
  const alertBox = document.getElementById('formAlert');
  if (!alertBox) return;
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const message = form.querySelector('#contactMessage');
  const counter = document.getElementById('charCount');
  const updateCounter = () => {
    counter.textContent = message.value.length;
  };
  message.addEventListener('input', updateCounter);

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // trang tĩnh: không gửi lên server

    // checkValidity() dùng lại các thuộc tính HTML5: required, minlength, type="email"...
    if (!form.checkValidity()) {
      form.classList.add('was-validated'); // Bootstrap hiển thị .invalid-feedback
      showAlert('danger', 'Vui lòng kiểm tra lại các trường được đánh dấu đỏ.');
      form.querySelector(':invalid')?.focus();
      return;
    }

    const name = form.querySelector('#contactName').value.trim();
    showAlert('success', `Cảm ơn ${name}! Lời nhắn đã được ghi nhận (bản demo – chưa gửi tới máy chủ).`);
    form.reset();
    form.classList.remove('was-validated');
    updateCounter();
  });

  form.addEventListener('reset', () => {
    form.classList.remove('was-validated');
    setTimeout(updateCounter, 0);
  });
}
