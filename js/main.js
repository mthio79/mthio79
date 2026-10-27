(function () {
  const body = document.body;

  // Language
  const savedLang = localStorage.getItem('lang') || 'en';
  body.classList.remove('lang-en', 'lang-id');
  body.classList.add('lang-' + savedLang);

  window.setLang = function (lang) {
    body.classList.remove('lang-en', 'lang-id');
    body.classList.add('lang-' + lang);
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === savedLang);
      b.addEventListener('click', (e) => { e.preventDefault(); setLang(b.dataset.lang); });
    });

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
