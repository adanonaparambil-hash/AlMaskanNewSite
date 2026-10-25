import { EASE, gsap, ScrollTrigger, SplitText, START } from './gsap';

/** The glass redesign's signature effects. Same contract as the rest of the library: content opts in with data attributes. */
const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => Array.from(root.querySelectorAll<T>(sel));

/** data-reveal="chars" — letters flip up out of a mask, one after another. */
export function charReveals(root: HTMLElement) {
  q(root, '[data-reveal="chars"]').forEach((el) => {
    SplitText.create(el, {
      type: 'words,chars',
      mask: 'words',
      autoSplit: true,
      charsClass: 'split-char',
      onSplit(self) {
        gsap.set(el, { autoAlpha: 1 });
        return gsap.from(self.chars, {
          yPercent: 115,
          rotationX: -70,
          transformOrigin: '50% 100%',
          duration: 1.1,
          ease: EASE.expo,
          stagger: 0.018,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: START, once: true },
        });
      },
    });
  });
}

/** data-reveal="blur" — words come into focus from a soft blur. */
export function blurReveals(root: HTMLElement) {
  q(root, '[data-reveal="blur"]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { autoAlpha: 1 });
        return gsap.from(self.words, {
          autoAlpha: 0,
          filter: 'blur(14px)',
          y: 24,
          duration: 1.2,
          ease: EASE.out,
          stagger: 0.05,
          clearProps: 'filter',
          scrollTrigger: { trigger: el, start: START, once: true },
        });
      },
    });
  });
}

/** data-reveal="scale" — the heading settles from oversize with a widening letter-spacing that closes in. */
export function scaleReveals(root: HTMLElement) {
  q(root, '[data-reveal="scale"]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 1.18, letterSpacing: '0.04em', transformOrigin: '0% 100%' },
      { autoAlpha: 1, scale: 1, letterSpacing: '-0.025em', duration: 1.6, ease: EASE.expo, clearProps: 'letterSpacing,transform', scrollTrigger: { trigger: el, start: START, once: true } },
    );
  });
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/';
/** data-scramble — short labels decode from random glyphs when they enter. Only the aria-hidden copy is scrambled. */
export function scrambles(root: HTMLElement) {
  q(root, '[data-scramble]').forEach((el) => {
    const holder = el.querySelector<HTMLElement>('[data-scramble-text]') ?? el;
    // edit React's own text node in place (replacing it via textContent breaks React's later removal)
    const target = holder.firstChild;
    if (!target || target.nodeType !== Node.TEXT_NODE) return;
    const text = target.nodeValue ?? '';
    if (!text.trim()) return;
    const state = { p: 0 };
    // a scroll-triggered tween (not ScrollTrigger.create with once): a trigger that kills itself while
    // ScrollTrigger is still refreshing the list leaves a hole and aborts every trigger created after it
    gsap.to(state, {
      p: 1,
      duration: Math.min(1.2, 0.4 + text.length * 0.025),
      ease: 'none',
      onUpdate: () => {
        const n = Math.floor(state.p * text.length);
        let out = text.slice(0, n);
        for (let i = n; i < text.length; i++) out += text[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        target.nodeValue = out;
      },
      onComplete: () => { target.nodeValue = text; },
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
}

/** [data-stack] > [data-stack-card] — sticky cards; each one sinks back and dims as the next slides over it. */
export function stacks(root: HTMLElement) {
  q(root, '[data-stack]').forEach((stack) => {
    const cards = q(stack, '[data-stack-card]');
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.9 + i * 0.015,
        filter: 'brightness(0.6)',
        ease: 'none',
        // only while the next card is actually sliding over this one
        scrollTrigger: { trigger: next, start: 'top 70%', end: 'top 22%', scrub: true },
      });
      const img = card.querySelector<HTMLElement>('.media__inner');
      if (img) gsap.fromTo(img, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 30%', scrub: true } });
    });
  });
}

/** [data-curtain] on a .media — two dark glass leaves part from the centre to show the image. */
export function curtains(root: HTMLElement) {
  q(root, '[data-curtain]').forEach((el) => {
    const l = document.createElement('span');
    const r = document.createElement('span');
    l.className = 'curtain__leaf curtain__leaf--l';
    r.className = 'curtain__leaf curtain__leaf--r';
    l.setAttribute('aria-hidden', 'true');
    r.setAttribute('aria-hidden', 'true');
    el.append(l, r);
    const img = el.querySelector<HTMLElement>('.media__inner');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true }, onComplete: () => { l.remove(); r.remove(); } });
    tl.to(l, { xPercent: -101, duration: 1.4, ease: EASE.inOut }, 0)
      .to(r, { xPercent: 101, duration: 1.4, ease: EASE.inOut }, 0);
    if (img) tl.from(img, { scale: 1.3, duration: 2, ease: EASE.out }, 0);
  });
}

