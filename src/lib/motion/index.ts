import { gsap, registerGsap, ScrollTrigger } from './gsap';
import { hero } from './hero';
import { counters, fadeReveals, lineReveals, maskReveals, staggerGroups } from './reveals';
import { cursor, hero3d, magnetic, marquees, ring, rise3d, tilt, velocitySkew, wordScrub } from './fx3d';
import { expansion, header, horizontalScroll, parallax, timelines } from './scroll';
import { blurReveals, charReveals, circles, curtains, driftX, feasts, footerRise, glow, progressBar, scaleReveals, scrambles, speeds, stacks, textFills } from './showcase';

/** One broken effect must never take the page down with it: log, reveal everything, carry on. */
let failed = false;
const guard = (name: string, fn: () => void) => {
  try { fn(); } catch (err) { failed = true; console.error(`[motion] ${name} failed`, err); }
};

const HIDDEN = '[data-reveal],[data-stagger-item],[data-hero],[data-timeline-item]';

/** Make everything visible again (reduced motion, or if initialisation fails). */
export function revealAll(root: ParentNode = document) {
  document.documentElement.classList.remove('motion-on');
  root.querySelectorAll<HTMLElement>(HIDDEN).forEach((el) => {
    el.style.visibility = 'visible';
    el.style.opacity = '1';
  });
}

/**
 * Initialises every motion pattern against `root`, inside a gsap.matchMedia so that effects are
 * created/destroyed as the viewport or the reduced-motion preference changes. Returns a cleanup.
 */
export function initMotion(root: HTMLElement): () => void {
  registerGsap();
  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: '(prefers-reduced-motion: reduce)',
      motion: '(prefers-reduced-motion: no-preference)',
      // pinned scenes need a real wheel/trackpad: touch devices (iPads included) get the native-scroll layouts
      desktop: '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
      wide: '(min-width: 760px)',
      fine: '(hover: hover) and (pointer: fine)',
    },
    (ctx) => {
      const c = ctx.conditions as { reduce: boolean; motion: boolean; desktop: boolean; wide: boolean; fine: boolean };
      if (c.reduce) {
        revealAll(root);
        return;
      }
      document.documentElement.classList.add('motion-on');
      // pinned sections first, so every trigger measured after them accounts for the pin spacing
      if (c.desktop) guard('horizontalScroll', () => horizontalScroll(root));
      guard('circles', () => circles(root));
      guard('feasts', () => feasts(root));
      guard('header', () => header());
      guard('progressBar', () => progressBar());
      guard('hero', () => hero(root));
      guard('lineReveals', () => lineReveals(root));
      guard('charReveals', () => charReveals(root));
      guard('blurReveals', () => blurReveals(root));
      guard('scaleReveals', () => scaleReveals(root));
      guard('scrambles', () => scrambles(root));
      guard('stacks', () => stacks(root));
      guard('curtains', () => curtains(root));
      if (c.wide) guard('speeds', () => speeds(root));
      guard('driftX', () => driftX(root));
      guard('textFills', () => textFills(root));
      guard('footerRise', () => footerRise(root));
      guard('fadeReveals', () => fadeReveals(root));
      guard('staggerGroups', () => staggerGroups(root));
      guard('maskReveals', () => maskReveals(root));
      guard('counters', () => counters(root));
      guard('parallax', () => parallax(root));
      guard('expansion', () => expansion(root, c.wide));
      guard('timelines', () => timelines(root));
      guard('wordScrub', () => wordScrub(root));
      guard('marquees', () => marquees(root));
      guard('rise3d', () => rise3d(root));
      if (c.desktop) guard('ring', () => ring(root));
      if (c.desktop) guard('velocitySkew', () => velocitySkew(root));
      const off: Array<() => void> = [];
      if (c.fine) {
        for (const [name, fn] of [['tilt', tilt], ['hero3d', hero3d], ['magnetic', magnetic], ['cursor', cursor], ['glow', glow]] as const) {
          guard(name, () => off.push((fn as (r: HTMLElement) => () => void)(root)));
        }
      }
      if (failed) revealAll(root);
      (window as unknown as { __amvReady?: boolean }).__amvReady = true;
      return () => off.forEach((f) => f());
    },
  );

  const onLoad = () => ScrollTrigger.refresh();
  window.addEventListener('load', onLoad);
  // web fonts change line breaks / heights — re-measure once they are ready
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    window.removeEventListener('load', onLoad);
    mm.revert();
  };
}
