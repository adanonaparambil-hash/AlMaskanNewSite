import type { Metadata } from 'next';
import { ContactBand } from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import NewsCard from '@/components/NewsCard';
import { Eyebrow } from '@/components/ui';
import { getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

const en = {
  metaTitle: 'News and announcements',
  metaDescription: 'Announcements from Al Maskaan Village and Khazaen Economic City — partnerships, new services, community milestones and market insights.',
  eyebrow: 'Stay informed',
  title: <>Latest <em>news</em></>,
  lead: 'Partnerships, new services and milestones from the village and from Khazaen Economic City.',
};
const ar: typeof en = {
  metaTitle: 'الأخبار والإعلانات',
  metaDescription: 'إعلانات من قرية المسكن ومدينة خزائن الاقتصادية — شراكات وخدمات جديدة ومحطات بارزة في مسيرة المجتمع ورؤى حول السوق.',
  eyebrow: 'ابقَ على اطلاع',
  title: <>آخر <em>الأخبار</em></>,
  lead: 'شراكات وخدمات جديدة ومحطات بارزة من القرية ومن مدينة خزائن الاقتصادية.',
};
const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/news', locale) };
}

export default async function NewsPage() {
  const c = await getContent();
  const t = COPY[c.locale];
  const [lead, ...rest] = c.articles;
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="display display--xl" data-reveal="scale">{t.title}</h1>
            <p className="lead" data-reveal="fade" data-delay="0.15">{t.lead}</p>
          </div>
        </div>
      </header>
      <section className="section--tight section">
        <div className="container">
          <div style={{ marginBottom: 'clamp(32px, 4vw, 56px)' }}><NewsletterForm /></div>
          <div className="cards" data-stagger="0.08">
            <NewsCard a={lead} feature priority />
            {rest.map((a, i) => <NewsCard key={a.slug} a={a} priority={i < 2} />)}
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