/** [data-speed="0.2"] — elements drift at their own pace while the page scrolls (positive = slower than the page). */
export function speeds(root: HTMLElement) {
  q(root, '[data-speed]').forEach((el) => {
    const s = Number(el.dataset.speed) || 0;
    gsap.fromTo(
      el,
      { y: () => s * 160 },
      { y: () => -s * 160, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } },
    );
  });
}

/**
 * [data-circle] — a sticky stage where a small circle of image opens to fill the screen; the outlined label
 * fades and grows past the viewer; the glass card [data-circle-card] arrives at the end.
 */
export function circles(root: HTMLElement) {
  q(root, '[data-circle]').forEach((section) => {
    const media = section.querySelector<HTMLElement>('[data-circle-media]');
    const label = section.querySelector<HTMLElement>('[data-circle-label]');
    const card = section.querySelector<HTMLElement>('[data-circle-card]');
    if (!media) return;
    const inner = media.querySelector<HTMLElement>('.media__inner');
    const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
    tl.fromTo(media, { clipPath: 'circle(12% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1 }, 0);
    if (inner) tl.fromTo(inner, { scale: 1.4, rotation: -4 }, { scale: 1, rotation: 0, duration: 1 }, 0);
    if (label) tl.fromTo(label, { scale: 0.8, autoAlpha: 1 }, { scale: 2.6, autoAlpha: 0, duration: 0.55 }, 0);
    if (card) tl.fromTo(card, { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.62);
  });
}

/** [data-drift-x="-20"] — a horizontal drift scrubbed by scroll (footer wordmark). Value in percent. */
export function driftX(root: ParentNode) {
  q(root, '[data-drift-x]').forEach((el) => {
    const amt = Number(el.dataset.driftX) || -20;
    gsap.fromTo(el, { xPercent: 0 }, { xPercent: amt, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

/** The thin gold line at the top of the viewport tracks reading progress. */
export function progressBar() {
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar) return;
  const set = gsap.quickSetter(bar, 'scaleX');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => set(self.progress) });
}

/** [data-glow] — glass panels light up where the pointer is (CSS reads --mx/--my). Fine pointers only. */
export function glow(root: HTMLElement): () => void {
  const els = q(root, '[data-glow]');
  const move = (e: PointerEvent) => {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  els.forEach((el) => el.addEventListener('pointermove', move));
  return () => els.forEach((el) => el.removeEventListener('pointermove', move));
}

/** [data-fill] — outlined display text fills with gold from left to right as it scrolls in (CSS reads --fill). */
export function textFills(root: ParentNode) {
  // the wordmark sits at the very end of the page: finish when its bottom reaches the viewport's, which is always reachable
  q(root, '[data-fill]').forEach((el) => {
    gsap.fromTo(el, { '--fill': '0%' }, { '--fill': '100%', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });
  });
}

/** [data-footer-rise] — footer blocks climb into place as they arrive. A one-time play, not a scrub: content at the
 *  very end of the page may never reach a scrub's end position, which would leave it offset over its neighbours. */
export function footerRise(root: ParentNode) {
  q(root, '[data-footer-rise]').forEach((el) => {
    gsap.fromTo(el, { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.3, ease: EASE.expo, scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
  });
}
