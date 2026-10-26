import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactBand } from '@/components/Footer';
import { PageHero } from '@/components/ui';
import { alternatesFor } from '@/i18n/config';
import { getContent } from '@/i18n/server';
import { img } from '@/lib/images';

const en = {
  metaTitle: 'Clients',
  metaDescription: 'Companies that have chosen Al Maskaan Village for their workforce accommodation and business presence in Khazaen Economic City.',
  eyebrow: 'Clients',
  title: <>Companies that <em>call</em> the village home</>,
  lead: 'Organisations that have chosen Al Maskaan Village for their people and their business.',
  logosLabel: 'Client logos',
  fine: 'Logos are the property of their respective owners and are shown with reference to the client list on the original Al Maskaan Village website.',
};
const ar: typeof en = {
  metaTitle: 'العملاء',
  metaDescription: 'شركات اختارت قرية المسكن لسكن قواها العاملة ولحضورها التجاري في مدينة خزائن الاقتصادية.',
  eyebrow: 'العملاء',
  title: <>شركات <em>تتخذ</em> من القرية موطناً</>,
  lead: 'مؤسسات اختارت قرية المسكن لموظفيها ولأعمالها.',
  logosLabel: 'شعارات العملاء',
  fine: 'الشعارات ملك لأصحابها، وتُعرض استناداً إلى قائمة العملاء الواردة في الموقع الأصلي لقرية المسكن.',
};
const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/clients', locale) };
}

export default async function ClientsPage() {
  const c = await getContent();
  const t = COPY[c.locale];
  return (
    <>
      <PageHero fx="scale" glow="var(--glow-green)"
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image={img('acc.block')}
        crumbs={[{ label: c.ui.home, href: '/' }, { label: t.eyebrow }]}
      />
      <section className="section--tight section" aria-label={t.logosLabel}>
        <div className="container">
          <ul className="logos" data-stagger="0.08">
            {c.clients.map((cl) => (
              <li key={cl.name} data-stagger-item>
                <Image src={cl.file} alt={cl.name} width={320} height={240} sizes="(min-width: 900px) 20vw, 45vw" style={{ width: 'auto', height: 'auto', maxHeight: '100%' }} />
              </li>
            ))}
          </ul>
          <p className="fine">{t.fine}</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
