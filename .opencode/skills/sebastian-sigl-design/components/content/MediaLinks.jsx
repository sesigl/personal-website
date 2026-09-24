import React from 'react';

export function MediaLinks({ spotify, youtube, infographic, icons = {} }) {
  const list = [
    spotify && spotify !== '#' && { href: spotify, src: icons.spotify, label: 'Podcast', sr: 'Listen on Spotify' },
    youtube && youtube !== '#' && { href: youtube, src: icons.youtube, label: 'Video', sr: 'Watch on YouTube' },
    infographic && infographic !== '#' && { href: infographic, src: icons.infographic, label: 'Infographic', sr: 'Open infographic' },
  ].filter(Boolean);
  if (!list.length) return null;
  return (
    <ul className="ss-media-links" aria-label="Also available as" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {list.map((m) => (
        <li key={m.label}><a className="ss-media-link" href={m.href} target="_blank" rel="noopener noreferrer">
          {m.src ? <img src={m.src} alt="" width="16" height="16" /> : null}{m.label}<span className="ss-media-link__ext" aria-hidden="true">↗</span><span className="ss-sr-only"> — {m.sr} (opens in a new tab)</span>
        </a></li>
      ))}
    </ul>
  );
}
