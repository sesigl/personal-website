import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function BackButton({ href = '/', label = 'All articles', onClick }) {
  return (
    <a className="ss-back" href={href} onClick={(e) => { if (onClick) { e.preventDefault(); onClick(); } }}>
      <Icon name="chevronLeft" size={12} />{label}
    </a>
  );
}
