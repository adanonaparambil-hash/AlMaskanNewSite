import Link from '@/components/LocaleLink';
import type { ReactNode } from 'react';
import { ContactBand } from './Footer';
import { QuoteBand, quoteHref } from './pages';
import { Arrow, Button, Eyebrow, Heading, Media, PageHero } from './ui';
import { img } from '@/lib/images';
import { getContent } from '@/i18n/server';

export type Card = { href: string; title: string; text: string; image: string; tag?: string };

async function OverviewCard({ c }: { c: Card }) {
  const { ui } = await getContent();
  return (
    <article className="card" data-stagger-item data-tilt="4" data-cursor={ui.cursor.explore}>
      <Media k={c.image} ratio="4 / 3" sizes="(min-width: 960px) 30vw, (min-width: 620px) 45vw, 100vw" />
      <div style={{ display: 'grid', gap: 12 }}>
        {c.tag && <span className="card__date">{c.tag}</span>}
        <h3>{c.title}</h3>
        <p>{c.text}</p>
        <span className="more">{ui.card.explore} <Arrow /></span>
      </div>
      <Link className="card__link" href={c.href} aria-label={ui.card.exploreAria(c.title)} />
    </article>
  );
}

/** /rooms — every room type for companies and individuals alike, then the rest of the village. */
export async function RoomsOverview({
  title, lead, introEyebrow, introTitle, introBody, services,
}: {
  title: ReactNode; lead: string;
  introEyebrow: string; introTitle: ReactNode; introBody: string[];
  services: Card[];
}) {
  const c = await getContent();
  const t = c.ui.templates;
  const rooms: Card[] = c.rooms.map((r) => ({ href: `/rooms/${r.slug}`, title: r.name, tag: `${r.forWho}${r.code ? ` · ${r.code}` : ''}`, text: r.tagline, image: r.image }));
  const quote = quoteHref('Accommodation', t.rooms);
  return (
    <>
      <PageHero fx="scale" glow="var(--glow-blue)" eyebrow={t.rooms} title={title} lead={lead} image={img('life.garden')} crumbs={[{ label: c.ui.home, href: '/' }, { label: t.rooms }]}>
        <div data-reveal="fade" data-delay="0.25" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Button href={quote}>{t.quote}</Button>
          <Button href="#room-types" variant="line">{t.seeRooms}</Button>
        </div>
      </PageHero>

      <section className="section--tight section" aria-labelledby="ov-intro">
        <div className="container cols-2">
          <div>
            <Eyebrow>{introEyebrow}</Eyebrow>
            <Heading as="h2" className="display--lg" fx="chars" id="ov-intro">{introTitle}</Heading>
          </div>
          <div className="prose" data-reveal="fade">
            {introBody.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section id="room-types" className="section section--sand" aria-labelledby="ov-acc">
        <div className="container">
          <Eyebrow color="var(--c-acc)">{t.accEyebrow}</Eyebrow>
          <Heading as="h2" className="display--lg" id="ov-acc">{t.accTitleA} <em>{t.accTitleB}</em></Heading>
          <div className="cards cards--four" data-stagger="0.1" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
            {rooms.map((r) => <OverviewCard key={r.href} c={r} />)}
          </div>
        </div>
      </section>

      <QuoteBand href={quote} />

      <section className="section" aria-labelledby="ov-more">
        <div className="container">
          <Eyebrow>{t.restEyebrow}</Eyebrow>
          <Heading as="h2" className="display--lg" fx="blur" id="ov-more">{t.restTitleA} <em>{t.restTitleB}</em> {t.restTitleC}</Heading>
          <div className="cards" data-stagger="0.1" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
            {services.map((s) => <OverviewCard key={s.href} c={s} />)}
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
