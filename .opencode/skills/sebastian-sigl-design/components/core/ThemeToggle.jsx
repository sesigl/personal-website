import React from 'react';
import { Icon } from './Icon.jsx';

export function ThemeToggle({ theme = 'light', onChange }) {
  const dark = theme === 'dark';
  return (
    <button type="button" className="ss-icon-btn" aria-pressed={dark} onClick={() => onChange && onChange(dark ? 'light' : 'dark')}>
      <Icon name={dark ? 'moon' : 'sun'} />
      <span className="ss-sr-only">{dark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
    </button>
  );
}
