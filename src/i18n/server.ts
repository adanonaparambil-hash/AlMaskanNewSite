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
  site: siteEn.SITE, nav: siteEn.NAV, footerLinks: siteEn.FOOTER_LINKS, haven: siteEn.HAVEN, story: siteEn.STORY,
  facts: siteEn.FACTS, group: siteEn.GROUP,
  rooms: roomsEn, services: servicesEn, about: aboutEn, clients: clientsEn, articles: buildArticles(newsEn), ui: UI_STRINGS.en,
};

const AR: Content = {
  locale: 'ar', dir: 'rtl',
  site: siteAr.SITE, nav: siteAr.NAV, footerLinks: siteAr.FOOTER_LINKS, haven: siteAr.HAVEN, story: siteAr.STORY,
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

export const roomsFor = (c: Content, audience: Room['audience']) => c.rooms.filter((r) => r.audience === audience);
export const findRoom = (c: Content, audience: Room['audience'], slug: string) => c.rooms.find((r) => r.audience === audience && r.slug === slug);
export const servicesFor = (c: Content, audience: Service['audience']) => c.services.filter((s) => s.audience === audience);
export const findService = (c: Content, audience: Service['audience'], slug: string) => c.services.find((s) => s.audience === audience && s.slug === slug);
