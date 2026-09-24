import React from 'react';

export function Highlight({ as: Tag = 'span', accent = true, hover = false, children, className = '', ...rest }) {
  const cls = [hover ? 'ss-hl--hover' : 'ss-hl', !accent && !hover && 'ss-hl--plain', className].filter(Boolean).join(' ');
  return <Tag className={cls} {...rest}>{children}</Tag>;
}
