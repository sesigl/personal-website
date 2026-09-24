import React from 'react';

export function CheckList({ items = [] }) {
  return <ol className="ss-checklist">{items.map((t, i) => <li key={i}><span className="ss-checklist__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span>{t}</span></li>)}</ol>;
}
