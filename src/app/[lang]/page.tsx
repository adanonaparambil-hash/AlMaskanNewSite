import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from '@/components/LocaleLink';
import InquiryForm from '@/components/InquiryForm';
import NewsCard from '@/components/NewsCard';
import HeroMedia from '@/components/HeroMedia';
import RoomShowcase, { type ShowcaseRow } from '@/components/RoomShowcase';
import { Button, Eyebrow, Fact, Heading, Media, TextLink } from '@/components/ui';
import { Marquee, RingGallery } from '@/components/fx';
import { CurrentYear } from '@/components/FooterBits';
import { getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';
import { galleryFor, img } from '@/lib/images';
import type { CSSProperties } from 'react';

const en = {
  metaTitleTail: 'Elevating Living and Working',
  metaDescription:
    'Furnished accommodation, retail, catering, spaces and lifestyle in Khazaen Economic City, Barka, Oman. A community-oriented, mixed-use village on the Muscat–Batinah Expressway.',
  // hero
  heroEyebrow: 'Khazaen Economic City · Barka · Oman',
  heroTitle: <>Redefining <em>accommodation</em> in Khazaen Economic City</> as ReactNode,
  heroLead: 'A community-oriented, mixed-use village of furnished rooms and on-site catering — for individuals and company workforces, on the Muscat–Batinah Expressway.',
  inquiry: 'Make an inquiry',
  exploreVillage: 'Explore the village',
  scroll: 'Scroll',
  marquee: ['Accommodation', 'Retail', 'Catering', 'Spaces', 'Lifestyle', 'Khazaen Economic City'],
  // intro
  introEyebrow: 'Elevating living and working',
  introTitle: <>Exceptional service and <em>rewarding</em> experiences</> as ReactNode,
  introText: [
    'Al Maskaan Village elevates the concept of accommodation with an innovative, welcoming and community-oriented mixed-use development in Khazaen Economic City. As a pioneer in affordable accommodation in Oman, we provide modern, furnished apartments with on-site catering for the diverse needs of individuals and corporate workforces.',
    'A dedicated team delivers exceptional service, fosters innovation and creates a healthy, safe living environment — in Barka on the Muscat–Batinah Expressway, the most densely populated part of the Sultanate.',
    'Whether you are looking for accommodation, a sense of community, or ways to enhance your business, Al Maskaan Village stands as a model of elevated living and working, with a remarkable and unmatched experience for residents and employers alike.',
  ],
  stampLocB: 'Khazaen Economic City, Barka',
  stampLocS: 'On the Muscat–Batinah Expressway, Sultanate of Oman',
  havenOfFive: 'A haven of five',
  havenLine: 'Accommodation · Retail · Catering · Spaces · Lifestyle',
  seal: 'Khazaen Economic City · Barka · Oman · Al Maskaan Village · ',
  badgeK: 'Pioneer',
  badgeText: 'in affordable accommodation in Oman — modern, furnished apartments with on-site catering.',
  kicker: <>In Barka on the Muscat–Batinah Expressway — <em>the most densely populated</em> part of the Sultanate.</> as ReactNode,
  // film + statement
  filmLabel: 'Film',
  statementLabel: 'Statement',
  statement: <>Al Maskaan Village is not just a place to live; it is a <em>home away from home</em> and a journey towards excellence.</> as ReactNode,
  // community
  communityEyebrow: 'Welcoming community',
  communityTitle: <>Everyone deserves a place to call <em>home</em></> as ReactNode,
  communityText: [
    'Rooted in the belief that everyone deserves a place to call home — a harmonious blend of safety, comfort and value — Al Maskaan Village set out to create this envisioned haven.',
    'Our vision materialised into an environment where individuals not only coexist but thrive, in a setting meticulously crafted for holistic well-being.',
  ],
  aboutLink: 'About Al Maskaan Village',
  quote:
    '“Al Maskaan Village is not just about providing accommodations; it’s a commitment to shaping a lifestyle where quality meets warmth, and community thrives. We feel proud at Al Adrak Facilities & Services LLC (AFS) to having developed a project that fosters an environment where every resident, employee, and business partner feels a genuine sense of belonging. Al Maskaan Village is not just a place to live; it’s a home away from home and a journey towards excellence, where every detail reflects our dedication to redefining living experiences in Khazaen Economic City and beyond.”',
  quoteName: 'Dr. Thomas Alexander',
  quoteRole: 'Founder and Chairman, Adrak Group of Companies',
  // facts
  factsEyebrow: 'Facts and figures',
  factsTitle: <>What you need to <em>know</em></> as ReactNode,
  factsNote: 'Figures as published by Al Maskaan Village.',
  // haven
  havenTitle: <>Five ways the village <em>works for you</em></> as ReactNode,
  havenPanelTitle: (_key: string, name: string) => `Al Maskaan ${name}`,
  havenMore: (name: string) => `Explore ${name.toLowerCase()}`,
  // accommodation
  accEyebrow: 'Al Maskaan Accommodation',
  accTitle: <>Select what works <em>better for you</em></> as ReactNode,
  accText: 'Modern, furnished rooms — from shared bunk rooms to private premium rooms — close to your workplace, whether you are an Omani citizen or an expatriate.',
  accRooms: 'See all rooms',
  accQuote: 'Get a quote',
  specLabels: { occupancy: 'Maximum occupancy', area: 'Area of the room', count: 'Total count of rooms' },
  upTo: (n?: string) => `Up to ${n}`,
  roomsCount: (n?: string) => `${n} rooms`,
  // retail
  retailEyebrow: 'Al Maskaan Retail',
  retailTitle: <>A one-stop shop, <em>a short stroll</em> away</> as ReactNode,
  retailText: 'Retail offers residents a one-stop shopping experience, and business owners the opportunity to serve it — from groceries, phone accessories and money exchange to medicines, clothing, cafes and restaurants.',
  retailChecks: [
    { b: 'Retail units from 43.15 m² to 90.66 m²', s: 'Tap into a pre-established customer base of residents and visitors.' },
    { b: 'Financial services', s: 'Exchange stores, an ATM space and a 244.21 m² bank branch location.' },
    { b: 'Cafe, restaurant and supermarket units', s: '90.37 m² cafe · 121.98 m² restaurant · 471 m² supermarket.' },
  ],
  retailSpaces: 'Retail Spaces',
  // catering
  catEyebrow: 'Al Maskaan Catering',
  catTitle: <>Delicious meals, <em>included</em> in your stay</> as ReactNode,
  catText: 'Three nutritious meals a day keep residents fuelled and ready to perform. Beyond the daily table, bespoke catering suits boardroom meetings, industry conferences and team celebrations — menus designed with our chefs around your culture, preferences and budget.',
  catFacts: [
    { unit: 'm²', label: 'Industrial kitchen' },
    { unit: '', label: 'In-house catering serving' },
    { unit: '', label: 'External catering serving' },
  ],
  catCompanies: 'Explore catering',
  catResidents: 'Get a catering quote',
  // spaces
  spacesLabel: 'Spaces',
  spacesEyebrow: 'Al Maskaan Spaces',
  spacesTitle: <>Elevate your business and <em>personal gatherings</em></> as ReactNode,
  spacesText: 'Meeting rooms and versatile venues equipped with modern technology — for board meetings, presentations and brainstorming sessions, or birthdays, anniversaries and gatherings with loved ones — supported by catering, high-speed internet and professional staff.',
  reserve: 'Reserve or tour',
  exploreSpaces: 'Explore spaces',
  galleryTitle: 'Gallery of the village',
  // lifestyle
  lifeEyebrow: 'Al Maskaan Lifestyle',
  lifeTitle: <>Live well, work smart, <em>connect deeply</em></> as ReactNode,
  lifeLead: 'More than just a place to stay — a haven to connect, recharge and feel right at home.',
  lifeLabel: 'Lifestyle and facilities',
  lifestyleItems: [
    { n: '01', t: 'Invigorating recreation', d: 'Football, tennis and badminton courts, expansive green areas and engaging games promote activity and team building.' },
    { n: '02', t: 'Customised fitness', d: 'A fully equipped gym with individual workout spaces and group fitness classes.' },
    { n: '03', t: 'Vibrant social hubs', d: 'Inviting cafes — warm spaces for interaction and casual meetings that foster belonging.' },
    { n: '04', t: 'Events and workshops', d: 'A recreation hall for community events, workshops, dance classes and game nights.' },
  ],
  lifeResidents: 'Explore lifestyle',
  // story
  storyEyebrow: 'Our story',
  storyTitle: <>From a winning pitch to a <em>village</em></> as ReactNode,
  storyText: 'Developed by Adrak Facilities and Services (AFS), part of the Adrak Group of Companies.',
  // group
  groupEyebrow: 'Holding company',
  groupTitle: (name: string) => <>Part of the <em>{name}</em></> as ReactNode,
  meetTeam: 'Meet the management team',
  // news
  newsEyebrow: 'News & announcements',
  newsTitle: <>Latest from the <em>village</em></> as ReactNode,
  allNews: 'All news',
  // contact
  contactEyebrow: 'Get in touch',
  contactTitle: <>Tell us what you <em>need</em></> as ReactNode,
  call: 'Call',
  email: 'Email',
  chat: 'Chat & reviews',
  whatsapp: 'WhatsApp',
  reviews: 'Google Reviews',
  visit: 'Visit',
};

const AR_HAVEN_TITLES: Record<string, string> = {
  accommodation: 'سكن المسكن',
  retail: 'متاجر المسكن',
  catering: 'تموين المسكن',
  spaces: 'مساحات المسكن',
  lifestyle: 'أسلوب الحياة في المسكن',
};

const ar: typeof en = {
  metaTitleTail: 'الارتقاء بالمعيشة والعمل',
  metaDescription:
    'سكن مفروش، ومتاجر، وتموين، ومساحات، وأسلوب حياة متكامل في مدينة خزائن الاقتصادية، بركاء، سلطنة عُمان. قرية متعددة الاستخدامات تتمحور حول المجتمع على طريق مسقط–الباطنة السريع.',
  heroEyebrow: 'مدينة خزائن الاقتصادية · بركاء · عُمان',
  heroTitle: <>نعيد تعريف <em>السكن</em> في مدينة خزائن الاقتصادية</>,
  heroLead: 'قرية متعددة الاستخدامات تتمحور حول المجتمع، تضم غرفاً مفروشة وخدمات تموين في الموقع — للأفراد وللقوى العاملة في الشركات، على طريق مسقط–الباطنة السريع.',
  inquiry: 'أرسل استفساراً',
  exploreVillage: 'استكشف القرية',
  scroll: 'مرّر',
  marquee: ['السكن', 'التجزئة', 'التموين', 'المساحات', 'أسلوب الحياة', 'مدينة خزائن الاقتصادية'],
  introEyebrow: 'الارتقاء بالمعيشة والعمل',
  introTitle: <>خدمة استثنائية وتجارب <em>مُجزية</em></>,
  introText: [
    'ترتقي قرية المسكن بمفهوم السكن من خلال مشروع مبتكر ومرحِّب متعدد الاستخدامات يتمحور حول المجتمع في مدينة خزائن الاقتصادية. وبصفتنا روّاداً في توفير السكن بأسعار معقولة في عُمان، نقدّم شققاً حديثة ومفروشة مع خدمات تموين في الموقع، تلبي الاحتياجات المتنوعة للأفراد وللقوى العاملة في الشركات.',
    'يقدّم فريق متفانٍ خدمة استثنائية، ويعزّز الابتكار، ويهيّئ بيئة معيشية صحية وآمنة — في بركاء على طريق مسقط–الباطنة السريع، المنطقة الأكثر كثافة سكانية في السلطنة.',
    'سواء كنت تبحث عن سكن، أو عن روح المجتمع، أو عن سبل لتطوير أعمالك، تقف قرية المسكن نموذجاً للارتقاء بالمعيشة والعمل، بتجربة لافتة لا مثيل لها للمقيمين وأصحاب العمل على حدٍّ سواء.',
  ],
  stampLocB: 'مدينة خزائن الاقتصادية، بركاء',
  stampLocS: 'على طريق مسقط–الباطنة السريع، سلطنة عُمان',
  havenOfFive: 'ملاذٌ من خمسة',
  havenLine: 'السكن · التجزئة · التموين · المساحات · أسلوب الحياة',
  seal: 'مدينة خزائن الاقتصادية · بركاء · عُمان · قرية المسكن · ',
  badgeK: 'روّاد',
  badgeText: 'في توفير السكن بأسعار معقولة في عُمان — شقق حديثة ومفروشة مع خدمات تموين في الموقع.',
  kicker: <>في بركاء على طريق مسقط–الباطنة السريع — <em>المنطقة الأكثر كثافة سكانية</em> في السلطنة.</>,
  filmLabel: 'الفيلم',
  statementLabel: 'رسالتنا',
  statement: <>قرية المسكن ليست مجرد مكان للعيش؛ إنها <em>بيتٌ بعيد عن البيت</em> ورحلة نحو التميّز.</>,
  communityEyebrow: 'مجتمع مرحِّب',
  communityTitle: <>كل إنسان يستحق مكاناً يسمّيه <em>بيتاً</em></>,
  communityText: [
    'انطلاقاً من الإيمان بأن كل إنسان يستحق مكاناً يسمّيه بيتاً — مزيجاً متناغماً من الأمان والراحة والقيمة — شرعت قرية المسكن في إنشاء هذا الملاذ المنشود.',
    'وتجسّدت رؤيتنا في بيئة لا يكتفي فيها الأفراد بالتعايش، بل يزدهرون، في محيط صُمّم بعناية فائقة من أجل رفاهية شاملة.',
  ],
  aboutLink: 'عن قرية المسكن',
  quote:
    '«قرية المسكن ليست مجرد توفير لأماكن الإقامة؛ بل هي التزام بتشكيل أسلوب حياة تلتقي فيه الجودة بالدفء ويزدهر فيه المجتمع. ونفخر في شركة أدرك للمرافق والخدمات ش.م.م (AFS) بتطوير مشروع يرسّخ بيئة يشعر فيها كل مقيم وموظف وشريك أعمال بانتماء حقيقي. قرية المسكن ليست مجرد مكان للعيش؛ إنها بيتٌ بعيد عن البيت ورحلة نحو التميّز، تعكس كل تفاصيلها تفانينا في إعادة تعريف تجارب المعيشة في مدينة خزائن الاقتصادية وما بعدها.»',
  quoteName: 'د. توماس ألكسندر',
  quoteRole: 'المؤسس ورئيس مجلس الإدارة، مجموعة شركات أدرك',
  factsEyebrow: 'حقائق وأرقام',
  factsTitle: <>ما تحتاج إلى <em>معرفته</em></>,
  factsNote: 'الأرقام كما نشرتها قرية المسكن.',
  havenTitle: <>خمس طرق تجعل القرية <em>في خدمتك</em></>,
  havenPanelTitle: (key: string, name: string) => AR_HAVEN_TITLES[key] ?? `${name} في المسكن`,
  havenMore: (name: string) => `استكشف ${name}`,
  accEyebrow: 'سكن المسكن',
  accTitle: <>اختر ما <em>يناسبك أكثر</em></>,
  accText: 'غرف حديثة ومفروشة — من الغرف المشتركة بأسرّة بطابقين إلى الغرف المميّزة الخاصة — بالقرب من مكان عملك، سواء كنت مواطناً عُمانياً أو مقيماً وافداً.',
  accRooms: 'جميع الغرف',
  accQuote: 'اطلب عرض سعر',
  specLabels: { occupancy: 'الطاقة الاستيعابية القصوى', area: 'مساحة الغرفة', count: 'إجمالي عدد الغرف' },
  upTo: (n?: string) => `حتى ${n} ${n === '1' ? 'شخص' : 'أشخاص'}`,
  roomsCount: (n?: string) => `${n} غرفة`,
  retailEyebrow: 'متاجر المسكن',
  retailTitle: <>كل ما تحتاجه في مكان واحد، <em>على بُعد خطوات</em></>,
  retailText: 'توفّر متاجر المسكن للمقيمين تجربة تسوّق متكاملة في مكان واحد، ولأصحاب الأعمال فرصة خدمتهم — من البقالة وإكسسوارات الهواتف وصرف العملات إلى الأدوية والملابس والمقاهي والمطاعم.',
  retailChecks: [
    { b: 'وحدات تجزئة من 43.15 م² إلى 90.66 م²', s: 'استفد من قاعدة عملاء قائمة من المقيمين والزوار.' },
    { b: 'الخدمات المالية', s: 'محلات صرافة، ومساحة لجهاز صراف آلي، وموقع لفرع بنكي بمساحة 244.21 م².' },
    { b: 'وحدات للمقهى والمطعم والسوبرماركت', s: 'مقهى 90.37 م² · مطعم 121.98 م² · سوبرماركت 471 م².' },
  ],
  retailSpaces: 'مساحات التجزئة',
  catEyebrow: 'تموين المسكن',
  catTitle: <>وجبات شهية <em>مشمولة</em> في إقامتك</>,
  catText: 'ثلاث وجبات مغذية يومياً تُبقي المقيمين بكامل طاقتهم وجاهزيتهم للعمل. وإلى جانب المائدة اليومية، تلائم خدمات التموين المصمّمة حسب الطلب اجتماعات مجالس الإدارة والمؤتمرات المهنية واحتفالات الفرق — بقوائم طعام يصمّمها طهاتنا وفق ثقافتك وتفضيلاتك وميزانيتك.',
  catFacts: [
    { unit: 'م²', label: 'مطبخ صناعي' },
    { unit: '', label: 'وجبة تموين داخلي' },
    { unit: '', label: 'وجبة تموين خارجي' },
  ],
  catCompanies: 'استكشف التموين',
  catResidents: 'اطلب عرض سعر للتموين',
  spacesLabel: 'المساحات',
  spacesEyebrow: 'مساحات المسكن',
  spacesTitle: <>ارتقِ بأعمالك <em>ومناسباتك الخاصة</em></>,
  spacesText: 'قاعات اجتماعات ومرافق متعددة الاستخدامات مجهّزة بأحدث التقنيات — لاجتماعات مجالس الإدارة والعروض التقديمية وجلسات العصف الذهني، أو لأعياد الميلاد والذكريات السنوية واللقاءات مع الأحبّة — مدعومة بخدمات التموين والإنترنت عالي السرعة وطاقم محترف.',
  reserve: 'احجز أو قم بجولة',
  exploreSpaces: 'استكشف المساحات',
  galleryTitle: 'معرض صور القرية',
  lifeEyebrow: 'أسلوب الحياة في المسكن',
  lifeTitle: <>عِش بصحة، اعمل بذكاء، <em>وتواصل بعمق</em></>,
  lifeLead: 'أكثر من مجرد مكان للإقامة — ملاذ للتواصل واستعادة النشاط والشعور بأنك في بيتك.',
  lifeLabel: 'أسلوب الحياة والمرافق',
  lifestyleItems: [
    { n: '01', t: 'ترفيه منعش', d: 'ملاعب لكرة القدم والتنس والريشة الطائرة، ومساحات خضراء واسعة، وألعاب ممتعة تشجّع على النشاط وروح الفريق.' },
    { n: '02', t: 'لياقة مصمّمة لك', d: 'صالة رياضية مجهّزة بالكامل بمساحات للتمرين الفردي وحصص لياقة جماعية.' },
    { n: '03', t: 'ملتقيات اجتماعية نابضة', d: 'مقاهٍ جذابة — مساحات دافئة للتفاعل واللقاءات غير الرسمية تعزّز روح الانتماء.' },
    { n: '04', t: 'فعاليات وورش عمل', d: 'قاعة ترفيهية للفعاليات المجتمعية وورش العمل وحصص الرقص وأمسيات الألعاب.' },
  ],
  lifeResidents: 'استكشف أسلوب الحياة',
  storyEyebrow: 'قصتنا',
  storyTitle: <>من عرضٍ فائز إلى <em>قرية</em></>,
  storyText: 'طوّرتها شركة أدرك للمرافق والخدمات (AFS)، إحدى شركات مجموعة شركات أدرك.',
  groupEyebrow: 'الشركة القابضة',
  groupTitle: (name: string) => <>جزء من <em>{name}</em></>,
  meetTeam: 'تعرّف على فريق الإدارة',
  newsEyebrow: 'الأخبار والإعلانات',
  newsTitle: <>آخر أخبار <em>القرية</em></>,
  allNews: 'كل الأخبار',
  contactEyebrow: 'تواصل معنا',
  contactTitle: <>أخبرنا بما <em>تحتاجه</em></>,
  call: 'اتصل بنا',
  email: 'البريد الإلكتروني',
  chat: 'المحادثة والتقييمات',
  whatsapp: 'واتساب',
  reviews: 'تقييمات Google',
  visit: 'زورونا',
};

const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale, site } = await getContent();
  const t = COPY[locale];
  return {
    title: { absolute: `${site.name} — ${t.metaTitleTail}` },
    description: t.metaDescription,
    alternates: alternatesFor('/', locale),
  };
}

