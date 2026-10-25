import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ContactBand } from './Footer';
import { Button, Eyebrow, Fact, Heading, Media, PageHero, TextLink } from './ui';
import type { Room } from '@/content/rooms';
import { roomsFor } from '@/content/rooms';
import type { Service } from '@/content/services';
import { servicesFor } from '@/content/services';
import { HAVEN } from '@/content/site';
import { img } from '@/lib/images';

const AUD = {
  individuals: { label: 'Individuals', href: '/individuals' },
  facilities: { label: 'Companies', href: '/facilities' },
} as const;

const LINE_COLOR: Record<string, string> = {
  retail: 'var(--c-ret)', catering: 'var(--c-cat)', spaces: 'var(--c-spa)', lifestyle: 'var(--c-lif)', business: 'var(--c-ret)', accommodation: 'var(--c-acc)',
};

/** Sibling navigation shared by the audience sub-pages. */
export function AudienceNav({ audience, current }: { audience: 'individuals' | 'facilities'; current: string }) {
  const services = servicesFor(audience);
  const links = [
    ...(audience === 'individuals'
      ? [{ label: 'Junior staff', slug: 'junior-staff' }, { label: 'Senior staff', slug: 'senior-staff-single-premium', alt: ['senior-staff-double-premium', 'senior-staff-triple-premium'] }]
      : [{ label: 'Workers', slug: 'workers' }, { label: 'Managers', slug: 'managers-single-premium', alt: ['managers-double-premium', 'managers-triple-premium'] }]),
    ...services.map((s) => ({ label: navLabel(s), slug: s.slug })),
  ];
  return (
    <nav aria-label={`${AUD[audience].label} pages`} className="sibling-nav">
      {links.map((l) => (
        <Link key={l.slug} href={`${AUD[audience].href}/${l.slug}`} aria-current={current === l.slug || (l as { alt?: string[] }).alt?.includes(current) ? 'page' : undefined}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

function navLabel(s: Service) {
  const map: Record<string, string> = {
    'retail-opportunities': 'Retail', 'business-opportunities': 'Business opportunities', catering: 'Catering', spaces: 'Spaces', lifestyle: 'Lifestyle',
    residents: 'Residents', 'business-owners': 'Business owners', 'individuals-catering': 'Catering', 'individuals-spaces': 'Spaces', 'individuals-lifestyle': 'Lifestyle',
  };
  return map[s.slug] ?? s.slug;
}

/* ------------------------------------------------------------ Room page */
export function RoomPage({ room }: { room: Room }) {
  const aud = AUD[room.audience];
  const same = roomsFor(room.audience);
  return (
    <>
      <PageHero
        eyebrow={`${aud.label} · Accommodation${room.code ? ` · ${room.code}` : ''}`}
        title={<>{room.name}</>}
        lead={room.tagline}
        image={img(room.image)}
        color="var(--c-acc)"
        crumbs={[{ label: 'Home', href: '/' }, { label: aud.label, href: aud.href }, { label: room.name }]}
      >
        <div data-reveal="fade" data-delay="0.25"><Button href="/contact-us">Enquire about this room</Button></div>
      </PageHero>

      <section className="section--tight section" aria-label="Room specifications">
        <div className="container">
          <dl className="specs-grid" data-stagger="0.08">
            {room.specs.map((s) => (
              <div key={s.label} data-stagger-item><dt>{s.label}</dt><dd>{s.value}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section--tight section">
        <div className="container cols-2">
          <div>
            <Eyebrow color="var(--c-acc)">The room</Eyebrow>
            <Heading as="h2" className="display--md" fx="blur">{room.group === 'junior' || room.group === 'workers' ? 'Simple, clean and fully looked after' : 'Comfort after working hours'}</Heading>
            <p className="prose" style={{ marginTop: 24, color: 'var(--muted)' }} data-reveal="fade">{room.intro}</p>
            <h3 className="eyebrow" style={{ marginTop: 48 }}>Booking options</h3>
            <ul className="list-rows" data-stagger="0.1">
              {room.booking.map((b) => (
                <li key={b.label} data-stagger-item><b>{b.label}</b><span>{b.text}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow">Room amenities</h3>
            <ul className="checks" data-stagger="0.06" style={{ '--c': 'var(--c-acc)' } as CSSProperties}>
              {room.amenities.map((a) => <li key={a} data-stagger-item><span>{a}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {room.gallery.length > 0 && (
        <section className="section--tight section" aria-label="Room images">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.max(2, Math.min(room.gallery.length, 3))}, 1fr)`, gap: 20 }}>
            {room.gallery.map((k, i) => (
              <div key={k} data-rise3d="16" data-tilt="5" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k={k} ratio="4 / 3" sizes="(min-width: 900px) 33vw, 100vw" reveal={i % 2 ? 'right' : true} /></div>
            ))}
          </div>
        </section>
      )}

      <section className="section section--sand" aria-labelledby="rates-title">
        <div className="container cols-2">
          <div>
            <Eyebrow>Booking rates</Eyebrow>
            <h2 id="rates-title" className="display display--lg" data-reveal="chars">Everything in <em>one package</em></h2>
            <p className="prose" style={{ marginTop: 24, color: 'var(--muted)' }} data-reveal="fade">Why wait? Reach out to us now and secure your preferred room booking immediately.</p>
            <div style={{ marginTop: 28 }} data-reveal="fade"><Button href="/contact-us">Get in touch</Button></div>
          </div>
          <div data-reveal="fade">
            <div className="rates">
              {room.rates.map((r) => (
                <div className="rates__row" key={r.label}>
                  <span>{r.label}</span><b>{r.value}</b>{r.note && <small>{r.note}</small>}
                </div>
              ))}
              <div className="rates__row rates__row--total">
                <span>{room.total.label}</span><b>{room.total.value}</b><small>{room.total.note}</small>
              </div>
            </div>
            {room.rateNote && <p className="fine">{room.rateNote}</p>}
            <p className="fine">Rates are as published by Al Maskaan Village and are subject to confirmation — please contact us for the current offer.</p>
          </div>
        </div>
      </section>

      <section className="section--tight section" aria-label="Other accommodation">
        <div className="container">
          <h2 className="eyebrow">Other accommodation</h2>
          <nav className="sibling-nav" aria-label="Accommodation types">
            {same.map((r) => (
              <Link key={r.slug} href={`${aud.href}/${r.slug}`} aria-current={r.slug === room.slug ? 'page' : undefined}>{r.name}</Link>
            ))}
          </nav>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

/* --------------------------------------------------------- Service page */
export function ServicePage({ service }: { service: Service }) {
  const aud = AUD[service.audience];
  const color = LINE_COLOR[service.line] ?? 'var(--bronze)';
  const mark = HAVEN.find((h) => h.key === (service.line === 'business' ? 'retail' : service.line));
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lead={service.lead}
        image={img(service.image)}
        color={color}
        fx="blur"
        crumbs={[{ label: 'Home', href: '/' }, { label: aud.label, href: aud.href }, { label: navLabel(service) }]}
      >
        <div data-reveal="fade" data-delay="0.25"><Button href="/contact-us">{service.cta.label}</Button></div>
      </PageHero>

      {service.stats && (
        <section className="section--tight section" aria-label="Key figures">
          <div className="container">
            <div className="facts" style={{ gridTemplateColumns: `repeat(${service.stats.length}, 1fr)` }} data-stagger="0.1">
              {service.stats.map((s) => <Fact key={s.label} {...s} />)}
            </div>
          </div>
        </section>
      )}

      {service.sections.map((sec, i) => (
        <section key={sec.title} className={i % 2 ? 'section section--sand' : 'section'}>
          <div className="container cols-2">
            <div>
              <Eyebrow color={color}>{String(i + 1).padStart(2, '0')}</Eyebrow>
              <Heading as="h2" className="display--md" fx={i % 2 ? 'blur' : 'chars'}>{sec.title}</Heading>
              {sec.paragraphs?.map((p) => <p key={p} className="prose" style={{ marginTop: 20, color: 'var(--muted)' }} data-reveal="fade">{p}</p>)}
            </div>
            <div>
              {sec.items && (
                <ul className="checks" data-stagger="0.08" style={{ '--c': color } as CSSProperties}>
                  {sec.items.map((it) => (
                    <li key={it.text} data-stagger-item><span>{it.label && <b>{it.label}</b>}<span>{it.text}</span></span></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}

      {service.gallery.length > 0 && (
        <section className="section--tight section" aria-label="Gallery">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {service.gallery.slice(0, 3).map((k, i) => (
              <div key={k} data-rise3d="16" data-tilt="5" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k={k} ratio="4 / 3" sizes="(min-width: 900px) 33vw, 100vw" reveal={i % 2 ? 'right' : true} parallax={0.05} /></div>
            ))}
          </div>
        </section>
      )}

      <section className="section section--paper" aria-labelledby="cta-title">
        <div className="container"><div className="grid-12 glass sheen" data-glow style={{ alignItems: 'center', padding: 'clamp(28px, 4vw, 64px)' }}>
          <div style={{ gridColumn: '1 / span 7' }}>
            {mark && <Image src={mark.mark} alt="" width={56} height={56} style={{ marginBottom: 24 }} />}
            <h2 id="cta-title" className="display display--lg" data-reveal="scale">{service.cta.title}</h2>
            <p className="prose" style={{ marginTop: 20, color: 'var(--muted)' }} data-reveal="fade">{service.cta.text}</p>
          </div>
          <div style={{ gridColumn: '9 / span 4', display: 'grid', gap: 18, justifyItems: 'start' }} data-reveal="fade">
            <Button href="/contact-us">{service.cta.label}</Button>
            <TextLink href={aud.href}>Back to {aud.label.toLowerCase()}</TextLink>
          </div>
        </div></div>
      </section>

      <section className="section--tight section" aria-label="More services">
        <div className="container">
          <h2 className="eyebrow">More for {aud.label.toLowerCase()}</h2>
          <AudienceNav audience={service.audience} current={service.slug} />
        </div>
      </section>
      <ContactBand />
    </>
  );
}
