import type { Metadata } from 'next';
import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { ContactBand } from '@/components/Footer';
import { QuoteBand, quoteHref } from '@/components/pages';
import { Button, Eyebrow, Fact, Heading, PageHero } from '@/components/ui';
import { OPEN_OUTLETS, RETAIL_UNITS } from '@/content/village';
import { getContent, retailSource } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';
import { img } from '@/lib/images';

// /retail-spaces — replaces the former retail-opportunities, business-opportunities, residents and business-owners
// pages (their old URLs redirect here). Units come from RETAIL_UNITS; no rents are shown.

const en = {
  metaTitle: 'Retail Spaces — shops and offices to rent',
  metaDescription:
    'Shops and offices to rent at Al Maskaan Village, Khazaen Economic City — a ready customer base of residents, with a supermarket, pharmacy, money exchange, laundry and clinic already open. Get a quote.',
  eyebrow: 'Retail Spaces',
  title: <>Open your doors to a <em>ready-made</em> community</>,
  openEyebrow: 'Already open',
  openTitle: <>Trading in the village <em>today</em></>,
  unitsEyebrow: 'Available units',
  unitsTitle: <>Shops and offices <em>to rent</em></>,
  size: 'Size',
  use: 'Suitable for',
  location: 'Location',
  unitAbout: (id: string) => `Retail unit ${id}`,
  noUnitsTitle: 'New units are being listed',
  noUnitsText: 'Tell us the size and type of space you need, and we will come back with the units that fit.',
  typesEyebrow: 'Unit types and sizes',
  photoSoon: 'Photo coming soon',
  outletsLabel: 'Outlets already open in the village',
  m2: 'm²',
};

const ar: typeof en = {
  metaTitle: 'مساحات التجزئة — متاجر ومكاتب للإيجار',
  metaDescription:
    'متاجر ومكاتب للإيجار في قرية المسكن بمدينة خزائن الاقتصادية — قاعدة عملاء جاهزة من المقيمين، مع سوبرماركت وصيدلية وصرافة ومغسلة ملابس وعيادة تعمل بالفعل. اطلب عرض سعر.',
  eyebrow: 'مساحات التجزئة',
  title: <>افتح أبوابك لمجتمع <em>جاهز</em></>,
  openEyebrow: 'تعمل بالفعل',
  openTitle: <>منافذ تعمل في القرية <em>اليوم</em></>,
  unitsEyebrow: 'الوحدات المتاحة',
  unitsTitle: <>متاجر ومكاتب <em>للإيجار</em></>,
  size: 'المساحة',
  use: 'مناسبة لـ',
  location: 'الموقع',
  unitAbout: (id: string) => `وحدة التجزئة ${id}`,
  noUnitsTitle: 'جارٍ إدراج وحدات جديدة',
  noUnitsText: 'أخبرنا بمساحة ونوع المكان الذي تحتاجه، وسنعود إليك بالوحدات المناسبة.',
  typesEyebrow: 'أنواع الوحدات ومساحاتها',
  photoSoon: 'الصورة قريباً',
  outletsLabel: 'منافذ تعمل بالفعل في القرية',
  m2: 'م²',
};
const COPY = { en, ar };

/** Line icons for the outlets that have no photo yet. */
const ICONS: Record<string, ReactNode> = {
  supermarket: <path d="M3 4h2.5l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.3a1.5 1.5 0 0 0 1.4-1.1L21 8H6.3M9.5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />,
  pharmacy: <path d="M12 3v18M3 12h18M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Z" />,
  exchange: <path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5" />,
  laundry: <path d="M5 3h14v18H5zM5 8h14M8 5.5h.01M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />,
  clinic: <path d="M12 21s-7.5-4.6-7.5-10.5A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9C19.5 16.4 12 21 12 21ZM12 10.5v5M9.5 13h5" />,
};

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/retail-spaces', locale) };
}

