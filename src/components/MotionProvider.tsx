'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initMotion, revealAll } from '@/lib/motion';
import { registerGsap } from '@/lib/motion/gsap';
import { scrollToTop, startSmoothScroll } from '@/lib/motion/smooth';

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
    return startSmoothScroll();
  }, []);

  useEffect(() => {
    scrollToTop();
    const root = document.getElementById('main') ?? document.body;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      try {
        cleanup = initMotion(document.body);
      } catch (err) {
        console.error('[motion] initialisation failed, showing content without animation', err);
        revealAll(root);
      }
    };
    // wait for the new route to be painted and web fonts to be measurable
    // (a timer, not requestAnimationFrame: rAF is suspended in background tabs and would leave content hidden)
    const timer = window.setTimeout(() => (document.fonts?.ready ? document.fonts.ready.then(start) : start()), 0);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
