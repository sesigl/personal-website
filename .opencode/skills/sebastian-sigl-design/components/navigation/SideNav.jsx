import React from 'react';
import { Icon } from '../core/Icon.jsx';

const DEFAULT_ITEMS = [
  { id: 'home', label: 'Writing', icon: 'home', href: '/' },
  { id: 'search', label: 'Search', icon: 'search', href: '/search' },
  { id: 'about', label: 'About', icon: 'about', href: '/about' },
  { id: 'subscribe', label: 'Subscribe', icon: 'subscribe', href: '/subscribe' },
];

export function SideNav({ active, items = DEFAULT_ITEMS, onNavigate, label = 'Primary' }) {
  const go = (it) => (e) => { if (onNavigate) { e.preventDefault(); onNavigate(it.id); } };
  return (
    <nav className="ss-rail" aria-label={label}>
      <ul className="ss-rail__list">
        {items.map((it) => (
          <li key={it.id}>
            <a className="ss-rail__link" href={it.href} aria-current={active === it.id ? 'page' : undefined} onClick={go(it)}>
              <Icon name={it.icon} size={18} />
              <span className="ss-rail__label">{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
