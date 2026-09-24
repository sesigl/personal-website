import React from 'react';

export function ReadingProgress({ targetId, label = 'Reading progress' }) {
  const bar = React.useRef(null);
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const on = () => {
      const el = targetId ? document.getElementById(targetId) : document.documentElement;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 1;
      if (bar.current) bar.current.style.transform = 'scaleX(' + p + ')';
      setPct(Math.round(p * 100));
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, [targetId]);
  return <div className="ss-reading-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><div className="ss-reading-progress__bar" ref={bar} /></div>;
}
