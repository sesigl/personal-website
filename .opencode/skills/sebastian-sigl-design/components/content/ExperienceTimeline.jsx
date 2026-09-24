import React from 'react';

export function ExperienceTimeline({ items = [] }) {
  return (
    <ol className="ss-timeline">
      {items.map((it, i) => (
        <li key={i} className="ss-timeline__item">
          <div className="ss-timeline__when">{it.start} – {it.end}</div>
          <div>
            <div className="ss-timeline__head">
              <div className="ss-timeline__logo">{it.logo ? <img src={it.logo} alt="" /> : null}</div>
              <div>
                <h3 className="ss-timeline__role">{it.role}</h3>
                <div className="ss-timeline__org">{it.org}</div>
              </div>
            </div>
            {it.description ? <p className="ss-timeline__desc">{it.description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
