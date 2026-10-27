(function () {
  const root = document.documentElement;
  const body = document.body;

  // Theme
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', savedTheme);

  // Language
  const savedLang = localStorage.getItem('lang') || 'en';
  body.classList.remove('lang-en', 'lang-id');
  body.classList.add('lang-' + savedLang);

  window.toggleTheme = function () {
    const cur = root.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon();
  };
  function updateThemeIcon() {
    const btn = document.getElementById('themeBtn');
    if (!btn) return;
    btn.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
  }

  window.setLang = function (lang) {
    body.classList.remove('lang-en', 'lang-id');
    body.classList.add('lang-' + lang);
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateThemeIcon();
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === savedLang);
      b.addEventListener('click', (e) => { e.preventDefault(); setLang(b.dataset.lang); });
    });
    const tb = document.getElementById('themeBtn');
    if (tb) tb.addEventListener('click', toggleTheme);

    // Active nav
    const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.doc-nav a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === currentPage) a.setAttribute('aria-current', 'page');
    });

    // Mobile menu toggle (sidebar)
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.querySelector('.doc-nav');
    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
    }
  });
})();
