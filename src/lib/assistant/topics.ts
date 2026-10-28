// One-tap answers for the site assistant, built from the site's content in the page's language. They work with
// no AI configured, and the widget also uses their keywords to answer typed questions offline.
// No prices: questions about prices, rates or rent are answered by the "Get a quote" topic.
import type { Content } from '@/i18n/server';

export type Topic = { id: string; label: string; answer: string; href?: string; hrefLabel?: string; keywords: string[] };

export const QUOTE_HREF = '/contact-us?kind=Quote&topic=Accommodation#inquiry';

const T = {
  en: {
    rooms: 'Rooms', quote: 'Get a quote', catering: 'Meals & catering', retail: 'Retail Spaces', spaces: 'Meeting spaces', lifestyle: 'Sports & lifestyle', location: 'Location', contact: 'Contact us',
    roomsIntro: 'Furnished rooms for company workforces and individuals:',
    upTo: (n: string) => `up to ${n}`,
    roomsNote: 'Every stay includes three daily meals, Wi-Fi and laundry. For prices, ask for a quote.',
    quoteAnswer: (time: string) => `Prices depend on the room type, the number of rooms and the length of stay, so we send each visitor a tailored quote. Tell us what you need on the quote form and we will reply within ${time}.`,
    roomsLink: 'See the rooms', quoteLink: 'Open the quote form', more: 'Read more', mapLink: 'Open the map', contactLink: 'Send an inquiry',
    locationLead: (addr: string) => `We are in ${addr}, on the Muscat–Batinah Expressway.`,
    contactLead: (time: string) => `We typically answer within ${time}.`,
    phone: 'Phone', email: 'Email', whatsapp: 'WhatsApp',
  },
  ar: {
    rooms: 'الغرف', quote: 'اطلب عرض سعر', catering: 'الوجبات والتموين', retail: 'مساحات التجزئة', spaces: 'قاعات الاجتماعات', lifestyle: 'الرياضة وأسلوب الحياة', location: 'الموقع', contact: 'تواصل معنا',
    roomsIntro: 'غرف مفروشة للقوى العاملة لدى الشركات وللأفراد:',
    upTo: (n: string) => `حتى ${n}`,
    roomsNote: 'تشمل كل إقامة ثلاث وجبات يومية والإنترنت والغسيل. لمعرفة الأسعار، اطلب عرض سعر.',
    quoteAnswer: (time: string) => `تعتمد الأسعار على نوع الغرفة وعدد الغرف ومدة الإقامة، لذلك نرسل لكل زائر عرض سعر مخصصاً. أخبرنا بما تحتاجه في نموذج طلب عرض السعر وسنردّ خلال ${time}.`,
    roomsLink: 'اطّلع على الغرف', quoteLink: 'افتح نموذج عرض السعر', more: 'اقرأ المزيد', mapLink: 'افتح الخريطة', contactLink: 'أرسل استفساراً',
    locationLead: (addr: string) => `نقع في ${addr}، على طريق مسقط–الباطنة السريع.`,
    contactLead: (time: string) => `نردّ عادةً خلال ${time}.`,
    phone: 'الهاتف', email: 'البريد الإلكتروني', whatsapp: 'واتساب',
  },
};

// typed questions are matched against these words (both languages, either page)
const KEYWORDS: Record<string, string[]> = {
  rooms: ['room', 'rooms', 'stay', 'bed', 'accommodation', 'single', 'double', 'triple', 'shared', 'junior', 'senior', 'worker', 'workers', 'manager', 'premium', 'غرفة', 'غرف', 'سكن', 'السكن', 'سرير', 'مشتركة', 'مميزة'],
  quote: ['price', 'prices', 'rate', 'rates', 'cost', 'costs', 'rent', 'rental', 'quote', 'quotation', 'fee', 'fees', 'omr', 'rial', 'cheap', 'expensive', 'budget', 'package', 'سعر', 'أسعار', 'الأسعار', 'تكلفة', 'إيجار', 'عرض', 'ريال', 'باقة', 'رسوم'],
  catering: ['meal', 'meals', 'food', 'catering', 'breakfast', 'lunch', 'dinner', 'kitchen', 'event', 'restaurant', 'cafe', 'liwan', 'mint', 'safi', 'haccp', 'وجبة', 'وجبات', 'طعام', 'تموين', 'التموين', 'إفطار', 'غداء', 'عشاء', 'مطعم', 'ليوان', 'صافي'],
  retail: ['shop', 'shops', 'retail', 'store', 'supermarket', 'atm', 'bank', 'exchange', 'pharmacy', 'laundry', 'clinic', 'business', 'unit', 'units', 'lease', 'office', 'متجر', 'متاجر', 'التجزئة', 'سوبرماركت', 'صراف', 'بنك', 'صرافة', 'صيدلية', 'مغسلة', 'عيادة', 'وحدة', 'مكتب'],
  spaces: ['meeting', 'venue', 'hall', 'conference', 'space', 'spaces', 'party', 'اجتماع', 'قاعة', 'قاعات', 'مساحات', 'مؤتمر'],
  lifestyle: ['gym', 'sport', 'sports', 'football', 'tennis', 'badminton', 'lifestyle', 'recreation', 'park', 'green', 'رياضة', 'نادي', 'كرة', 'تنس', 'ترفيه', 'أسلوب'],
  location: ['where', 'location', 'address', 'map', 'barka', 'khazaen', 'directions', 'أين', 'موقع', 'الموقع', 'عنوان', 'خريطة', 'بركاء', 'خزائن'],
  contact: ['contact', 'phone', 'call', 'email', 'whatsapp', 'number', 'book', 'booking', 'inquiry', 'تواصل', 'هاتف', 'اتصال', 'بريد', 'واتساب', 'رقم', 'حجز', 'استفسار'],
};

export function topicsFor(c: Content): Topic[] {
  const t = T[c.locale];
  const haven = (key: string) => c.haven.find((h) => h.key === key);
  const roomLines = c.rooms.map((r) => {
    const occ = r.specs.find((s) => /occupancy|الاستيعابية|الإشغال/i.test(s.label))?.value;
    return `- ${r.name} (${r.forWho})${occ ? ` · ${t.upTo(occ)}` : ''}`;
  });
  const fromHaven = (id: string, key: string, label: string): Topic => {
    const h = haven(key);
    return { id, label, answer: [h?.tagline, h?.blurb].filter(Boolean).join('\n\n'), href: h?.href, hrefLabel: t.more, keywords: KEYWORDS[id] };
  };
  return [
    { id: 'rooms', label: t.rooms, answer: [t.roomsIntro, ...roomLines, '', t.roomsNote].join('\n'), href: '/rooms', hrefLabel: t.roomsLink, keywords: KEYWORDS.rooms },
    { id: 'quote', label: t.quote, answer: t.quoteAnswer(c.site.responseTime), href: QUOTE_HREF, hrefLabel: t.quoteLink, keywords: KEYWORDS.quote },
    fromHaven('catering', 'catering', t.catering),
    fromHaven('retail', 'retail', t.retail),
    fromHaven('spaces', 'spaces', t.spaces),
    fromHaven('lifestyle', 'lifestyle', t.lifestyle),
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
