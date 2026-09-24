import React from 'react';
import { Icon } from './Icon.jsx';

export function IconButton({ icon, label, variant = 'plain', size = 'md', href, className = '', iconSize, ...rest }) {
  const cls = ['ss-icon-btn', variant === 'outlined' && 'ss-icon-btn--outlined', size === 'lg' && 'ss-icon-btn--lg', className].filter(Boolean).join(' ');
  const inner = <><Icon name={icon} size={iconSize} /><span className="ss-sr-only">{label}</span></>;
  if (href) return <a className={cls} href={href} {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
}
