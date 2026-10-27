import { DUR, EASE, gsap, ScrollTrigger, SplitText } from './gsap';

type Cleanup = () => void;
const q = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => Array.from(root.querySelectorAll<T>(sel));
const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement | Window, ev: K | string, fn: (e: any) => void, opts?: AddEventListenerOptions): Cleanup => {
  el.addEventListener(ev, fn, opts);
  return () => el.removeEventListener(ev, fn, opts);
};

/** [data-tilt="10"] — 3D pointer tilt with a moving glare. Fine pointers only. */
export function tilt(root: HTMLElement): Cleanup {
  const off: Cleanup[] = [];
  q(root, '[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt) || 8;
    gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
    const glare = document.createElement('span');
    glare.className = 'tilt__glare';
    glare.setAttribute('aria-hidden', 'true');
    el.appendChild(glare);
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: EASE.out });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: EASE.out });
    off.push(
      on(el, 'pointermove', (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ry(x * max * 2);
        rx(-y * max * 2);
        el.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
        el.style.setProperty('--gy', `${(y + 0.5) * 100}%`);
        el.classList.add('is-tilting');
      }),
      on(el, 'pointerleave', () => {
        rx(0);
        ry(0);
        el.classList.remove('is-tilting');
      }),
      () => glare.remove(),
    );
  });
  return () => off.forEach((f) => f());
}

/** Hero: layered 3D response to the pointer (image tilts in depth, type floats forward). */
export function hero3d(root: HTMLElement): Cleanup {
  const section = root.querySelector<HTMLElement>('[data-hero-section]');
  if (!section) return () => {};
  const bg = section.querySelector<HTMLElement>('.hero__bg');
  const drift = section.querySelector<HTMLElement>('[data-hero-drift]');
  const title = section.querySelector<HTMLElement>('[data-hero="title"]');
  const aside = section.querySelector<HTMLElement>('.hero__aside');
  if (!bg || !drift) return () => {};
  gsap.set(bg, { transformPerspective: 1200 });
  const o = { duration: 1.2, ease: EASE.out };
  const bry = gsap.quickTo(drift, 'rotationY', o);
  const brx = gsap.quickTo(drift, 'rotationX', o);
  const bx = gsap.quickTo(drift, 'x', o);
  const tx = title ? gsap.quickTo(title, 'x', o) : null;
  const ty = title ? gsap.quickTo(title, 'y', o) : null;
  const ax = aside ? gsap.quickTo(aside, 'x', o) : null;
  const ay = aside ? gsap.quickTo(aside, 'y', o) : null;
  const move = (e: PointerEvent) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    bry(x * 5);
    brx(-y * 4);
    bx(-x * 26);
    tx?.(x * 18);
    ty?.(y * 10);
    ax?.(x * 8);
    ay?.(y * 5);
  };
  return on(section, 'pointermove', move);
}

/** [data-rise3d] — element tips up out of the page (rotateX) as it enters. Scrubbed. */
export function rise3d(root: HTMLElement) {
  q(root, '[data-rise3d]').forEach((el) => {
    const from = Number(el.dataset.rise3d) || 24;
    gsap.fromTo(
      el,
      { rotationX: from, y: 110, scale: 0.9, transformPerspective: 1300, transformOrigin: '50% 100%' },
      { rotationX: 0, y: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 105%', end: 'top 45%', scrub: 0.6 } },
    );
  });
}

/** [data-marquee] — endless type band; speeds up and skews with scroll velocity, reverses with direction. */
export function marquees(root: HTMLElement) {
  q(root, '[data-marquee]').forEach((el) => {
    const track = el.querySelector<HTMLElement>('[data-marquee-track]');
    if (!track) return;
    const base = Number(el.dataset.marquee) || 1;
    const loop = gsap.to(track, { xPercent: -50, repeat: -1, duration: 38 / base, ease: 'none' });
    const skew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: EASE.out });
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity();
        const dir = self.direction;
        gsap.to(loop, { timeScale: dir * (1 + Math.min(Math.abs(v) / 260, 7)), duration: 0.25, overwrite: true, onComplete: () => { gsap.to(loop, { timeScale: dir, duration: 1.2 }); } });
        skew(gsap.utils.clamp(-9, 9, -v / 260));
      },
      onToggle: (self) => (self.isActive ? loop.resume() : loop.pause()),
    });
  });
}

/** [data-words] — a statement that fills in word by word as you scroll through it. */
export function wordScrub(root: HTMLElement) {
  q(root, '[data-words]').forEach((el) => {
    SplitText.create(el, {
      type: 'words',
      wordsClass: 'w',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { autoAlpha: 1 });
        return gsap.fromTo(
          self.words,
          { opacity: 0.14 },
          { opacity: 1, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 42%', scrub: 0.5 } },
        );
      },
    });
  });
}

