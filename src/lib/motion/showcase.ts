import { EASE, gsap, padMasks, ScrollTrigger, SplitText, START } from './gsap';

/** The glass redesign's signature effects. Same contract as the rest of the library: content opts in with data attributes. */
const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => Array.from(root.querySelectorAll<T>(sel));
/** Arabic letters join, so letter-level effects run on whole words there (and Latin glyph scrambles are skipped). */
export const isJoinedScript = () => document.documentElement.lang === 'ar';

/** data-reveal="chars" — letters flip up out of a mask, one after another. */
export function charReveals(root: HTMLElement) {
  const joined = isJoinedScript();
  q(root, '[data-reveal="chars"]').forEach((el) => {
    SplitText.create(el, {
      type: joined ? 'words' : 'words,chars',
      mask: 'words',
      autoSplit: true,
      charsClass: 'split-char',
      onSplit(self) {
        padMasks(self.masks);
        gsap.set(el, { autoAlpha: 1 });
        return gsap.from(joined ? self.words : self.chars, {
          yPercent: 150,
          rotationX: -70,
          transformOrigin: '50% 100%',
          duration: 1.1,
          ease: EASE.expo,
          stagger: joined ? 0.06 : 0.018,
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
  // grow from the side the text starts on, so the oversize start never spills past the far edge of a phone
  const origin = document.documentElement.dir === 'rtl' ? '100% 100%' : '0% 100%';
  q(root, '[data-reveal="scale"]').forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, scale: 1.08, letterSpacing: '0.02em', transformOrigin: origin },
      { autoAlpha: 1, scale: 1, letterSpacing: '-0.025em', duration: 1.6, ease: EASE.expo, clearProps: 'letterSpacing,transform', scrollTrigger: { trigger: el, start: START, once: true } },
    );
  });
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/';
/** data-scramble — short labels decode from random glyphs when they enter. Only the aria-hidden copy is scrambled. */
export function scrambles(root: HTMLElement) {
  if (isJoinedScript()) return;
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

/**
 * [data-feast] — catering scene on a sticky stage. Scattered mosaic tiles settle while the headline lifts away;
 * then the full-size dining-hall layer is uncovered from the centre tile's exact rectangle to full screen (a
 * clip, not a scale, so the photo stays sharp) as the other tiles push out; finally the glass card rises and
 * its figures count up. The centre rectangle is measured from layout offsets (unaffected by transforms).
 */
export function feasts(root: HTMLElement) {
  q(root, '[data-feast]').forEach((section) => {
    const stage = section.querySelector<HTMLElement>('.feast__stage');
    const grid = section.querySelector<HTMLElement>('[data-feast-grid]');
    const hero = section.querySelector<HTMLElement>('[data-feast-hero]');
    const center = section.querySelector<HTMLElement>('[data-feast-tile="center"]');
    if (!stage || !grid || !hero || !center) return;
    const veil = section.querySelector<HTMLElement>('[data-feast-veil]');
    const intro = section.querySelector<HTMLElement>('[data-feast-intro]');
    const card = section.querySelector<HTMLElement>('[data-feast-card]');
    const heroImg = hero.querySelector<HTMLElement>('.media__inner');
    const outer = q(grid, '[data-feast-tile=""]');
    const counts = q(section, '[data-feast-count]');
    // deterministic scatter so every visit starts from the same composition
    const scatter = [[-60, -40, -6], [0, -70, 3], [60, -40, 5], [-80, 0, -4], [80, 0, 4], [-60, 50, 5], [0, 70, -3], [60, 50, -5]];

    const startClip = () => {
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      const l = grid.offsetLeft + center.offsetLeft;
      const t = grid.offsetTop + center.offsetTop;
      const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;
      // start with the tile's own rounded corners (the theme radius)
      const radius = getComputedStyle(document.documentElement).getPropertyValue('--radius').trim() || '22px';
      return `inset(${pct(t, h)} ${pct(w - l - center.offsetWidth, w)} ${pct(h - t - center.offsetHeight, h)} ${pct(l, w)} round ${radius})`;
    };

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.8, invalidateOnRefresh: true },
    });
    // 1 — headline lifts away, the mosaic settles and brightens
    if (intro) tl.fromTo(intro, { autoAlpha: 1, y: 0, scale: 1 }, { autoAlpha: 0, y: -90, scale: 1.06, duration: 0.24 }, 0.04);
    if (veil) tl.fromTo(veil, { opacity: 1 }, { opacity: 0.12, duration: 0.28 }, 0.04);
    tl.fromTo(grid, { scale: 0.84 }, { scale: 1, duration: 0.3 }, 0);
    tl.fromTo(outer, { x: (i) => scatter[i % 8][0], y: (i) => scatter[i % 8][1], rotation: (i) => scatter[i % 8][2] }, { x: 0, y: 0, rotation: 0, duration: 0.3 }, 0);
    // 2 — the dining hall opens from the centre tile to full screen; the rest of the mosaic pushes out
    tl.set(hero, { autoAlpha: 1 }, 0.32);
    tl.fromTo(hero, { clipPath: startClip }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.34 }, 0.32);
    if (heroImg) tl.fromTo(heroImg, { scale: 1.12 }, { scale: 1, duration: 0.34 }, 0.32);
    tl.to(grid, { scale: 1.3, autoAlpha: 0, duration: 0.3 }, 0.34);
    // 3 — the details arrive over the hall
    if (veil) tl.to(veil, { opacity: 0.6, duration: 0.18 }, 0.68);
    if (card) tl.fromTo(card, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.18 }, 0.72);
    counts.forEach((el) => {
      const end = Number(el.dataset.feastCount) || 0;
      const proxy = { v: 0 };
      tl.fromTo(proxy, { v: 0 }, { v: end, duration: 0.2, onUpdate: () => { el.textContent = Math.round(proxy.v).toLocaleString('en-US'); } }, 0.76);
    });
    tl.to({}, { duration: 0.04 }, 0.96); // a short hold at the end before the stage releases
  });
}
