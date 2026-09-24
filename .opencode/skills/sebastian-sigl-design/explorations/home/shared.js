// Shared helpers for the home-page direction explorations.
(function () {
  const M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const fmt = (d, style) => { const [y, m, day] = d.split('-'); return style === 'iso' ? d : style === 'short' ? M[+m - 1] + ' ' + (+day) : M[+m - 1] + ' ' + (+day) + ', ' + y; };
  const media = (p) => Object.keys(p.media || {}).filter((k) => p.media[k] && p.media[k] !== '#');
  const MEDIA_LABEL = { spotify: 'Podcast', youtube: 'Video', infographic: 'Infographic' };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function theme(key) {
    const root = document.documentElement;
    const saved = localStorage.getItem(key);
    const set = (t) => { root.dataset.theme = t; localStorage.setItem(key, t); document.querySelectorAll('[data-theme-toggle]').forEach((b) => { b.setAttribute('aria-pressed', t === 'dark'); b.querySelector('[data-theme-label]') && (b.querySelector('[data-theme-label]').textContent = t === 'dark' ? 'Dark' : 'Light'); }); };
    set(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    document.addEventListener('click', (e) => { const b = e.target.closest('[data-theme-toggle]'); if (b) set(root.dataset.theme === 'dark' ? 'light' : 'dark'); });
  }
  function filterable(render) {
    let cat = 'all', q = '';
    const run = () => render(SS_DATA.posts.filter((p) => (cat === 'all' || p.category === cat) && (!q || (p.title + ' ' + p.description).toLowerCase().includes(q))), { cat, q });
    document.addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (!b) return; cat = b.dataset.cat; document.querySelectorAll('[data-cat]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.cat === cat)); run(); });
    document.addEventListener('input', (e) => { if (e.target.matches('[data-search]')) { q = e.target.value.trim().toLowerCase(); run(); } });
    document.addEventListener('submit', (e) => { if (e.target.matches('[data-sub]')) { e.preventDefault(); const f = e.target; f.querySelector('[data-sub-msg]').textContent = 'Check your inbox to confirm.'; f.reset(); } if (e.target.matches('[data-search-form]')) e.preventDefault(); });
    document.addEventListener('keydown', (e) => { if ((e.metaKey || e.ctrlKey) && e.key === 'k') { const s = document.querySelector('[data-search]'); if (s) { e.preventDefault(); s.focus(); } } });
    run();
  }
  window.HX = { fmt, media, MEDIA_LABEL, esc, theme, filterable, count: (c) => SS_DATA.posts.filter((p) => c === 'all' || p.category === c).length };
})();
