'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import styles from './HeroMedia.module.css';

type Connection = EventTarget & { saveData?: boolean };

const SRC = '/assets/hero/village-film.mp4';
/** seconds of overlap between the two players at each loop */
const XFADE = 1.2;
/** a touch slower than real time reads as more cinematic (and stretches the 8s clip) */
const RATE = 0.85;

/**
 * Homepage-only media: the poster stays underneath; two players of the same film take turns so the loop never
 * freezes — shortly before one ends, the other starts from frame one and they cross-fade while both are moving.
 * Starts buffering as soon as the page is interactive (during the loader), starts playing once the loader opens.
 * Skipped for reduced-motion and Save-Data visitors (poster only). Pauses when off-screen or the tab is hidden.
 * The only control is a keyboard/screen-reader "Pause background film" button that appears on focus.
 */
export default function HeroMedia() {
  const background = useRef<HTMLDivElement>(null);
  const players = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [allowed, setAllowed] = useState(false);
  const [active, setActive] = useState<0 | 1 | null>(null);
  // the player being handed over from stays fully visible underneath until the incoming one has faded in
  const [previous, setPrevious] = useState<0 | 1 | null>(null);
  const [paused, setPaused] = useState(false);
  const state = useRef({ current: 0 as 0 | 1, running: false, userPaused: false, introDone: false, inView: true });

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const update = () => setAllowed(!motion.matches && !connection?.saveData);
    update();
    motion.addEventListener('change', update);
    connection?.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      connection?.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!allowed) { setActive(null); setPrevious(null); return; }
    const a = players[0].current;
    const b = players[1].current;
    if (!a || !b) return;
    const s = state.current;
    [a, b].forEach((v) => { v.muted = true; v.playbackRate = RATE; v.defaultPlaybackRate = RATE; });

    const timers = new Set<number>();
    const shouldRun = () => s.introDone && s.inView && !document.hidden && !s.userPaused;
    const cur = () => (s.current === 0 ? a : b);
    const resume = () => {
      if (!shouldRun()) { a.pause(); b.pause(); s.running = false; return; }
      s.running = true;
      const v = cur();
      v.playbackRate = RATE;
      void v.play().then(() => setActive(s.current)).catch(() => {});
    };

    // hand over to the other player shortly before the end, so both are moving during the cross-fade
    const onTime = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      if (v !== cur() || !v.duration || !s.running) return;
      if (v.duration - v.currentTime > XFADE * RATE) return;
      const next = s.current === 0 ? 1 : 0;
      const nv = next === 0 ? a : b;
      nv.currentTime = 0;
      nv.playbackRate = RATE;
      const from = s.current;
      s.current = next;
      void nv.play().then(() => {
        setPrevious(from);
        setActive(next);
        const t = window.setTimeout(() => { timers.delete(t); setPrevious((p) => (p === from ? null : p)); }, XFADE * 1000 + 200);
        timers.add(t);
      }).catch(() => {
        // the other player could not start: stay on this one (it restarts itself when it ends)
        s.current = from;
      });
    };
    const onEnded = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      if (v !== cur()) { v.pause(); v.currentTime = 0; return; }
      // fallback when no hand-over happened: loop this player directly rather than freeze on the last frame
      v.currentTime = 0;
      if (shouldRun()) void v.play().catch(() => {});
    };
    [a, b].forEach((v) => { v.addEventListener('timeupdate', onTime); v.addEventListener('ended', onEnded); });

    // first visit: the loader covers the hero; start once it has opened onto the same poster
    const intro = () => { s.introDone = true; resume(); };
    if (document.documentElement.classList.contains('is-loading')) window.addEventListener('preloader:done', intro, { once: true });
    else intro();

    const observer = new IntersectionObserver(([entry]) => { s.inView = entry.isIntersecting; resume(); }, { threshold: 0 });
    if (background.current) observer.observe(background.current);
    const onVisibility = () => resume();
    document.addEventListener('visibilitychange', onVisibility);
    (state.current as typeof s & { resume?: () => void }).resume = resume;

    return () => {
      [a, b].forEach((v) => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('ended', onEnded); v.pause(); });
      window.removeEventListener('preloader:done', intro);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
    // the refs are stable; re-run only when the permission changes
  }, [allowed]);

  const toggle = () => {
    const s = state.current as typeof state.current & { resume?: () => void };
    s.userPaused = !s.userPaused;
    setPaused(s.userPaused);
    s.resume?.();
  };

  return (
    <>
      <div ref={background} className="hero__bg" data-hero="bg">
        {/* drift wrapper: the motion library moves it on scroll and pointer for depth */}
        <div className={`hero__drift ${styles.frame}`} data-hero-drift>
          <Image
            src="/assets/hero/village-poster.webp"
            alt=""
            fill
            sizes="100vw"
            quality={82}
            loading="eager"
            fetchPriority="high"
            className={styles.poster}
          />
          {allowed &&
            players.map((ref, i) => (
              <video
                key={i}
                ref={ref}
                className={`${styles.video} ${active === i ? styles.ready : previous === i ? styles.prev : ''}`}
                src={SRC}
                muted
                playsInline
                preload="auto"
                disablePictureInPicture
                aria-hidden="true"
                tabIndex={-1}
              />
            ))}
        </div>
      </div>
      {allowed && (
        <button className={styles.control} type="button" onClick={toggle} aria-pressed={paused}>
          {paused ? 'Play background film' : 'Pause background film'}
        </button>
      )}
    </>
  );
}
