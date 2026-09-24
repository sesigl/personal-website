import React from 'react';

export function CharacterCount({ current = 0, min, max, recommended }) {
  const ok = current >= min && current <= max;
  return (
    <span className="ss-field__hint" aria-live="polite" style={{ color: ok ? 'var(--status-success-fg)' : current === 0 ? 'var(--text-muted)' : 'var(--status-danger-fg)', fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
      {current}/{recommended}<span className="ss-sr-only">{ok ? ' characters, within recommended range' : ' characters, recommended ' + min + ' to ' + max}</span>
    </span>
  );
}
