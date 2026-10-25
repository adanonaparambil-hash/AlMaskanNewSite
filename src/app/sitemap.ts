import type { MetadataRoute } from 'next';
import { ROOMS } from '@/content/rooms';
import { SERVICES } from '@/content/services';
import { SITE } from '@/content/site';
import { articles } from '@/lib/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => SITE.url + p;
  const fixed = ['/', '/about-us', '/facilities', '/individuals', '/clients', '/news', '/gallery', '/contact-us', '/privacy-policy'];
  return [
    ...fixed.map((p) => ({ url: u(p), changeFrequency: 'monthly' as const, priority: p === '/' ? 1 : 0.7 })),
    ...ROOMS.map((r) => ({ url: u(`/${r.audience}/${r.slug}`), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...SERVICES.map((s) => ({ url: u(`/${s.audience}/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...articles.map((a) => ({ url: u(`/news/${a.slug}`), lastModified: a.date, changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
