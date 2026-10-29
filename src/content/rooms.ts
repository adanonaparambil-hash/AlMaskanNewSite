// Room types, one page each under /rooms. The original site split every room into a company page (/facilities/…)
// and an individual page (/individuals/…); they are merged here, and the old URLs redirect (next.config.ts).
// No prices are shown anywhere on the site: every room offers "Get a quote" instead.

export type Room = {
  slug: string;
  group: 'shared' | 'premium';
  name: string;
  /** who the room is for — companies and individuals alike */
  forWho: string;
  code?: string;
  tagline: string;
  intro: string;
  image: string; // key in images.generated.json
  gallery: string[];
  specs: { label: string; value: string }[];
  booking: { label: string; text: string }[];
  amenities: string[];
  /** the room's value in the quote form's room choice (InquiryForm) */
  quote: 'Junior staff' | 'Single premium' | 'Double premium' | 'Triple premium';
};

const premiumIntro = 'Choose from Single, Double and Triple Premium rooms, each fully furnished for comfort and privacy.';

export const ROOMS: Room[] = [
  {
    slug: 'shared',
    group: 'shared',
    name: 'Shared Room',
    forWho: 'Teams and junior staff',
    tagline: 'Bunk rooms for up to ten in Wing 1 & 2, with meals, internet and laundry included.',
    intro:
      'A place to stay alongside fellow residents in a bunk room for up to ten people — for company workforces and individual junior staff alike. Every stay includes three meals daily, high-speed internet and a convenient laundry service.',
    image: 'acc.junior1',
    gallery: ['acc.junior2', 'acc.junior3', 'acc.juniorPlan'],
    specs: [
      { label: 'Wing', value: '1 & 2' },
      { label: 'Maximum occupancy', value: '10' },
      { label: 'Area of the room', value: '38.88 m²' },
      { label: 'Total count of rooms', value: '300+' },
    ],
    booking: [
      { label: 'Monthly', text: 'Designed for longer stays — whole rooms for a workforce, or a bed for one.' },
      { label: 'Flexible', text: 'Daily stays are available for under 30 days.' },
    ],
    amenities: [
      'Single-size beds or single-size bunk beds, for groups of four, five, eight or ten people — maximising space and budget.',
      'Shared bathrooms located outside the rooms.',
      'Daily housekeeping keeps rooms clean and organised.',
      'Linen changes available on request.',
      'Three meals daily — breakfast, lunch and dinner — are included.',
      '8 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout the stay.',
    ],
    quote: 'Junior staff',
  },
  {
    slug: 'single-premium',
    group: 'premium',
    name: 'Single Premium',
    forWho: 'Managers and senior staff',
    code: 'S1',
    tagline: 'A private, fully furnished room — your own cosy space after work.',
    intro:
      `${premiumIntro} The Single Premium gives a manager or senior staff member much-needed privacy and a space of their own after work, along with three meals daily, high-speed internet and free daily laundry service.`,
    image: 'acc.single',
    gallery: [],
    specs: [
      { label: 'Maximum occupancy', value: '1' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floor', value: '4th floor' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: [
      { label: 'Monthly', text: 'A private, fully furnished room for longer stays.' },
      { label: 'Flexible', text: 'Daily stays are available for under 30 days.' },
    ],
    amenities: [
      'Plush queen-size beds for a comfortable, rejuvenating sleep.',
      'L-shaped sofas and coffee tables create a relaxing atmosphere.',
      'Attached bathroom and washroom in each room guarantee privacy.',
      '55" LED television for movie nights.',
      'Free mini-bar, complimentary coffee and tea, and a kettle for instant hot drinks.',
      'Daily housekeeping keeps the room clean and organised.',
      'Room service during designated kitchen operating hours, adding a touch of hotel-like luxury.',
      'Electricity and water are included.',
      'Three meals daily — breakfast, lunch and dinner — are included.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout the stay.',
    ],
    quote: 'Single premium',
  },
  {
    slug: 'double-premium',
    group: 'premium',
    name: 'Double Premium',
    forWho: 'Managers and senior staff',
    code: 'S2',
    tagline: 'A fully furnished room for two — everything you need to feel at home.',
    intro:
      `${premiumIntro} The Double Premium is a shared room for two with everything needed to feel at home, along with three daily meals, high-speed internet and complimentary daily laundry service.`,
    image: 'acc.double',
    gallery: [],
    specs: [
      { label: 'Maximum occupancy', value: '2' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floor', value: '4th floor' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: [
      { label: 'Monthly', text: 'A shared, fully furnished room for two, for longer stays.' },
      { label: 'Flexible', text: 'Daily stays are available for under 30 days.' },
    ],
    amenities: [
      'Two single-size beds and a two-seater sofa with a coffee table.',
      'Attached bathroom and washroom for individual use.',
      'Complimentary daily housekeeping.',
      'Linen changed as and when required.',
      'Electricity and water are included.',
      'Three meals daily — breakfast, lunch and dinner — are included.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout the stay.',
    ],
    quote: 'Double premium',
  },
  {
    slug: 'triple-premium',
    group: 'premium',
    name: 'Triple Premium',
    forWho: 'Managers and senior staff',
    code: 'S3',
    tagline: 'Share the space, keep the comfort.',
    intro:
      `${premiumIntro} The Triple Premium is a shared room for three that keeps the comfort needed after working hours — plus three daily meals, high-speed internet and complimentary daily laundry service.`,
    image: 'acc.triple',
    gallery: [],
    specs: [
      { label: 'Maximum occupancy', value: '3' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floors', value: '1st to 3rd · 26 rooms each' },
      { label: 'Total count of rooms', value: '78' },
    ],
    booking: [
      { label: 'Monthly', text: 'A shared, fully furnished room for three, for longer stays.' },
      { label: 'Flexible', text: 'Daily stays are available for under 30 days.' },
    ],
    amenities: [
      'Three single-size beds.',
      'Attached bathroom and washroom for individual use.',
      'Complimentary daily housekeeping, primarily focused on cleaning.',
      'Linen changed as and when required.',
      'Electricity and water are included.',
      'Three meals daily — breakfast, lunch and dinner — are included.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout the stay.',
    ],
    quote: 'Triple premium',
  },
];

export const findRoom = (slug: string) => ROOMS.find((r) => r.slug === slug);
