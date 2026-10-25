import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import InquiryForm from '@/components/InquiryForm';
import NewsCard from '@/components/NewsCard';
import HeroMedia from '@/components/HeroMedia';
import RoomShowcase, { type ShowcaseRow } from '@/components/RoomShowcase';
import VideoFacade from '@/components/VideoFacade';
import { Button, Eyebrow, Fact, Heading, Media, TextLink } from '@/components/ui';
import { Marquee, RingGallery } from '@/components/fx';
import { FACTS, GROUP, HAVEN, SITE, STORY } from '@/content/site';
import { ROOMS } from '@/content/rooms';
import { galleryItems, img } from '@/lib/images';
import { articles } from '@/lib/news';
import type { CSSProperties } from 'react';

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} — Elevating Living and Working` },
  description:
    'Furnished worker accommodation, retail, catering, spaces and lifestyle in Khazaen Economic City, Barka, Oman. A community-oriented, mixed-use village on the Muscat–Batinah Expressway.',
  alternates: { canonical: '/' },
};

const showcase: ShowcaseRow[] = [
  { slug: 'junior-staff', code: undefined },
  { slug: 'senior-staff-single-premium', code: 'S1' },
  { slug: 'senior-staff-double-premium', code: 'S2' },
  { slug: 'senior-staff-triple-premium', code: 'S3' },
].map(({ slug }) => {
  const r = ROOMS.find((x) => x.audience === 'individuals' && x.slug === slug)!;
  return {
    href: `/individuals/${r.slug}`,
    code: r.code,
    name: r.name.replace('Senior Staff · ', ''),
    text: r.group === 'junior' ? 'A bunk room for ten — with three meals, internet and laundry included.' : r.tagline,
    specs: [`Up to ${r.specs.find((s) => s.label === 'Maximum occupancy')?.value}`, r.specs.find((s) => s.label === 'Area of the room')!.value, `${r.specs.find((s) => s.label === 'Total count of rooms')?.value} rooms`],
    image: img(r.image),
  };
});
showcase[0].name = 'Junior Staff';

const lifestyleItems = [
  { n: '01', t: 'Invigorating recreation', d: 'Football, tennis and badminton courts, expansive green areas and engaging games promote activity and team building.' },
  { n: '02', t: 'Customised fitness', d: 'A fully equipped gym with individual workout spaces and group fitness classes.' },
  { n: '03', t: 'Vibrant social hubs', d: 'Inviting cafes — warm spaces for interaction and casual meetings that foster belonging.' },
  { n: '04', t: 'Events and workshops', d: 'A recreation hall for community events, workshops, dance classes and game nights.' },
];

export default function Home() {
  const [lead, ...rest] = articles;
  return (
    <>
      {/* 1 — HERO */}
      <section className="hero" data-hero-section aria-labelledby="hero-title">
        <HeroMedia />
        <div className="hero__veil" />
        <div className="container hero__inner">
          <Eyebrow className="hero__eyebrow"><span data-hero="eyebrow">Khazaen Economic City · Barka · Oman</span></Eyebrow>
          <h1 id="hero-title" className="display hero__title" data-hero="title">
            Redefining <em>worker accommodation</em> in Khazaen Economic City
          </h1>
          <div className="hero__aside glass sheen" data-hero="copy">
            <p className="lead">
              A community-oriented, mixed-use village of furnished rooms and on-site catering — for individuals and company workforces, on the Muscat–Batinah Expressway.
            </p>
            <div className="hero__cta">
              <Button href="/contact-us" dataHero="cta">Make an inquiry</Button>
              <Button href="#village" variant="line" dataHero="cta">Explore the village</Button>
            </div>
          </div>
          <p className="hero__stats" data-hero="cta">
            {FACTS.slice(0, 2).concat(FACTS[6]).map((f) => <span key={f.label}><b>{f.value.toLocaleString('en-US')}{f.suffix}</b>{f.label}</span>)}
          </p>
        </div>
        <div className="hero__cue" data-hero="cue" aria-hidden="true">Scroll</div>
      </section>

      <Marquee items={['Accommodation', 'Retail', 'Catering', 'Spaces', 'Lifestyle', 'Khazaen Economic City']} />

      {/* 2 — INTRODUCTION */}
      <section id="village" className="section" aria-labelledby="intro-title">
        <div className="container grid-12">
          <div className="intro__title">
            <Eyebrow>Elevating living and working</Eyebrow>
            <Heading as="h2" className="display--lg" fx="chars" id="intro-title">
              Exceptional service and <em>rewarding</em> experiences
            </Heading>
          </div>
          <div className="intro__text prose" data-reveal="fade">
            <p>
              Al Maskaan Village elevates the concept of accommodation with an innovative, welcoming and community-oriented mixed-use development in Khazaen Economic City. As a pioneer in affordable worker accommodation in Oman, we provide modern, furnished worker apartments with on-site catering for the diverse needs of individuals and corporate workforces.
            </p>
            <p>
              A dedicated team delivers exceptional service, fosters innovation and creates a healthy, safe living environment — in Barka on the Muscat–Batinah Expressway, the most densely populated part of the Sultanate.
            </p>
            <p>
              Whether you are looking for accommodation, a sense of community, or ways to enhance your business, Al Maskaan Village stands as a model of elevated living and working, with a remarkable and unmatched experience for residents and employers alike.
            </p>
          </div>
          <div className="intro__loc">
            <div className="stamp glass" data-reveal="fade" data-glow><b>Khazaen Economic City, Barka</b><span>On the Muscat–Batinah Expressway, Sultanate of Oman</span></div>
            <div className="stamp glass" data-reveal="fade" data-delay="0.1" data-glow><b>A haven of five</b><span>Accommodation · Retail · Catering · Spaces · Lifestyle</span></div>
          </div>
          <div className="intro__fig">
            <div data-rise3d="20" data-tilt="5" data-cursor="Explore" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k="hero.courtyard" ratio="4 / 5" sizes="(min-width: 900px) 40vw, 100vw" reveal parallax={0.07} /></div>
            <svg className="intro__seal" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="seal-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
              <text><textPath href="#seal-path">Khazaen Economic City · Barka · Oman · Al Maskaan Village · </textPath></text>
              <circle cx="100" cy="100" r="5" />
            </svg>
            <div className="intro__badge glass" data-speed="-0.35">
              <span className="intro__badge-k">Pioneer</span>
              <p>in affordable worker accommodation in Oman — modern, furnished apartments with on-site catering.</p>
            </div>
          </div>
          <div className="intro__fig--b">
            <p className="intro__kicker display display--sm" data-reveal="blur">
              In Barka on the Muscat–Batinah Expressway — <em>the most densely populated</em> part of the Sultanate.
            </p>
            <div data-rise3d="20" data-tilt="5" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k="acc.tower" ratio="5 / 4" sizes="(min-width: 900px) 50vw, 100vw" reveal="right" parallax={0.07} /></div>
            <ul className="intro__chips" data-stagger="0.1" data-speed="0.2">
              {[FACTS[2], FACTS[5], FACTS[6]].map((f) => (
                <li key={f.label} className="glass" data-stagger-item>
                  <b><span data-counter={f.value}>{f.value.toLocaleString('en-US')}</span>{f.suffix}{'unit' in f && f.unit ? <small> {f.unit}</small> : null}</b>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section--tight" aria-label="Film">
        <div className="container">
          <VideoFacade id={SITE.video.id} title={SITE.video.title} poster={img('life.garden')} />
        </div>
      </section>

      <section className="section" aria-label="Statement">
        <div className="container">
          <p className="statement" data-words>Al Maskaan Village is not just a place to live; it is a <em>home away from home</em> and a journey towards excellence.</p>
        </div>
      </section>

      {/* 3 — ABOUT & COMMUNITY */}
      <section className="section" aria-labelledby="community-title">
        <div className="container grid-12">
          <div className="about__a">
            <Eyebrow>Welcoming community</Eyebrow>
            <h2 id="community-title" className="display display--lg" data-reveal="blur">
              Everyone deserves a place to call <em>home</em>
            </h2>
            <div className="prose" data-reveal="fade" style={{ marginTop: '2rem' }}>
              <p>Rooted in the belief that everyone deserves a place to call home — a harmonious blend of safety, comfort and value — Al Maskaan Village set out to create this envisioned haven.</p>
              <p>Our vision materialised into an environment where individuals not only coexist but thrive, in a setting meticulously crafted for holistic well-being.</p>
            </div>
            <div style={{ marginTop: '2rem' }} data-reveal="fade"><TextLink href="/about-us">About Al Maskaan Village</TextLink></div>
            <div className="about__media">
              <div data-tilt="4" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k="life.garden" ratio="4 / 3" sizes="(min-width: 900px) 40vw, 100vw" reveal parallax={0.06} /></div>
              <ul className="about__haven" data-stagger="0.08" aria-label="A haven of five">
                {HAVEN.map((h, i) => (
                  <li key={h.key} data-stagger-item style={{ '--c': ['var(--c-acc)', 'var(--c-ret)', 'var(--c-cat)', 'var(--c-spa)', 'var(--c-lif)'][i] } as CSSProperties}>
                    <Link href={h.individuals}>{h.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about__b quote">
            <figure className="glass">
              <blockquote className="quote__text" data-reveal="fade">
                “Al Maskaan Village is not just about providing accommodations; it’s a commitment to shaping a lifestyle where quality meets warmth, and community thrives. We feel proud at Al Adrak Facilities &amp; Services LLC (AFS) to having developed a project that fosters an environment where every resident, employee, and business partner feels a genuine sense of belonging. Al Maskaan Village is not just a place to live; it’s a home away from home and a journey towards excellence, where every detail reflects our dedication to redefining living experiences in Khazaen Economic City and beyond.”
              </blockquote>
              <figcaption className="quote__by" data-reveal="fade">
                <Media k="people.thomas" ratio="1 / 1" sizes="72px" position="50% 18%" />
                <span><b>Dr. Thomas Alexander</b><span>Founder and Chairman, Adrak Group of Companies</span></span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 4 — VERIFIED HIGHLIGHTS */}
      <section className="section section--sand" aria-labelledby="facts-title">
        <div className="container">
          <div className="grid-12" style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}>
            <div style={{ gridColumn: '1 / span 7' }}>
              <Eyebrow>Facts and figures</Eyebrow>
              <Heading as="h2" className="display--lg" fx="scale" id="facts-title">What you need to <em>know</em></Heading>
            </div>
          </div>
          <div className="facts" data-stagger="0.08">
            {FACTS.map((f) => <Fact key={f.label} {...f} />)}
          </div>
          <p className="fine">Figures as published by Al Maskaan Village.</p>
        </div>
      </section>

      {/* HAVEN OF FIVE — horizontal storytelling (wrapped: ScrollTrigger moves pinned sections into a pin-spacer, so React must own the parent) */}
      <div>
      <section className="hs" data-hscroll aria-labelledby="haven-title">
        <div className="container hs__head">
          <div>
            <Eyebrow>A haven of five</Eyebrow>
            <h2 id="haven-title" className="display display--lg" data-reveal="lines">Five ways the village <em>works for you</em></h2>
          </div>
          <div className="hs__meta" aria-hidden="true"><span data-hscroll-count>01</span><span className="hs__bar"><i data-hscroll-bar /></span><span>05</span></div>
        </div>
        <ul className="hs__track" data-hscroll-track>
          {HAVEN.map((h, i) => (
            <li key={h.key} className="hs__panel" data-hscroll-panel style={{ '--c': h.color } as CSSProperties}>
              <Media k={h.image} sizes="(min-width: 1024px) 40vw, 100vw" parallax={0.05} />
              <div className="hs__panel-body">
                <div style={{ display: 'grid', gap: 18 }}>
                  <span className="hs__num">{String(i + 1).padStart(2, '0')} / 05</span>
                  <span className="hs__rule" />
                  <div className="hs__title">
                    <Image src={h.mark} alt="" width={44} height={44} />
                    <h3 className="display display--md">Al Maskaan {h.name}</h3>
                  </div>
                  <p className="hs__tag">{h.tagline}</p>
                  <p className="prose" style={{ color: 'var(--muted)' }}>{h.blurb}</p>
                  <p className="hs__ask">{h.ask}</p>
                </div>
                <div className="hs__links">
                  <TextLink href={h.individuals}>For individuals</TextLink>
                  <TextLink href={h.companies}>For companies</TextLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      </div>

      {/* 5 — ACCOMMODATION */}
      <section className="section" aria-labelledby="acc-title">
        <div className="container">
          <div className="grid-12" style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}>
            <div style={{ gridColumn: '1 / span 7' }}>
              <Eyebrow color="var(--c-acc)">Al Maskaan Accommodation</Eyebrow>
              <Heading as="h2" className="display--lg" fx="chars" id="acc-title">Select what works <em>better for you</em></Heading>
            </div>
            <div style={{ gridColumn: '9 / span 4', alignSelf: 'end' }} className="prose" data-reveal="fade">
              <p>Modern, furnished rooms — from shared bunk rooms to private premium rooms — close to your workplace, whether you are an Omani citizen or an expatriate.</p>
            </div>
          </div>
          <RoomShowcase rows={showcase} />
          <div style={{ marginTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }} data-reveal="fade">
            <Button href="/individuals">Accommodation for individuals</Button>
            <Button href="/facilities" variant="line">Workforce housing for companies</Button>
          </div>
        </div>
      </section>

      {/* 6 — RETAIL */}
      <section className="section section--paper" aria-labelledby="retail-title">
        <div className="container split split--flip">
          <Media k="retail.frontage" ratio="5 / 4" sizes="(min-width: 900px) 48vw, 100vw" curtain parallax={0.07} className="split__media" />
          <div className="split__body" style={{ '--c': 'var(--c-ret)' } as CSSProperties}>
            <div>
              <Eyebrow color="var(--c-ret)">Al Maskaan Retail</Eyebrow>
              <Heading as="h2" className="display--lg" fx="blur" id="retail-title">A one-stop shop, <em>a short stroll</em> away</Heading>
            </div>
            <p className="prose" data-reveal="fade" style={{ color: 'var(--muted)' }}>
              Retail offers residents a one-stop shopping experience, and business owners the opportunity to serve it — from groceries, phone accessories and money exchange to medicines, clothing, cafes and restaurants.
            </p>
            <ul className="checks" data-stagger="0.1">
              <li data-stagger-item><span><b>Retail units from 43.15 m² to 90.66 m²</b><span>Tap into a pre-established customer base of residents and visitors.</span></span></li>
              <li data-stagger-item><span><b>Financial services</b><span>Exchange stores, an ATM space and a 244.21 m² bank branch location.</span></span></li>
              <li data-stagger-item><span><b>Cafe, restaurant and supermarket units</b><span>90.37 m² cafe · 121.98 m² restaurant · 471 m² supermarket.</span></span></li>
            </ul>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }} data-reveal="fade">
              <TextLink href="/individuals/residents">For residents</TextLink>
              <TextLink href="/facilities/business-opportunities">Business opportunities</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — CATERING */}
      <section className="section" aria-labelledby="cat-title">
        <div className="container">
          <div className="grid-12" style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}>
            <div style={{ gridColumn: '1 / span 7' }}>
              <Eyebrow color="var(--c-cat)">Al Maskaan Catering</Eyebrow>
              <Heading as="h2" className="display--lg" fx="chars" id="cat-title">Delicious meals, <em>included</em> in your stay</Heading>
            </div>
            <div style={{ gridColumn: '8 / span 5', alignSelf: 'end', display: 'grid', gap: 20 }} className="prose" data-reveal="fade">
              <p>Three nutritious meals a day keep residents fuelled and ready to perform. Beyond the daily table, bespoke catering suits boardroom meetings, industry conferences and team celebrations — menus designed with our chefs around your culture, preferences and budget.</p>
            </div>
          </div>
          <div className="collage">
            <div data-speed="-0.15"><Media k="cat.hallBig" ratio="16 / 10" sizes="(min-width: 800px) 58vw, 100vw" reveal parallax={0.06} /></div>
            <div data-speed="0.35"><Media k="cat.canapes" ratio="4 / 5" sizes="(min-width: 800px) 40vw, 50vw" reveal="right" /></div>
            <div data-speed="0.2"><Media k="cat.kitchen" ratio="4 / 3" sizes="(min-width: 800px) 40vw, 50vw" reveal /></div>
            <div data-speed="-0.25"><Media k="cat.desserts" ratio="3 / 2" sizes="(min-width: 800px) 40vw, 100vw" reveal="right" /></div>
          </div>
          <div className="facts" style={{ marginTop: 'clamp(48px, 6vw, 96px)', gridTemplateColumns: 'repeat(3, 1fr)' }} data-stagger="0.1">
            <Fact value={3900} suffix="+" unit="m²" label="Industrial kitchen" />
            <Fact value={3000} suffix="+" label="In-house catering serving" />
            <Fact value={1000} suffix="+" label="External catering serving" />
          </div>
          <div style={{ marginTop: 36, display: 'flex', gap: 24, flexWrap: 'wrap' }} data-reveal="fade">
            <Button href="/facilities/catering">Catering for companies</Button>
            <Button href="/individuals/individuals-catering" variant="line">Meals for residents</Button>
          </div>
        </div>
      </section>

      {/* 8 — SPACES */}
      <section className="circle" data-circle aria-labelledby="spaces-title">
        <div className="circle__stage">
          <Media k="spaces.cafe" sizes="100vw" circle className="circle__media" />
          <div className="circle__veil" />
          <p className="circle__label" data-circle-label aria-hidden="true"><span>Spaces</span></p>
          <div className="circle__card glass sheen" data-circle-card style={{ '--c': 'var(--c-spa)' } as CSSProperties}>
              <div>
                <Eyebrow color="var(--c-spa)">Al Maskaan Spaces</Eyebrow>
                <h2 id="spaces-title" className="display display--md">Elevate your business and <em>personal gatherings</em></h2>
              </div>
              <p className="prose" style={{ color: 'var(--muted)' }}>
                Meeting rooms and versatile venues equipped with modern technology — for board meetings, presentations and brainstorming sessions, or birthdays, anniversaries and gatherings with loved ones — supported by catering, high-speed internet and professional staff.
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <Button href="/contact-us">Reserve or tour</Button>
                <TextLink href="/facilities/spaces">Explore spaces</TextLink>
              </div>
          </div>
        </div>
      </section>

      <RingGallery title="Gallery of the village" items={[0, 6, 13, 21, 29, 33, 36, 38].map((i) => ({ ...galleryItems[i], caption: galleryItems[i].alt }))} />

      {/* 9 — LIFESTYLE & FACILITIES (image expansion) */}
      <section className="expand" data-expand aria-labelledby="life-title">
        <div className="expand__stage">
          <Media image={img('life.courts')} sizes="100vw" expandFrame className="expand__media" parallax={0.0} style={{ position: 'absolute', inset: 0 }} />
          <div className="expand__veil" />
          <div className="container expand__copy" data-expand-copy>
            <Eyebrow color="var(--c-lif)">Al Maskaan Lifestyle</Eyebrow>
            <h2 id="life-title" className="display display--xl">Live well, work smart, <em>connect deeply</em></h2>
            <p className="lead">More than just a place to stay — a haven to connect, recharge and feel right at home.</p>
          </div>
        </div>
      </section>
      <section className="section--tight section" aria-label="Lifestyle and facilities">
        <div className="container">
          <div className="amen" data-stagger="0.1">
            {lifestyleItems.map((l) => (
              <div key={l.n} data-stagger-item data-glow><span className="n">{l.n}</span><h3>{l.t}</h3><p>{l.d}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }} data-reveal="fade">
            <Button href="/individuals/individuals-lifestyle">Lifestyle for residents</Button>
            <Button href="/facilities/lifestyle" variant="line">Lifestyle for companies</Button>
          </div>
        </div>
      </section>

      {/* 10 — OUR STORY */}
      <section className="section section--paper" aria-labelledby="story-title">
        <div className="container story">
          <div className="story__head">
            <Eyebrow>Our story</Eyebrow>
            <h2 id="story-title" className="display display--lg" data-reveal="lines">From a winning pitch to a <em>village</em></h2>
            <p className="prose" style={{ marginTop: 24, color: 'var(--muted)' }} data-reveal="fade">
              Developed by Adrak Facilities and Services (AFS), part of the Adrak Group of Companies.
            </p>
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

      {/* GROUP */}
      <section className="section section--sand" aria-labelledby="group-title">
        <div className="container group">
          <div className="group__media" data-rise3d="18" data-tilt="5" style={{ position: 'relative' }}>
            <Media k="people.thomas" ratio="4 / 5" sizes="(min-width: 900px) 40vw, 100vw" position="50% 20%" reveal />
          </div>
          <div className="group__body">
            <div>
              <Eyebrow>Holding company</Eyebrow>
              <h2 id="group-title" className="display display--lg" data-reveal="lines">Part of the <em>{GROUP.name}</em></h2>
            </div>
            <p className="prose" data-reveal="fade" style={{ color: 'var(--muted)' }}>{GROUP.lead}</p>
            <div className="group__stats" data-stagger="0.1">
              {GROUP.stats.map((s) => (
                <div key={s.label} data-stagger-item><b>{s.prefix}{s.value.toLocaleString('en-US')}{s.suffix}</b><span>{s.label}</span></div>
              ))}
            </div>
            <p className="fine" style={{ marginTop: 0 }}>{GROUP.note}</p>
            <div data-reveal="fade"><TextLink href="/about-us">Meet the management team</TextLink></div>
          </div>
        </div>
      </section>

      {/* 11 — NEWS */}
      <section className="section" aria-labelledby="news-title">
        <div className="container">
          <div className="grid-12" style={{ marginBottom: 'clamp(32px, 4vw, 56px)', alignItems: 'end' }}>
            <div style={{ gridColumn: '1 / span 8' }}>
              <Eyebrow>News &amp; announcements</Eyebrow>
              <Heading as="h2" className="display--lg" fx="blur" id="news-title">Latest from the <em>village</em></Heading>
            </div>
            <div style={{ gridColumn: '10 / span 3', justifySelf: 'end' }} data-reveal="fade"><TextLink href="/news">All news</TextLink></div>
          </div>
          <div className="cards" data-stagger="0.12">
            <NewsCard a={lead} />
            {rest.slice(0, 2).map((a) => <NewsCard key={a.slug} a={a} />)}
          </div>
        </div>
      </section>

      {/* 12 — CONTACT */}
      <section id="contact" className="section section--sand" aria-labelledby="contact-title">
        <div className="container contact">
          <div className="contact__info">
            <div>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 id="contact-title" className="display display--lg" data-reveal="chars">Tell us what you <em>need</em></h2>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Call</h3>
              <ul>{SITE.phones.map((p) => <li key={p.href}><a href={p.href}>{p.label}</a></li>)}</ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Email</h3>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Chat &amp; reviews</h3>
              <ul><li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.phones[1].label}</a></li><li><a href={SITE.reviews} target="_blank" rel="noopener noreferrer">Google Reviews</a></li></ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Visit</h3>
              <address>{SITE.address.map((l) => <span key={l}>{l}</span>)}</address>
            </div>
          </div>
          <div className="contact__form glass" data-reveal="fade">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
