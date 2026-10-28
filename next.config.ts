import type { NextConfig } from 'next';

// Original WordPress article slugs lived at the site root; they now live under /news/.
import news from './src/content/news.generated.json';

/**
 * Pages merged in the Rooms / Retail Spaces restructure → their new home. Each old URL redirects in a single hop:
 * for English (also the /en/ form, which would otherwise take a second hop through the proxy) and for Arabic.
 */
const MOVED: Record<string, string> = {
  '/individuals': '/rooms',
  '/facilities': '/rooms',
  '/individuals/junior-staff': '/rooms/shared',
  '/facilities/workers': '/rooms/shared',
  '/individuals/senior-staff-single-premium': '/rooms/single-premium',
  '/individuals/senior-staff-double-premium': '/rooms/double-premium',
  '/individuals/senior-staff-triple-premium': '/rooms/triple-premium',
  '/facilities/managers-single-premium': '/rooms/single-premium',
  '/facilities/managers-double-premium': '/rooms/double-premium',
  '/facilities/managers-triple-premium': '/rooms/triple-premium',
  '/individuals/business-owners': '/retail-spaces',
  '/individuals/residents': '/retail-spaces',
  '/facilities/retail-opportunities': '/retail-spaces',
  '/facilities/business-opportunities': '/retail-spaces',
  '/individuals/individuals-catering': '/facilities/catering',
  '/individuals/individuals-spaces': '/facilities/spaces',
  '/individuals/individuals-lifestyle': '/facilities/lifestyle',
};
const moved = Object.entries(MOVED).flatMap(([from, to]) => [
  { source: from, destination: to, permanent: true },
  { source: `/en${from}`, destination: to, permanent: true },
  { source: `/ar${from}`, destination: `/ar${to}`, permanent: true },
]);

const config: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 82],
    deviceSizes: [480, 768, 1024, 1440, 1920, 2400],
  },
  async redirects() {
    return [
      ...moved,
      ...(news as { slug: string }[]).map((n) => ({ source: `/${n.slug}`, destination: `/news/${n.slug}`, permanent: true })),
      { source: '/elevating-living-and-working', destination: '/about-us', permanent: true },
      // Account pages of the old WordPress membership plugin are not part of the new site.
      { source: '/login', destination: '/contact-us', permanent: false },
      { source: '/register', destination: '/contact-us', permanent: false },
      { source: '/dashboard', destination: '/contact-us', permanent: false },
      { source: '/account', destination: '/contact-us', permanent: false },
      { source: '/logout', destination: '/', permanent: false },
      { source: '/reset-password', destination: '/contact-us', permanent: false },
    ];
  },
};

export default config;
