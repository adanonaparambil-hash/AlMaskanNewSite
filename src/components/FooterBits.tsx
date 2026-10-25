'use client';

import { useEffect, useState } from 'react';
import { getLenis } from '@/lib/motion/smooth';

/** Live local time at the village (Oman, UTC+4). Rendered after mount so server and client markup agree. */
export function VillageClock() {
  const [now, setNow] = useState<{ text: string; iso: string } | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Muscat', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const tick = () => { const d = new Date(); setNow({ text: fmt.format(d), iso: d.toISOString() }); };
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);
  return (
    <p className="footer__clock">
      <i aria-hidden="true" />
      <span>Barka, Oman</span>
      <time dateTime={now?.iso} suppressHydrationWarning>{now?.text ?? '--:--:--'}</time>
    </p>
  );
}

/** Smooth return to the top (through Lenis when it is running), then focus the skip target for keyboard users. */
export function BackToTop() {
  const go = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };
  return (
    <button type="button" className="footer__top" onClick={go} data-magnetic="">
      <span>Back to top</span>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true"><path d="M6 15V1M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
    </button>
  );
}
