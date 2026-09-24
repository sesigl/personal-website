import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Alert({ tone = 'info', title, children, busy = false }) {
  const role = tone === 'danger' ? 'alert' : 'status';
  return (
    <div className={'ss-alert ss-alert--' + tone} role={role}>
      {busy ? <span className="ss-btn__spinner" aria-hidden="true" style={{ marginTop: 3 }} /> : <Icon name="about" size={16} />}
      <div>{title ? <strong>{title} </strong> : null}{children}</div>
    </div>
  );
}
