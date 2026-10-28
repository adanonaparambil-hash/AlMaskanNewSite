'use client';

import { useEffect, useState } from 'react';
import { getLenis } from '@/lib/motion/smooth';
import { useI18n } from '@/i18n/client';

/**
 * The current year in Oman. Pages are built ahead of time, so the server's year would freeze at the last deploy:
 * the build-time year is shown first and replaced with the visitor's current year after mount.
 */
export function CurrentYear() {
  const [year, setYear] = useState(() => new Date().getFullYear());
  useEffect(() => {
    setYear(Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Muscat', year: 'numeric' }).format(new Date())));
  }, []);
  return <span suppressHydrationWarning>{year}</span>;
}

/** Live local time at the village (Oman, UTC+4). Rendered after mount so server and client markup agree. */
export function VillageClock() {
  const { ui } = useI18n();
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
      <span>{ui.footer.clockPlace}</span>
      <time dir="ltr" dateTime={now?.iso} suppressHydrationWarning>{now?.text ?? '--:--:--'}</time>
    </p>
  );
}

/** Smooth return to the top (through Lenis when it is running), then focus the skip target for keyboard users. */
export function BackToTop() {
  const { ui } = useI18n();
  const go = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    document.getElementById('main')?.focus({ preventScroll: true });
  };
  return (
    <button type="button" className="footer__top" onClick={go} data-magnetic="">
      <span>{ui.footer.top}</span>
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true"><path d="M6 15V1M1 6l5-5 5 5" stroke="currentColor" strokeWidth="1.3" /></svg>
    </button>
  );
}

/**
 * Visitors since launch. Each browser is counted once (first visit, remembered in localStorage); later visits only
 * read the total. Hidden until the counter store is configured or if it cannot be reached, so it never shows a
 * made-up number. The figure counts up when it arrives; screen readers get the final value.
 */
export function VisitCounter() {
  const { ui } = useI18n();
  const [count, setCount] = useState<number | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let first = false;
    try { first = !localStorage.getItem('amv-visitor'); } catch {}
    const ctrl = new AbortController();
    fetch('/api/visits', { method: first ? 'POST' : 'GET', signal: ctrl.signal })
      .then((r) => r.json())
      .then((j: { configured?: boolean; count?: number }) => {
        if (!j.configured || typeof j.count !== 'number') return;
        if (first) { try { localStorage.setItem('amv-visitor', '1'); } catch {} }
        setCount(j.count);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    if (count === null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(count); return; }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 1600);
      setShown(Math.round(count * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [count]);

  if (count === null) return null;
  const total = count.toLocaleString('en-US');
  return (
    <p className="footer__visits" aria-label={ui.footer.visitorsAria(total)}>
      <i aria-hidden="true" />
      <b dir="ltr" aria-hidden="true">{shown.toLocaleString('en-US')}</b>
      <span aria-hidden="true">{ui.footer.visitors}</span>
    </p>
  );
}
