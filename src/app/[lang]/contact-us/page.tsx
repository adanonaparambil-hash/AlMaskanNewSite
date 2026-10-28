import type { Metadata } from 'next';
import InquiryForm from '@/components/InquiryForm';
import { Eyebrow } from '@/components/ui';
import { alternatesFor } from '@/i18n/config';
import { getContent, type Content } from '@/i18n/server';

const en = {
  metaTitle: 'Contact us',
  metaDescription: (s: Content['site']) =>
    `Contact Al Maskaan Village in Khazaen Economic City, Barka: call ${s.phones[0].label}, email ${s.email}, or send an inquiry. We typically answer within ${s.responseTime}.`,
  eyebrow: 'Contact us',
  title: <>Tell us what you <em>need</em></>,
  lead: (time: string) => `Tell us briefly about your enterprise and the ways we can help you. We typically answer queries within ${time}.`,
  details: 'Contact details',
  call: 'Call',
  email: 'Email',
  visit: 'Visit',
  chat: 'Chat & reviews',
  whatsapp: 'WhatsApp',
  reviews: 'Google Reviews',
  follow: 'Follow',
};
const ar: typeof en = {
  metaTitle: 'تواصل معنا',
  metaDescription: (s) =>
    `تواصل مع قرية المسكن في مدينة خزائن الاقتصادية، بركاء: اتصل على ${s.phones[0].label}، أو راسلنا على ${s.email}، أو أرسل استفساراً. نرد عادةً خلال ${s.responseTime}.`,
  eyebrow: 'تواصل معنا',
  title: <>أخبرنا بما <em>تحتاج إليه</em></>,
  lead: (time) => `حدّثنا باختصار عن مؤسستك وعن الطرق التي يمكننا من خلالها مساعدتك. نرد عادةً على الاستفسارات خلال ${time}.`,
  details: 'بيانات التواصل',
  call: 'اتصل بنا',
  email: 'البريد الإلكتروني',
  visit: 'زورونا',
  chat: 'المحادثة والتقييمات',
  whatsapp: 'واتساب',
  reviews: 'تقييمات Google',
  follow: 'تابعونا',
};
const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const t = COPY[c.locale];
  return { title: t.metaTitle, description: t.metaDescription(c.site), alternates: alternatesFor('/contact-us', c.locale) };
}

export default async function ContactPage() {
  const c = await getContent();
  const t = COPY[c.locale];
  const site = c.site;
  return (
    <>
      <header className="phero">
        <div className="container phero__grid">
          <div className="phero__copy">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="display display--xl" data-reveal="chars">{t.title}</h1>
            <p className="lead" data-reveal="fade" data-delay="0.15">{t.lead(site.responseTime)}</p>
          </div>
        </div>
      </header>
      <section className="section--tight section" style={{ paddingTop: 0 }}>
        <div className="container contact">
          <div className="contact__info">
            <h2 className="sr-only">{t.details}</h2>
            <div className="info-block" data-reveal="fade">
              <h3>{t.call}</h3>
              <ul>{site.phones.map((p) => <li key={p.href}><a href={p.href} dir="ltr">{p.label}</a></li>)}</ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.email}</h3>
              <a href={`mailto:${site.email}`} dir="ltr">{site.email}</a>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.visit}</h3>
              <address>{site.address.map((l) => <span key={l}>{l}</span>)}</address>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.chat}</h3>
              <ul><li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer">{t.whatsapp} <span dir="ltr">{site.phones[1].label}</span></a></li><li><a href={site.reviews} target="_blank" rel="noopener noreferrer">{t.reviews}</a></li></ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.follow}</h3>
              <ul>{site.social.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
            </div>
          </div>
          <div id="inquiry" className="contact__form glass" data-reveal="fade">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
