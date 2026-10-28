import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ServicePage } from '@/components/pages';
import { findService, getContent, SERVICE_SLUGS } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

// The village services: /facilities/catering, /facilities/spaces and /facilities/lifestyle.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await getContent();
  const service = findService(c, slug);
  if (!service) return {};
  const alternates = alternatesFor(`/facilities/${slug}`, c.locale);
  return { title: service.title, description: service.seo, alternates, openGraph: { title: service.title, description: service.seo, url: alternates.canonical } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const service = findService(await getContent(), slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
