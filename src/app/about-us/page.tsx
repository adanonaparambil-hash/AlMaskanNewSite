import type { Metadata } from 'next';
import { Marquee } from '@/components/fx';
import { ContactBand } from '@/components/Footer';
import { Button, Eyebrow, Fact, Heading, Media, PageHero } from '@/components/ui';
import { ABOUT } from '@/content/services';
import { FACTS, STORY } from '@/content/site';
import { img } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About us',
  description:
    'Al Maskaan Village is a community-oriented worker accommodation development in Khazaen Economic City. Our purpose, vision, mission, values, facts and figures, and the Adrak Group management team.',
  alternates: { canonical: '/about-us' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero fx="chars" glow="var(--glow-amber)"
        eyebrow="About us"
        title={<>Beyond <em>accommodation</em></>}
        lead="We believe everyone deserves a place to call home — a space that feels safe, comfortable and truly welcoming."
        image={img('hero.courtyard')}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About us' }]}
      />

      <section className="section--tight section" aria-labelledby="stand-title">
        <div className="container cols-2">
          <div>
            <Eyebrow>What we stand for</Eyebrow>
            <h2 id="stand-title" className="display display--lg" data-reveal="blur">A home-away-from-home <em>community</em></h2>
          </div>
          <div className="prose" data-reveal="fade">
            <p>
              At Al Maskaan Village, we believe everyone deserves a place to call home — a space that feels safe, comfortable and truly welcoming. We are passionate about crafting communities where diversity thrives and everyone feels a sense of belonging. We are also committed to shaping the future of accommodation, starting right now. Every detail is crafted with our residents’ comfort and satisfaction in mind, so their experience at Al Maskaan Village is nothing short of exceptional.
            </p>
          </div>
        </div>
      </section>

      <section className="section--tight section" aria-label="Purpose, vision and mission">
        <div className="container">
          <div className="pillars" data-stagger="0.12">
            {[
              ['Purpose', ABOUT.purpose],
              ['Vision', ABOUT.vision],
              ['Mission', ABOUT.mission],
            ].map(([t, p]) => (
              <div key={t} data-stagger-item><span className="tag">{t}</span><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="facts-title">
        <div className="container">
          <Eyebrow>Facts and figures</Eyebrow>
          <Heading as="h2" className="display--lg" fx="scale" id="facts-title">What you need to <em>know</em></Heading>
          <div className="facts" style={{ marginTop: 'clamp(32px, 5vw, 64px)' }} data-stagger="0.08">
            {FACTS.map((f) => <Fact key={f.label} {...f} />)}
          </div>
          <p className="fine">Figures as published by Al Maskaan Village.</p>
        </div>
      </section>

      <Marquee outline speed={0.8} items={['Quality', 'Sustainability', 'Empathy', 'Purpose', 'Vision', 'Mission']} />

      <section className="section" aria-labelledby="values-title">
        <div className="container">
          <Eyebrow>Values</Eyebrow>
          <Heading as="h2" className="display--lg" fx="chars" id="values-title">Quality, sustainability, <em>empathy</em></Heading>
          <div className="values" style={{ marginTop: 'clamp(32px, 5vw, 64px)' }} data-stagger="0.12">
            {ABOUT.values.map((v) => (
              <div key={v.name} data-stagger-item><h3>{v.name}</h3><p>{v.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="apart-title">
        <div className="container grid-12" style={{ alignItems: 'start' }}>
          <div style={{ gridColumn: '1 / span 5' }}>
            <Eyebrow>What sets us apart</Eyebrow>
            <h2 id="apart-title" className="display display--lg" data-reveal="blur">Forward-thinking, inclusive, <em>committed</em></h2>
            <Media k="life.garden" ratio="4 / 3" sizes="(min-width: 900px) 40vw, 100vw" reveal parallax={0.06} className="" style={{ marginTop: 40 }} />
          </div>
          <div style={{ gridColumn: '7 / span 6', display: 'grid', gap: 48 }}>
            <div>
              <h3 className="eyebrow">What sets us apart</h3>
              <ul className="checks" data-stagger="0.08">
                {ABOUT.apart.map((a) => <li key={a.label} data-stagger-item><span><b>{a.label}</b><span>{a.text}</span></span></li>)}
              </ul>
            </div>
            <div>
              <h3 className="eyebrow">We are committed to</h3>
              <ul className="checks" data-stagger="0.08">
                {ABOUT.committed.map((a) => <li key={a.label} data-stagger-item><span><b>{a.label}</b><span>{a.text}</span></span></li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="team-title">
        <div className="container">
          <Eyebrow>Seasoned experts</Eyebrow>
          <Heading as="h2" className="display--lg" fx="chars" id="team-title">Management <em>team</em></Heading>
          <div className="team" style={{ marginTop: 'clamp(40px, 5vw, 80px)' }}>
            {ABOUT.team.map((m, i) => (
              <article key={m.name} className="member">
                <Media k={m.image} ratio="4 / 5" sizes={i === 0 ? '(min-width: 1000px) 25vw, 100vw' : '(min-width: 1000px) 28vw, 50vw'} position="50% 20%" reveal />
                <div>
                  <h3>{m.name}</h3>
                  <p className="role">{m.role}</p>
                  {m.bio.map((p) => <p key={p}>{p}</p>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="story-title">
        <div className="container story">
          <div className="story__head">
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-title" className="display display--lg" data-reveal="lines">From a winning pitch to a <em>village</em></h2>
            <div style={{ marginTop: 32 }} data-reveal="fade"><Button href="/news" variant="line">Read the latest news</Button></div>
          </div>
          <ol className="timeline" data-timeline>
            <li className="timeline__rail" aria-hidden="true"><div className="timeline__line" data-timeline-line /></li>
            {STORY.map((s, i) => (
              <li key={i} className="tl-item" data-timeline-item>
                <p className="tl-item__year">{s.year}</p>
                <p className="tl-item__title">{s.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
