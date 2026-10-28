import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RoomPage } from '@/components/pages';
import { ROOMS } from '@/content/rooms';
import { findRoom, getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

type Props = { params: Promise<{ slug: string }> };

const COPY = {
  en: { title: (name: string) => `${name} — rooms` },
  ar: { title: (name: string) => `${name} — الغرف` },
};

export function generateStaticParams() {
  return ROOMS.map((r) => ({ slug: r.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const room = findRoom(c, slug);
  if (!room) return {};
  const title = COPY[c.locale].title(room.name);
  const alternates = alternatesFor(`/rooms/${slug}`, c.locale);
  return { title, description: `${room.tagline} ${room.intro.slice(0, 120)}`, alternates, openGraph: { title, url: alternates.canonical } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const room = findRoom(await getContent(), slug);
  if (!room) notFound();
  return <RoomPage room={room} />;
}
