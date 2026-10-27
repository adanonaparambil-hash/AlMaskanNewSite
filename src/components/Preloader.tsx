'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { lockScroll, scrollToTop } from '@/lib/motion/smooth';
import { useI18n } from '@/i18n/client';

const LINE_COLORS = ['var(--c-acc)', 'var(--c-ret)', 'var(--c-cat)', 'var(--c-spa)', 'var(--c-lif)'];

/** Five nested house outlines — the brand mark, one line per service of the "Haven of five". */
const HOUSES = Array.from({ length: 5 }, (_, i) => {
  const s = i * 14;
  const left = 30 + s;
  const right = 170 - s;
  const eave = 80 + s * 0.6;
  const peak = 22 + s * 1.15;
  return `M${left} 174 V${eave} L100 ${peak} L${right} ${eave} V174`;
});
const DOOR = { x: 100, y: 152 };

/**
 * First-visit intro, "the doorway". The village mark draws itself one line per service (Accommodation, Retail,
 * Catering, Spaces, Lifestyle) as the count runs — never ahead of real page loading — the name sits beneath it,
 * then the mark's door opens: a circle grows from the door and the visitor steps through it onto the home page.
 * Only runs when the head script set `.is-loading` (motion allowed, first page of the session, not a touch/lite
 * device). Failsafes: a 7s wall-clock deadline here, plus CSS and head-script timers. Dispatches `preloader:done`.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const { ui, locale } = useI18n();
  // Arabic letters join: animate whole words there, single letters only in Latin script
  const pieces = locale === 'ar' ? ui.loader.word.split(' ').flatMap((w, i) => (i ? [' ', w] : [w])) : ui.loader.word.split('');

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains('is-loading')) return;
    let released = false;
    const covered = Array.from(document.body.children).filter((n): n is HTMLElement => n instanceof HTMLElement && n !== el);
    const release = () => {
      if (released) return;
      released = true;
      html.classList.remove('is-loading');
      covered.forEach((n) => (n.inert = false));
      lockScroll(false);
      scrollToTop();
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('preloader:done'));
    };
    // scripts arrived late (slow connection): skip the show rather than hold the page back any longer
    if (performance.now() > 4000) { release(); return; }
    covered.forEach((n) => (n.inert = true));
    lockScroll(true);

    const q = <T extends Element = HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const lines = q<SVGPathElement>('.preloader__line');
    const door = el.querySelector<SVGCircleElement>('.preloader__door');
    const mark = el.querySelector<HTMLElement>('.preloader__mark');
    const count = el.querySelector<HTMLElement>('[data-count]');
    const labels = q('.preloader__label');
    const letters = q('.preloader__word span');
    const chrome = q('[data-chrome], .preloader__sub');
    const lengths = lines.map((l) => l.getTotalLength());
    lines.forEach((l, i) => gsap.set(l, { strokeDasharray: lengths[i], strokeDashoffset: lengths[i] }));
    gsap.set(el, { '--r': '0px' });
    gsap.set(letters, { yPercent: 110 });

    const intro = gsap.timeline()
      .fromTo(chrome, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' }, 0.1)
      .fromTo(mark, { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 1, ease: 'expo.out' }, 0)
      // the full name sits under the mark for the whole intro
      .fromTo(letters, { yPercent: 110, rotationX: -70 }, { yPercent: 0, rotationX: 0, duration: 1, stagger: 0.03, ease: 'expo.out' }, 0.25);

    let current = -1;
    const state = { v: 0 };
    const render = () => {
      const p = state.v / 100;
      if (count) count.textContent = String(Math.round(state.v)).padStart(3, '0');
      lines.forEach((l, i) => {
        const local = gsap.utils.clamp(0, 1, p * 5 - i);
        l.style.strokeDashoffset = String(lengths[i] * (1 - local));
      });
      const idx = Math.min(4, Math.floor(p * 5));
      if (idx !== current) {
        current = idx;
        labels.forEach((lab, i) => lab.classList.toggle('is-on', i === idx));
      }
    };

    const finish = () => {
      try { sessionStorage.setItem('amv-intro', '1'); } catch {}
      // where the door is on screen: the opening grows from there
      const d = door?.getBoundingClientRect();
      const cx = d ? d.left + d.width / 2 : window.innerWidth / 2;
      const cy = d ? d.top + d.height / 2 : window.innerHeight / 2;
      const far = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
      gsap.set(el, { '--cx': `${cx}px`, '--cy': `${cy}px` });
      gsap.timeline({ onComplete: release })
        .to(labels, { autoAlpha: 0, duration: 0.3 }, 0)
        .to(door ?? {}, { attr: { r: 9 }, duration: 0.5, ease: 'power2.out' }, 0.2)
        .to(lines, { stroke: '#f3e7cf', duration: 0.5, stagger: 0.05 }, 0.3)
        .to(chrome, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' }, 1.15)
        .to(letters, { yPercent: -110, duration: 0.5, stagger: 0.015, ease: 'power3.in' }, 1.2)
        // step through the door: the mark rushes toward the visitor while the opening widens over the page
        .to(mark, { scale: 7, autoAlpha: 0, duration: 1.2, ease: 'expo.in', transformOrigin: `50% ${(DOOR.y / 200) * 100}%` }, 1.35)
        .to(el, { '--r': `${far}px`, duration: 1.1, ease: 'expo.inOut' }, 1.55);
    };

    // the count runs on its own clock but holds at 86 until the page has really loaded
    let loaded = document.readyState === 'complete';
    const tween = gsap.to(state, {
      v: 100,
      duration: 2.4,
      delay: 0.35,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (!loaded && state.v > 86) { tween.pause(); return; }
        render();
      },
      onComplete: finish,
    });
    const resume = () => { loaded = true; if (tween.paused()) tween.resume(); };
    window.addEventListener('load', resume);
    const safety = window.setTimeout(resume, 2500);
    // hard deadline on the wall clock (not the animation clock): a slow device must never be left behind a loader
    const deadline = window.setTimeout(() => { intro.kill(); tween.kill(); gsap.killTweensOf([el, mark, door, lines, letters, chrome, labels]); gsap.set(el, { autoAlpha: 0 }); release(); }, 7000);
    return () => {
      window.removeEventListener('load', resume);
      window.clearTimeout(safety);
      window.clearTimeout(deadline);
      intro.kill();
      tween.kill();
      covered.forEach((n) => (n.inert = false));
    };
  }, []);

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__top" data-chrome>
        <span>{ui.loader.place}</span>
        <span className="preloader__count"><span data-count>000</span><small>%</small></span>
      </div>

      <div className="preloader__center">
        <div className="preloader__mark">
          <svg viewBox="0 0 200 200" width="200" height="200">
            {HOUSES.map((d) => <path key={`g${d}`} d={d} className="preloader__ghost" />)}
            {HOUSES.map((d, i) => <path key={d} d={d} className="preloader__line" style={{ stroke: LINE_COLORS[i] }} />)}
            <circle className="preloader__door" cx={DOOR.x} cy={DOOR.y} r="5" />
          </svg>
        </div>
        <ul className="preloader__labels">
          {ui.loader.lines.map((name, i) => (
            <li key={name} className="preloader__label" style={{ '--c': LINE_COLORS[i] } as React.CSSProperties}>
              <i /> {name}
            </li>
          ))}
        </ul>
        <p className="preloader__word">
          {pieces.map((ch, i) => <span key={i} className={ch.trim() ? undefined : 'gap'}>{ch.trim() ? ch : ' '}</span>)}
        </p>
        {/* the brand name in the other script, as on the logo */}
        <p className="preloader__sub" lang={locale === 'ar' ? 'en' : 'ar'} dir={locale === 'ar' ? 'ltr' : 'rtl'}>{locale === 'ar' ? 'Al Maskaan Village' : 'قرية المسكن'}</p>
      </div>

      <p className="preloader__tag" data-chrome>{ui.loader.tagA} <em>{ui.loader.tagB}</em></p>
    </div>
  );
}
