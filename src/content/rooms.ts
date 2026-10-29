// Room types, one page each under /rooms. The original site split every room into a company page (/facilities/…)
// and an individual page (/individuals/…); they are merged here, and the old URLs redirect (redirects.mjs).
// No prices are shown anywhere on the site: every room offers "Get a quote" instead.
// Names, buildings, meal plans and inclusions follow AMV's content changes (Oct 2026).

export type MealPlan = 'room-only' | 'bed-breakfast' | 'half-board' | 'full-board';
export type Room = {
  slug: string;
  group: 'shared' | 'premium';
  name: string;
  /** the descriptor shown in the Rooms menu and on cards: who it is for · building */
  forWho: string;
  building: string;
  code?: string;
  /** card text: meal plans, laundry and stay, then what every room includes */
  tagline: string;
  intro: string;
  image: string; // key in images.generated.json
  gallery: string[];
  specs: { label: string; value: string }[];
  booking: { label: string; text: string }[];
  /** room inclusions */
  amenities: string[];
  mealPlans: MealPlan[];
  laundry: boolean;
  stay: 'daily-monthly' | 'monthly';
  /** the room's value in the quote form's room choice (InquiryForm) */
  quote: 'Executive single' | 'Executive twin' | 'Executive triple' | 'Shared room' | 'Individual bedspace' | 'Basic room';
};

const ALL_PLANS = 'Room Only, Bed & Breakfast, Half Board or Full Board';
const UTILITIES = 'Internet, electricity and water included.';
const LAUNDRY = 'Within a set allowance per resident; undergarments are excluded.';
const executiveInclusions = [
  'Furnished room',
  'Attached washroom',
  'LED smart TV',
  'Mini fridge',
  'Tea and coffee maker',
  'Coffee table',
  'Internet',
  'Laundry within allowance',
];
const teamInclusions = [
  'Furnished room',
  'Single beds (5 occupancy) or bunk beds (8 and 10 occupancy)',
  'Shared bathrooms',
  'Internet',
  'Laundry within allowance',
];
const executiveIntro = (what: string) =>
  `${what} in the Liwan Building for managers and professionals. Choose daily or monthly stays and the meal plan that suits you — from room-only to full board, with buffet dining at Liwan Restaurant and Safi Dining Hall. Internet, electricity and water are included.`;
const fullBooking = [
  { label: 'Stay', text: 'Daily or monthly' },
  { label: 'Meal plans', text: 'Room Only, Bed & Breakfast, Half Board or Full Board' },
  { label: 'Laundry', text: LAUNDRY },
];

