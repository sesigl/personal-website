import React from 'react';

export function CategoryTabs({ categories = [], active = 'all', onChange, counts, hrefFor = (id) => (id === 'all' ? '/' : '/' + id), label = 'Filter articles by topic' }) {
  const all = [{ id: 'all', label: 'All' }, ...categories.map((c) => typeof c === 'string' ? { id: c, label: c.charAt(0).toUpperCase() + c.slice(1) } : c)];
  return (
    <ul className="ss-tabs" aria-label={label}>
      {all.map((c) => {
        const n = c.count != null ? c.count : counts ? counts[c.id] : undefined;
        return (
          <li key={c.id}>
            <a className="ss-tab" href={hrefFor(c.id)} aria-current={active === c.id ? 'page' : undefined}
              onClick={(e) => { if (onChange) { e.preventDefault(); onChange(c.id); } }}>
              {c.label}{n != null ? <span className="ss-tab__count" aria-label={'(' + n + ' articles)'}>{n}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
