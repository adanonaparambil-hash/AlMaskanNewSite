// Every redirect of the site in one list, used by next.config.ts (Vercel / Node) and by scripts/build-cpanel.mjs
// (written into .htaccess for cPanel hosting). Each old URL reaches its new page in a single hop.
import news from './src/content/news.generated.json' with { type: 'json' };

/** Pages merged in the Rooms / Retail Spaces restructure → their new home (English, /en and Arabic forms). */
const MOVED = {
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

/** @type {{ source: string; destination: string; permanent: boolean }[]} */
export const REDIRECTS = [
  ...Object.entries(MOVED).flatMap(([from, to]) => [
    { source: from, destination: to, permanent: true },
    { source: `/en${from}`, destination: to, permanent: true },
    { source: `/ar${from}`, destination: `/ar${to}`, permanent: true },
  ]),
  // original WordPress article slugs lived at the site root; they now live under /news/
  ...news.map((n) => ({ source: `/${n.slug}`, destination: `/news/${n.slug}`, permanent: true })),
  { source: '/elevating-living-and-working', destination: '/about-us', permanent: true },
  // account pages of the old WordPress membership plugin are not part of the new site
  { source: '/login', destination: '/contact-us', permanent: false },
  { source: '/register', destination: '/contact-us', permanent: false },
  { source: '/dashboard', destination: '/contact-us', permanent: false },
  { source: '/account', destination: '/contact-us', permanent: false },
  { source: '/logout', destination: '/', permanent: false },
  { source: '/reset-password', destination: '/contact-us', permanent: false },
];
