import type { Metadata } from 'next';
import { ContactBand } from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import NewsCard from '@/components/NewsCard';
import { Eyebrow } from '@/components/ui';
import { articles } from '@/lib/news';

export const metadata: Metadata = {
  title: 'News and announcements',
  description: 'Announcements from Al Maskaan Village and Khazaen Economic City — partnerships, new services, community milestones and market insights.',
  alternates: { canonical: '/news' },
};

export default function NewsPage() {
  const [lead, ...rest] = articles;
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>Stay informed</Eyebrow>
            <h1 className="display display--xl" data-reveal="scale">Latest <em>news</em></h1>
            <p className="lead" data-reveal="fade" data-delay="0.15">Partnerships, new services and milestones from the village and from Khazaen Economic City.</p>
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
