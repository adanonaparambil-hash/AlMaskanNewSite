import type { MetadataRoute } from 'next';
import { ROOMS } from '@/content/rooms';
import { SERVICES } from '@/content/services';
import { SITE } from '@/content/site';
import { localizeHref } from '@/i18n/config';
import { articles } from '@/lib/news';

/** Every page in English (unprefixed) and Arabic (/ar), each entry listing both languages as alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => SITE.url + p;
  const both = (path: string, extra: Omit<MetadataRoute.Sitemap[number], 'url' | 'alternates'>) => {
    const alternates = { languages: { en: u(path), ar: u(localizeHref(path, 'ar')) } };
    return [
      { url: u(path), alternates, ...extra },
      { url: u(localizeHref(path, 'ar')), alternates, ...extra },
    ];
  };
  const fixed = ['/', '/about-us', '/facilities', '/individuals', '/clients', '/news', '/gallery', '/masterplan', '/contact-us', '/privacy-policy'];
  return [
    ...fixed.flatMap((p) => both(p, { changeFrequency: 'monthly', priority: p === '/' ? 1 : 0.7 })),
    ...ROOMS.flatMap((r) => both(`/${r.audience}/${r.slug}`, { changeFrequency: 'monthly', priority: 0.6 })),
    ...SERVICES.flatMap((s) => both(`/${s.audience}/${s.slug}`, { changeFrequency: 'monthly', priority: 0.6 })),
    ...articles.flatMap((a) => both(`/news/${a.slug}`, { lastModified: a.date, changeFrequency: 'yearly', priority: 0.5 })),
  ];
}
