import React from 'react';
import { Badge } from '../core/Badge.jsx';
import { Alert } from './Alert.jsx';

const TONE = { pending: 'neutral', in_progress: 'info', completed: 'success', failed: 'danger' };
const LABEL = { pending: 'Pending', in_progress: 'In progress', completed: 'Completed', failed: 'Failed' };

export function ProgressTracker({ campaignTitle, status = 'pending', processedCount = 0, totalRecipients = 0, hasFailures = false, isTest = false, testRecipient }) {
  const pct = totalRecipients ? Math.round((processedCount / totalRecipients) * 100) : 0;
  const barTone = status === 'failed' ? ' ss-progress--danger' : status === 'completed' ? ' ss-progress--success' : '';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {isTest ? <Alert tone="warning" title="Test mode:">{testRecipient ? 'Sending to ' + testRecipient + ' only.' : 'Simulating progress for demo purposes.'}</Alert> : null}
      <section className="ss-card" aria-label="Newsletter progress" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <div>
            <div className="ss-meta">Campaign</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 650, color: 'var(--text-strong)' }}>{campaignTitle}</div>
          </div>
          <Badge tone={TONE[status]}>{LABEL[status]}</Badge>
        </div>
        <div className={'ss-progress' + barTone} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Delivery progress">
          <div className="ss-progress__bar" style={{ width: pct + '%' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
          <span>{processedCount.toLocaleString('en-US')} / {totalRecipients.toLocaleString('en-US')} recipients</span>
          <span>{pct}%</span>
        </div>
        {hasFailures ? <Alert tone="danger">Some deliveries failed.</Alert> : null}
      </section>
    </div>
  );
}
