import Image from 'next/image';
import Link from 'next/link';
import { FOOTER_LINKS, SITE } from '@/content/site';
import type { CSSProperties } from 'react';
import { Arrow, Button, Eyebrow } from './ui';
import { BackToTop, VillageClock } from './FooterBits';

export function ContactBand() {
  return (
    <section className="band" aria-labelledby="band-title">
      <div className="container"><div className="band__grid glass sheen" data-glow>
        <div>
          <Eyebrow>Talk to us</Eyebrow>
          <h2 id="band-title" className="display display--lg" data-reveal="lines">
            We typically answer queries within {SITE.responseTime}.
          </h2>
        </div>
        <div className="band__actions" data-reveal="fade">
          <Button href="/contact-us" variant="light">Get in touch</Button>
          <a className="band__tel" href={SITE.phones[0].href}>{SITE.phones[0].label}</a>
        </div>
      </div></div>
    </section>
  );
}

const HAVEN_DOTS = ['var(--c-acc)', 'var(--c-ret)', 'var(--c-cat)', 'var(--c-spa)', 'var(--c-lif)'];

export default function Footer() {
  return (
    <footer className="footer" data-footer>
      <div className="footer__spectrum" aria-hidden="true" />

      <div className="container footer__head" data-footer-rise>
        <div className="footer__brand">
          <Image className="footer__logo" src="/assets/logos/al-maskaan-village-logo.png" alt="Al Maskaan Village" width={300} height={84} sizes="180px" />
          <p>{SITE.tagline}. A community-oriented, mixed-use worker accommodation development in Khazaen Economic City, Oman.</p>
          <ul className="footer__social" aria-label="Social media">
            {SITE.social.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </div>
        <Link href="/contact-us" className="footer__orb" data-magnetic="" aria-label="Get in touch">
          <svg className="footer__orb-ring" viewBox="0 0 200 200" aria-hidden="true">
            <defs><path id="orb-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            <text><textPath href="#orb-path">Get in touch · Make an inquiry · Get in touch · Make an inquiry ·</textPath></text>
          </svg>
          <span className="footer__orb-core" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><path d="M6 20L20 6M9 6h11v11" stroke="currentColor" strokeWidth="1.6" /></svg>
          </span>
        </Link>
      </div>

      <div className="container" data-footer-rise>
        <div className="footer__panel glass" data-glow>
          <nav className="footer__col" aria-label="Footer — main">
            <h2>Main</h2>
            <ul>{FOOTER_LINKS.main.map((l) => <li key={l.href}><Link className="footer__link" href={l.href}><span>{l.label}</span><Arrow /></Link></li>)}</ul>
          </nav>

          <nav className="footer__col" aria-label="Footer — stay with us">
            <h2>Haven of five</h2>
            <ul>
              {FOOTER_LINKS.stay.map((l, i) => (
                <li key={l.href}>
                  <Link className="footer__link" href={l.href} style={{ '--c': HAVEN_DOTS[i % HAVEN_DOTS.length] } as CSSProperties}>
                    <i className="footer__dot" aria-hidden="true" /><span>{l.label}</span><Arrow />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2>Address</h2>
            <address>
              {SITE.address.map((l) => <span key={l}>{l}</span>)}
            </address>
            <a className="footer__map tlink" href={SITE.reviews} target="_blank" rel="noopener noreferrer"><span>Find us on the map</span><Arrow /></a>
          </div>

          <div className="footer__col">
            <h2>Contact us</h2>
            <ul className="footer__contact">
              {SITE.phones.map((p) => <li key={p.href}><a className="footer__big" href={p.href}>{p.label}</a></li>)}
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li className="footer__chips">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a href={SITE.reviews} target="_blank" rel="noopener noreferrer">Google Reviews</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="footer__mark" data-fill aria-hidden="true"><span>Al Maskaan <em>Village</em></span></p>

      <div className="container footer__legal">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved. Operated by {SITE.operator}, part of the {SITE.group}.</p>
        <VillageClock />
        <div className="footer__legal-links">
          <Link href="/privacy-policy">Privacy policy</Link>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
