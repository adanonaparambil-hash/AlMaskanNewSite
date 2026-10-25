import { gsap, registerGsap, ScrollTrigger } from './gsap';
import { hero } from './hero';
import { counters, fadeReveals, lineReveals, maskReveals, staggerGroups } from './reveals';
import { cursor, hero3d, magnetic, marquees, ring, rise3d, tilt, velocitySkew, wordScrub } from './fx3d';
import { expansion, header, horizontalScroll, parallax, timelines } from './scroll';
import { blurReveals, charReveals, circles, curtains, driftX, feasts, footerRise, glow, progressBar, scaleReveals, scrambles, speeds, stacks, textFills } from './showcase';

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
      desktop: '(min-width: 1024px)',
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
      if (c.desktop) horizontalScroll(root);
      circles(root);
      feasts(root);
      header();
      progressBar();
      hero(root);
      lineReveals(root);
      charReveals(root);
      blurReveals(root);
      scaleReveals(root);
      scrambles(root);
      stacks(root);
      curtains(root);
      if (c.wide) speeds(root);
      driftX(root);
      textFills(root);
      footerRise(root);
      fadeReveals(root);
      staggerGroups(root);
      maskReveals(root);
      counters(root);
      parallax(root);
      expansion(root, c.wide);
      timelines(root);
      wordScrub(root);
      marquees(root);
      rise3d(root);
      if (c.desktop) ring(root);
      if (c.desktop) velocitySkew(root);
      const off: Array<() => void> = [];
      if (c.fine) off.push(tilt(root), hero3d(root), magnetic(root), cursor(), glow(root));
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
