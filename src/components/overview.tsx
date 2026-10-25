import Link from 'next/link';
import type { ReactNode } from 'react';
import { ContactBand } from './Footer';
import { Arrow, Button, Eyebrow, Heading, Media, PageHero } from './ui';
import { img } from '@/lib/images';

type Card = { href: string; title: string; text: string; image: string; tag?: string };

const AUD = {
  individuals: { label: 'Individuals' },
  facilities: { label: 'Companies' },
} as const;

function OverviewCard({ c }: { c: Card }) {
  return (
    <article className="card" data-stagger-item data-tilt="4" data-cursor="Explore">
      <Media k={c.image} ratio="4 / 3" sizes="(min-width: 960px) 30vw, (min-width: 620px) 45vw, 100vw" />
      <div style={{ display: 'grid', gap: 12 }}>
        {c.tag && <span className="card__date">{c.tag}</span>}
        <h3>{c.title}</h3>
        <p>{c.text}</p>
        <span className="more">Explore <Arrow /></span>
      </div>
      <Link className="card__link" href={c.href} aria-label={`${c.title} — explore`} />
    </article>
  );
}

/** Shared layout for /facilities (companies) and /individuals. */
export function Overview({
  audience, title, lead, heroImage, introTitle, introBody, rooms, services,
}: {
  audience: 'individuals' | 'facilities';
  title: ReactNode; lead: string; heroImage: string;
  introTitle: ReactNode; introBody: string[];
  rooms: Card[]; services: Card[];
}) {
  const aud = AUD[audience];
  return (
    <>
      <PageHero fx="scale" glow={audience === 'facilities' ? 'var(--glow-violet)' : 'var(--glow-blue)'} eyebrow={aud.label} title={title} lead={lead} image={img(heroImage)} crumbs={[{ label: 'Home', href: '/' }, { label: aud.label }]}>
        <div data-reveal="fade" data-delay="0.25" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Button href="/contact-us">Get in touch</Button>
          <Button href="#accommodation" variant="line">See accommodation</Button>
        </div>
      </PageHero>

      <section className="section--tight section" aria-labelledby="ov-intro">
        <div className="container cols-2">
          <div>
            <Eyebrow>{audience === 'facilities' ? 'Complete solution' : 'Secure and comfortable'}</Eyebrow>
            <Heading as="h2" className="display--lg" fx="chars" id="ov-intro">{introTitle}</Heading>
          </div>
          <div className="prose" data-reveal="fade">
            {introBody.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      <section id="accommodation" className="section section--sand" aria-labelledby="ov-acc">
        <div className="container">
          <Eyebrow color="var(--c-acc)">Al Maskaan Accommodation</Eyebrow>
          <Heading as="h2" className="display--lg" id="ov-acc">Select what works <em>better for you</em></Heading>
          <div className="cards cards--four" data-stagger="0.1" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
            {rooms.map((c) => <OverviewCard key={c.href} c={c} />)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="ov-more">
        <div className="container">
          <Eyebrow>The rest of the haven</Eyebrow>
          <Heading as="h2" className="display--lg" fx="blur" id="ov-more">Everything <em>around</em> the room</Heading>
          <div className="cards" data-stagger="0.1" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
            {services.map((c) => <OverviewCard key={c.href} c={c} />)}
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
