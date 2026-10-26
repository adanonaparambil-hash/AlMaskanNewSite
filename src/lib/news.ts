import raw from '@/content/news.generated.json';
import { newsImage } from './images';

export type Block =
  | { type: 'p' | 'h' | 'q'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'img'; src: string; file: string };

export type Article = {
  slug: string;
  title: string;
  date: string;
  originalUrl: string;
  excerpt: string;
  blocks: Block[];
  image: { src: string; w: number; h: number } | null;
};

/** Articles from a generated news file (English, or its Arabic translation with the same slugs), newest first. */
export const buildArticles = (source: unknown): Article[] =>
  (source as Omit<Article, 'image'>[])
    .map((a) => ({ ...a, image: newsImage(a.slug) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

/** English articles — slugs are identical in every language (sitemap, redirects, static params). */
export const articles: Article[] = buildArticles(raw);

export const findArticle = (list: Article[], slug: string) => list.find((a) => a.slug === slug);

/** "11 November 2024" / "11 نوفمبر 2024" — Western digits in both languages. */
export const formatDate = (iso: string, locale: 'en' | 'ar' = 'en') =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString(locale === 'ar' ? 'ar-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
