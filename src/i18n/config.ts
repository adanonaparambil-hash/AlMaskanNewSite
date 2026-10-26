// Languages of the site. English keeps its original URLs (/about-us); Arabic lives under /ar (/ar/about-us).
// The proxy rewrites unprefixed paths to the internal /en segment, so both render from app/[lang].

export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);
export const dirOf = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

const UNLOCALIZED = ['/api/', '/assets/', '/_next/'];

/** An internal path as it should appear in a link for this language. External, tel:, mailto: and hash links pass through. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE || !href.startsWith('/') || href.startsWith('//')) return href;
  if (href === '/ar' || href.startsWith('/ar/') || href.startsWith('/ar#') || UNLOCALIZED.some((p) => href.startsWith(p))) return href;
  if (href === '/') return '/ar';
  if (href.startsWith('/#') || href.startsWith('/?')) return `/ar${href.slice(1)}`;
  return `/ar${href}`;
}

/** The current page in the other language. Accepts the browser path or the internal one (on English pages
 *  usePathname() reports the rewritten /en/… path), so both language prefixes are stripped first. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const m = pathname.match(/^\/(?:ar|en)(?=\/|$)/);
  const bare = m ? pathname.slice(m[0].length) || '/' : pathname;
  return localizeHref(bare, to);
}

/** Canonical + hreflang alternates for a page path given in its English (unprefixed) form. */
export function alternatesFor(path: string, locale: Locale) {
  return {
    canonical: localizeHref(path, locale),
    languages: { en: path, ar: localizeHref(path, 'ar'), 'x-default': path },
  };
}
