// Stay information for the Rooms page and room pages (AMV content changes, Oct 2026): meal plans, room options,
// how to book, the house rule and the on-site services list. Each text carries its English and Arabic form.

type T = { en: string; ar: string };

export const MEAL_PLANS: { plan: T; meals: T }[] = [
  { plan: { en: 'Room Only', ar: 'الغرفة فقط' }, meals: { en: 'No meals', ar: 'بدون وجبات' } },
  { plan: { en: 'Bed & Breakfast', ar: 'مبيت وإفطار' }, meals: { en: 'Breakfast', ar: 'الإفطار' } },
  { plan: { en: 'Half Board', ar: 'نصف إقامة' }, meals: { en: 'Breakfast, plus lunch or dinner', ar: 'الإفطار، إضافة إلى الغداء أو العشاء' } },
  { plan: { en: 'Full Board', ar: 'إقامة كاملة' }, meals: { en: 'Breakfast, lunch and dinner', ar: 'الإفطار والغداء والعشاء' } },
];
export const MEAL_NOTE: T = {
  en: 'All meals are buffet-style. Packed meals are available for residents on site shifts.',
  ar: 'جميع الوجبات بنظام البوفيه. وتتوفر وجبات مغلّفة للمقيمين العاملين في نوبات المواقع.',
};

const allPlans: T = { en: 'Room Only, Bed & Breakfast, Half Board, Full Board', ar: 'الغرفة فقط، مبيت وإفطار، نصف إقامة، إقامة كاملة' };
const dailyMonthly: T = { en: 'Daily or monthly', ar: 'يومية أو شهرية' };
export const ROOM_OPTIONS: { room: T; building: T; plans: T; laundry: boolean; stay: T; href: string }[] = [
  { room: { en: 'Executive Single / Twin / Triple', ar: 'تنفيذية فردية / مزدوجة / ثلاثية' }, building: { en: 'Liwan', ar: 'ليوان' }, plans: allPlans, laundry: true, stay: dailyMonthly, href: '/rooms/single-premium' },
  { room: { en: 'Shared Room – 5, 8 or 10 occupancy', ar: 'غرفة مشتركة – 5 أو 8 أو 10 أشخاص' }, building: { en: 'Majan 1', ar: 'ماجان 1' }, plans: allPlans, laundry: true, stay: dailyMonthly, href: '/rooms/shared' },
  { room: { en: 'Individual Bedspace', ar: 'سرير فردي' }, building: { en: 'Majan 1', ar: 'ماجان 1' }, plans: { en: 'Full Board', ar: 'إقامة كاملة' }, laundry: true, stay: dailyMonthly, href: '/rooms/individual-bedspace' },
  { room: { en: 'Basic Room – 10 occupancy', ar: 'غرفة أساسية – 10 أشخاص' }, building: { en: 'Majan 2', ar: 'ماجان 2' }, plans: { en: 'Room Only', ar: 'الغرفة فقط' }, laundry: false, stay: { en: 'Monthly', ar: 'شهرية' }, href: '/rooms/basic-room' },
];
export const LAUNDRY_NOTE: T = {
  en: 'Laundry is provided within a set allowance per resident; undergarments are excluded.',
  ar: 'يُقدَّم غسيل الملابس ضمن حصة محددة لكل مقيم، باستثناء الملابس الداخلية.',
};
export const INCLUDED_NOTE: T = {
  en: 'Internet, electricity and water are included in every plan. All rooms are non-smoking; designated smoking areas are available within the village.',
  ar: 'الإنترنت والكهرباء والمياه مشمولة في كل الخطط. جميع الغرف لغير المدخنين، وتتوفر مناطق مخصصة للتدخين داخل القرية.',
};
export const HOUSE_RULE: T = {
  en: 'All rooms are non-smoking. Designated smoking areas are available within the village.',
  ar: 'جميع الغرف لغير المدخنين. وتتوفر مناطق مخصصة للتدخين داخل القرية.',
};

/** How to book (minimum stay and check-in documents follow when AMV supplies them). */
export const HOW_TO_BOOK: { step: T; text: T }[] = [
  { step: { en: 'Inquiry', ar: 'الاستفسار' }, text: { en: 'Tell us the number of people, room type, meal plan, start date and length of stay.', ar: 'أخبرنا بعدد الأشخاص ونوع الغرفة وخطة الوجبات وتاريخ البدء ومدة الإقامة.' } },
  { step: { en: 'Quotation', ar: 'عرض السعر' }, text: { en: 'We send a tailored quotation for your team or your stay.', ar: 'نرسل إليك عرض سعر مخصصاً لفريقك أو لإقامتك.' } },
  { step: { en: 'Agreement', ar: 'الاتفاق' }, text: { en: 'Confirm the quotation and sign the accommodation agreement.', ar: 'أكّد عرض السعر ووقّع اتفاقية السكن.' } },
  { step: { en: 'Check-in', ar: 'تسجيل الوصول' }, text: { en: 'Arrive at the village and move in.', ar: 'وصولك إلى القرية والانتقال إلى سكنك.' } },
];

/** On-site services (Lifestyle page). */
export const ON_SITE_SERVICES: T[] = [
  { en: 'Clinic', ar: 'عيادة' },
  { en: 'Pharmacy', ar: 'صيدلية' },
  { en: 'Supermarket', ar: 'سوبرماركت' },
  { en: 'Bank Muscat ATM', ar: 'صراف آلي لبنك مسقط' },
  { en: 'Joyalukkas Exchange', ar: 'جوي الوكاس للصرافة' },
  { en: 'Liwan Restaurant', ar: 'مطعم ليوان' },
  { en: 'Safi Dining Hall', ar: 'قاعة صافي للطعام' },
  { en: 'Sports courts — volleyball, cricket nets, badminton', ar: 'ملاعب رياضية — كرة الطائرة، وشباك الكريكيت، والريشة الطائرة' },
  { en: 'Gym', ar: 'صالة رياضية' },
  { en: 'Cafés', ar: 'مقاهٍ' },
];
