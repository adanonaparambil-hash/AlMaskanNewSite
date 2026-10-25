import type { Metadata } from 'next';
import { Overview } from '@/components/overview';

export const metadata: Metadata = {
  title: 'For individuals — your home away from home',
  description:
    'Secure, comfortable and affordable accommodation for individuals at Al Maskaan Village, with three daily meals, shopping, recreation and community on site in Khazaen Economic City.',
  alternates: { canonical: '/individuals' },
};

export default function Page() {
  return (
    <Overview
      audience="individuals"
      title={<>Your home <em>away</em> from home</>}
      lead="Everything you need to unwind and enjoy your time, close to your workplace."
      heroImage="life.garden"
      introTitle={<>Everything you need to <em>unwind</em></>}
      introBody={[
        'Step into the comfort of Al Maskaan Village — a modern oasis designed to bring you peace and relaxation after a long day of work. Situated conveniently close to your workplace, we offer secure and comfortable accommodation, meticulously designed to cater to your every need.',
        'Whether you are an Omani citizen or an expatriate seeking a haven of tranquillity, Al Maskaan Village provides everything you need to unwind and enjoy your time away from work. Let our warm hospitality and vibrant community embrace you, making your stay a truly rewarding experience.',
      ]}
      rooms={[
        { href: '/individuals/junior-staff', title: 'Junior Staff', tag: 'Wing 1 & 2', text: 'A place to stay alongside other residents in a bunk room for ten, with meals, internet and laundry included.', image: 'acc.junior1' },
        { href: '/individuals/senior-staff-single-premium', title: 'Senior Staff · Single Premium', tag: 'S1', text: 'Privacy and your own cosy after-work space.', image: 'acc.single' },
        { href: '/individuals/senior-staff-double-premium', title: 'Senior Staff · Double Premium', tag: 'S2', text: 'A space for two, with everything you need to feel at home.', image: 'acc.double' },
        { href: '/individuals/senior-staff-triple-premium', title: 'Senior Staff · Triple Premium', tag: 'S3', text: 'Share the space, reduce the rent, keep the comfort.', image: 'acc.triple' },
      ]}
      services={[
        { href: '/individuals/residents', title: 'Retail', text: 'Shopping, money exchange, medicines, cafes and restaurants within a short stroll.', image: 'retail.frontage' },
        { href: '/individuals/business-owners', title: 'Business owners', text: 'Retail and office units for entrepreneurs and established companies.', image: 'retail.office' },
        { href: '/individuals/individuals-catering', title: 'Catering', text: 'Three daily meals are included in your rental rate.', image: 'cat.hall' },
        { href: '/individuals/individuals-spaces', title: 'Spaces', text: 'Rooms for business meetings and personal celebrations.', image: 'spaces.cafe2' },
        { href: '/individuals/individuals-lifestyle', title: 'Lifestyle', text: 'Football, tennis and badminton, a gym, cafes and a recreation hall.', image: 'life.courts' },
      ]}
    />
  );
}
