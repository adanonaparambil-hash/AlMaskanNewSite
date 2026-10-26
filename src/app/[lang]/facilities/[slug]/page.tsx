import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RoomPage, ServicePage } from '@/components/pages';
import { roomsFor } from '@/content/rooms';
import { servicesFor } from '@/content/services';
import { findRoom, findService, getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

const AUD = 'facilities' as const;
type Props = { params: Promise<{ slug: string }> };

const COPY = {
  en: { roomTitle: (name: string) => name + ' — accommodation' },
  ar: { roomTitle: (name: string) => name + ' — السكن' },
};

export function generateStaticParams() {
  return [...roomsFor(AUD), ...servicesFor(AUD)].map((x) => ({ slug: x.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const room = findRoom(c, AUD, slug);
  const service = findService(c, AUD, slug);
  const path = `/${AUD}/${slug}`;
  const alternates = alternatesFor(path, c.locale);
  if (room) {
    const t = COPY[c.locale].roomTitle(room.name);
    return { title: t, description: room.tagline + ' ' + room.intro.slice(0, 120), alternates, openGraph: { title: t, url: alternates.canonical } };
  }
  if (service) return { title: service.title, description: service.seo, alternates, openGraph: { title: service.title, description: service.seo, url: alternates.canonical } };
  return {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = await getContent();
  const room = findRoom(c, AUD, slug);
  if (room) return <RoomPage room={room} />;
  const service = findService(c, AUD, slug);
  if (service) return <ServicePage service={service} />;
  notFound();
}
