import { EASE, gsap, ScrollTrigger } from './gsap';
import { trackPanels3d } from './fx3d';

const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => Array.from(root.querySelectorAll<T>(sel));

/** data-parallax="0.12" on a .media__inner (which is taller than its frame). Scrubbed, transform only. */
export function parallax(root: HTMLElement) {
  q(root, '[data-parallax]').forEach((el) => {
    const amount = Math.min(Number(el.dataset.parallax) || 0.08, 0.09); // capped so the 12% image buffer never runs out
    const frame = el.parentElement ?? el;
    gsap.fromTo(
      el,
      { yPercent: -amount * 100 },
      { yPercent: amount * 100, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
    );
  });
}

/**
 * Image expansion: a sticky full-height stage whose framed image grows to full-bleed as the section scrolls.
 * Markup: [data-expand] > .expand__stage > [data-expand-frame] (+ [data-expand-copy]).
 */
export function expansion(root: HTMLElement, wide: boolean) {
  q(root, '[data-expand]').forEach((section) => {
    const frame = section.querySelector<HTMLElement>('[data-expand-frame]');
    if (!frame) return;
    const copy = section.querySelector<HTMLElement>('[data-expand-copy]');
    const inner = frame.querySelector<HTMLElement>('.media__inner');
    const insetFrom = wide ? 'inset(16% 22% 16% 22%)' : 'inset(10% 6% 10% 6%)';
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
    });
    tl.fromTo(frame, { clipPath: insetFrom }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 }, 0);
    if (inner) tl.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 1 }, 0);
    if (copy) {
      tl.fromTo(copy, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.55);
    }
  });
}

/** Timeline: a line that draws with scroll and milestone rows that light up as it passes. */
export function timelines(root: HTMLElement) {
  q(root, '[data-timeline]').forEach((el) => {
    const line = el.querySelector<HTMLElement>('[data-timeline-line]');
    const items = q(el, '[data-timeline-item]');
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', transformOrigin: 'top center', scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom 70%', scrub: 0.5 } },
      );
    }
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE.out, scrollTrigger: { trigger: item, start: 'top 82%', once: true } },
      );
      ScrollTrigger.create({ trigger: item, start: 'top 62%', end: 'bottom 62%', toggleClass: { targets: item, className: 'is-active' } });
    });
  });
}

/**
 * Horizontal storytelling: pins [data-hscroll] and translates its track by the real rendered overflow.
 * Desktop + motion only; elsewhere the track is a native horizontally scrollable / stacked layout.
 */
export function horizontalScroll(root: HTMLElement) {
  q(root, '[data-hscroll]').forEach((section) => {
    const track = section.querySelector<HTMLElement>('[data-hscroll-track]');
    if (!track) return;
    const bar = section.querySelector<HTMLElement>('[data-hscroll-bar]');
    const counter = section.querySelector<HTMLElement>('[data-hscroll-count]');
    const panels = q(track, '[data-hscroll-panel]');
    section.classList.add('is-pinned');
    const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + distance(),
        pin: true,
        refreshPriority: 1,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar) gsap.set(bar, { scaleX: self.progress });
          if (counter && panels.length) {
            const idx = Math.min(panels.length - 1, Math.round(self.progress * (panels.length - 1)));
            counter.textContent = String(idx + 1).padStart(2, '0');
          }
        },
      },
    });
    // panel imagery drifts slightly against the track for depth
    panels.forEach((p) => {
      const img = p.querySelector<HTMLElement>('.media__inner');
      if (!img) return;
      gsap.fromTo(
        img,
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: 'none',
          scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        },
      );
    });
    trackPanels3d(section, panels, tween);
    return () => section.classList.remove('is-pinned');
  });
}

/** Header: gains a surface after the first scroll, tucks away on scroll-down and returns on scroll-up. */
export function header() {
  const el = document.querySelector<HTMLElement>('[data-site-header]');
  if (!el) return;
  ScrollTrigger.create({
    start: 80,
    end: 'max',
    onUpdate: (self) => {
      el.classList.add('is-solid');
      const hidden = self.direction === 1 && self.scroll() > 520 && !el.contains(document.activeElement) && !el.classList.contains('menu-open');
      el.classList.toggle('is-hidden', hidden);
    },
    onLeaveBack: () => el.classList.remove('is-solid', 'is-hidden'),
  });
}
