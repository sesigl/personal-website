import React from 'react';
import { Card } from '../core/Card.jsx';

export function TestimonialCard({ title, quote, author, avatar, tilt }) {
  return (
    <Card as="figure" style={{ margin: 0 }}>
      <div className="ss-quote">
        {title ? <div className="ss-quote__title">{title}</div> : null}
        <blockquote className="ss-quote__text">“{quote}”</blockquote>
        <figcaption className="ss-quote__cite">{avatar ? <img className="ss-quote__avatar" src={avatar} width="28" height="28" alt="" /> : null}{author}</figcaption>
      </div>
    </Card>
  );
}
