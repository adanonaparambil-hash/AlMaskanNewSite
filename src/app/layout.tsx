import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Ambient, WhatsAppButton } from '@/components/fx';
import Preloader from '@/components/Preloader';
import PageTransition from '@/components/PageTransition';
import MotionProvider from '@/components/MotionProvider';
import { SITE } from '@/content/site';
import './globals.css';

const display = Fraunces({ subsets: ['latin'], variable: '--f-display', axes: ['opsz'], style: ['normal', 'italic'], display: 'swap' });
const body = Manrope({ subsets: ['latin'], variable: '--f-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'en_OM',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [{ url: '/assets/hero/og.jpg', width: 1200, height: 630, alt: 'Aerial rendering of Al Maskaan Village' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/assets/logos/al-maskaan-village-mark.png', apple: '/assets/logos/al-maskaan-village-mark.png' },
};

export const viewport: Viewport = { themeColor: '#060e1c', colorScheme: 'dark', width: 'device-width', initialScale: 1 };

// Adds .motion-on before first paint (only when motion is allowed) so animated elements never flash unstyled,
// and .is-loading on the first page of a session so the preloader covers the page from the very first frame.
const motionGate = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var h=document.documentElement;h.classList.add('motion-on');if(!sessionStorage.getItem('amv-intro'))h.classList.add('is-loading')}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <noscript>
          <style>{`.motion-on [data-reveal],.motion-on [data-stagger-item],.motion-on [data-hero],.motion-on [data-timeline-item]{visibility:visible!important}`}</style>
        </noscript>
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Ambient />
        <Preloader />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <PageTransition />
        <WhatsAppButton />
        <MotionProvider />
      </body>
    </html>
  );
}
