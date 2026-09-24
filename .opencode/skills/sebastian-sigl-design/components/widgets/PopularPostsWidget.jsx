import React from 'react';

export function PopularPostsWidget({ title = 'Popular', posts = [], onOpen }) {
  const id = React.useId();
  return (
    <section className="ss-widget" aria-labelledby={id}>
      <h2 id={id} className="ss-kicker">{title}</h2>
      <ol className="ss-widget__list">
        {posts.map((p, i) => (
          <li key={i}><a href={p.href || '#'} onClick={(e) => { if (onOpen) { e.preventDefault(); onOpen(p, i); } }}>{p.title}</a></li>
        ))}
      </ol>
    </section>
  );
}
