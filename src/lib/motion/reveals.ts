import { DUR, EASE, gsap, padMasks, SplitText, START } from './gsap';

/** Elements opt in with data attributes; the animation logic lives only here. */
const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => Array.from(root.querySelectorAll<T>(sel));

/** data-reveal="lines" — headings & short statements. Masked line-by-line rise. */
export function lineReveals(root: HTMLElement) {
  q(root, '[data-reveal="lines"]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      linesClass: 'split-line',
      onSplit(self) {
        padMasks(self.masks);
        gsap.set(el, { autoAlpha: 1 });
        return gsap.from(self.lines, {
          yPercent: 135,
          duration: DUR.slow,
          ease: EASE.expo,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: START, once: true },
        });
      },
    });
  });
}

/** data-reveal="fade" — paragraphs, buttons, small blocks. A short rise + fade. */
export function fadeReveals(root: HTMLElement) {
  q(root, '[data-reveal="fade"]').forEach((el) => {
    const delay = Number(el.dataset.delay ?? 0);
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 28 },
      { autoAlpha: 1, y: 0, duration: DUR.base, delay, ease: EASE.out, scrollTrigger: { trigger: el, start: START, once: true } },
    );
  });
}

/** data-stagger on a container, data-stagger-item on its children — cards, list rows. */
export function staggerGroups(root: HTMLElement) {
  q(root, '[data-stagger]').forEach((group) => {
    const items = q(group, '[data-stagger-item]');
    if (!items.length) return;
    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 44 },
      {
        autoAlpha: 1,
        y: 0,
        duration: DUR.base,
        ease: EASE.out,
        stagger: Number(group.dataset.stagger) || 0.1,
        scrollTrigger: { trigger: group, start: START, once: true },
      },
    );
  });
}

/** data-reveal="mask" on a .media — clip-path wipe with an inner image settling from a slight zoom. */
export function maskReveals(root: HTMLElement) {
  q(root, '[data-reveal="mask"]').forEach((el) => {
    const dir = el.dataset.dir ?? 'up';
    const from = dir === 'left' ? 'inset(0% 100% 0% 0%)' : dir === 'right' ? 'inset(0% 0% 0% 100%)' : 'inset(100% 0% 0% 0%)';
    const img = el.querySelector<HTMLElement>('.media__inner');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    tl.fromTo(el, { clipPath: from, autoAlpha: 1 }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.35, ease: EASE.expo });
    if (img) tl.from(img, { scale: 1.22, duration: 1.8, ease: EASE.out }, 0);
  });
}

/** Counters: data-counter="3000" with optional data-suffix. SSR already shows the final number. */
export function counters(root: HTMLElement) {
  q(root, '[data-counter]').forEach((el) => {
    const end = Number(el.dataset.counter);
    if (!Number.isFinite(end)) return;
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: end,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US'); },
      onComplete: () => { el.textContent = end.toLocaleString('en-US'); },
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });
}
