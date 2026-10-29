// Business facts, navigation and contact details taken from the original almaskaanvillage.com
// (footer, contact popup, homepage). See docs/content-inventory.md for the page-by-page mapping.

export const SITE = {
  name: 'Al Maskaan Village',
  arabicName: 'قرية المسكن',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://almaskaanvillage.com',
  tagline: 'Elevating Living and Working',
  /** search and social title (after the site name) */
  metaTitle: 'Integrated Workforce Living in Khazaen Economic City, Oman',
  description:
    'Furnished executive and team residences for companies and individuals in Khazaen Economic City, Barka, with daily or monthly stays, room-only to full-board buffet dining, laundry, retail, meeting spaces and recreation on the Muscat–Batinah Expressway.',
  operator: 'Adrak Facilities and Services LLC (AFS)',
  group: 'Adrak Group of Companies',
  address: ['Al Maskaan Village', 'Adrak Facilities and Services LLC (AFS)', 'Khazaen Economic City, Barka', 'P.O. Box 1465, PC 130', 'Sultanate of Oman'],
  phones: [
    { label: '+968 2200 1300', href: 'tel:+96822001300' },
    { label: '+968 7847 7776', href: 'tel:+96878477776' },
  ],
  email: 'operations@almaskaanvillage.com',
  whatsapp: 'https://wa.me/96878477776',
  reviews: 'https://maps.app.goo.gl/2mk2L5cP3F1qkVeY9',
  responseTime: 'one working day',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/almaskaanoman/' },
    { label: 'Facebook', href: 'https://www.facebook.com/almaskaanvillage' },
    { label: 'Instagram', href: 'https://www.instagram.com/almaskaanvillage' },
    { label: 'YouTube', href: 'https://www.youtube.com/@AlMaskaanVillage' },
  ],
  video: { id: 'ngpgxRNUFh4', title: 'Al Maskaan Village film' },
} as const;

export type NavItem = { label: string; href: string; children?: { label: string; href: string; note?: string }[] };

