import React from 'react';
import { Input } from '../core/Input.jsx';
import { Button } from '../core/Button.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeForm({ layout = 'stacked', onSubmit, status: controlled, placeholder = 'Your email…', buttonLabel = 'Subscribe' }) {
  const [email, setEmail] = React.useState('');
  const [local, setLocal] = React.useState('idle');
  const [err, setErr] = React.useState('');
  const status = controlled || local;
  const id = React.useId();
  const submit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) { setErr('Please enter a valid email address.'); return; }
    setErr(''); setLocal('loading');
    try { await (onSubmit ? onSubmit(email) : new Promise((r) => setTimeout(r, 900))); setLocal('success'); }
    catch (x) { setLocal('error'); }
  };
  if (status === 'success') {
    return <p className="ss-alert ss-alert--success" role="status" style={{ justifyContent: 'center' }}><strong>Thanks for subscribing!</strong></p>;
  }
  const inline = layout === 'inline';
  return (
    <form onSubmit={submit} noValidate style={inline ? { display: 'flex', flexWrap: 'wrap', gap: 8, maxWidth: 448 } : { display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={inline ? { flex: '1 1 220px' } : undefined}>
        <Input id={id} type="email" autoComplete="email" label="Your email" hideLabel placeholder={placeholder} size={inline ? 'lg' : 'md'}
          value={email} onChange={(e) => { setEmail(e.target.value); if (err) setErr(''); }} error={err || undefined} required />
      </div>
      <Button type="submit" size={inline ? 'md' : 'sm'} block={!inline} loading={status === 'loading'} style={inline ? { minHeight: 40 } : undefined}>{status === 'loading' ? 'Subscribing…' : buttonLabel}</Button>
      {status === 'error' ? <p className="ss-field__error" role="alert" style={{ flexBasis: '100%', textAlign: inline ? 'left' : 'center' }}>Something went wrong. Please try again.</p> : null}
    </form>
  );
}
