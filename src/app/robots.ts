import type { MetadataRoute } from 'next';
import { SITE } from '@/content/site';

// generated once at build time (also required for the static cPanel export)
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }], sitemap: `${SITE.url}/sitemap.xml` };
}
