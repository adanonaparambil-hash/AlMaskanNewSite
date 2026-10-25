import Image from 'next/image';
import { SITE } from '@/content/site';
import type { Img } from '@/lib/images';
import { Eyebrow } from './ui';

/** Endless type band. Content is rendered twice so a -50% shift loops seamlessly. */
export function Marquee({ items, speed = 1, outline }: { items: string[]; speed?: number; outline?: boolean }) {
  const row = (k: string) => (
    <div className="marquee__row" aria-hidden={k === 'b' ? true : undefined} key={k}>
      {items.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <i className="marquee__dot" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee${outline ? ' marquee--outline' : ''}`} data-marquee={speed} role="presentation">
      <p className="sr-only">{items.join(', ')}</p>
      <div className="marquee__track" data-marquee-track aria-hidden="true">
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}

/** Pinned 3D carousel (desktop). Below 1024px it becomes a native scroll-snap row. The wrapper keeps React the owner of the pin-spacer's parent. */
export function RingGallery({ items, title }: { items: (Img & { caption: string })[]; title: string }) {
  return (
    <div>
    <section className="ring" data-ring aria-label={title}>
      <div className="ring__head container">
        <div>
          <Eyebrow>Inside the village</Eyebrow>
          <h2 className="display display--lg" data-reveal="lines">Walk around <em>the village</em></h2>
        </div>
        <p className="ring__meta" aria-hidden="true"><span data-ring-count>01</span> / {String(items.length).padStart(2, '0')} <span className="ring__cap" data-ring-caption>{items[0].caption}</span></p>
      </div>
      <div className="ring__stage">
        <ul className="ring__rotor" data-ring-rotor>
          {items.map((it, i) => (
            <li key={it.src} className="ring__item" data-ring-item data-caption={it.caption}>
              <Image src={it.src} alt={it.alt} fill sizes="(min-width: 1024px) 34vw, 80vw" quality={75} loading={i < 2 ? 'eager' : 'lazy'} style={{ objectFit: 'cover' }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
    </div>
  );
}

/** Night-sky backdrop: drifting brand-coloured light + film grain. Purely decorative, fixed behind the page. */
export function Ambient() {
  return (
    <>
      <div className="ambient" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="grain" aria-hidden="true" />
      <div className="progress" data-progress aria-hidden="true" />
    </>
  );
}

export function WhatsAppButton() {
  return (
    <a className="wa" href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" data-cursor="Chat">
      <svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" fill="currentColor">
        <path d="M16.04 3C9.4 3 4 8.38 4 15.02c0 2.12.56 4.19 1.62 6.01L4 29l8.14-1.58a12.03 12.03 0 0 0 3.9.65C22.68 28.07 28 22.69 28 16.05 28 9.4 22.68 3 16.04 3Zm0 22.03c-1.2 0-2.38-.24-3.48-.7l-.5-.2-4.83.94.99-4.7-.22-.5a9.94 9.94 0 0 1-1.53-5.3c0-5.5 4.5-9.97 10.04-9.97 5.54 0 10.04 4.47 10.04 9.97 0 5.5-4.5 9.96-10.04 9.96Zm5.52-7.46c-.3-.15-1.8-.89-2.08-.99-.28-.1-.48-.15-.68.15-.2.3-.78.99-.96 1.19-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.25-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.23 5.13 4.53.72.3 1.28.5 1.71.63.72.23 1.37.2 1.89.12.58-.09 1.8-.73 2.05-1.44.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z" />
      </svg>
    </a>
  );
}
