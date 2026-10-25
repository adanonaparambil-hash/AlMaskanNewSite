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
  registered = true;
}

/** One shared vocabulary of easing + duration so every effect feels related. */
export const EASE = { out: 'power3.out', expo: 'expo.out', inOut: 'power3.inOut', soft: 'power2.out' } as const;
export const DUR = { fast: 0.5, base: 0.9, slow: 1.3 } as const;
/** ScrollTrigger start for “reveal when the element is comfortably inside the viewport”. */
export const START = 'top 86%';

export { gsap, ScrollTrigger, SplitText };
