import type { Metadata } from 'next';
import InquiryForm from '@/components/InquiryForm';
import { Eyebrow } from '@/components/ui';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact us',
  description: `Contact Al Maskaan Village in Khazaen Economic City, Barka: call ${SITE.phones[0].label}, email ${SITE.email}, or send an inquiry. We typically answer within ${SITE.responseTime}.`,
  alternates: { canonical: '/contact-us' },
};

export default function ContactPage() {
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>Contact us</Eyebrow>
            <h1 className="display display--xl" data-reveal="chars">Tell us what you <em>need</em></h1>
            <p className="lead" data-reveal="fade" data-delay="0.15">Tell us briefly about your enterprise and the ways we can help you. We typically answer queries within {SITE.responseTime}.</p>
          </div>
        </div>
      </header>
      <section className="section--tight section" style={{ paddingTop: 0 }}>
        <div className="container contact">
          <div className="contact__info">
            <h2 className="sr-only">Contact details</h2>
            <div className="info-block" data-reveal="fade">
              <h3>Call</h3>
              <ul>{SITE.phones.map((p) => <li key={p.href}><a href={p.href}>{p.label}</a></li>)}</ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Email</h3>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Visit</h3>
              <address>{SITE.address.map((l) => <span key={l}>{l}</span>)}</address>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Chat &amp; reviews</h3>
              <ul><li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.phones[1].label}</a></li><li><a href={SITE.reviews} target="_blank" rel="noopener noreferrer">Google Reviews</a></li></ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>Follow</h3>
              <ul>{SITE.social.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
            </div>
          </div>
          <div className="contact__form glass" data-reveal="fade">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
