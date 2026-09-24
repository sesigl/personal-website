import React from 'react';
import { Input } from '../core/Input.jsx';
import { ThemeToggle } from '../core/ThemeToggle.jsx';
import { Button } from '../core/Button.jsx';

const DEFAULT_NAV = [
  { id: 'home', label: 'Writing', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
];

export function TopBar({ brand = 'sebastian.sigl', homeHref = '/', onHome, nav = DEFAULT_NAV, active, onNavigate, query = '', onSearch, searchAction = '/search', theme, onThemeChange, subscribeHref = '/subscribe', onSubscribe, shortcut = true }) {
  const [q, setQ] = React.useState(query);
  const ref = React.useRef(null);
  React.useEffect(() => setQ(query), [query]);
  React.useEffect(() => {
    if (!shortcut) return undefined;
    const on = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { const el = document.getElementById('search'); if (el) { e.preventDefault(); el.focus(); el.select(); } } };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [shortcut]);
  const nav$ = (it) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(it.id); } };
  return (
    <header className="ss-topbar" ref={ref}>
      <div className="ss-topbar__inner">
        <a className="ss-brand" href={homeHref} onClick={(e) => { if (onHome) { e.preventDefault(); onHome(); } }}><span className="ss-brand__mark" aria-hidden="true" />{brand}</a>
        <nav aria-label="Primary"><ul className="ss-topnav">
          {nav.map((it) => <li key={it.id}><a href={it.href} aria-current={active === it.id ? 'page' : undefined} onClick={nav$(it)}>{it.label}</a></li>)}
        </ul></nav>
        <form className="ss-topbar__search" role="search" method="get" action={searchAction} onSubmit={(e) => { if (onSearch) { e.preventDefault(); onSearch(q.trim()); } }}>
          <Input id="search" type="search" name="q" icon="search" label="Search articles" hideLabel placeholder="Search articles" value={q} onChange={(e) => setQ(e.target.value)} end={shortcut ? <kbd>⌘K</kbd> : null} />
        </form>
        <div className="ss-topbar__actions">
          <ThemeToggle theme={theme} onChange={onThemeChange} />
          <Button size="sm" className="ss-topbar__subscribe" href={subscribeHref} onClick={(e) => { if (onSubscribe) { e.preventDefault(); onSubscribe(); } }}>Subscribe</Button>
        </div>
      </div>
    </header>
  );
}
