import React from 'react';

export function Prose({ children, as: Tag = 'div', className = '' }) {
  return <Tag className={'ss-prose' + (className ? ' ' + className : '')}>{children}</Tag>;
}
