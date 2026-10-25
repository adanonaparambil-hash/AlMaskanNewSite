import data from '@/content/images.generated.json';

export type Img = { src: string; w: number; h: number; alt: string };
type GalleryItem = Img & { cat: string };

const images = data.images as Record<string, Img>;
const news = data.news as Record<string, { src: string; w: number; h: number }>;

/** Look up a curated image by key (see scripts/build-assets.mjs). Throws loudly in dev so no path ever goes missing. */
export function img(key: string): Img {
  const v = images[key];
  if (!v) throw new Error(`Unknown image key: ${key}`);
  return v;
}

export function newsImage(slug: string) {
  return news[slug] ?? null;
}

export const galleryItems = data.gallery as GalleryItem[];
