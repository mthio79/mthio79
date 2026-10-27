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
    btn.textContent = root.getAttribute('data-theme') === 'dark' ? '☀ Light' : '☾ Dark';
  }

  window.setLang = function (lang) {
    body.classList.remove('lang-en', 'lang-id');
    body.classList.add('lang-' + lang);
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateThemeIcon();
    document.querySelectorAll('.lang-switch button').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === savedLang);
      b.addEventListener('click', () => setLang(b.dataset.lang));
    });
    const tb = document.getElementById('themeBtn');
    if (tb) tb.addEventListener('click', toggleTheme);

    const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.navlinks a').forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (href === currentPage || (currentPage === '' && href === 'index.html')) a.classList.add('active');
    });
    if (menuBtn && navlinks) {
      menuBtn.addEventListener('click', () => navlinks.classList.toggle('open'));
      navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));
    }
  // Scroll reveal
  const revealEls = document.querySelectorAll('section, .card, .step');
  revealEls.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
  });
})();
