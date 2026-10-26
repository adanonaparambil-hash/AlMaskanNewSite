import Image from 'next/image';
import Link from '@/components/LocaleLink';
import type { CSSProperties } from 'react';
import { ContactBand } from './Footer';
import { Button, Eyebrow, Fact, Heading, Media, PageHero, TextLink } from './ui';
import type { Room } from '@/content/rooms';
import type { Service } from '@/content/services';
import { getContent, roomsFor, servicesFor, type Content } from '@/i18n/server';
import { img } from '@/lib/images';

const audFor = (c: Content, audience: 'individuals' | 'facilities') =>
  audience === 'individuals' ? { label: c.ui.templates.individuals, href: '/individuals' } : { label: c.ui.templates.companies, href: '/facilities' };

const LINE_COLOR: Record<string, string> = {
  retail: 'var(--c-ret)', catering: 'var(--c-cat)', spaces: 'var(--c-spa)', lifestyle: 'var(--c-lif)', business: 'var(--c-ret)', accommodation: 'var(--c-acc)',
};

/** Sibling navigation shared by the audience sub-pages. */
export async function AudienceNav({ audience, current }: { audience: 'individuals' | 'facilities'; current: string }) {
  const c = await getContent();
  const t = c.ui.templates;
  const aud = audFor(c, audience);
  const services = servicesFor(c, audience);
  const links = [
    ...(audience === 'individuals'
      ? [{ label: t.juniorStaff, slug: 'junior-staff' }, { label: t.seniorStaff, slug: 'senior-staff-single-premium', alt: ['senior-staff-double-premium', 'senior-staff-triple-premium'] }]
      : [{ label: t.workers, slug: 'workers' }, { label: t.managers, slug: 'managers-single-premium', alt: ['managers-double-premium', 'managers-triple-premium'] }]),
    ...services.map((s) => ({ label: navLabel(c, s), slug: s.slug })),
  ];
  return (
    <nav aria-label={t.audPages(aud.label)} className="sibling-nav">
      {links.map((l) => (
        <Link key={l.slug} href={`${aud.href}/${l.slug}`} aria-current={current === l.slug || (l as { alt?: string[] }).alt?.includes(current) ? 'page' : undefined}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

function navLabel(c: Content, s: Service) {
  return c.ui.templates.navLabels[s.slug] ?? s.slug;
}

/* ------------------------------------------------------------ Room page */
export async function RoomPage({ room }: { room: Room }) {
  const c = await getContent();
  const t = c.ui.templates;
  const aud = audFor(c, room.audience);
  const same = roomsFor(c, room.audience);
  return (
    <>
      <PageHero
        eyebrow={`${aud.label} · ${t.accommodation}${room.code ? ` · ${room.code}` : ''}`}
        title={<>{room.name}</>}
        lead={room.tagline}
        image={img(room.image)}
        color="var(--c-acc)"
        crumbs={[{ label: c.ui.home, href: '/' }, { label: aud.label, href: aud.href }, { label: room.name }]}
      >
        <div data-reveal="fade" data-delay="0.25"><Button href="/contact-us">{t.roomCta}</Button></div>
      </PageHero>

      <section className="section--tight section" aria-label={t.specs}>
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
            <Eyebrow color="var(--c-acc)">{t.theRoom}</Eyebrow>
            <Heading as="h2" className="display--md" fx="blur">{room.group === 'junior' || room.group === 'workers' ? t.roomTitleShared : t.roomTitlePrivate}</Heading>
            <p className="prose" style={{ marginTop: 24, color: 'var(--muted)' }} data-reveal="fade">{room.intro}</p>
            <h3 className="eyebrow" style={{ marginTop: 48 }}>{t.booking}</h3>
            <ul className="list-rows" data-stagger="0.1">
              {room.booking.map((b) => (
                <li key={b.label} data-stagger-item><b>{b.label}</b><span>{b.text}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow">{t.amenities}</h3>
            <ul className="checks" data-stagger="0.06" style={{ '--c': 'var(--c-acc)' } as CSSProperties}>
              {room.amenities.map((a) => <li key={a} data-stagger-item><span>{a}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {room.gallery.length > 0 && (
        <section className="section--tight section" aria-label={t.roomImages}>
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
            <Eyebrow>{t.rates}</Eyebrow>
            <h2 id="rates-title" className="display display--lg" data-reveal="chars">{t.ratesTitleA} <em>{t.ratesTitleB}</em></h2>
            <p className="prose" style={{ marginTop: 24, color: 'var(--muted)' }} data-reveal="fade">{t.ratesText}</p>
            <div style={{ marginTop: 28 }} data-reveal="fade"><Button href="/contact-us">{t.getInTouch}</Button></div>
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
            <p className="fine">{t.ratesFine}</p>
          </div>
        </div>
      </section>

      <section className="section--tight section" aria-label={t.otherRooms}>
        <div className="container">
          <h2 className="eyebrow">{t.otherRooms}</h2>
          <nav className="sibling-nav" aria-label={t.roomTypes}>
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
export async function ServicePage({ service }: { service: Service }) {
  const c = await getContent();
  const t = c.ui.templates;
  const aud = audFor(c, service.audience);
  const color = LINE_COLOR[service.line] ?? 'var(--bronze)';
  const mark = c.haven.find((h) => h.key === (service.line === 'business' ? 'retail' : service.line));
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lead={service.lead}
        image={img(service.image)}
        color={color}
        fx="blur"
        crumbs={[{ label: c.ui.home, href: '/' }, { label: aud.label, href: aud.href }, { label: navLabel(c, service) }]}
      >
        <div data-reveal="fade" data-delay="0.25"><Button href="/contact-us">{service.cta.label}</Button></div>
      </PageHero>

      {service.stats && (
        <section className="section--tight section" aria-label={t.keyFigures}>
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
        <section className="section--tight section" aria-label={t.gallery}>
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
            <TextLink href={aud.href}>{t.backTo(c.locale === 'en' ? aud.label.toLowerCase() : aud.label)}</TextLink>
          </div>
        </div></div>
      </section>

      <section className="section--tight section" aria-label={t.moreFor(aud.label)}>
        <div className="container">
          <h2 className="eyebrow">{t.moreFor(c.locale === 'en' ? aud.label.toLowerCase() : aud.label)}</h2>
          <AudienceNav audience={service.audience} current={service.slug} />
        </div>
      </section>
      <ContactBand />
    </>
  );
}
