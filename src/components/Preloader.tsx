'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { lockScroll, scrollToTop } from '@/lib/motion/smooth';

const LINES = [
  { name: 'Accommodation', c: 'var(--c-acc)' },
  { name: 'Retail', c: 'var(--c-ret)' },
  { name: 'Catering', c: 'var(--c-cat)' },
  { name: 'Spaces', c: 'var(--c-spa)' },
  { name: 'Lifestyle', c: 'var(--c-lif)' },
];
const WORD = 'Al Maskaan Village';

/**
 * First-visit intro. A small window onto the village aerial opens as the count runs 0 → 100 (never ahead of real
 * page loading) while the five Haven lines fill one by one; at 100 the window expands to full screen — the same
 * poster the hero film opens on — and the loader dissolves into it. Only runs when the head script set `.is-loading`
 * (motion allowed, first page of the session); a CSS failsafe hides it if this never runs.
 * Dispatches `preloader:done` for the hero sequence.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = root.current;
    if (!el || !html.classList.contains('is-loading')) return;
    const release = () => {
      html.classList.remove('is-loading');
      covered.forEach((n) => (n.inert = false));
      lockScroll(false);
      // smooth scrolling may have started after the loader did: make sure the hand-off lands on the hero
      scrollToTop();
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('preloader:done'));
    };
    // scripts arrived late (slow connection): skip the show rather than hold the page back any longer
    if (performance.now() > 4000) { release(); return; }
    // while it covers the page, nothing underneath scrolls or takes focus
    const covered = Array.from(document.body.children).filter((n): n is HTMLElement => n instanceof HTMLElement && n !== el);
    covered.forEach((n) => (n.inert = true));
    lockScroll(true);
    const q = <T extends Element = HTMLElement>(s: string) => Array.from(el.querySelectorAll<T>(s));
    const count = el.querySelector<HTMLElement>('[data-count]');
    const windowEl = el.querySelector<HTMLElement>('.preloader__window');
    const photo = el.querySelector<HTMLElement>('.preloader__photo');
    const bars = q('.preloader__line i');
    const names = q('.preloader__line');
    const letters = q('.preloader__word span');
    const chrome = q('[data-chrome]');
    const state = { v: 0 };

    // entrance: letters rise, chrome fades in, the window appears as a sliver
    const intro = gsap.timeline();
    intro
      .fromTo(letters, { yPercent: 110, rotationX: -70 }, { yPercent: 0, rotationX: 0, duration: 1, stagger: 0.035, ease: 'expo.out' }, 0)
      .fromTo(chrome, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out' }, 0.15)
      .fromTo(windowEl, { clipPath: 'inset(50% 50% 50% 50% round 999px)' }, { clipPath: 'inset(44% 38% 44% 38% round 999px)', duration: 0.9, ease: 'expo.out' }, 0.2);

    const render = () => {
      const p = state.v / 100;
      if (count) count.textContent = String(Math.round(state.v)).padStart(3, '0');
      // the window widens and grows taller with progress
      const y = 44 - p * 22;
      const x = 38 - p * 16;
      gsap.set(windowEl, { clipPath: `inset(${y}% ${x}% ${y}% ${x}% round ${Math.round(999 - p * 975)}px)` });
      gsap.set(photo, { scale: 1.5 - p * 0.3 });
      bars.forEach((b, i) => gsap.set(b, { scaleX: gsap.utils.clamp(0, 1, p * 5 - i) }));
      names.forEach((n, i) => n.classList.toggle('is-on', p * 5 >= i + 0.98));
    };

    const finish = () => {
      try { sessionStorage.setItem('amv-intro', '1'); } catch {}
      gsap.timeline({
        onComplete: release,
      })
        .to(letters, { yPercent: -110, duration: 0.6, stagger: 0.02, ease: 'power3.in' }, 0)
        .to(chrome, { autoAlpha: 0, y: -12, duration: 0.45, stagger: 0.03, ease: 'power2.in' }, 0)
        .to(windowEl, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.2, ease: 'expo.inOut' }, 0.25)
        .to(photo, { scale: 1, duration: 1.4, ease: 'expo.inOut' }, 0.25)
        .to(el, { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, 1.35);
    };

    // the count runs on its own clock but holds at 86 until the page has really loaded
    let loaded = document.readyState === 'complete';
    const tween = gsap.to(state, {
      v: 100,
      duration: 2.6,
      delay: 0.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (!loaded && state.v > 86) { tween.pause(); return; }
        render();
      },
      onComplete: finish,
    });
    const resume = () => { loaded = true; if (tween.paused()) tween.resume(); };
    window.addEventListener('load', resume);
    // worst case (mount at 4s + 2.5s hold + finish + 1.95s exit) stays inside the 10s CSS failsafe
    const safety = window.setTimeout(resume, 2500);
    return () => {
      window.removeEventListener('load', resume);
      window.clearTimeout(safety);
      intro.kill();
      tween.kill();
      covered.forEach((n) => (n.inert = false));
    };
  }, []);

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="preloader__window">
        <div className="preloader__photo">
          <Image src="/assets/hero/village-poster.webp" alt="" fill sizes="100vw" quality={82} style={{ objectFit: 'cover', objectPosition: '50% 40%' }} />
        </div>
      </div>

      <div className="preloader__top" data-chrome>
        <img className="preloader__mark" src="/assets/logos/al-maskaan-village-mark.png" alt="" width="40" height="40" />
        <span>Khazaen Economic City · Barka · Oman</span>
      </div>

      <p className="preloader__word">
        {WORD.split('').map((ch, i) => <span key={i}>{ch === ' ' ? ' ' : ch}</span>)}
      </p>

      <div className="preloader__bottom">
        <p className="preloader__count" data-chrome><span data-count>000</span><small>%</small></p>
        <ul className="preloader__lines" data-chrome>
          {LINES.map((l) => (
            <li key={l.name} className="preloader__line" style={{ '--c': l.c } as React.CSSProperties}>
              <span>{l.name}</span>
              <b><i /></b>
            </li>
          ))}
        </ul>
        <p className="preloader__tag" data-chrome>Elevating living <em>&amp; working</em></p>
      </div>
    </div>
  );
}
