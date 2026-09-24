import React from 'react';

export function Badge({ tone = 'neutral', children, className = '', ...rest }) {
  return <span className={'ss-badge ss-badge--' + tone + (className ? ' ' + className : '')} {...rest}>{children}</span>;
}