export const ROOMS: Room[] = [
  {
    slug: 'single-premium',
    group: 'premium',
    name: 'Executive Single (S1)',
    forWho: 'Managers and professionals · Liwan Building',
    building: 'Liwan Building',
    tagline: `${ALL_PLANS} · laundry · daily or monthly stays. ${UTILITIES}`,
    intro: executiveIntro('A private, fully furnished room with an attached washroom'),
    image: 'acc.single',
    gallery: [],
    specs: [
      { label: 'Building', value: 'Liwan Building' },
      { label: 'Maximum occupancy', value: '1' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: fullBooking,
    amenities: executiveInclusions,
    mealPlans: ['room-only', 'bed-breakfast', 'half-board', 'full-board'],
    laundry: true,
    stay: 'daily-monthly',
    quote: 'Executive single',
  },
  {
    slug: 'double-premium',
    group: 'premium',
    name: 'Executive Twin (S2)',
    forWho: 'Managers and professionals · Liwan Building',
    building: 'Liwan Building',
    tagline: `${ALL_PLANS} · laundry · daily or monthly stays. ${UTILITIES}`,
    intro: executiveIntro('A fully furnished twin room for two, with an attached washroom,'),
    image: 'acc.double',
    gallery: [],
    specs: [
      { label: 'Building', value: 'Liwan Building' },
      { label: 'Maximum occupancy', value: '2' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Total count of rooms', value: '13' },
    ],
    booking: fullBooking,
    amenities: executiveInclusions,
    mealPlans: ['room-only', 'bed-breakfast', 'half-board', 'full-board'],
    laundry: true,
    stay: 'daily-monthly',
    quote: 'Executive twin',
  },
  {
    slug: 'triple-premium',
    group: 'premium',
    name: 'Executive Triple (S3)',
    forWho: 'Managers and professionals · Liwan Building',
    building: 'Liwan Building',
    tagline: `${ALL_PLANS} · laundry · daily or monthly stays. ${UTILITIES}`,
    intro: executiveIntro('A fully furnished room for three, with an attached washroom,'),
    image: 'acc.triple',
    gallery: [],
    specs: [
      { label: 'Building', value: 'Liwan Building' },
      { label: 'Maximum occupancy', value: '3' },
      { label: 'Area of the room', value: '33.65 m²' },
      { label: 'Total count of rooms', value: '78' },
    ],
    booking: fullBooking,
    amenities: executiveInclusions,
    mealPlans: ['room-only', 'bed-breakfast', 'half-board', 'full-board'],
    laundry: true,
    stay: 'daily-monthly',
    quote: 'Executive triple',
  },
  {
    slug: 'shared',
    group: 'shared',
    name: 'Team Residences – Shared Room',
    forWho: 'Site and operations teams · 5, 8 or 10 per room · Majan 1',
    building: 'Majan 1',
    tagline: `${ALL_PLANS} · laundry · daily or monthly stays. ${UTILITIES} Also available as a Basic Room in Majan 2 (10 occupancy, monthly, room only).`,
    intro:
      'Shared rooms in Majan 1 for site and operations teams, with 5, 8 or 10 occupancy — single beds for five, bunk beds for eight or ten. Choose daily or monthly stays on the meal plan that suits your team, from room-only to full board. Internet, electricity and water are included.',
    image: 'acc.junior1',
    gallery: ['acc.junior2', 'acc.junior3', 'acc.juniorPlan'],
    specs: [
      { label: 'Building', value: 'Majan 1' },
      { label: 'Occupancy', value: '5, 8 or 10' },
      { label: 'Area of the room', value: '38.88 m²' },
      { label: 'Total count of rooms', value: '300+' },
    ],
    booking: fullBooking,
    amenities: teamInclusions,
    mealPlans: ['room-only', 'bed-breakfast', 'half-board', 'full-board'],
    laundry: true,
    stay: 'daily-monthly',
    quote: 'Shared room',
  },
  {
    slug: 'individual-bedspace',
    group: 'shared',
    name: 'Team Residences – Individual Bedspace',
    forWho: 'Single bedspace in a shared room · Majan 1',
    building: 'Majan 1',
    tagline: `Full Board · laundry · daily or monthly stays. ${UTILITIES}`,
    intro:
      'A single bedspace in a shared room in Majan 1 — for individuals who need one bed rather than a whole room. Stays are daily or monthly on Full Board, with three buffet meals a day. Internet, electricity and water are included.',
    image: 'acc.bedspace',
    gallery: [],
    specs: [
      { label: 'Building', value: 'Majan 1' },
      { label: 'Bed', value: 'Single bedspace in a shared room' },
      { label: 'Meal plan', value: 'Full Board' },
      { label: 'Stay', value: 'Daily or monthly' },
    ],
    booking: [
      { label: 'Stay', text: 'Daily or monthly' },
      { label: 'Meal plan', text: 'Full Board — breakfast, lunch and dinner' },
      { label: 'Laundry', text: LAUNDRY },
    ],
    amenities: teamInclusions,
    mealPlans: ['full-board'],
    laundry: true,
    stay: 'daily-monthly',
    quote: 'Individual bedspace',
  },
  {
    slug: 'basic-room',
    group: 'shared',
    name: 'Team Residences – Basic Room',
    forWho: '10 bunk beds · monthly, room only · Majan 2',
    building: 'Majan 2',
    tagline: `Room Only · monthly stays. ${UTILITIES}`,
    intro:
      'A cost-efficient option for larger teams in Majan 2: 10-occupancy rooms fitted with bunk beds (mattresses not provided), common restrooms, and common areas cleaned daily by our housekeeping team. Monthly, room-only basis. Internet, electricity and water included.',
    image: 'acc.basic',
    gallery: [],
    specs: [
      { label: 'Building', value: 'Majan 2' },
      { label: 'Maximum occupancy', value: '10' },
      { label: 'Beds', value: 'Bunk beds (mattresses not provided)' },
      { label: 'Stay', value: 'Monthly, room only' },
    ],
    booking: [
      { label: 'Stay', text: 'Monthly' },
      { label: 'Meal plan', text: 'Room Only' },
      { label: 'Laundry', text: 'Not included' },
    ],
    amenities: ['10 bunk beds (no mattresses)', 'Common restrooms', 'Internet'],
    mealPlans: ['room-only'],
    laundry: false,
    stay: 'monthly',
    quote: 'Basic room',
  },
];

export const findRoom = (slug: string) => ROOMS.find((r) => r.slug === slug);
