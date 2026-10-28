// Server-side access to the current language and its content. The language comes from the root [lang] segment
// (next/root-params), so any Server Component can call these without props being passed down.
import { lang } from 'next/root-params';
import * as siteEn from '@/content/site';
import * as siteAr from '@/content/site.ar';
import { ROOMS as roomsEn, type Room } from '@/content/rooms';
import { ROOMS as roomsAr } from '@/content/rooms.ar';
import { ABOUT as aboutEn, CLIENTS as clientsEn, SERVICES as servicesEn, type Service } from '@/content/services';
import { ABOUT as aboutAr, SERVICES as servicesAr } from '@/content/services.ar';
import newsEn from '@/content/news.generated.json';
import newsAr from '@/content/news.ar.json';
import { buildArticles, type Article } from '@/lib/news';
import { DEFAULT_LOCALE, dirOf, isLocale, type Locale } from './config';
import { UI_STRINGS, type UI } from './ui';

/** Literal types of the English `as const` data widened to plain strings/numbers, so translations fit the same shape. */
type Widen<T> = T extends string ? string : T extends number ? number : T extends readonly (infer U)[] ? readonly Widen<U>[] : T extends object ? { readonly [K in keyof T]: Widen<T[K]> } : T;

export type Content = {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  site: Widen<typeof siteEn.SITE>;
  nav: siteEn.NavItem[];
  footerLinks: Widen<typeof siteEn.FOOTER_LINKS>;
  haven: Widen<typeof siteEn.HAVEN>;
  story: Widen<typeof siteEn.STORY>;
  storyNow: string;
  facts: Widen<typeof siteEn.FACTS>;
  group: Widen<typeof siteEn.GROUP>;
  rooms: Room[];
  services: Service[];
  about: Widen<typeof aboutEn>;
  clients: Widen<typeof clientsEn>;
  articles: Article[];
  ui: UI;
};

const EN: Content = {
  locale: 'en', dir: 'ltr',
  site: siteEn.SITE, nav: siteEn.NAV, footerLinks: siteEn.FOOTER_LINKS, haven: siteEn.HAVEN, story: siteEn.STORY, storyNow: siteEn.STORY_NOW,
  facts: siteEn.FACTS, group: siteEn.GROUP,
  rooms: roomsEn, services: servicesEn, about: aboutEn, clients: clientsEn, articles: buildArticles(newsEn), ui: UI_STRINGS.en,
};

const AR: Content = {
  locale: 'ar', dir: 'rtl',
  site: siteAr.SITE, nav: siteAr.NAV, footerLinks: siteAr.FOOTER_LINKS, haven: siteAr.HAVEN, story: siteAr.STORY, storyNow: siteAr.STORY_NOW,
  facts: siteAr.FACTS, group: siteAr.GROUP,
  // client names stay as the companies write them (their logos carry the same names)
  rooms: roomsAr, services: servicesAr, about: aboutAr, clients: clientsEn, articles: buildArticles(newsAr), ui: UI_STRINGS.ar,
};

export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export async function getContent(): Promise<Content> {
  return (await getLocale()) === 'ar' ? AR : EN;
}

export const contentFor = (locale: Locale): Content => (locale === 'ar' ? AR : EN);
export { dirOf };

export const findRoom = (c: Content, slug: string) => c.rooms.find((r) => r.slug === slug);

/** The village services, one page each at /facilities/<slug>. */
export const SERVICE_SLUGS = ['catering', 'spaces', 'lifestyle'] as const;

/**
 * A service page: the original company page with the individuals' page for the same service folded in (their
 * sections and pictures follow), now that the site no longer splits pages by audience.
 */
export function findService(c: Content, slug: string): Service | undefined {
  if (!(SERVICE_SLUGS as readonly string[]).includes(slug)) return undefined;
  const base = c.services.find((s) => s.audience === 'facilities' && s.slug === slug);
  if (!base) return undefined;
  const extra = c.services.find((s) => s.audience === 'individuals' && s.slug === `individuals-${slug}`);
  return {
    ...base,
    eyebrow: base.eyebrow.split('·').pop()!.trim(),
    gallery: [...new Set([...base.gallery, ...(extra?.gallery ?? [])])],
    sections: [...base.sections, ...(extra?.sections ?? []).filter((x) => !base.sections.some((b) => b.title === x.title))],
  };
}
export const servicePages = (c: Content) => SERVICE_SLUGS.map((slug) => findService(c, slug)!);

/** Source copy for /retail-spaces: the former business-opportunities and residents pages. */
export const retailSource = (c: Content) => ({
  business: c.services.find((s) => s.slug === 'business-opportunities')!,
  residents: c.services.find((s) => s.slug === 'residents')!,
});
