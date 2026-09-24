import React from 'react';

export function AvatarStack({ avatars = [], label, className = '' }) {
  return (
    <div className={'ss-avatars' + (className ? ' ' + className : '')} role={label ? 'img' : undefined} aria-label={label}>
      {avatars.map((src, i) => <img key={i} src={src} width="24" height="24" alt="" />)}
    </div>
  );
}
