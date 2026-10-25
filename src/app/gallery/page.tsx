import type { Metadata } from 'next';
import GalleryView from '@/components/GalleryView';
import { ContactBand } from '@/components/Footer';
import { Eyebrow, Heading } from '@/components/ui';
import { galleryItems } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Media gallery',
  description: 'Images of Al Maskaan Village — residential blocks, rooms, dining halls, retail, spaces and lifestyle facilities in Khazaen Economic City.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryPage() {
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>Welcome to</Eyebrow>
            <h1 className="display display--xl" data-reveal="chars">Our media <em>gallery</em></h1>
            <p className="lead" data-reveal="fade" data-delay="0.15">Renderings and photographs of the village, its rooms and its shared spaces.</p>
          </div>
        </div>
      </header>
      <section className="section--tight section">
        <div className="container">
          <GalleryView items={galleryItems} />
          <p className="fine">Many images are architectural renderings, shown as published on the original website; some food photography is stock imagery.</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
