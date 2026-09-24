import React from 'react';
import { Card } from '../core/Card.jsx';
import { AvatarStack } from '../core/AvatarStack.jsx';
import { SubscribeForm } from './SubscribeForm.jsx';

export function NewsletterWidget({ avatars = [], kicker = 'Newsletter', title = 'Big tech from the inside.', subtitle = 'New articles on engineering and leadership, straight to your inbox. No spam, unsubscribe anytime.', proof = 'Join 100K+ developers', onSubmit, status }) {
  const id = React.useId();
  return (
    <Card as="section" aria-labelledby={id}>
      <div className="ss-widget">
        <div className="ss-kicker">{kicker}</div>
        <h2 id={id} className="ss-widget__title">{title}</h2>
        <p className="ss-widget__text">{subtitle}</p>
        <SubscribeForm onSubmit={onSubmit} status={status} />
        {avatars.length ? <div className="ss-widget__foot"><AvatarStack avatars={avatars.slice(0, 4)} label="Newsletter readers" />{proof}</div> : null}
      </div>
    </Card>
  );
}
