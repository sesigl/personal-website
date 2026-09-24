import React from 'react';

export function formatDate(d) {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export function MetaLine({ date, readingTime, children, dash = true, className = '' }) {
  const iso = date ? (typeof date === 'string' ? date : date.toISOString()) : undefined;
  return (
    <div className={'ss-meta' + (className ? ' ' + className : '')}>
      {dash ? <span className="ss-meta__dash" aria-hidden="true" /> : null}
      {date ? <time dateTime={iso}>{formatDate(date)}</time> : null}
      {readingTime ? <><span className="ss-meta__dot" aria-hidden="true">·</span><span>{readingTime} min read</span></> : null}
      {children}
    </div>
  );
}
