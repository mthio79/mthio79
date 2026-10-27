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

    const menuBtn = document.getElementById('menuBtn');
    const navlinks = document.getElementById('navlinks');
    if (menuBtn && navlinks) {
      menuBtn.addEventListener('click', () => navlinks.classList.toggle('open'));
      navlinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navlinks.classList.remove('open')));
    }
  });
})();
