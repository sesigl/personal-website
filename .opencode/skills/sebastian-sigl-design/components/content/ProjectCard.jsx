import React from 'react';
import { Card } from '../core/Card.jsx';

export function ProjectCard({ title, description, logo, href, tilt }) {
  let host = '';
  try { host = new URL(href).host.replace(/^www\./, ''); } catch (e) { host = ''; }
  return (
    <Card href={href} target="_blank" rel="noopener noreferrer">
      <div className="ss-project">
        <div className="ss-project__head">
          <div className="ss-project__logo">{logo ? <img src={logo} alt="" /> : null}</div>
          <span className="ss-project__arrow" aria-hidden="true">↗</span>
        </div>
        <div className="ss-project__title">{title}</div>
        <p className="ss-project__desc">{description}</p>
        {host ? <div className="ss-project__foot"><span>{host}</span></div> : null}
      </div>
      <span className="ss-sr-only">(opens in a new tab)</span>
    </Card>
  );
}
