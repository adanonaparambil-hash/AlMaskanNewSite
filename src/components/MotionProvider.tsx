'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initMotion, revealAll } from '@/lib/motion';
import { registerGsap } from '@/lib/motion/gsap';
import { watchFrameRate } from '@/lib/motion/perf';
import { scrollToHash, scrollToTop, startSmoothScroll } from '@/lib/motion/smooth';

/**
 * Mounts once in the root layout. Re-initialises all scroll effects after each client-side navigation
 * and tears them down first, so nothing leaks between pages.
 */
export default function MotionProvider() {
  const pathname = usePathname();

  // inertial smooth scrolling: created once for the whole session (never for reduced-motion visitors)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    registerGsap();
    const stopPerf = watchFrameRate();
    // inertial wheel scrolling only where there is a wheel/trackpad; touch devices keep their native momentum
    const stopSmooth = window.matchMedia('(hover: hover) and (pointer: fine)').matches ? startSmoothScroll() : () => {};
    return () => { stopSmooth(); stopPerf(); };
  }, []);

  useEffect(() => {
    // a link to a section (/about-us#team, /contact-us#inquiry) lands on that section, not the top
    const hash = window.location.hash;
    if (!hash) scrollToTop();
    const root = document.getElementById('main') ?? document.body;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let jump: number | undefined;
    const start = () => {
      if (cancelled) return;
      try {
        cleanup = initMotion(document.body);
      } catch (err) {
        console.error('[motion] initialisation failed, showing content without animation', err);
        revealAll(root);
      }
      // after the scroll scenes have set up (pinned sections change the page height above the target)
      if (hash) jump = window.setTimeout(() => { if (!scrollToHash(hash)) scrollToTop(); }, 150);
    };
    // wait for the new route to be painted and web fonts to be measurable
    // (a timer, not requestAnimationFrame: rAF is suspended in background tabs and would leave content hidden)
    const timer = window.setTimeout(() => (document.fonts?.ready ? document.fonts.ready.then(start) : start()), 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(jump);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
