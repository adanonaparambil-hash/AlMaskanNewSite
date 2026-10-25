import type { NextConfig } from 'next';

// Original WordPress article slugs lived at the site root; they now live under /news/.
import news from './src/content/news.generated.json';

const config: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 82],
    deviceSizes: [480, 768, 1024, 1440, 1920, 2400],
  },
  async redirects() {
    return [
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
