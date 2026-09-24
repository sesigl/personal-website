// Newsletter admin — Editor.tsx + ProgressTracker.tsx (email body editor is Yoopta in production; simplified here).
const AD = window.SebastianSiglDesignSystem_0b5f4d;
const SUBJECT = { min: 20, max: 60, recommended: 40 };
const PREVIEW = { min: 40, max: 120, recommended: 80 };

function AdminScreen({ go }) {
  const [campaign, setCampaign] = React.useState('weekly-update-2026-09');
  const [subject, setSubject] = React.useState('MCP servers have a context cost');
  const [preview, setPreview] = React.useState('Some tools require MCP. Most don’t. Here’s how to tell the difference.');
  const [body, setBody] = React.useState('Hi there,\n\nI counted the tool definitions loaded into my agent’s context last week…');
  const [err, setErr] = React.useState('');
  const [run, setRun] = React.useState(null);
  const timer = React.useRef();
  React.useEffect(() => () => clearInterval(timer.current), []);
  const send = (isTest) => {
    if (!campaign.trim()) { setErr('Enter a campaign title to track and resume sending.'); return; }
    setErr(''); clearInterval(timer.current);
    const total = isTest ? 1 : 12480;
    setRun({ isTest, status: 'pending', processed: 0, total });
    timer.current = setInterval(() => setRun((r) => {
      if (!r) return r;
      const step = isTest ? 1 : Math.ceil(total / 6);
      const processed = Math.min(r.total, r.processed + step);
      const done = processed >= r.total;
      if (done) clearInterval(timer.current);
      return { ...r, processed, status: done ? 'completed' : 'in_progress' };
    }), 900);
  };
  const busy = run && run.status !== 'completed' && run.status !== 'failed';
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <header className="ss-topbar">
        <div className="ss-topbar__inner">
          <a className="ss-brand" href="#/"><span className="ss-brand__mark" aria-hidden="true" />sebastian.sigl</a>
          <span className="ss-kicker">/ newsletter</span><span className="ss-badge ss-badge--neutral">Admin</span>
          <span style={{ flex: 1 }} />
          <AD.Button variant="ghost" size="sm" href="#/">View site</AD.Button>
        </div>
      </header>
      <main id="main" style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 64px', display: 'grid', gap: 32, gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', alignItems: 'start' }}>
        <form className="ss-stack-4" onSubmit={(e) => { e.preventDefault(); send(false); }} aria-labelledby="compose">
          <div className="ss-kicker">01 · Compose</div><h1 id="compose" className="ss-h2">New campaign</h1>
          <AD.Input label="Campaign title" hint="Used for tracking and resuming a send." value={campaign} onChange={(e) => setCampaign(e.target.value)} error={err || undefined} placeholder="e.g., weekly-update-2024-01" />
          <AD.Input label="Newsletter subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={'Recommended ' + SUBJECT.recommended + ' characters'} counter={<AD.CharacterCount current={subject.length} {...SUBJECT} />} />
          <AD.Input label="Preview text" value={preview} onChange={(e) => setPreview(e.target.value)} placeholder={'Recommended ' + PREVIEW.recommended + ' characters'} counter={<AD.CharacterCount current={preview.length} {...PREVIEW} />} />
          <AD.Input label="Email body" multiline rows={8} value={body} onChange={(e) => setBody(e.target.value)} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <AD.Button type="submit" loading={busy && !run.isTest} disabled={busy}>{busy && !run.isTest ? 'Sending…' : 'Send'}</AD.Button>
            <AD.Button variant="secondary" disabled={busy} onClick={() => send(true)}>Send Test</AD.Button>
            <AD.Button variant="ghost" onClick={() => console.log(body)}>Log Test</AD.Button>
            <AD.Button variant="ghost" onClick={() => { clearInterval(timer.current); setRun(null); setSubject(''); setPreview(''); setCampaign(''); }}>Reset</AD.Button>
          </div>
        </form>
        <section className="ss-stack-4" aria-labelledby="progress-h">
          <div className="ss-kicker">02 · Delivery</div><h2 id="progress-h" className="ss-h2">Status</h2>
          {run ? (
            <AD.ProgressTracker campaignTitle={campaign} status={run.status} processedCount={run.processed} totalRecipients={run.total} isTest={run.isTest} testRecipient="your test inbox" />
          ) : (
            <AD.Alert tone="neutral">No campaign running. Send a test first — it goes to your own inbox only.</AD.Alert>
          )}
          {run && run.status === 'completed' ? <AD.Alert tone="success" title="Sent.">{run.total.toLocaleString('en-US')} {run.total === 1 ? 'recipient' : 'recipients'} received “{subject}”.</AD.Alert> : null}
        </section>
      </main>
    </div>
  );
}

Object.assign(window, { AdminScreen });
