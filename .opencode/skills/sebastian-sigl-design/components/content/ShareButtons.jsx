import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function ShareButtons({ url, title = '', label = 'Share' }) {
  const u = encodeURIComponent(url || ''), t = encodeURIComponent(title);
  const items = [
    { icon: 'twitter', label: 'Share on X', href: 'https://twitter.com/intent/tweet?url=' + u + '&text=' + t },
    { icon: 'linkedin', label: 'Share on LinkedIn', href: 'https://www.linkedin.com/sharing/share-offsite/?url=' + u },
    { icon: 'facebook', label: 'Share on Facebook', href: 'https://www.facebook.com/sharer/sharer.php?u=' + u },
  ];
  return (
    <ul className="ss-share" aria-label="Share this article">
      {label ? <li className="ss-share__label" aria-hidden="true">{label}</li> : null}
      {items.map((it) => <li key={it.icon}><IconButton icon={it.icon} label={it.label + ' (opens in a new tab)'} href={it.href} target="_blank" rel="noopener noreferrer" iconSize={15} /></li>)}
    </ul>
  );
}
