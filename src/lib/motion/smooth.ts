import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenis: Lenis | null = null;

/**
 * Inertial smooth scrolling that keeps native scroll semantics: wheel input is eased, touch stays native,
 * keyboard / anchors / find-in-page keep working. Driven by GSAP's ticker so ScrollTrigger sees one clock.
 * Returns a cleanup. Not created when the visitor prefers reduced motion.
 */
export function startSmoothScroll(): () => void {
  if (lenis) return () => {};
  const instance = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.95,
    smoothWheel: true,
    anchors: { offset: -80 },
    allowNestedScroll: true,
  });
  lenis = instance;
  instance.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => instance.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  document.documentElement.classList.add('lenis-on');
  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
    document.documentElement.classList.remove('lenis-on');
  };
}

export const getLenis = () => lenis;
/** Pause/resume smooth scrolling (menus, lightboxes). */
export const lockScroll = (lock: boolean) => (lock ? lenis?.stop() : lenis?.start());
export const scrollToTop = () => lenis?.scrollTo(0, { immediate: true, force: true });
/** Jump to the element a #hash names (e.g. /about-us#team), clearing the fixed header. Returns whether it exists. */
export function scrollToHash(hash: string): boolean {
  const el = hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - 96;
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
  else window.scrollTo(0, y);
  return true;
}
