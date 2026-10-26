import { EASE, gsap, padMasks, SplitText } from './gsap';

/**
 * Hero sequence (~2.2s): background reveals → navigation → headline lines → supporting copy → CTAs → scroll cue.
 * Elements are tagged data-hero="bg|title|copy|cta|cue" and the global header carries data-site-header.
 */
export function hero(root: HTMLElement) {
  const section = root.querySelector<HTMLElement>('[data-hero-section]');
  if (!section) return;
  const bg = section.querySelector<HTMLElement>('[data-hero="bg"]');
  const bgImg = bg?.querySelector<HTMLElement>('.media__inner') ?? bg?.querySelector<HTMLElement>('img');
  const title = section.querySelector<HTMLElement>('[data-hero="title"]');
  const eyebrow = section.querySelector<HTMLElement>('[data-hero="eyebrow"]');
  const copy = Array.from(section.querySelectorAll<HTMLElement>('[data-hero="copy"]'));
  const cta = Array.from(section.querySelectorAll<HTMLElement>('[data-hero="cta"]'));
  const cue = section.querySelector<HTMLElement>('[data-hero="cue"]');
  const nav = document.querySelector<HTMLElement>('[data-site-header]');
  const navBits = nav ? Array.from(nav.querySelectorAll<HTMLElement>('[data-nav-bit]')) : [];

  // on the first visit the preloader covers the page: hold the sequence until it has opened
  const waiting = document.documentElement.classList.contains('is-loading');
  const tl = gsap.timeline({ defaults: { ease: EASE.expo }, paused: waiting });
  if (waiting) window.addEventListener('preloader:done', () => tl.play(), { once: true });

  // after the loader the same aerial is already full screen: no wipe, just a gentle settle
  if (bg) tl.fromTo(bg, { clipPath: waiting ? 'inset(0% 0% 0% 0%)' : 'inset(6% 5% 6% 5%)', autoAlpha: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: waiting ? 0.01 : 1.6 }, 0);
  if (bgImg) tl.fromTo(bgImg, { scale: waiting ? 1.04 : 1.18 }, { scale: 1, duration: 2.4, ease: EASE.out }, 0);
  if (navBits.length) tl.fromTo(navBits, { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.05, ease: EASE.out }, 0.45);
  if (eyebrow) tl.fromTo(eyebrow, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: EASE.out }, 0.7);

  if (title) {
    // Arabic letters join: rise word by word there, letter by letter in Latin script
    const joined = document.documentElement.lang === 'ar';
    const split = SplitText.create(title, { type: joined ? 'words' : 'words,chars', mask: 'words', charsClass: 'split-char' });
    padMasks(split.masks);
    gsap.set(title, { autoAlpha: 1 });
    tl.from(joined ? split.words : split.chars, { yPercent: 150, rotationX: -80, transformOrigin: '50% 100%', duration: 1.3, stagger: joined ? 0.08 : 0.022 }, 0.8);
  }
  if (copy.length) tl.fromTo(copy, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: EASE.out }, 1.35);
  if (cta.length) tl.fromTo(cta, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: EASE.out }, 1.55);
  if (cue) tl.fromTo(cue, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.95);

  // after the intro, the image drifts away slowly as the visitor scrolls (transform only)
  const drift = section.querySelector<HTMLElement>('[data-hero-drift]');
  if (drift) {
    gsap.to(drift, {
      yPercent: 12,
      scale: 1.06,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}
