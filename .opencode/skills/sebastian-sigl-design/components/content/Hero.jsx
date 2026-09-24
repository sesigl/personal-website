import React from 'react';
import { Highlight } from '../core/Highlight.jsx';

export function Hero({ kicker = 'Staff Engineer · Adevinta', avatarSrc, title, before = 'Notes on building software,', highlight = 'systems', after = 'and teams.', lede = 'Long-form articles on AI-augmented engineering, search, and technical leadership. Some come with a podcast, video or infographic.', stats, as: Tag = 'h1' }) {
  return (
    <section className="ss-hero">
      <div className="ss-hero__kicker">
        {avatarSrc ? <img className="ss-hero__avatar" src={avatarSrc} width="32" height="32" alt="Sebastian Sigl" /> : null}
        <span className="ss-kicker">{kicker}</span>
      </div>
      <Tag className="ss-display ss-hero__title">{title || <>{before} {highlight ? <Highlight>{highlight}</Highlight> : null} {after}</>}</Tag>
      {lede ? <p className="ss-lede ss-hero__lede">{lede}</p> : null}
      {stats && stats.length ? (
        <dl className="ss-hero__stats">{stats.map((s) => <div className="ss-hero__stat" key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}</dl>
      ) : null}
    </section>
  );
}
