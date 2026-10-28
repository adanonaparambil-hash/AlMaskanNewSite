// Village content that is the same in both languages apart from its wording: retail units for rent, outlets that
// are already open, and the dining outlets. Each text carries its English and Arabic form.

type T = { en: string; ar: string };

/**
 * Shops and offices for rent, shown as cards on /retail-spaces (no rents are ever shown).
 * AMV keeps this list: add a unit with status 'available'; when it is let, set status to 'let' and it drops off the
 * page. `image` (optional) is a path under /public, e.g. '/assets/images/retail/unit-g12.jpg'.
 */
export type RetailUnit = {
  id: string;
  status: 'available' | 'let';
  /** floor area in m² */
  size: number;
  use: T;
  location: T;
  image?: string;
};

export const RETAIL_UNITS: RetailUnit[] = [
  // example — copy, fill in and set status: 'available'
  // { id: 'G-12', status: 'available', size: 43.15, use: { en: 'Retail shop', ar: 'متجر تجزئة' }, location: { en: 'Ground floor, commercial building', ar: 'الطابق الأرضي، المبنى التجاري' } },
];

/** Outlets already trading in the village, shown as the "Already open" strip on /retail-spaces. */
export type OpenOutlet = { key: string; name: T; by?: T; image?: { src: string; w: number; h: number } };

export const OPEN_OUTLETS: OpenOutlet[] = [
  { key: 'supermarket', name: { en: 'Supermarket', ar: 'سوبرماركت' }, by: { en: 'Suhol Al Fayha', ar: 'سهول الفيحاء' } },
  { key: 'pharmacy', name: { en: 'Pharmacy', ar: 'صيدلية' } },
  {
    key: 'exchange',
    name: { en: 'Money exchange', ar: 'صرافة' },
    by: { en: 'Joyalukkas Exchange', ar: 'جوي الوكاس للصرافة' },
    image: { src: '/assets/images/amv/joyalukkas-exchange.jpg', w: 1800, h: 2400 },
  },
  {
    key: 'atm',
    name: { en: 'ATM', ar: 'صراف آلي' },
    by: { en: 'Bank Muscat', ar: 'بنك مسقط' },
    image: { src: '/assets/images/amv/bank-muscat-atm.jpg', w: 1800, h: 2400 },
  },
  { key: 'laundry', name: { en: 'Laundry', ar: 'مغسلة ملابس' } },
  {
    key: 'clinic',
    name: { en: 'Clinic', ar: 'عيادة' },
    by: { en: 'AdLife Clinics & Laboratories', ar: 'عيادات ومختبرات أدلايف' },
    image: { src: '/assets/images/amv/clinic-reception.jpg', w: 1800, h: 1082 },
  },
];

/** The village's dining outlets, all operating under HACCP certification (named on the Catering page). */
export const DINING_OUTLETS: { name: T; kind: T }[] = [
  { name: { en: 'Liwan Restaurant', ar: 'مطعم ليوان' }, kind: { en: 'Restaurant', ar: 'مطعم' } },
  { name: { en: 'Mint Café', ar: 'مقهى منت' }, kind: { en: 'Café', ar: 'مقهى' } },
  { name: { en: 'Safi Dining Hall', ar: 'قاعة صافي للطعام' }, kind: { en: 'Dining hall', ar: 'قاعة طعام' } },
];
