import Image from 'next/image';
import Link from '@/components/LocaleLink';
import type { CSSProperties } from 'react';
import { ContactBand } from './Footer';
import { Button, Eyebrow, Fact, Heading, Media, PageHero, TextLink } from './ui';
import type { Room } from '@/content/rooms';
import type { Service } from '@/content/services';
import { DINING_OUTLETS } from '@/content/village';
import { getContent, servicePages } from '@/i18n/server';
import { img } from '@/lib/images';

const LINE_COLOR: Record<string, string> = {
  retail: 'var(--c-ret)', catering: 'var(--c-cat)', spaces: 'var(--c-spa)', lifestyle: 'var(--c-lif)', business: 'var(--c-ret)', accommodation: 'var(--c-acc)',
};

/**
 * Link to the inquiry form set up for a quote: the form reads these to pick "Quote", the topic and the room, and to
 * start the message with what the visitor asked about.
 */
export function quoteHref(topic: 'Accommodation' | 'Retail' | 'Spaces' | 'Catering' | 'Village', about: string, room?: string) {
  const q = new URLSearchParams({ kind: 'Quote', topic, about });
  if (room) q.set('room', room);
  return `/contact-us?${q.toString()}#inquiry`;
}

/** "Get a quote" panel shared by room, space and retail pages (prices are never shown on the site). */
export async function QuoteBand({ href, id = 'quote-title' }: { href: string; id?: string }) {
  const c = await getContent();
  const t = c.ui.templates;
  return (
    <section className="section section--sand" aria-labelledby={id}>
      <div className="container cols-2" style={{ alignItems: 'center' }}>
        <div>
          <Eyebrow>{t.quoteEyebrow}</Eyebrow>
          <h2 id={id} className="display display--lg" data-reveal="chars">{t.quoteTitleA} <em>{t.quoteTitleB}</em></h2>
        </div>
        <div style={{ display: 'grid', gap: 22, justifyItems: 'start' }} data-reveal="fade">
          <p className="prose" style={{ color: 'var(--muted)' }}>{t.quoteText(c.site.responseTime)}</p>
          <Button href={href}>{t.quote}</Button>
          <p className="fine" style={{ margin: 0 }}>{t.quoteFine}</p>
        </div>
      </div>
    </section>
  );
}

/** A seal-style badge for the village's HACCP food-safety certification (no expiry date is shown). */
export async function HaccpBadge({ compact }: { compact?: boolean }) {
  const { ui } = await getContent();
  return (
    <div className={`haccp${compact ? ' haccp--compact' : ''}`} data-reveal="fade">
      <span className="haccp__seal" aria-hidden="true">
        <svg viewBox="0 0 48 48" width="48" height="48" fill="none"><path d="M24 4l5 3.6 6.1-.3 1.9 5.8 5 3.6-1.9 5.8 1.9 5.8-5 3.6-1.9 5.8-6.1-.3L24 44l-5-3.6-6.1.3-1.9-5.8-5-3.6 1.9-5.8-1.9-5.8 5-3.6 1.9-5.8 6.1.3z" stroke="currentColor" strokeWidth="1.4" /><path d="M16.5 24.5l5 5 10-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <span className="haccp__text"><b>{ui.templates.haccp}</b><span>{ui.templates.haccpText}</span></span>
    </div>
  );
}

