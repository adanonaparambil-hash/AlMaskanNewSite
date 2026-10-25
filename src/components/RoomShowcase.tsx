import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { Img } from '@/lib/images';
import { Arrow, Media } from './ui';

export type ShowcaseRow = { href: string; code?: string; name: string; text: string; specs: string[]; image: Img };

/**
 * Accommodation as a stack of sticky glass cards: each room slides up over the previous one, which sinks back
 * (the depth is added by the motion library's [data-stack]; without it the cards simply stack while scrolling).
 */
export default function RoomShowcase({ rows }: { rows: ShowcaseRow[] }) {
  return (
    <ol className="stack" data-stack>
      {rows.map((r, i) => (
        <li key={r.href} className="stack__card glass" data-stack-card style={{ '--i': i } as CSSProperties}>
          <Media image={r.image} sizes="(min-width: 860px) 55vw, 100vw" />
          <div className="stack__body">
            <div className="stack__top">
              <span className="stack__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="stack__code">{r.code ? `Senior staff · ${r.code}` : 'Shared accommodation'}</span>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </div>
            <div style={{ display: 'grid', gap: 22 }}>
              <p className="stack__specs">{r.specs.map((s) => <span key={s}>{s}</span>)}</p>
              <span className="tlink" aria-hidden="true"><span>View room &amp; rates</span><Arrow /></span>
            </div>
          </div>
          <Link className="stack__link" href={r.href} aria-label={`${r.name} — view details and rates`} data-cursor="View" />
        </li>
      ))}
    </ol>
  );
}
