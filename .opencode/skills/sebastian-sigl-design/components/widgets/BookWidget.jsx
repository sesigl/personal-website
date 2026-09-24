import React from 'react';
import { Card } from '../core/Card.jsx';

export function BookWidget({ title = 'Free Notion Templates', text = 'The templates I use to plan work, write and run 1:1s.', cover, href = 'https://sesigl.gumroad.com/' }) {
  return (
    <Card as="section">
      <a className="ss-widget__book" href={href} target="_blank" rel="noopener noreferrer">
        {cover ? <img className="ss-widget__cover" src={cover} width="72" height="92" alt="" /> : <span />}
        <span className="ss-widget">
          <span className="ss-kicker">Free · Gumroad ↗</span>
          <span className="ss-widget__title" style={{ fontSize: 'var(--fs-base)' }}>{title}</span>
          {text ? <span className="ss-widget__text">{text}</span> : null}
        </span>
        <span className="ss-sr-only">(opens Gumroad in a new tab)</span>
      </a>
    </Card>
  );
}
