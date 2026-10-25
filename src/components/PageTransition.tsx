'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';

// the five brand colours and the night ground, read from the theme tokens so the curtain follows globals.css
const TOKENS = ['--c-acc', '--c-ret', '--c-cat', '--c-spa', '--c-lif'];
const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/**
 * Route transition: five brand-coloured panels rise over the page, the route changes underneath, then they lift away.
 * Intercepts plain same-origin link clicks only; modified clicks, new tabs, hashes, downloads and back/forward are untouched.
 * Skipped entirely for reduced-motion visitors.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);
  const busy = useRef(false);
  const failsafe = useRef<number | undefined>(undefined);

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // cover on click
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const cols = Array.from(el.querySelectorAll<HTMLElement>('.pt__col'));
    const mark = el.querySelector<HTMLElement>('.pt__mark');

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || reduced() || busy.current) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page or only a hash change
      if (/\.(pdf|jpe?g|png|xml|txt)$/i.test(url.pathname)) return;
      e.preventDefault();
      e.stopPropagation(); // capture phase: keep Next's own Link handler from navigating before the curtain is down
      busy.current = true;
      pending.current = url.pathname + url.search + url.hash;
      el.style.pointerEvents = 'auto';
      gsap.set(el, { visibility: 'visible' });
      gsap.timeline()
        .set(cols, { yPercent: 101, background: (i: number) => token(TOKENS[i % TOKENS.length]) })
        .to(cols, { yPercent: 0, duration: 0.55, ease: 'power3.inOut', stagger: 0.055 })
        .to(cols, { background: token('--bg-2'), duration: 0.3, stagger: 0.03, ease: 'none' }, '-=0.25')
        .fromTo(mark, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power3.out' }, '-=0.3')
        .call(() => {
          router.push(pending.current!);
          // never trap the visitor if the navigation stalls
          failsafe.current = window.setTimeout(() => reveal(), 4000);
        });
    };

    const reveal = () => {
      window.clearTimeout(failsafe.current);
      if (!busy.current) return;
      gsap.timeline({ onComplete: () => { busy.current = false; pending.current = null; el.style.pointerEvents = 'none'; gsap.set(el, { visibility: 'hidden' }); } })
        .to(mark, { autoAlpha: 0, duration: 0.25 })
        .to(cols, { yPercent: -101, duration: 0.7, ease: 'power3.inOut', stagger: 0.055 }, '-=0.1');
    };
    (el as HTMLElement & { _reveal?: () => void })._reveal = reveal;

    document.addEventListener('click', onClick, true);
    return () => { document.removeEventListener('click', onClick, true); window.clearTimeout(failsafe.current); };
  }, [router]);

  // reveal once the new route has rendered
  useEffect(() => {
    const el = root.current as (HTMLElement & { _reveal?: () => void }) | null;
    if (busy.current && el?._reveal) {
      const t = window.setTimeout(() => el._reveal!(), 250);
      return () => window.clearTimeout(t);
    }
  }, [pathname]);

  return (
    <div ref={root} className="pt" aria-hidden="true">
      {TOKENS.map((t) => <div key={t} className="pt__col" style={{ background: `var(${t})` }} />)}
      <div className="pt__mark">
        <img src="/assets/logos/al-maskaan-village-mark.png" alt="" width="72" height="72" />
      </div>
    </div>
  );
}