/** The village's dining outlets by name, with the HACCP badge (Catering page). */
async function DiningOutlets() {
  const c = await getContent();
  const L = c.locale;
  return (
    <section className="section" aria-labelledby="dining-title">
      <div className="container">
        <div className="cols-2" style={{ alignItems: 'end', marginBottom: 'clamp(28px, 4vw, 56px)' }}>
          <div>
            <Eyebrow color="var(--c-cat)">{L === 'ar' ? 'منافذ الطعام' : 'Where to eat'}</Eyebrow>
            <h2 id="dining-title" className="display display--lg" data-reveal="chars">{L === 'ar' ? <>ثلاثة منافذ، <em>معيار واحد</em></> : <>Three outlets, <em>one standard</em></>}</h2>
          </div>
          <HaccpBadge />
        </div>
        <ul className="outlets" data-stagger="0.1">
          {DINING_OUTLETS.map((o) => (
            <li key={o.name.en} className="outlets__item glass" data-stagger-item>
              <span className="outlets__kind">{o.kind[L]}</span>
              <h3>{o.name[L]}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Links between the village service pages. */
export async function ServicesNav({ current }: { current: string }) {
  const c = await getContent();
  const t = c.ui.templates;
  return (
    <nav aria-label={t.moreServices} className="sibling-nav">
      {servicePages(c).map((s) => (
        <Link key={s.slug} href={`/facilities/${s.slug}`} aria-current={current === s.slug ? 'page' : undefined}>{t.navLabels[s.slug] ?? s.slug}</Link>
      ))}
      <Link href="/rooms">{t.rooms}</Link>
      <Link href="/retail-spaces">{t.retailSpaces}</Link>
    </nav>
  );
}

/* ------------------------------------------------------------ Room page */
export async function RoomPage({ room }: { room: Room }) {
  const c = await getContent();
  const t = c.ui.templates;
  const quote = quoteHref('Accommodation', room.name, room.quote);
  return (
    <>
      <PageHero
        eyebrow={`${t.rooms} · ${room.forWho}${room.code ? ` · ${room.code}` : ''}`}
        title={<>{room.name}</>}
        lead={room.tagline}
        image={img(room.image)}
        color="var(--c-acc)"
        crumbs={[{ label: c.ui.home, href: '/' }, { label: t.rooms, href: '/rooms' }, { label: room.name }]}
      >
        <div data-reveal="fade" data-delay="0.25"><Button href={quote}>{t.quote}</Button></div>
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
            <Heading as="h2" className="display--md" fx="blur">{room.group === 'shared' ? t.roomTitleShared : t.roomTitlePrivate}</Heading>
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
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {room.gallery.map((k, i) => (
              <div key={k} data-rise3d="16" data-tilt="5" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k={k} ratio="4 / 3" sizes="(min-width: 900px) 33vw, 100vw" reveal={i % 2 ? 'right' : true} /></div>
            ))}
          </div>
        </section>
      )}

      <QuoteBand href={quote} />

      <section className="section--tight section" aria-label={t.otherRooms}>
        <div className="container">
          <h2 className="eyebrow">{t.otherRooms}</h2>
          <nav className="sibling-nav" aria-label={t.roomTypes}>
            {c.rooms.map((r) => (
              <Link key={r.slug} href={`/rooms/${r.slug}`} aria-current={r.slug === room.slug ? 'page' : undefined}>{r.name}</Link>
            ))}
            <Link href="/rooms">{t.allRooms}</Link>
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
  const color = LINE_COLOR[service.line] ?? 'var(--bronze)';
  const mark = c.haven.find((h) => h.key === service.line);
  const label = t.navLabels[service.slug] ?? service.title;
  // spaces are hired, so their page asks for a quote; catering and lifestyle keep a plain inquiry
  const cta = service.slug === 'spaces' ? { href: quoteHref('Spaces', label), label: t.quote } : { href: '/contact-us', label: service.cta.label };
  return (
    <>
      <PageHero
        eyebrow={service.eyebrow}
        title={service.title}
        lead={service.lead}
        image={img(service.image)}
        color={color}
        fx="blur"
        crumbs={[{ label: c.ui.home, href: '/' }, { label: t.services }, { label }]}
      >
        <div data-reveal="fade" data-delay="0.25" style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button href={cta.href}>{cta.label}</Button>
          {service.slug === 'catering' && <HaccpBadge compact />}
        </div>
      </PageHero>

      {service.stats && (
        <section className="section--tight section" aria-label={t.keyFigures}>
          <div className="container">
            <div className="facts" style={{ gridTemplateColumns: `repeat(${service.stats.length}, minmax(0, 1fr))` }} data-stagger="0.1">
              {service.stats.map((s) => <Fact key={s.label} {...s} />)}
            </div>
          </div>
        </section>
      )}

      {service.slug === 'catering' && <DiningOutlets />}

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

      {service.slug === 'spaces' ? (
        <QuoteBand href={cta.href} />
      ) : (
        <section className="section section--paper" aria-labelledby="cta-title">
          <div className="container"><div className="grid-12 glass sheen" data-glow style={{ alignItems: 'center', padding: 'clamp(28px, 4vw, 64px)' }}>
            <div style={{ gridColumn: '1 / span 7' }}>
              {mark && <Image src={mark.mark} alt="" width={56} height={56} style={{ marginBottom: 24 }} />}
              <h2 id="cta-title" className="display display--lg" data-reveal="scale">{service.cta.title}</h2>
              <p className="prose" style={{ marginTop: 20, color: 'var(--muted)' }} data-reveal="fade">{service.cta.text}</p>
            </div>
            <div style={{ gridColumn: '9 / span 4', display: 'grid', gap: 18, justifyItems: 'start' }} data-reveal="fade">
              <Button href={cta.href}>{cta.label}</Button>
              <TextLink href="/rooms">{t.seeRooms}</TextLink>
            </div>
          </div></div>
        </section>
      )}

      <section className="section--tight section" aria-label={t.moreServices}>
        <div className="container">
          <h2 className="eyebrow">{t.moreServices}</h2>
          <ServicesNav current={service.slug} />
        </div>
      </section>
      <ContactBand />
    </>
  );
}

