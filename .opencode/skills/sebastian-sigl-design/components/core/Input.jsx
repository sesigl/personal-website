import React from 'react';
import { Icon } from './Icon.jsx';

export function Input({ id, label, hideLabel = false, icon, end, hint, error, size = 'md', shape, counter, className = '', ...rest }) {
  const autoId = React.useId();
  const inputId = id || autoId;
  const describedBy = [hint && inputId + '-hint', error && inputId + '-err'].filter(Boolean).join(' ') || undefined;
  const cls = ['ss-input', size === 'lg' && 'ss-input--lg', className].filter(Boolean).join(' ');
  const { multiline, ...inputProps } = rest;
  const Tag = multiline ? 'textarea' : 'input';
  const field = <Tag id={inputId} className={cls} aria-invalid={error ? true : undefined} aria-describedby={describedBy} style={end ? { paddingRight: 44 } : undefined} {...inputProps} />;
  return (
    <div className="ss-field">
      {label ? (
        <div className={hideLabel ? 'ss-sr-only' : 'ss-field__row'}>
          <label className="ss-field__label" htmlFor={inputId}>{label}</label>
          {counter && !hideLabel ? counter : null}
        </div>
      ) : null}
      {icon || end ? <div className="ss-input-wrap">{icon ? <span className="ss-input-wrap__icon"><Icon name={icon} size={14} /></span> : null}{field}{end ? <span className="ss-input-wrap__end" aria-hidden="true">{end}</span> : null}</div> : field}
      {hint && !error ? <div id={inputId + '-hint'} className="ss-field__hint">{hint}</div> : null}
      {error ? <div id={inputId + '-err'} className="ss-field__error" role="alert">{error}</div> : null}
    </div>
  );
}
