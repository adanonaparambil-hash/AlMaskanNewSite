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

export const articles: Article[] = (raw as unknown as Omit<Article, 'image'>[])
  .map((a) => ({ ...a, image: newsImage(a.slug) }))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
