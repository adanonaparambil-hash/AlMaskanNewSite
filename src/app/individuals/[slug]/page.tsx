import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RoomPage, ServicePage } from '@/components/pages';
import { findRoom, roomsFor } from '@/content/rooms';
import { findService, servicesFor } from '@/content/services';

const AUD = 'individuals' as const;
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [...roomsFor(AUD), ...servicesFor(AUD)].map((x) => ({ slug: x.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = findRoom(AUD, slug);
  const service = findService(AUD, slug);
  const path = `/${AUD}/${slug}`;
  if (room) {
    const t = room.name + ' — accommodation';
    return { title: t, description: room.tagline + ' ' + room.intro.slice(0, 120), alternates: { canonical: path }, openGraph: { title: t, url: path } };
  }
  if (service) return { title: service.title, description: service.seo, alternates: { canonical: path }, openGraph: { title: service.title, description: service.seo, url: path } };
  return {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const room = findRoom(AUD, slug);
  if (room) return <RoomPage room={room} />;
  const service = findService(AUD, slug);
  if (service) return <ServicePage service={service} />;
  notFound();
}
