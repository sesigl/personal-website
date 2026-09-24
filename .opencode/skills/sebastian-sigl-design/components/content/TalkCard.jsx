import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function TalkCard({ title, image, href, meta = 'YouTube', tilt }) {
  return (
    <a className="ss-talk" href={href} target="_blank" rel="noopener noreferrer">
      <span className="ss-talk__media">
        {image ? <img src={image} alt="" loading="lazy" /> : null}
        <span className="ss-talk__play" aria-hidden="true"><Icon name="play" size={12} />Watch</span>
      </span>
      <span className="ss-talk__body">
        <span className="ss-talk__title">{title}</span>
        <span className="ss-talk__meta">{meta} ↗</span>
      </span>
      <span className="ss-sr-only">(opens in a new tab)</span>
    </a>
  );
}
