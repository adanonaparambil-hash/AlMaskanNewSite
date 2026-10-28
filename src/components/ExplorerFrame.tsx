'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The masterplan explorer in its iframe. On touch screens the map takes every swipe for panning, so the page could
 * not be scrolled past it: there it starts behind a "tap to explore" cover, and the cover returns once the explorer
 * has been scrolled out of view.
 */
export default function ExplorerFrame({ src, title, tapLabel }: { src: string; title: string; tapLabel: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');
    const sync = () => setTouch(coarse.matches);
    sync();
    coarse.addEventListener('change', sync);
    return () => coarse.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!touch || !active || !box.current) return;
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting) setActive(false); }, { threshold: 0 });
    io.observe(box.current);
    return () => io.disconnect();
  }, [touch, active]);

  return (
    <div ref={box} className={`explorer${touch && !active ? ' is-locked' : ''}`} data-reveal="fade">
      <iframe src={src} title={title} loading="lazy" allow="fullscreen" allowFullScreen />
      {touch && !active && (
        <button type="button" className="explorer__cover" onClick={() => setActive(true)}>
          <span className="explorer__tap">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V10m0-1.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v4.5A6.5 6.5 0 0 1 11.5 21h-.6a6 6 0 0 1-4.6-2.2L3.6 15.4a1.6 1.6 0 0 1 2.3-2.2L9 15.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            {tapLabel}
          </span>
        </button>
      )}
    </div>
  );
}
