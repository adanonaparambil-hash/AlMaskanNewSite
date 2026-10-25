import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactBand } from '@/components/Footer';
import { PageHero } from '@/components/ui';
import { CLIENTS } from '@/content/services';
import { img } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Clients',
  description: 'Companies that have chosen Al Maskaan Village for their workforce accommodation and business presence in Khazaen Economic City.',
  alternates: { canonical: '/clients' },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero fx="scale" glow="var(--glow-green)"
        eyebrow="Clients"
        title={<>Companies that <em>call</em> the village home</>}
        lead="Organisations that have chosen Al Maskaan Village for their people and their business."
        image={img('acc.block')}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Clients' }]}
      />
      <section className="section--tight section" aria-label="Client logos">
        <div className="container">
          <ul className="logos" data-stagger="0.08">
            {CLIENTS.map((c) => (
              <li key={c.name} data-stagger-item>
                <Image src={c.file} alt={c.name} width={320} height={240} sizes="(min-width: 900px) 20vw, 45vw" style={{ width: 'auto', height: 'auto', maxHeight: '100%' }} />
              </li>
            ))}
          </ul>
          <p className="fine">Logos are the property of their respective owners and are shown with reference to the client list on the original Al Maskaan Village website.</p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
