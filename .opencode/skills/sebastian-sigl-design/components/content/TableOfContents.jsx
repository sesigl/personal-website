import React from 'react';

export function TableOfContents({ items = [], title = 'On this page', offset = 120 }) {
  const [active, setActive] = React.useState(items[0] && items[0].id);
  React.useEffect(() => {
    if (!items.length) return undefined;
    const on = () => {
      let cur = items[0].id;
      for (const it of items) { const el = document.getElementById(it.id); if (el && el.getBoundingClientRect().top - offset <= 0) cur = it.id; }
      setActive(cur);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [items.map((i) => i.id).join('|'), offset]);
  const go = (id) => (e) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset + 24, behavior: 'smooth' });
    setActive(id);
  };
  return (
    <nav className="ss-toc" aria-label="Table of contents">
      <div className="ss-kicker">{title}</div>
      <ol className="ss-toc__list">
        {items.map((it, i) => (
          <li key={it.id}><a href={'#' + it.id} onClick={go(it.id)} aria-current={active === it.id ? 'true' : undefined}><span className="ss-toc__n">{String(i + 1).padStart(2, '0')}</span><span>{it.label}</span></a></li>
        ))}
      </ol>
    </nav>
  );
}
