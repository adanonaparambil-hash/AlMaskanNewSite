'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { lockScroll } from '@/lib/motion/smooth';

type Item = { src: string; w: number; h: number; alt: string; cat: string };
const LABELS: Record<string, string> = {
  all: 'All',
  village: 'Al Maskaan Village',
  accommodation: 'Accommodation',
  catering: 'Catering',
  retail: 'Retail',
  spaces: 'Spaces',
  lifestyle: 'Lifestyle',
};

export default function GalleryView({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const shown = filter === 'all' ? items : items.filter((i) => i.cat === filter);
  const cats = ['all', ...Array.from(new Set(items.map((i) => i.cat)))];

  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [shown.length]);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);

  useEffect(() => {
    if (open === null) return;
    closeBtn.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); document.documentElement.style.overflow = ''; lockScroll(false); };
  }, [open, close, step]);

  const cur = open !== null ? shown[open] : null;

  return (
    <>
      <div className="filters" role="group" aria-label="Filter gallery">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {LABELS[c] ?? c}
          </button>
        ))}
      </div>
      <ul className="masonry">
        {shown.map((it, i) => (
          <li key={it.src}>
            <button
              type="button"
              data-cat={LABELS[it.cat]}
              aria-label={`Open image: ${it.alt}`}
              onClick={(e) => { opener.current = e.currentTarget; setOpen(i); }}
            >
              <Image src={it.src} alt={it.alt} width={it.w} height={it.h} sizes="(min-width: 1000px) 33vw, (min-width: 640px) 50vw, 100vw" loading={i < 6 ? 'eager' : 'lazy'} quality={70} />
            </button>
          </li>
        ))}
      </ul>

      {cur && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={(e) => e.target === e.currentTarget && close()}>
          <button ref={closeBtn} type="button" className="lightbox__btn lightbox__btn--close" onClick={close} aria-label="Close image viewer">✕</button>
          <button type="button" className="lightbox__btn lightbox__btn--prev" onClick={() => step(-1)} aria-label="Previous image">←</button>
          <figure>
            <Image src={cur.src} alt={cur.alt} width={cur.w} height={cur.h} sizes="90vw" quality={82} priority />
            <figcaption>{cur.alt} · {open! + 1} / {shown.length}</figcaption>
          </figure>
          <button type="button" className="lightbox__btn lightbox__btn--next" onClick={() => step(1)} aria-label="Next image">→</button>
        </div>
      )}
    </>
  );
}
