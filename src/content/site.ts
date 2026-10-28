// Business facts, navigation and contact details taken from the original almaskaanvillage.com
// (footer, contact popup, homepage). See docs/content-inventory.md for the page-by-page mapping.

export const SITE = {
  name: 'Al Maskaan Village',
  arabicName: 'قرية المسكن',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://almaskaanvillage.com',
  tagline: 'Elevating Living and Working',
  description:
    'Al Maskaan Village is a community-oriented, mixed-use worker accommodation development in Khazaen Economic City, Barka, on the Muscat–Batinah Expressway in Oman.',
  operator: 'Adrak Facilities and Services LLC (AFS)',
  group: 'Adrak Group of Companies',
  address: ['Al Maskaan Village', 'Adrak Facilities and Services LLC (AFS)', 'Khazaen Economic City, Barka', 'P.O. Box 1465, PC 130', 'Sultanate of Oman'],
  phones: [
    { label: '+968 2200 1300', href: 'tel:+96822001300' },
    { label: '+968 7847 7776', href: 'tel:+96878477776' },
  ],
  email: 'operations@almaskaanvillage.com',
  whatsapp: 'https://wa.me/96878477776',
  reviews: 'https://maps.app.goo.gl/FuiPUcVvjxrRTQ3n8',
  responseTime: '24 working hours',
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
    label: 'For Companies',
    href: '/facilities',
    children: [
      { label: 'Overview', href: '/facilities', note: 'The complete workforce solution' },
      { label: 'Workers', href: '/facilities/workers', note: 'Wing 1 & 2 · shared rooms' },
      { label: 'Managers', href: '/facilities/managers-single-premium', note: 'Single, double and triple premium' },
      { label: 'Retail opportunities', href: '/facilities/retail-opportunities' },
      { label: 'Business opportunities', href: '/facilities/business-opportunities', note: 'Retail and office units' },
      { label: 'Catering', href: '/facilities/catering' },
      { label: 'Spaces', href: '/facilities/spaces' },
      { label: 'Lifestyle', href: '/facilities/lifestyle' },
    ],
  },
  {
    label: 'For Individuals',
    href: '/individuals',
    children: [
      { label: 'Overview', href: '/individuals', note: 'Your home away from home' },
      { label: 'Junior staff', href: '/individuals/junior-staff' },
      { label: 'Senior staff', href: '/individuals/senior-staff-single-premium', note: 'Single, double and triple premium' },
      { label: 'Residents', href: '/individuals/residents', note: 'Shopping and services' },
      { label: 'Business owners', href: '/individuals/business-owners' },
      { label: 'Catering', href: '/individuals/individuals-catering' },
      { label: 'Spaces', href: '/individuals/individuals-spaces' },
      { label: 'Lifestyle', href: '/individuals/individuals-lifestyle' },
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
    { label: 'Facilities', href: '/facilities' },
    { label: 'Individuals', href: '/individuals' },
    { label: 'Clients', href: '/clients' },
    { label: 'News', href: '/news' },
    { label: 'Media gallery', href: '/gallery' },
    { label: 'Masterplan', href: '/masterplan' },
    { label: 'Contact us', href: '/contact-us' },
  ],
  stay: [
    { label: 'Accommodation', href: '/individuals/junior-staff' },
    { label: 'Retail', href: '/individuals/residents' },
    { label: 'Catering', href: '/individuals/individuals-catering' },
    { label: 'Spaces', href: '/individuals/individuals-spaces' },
    { label: 'Lifestyle', href: '/individuals/individuals-lifestyle' },
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
    individuals: '/individuals/junior-staff',
    companies: '/facilities/workers',
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
    individuals: '/individuals/residents',
    companies: '/facilities/retail-opportunities',
  },
  {
    key: 'catering',
    ask: "Are you a company in need of catering services that elevate your events and leave a lasting impression, or an individual looking for a seamless, delectable culinary experience? Check out what we can offer you.",
    tagline: "Savor Convenience with Al Maskaan Catering: Delicious Meals Included in Your Stay",
    name: 'Catering',
    color: '#c81828',
    mark: '/assets/logos/amv-mark-catering.png',
    blurb: 'Three daily meals included in the stay, and bespoke catering for meetings, conferences and celebrations.',
    image: 'cat.hallBig',
    individuals: '/individuals/individuals-catering',
    companies: '/facilities/catering',
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
    individuals: '/individuals/individuals-spaces',
    companies: '/facilities/spaces',
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
    individuals: '/individuals/individuals-lifestyle',
    companies: '/facilities/lifestyle',
  },
] as const;

/** Milestones as shown on the current homepage (2022–2023). The legacy /elevating-living-and-working page
 *  carried different placeholder-looking years (2000/2010/2015/2021) — flagged in docs/reference-audit.md. */
export const STORY = [
  { year: '2022', title: 'AFS wins the pitch to start the project' },
  { year: '2022', title: 'Completion of the project’s concept and design' },
  { year: '2022', title: 'Commencement of construction works' },
  { year: '2023', title: 'The project is named Al Maskaan Village' },
] as const;

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
