import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode, CSSProperties } from 'react';
import { img, type Img } from '@/lib/images';

export const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

/* ------------------------------------------------------------------ Media */
type MediaProps = {
  k?: string;
  image?: Img;
  alt?: string;
  ratio?: string; // CSS aspect-ratio, e.g. "4 / 5"
  sizes: string;
  priority?: boolean;
  reveal?: boolean | 'left' | 'right';
  parallax?: number | false;
  className?: string;
  style?: CSSProperties;
  fit?: 'cover' | 'contain';
  position?: string;
  quality?: number;
  expandFrame?: boolean;
  dataHero?: string;
  curtain?: boolean;
  circle?: boolean;
};

/** Layout-stable image frame. `reveal` adds the mask wipe, `curtain` parts two leaves over it, `parallax` over-sizes the inner layer. */
export function Media({ k, image, alt, ratio, sizes, priority, reveal, parallax, className, style, fit = 'cover', position, quality = 75, expandFrame, dataHero, curtain, circle }: MediaProps) {
  const i = image ?? (k ? img(k) : null);
  if (!i) return null;
  return (
    <div
      className={cx('media', parallax ? 'media--px' : false, className)}
      style={{ aspectRatio: ratio, ...style }}
      data-reveal={reveal ? 'mask' : undefined}
      data-dir={typeof reveal === 'string' ? reveal : undefined}
      data-expand-frame={expandFrame ? '' : undefined}
      data-curtain={curtain ? '' : undefined}
      data-circle-media={circle ? '' : undefined}
      data-hero={dataHero}
    >
      <div className="media__inner" data-parallax={parallax || undefined}>
        <Image
          src={i.src}
          alt={alt ?? i.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          style={{ objectFit: fit, objectPosition: position }}
        />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Arrow */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={cx('arrow', className)} width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
      <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

/* --------------------------------------------------------------- Buttons */
type BtnProps = { href: string; children: ReactNode; variant?: 'solid' | 'line' | 'light'; className?: string; external?: boolean; dataHero?: string; onClick?: () => void };

export function Button({ href, children, variant = 'solid', className, external, dataHero, onClick }: BtnProps) {
  const cls = cx('btn', `btn--${variant}`, className);
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <Arrow />
    </>
  );
  if (external || /^(tel:|mailto:|https?:)/.test(href)) {
    return (
      <a className={cls} href={href} data-hero={dataHero} data-magnetic="" {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link className={cls} href={href} data-hero={dataHero} data-magnetic="" onClick={onClick}>
      {inner}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={cx('tlink', className)} href={href}>
      <span>{children}</span>
      <Arrow />
    </Link>
  );
}

/* ------------------------------------------------------------- Headings */
/** Plain-text eyebrows decode from random glyphs as they enter (the motion library's data-scramble); screen readers get the real text. */
export function Eyebrow({ children, color, className }: { children: ReactNode; color?: string; className?: string }) {
  const plain = typeof children === 'string';
  return (
    <p className={cx('eyebrow', className)} style={color ? ({ '--c': color } as CSSProperties) : undefined} data-scramble={plain ? '' : undefined}>
      {plain ? <><span className="sr-only">{children}</span><span data-scramble-text aria-hidden="true">{children}</span></> : children}
    </p>
  );
}

/** How a heading enters: masked lines (default), letters, words from blur, or settling from oversize. */
export type HeadingFx = 'lines' | 'chars' | 'blur' | 'scale';

export function Heading({ as: Tag = 'h2', children, className, reveal = true, fx = 'lines', id }: { as?: 'h1' | 'h2' | 'h3'; children: ReactNode; className?: string; reveal?: boolean; fx?: HeadingFx; id?: string }) {
  return (
    <Tag id={id} className={cx('display', className)} data-reveal={reveal ? fx : undefined}>
      {children}
    </Tag>
  );
}

/* ----------------------------------------------------------- Page hero */
/** Inner-page hero. `fx` picks the title's entrance so neighbouring pages don't all open the same way; `glow` tints the light behind it. */
export function PageHero({
  eyebrow, title, lead, image, crumbs, color, children, fx = 'chars', glow,
}: {
  eyebrow: string; title: ReactNode; lead?: string; image?: Img; crumbs?: { label: string; href?: string }[]; color?: string; children?: ReactNode; fx?: HeadingFx; glow?: string;
}) {
  return (
    <header className="phero" style={glow || color ? ({ '--phero-c': glow ?? color } as CSSProperties) : undefined}>
      <div className="container phero__grid">
        <div className="phero__copy">
          {crumbs && (
            <nav aria-label="Breadcrumb" className="crumbs">
              <ol>
                {crumbs.map((c, i) => (
                  <li key={c.label}>{c.href && i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</li>
                ))}
              </ol>
            </nav>
          )}
          <Eyebrow color={color}>{eyebrow}</Eyebrow>
          <h1 className="display display--xl" data-reveal={fx}>{title}</h1>
          {lead && <p className="lead" data-reveal="fade" data-delay="0.15">{lead}</p>}
          {children}
        </div>
        {image && (
          <div className="phero__media" data-tilt="6" data-cursor="Explore" style={{ position: 'relative', borderRadius: 'var(--radius)' }}>
            <Media image={image} sizes="(min-width: 1024px) 46vw, 100vw" ratio="4 / 5" reveal={fx === 'blur' ? undefined : 'left'} curtain={fx === 'blur'} parallax={0.06} priority />
          </div>
        )}
      </div>
    </header>
  );
}

/* --------------------------------------------------------------- Facts */
export function Fact({ value, suffix, unit, label }: { value: number; suffix?: string; unit?: string; label: string }) {
  return (
    <div className="fact" data-stagger-item>
      <p className="fact__num">
        <span data-counter={value}>{value.toLocaleString('en-US')}</span>
        {suffix && <span className="fact__suffix">{suffix}</span>}
        {unit && <span className="fact__unit"> {unit}</span>}
      </p>
      <p className="fact__label">{label}</p>
    </div>
  );
}
