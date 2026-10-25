// Accommodation categories and details — transcribed from the original /individuals/* and /facilities/* pages.
// Copy is edited lightly for grammar and flow; numbers are unchanged.

export type Rate = { label: string; value: string; note?: string };
export type Room = {
  slug: string; // same slug as the original page
  audience: 'individuals' | 'facilities';
  group: 'junior' | 'senior' | 'managers' | 'workers';
  name: string;
  code?: string;
  tagline: string;
  intro: string;
  image: string; // key in images.generated.json
  gallery: string[];
  specs: { label: string; value: string }[];
  booking: { label: string; text: string }[];
  amenities: string[];
  rates: Rate[];
  total: { label: string; value: string; note: string };
  rateNote?: string;
};

const FULL_OCC = '*Rates assume the room is fully occupied at maximum capacity.';

const bunkAmenities = [
  'Single-size beds or single-size bunk beds, for groups of four, five, eight or ten people — maximising space and budget.',
  'Shared bathrooms located outside the rooms.',
  'Daily housekeeping keeps rooms clean and organised.',
  'Linen changes available on request.',
];

export const ROOMS: Room[] = [
  {
    slug: 'junior-staff',
    audience: 'individuals',
    group: 'junior',
    name: 'Junior Staff',
    tagline: 'A place to stay among fellow residents — with everything you need included.',
    intro:
      'What we offer is a place to stay alongside other residents in a bunk room for ten. Your booking also includes three meals daily, high-speed internet and a convenient laundry service.',
    image: 'acc.junior1',
    gallery: ['acc.junior2', 'acc.junior3', 'acc.juniorPlan'],
    specs: [
      { label: 'Wing', value: '1 & 2' },
      { label: 'Maximum occupancy', value: '10' },
      { label: 'Area of the room', value: '38.88 m²' },
      { label: 'Total count of rooms', value: '300+' },
    ],
    booking: [
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
      { label: 'Monthly', text: 'Designed for longer stays and for your accommodation peace of mind.' },
    ],
    amenities: [
      ...bunkAmenities,
      'Three meals daily — breakfast, lunch and dinner — are included in the rate.',
      '8 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout your stay.',
    ],
    rates: [
      { label: 'Room', value: 'OMR 280.000*', note: 'plus VAT · per month for ten sharing' },
      { label: 'Food', value: 'OMR 45.000*', note: 'plus VAT · per person per month' },
      { label: 'Laundry & misc.', value: 'OMR 5.000*', note: 'plus VAT · per person per month' },
    ],
    total: { label: 'Total package', value: 'OMR 780.000*', note: 'plus VAT · one room, for ten, per month' },
    rateNote: FULL_OCC,
  },
  {
    slug: 'senior-staff-single-premium',
    audience: 'individuals',
    group: 'senior',
    name: 'Senior Staff · Single Premium',
    code: 'S1',
    tagline: 'Privacy, and your own cosy after-work space.',
    intro:
      'This gives you much-needed privacy and your own cosy space after work, along with three meals daily, high-speed internet and free daily laundry service.',
    image: 'acc.single',
    gallery: ['acc.single2'],
    specs: [
      { label: 'Maximum occupancy', value: '1' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floor', value: '4th floor' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: [
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
      { label: 'Monthly', text: 'Consider it for longer stays and potential discounts on rates.' },
    ],
    amenities: [
      'Plush queen-size beds for a comfortable, rejuvenating sleep.',
      'L-shaped sofas and coffee tables create a relaxing atmosphere.',
      'Attached bathroom and washroom in each room guarantee privacy.',
      '55" LED television for movie nights.',
      'Free mini-bar, complimentary coffee and tea, and a kettle for instant hot drinks.',
      'Daily housekeeping keeps the room clean and organised.',
      'Room service during designated kitchen operating hours, adding a touch of hotel-like luxury.',
      'Room rate includes electricity and water.',
      'Three meals daily — breakfast, lunch and dinner — are included in the rate.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout your stay.',
    ],
    rates: [
      { label: 'Room', value: 'OMR 305.000', note: 'plus VAT · per month' },
      { label: 'Food', value: 'OMR 45.000', note: 'plus VAT · per month' },
      { label: 'Laundry & misc.', value: 'Free', note: '' },
    ],
    total: { label: 'Total package', value: 'OMR 350.000', note: 'plus VAT · one room, for one, per month' },
  },
  {
    slug: 'senior-staff-double-premium',
    audience: 'individuals',
    group: 'senior',
    name: 'Senior Staff · Double Premium',
    code: 'S2',
    tagline: 'Everything you need to feel at home — including great company.',
    intro:
      'In this space for two you have everything you need to feel at home, with three daily meals, high-speed internet and complimentary daily laundry service.',
    image: 'acc.double',
    gallery: [],
    specs: [
      { label: 'Maximum occupancy', value: '2' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floor', value: '4th floor' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: [
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
      { label: 'Monthly', text: 'A good option to obtain favourable rates.' },
    ],
    amenities: [
      'Two single-size beds and a two-seater sofa with a coffee table.',
      'Attached bathroom and washroom for individual use.',
      'Complimentary daily housekeeping.',
      'Linen changed as and when required.',
      'Room rate includes electricity and water.',
      'Three meals daily — breakfast, lunch and dinner — are included in the rate.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout your stay.',
    ],
    rates: [
      { label: 'Room', value: 'OMR 270.000*', note: 'plus VAT · per month' },
      { label: 'Food', value: 'OMR 45.000*', note: 'plus VAT · per person, per month' },
      { label: 'Laundry & misc.', value: 'OMR 5.000*', note: 'plus VAT · per person, per month' },
    ],
    total: { label: 'Total package', value: 'OMR 370.000*', note: 'plus VAT · one room, for two, per month' },
    rateNote: FULL_OCC,
  },
  {
    slug: 'senior-staff-triple-premium',
    audience: 'individuals',
    group: 'senior',
    name: 'Senior Staff · Triple Premium',
    code: 'S3',
    tagline: 'Share the space, reduce the rent, keep the comfort.',
    intro:
      'Convenience comes in different forms. Share your space to reduce your rental fees, while keeping the comfort you need after working hours — plus three daily meals, high-speed internet and complimentary daily laundry service.',
    image: 'acc.triple',
    gallery: [],
    specs: [
      { label: 'Maximum occupancy', value: '3' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floors', value: '1st to 3rd · 26 rooms each' },
      { label: 'Total count of rooms', value: '78' },
    ],
    booking: [
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
      { label: 'Monthly', text: 'Helps you secure advantageous rates.' },
    ],
    amenities: [
      'Three single-size beds.',
      'Attached bathroom and washroom for individual use.',
      'Complimentary daily housekeeping, primarily focused on cleaning.',
      'Linen changed as and when required.',
      'Room rate includes electricity and water.',
      'Three meals daily — breakfast, lunch and dinner — are included in the rate.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout your stay.',
    ],
    rates: [
      { label: 'Room', value: 'OMR 260.000*', note: 'plus VAT · per month' },
      { label: 'Food', value: 'OMR 45.000*', note: 'plus VAT · per person, per month' },
      { label: 'Laundry & misc.', value: 'OMR 5.000*', note: 'plus VAT · per person, per month' },
    ],
    total: { label: 'Total package', value: 'OMR 410.000*', note: 'plus VAT · one room, for three, per month' },
    rateNote: FULL_OCC,
  },

  // ---- For companies ------------------------------------------------------------------------
  {
    slug: 'workers',
    audience: 'facilities',
    group: 'workers',
    name: 'Workers',
    tagline: 'Wing 1 & 2 — shared bunk rooms for ten, with meals and laundry included.',
    intro:
      'Rent bunks for ten people at a competitive monthly rate. Packages include three meals daily, high-speed internet and a convenient laundry service.',
    image: 'acc.junior1',
    gallery: ['acc.junior2', 'acc.junior3', 'acc.juniorPlan'],
    specs: [
      { label: 'Wing', value: '1 & 2' },
      { label: 'Maximum occupancy', value: '10' },
      { label: 'Area of the room', value: '38.88 m²' },
      { label: 'Total count of rooms', value: '300+' },
    ],
    booking: [
      { label: 'Monthly', text: 'Rent a bunk room for ten people at a competitive monthly rate. Includes three meals daily, high-speed internet and convenient laundry service.' },
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
    ],
    amenities: bunkAmenities,
    rates: [
      { label: 'Room', value: 'OMR 280.000*', note: 'plus VAT · per month for ten sharing' },
      { label: 'Food', value: 'OMR 45.000*', note: 'plus VAT · per person per month' },
      { label: 'Laundry & misc.', value: 'OMR 5.000*', note: 'plus VAT · per person per month' },
    ],
    total: { label: 'Total package', value: 'OMR 780.000*', note: 'plus VAT · one room, for ten, per month' },
    rateNote: FULL_OCC,
  },
  {
    slug: 'managers-single-premium',
    audience: 'facilities',
    group: 'managers',
    name: 'Managers · Single Premium',
    code: 'S1',
    tagline: 'Offer your senior staff a private, fully furnished room.',
    intro:
      'Three options are available — Single Premium, Double Premium and Triple Premium rooms — all equipped to provide comfort and functionality. Offer your senior staff a private, fully furnished room at convenient monthly rates, including three meals daily, high-speed internet and free daily laundry service.',
    image: 'acc.single',
    gallery: ['acc.single2'],
    specs: [
      { label: 'Maximum occupancy', value: '1' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floor', value: '4th floor' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: [
      { label: 'Monthly', text: 'A private, fully furnished room at convenient monthly rates.' },
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
    ],
    amenities: [
      'Plush queen-size beds for a comfortable, rejuvenating sleep.',
      'L-shaped sofas and coffee tables create a relaxing atmosphere.',
      'Attached bathrooms and washrooms in each room guarantee privacy and comfort.',
      '55" LED televisions.',
      'Free mini-bar, complimentary coffee and tea, and a kettle.',
      'Daily housekeeping keeps the room clean and organised.',
      'Room service during designated kitchen operating hours.',
      'Room rate includes electricity and water.',
      'Three meals daily — breakfast, lunch and dinner — are included in the rate.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout the stay.',
    ],
    rates: [
      { label: 'Room', value: 'OMR 305.000', note: 'plus VAT · per month' },
      { label: 'Food', value: 'OMR 45.000', note: 'plus VAT · per month' },
      { label: 'Laundry & misc.', value: 'Free', note: '' },
    ],
    total: { label: 'Total package', value: 'OMR 350.000', note: 'plus VAT · one room, for one, per month' },
  },
  {
    slug: 'managers-double-premium',
    audience: 'facilities',
    group: 'managers',
    name: 'Managers · Double Premium',
    code: 'S2',
    tagline: 'A shared, fully furnished room for two senior staff.',
    intro:
      'Provide your senior staff with a shared, fully furnished room at advantageous monthly rates, including three daily meals, high-speed internet and complimentary daily laundry service.',
    image: 'acc.double',
    gallery: [],
    specs: [
      { label: 'Maximum occupancy', value: '2' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floor', value: '4th floor' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: [
      { label: 'Monthly', text: 'A shared, fully furnished room at advantageous monthly rates.' },
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
    ],
    amenities: [
      'Two single-size beds and a two-seater sofa with a coffee table.',
      'Attached bathroom and washroom for individual use.',
      'Complimentary daily housekeeping.',
      'Linen changed as and when required.',
      'Room rate includes electricity and water.',
      'Three meals daily — breakfast, lunch and dinner — are included in the rate.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout the stay.',
    ],
    rates: [
      { label: 'Room', value: 'OMR 270.000*', note: 'plus VAT · per month' },
      { label: 'Food', value: 'OMR 45.000*', note: 'plus VAT · per person, per month' },
      { label: 'Laundry & misc.', value: 'OMR 5.000*', note: 'plus VAT · per person, per month' },
    ],
    total: { label: 'Total package', value: 'OMR 370.000*', note: 'plus VAT · one room, for two, per month' },
    rateNote: FULL_OCC,
  },
  {
    slug: 'managers-triple-premium',
    audience: 'facilities',
    group: 'managers',
    name: 'Managers · Triple Premium',
    code: 'S3',
    tagline: 'A shared, fully furnished room for three senior staff.',
    intro:
      'Accommodate your senior staff in a shared, fully furnished room designed for three people at advantageous monthly rates, including three daily meals, high-speed internet and complimentary daily laundry service.',
    image: 'acc.triple',
    gallery: [],
    specs: [
      { label: 'Maximum occupancy', value: '3' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Floors', value: '1st to 3rd · 26 rooms each' },
      { label: 'Total count of rooms', value: '78' },
    ],
    booking: [
      { label: 'Monthly', text: 'A shared, fully furnished room for three at advantageous monthly rates.' },
      { label: 'Flexible', text: 'Daily rates are available for stays under 30 days.' },
    ],
    amenities: [
      'Three single-size beds.',
      'Attached bathroom and washroom for individual use.',
      'Complimentary daily housekeeping, primarily focused on cleaning.',
      'Linen changed as and when required.',
      'Room rate includes electricity and water.',
      'Three meals daily — breakfast, lunch and dinner — are included in the rate.',
      '20 laundry pieces cleaned weekly.',
      'Complimentary Wi-Fi throughout the stay.',
    ],
    rates: [
      { label: 'Room', value: 'OMR 260.000*', note: 'plus VAT · per month' },
      { label: 'Food', value: 'OMR 45.000*', note: 'plus VAT · per person, per month' },
      { label: 'Laundry & misc.', value: 'OMR 5.000*', note: 'plus VAT · per person, per month' },
    ],
    total: { label: 'Total package', value: 'OMR 410.000*', note: 'plus VAT · one room, for three, per month' },
    rateNote: FULL_OCC,
  },
];

export const roomsFor = (audience: Room['audience']) => ROOMS.filter((r) => r.audience === audience);
export const findRoom = (audience: Room['audience'], slug: string) => ROOMS.find((r) => r.audience === audience && r.slug === slug);
