import type { Metadata, Viewport } from 'next';
import { Fraunces, IBM_Plex_Sans_Arabic, Manrope, Noto_Kufi_Arabic } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Ambient, WhatsAppButton } from '@/components/fx';
import Preloader from '@/components/Preloader';
import PageTransition from '@/components/PageTransition';
import MotionProvider from '@/components/MotionProvider';
import { I18nProvider } from '@/i18n/client';
import { alternatesFor, LOCALES } from '@/i18n/config';
import { getContent } from '@/i18n/server';
import { SITE } from '@/content/site';
import './globals.css';

const display = Fraunces({ subsets: ['latin'], variable: '--f-display', axes: ['opsz'], style: ['normal', 'italic'], display: 'swap' });
const body = Manrope({ subsets: ['latin'], variable: '--f-body', display: 'swap' });
// Arabic faces (only downloaded on pages that render Arabic glyphs)
const displayAr = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--f-display-ar', display: 'swap' });
const bodyAr = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['300', '400', '500', '600', '700'], variable: '--f-body-ar', display: 'swap' });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata(): Promise<Metadata> {
  const { site, locale } = await getContent();
  return {
    metadataBase: new URL(SITE.url),
    title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
    description: site.description,
    applicationName: site.name,
    alternates: alternatesFor('/', locale),
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: locale === 'ar' ? 'ar_OM' : 'en_OM',
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      images: [{ url: '/assets/hero/og.jpg', width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image' },
    icons: { icon: '/assets/logos/al-maskaan-village-mark.png', apple: '/assets/logos/al-maskaan-village-mark.png' },
  };
}

export const viewport: Viewport = { themeColor: '#060e1c', colorScheme: 'dark', width: 'device-width', initialScale: 1 };

// Adds .motion-on before first paint (only when motion is allowed) so animated elements never flash unstyled,
// and .is-loading on the first page of a session so the preloader covers the page from the very first frame.
const motionGate = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var h=document.documentElement;h.classList.add('motion-on');if(!sessionStorage.getItem('amv-intro'))h.classList.add('is-loading')}}catch(e){}`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent();
  const client = {
    locale: c.locale,
    nav: c.nav,
    site: { name: c.site.name, email: c.site.email, responseTime: c.site.responseTime, phones: c.site.phones },
  };
  return (
    <html lang={c.locale} dir={c.dir} className={`${display.variable} ${body.variable} ${displayAr.variable} ${bodyAr.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <noscript>
          <style>{`.motion-on [data-reveal],.motion-on [data-stagger-item],.motion-on [data-hero],.motion-on [data-timeline-item]{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body>
        <I18nProvider value={client}>
          <a className="skip" href="#main">{c.ui.skip}</a>
          <Ambient />
          <Preloader />
          <Header />
          <main id="main" tabIndex={-1}>{children}</main>
          <Footer />
          <PageTransition />
          <WhatsAppButton />
          <MotionProvider />
        </I18nProvider>
      </body>
    </html>
  );
}
