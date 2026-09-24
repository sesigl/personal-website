import React from 'react';

export function Tag({ href, variant = 'solid', children, className = '', ...rest }) {
  const cls = ['ss-tag', variant === 'outline' && 'ss-tag--outline', variant === 'muted' && 'ss-tag--muted', className].filter(Boolean).join(' ');
  return href ? <a className={cls} href={href} {...rest}>{children}</a> : <span className={cls} {...rest}>{children}</span>;
}
