'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { localizeHref, type Locale } from './config';
import { UI_STRINGS, type UI } from './ui';

type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };
/** What the server hands to client components: plain data only (the interface strings contain functions, so the
 *  client imports them itself and picks them by language). */
export type ClientI18n = {
  locale: Locale;
  nav: readonly NavItem[];
  site: { name: string; email: string; responseTime: string; phones: readonly { label: string; href: string }[] };
};

const Ctx = createContext<(ClientI18n & { ui: UI }) | null>(null);

export function I18nProvider({ value, children }: { value: ClientI18n; children: ReactNode }) {
  return <Ctx.Provider value={{ ...value, ui: UI_STRINGS[value.locale] }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useI18n must be used inside <I18nProvider>');
  return { ...v, href: (path: string) => localizeHref(path, v.locale) };
}
