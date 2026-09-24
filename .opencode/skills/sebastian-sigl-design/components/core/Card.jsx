import React from 'react';

export function Card({ href, tilt = false, as, children, className = '', ...rest }) {
  const Tag = as || (href ? 'a' : 'div');
  const cls = ['ss-card', tilt && 'ss-tilt', className].filter(Boolean).join(' ');
  return <Tag className={cls} href={href} {...rest}>{children}</Tag>;
}
