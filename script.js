/* ===================================================
   Designer Guide V4 — JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Theme Toggle (Dark/Light) ----
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('dg4-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('dg4-theme', next);
  });

  // ---- Scroll Reveal (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ---- Active Section Tracking in Sidebar ----
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.content-section, .hero-section');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navItems.forEach((item) => {
            item.classList.toggle('active', item.getAttribute('data-section') === id);
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' }
  );
  sections.forEach((s) => { if (s.id) sectionObserver.observe(s); });

  // ---- Smooth Scroll for Sidebar Nav ----
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Close mobile sidebar
      sidebar.classList.remove('open');
      sidebarToggle.classList.remove('active');
    });
  });

  // ---- Mobile Sidebar Toggle ----
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');

  sidebarToggle.addEventListener('click', () => {
    sidebarToggle.classList.toggle('active');
    sidebar.classList.toggle('open');
  });

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 &&
        sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
      sidebarToggle.classList.remove('active');
    }
  });

  // ---- Glossary Accordion ----
  const glossaryItems = document.querySelectorAll('.glossary-item');
  glossaryItems.forEach((item) => {
    const term = item.querySelector('.glossary-term');
    term.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  // ---- FAQ Accordion ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close others
      faqItems.forEach((other) => {
        if (other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open');
    });
  });

});
