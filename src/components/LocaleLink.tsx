'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useI18n } from '@/i18n/client';

/** next/link that keeps the visitor in their language: internal paths get the /ar prefix on Arabic pages. */
export default function LocaleLink({ href, ...rest }: ComponentProps<typeof Link>) {
  const { href: localize } = useI18n();
  return <Link href={typeof href === 'string' ? localize(href) : href} {...rest} />;
}