/** 3×3 mosaic for the catering scene; the centre tile (index 4) is the completed dining hall that opens to full screen. */
const FEAST_TILES = ['cat.canapes', 'cat.kitchen', 'cat.chef', 'cat.hall', 'cat.hallPhoto', 'cat.buffet', 'cat.desserts', 'cat.hall2', 'cat.hallBig'];
const CATERING_VALUES = [3900, 3000, 1000];

export default async function Home() {
  const c = await getContent();
  const t = COPY[c.locale];
  const { site: SITE, facts: FACTS, haven: HAVEN, story: STORY, group: GROUP } = c;
  const spec = (r: (typeof c.rooms)[number], label: string) => r.specs.find((s) => s.label === label)?.value;
  const showcase: ShowcaseRow[] = c.rooms.map((r) => {
    return {
      href: `/rooms/${r.slug}`,
      code: r.code,
      name: r.name,
      text: r.tagline,
      specs: [t.upTo(spec(r, t.specLabels.occupancy)), spec(r, t.specLabels.area) ?? '', t.roomsCount(spec(r, t.specLabels.count))],
      image: img(r.image),
    };
  });
  const CATERING_FACTS = t.catFacts.map((f, i) => ({ ...f, value: CATERING_VALUES[i] }));
  const lifestyleItems = t.lifestyleItems;
  const [lead, ...rest] = c.articles;
  return (
    <>
      {/* 1 — HERO */}
      <section className="hero" data-hero-section aria-labelledby="hero-title">
        <HeroMedia />
        <div className="hero__veil" />
        <div className="container hero__inner">
          <Eyebrow className="hero__eyebrow"><span data-hero="eyebrow">{t.heroEyebrow}</span></Eyebrow>
          <h1 id="hero-title" className="display hero__title" data-hero="title">
            {t.heroTitle}
          </h1>
          <div className="hero__aside glass sheen" data-hero="copy">
            <p className="lead">
              {t.heroLead}
            </p>
            <div className="hero__cta">
              <Button href="/contact-us" dataHero="cta">{t.inquiry}</Button>
              <Button href="#village" variant="line" dataHero="cta">{t.exploreVillage}</Button>
            </div>
          </div>
          <p className="hero__stats" data-hero="cta">
            {FACTS.slice(0, 2).concat(FACTS[6]).map((f) => <span key={f.label}><b>{f.value.toLocaleString('en-US')}{f.suffix}</b>{f.label}</span>)}
          </p>
        </div>
        <div className="hero__cue" data-hero="cue" aria-hidden="true">{t.scroll}</div>
      </section>

      <Marquee items={t.marquee} />

      {/* 2 — INTRODUCTION */}
      <section id="village" className="section" aria-labelledby="intro-title">
        <div className="container grid-12">
          <div className="intro__title">
            <Eyebrow>{t.introEyebrow}</Eyebrow>
            <Heading as="h2" className="display--lg" fx="chars" id="intro-title">
              {t.introTitle}
            </Heading>
          </div>
          <div className="intro__text prose" data-reveal="fade">
            {t.introText.map((p) => <p key={p}>{p}</p>)}
          </div>
          <div className="intro__loc">
            <div className="stamp glass" data-reveal="fade" data-glow><b>{t.stampLocB}</b><span>{t.stampLocS}</span></div>
            <div className="stamp glass" data-reveal="fade" data-delay="0.1" data-glow><b>{t.havenOfFive}</b><span>{t.havenLine}</span></div>
          </div>
          <div className="intro__fig">
            <div data-rise3d="20" data-tilt="5" data-cursor={c.ui.cursor.explore} style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k="hero.courtyard" ratio="4 / 5" sizes="(min-width: 900px) 40vw, 100vw" reveal parallax={0.07} /></div>
            <svg className="intro__seal" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="seal-path" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
              <text><textPath href="#seal-path">{t.seal}</textPath></text>
              <circle cx="100" cy="100" r="5" />
            </svg>
            <div className="intro__badge glass" data-speed="-0.35">
              <span className="intro__badge-k">{t.badgeK}</span>
              <p>{t.badgeText}</p>
            </div>
          </div>
          <div className="intro__fig--b">
            <p className="intro__kicker display display--sm" data-reveal="blur">
              {t.kicker}
            </p>
            <div data-rise3d="20" data-tilt="5" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k="acc.tower" ratio="5 / 4" sizes="(min-width: 900px) 50vw, 100vw" reveal="right" parallax={0.07} /></div>
            <ul className="intro__chips" data-stagger="0.1" data-speed="0.2">
              {[FACTS[2], FACTS[5], FACTS[6]].map((f) => (
                <li key={f.label} className="glass" data-stagger-item>
                  <b><span data-counter={f.value}>{f.value.toLocaleString('en-US')}</span>{f.suffix}{'unit' in f && f.unit ? <small> {String(f.unit)}</small> : null}</b>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-label={t.statementLabel}>
        <div className="container">
          <p className="statement" data-words>{t.statement}</p>
        </div>
      </section>

      {/* 3 — ABOUT & COMMUNITY */}
      <section className="section" aria-labelledby="community-title">
        <div className="container grid-12">
          <div className="about__a">
            <Eyebrow>{t.communityEyebrow}</Eyebrow>
            <h2 id="community-title" className="display display--lg" data-reveal="blur">
              {t.communityTitle}
            </h2>
            <div className="prose" data-reveal="fade" style={{ marginTop: '2rem' }}>
              {t.communityText.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div style={{ marginTop: '2rem' }} data-reveal="fade"><TextLink href="/about-us">{t.aboutLink}</TextLink></div>
            <div className="about__media">
              <div data-tilt="4" style={{ position: 'relative', borderRadius: 'var(--radius)' }}><Media k="life.garden" ratio="4 / 3" sizes="(min-width: 900px) 40vw, 100vw" reveal parallax={0.06} /></div>
              <ul className="about__haven" data-stagger="0.08" aria-label={t.havenOfFive}>
                {HAVEN.map((h, i) => (
                  <li key={h.key} data-stagger-item style={{ '--c': ['var(--c-acc)', 'var(--c-ret)', 'var(--c-cat)', 'var(--c-spa)', 'var(--c-lif)'][i] } as CSSProperties}>
                    <Link href={h.href}>{h.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="about__b quote">
            <figure className="glass">
              <blockquote className="quote__text" data-reveal="fade">
                {t.quote}
              </blockquote>
              <figcaption className="quote__by" data-reveal="fade">
                <Media k="people.thomas" ratio="1 / 1" sizes="72px" position="50% 18%" />
                <span><b>{t.quoteName}</b><span>{t.quoteRole}</span></span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 4 — VERIFIED HIGHLIGHTS */}
      <section className="section section--sand" aria-labelledby="facts-title">
        <div className="container">
          <div className="grid-12" style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}>
            <div style={{ gridColumn: '1 / span 7' }}>
              <Eyebrow>{t.factsEyebrow}</Eyebrow>
              <Heading as="h2" className="display--lg" fx="scale" id="facts-title">{t.factsTitle}</Heading>
            </div>
          </div>
          <div className="facts" data-stagger="0.08">
            {FACTS.map((f) => <Fact key={f.label} {...f} />)}
          </div>
          <p className="fine">{t.factsNote}</p>
        </div>
      </section>

      {/* HAVEN OF FIVE — horizontal storytelling (wrapped: ScrollTrigger moves pinned sections into a pin-spacer, so React must own the parent) */}
      <div>
      <section className="hs" data-hscroll aria-labelledby="haven-title">
        <div className="container hs__head">
          <div>
            <Eyebrow>{t.havenOfFive}</Eyebrow>
            <h2 id="haven-title" className="display display--lg" data-reveal="lines">{t.havenTitle}</h2>
          </div>
          <div className="hs__meta" aria-hidden="true"><span data-hscroll-count>01</span><span className="hs__bar"><i data-hscroll-bar /></span><span>05</span></div>
        </div>
        <ul className="hs__track" data-hscroll-track>
          {HAVEN.map((h, i) => (
            <li key={h.key} className="hs__panel" data-hscroll-panel style={{ '--c': h.color } as CSSProperties}>
              <Media k={h.image} sizes="(min-width: 1024px) 40vw, 100vw" parallax={0.05} />
              <div className="hs__panel-body">
                <div style={{ display: 'grid', gap: 18 }}>
                  <span className="hs__num">{String(i + 1).padStart(2, '0')} / 05</span>
                  <span className="hs__rule" />
                  <div className="hs__title">
                    <Image src={h.mark} alt="" width={44} height={44} />
                    <h3 className="display display--md">{t.havenPanelTitle(h.key, h.name)}</h3>
                  </div>
                  <p className="hs__tag">{h.tagline}</p>
                  <p className="prose" style={{ color: 'var(--muted)' }}>{h.blurb}</p>
                  <p className="hs__ask">{h.ask}</p>
                </div>
                <div className="hs__links">
                  <TextLink href={h.href}>{t.havenMore(h.name)}</TextLink>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      </div>

      {/* 5 — ACCOMMODATION */}
      <section className="section" aria-labelledby="acc-title">
        <div className="container">
          <div className="grid-12" style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}>
            <div style={{ gridColumn: '1 / span 7' }}>
              <Eyebrow color="var(--c-acc)">{t.accEyebrow}</Eyebrow>
              <Heading as="h2" className="display--lg" fx="chars" id="acc-title">{t.accTitle}</Heading>
            </div>
            <div style={{ gridColumn: '9 / span 4', alignSelf: 'end' }} className="prose" data-reveal="fade">
              <p>{t.accText}</p>
            </div>
          </div>
          <RoomShowcase rows={showcase} />
          <div style={{ marginTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }} data-reveal="fade">
            <Button href="/rooms">{t.accRooms}</Button>
            <Button href="/contact-us?kind=Quote&topic=Accommodation#inquiry" variant="line">{t.accQuote}</Button>
          </div>
        </div>
      </section>

      {/* 6 — RETAIL */}
      <section className="section section--paper" aria-labelledby="retail-title">
        <div className="container split split--flip">
          <Media k="retail.frontage" ratio="5 / 4" sizes="(min-width: 900px) 48vw, 100vw" curtain parallax={0.07} className="split__media" />
          <div className="split__body" style={{ '--c': 'var(--c-ret)' } as CSSProperties}>
            <div>
              <Eyebrow color="var(--c-ret)">{t.retailEyebrow}</Eyebrow>
              <Heading as="h2" className="display--lg" fx="blur" id="retail-title">{t.retailTitle}</Heading>
            </div>
            <p className="prose" data-reveal="fade" style={{ color: 'var(--muted)' }}>
              {t.retailText}
            </p>
            <ul className="checks" data-stagger="0.1">
              {t.retailChecks.map((x) => <li key={x.b} data-stagger-item><span><b>{x.b}</b><span>{x.s}</span></span></li>)}
            </ul>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }} data-reveal="fade">
              <TextLink href="/retail-spaces">{t.retailSpaces}</TextLink>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — CATERING: scattered mosaic settles, then the dining hall opens to full screen (data-feast) */}
      <section className="feast" data-feast aria-labelledby="cat-title">
        <div className="feast__stage">
          <div className="feast__grid" data-feast-grid>
            {FEAST_TILES.map((k, i) => (
              <div key={k} className={i === 4 ? 'feast__tile feast__tile--center' : 'feast__tile'} data-feast-tile={i === 4 ? 'center' : ''}>
                <Media k={k} sizes="(min-width: 760px) 32vw, 34vw" />
              </div>
            ))}
          </div>
          <div className="feast__hero" data-feast-hero aria-hidden="true">
            <Media k="cat.hallPhoto" alt="" sizes="100vw" />
          </div>
          <div className="feast__veil" data-feast-veil aria-hidden="true" />
          <div className="feast__intro" data-feast-intro>
            <Eyebrow color="var(--c-cat)">{t.catEyebrow}</Eyebrow>
            <h2 id="cat-title" className="display display--xl">{t.catTitle}</h2>
          </div>
          <div className="feast__card glass" data-feast-card>
            <p className="feast__copy">{t.catText}</p>
            <ul className="feast__facts">
              {CATERING_FACTS.map((f) => (
                <li key={f.label}>
                  <b><span data-feast-count={f.value}>{f.value.toLocaleString('en-US')}</span>+{f.unit && <small> {f.unit}</small>}</b>
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>
            <div className="feast__cta">
              <Button href="/facilities/catering">{t.catCompanies}</Button>
              <Button href="/contact-us?kind=Quote&topic=Catering#inquiry" variant="line">{t.catResidents}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8 — SPACES */}
      <section className="circle" data-circle aria-labelledby="spaces-title">
        <div className="circle__stage">
          <Media k="spaces.cafe" sizes="100vw" circle className="circle__media" />
          <div className="circle__veil" />
          <p className="circle__label" data-circle-label aria-hidden="true"><span>{t.spacesLabel}</span></p>
          <div className="circle__card glass sheen" data-circle-card style={{ '--c': 'var(--c-spa)' } as CSSProperties}>
              <div>
                <Eyebrow color="var(--c-spa)">{t.spacesEyebrow}</Eyebrow>
                <h2 id="spaces-title" className="display display--md">{t.spacesTitle}</h2>
              </div>
              <p className="prose" style={{ color: 'var(--muted)' }}>
                {t.spacesText}
              </p>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                <Button href="/contact-us">{t.reserve}</Button>
                <TextLink href="/facilities/spaces">{t.exploreSpaces}</TextLink>
              </div>
          </div>
        </div>
      </section>

      <RingGallery title={t.galleryTitle} items={[0, 6, 13, 21, 29, 33, 36, 38].map((i) => ({ ...galleryFor(c.locale)[i], caption: galleryFor(c.locale)[i].alt }))} />

      {/* 9 — LIFESTYLE & FACILITIES (image expansion) */}
      <section className="expand" data-expand aria-labelledby="life-title">
        <div className="expand__stage">
          <Media image={img('life.courts')} sizes="100vw" expandFrame className="expand__media" parallax={0.0} style={{ position: 'absolute', inset: 0 }} />
          <div className="expand__veil" />
          <div className="container expand__copy" data-expand-copy>
            <Eyebrow color="var(--c-lif)">{t.lifeEyebrow}</Eyebrow>
            <h2 id="life-title" className="display display--xl">{t.lifeTitle}</h2>
            <p className="lead">{t.lifeLead}</p>
          </div>
        </div>
      </section>
      <section className="section--tight section" aria-label={t.lifeLabel}>
        <div className="container">
          <div className="amen" data-stagger="0.1">
            {lifestyleItems.map((l) => (
              <div key={l.n} data-stagger-item data-glow><span className="n">{l.n}</span><h3>{l.t}</h3><p>{l.d}</p></div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: 'flex', gap: 24, flexWrap: 'wrap' }} data-reveal="fade">
            <Button href="/facilities/lifestyle">{t.lifeResidents}</Button>
          </div>
        </div>
      </section>

      {/* 10 — OUR STORY */}
      <section className="section section--paper" aria-labelledby="story-title">
        <div className="container story">
          <div className="story__head">
            <Eyebrow>{t.storyEyebrow}</Eyebrow>
            <h2 id="story-title" className="display display--lg" data-reveal="lines">{t.storyTitle}</h2>
            <p className="prose" style={{ marginTop: 24, color: 'var(--muted)' }} data-reveal="fade">
              {t.storyText}
            </p>
          </div>
          <ol className="timeline" data-timeline>
            <li className="timeline__rail" aria-hidden="true"><div className="timeline__line" data-timeline-line /></li>
            {STORY.map((s, i) => (
              <li key={i} className="tl-item" data-timeline-item>
                <p className="tl-item__year">{s.year}</p>
                <p className="tl-item__title">{s.title}</p>
              </li>
            ))}
            <li className="tl-item tl-item--now" data-timeline-item>
              <p className="tl-item__year"><CurrentYear /></p>
              <p className="tl-item__title">{c.storyNow}</p>
            </li>
          </ol>
        </div>
      </section>

      {/* GROUP */}
      <section className="section section--sand" aria-labelledby="group-title">
        <div className="container group">
          <div className="group__head">
            <Eyebrow>{t.groupEyebrow}</Eyebrow>
            <h2 id="group-title" className="display display--lg" data-reveal="lines">{t.groupTitle(GROUP.name)}</h2>
          </div>
          <p className="group__lead prose" data-reveal="fade" style={{ color: 'var(--muted)' }}>{GROUP.lead}</p>
          <div className="group__stats" data-stagger="0.1">
            {GROUP.stats.map((s) => (
              <div key={s.label} data-stagger-item><b>{s.prefix}{s.value.toLocaleString('en-US')}{s.suffix}</b><span>{s.label}</span></div>
            ))}
          </div>
          <div className="group__foot">
            <p className="fine" style={{ margin: 0 }}>{GROUP.note}</p>
            <div data-reveal="fade"><TextLink href="/about-us#team">{t.meetTeam}</TextLink></div>
          </div>
        </div>
      </section>

      {/* 11 — NEWS */}
      <section className="section" aria-labelledby="news-title">
        <div className="container">
          <div className="grid-12" style={{ marginBottom: 'clamp(32px, 4vw, 56px)', alignItems: 'end' }}>
            <div style={{ gridColumn: '1 / span 8' }}>
              <Eyebrow>{t.newsEyebrow}</Eyebrow>
              <Heading as="h2" className="display--lg" fx="blur" id="news-title">{t.newsTitle}</Heading>
            </div>
            <div style={{ gridColumn: '10 / span 3', justifySelf: 'end' }} data-reveal="fade"><TextLink href="/news">{t.allNews}</TextLink></div>
          </div>
          <div className="cards" data-stagger="0.12">
            <NewsCard a={lead} />
            {rest.slice(0, 2).map((a) => <NewsCard key={a.slug} a={a} />)}
          </div>
        </div>
      </section>

      {/* 12 — CONTACT */}
      <section id="contact" className="section section--sand" aria-labelledby="contact-title">
        <div className="container contact">
          <div className="contact__info">
            <div>
              <Eyebrow>{t.contactEyebrow}</Eyebrow>
              <h2 id="contact-title" className="display display--lg" data-reveal="chars">{t.contactTitle}</h2>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.call}</h3>
              <ul>{SITE.phones.map((p) => <li key={p.href}><a href={p.href} dir="ltr">{p.label}</a></li>)}</ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.email}</h3>
              <a href={`mailto:${SITE.email}`} dir="ltr">{SITE.email}</a>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.chat}</h3>
              <ul><li><a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">{t.whatsapp} <bdi dir="ltr">{SITE.phones[1].label}</bdi></a></li><li><a href={SITE.reviews} target="_blank" rel="noopener noreferrer">{t.reviews}</a></li></ul>
            </div>
            <div className="info-block" data-reveal="fade">
              <h3>{t.visit}</h3>
              <address>{SITE.address.map((l) => <span key={l}>{l}</span>)}</address>
            </div>
          </div>
          <div className="contact__form glass" data-reveal="fade">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
