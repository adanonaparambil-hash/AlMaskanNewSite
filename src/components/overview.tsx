import Link from '@/components/LocaleLink';
import type { ReactNode } from 'react';
import { ContactBand } from './Footer';
import { Arrow, Button, Eyebrow, Heading, Media, PageHero } from './ui';
import { img } from '@/lib/images';
import { getContent } from '@/i18n/server';

type Card = { href: string; title: string; text: string; image: string; tag?: string };

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

/** Shared layout for /facilities (companies) and /individuals. */
export async function Overview({
  audience, title, lead, heroImage, introTitle, introBody, rooms, services,
}: {
  audience: 'individuals' | 'facilities';
  title: ReactNode; lead: string; heroImage: string;
  introTitle: ReactNode; introBody: string[];
  rooms: Card[]; services: Card[];
}) {
  const { ui } = await getContent();
  const t = ui.templates;
  const aud = { label: audience === 'facilities' ? t.companies : t.individuals };
  return (
    <>
      <PageHero fx="scale" glow={audience === 'facilities' ? 'var(--glow-violet)' : 'var(--glow-blue)'} eyebrow={aud.label} title={title} lead={lead} image={img(heroImage)} crumbs={[{ label: ui.home, href: '/' }, { label: aud.label }]}>
        <div data-reveal="fade" data-delay="0.25" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Button href="/contact-us">{t.getInTouch}</Button>
          <Button href="#accommodation" variant="line">{t.seeAccommodation}</Button>
        </div>
      </PageHero>

      <section className="section--tight section" aria-labelledby="ov-intro">
        <div className="container cols-2">
          <div>
            <Eyebrow>{audience === 'facilities' ? t.completeSolution : t.secure}</Eyebrow>
            <Heading as="h2" className="display--lg" fx="chars" id="ov-intro">{introTitle}</Heading>
          </div>
          <div className="prose" data-reveal="fade">
            {introBody.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section id="accommodation" className="section section--sand" aria-labelledby="ov-acc">
        <div className="container">
          <Eyebrow color="var(--c-acc)">{t.accEyebrow}</Eyebrow>
          <Heading as="h2" className="display--lg" id="ov-acc">{t.accTitleA} <em>{t.accTitleB}</em></Heading>
          <div className="cards cards--four" data-stagger="0.1" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
            {rooms.map((c) => <OverviewCard key={c.href} c={c} />)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ov-more">
        <div className="container">
          <Eyebrow>{t.restEyebrow}</Eyebrow>
          <Heading as="h2" className="display--lg" fx="blur" id="ov-more">{t.restTitleA} <em>{t.restTitleB}</em> {t.restTitleC}</Heading>
          <div className="cards" data-stagger="0.1" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
            {services.map((c) => <OverviewCard key={c.href} c={c} />)}
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
