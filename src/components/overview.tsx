import Link from '@/components/LocaleLink';
import type { ReactNode } from 'react';
import { ContactBand } from './Footer';
import { QuoteBand, quoteHref } from './pages';
import { Arrow, Button, Eyebrow, Heading, Media, PageHero } from './ui';
import { img } from '@/lib/images';
import { HOW_TO_BOOK, INCLUDED_NOTE, LAUNDRY_NOTE, MEAL_NOTE, MEAL_PLANS, ROOM_OPTIONS } from '@/content/stays';
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
  const rooms: Card[] = c.rooms.map((r) => ({ href: `/rooms/${r.slug}`, title: r.name, tag: r.forWho, text: r.tagline, image: r.image }));
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
          {/* six room types: two rows of three */}
          <div className="cards" data-stagger="0.1" style={{ marginTop: 'clamp(32px, 4vw, 64px)' }}>
            {rooms.map((r) => <OverviewCard key={r.href} c={r} />)}
          </div>
        </div>
      </section>

      <StayDetails />

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

const STAY_COPY = {
  en: {
    mealsEyebrow: 'Meal plans', mealsTitle: <>From room-only to <em>full board</em></>, plan: 'Meal plan', meals: 'Meals included',
    optionsEyebrow: 'Room options', optionsTitle: <>Every room, <em>at a glance</em></>,
    room: 'Room type', building: 'Building', plans: 'Meal plans', laundry: 'Laundry', stay: 'Stay', yes: 'Included', no: 'Not included',
    bookEyebrow: 'How to book', bookTitle: <>Four steps to <em>moving in</em></>,
  },
  ar: {
    mealsEyebrow: 'خطط الوجبات', mealsTitle: <>من الغرفة فقط إلى <em>الإقامة الكاملة</em></>, plan: 'خطة الوجبات', meals: 'الوجبات المشمولة',
    optionsEyebrow: 'خيارات الغرف', optionsTitle: <>كل الغرف <em>في لمحة</em></>,
    room: 'نوع الغرفة', building: 'المبنى', plans: 'خطط الوجبات', laundry: 'الغسيل', stay: 'الإقامة', yes: 'مشمول', no: 'غير مشمول',
    bookEyebrow: 'طريقة الحجز', bookTitle: <>أربع خطوات حتى <em>الانتقال</em></>,
  },
};

/** Rooms page: meal plans, room options and how to book (AMV content, Oct 2026). */
async function StayDetails() {
  const { locale: L } = await getContent();
  const t = STAY_COPY[L];
  return (
    <>
      <section className="section" aria-labelledby="meals-title">
        <div className="container cols-2">
          <div>
            <Eyebrow color="var(--c-cat)">{t.mealsEyebrow}</Eyebrow>
            <h2 id="meals-title" className="display display--lg" data-reveal="chars">{t.mealsTitle}</h2>
            <p className="prose" style={{ marginTop: 20, color: 'var(--muted)' }} data-reveal="fade">{MEAL_NOTE[L]}</p>
          </div>
          <div className="table-wrap glass" data-reveal="fade">
            <table className="data-table">
              <thead><tr><th scope="col">{t.plan}</th><th scope="col">{t.meals}</th></tr></thead>
              <tbody>{MEAL_PLANS.map((m) => <tr key={m.plan.en}><th scope="row">{m.plan[L]}</th><td>{m.meals[L]}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="options-title">
        <div className="container">
          <Eyebrow color="var(--c-acc)">{t.optionsEyebrow}</Eyebrow>
          <h2 id="options-title" className="display display--lg" data-reveal="chars">{t.optionsTitle}</h2>
          <div className="table-wrap glass" style={{ marginTop: 'clamp(24px, 3vw, 40px)' }} data-reveal="fade">
            <table className="data-table data-table--options">
              <thead><tr><th scope="col">{t.room}</th><th scope="col">{t.building}</th><th scope="col">{t.plans}</th><th scope="col">{t.laundry}</th><th scope="col">{t.stay}</th></tr></thead>
              <tbody>
                {ROOM_OPTIONS.map((o) => (
                  <tr key={o.room.en}>
                    <th scope="row"><Link href={o.href}>{o.room[L]}</Link></th>
                    <td data-label={t.building}>{o.building[L]}</td>
                    <td data-label={t.plans}>{o.plans[L]}</td>
                    <td data-label={t.laundry}><span className={o.laundry ? 'tick' : 'dash'} aria-label={o.laundry ? t.yes : t.no}>{o.laundry ? '✓' : '–'}</span></td>
                    <td data-label={t.stay}>{o.stay[L]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="fine">{LAUNDRY_NOTE[L]}</p>
          <p className="fine" style={{ marginTop: 6 }}>{INCLUDED_NOTE[L]}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="book-title">
        <div className="container">
          <Eyebrow>{t.bookEyebrow}</Eyebrow>
          <h2 id="book-title" className="display display--lg" data-reveal="chars">{t.bookTitle}</h2>
          <ol className="steps" data-stagger="0.1">
            {HOW_TO_BOOK.map((h, i) => (
              <li key={h.step.en} className="glass" data-stagger-item>
                <span className="steps__n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{h.step[L]}</h3>
                <p>{h.text[L]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