export default async function Page() {
  const c = await getContent();
  const L = c.locale;
  const t = COPY[L];
  const ui = c.ui.templates;
  const { business, residents } = retailSource(c);
  const units = RETAIL_UNITS.filter((u) => u.status === 'available');
  const quote = quoteHref('Retail', t.eyebrow);
  return (
    <>
      <PageHero
        fx="scale"
        glow="var(--glow-violet)"
        eyebrow={t.eyebrow}
        title={t.title}
        lead={business.lead}
        image={img('retail.frontage')}
        color="var(--c-ret)"
        crumbs={[{ label: c.ui.home, href: '/' }, { label: t.eyebrow }]}
      >
        <div data-reveal="fade" data-delay="0.25"><Button href={quote}>{ui.quote}</Button></div>
      </PageHero>

      {/* already open: the outlets residents use every day */}
      <section className="section--tight section" aria-labelledby="open-title">
        <div className="container">
          <div className="cols-2" style={{ alignItems: 'end', marginBottom: 'clamp(24px, 3vw, 44px)' }}>
            <div>
              <Eyebrow color="var(--c-ret)">{t.openEyebrow}</Eyebrow>
              <h2 id="open-title" className="display display--lg" data-reveal="chars">{t.openTitle}</h2>
            </div>
            <p className="prose" style={{ color: 'var(--muted)' }} data-reveal="fade">{residents.lead}</p>
          </div>
          <ul className="open-strip" aria-label={t.outletsLabel} data-stagger="0.08">
            {OPEN_OUTLETS.map((o) => (
              <li key={o.key} className="open-strip__item glass" data-stagger-item>
                <div className="open-strip__media">
                  {o.image ? (
                    <Image src={o.image.src} alt={o.by ? `${o.name[L]} — ${o.by[L]}` : o.name[L]} width={o.image.w} height={o.image.h} sizes="(min-width: 1000px) 20vw, (min-width: 600px) 33vw, 50vw" />
                  ) : (
                    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[o.key]}</svg>
                  )}
                </div>
                <div className="open-strip__body">
                  <span className="open-strip__live"><i aria-hidden="true" />{t.openEyebrow}</span>
                  <h3>{o.name[L]}</h3>
                  {o.by && <p>{o.by[L]}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* units to rent — AMV lists them in src/content/village.ts; let units drop off */}
      <section className="section section--sand" aria-labelledby="units-title">
        <div className="container">
          <Eyebrow color="var(--c-ret)">{t.unitsEyebrow}</Eyebrow>
          <h2 id="units-title" className="display display--lg" data-reveal="chars">{t.unitsTitle}</h2>
          {units.length > 0 ? (
            <ul className="units" data-stagger="0.08">
              {units.map((u) => (
                <li key={u.id} className="units__card glass" data-stagger-item>
                  <div className="units__media">
                    {u.image ? <Image src={u.image} alt={t.unitAbout(u.id)} fill sizes="(min-width: 900px) 30vw, 100vw" style={{ objectFit: 'cover' }} /> : <span>{t.photoSoon}</span>}
                  </div>
                  <div className="units__body">
                    <span className="units__id">{u.id}</span>
                    <dl>
                      <div><dt>{t.size}</dt><dd dir="ltr">{u.size.toLocaleString('en-US')} {t.m2}</dd></div>
                      <div><dt>{t.use}</dt><dd>{u.use[L]}</dd></div>
                      <div><dt>{t.location}</dt><dd>{u.location[L]}</dd></div>
                    </dl>
                    <Button href={quoteHref('Retail', t.unitAbout(u.id))}>{ui.quote}</Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="units__empty glass" data-reveal="fade">
              <div>
                <h3>{t.noUnitsTitle}</h3>
                <p>{t.noUnitsText}</p>
              </div>
              <Button href={quote}>{ui.quote}</Button>
            </div>
          )}
        </div>
      </section>

      {business.stats && (
        <section className="section--tight section" aria-label={ui.keyFigures}>
          <div className="container">
            <div className="facts" style={{ gridTemplateColumns: `repeat(${business.stats.length}, minmax(0, 1fr))` }} data-stagger="0.1">
              {business.stats.map((s) => <Fact key={s.label} {...s} />)}
            </div>
          </div>
        </section>
      )}

      {business.sections.map((sec, i) => (
        <section key={sec.title} className={i % 2 ? 'section--tight section section--sand' : 'section--tight section'}>
          <div className="container cols-2">
            <div>
              <Eyebrow color="var(--c-ret)">{i === 0 ? t.typesEyebrow : String(i + 1).padStart(2, '0')}</Eyebrow>
              <Heading as="h2" className="display--md" fx={i % 2 ? 'blur' : 'chars'}>{sec.title}</Heading>
              {sec.paragraphs?.map((p) => <p key={p} className="prose" style={{ marginTop: 20, color: 'var(--muted)' }} data-reveal="fade">{p}</p>)}
            </div>
            <div>
              {sec.items && (
                <ul className="checks" data-stagger="0.08" style={{ '--c': 'var(--c-ret)' } as CSSProperties}>
                  {sec.items.map((it) => (
                    <li key={it.text} data-stagger-item><span>{it.label && <b>{it.label}</b>}<span>{it.text}</span></span></li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      ))}

      <QuoteBand href={quote} id="retail-quote" />
      <ContactBand />
    </>
  );
}