/** [data-magnetic] — buttons lean toward the pointer. */
export function magnetic(root: HTMLElement): Cleanup {
  const off: Cleanup[] = [];
  q(root, '[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.55)' });
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.55)' });
    off.push(
      on(el, 'pointermove', (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.28);
        y((e.clientY - (r.top + r.height / 2)) * 0.4);
      }),
      on(el, 'pointerleave', () => { x(0); y(0); }),
    );
  });
  return () => off.forEach((f) => f());
}

/** A soft follower ring for fine pointers; grows over interactive things and shows labels (data-cursor="View"). */
export function cursor(): Cleanup {
  const ring = document.createElement('div');
  ring.className = 'cursor';
  ring.setAttribute('aria-hidden', 'true');
  ring.innerHTML = '<span class="cursor__label"></span>';
  document.body.appendChild(ring);
  const label = ring.querySelector<HTMLElement>('.cursor__label')!;
  const x = gsap.quickTo(ring, 'x', { duration: 0.45, ease: EASE.out });
  const y = gsap.quickTo(ring, 'y', { duration: 0.45, ease: EASE.out });
  let shown = false;
  const move = (e: PointerEvent) => {
    if (!shown) { shown = true; gsap.set(ring, { x: e.clientX, y: e.clientY }); ring.classList.add('is-on'); }
    x(e.clientX);
    y(e.clientY);
    const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor],a,button,input,textarea,label');
    ring.classList.toggle('is-link', !!t);
    const text = t?.dataset.cursor ?? '';
    ring.classList.toggle('has-label', !!text);
    if (label.textContent !== text) label.textContent = text;
  };
  const leave = () => { shown = false; ring.classList.remove('is-on'); };
  const off = [on(window, 'pointermove', move), on(document.documentElement, 'pointerleave', leave)];
  return () => { off.forEach((f) => f()); ring.remove(); };
}

/** [data-skew] — blocks lean with scroll velocity (cards, galleries). */
export function velocitySkew(root: HTMLElement) {
  q(root, '[data-skew]').forEach((el) => {
    const amt = Number(el.dataset.skew) || 3;
    const set = gsap.quickTo(el, 'skewY', { duration: 0.6, ease: EASE.out });
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => set(gsap.utils.clamp(-amt, amt, self.getVelocity() / -450)),
      onLeave: () => set(0),
      onLeaveBack: () => set(0),
    });
  });
}

/**
 * [data-ring] — a pinned 3D carousel. Items sit on a cylinder; scrolling spins it so each faces you in turn.
 * Markup: [data-ring] > .ring__stage > [data-ring-rotor] > [data-ring-item]…
 */
export function ring(root: HTMLElement) {
  q(root, '[data-ring]').forEach((section) => {
    const rotor = section.querySelector<HTMLElement>('[data-ring-rotor]');
    const items = q(section, '[data-ring-item]');
    if (!rotor || items.length < 3) return;
    const n = items.length;
    const step = 360 / n;
    const caption = section.querySelector<HTMLElement>('[data-ring-caption]');
    const count = section.querySelector<HTMLElement>('[data-ring-count]');
    section.classList.add('is-3d');
    const layout = () => {
      const w = items[0].offsetWidth;
      const gap = 36;
      const radius = Math.round((w + gap) / 2 / Math.tan(Math.PI / n));
      items.forEach((it, i) => gsap.set(it, { rotationY: i * step, z: radius, transformOrigin: `50% 50% ${-radius}px` }));
      gsap.set(rotor, { z: -radius });
      return radius;
    };
    layout();
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * (n * 0.55)),
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: layout,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (n - 1));
          if (count) count.textContent = String(idx + 1).padStart(2, '0');
          if (caption) caption.textContent = items[idx]?.dataset.caption ?? '';
          items.forEach((it, i) => it.classList.toggle('is-front', i === idx));
        },
      },
    });
    tl.fromTo(rotor, { rotationY: 0, rotationX: -4 }, { rotationY: -(360 - step), rotationX: 4, duration: 1 }, 0);
    tl.fromTo(section.querySelector('.ring__stage'), { scale: 0.84 }, { scale: 1, duration: 0.25, ease: EASE.out }, 0);
  });
}

/** Panels of the horizontal track swing in on the Y axis as they approach the centre. */
export function trackPanels3d(section: HTMLElement, panels: HTMLElement[], containerAnimation: gsap.core.Animation) {
  panels.forEach((p) => {
    gsap.fromTo(
      p,
      { rotationY: 22, scale: 0.92, transformPerspective: 1500, transformOrigin: '0% 50%' },
      { rotationY: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: p, containerAnimation, start: 'left 98%', end: 'left 50%', scrub: true } },
    );
  });
  void section;
  void DUR;
}
