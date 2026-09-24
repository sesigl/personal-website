import React from 'react';
import { Icon } from '../core/Icon.jsx';

const DEFAULT_SOCIAL = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/sesigl' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/sesigl/' },
  { id: 'x', label: 'X (Twitter)', href: 'https://twitter.com/sesigl' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sesigl89/' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100086253756321' },
  { id: 'patreon', label: 'Patreon', href: 'https://patreon.com/SebastianSigl' },
];

export function Footer({ social = DEFAULT_SOCIAL, owner = 'Sebastian Sigl', imprintHref = '/imprint', onImprint, rssHref }) {
  return (
    <footer className="ss-footer">
      <div className="ss-footer__inner">
        <p className="ss-footer__copy">© {new Date().getFullYear()} {owner}</p>
        <ul className="ss-footer__links" aria-label="Social and legal links">
          {social.map((s) => (
            <li key={s.id}><a className="ss-icon-btn" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label + ' (opens in a new tab)'}><Icon name={s.id} size={16} /></a></li>
          ))}
          <li aria-hidden="true" className="ss-footer__sep" />
          {rssHref ? <li><a className="ss-footer__text" href={rssHref}>RSS</a></li> : null}
          <li><a className="ss-footer__text" href={imprintHref} onClick={(e) => { if (onImprint) { e.preventDefault(); onImprint(); } }}>Imprint</a></li>
        </ul>
      </div>
    </footer>
  );
}
