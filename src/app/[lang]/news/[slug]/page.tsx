import type { Metadata } from 'next';
import Image from 'next/image';
import Link from '@/components/LocaleLink';
import { notFound } from 'next/navigation';
import { ContactBand } from '@/components/Footer';
import { Eyebrow } from '@/components/ui';
import { articles, findArticle, formatDate } from '@/lib/news';
import { getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

type Props = { params: Promise<{ slug: string }> };

const en = {
  news: 'News',
  eyebrow: 'News & announcements',
  more: 'More news',
  newer: 'Newer',
  older: 'Older',
};
const ar: typeof en = {
  news: 'الأخبار',
  eyebrow: 'الأخبار والإعلانات',
  more: 'المزيد من الأخبار',
  newer: 'الأحدث',
  older: 'الأقدم',
};
const COPY = { en, ar };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const a = findArticle(c.articles, slug);
  if (!a) return {};
  const alternates = alternatesFor(`/news/${a.slug}`, c.locale);
  return {
    title: a.title,
    description: a.excerpt,
    alternates,
    openGraph: { type: 'article', title: a.title, description: a.excerpt, publishedTime: a.date, url: alternates.canonical, locale: c.locale === 'ar' ? 'ar_OM' : 'en_GB', images: a.image ? [{ url: a.image.src, width: a.image.w, height: a.image.h }] : undefined },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const c = await getContent();
  const t = COPY[c.locale];
  const list = c.articles;
  const a = findArticle(list, slug);
  if (!a) notFound();
  const i = list.findIndex((x) => x.slug === slug);
  const newer = list[i - 1];
  const older = list[i + 1];

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: a.title,
    inLanguage: c.locale,
    datePublished: a.date,
    image: a.image ? c.site.url + a.image.src : undefined,
    publisher: { '@type': 'Organization', name: c.site.name },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article>
        <header className="phero">
          <div className="container" style={{ maxWidth: 1100 }}>
            <nav aria-label={c.ui.breadcrumb} className="crumbs" style={{ marginBottom: 24 }}>
              <ol>
                <li><Link href="/">{c.ui.home}</Link></li>
                <li><Link href="/news">{t.news}</Link></li>
              </ol>
            </nav>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="display display--xl" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 4.2rem)' }} data-reveal="blur">{a.title}</h1>
            <p className="article-meta" style={{ marginTop: 28 }}><time dateTime={a.date}>{formatDate(a.date, c.locale)}</time></p>
          </div>
        </header>

        {a.image && (
          <div className="container" style={{ maxWidth: 1100 }}>
            <div className="media" style={{ aspectRatio: `${a.image.w} / ${a.image.h}`, maxHeight: 620 }} data-reveal="mask">
              <div className="media__inner">
                <Image src={a.image.src} alt="" fill sizes="(min-width: 1100px) 1000px, 100vw" priority quality={80} style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        )}

        <div className="section--tight section">
          <div className="container">
            <div className="article">
              {a.blocks.map((b, k) => {
                if (b.type === 'h') return <h2 key={k} dangerouslySetInnerHTML={{ __html: b.text }} />;
                if (b.type === 'q') return <blockquote key={k} className="quote__text" style={{ marginTop: '1.6em' }} dangerouslySetInnerHTML={{ __html: b.text }} />;
                if (b.type === 'ul') return <ul key={k}>{b.items.map((t, j) => <li key={j} dangerouslySetInnerHTML={{ __html: t }} />)}</ul>;
                if (b.type === 'p') return <p key={k} dangerouslySetInnerHTML={{ __html: b.text }} />;
                return null;
              })}
              <hr className="divider" style={{ margin: '56px 0 32px' }} />
              <nav className="pager" aria-label={t.more}>
                {newer ? <Link href={`/news/${newer.slug}`}><small>{t.newer}</small><span>{newer.title}</span></Link> : <span />}
                {older ? <Link href={`/news/${older.slug}`}><small>{t.older}</small><span>{older.title}</span></Link> : <span />}
              </nav>
            </div>
          </div>
        </div>
      </article>
      <ContactBand />
    </>
  );
}
