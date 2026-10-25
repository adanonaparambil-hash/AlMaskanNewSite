import type { Metadata } from 'next';
import { Overview } from '@/components/overview';

export const metadata: Metadata = {
  title: 'Facilities for companies',
  description:
    'Workforce housing without the stress: contemporary, convenient and cost-effective accommodation, catering, retail, venues and recreation for company workforces at Al Maskaan Village, Khazaen Economic City.',
  alternates: { canonical: '/facilities' },
};

export default function Page() {
  return (
    <Overview
      audience="facilities"
      title={<>No more accommodation worries: your workforce is <em>housed</em></>}
      lead="Forget the stress of managing employee housing. We offer a complete solution that goes beyond rooms."
      heroImage="acc.tower"
      introTitle={<>Contemporary, convenient and <em>cost-effective</em></>}
      introBody={[
        'Experience contemporary, convenient and cost-effective accommodation that transitions seamlessly from work to genuine home-away-from-home comfort. Our offering goes beyond well-appointed rooms and cleverly designed bunks to include three daily catering options, on-site shops and cafes, and recreational facilities — so your workforce has everything they need to relax and recharge.',
        'We also offer versatile business venues for meetings and corporate gatherings. We are a haven of five, carefully designed to help your company thrive.',
        'Step into the comfort of Al Maskaan Village — a modern oasis near your workplace, with secure, comfortable accommodation for Omani citizens and expatriates alike.',
      ]}
      rooms={[
        { href: '/facilities/workers', title: 'Workers', tag: 'Wing 1 & 2', text: 'Shared bunk rooms for ten, with meals, internet and laundry included in a monthly package.', image: 'acc.junior1' },
        { href: '/facilities/managers-single-premium', title: 'Managers · Single Premium', tag: 'S1', text: 'A private, fully furnished room for senior staff.', image: 'acc.single' },
        { href: '/facilities/managers-double-premium', title: 'Managers · Double Premium', tag: 'S2', text: 'A shared, fully furnished room for two.', image: 'acc.double' },
        { href: '/facilities/managers-triple-premium', title: 'Managers · Triple Premium', tag: 'S3', text: 'A shared, fully furnished room for three.', image: 'acc.triple' },
      ]}
      services={[
        { href: '/facilities/retail-opportunities', title: 'Retail', text: 'Groceries, money exchange, cafes and more — a short stroll from every room.', image: 'retail.frontage' },
        { href: '/facilities/business-opportunities', title: 'Business opportunities', text: 'Retail units from 43.15 m² and offices from 98.4 m².', image: 'retail.office' },
        { href: '/facilities/catering', title: 'Catering', text: 'Three daily meals plus bespoke catering for meetings, conferences and celebrations.', image: 'cat.hallBig' },
        { href: '/facilities/spaces', title: 'Spaces', text: 'Meeting rooms and venues with modern technology and support.', image: 'spaces.cafe' },
        { href: '/facilities/lifestyle', title: 'Lifestyle', text: 'Courts, green space, a gym, cafes and a recreation hall.', image: 'life.courts' },
      ]}
    />
  );
}
