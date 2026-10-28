import type { Metadata } from 'next';
import { ContactBand } from '@/components/Footer';
import { PageHero } from '@/components/ui';
import { alternatesFor } from '@/i18n/config';
import { getContent } from '@/i18n/server';

const en = {
  metaTitle: 'Masterplan explorer',
  metaDescription: 'Explore Al Maskaan Village from above: an interactive aerial masterplan you can pan and zoom, and a scroll-controlled video tour of the site and its surroundings.',
  eyebrow: 'Masterplan',
  title: <>See the village <em>from above</em></>,
  lead: 'Drag, zoom and click through the aerial masterplan, or switch to the video tour and scroll through the site and its surroundings.',
  frame: 'Interactive masterplan and video tour of Al Maskaan Village',
  open: 'Open full screen',
  hint: 'On a phone, open it full screen for the best view.',
};
const ar: typeof en = {
  metaTitle: 'مستكشف المخطط العام',
  metaDescription: 'استكشف قرية المسكن من الأعلى: مخطط عام جوي تفاعلي يمكنك تحريكه وتكبيره، وجولة فيديو تتحكم بها بالتمرير في الموقع ومحيطه.',
  eyebrow: 'المخطط العام',
  title: <>شاهد القرية <em>من الأعلى</em></>,
  lead: 'اسحب وكبّر وانقر في المخطط العام الجوي، أو انتقل إلى جولة الفيديو وتصفّح الموقع ومحيطه بالتمرير.',
  frame: 'المخطط العام التفاعلي وجولة الفيديو لقرية المسكن',
  open: 'فتح بملء الشاشة',
  hint: 'على الهاتف، افتحه بملء الشاشة للحصول على أفضل عرض.',
};
const COPY = { en, ar };
const EXPLORER = '/explorer/index.html';

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/masterplan', locale) };
}

export default async function MasterplanPage() {
  const c = await getContent();
  const t = COPY[c.locale];
  return (
    <>
      <PageHero fx="scale" glow="var(--glow-green)"
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        crumbs={[{ label: c.ui.home, href: '/' }, { label: t.eyebrow }]}
      />
      <section className="section--tight section" aria-label={t.frame}>
        {/* the explorer is a self-contained page (its own pan/zoom and video scrubbing), kept apart from the site's
            scroll motion; it runs edge to edge so the map gets the whole screen width */}
        <div className="explorer" data-reveal="fade">
          <iframe src={EXPLORER} title={t.frame} loading="lazy" allow="fullscreen" allowFullScreen />
        </div>
        <div className="container">
          <p className="explorer__bar">
            <span className="fine">{t.hint}</span>
            <a className="btn btn--line" href={EXPLORER} target="_blank" rel="noopener">{t.open}</a>
          </p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
