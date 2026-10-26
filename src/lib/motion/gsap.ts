import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;

/** Registers GSAP plugins once, on the client. */
export function registerGsap() {
  if (registered || typeof window === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
  // avoid refresh storms when the mobile URL bar collapses
  ScrollTrigger.config({ ignoreMobileResize: true });
  // slow frames must not stretch the timeline: animations finish on schedule (frames are skipped, not delayed)
  gsap.ticker.lagSmoothing(0);
  registered = true;
}

/** One shared vocabulary of easing + duration so every effect feels related. */
export const EASE = { out: 'power3.out', expo: 'expo.out', inOut: 'power3.inOut', soft: 'power2.out' } as const;
export const DUR = { fast: 0.5, base: 0.9, slow: 1.3 } as const;
/** ScrollTrigger start for “reveal when the element is comfortably inside the viewport”. */
export const START = 'top 86%';

export { gsap, ScrollTrigger, SplitText };

/**
 * SplitText masks clip at the line box, which cuts off descenders (g, y, p), accents and Arabic marks in tight
 * display type. Give each mask breathing room that its negative margin cancels, so the layout does not move.
 */
export function padMasks(masks: readonly Element[]) {
  const ar = document.documentElement.lang === 'ar';
  const top = ar ? '0.22em' : '0.12em';
  const bottom = ar ? '0.36em' : '0.26em';
  masks.forEach((m) => {
    const s = (m as HTMLElement).style;
    s.paddingTop = top;
    s.paddingBottom = bottom;
    s.marginTop = `-${top}`;
    s.marginBottom = `-${bottom}`;
  });
}
