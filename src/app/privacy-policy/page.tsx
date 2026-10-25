import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui';
import { SITE } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How this website handles the information you send us through the inquiry form.',
  alternates: { canonical: '/privacy-policy' },
};

// The original page was WordPress's unedited placeholder policy (comments, Gravatar, login cookies) and did not
// describe this business. This notice only describes what the new site actually does; see docs/reference-audit.md.
export default function PrivacyPage() {
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>Legal</Eyebrow>
            <h1 className="display display--xl" data-reveal="blur">Privacy <em>policy</em></h1>
          </div>
        </div>
      </header>
      <section className="section--tight section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="prose-page">
            <h2>Who we are</h2>
            <p>This website is operated for {SITE.name}, {SITE.operator}, {SITE.address.slice(2).join(', ')}.</p>
            <h2>Information you send us</h2>
            <p>
              When you use the inquiry form we receive the details you enter — your name, email address, optional phone number and organisation, the topic you choose, your message and — for accommodation inquiries — the optional room type, number of residents and preferred move-in date. We use them only to reply to your query or complaint.
              Your message is delivered to our team by email. Please do not include sensitive personal information in the message.
            </p>
            <h2>Cookies and tracking</h2>
            <p>This website does not set advertising or analytics cookies. There are no user accounts on this website.</p>
            <h2>Embedded video</h2>
            <p>
              Our film is hosted on YouTube. Nothing is loaded from YouTube until you press play; once you do, YouTube’s own privacy practices apply to that player.
            </p>
            <h2>Your choices</h2>
            <p>
              To ask what we hold about you, or to have your details deleted, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
              <a href={SITE.phones[0].href}>{SITE.phones[0].label}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
