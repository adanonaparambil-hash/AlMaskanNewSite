// One-tap answers for the site assistant, built from the site's content in the page's language. They work with
// no AI configured, and the widget also uses their keywords to answer typed questions offline.
import type { Content } from '@/i18n/server';

export type Topic = { id: string; label: string; answer: string; href?: string; hrefLabel?: string; keywords: string[] };

const T = {
  en: {
    rooms: 'Rooms & rates', catering: 'Meals & catering', retail: 'Shops & retail', spaces: 'Meeting spaces', lifestyle: 'Sports & lifestyle', location: 'Location', contact: 'Contact us',
    roomsIntro: 'Furnished rooms for individuals (monthly packages, as published):',
    upTo: (n: string) => `up to ${n}`,
    roomsNote: 'Rates are subject to confirmation. Companies can house whole workforces too — see the companies page.',
    roomsLink: 'See accommodation', more: 'Read more', mapLink: 'Open the map', contactLink: 'Send an inquiry',
    locationLead: (addr: string) => `We are in ${addr}, on the Muscat–Batinah Expressway.`,
    contactLead: (time: string) => `We typically answer within ${time}.`,
    phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp',
  },
  ar: {
    rooms: 'الغرف والأسعار', catering: 'الوجبات والتموين', retail: 'المتاجر', spaces: 'قاعات الاجتماعات', lifestyle: 'الرياضة وأسلوب الحياة', location: 'الموقع', contact: 'تواصل معنا',
    roomsIntro: 'غرف مفروشة للأفراد (باقات شهرية كما هي منشورة):',
    upTo: (n: string) => `حتى ${n}`,
    roomsNote: 'الأسعار خاضعة للتأكيد. ويمكن للشركات أيضاً إسكان القوى العاملة بالكامل — اطّلع على صفحة الشركات.',
    roomsLink: 'اطّلع على السكن', more: 'اقرأ المزيد', mapLink: 'افتح الخريطة', contactLink: 'أرسل استفساراً',
    locationLead: (addr: string) => `نقع في ${addr}، على طريق مسقط–الباطنة السريع.`,
    contactLead: (time: string) => `نردّ عادةً خلال ${time}.`,
    phone: 'الهاتف', email: 'البريد الإلكتروني', whatsapp: 'واتساب',
  },
};

// typed questions are matched against these words (both languages, either page)
const KEYWORDS: Record<string, string[]> = {
  rooms: ['room', 'rooms', 'rate', 'rates', 'price', 'cost', 'rent', 'stay', 'bed', 'accommodation', 'single', 'double', 'triple', 'junior', 'senior', 'premium', 'package', 'غرفة', 'غرف', 'سعر', 'أسعار', 'الأسعار', 'سكن', 'السكن', 'إيجار', 'باقة', 'سرير'],
  catering: ['meal', 'meals', 'food', 'catering', 'breakfast', 'lunch', 'dinner', 'kitchen', 'event', 'وجبة', 'وجبات', 'طعام', 'تموين', 'التموين', 'إفطار', 'غداء', 'عشاء'],
  retail: ['shop', 'shops', 'retail', 'store', 'supermarket', 'atm', 'bank', 'exchange', 'pharmacy', 'cafe', 'business', 'unit', 'متجر', 'متاجر', 'التجزئة', 'سوبرماركت', 'صراف', 'بنك', 'صرافة', 'مقهى'],
  spaces: ['meeting', 'venue', 'hall', 'conference', 'office', 'space', 'spaces', 'party', 'اجتماع', 'قاعة', 'قاعات', 'مكتب', 'مساحات', 'مؤتمر'],
  lifestyle: ['gym', 'sport', 'sports', 'football', 'tennis', 'badminton', 'lifestyle', 'recreation', 'park', 'green', 'رياضة', 'نادي', 'كرة', 'تنس', 'ترفيه', 'أسلوب'],
  location: ['where', 'location', 'address', 'map', 'barka', 'khazaen', 'directions', 'أين', 'موقع', 'الموقع', 'عنوان', 'خريطة', 'بركاء', 'خزائن'],
  contact: ['contact', 'phone', 'call', 'email', 'whatsapp', 'number', 'book', 'booking', 'inquiry', 'تواصل', 'هاتف', 'اتصال', 'بريد', 'واتساب', 'رقم', 'حجز', 'استفسار'],
};

export function topicsFor(c: Content): Topic[] {
  const t = T[c.locale];
  const haven = (key: string) => c.haven.find((h) => h.key === key);
  const rooms = c.rooms.filter((r) => r.audience === 'individuals');
  const roomLines = rooms.map((r) => {
    const occ = r.specs.find((s) => /occupancy|الاستيعابية|الإشغال/i.test(s.label))?.value;
    return `- ${r.name}: ${r.total.value}${occ ? ` · ${t.upTo(occ)}` : ''}`;
  });
  const fromHaven = (id: string, key: string, href: string, label: string): Topic => {
    const h = haven(key);
    return { id, label, answer: [h?.tagline, h?.blurb].filter(Boolean).join('\n\n'), href, hrefLabel: t.more, keywords: KEYWORDS[id] };
  };
  return [
    { id: 'rooms', label: t.rooms, answer: [t.roomsIntro, ...roomLines, '', t.roomsNote].join('\n'), href: '/individuals', hrefLabel: t.roomsLink, keywords: KEYWORDS.rooms },
    fromHaven('catering', 'catering', '/individuals/individuals-catering', t.catering),
    fromHaven('retail', 'retail', '/individuals/residents', t.retail),
    fromHaven('spaces', 'spaces', '/facilities/spaces', t.spaces),
    fromHaven('lifestyle', 'lifestyle', '/individuals/individuals-lifestyle', t.lifestyle),
    { id: 'location', label: t.location, answer: t.locationLead(c.site.address.slice(2).join(', ')), href: c.site.reviews, hrefLabel: t.mapLink, keywords: KEYWORDS.location },
    {
      id: 'contact',
      label: t.contact,
      answer: [`${t.phone}: ${c.site.phones.map((p) => p.label).join(' / ')}`, `${t.email}: ${c.site.email}`, `${t.whatsapp}: ${c.site.phones[1]?.label ?? ''}`, '', t.contactLead(c.site.responseTime)].join('\n'),
      href: '/contact-us',
      hrefLabel: t.contactLink,
      keywords: KEYWORDS.contact,
    },
  ];
}