export const NAV: NavItem[] = [
  { label: 'About', href: '/about-us' },
  {
    label: 'Rooms',
    href: '/rooms',
    children: [
      { label: 'All rooms', href: '/rooms', note: 'For companies and individuals' },
      { label: 'Executive Single (S1)', href: '/rooms/single-premium', note: 'Managers and professionals · Liwan Building' },
      { label: 'Executive Twin (S2)', href: '/rooms/double-premium', note: 'Managers and professionals · Liwan Building' },
      { label: 'Executive Triple (S3)', href: '/rooms/triple-premium', note: 'Managers and professionals · Liwan Building' },
      { label: 'Team Residences – Shared Room', href: '/rooms/shared', note: 'Site and operations teams · 5, 8 or 10 per room · Majan 1' },
      { label: 'Team Residences – Individual Bedspace', href: '/rooms/individual-bedspace', note: 'Single bedspace in a shared room · Majan 1' },
      { label: 'Team Residences – Basic Room', href: '/rooms/basic-room', note: '10 bunk beds · monthly, room only · Majan 2' },
    ],
  },
  { label: 'Retail Spaces', href: '/retail-spaces' },
  {
    label: 'Services',
    href: '/facilities/catering',
    children: [
      { label: 'Catering', href: '/facilities/catering', note: 'Three dining outlets · HACCP certified' },
      { label: 'Spaces', href: '/facilities/spaces', note: 'Meeting rooms and venues' },
      { label: 'Lifestyle', href: '/facilities/lifestyle', note: 'Sports, gym and green spaces' },
    ],
  },
  { label: 'Clients', href: '/clients' },
  { label: 'News', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Masterplan', href: '/masterplan' },
];

export const FOOTER_LINKS = {
  main: [
    { label: 'About us', href: '/about-us' },
    { label: 'Rooms', href: '/rooms' },
    { label: 'Retail Spaces', href: '/retail-spaces' },
    { label: 'Clients', href: '/clients' },
    { label: 'News', href: '/news' },
    { label: 'Media gallery', href: '/gallery' },
    { label: 'Masterplan', href: '/masterplan' },
    { label: 'Contact us', href: '/contact-us' },
  ],
  stay: [
    { label: 'Accommodation', href: '/rooms' },
    { label: 'Retail', href: '/retail-spaces' },
    { label: 'Catering', href: '/facilities/catering' },
    { label: 'Spaces', href: '/facilities/spaces' },
    { label: 'Lifestyle', href: '/facilities/lifestyle' },
  ],
};

/** The “Haven of Five” — the five service lines of the village, each with its logo colour. */
export const HAVEN = [
  {
    key: 'accommodation',
    ask: "Are you a company seeking workforce accommodation that fosters employee satisfaction and loyalty, or an individual seeking a convenient, comfortable, and fulfilling living space? Explore your options now.",
    tagline: "Select what works better for you",
    name: 'Accommodation',
    color: '#789848',
    mark: '/assets/logos/amv-mark-accommodation.png',
    blurb: 'Furnished rooms for individuals and company workforces, from shared bunk rooms to private premium rooms.',
    image: 'acc.single',
    href: '/rooms',
  },
  {
    key: 'retail',
    ask: "Are you looking for a strategic space to grow your business in a thriving community, or shops designed to cater to your unique needs? Discover the tailored offerings waiting for you.",
    tagline: "Al Maskaan Retail offers residents a one-stop shopping experience, and business owners the opportunity to cater to this experience.",
    name: 'Retail',
    color: '#8c8c8c',
    mark: '/assets/logos/amv-mark-retail.png',
    blurb: 'A one-stop shopping experience for residents, and a captive market for business owners.',
    image: 'retail.frontage',
    href: '/retail-spaces',
  },
  {
    key: 'catering',
    ask: "Are you a company in need of catering services that elevate your events and leave a lasting impression, or an individual looking for a seamless, delectable culinary experience? Check out what we can offer you.",
    tagline: "Savor Convenience with Al Maskaan Catering: Buffet Meal Plans for Every Stay",
    name: 'Catering',
    color: '#c81828',
    mark: '/assets/logos/amv-mark-catering.png',
    blurb: 'Buffet meal plans from Room Only to Full Board, and bespoke catering for meetings, conferences and celebrations.',
    image: 'cat.hallBig',
    href: '/facilities/catering',
  },
  {
    key: 'spaces',
    ask: "Are you planning any type of business meetings, corporate gatherings, or professional functions? Uncover the perfect venue for your event.",
    tagline: "Elevate your business and personal gatherings at Al Maskaan Spaces.",
    name: 'Spaces',
    color: '#9858a8',
    mark: '/assets/logos/amv-mark-spaces.png',
    blurb: 'Meeting rooms and versatile venues for business gatherings, presentations and personal celebrations.',
    image: 'spaces.cafe',
    href: '/facilities/spaces',
  },
  {
    key: 'lifestyle',
    ask: "Does your company care to provide post-work relaxation and recreational activities, or are you a hardworking individual eager for well-being and leisure? Dive into our array of lifestyle possibilities.",
    tagline: "With Al Maskaan Lifestyle: Live Well, Work Smart, Connect Deeply",
    name: 'Lifestyle',
    color: '#d88808',
    mark: '/assets/logos/amv-mark-lifestyle.png',
    blurb: 'Sports courts, green spaces, a gym, cafes and a recreation hall that build real community.',
    image: 'life.courts',
    href: '/facilities/lifestyle',
  },
] as const;

/** Milestones, one row per year. 2022–2023 from the original homepage; 2024 from the village's own news posts
 *  (opening in June 2024; supermarket, clinic, ATM and exchange partnerships). Add 2025 here when AMV supplies it. */
export const STORY = [
  { year: '2022', title: 'AFS wins the pitch, completes the concept and design, and starts construction' },
  { year: '2023', title: 'The project is named Al Maskaan Village' },
  { year: '2024', title: 'The village opens to its first residents, followed by a supermarket, clinic, Bank Muscat ATM and Joyalukkas Exchange' },
] as const;
/** The timeline's last row, always dated with the current year (see CurrentYear). */
export const STORY_NOW = 'Today, home to more than 1,300 residents in over 400 rooms';

export const FACTS = [
  { value: 3000, suffix: '+', label: 'Junior staff accommodations' },
  { value: 1000, suffix: '+', label: 'Senior staff accommodations' },
  { value: 3900, suffix: '+', unit: 'm²', label: 'Catering spaces' },
  { value: 2000, suffix: '+', unit: 'm²', label: 'Retail spaces' },
  { value: 5000, suffix: '+', unit: 'm²', label: 'Office spaces' },
  { value: 9000, suffix: '+', unit: 'm²', label: 'Lifestyle spaces' },
  { value: 300, suffix: '+', label: 'Vehicle parking spaces' },
] as const;

/** Parent group facts — from the management-team biographies on the original About page. */
export const GROUP = {
  name: 'Adrak Group of Companies',
  lead: 'Al Maskaan Village is developed and operated by Adrak Facilities and Services LLC (AFS), part of the Adrak Group, which delivers engineering and construction services with operations and projects across the Sultanate of Oman.',
  stats: [
    { value: 6000, prefix: '≈', suffix: '', label: 'Group employees' },
    { value: 1, prefix: 'USD ', suffix: 'bn+', label: 'Group order book' },
    { value: 10000, prefix: '', suffix: '+', label: 'Guests served by the group’s centralised kitchen' },
  ],
  note: 'Figures as stated in the management biographies on the original website.',
};
