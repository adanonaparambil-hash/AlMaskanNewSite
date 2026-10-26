import type { Metadata } from 'next';
import GalleryView from '@/components/GalleryView';
import { ContactBand } from '@/components/Footer';
import { Eyebrow } from '@/components/ui';
import { galleryFor } from '@/lib/images';
import { getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

const en = {
  metaTitle: 'Media gallery',
  metaDescription: 'Images of Al Maskaan Village — residential blocks, rooms, dining halls, retail, spaces and lifestyle facilities in Khazaen Economic City.',
  eyebrow: 'Welcome to',
  title: <>Our media <em>gallery</em></>,
  lead: 'Renderings and photographs of the village, its rooms and its shared spaces.',
  fine: 'Many images are architectural renderings, shown as published on the original website; some food photography is stock imagery.',
};
const ar: typeof en = {
  metaTitle: 'معرض الصور',
  metaDescription: 'صور قرية المسكن — المباني السكنية والغرف وقاعات الطعام والمتاجر والمساحات ومرافق أسلوب الحياة في مدينة خزائن الاقتصادية.',
  eyebrow: 'مرحباً بكم في',
  title: <>معرض <em>الصور</em></>,
  lead: 'تصاميم وصور فوتوغرافية للقرية وغرفها ومساحاتها المشتركة.',
  fine: 'كثير من الصور تصاميم معمارية معروضة كما نُشرت على الموقع الأصلي، وبعض صور الطعام من مكتبات الصور الجاهزة.',
};
const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/gallery', locale) };
}

export default async function GalleryPage() {
  const c = await getContent();
  const t = COPY[c.locale];
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="display display--xl" data-reveal="chars">{t.title}</h1>
            <p className="lead" data-reveal="fade" data-delay="0.15">{t.lead}</p>
          </div>
        </div>
      </header>
      <section className="section--tight section">
        <div className="container">
          <GalleryView items={galleryFor(c.locale)} />
          <p className="fine">{t.fine}</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
