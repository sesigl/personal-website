import React from 'react';

export function Button({ variant = 'primary', size = 'md', block = false, loading = false, href, disabled, type = 'button', children, className = '', ...rest }) {
  const cls = ['ss-btn', 'ss-btn--' + variant, size === 'sm' && 'ss-btn--sm', size === 'lg' && 'ss-btn--lg', block && 'ss-btn--block', className].filter(Boolean).join(' ');
  const content = <>{loading ? <span className="ss-btn__spinner" aria-hidden="true" /> : null}{children}</>;
  if (href) return <a className={cls} href={disabled ? undefined : href} aria-disabled={disabled || undefined} {...rest}>{content}</a>;
  return <button type={type} className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>{content}</button>;
}
