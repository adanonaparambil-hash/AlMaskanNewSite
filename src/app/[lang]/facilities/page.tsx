import type { Metadata } from 'next';
import { Overview } from '@/components/overview';
import { getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

const en = {
  metaTitle: 'Facilities for companies',
  metaDescription:
    'Workforce housing without the stress: contemporary, convenient and cost-effective accommodation, catering, retail, venues and recreation for company workforces at Al Maskaan Village, Khazaen Economic City.',
  title: <>No more accommodation worries: your workforce is <em>housed</em></>,
  lead: 'Forget the stress of managing employee housing. We offer a complete solution that goes beyond rooms.',
  introTitle: <>Contemporary, convenient and <em>cost-effective</em></>,
  introBody: [
    'Experience contemporary, convenient and cost-effective accommodation that transitions seamlessly from work to genuine home-away-from-home comfort. Our offering goes beyond well-appointed rooms and cleverly designed bunks to include three daily catering options, on-site shops and cafes, and recreational facilities — so your workforce has everything they need to relax and recharge.',
    'We also offer versatile business venues for meetings and corporate gatherings. We are a haven of five, carefully designed to help your company thrive.',
    'Step into the comfort of Al Maskaan Village — a modern oasis near your workplace, with secure, comfortable accommodation for Omani citizens and expatriates alike.',
  ],
  rooms: [
    { href: '/facilities/workers', title: 'Workers', tag: 'Wing 1 & 2', text: 'Shared bunk rooms for ten, with meals, internet and laundry included in a monthly package.', image: 'acc.junior1' },
    { href: '/facilities/managers-single-premium', title: 'Managers · Single Premium', tag: 'S1', text: 'A private, fully furnished room for senior staff.', image: 'acc.single' },
    { href: '/facilities/managers-double-premium', title: 'Managers · Double Premium', tag: 'S2', text: 'A shared, fully furnished room for two.', image: 'acc.double' },
    { href: '/facilities/managers-triple-premium', title: 'Managers · Triple Premium', tag: 'S3', text: 'A shared, fully furnished room for three.', image: 'acc.triple' },
  ],
  services: [
    { href: '/facilities/retail-opportunities', title: 'Retail', text: 'Groceries, money exchange, cafes and more — a short stroll from every room.', image: 'retail.frontage' },
    { href: '/facilities/business-opportunities', title: 'Business opportunities', text: 'Retail units from 43.15 m² and offices from 98.4 m².', image: 'retail.office' },
    { href: '/facilities/catering', title: 'Catering', text: 'Three daily meals plus bespoke catering for meetings, conferences and celebrations.', image: 'cat.hallBig' },
    { href: '/facilities/spaces', title: 'Spaces', text: 'Meeting rooms and venues with modern technology and support.', image: 'spaces.cafe' },
    { href: '/facilities/lifestyle', title: 'Lifestyle', text: 'Courts, green space, a gym, cafes and a recreation hall.', image: 'life.courts' },
  ],
};

const ar: typeof en = {
  metaTitle: 'مرافق للشركات',
  metaDescription:
    'سكن للقوى العاملة بلا عناء: سكن عصري ومريح وفعّال من حيث التكلفة، مع التموين والتجزئة وقاعات الفعاليات والترفيه للقوى العاملة لدى الشركات في قرية المسكن، مدينة خزائن الاقتصادية.',
  title: <>لا مزيد من هموم السكن: القوى العاملة لديكم <em>في مسكنها</em></>,
  lead: 'انسَوا عناء إدارة سكن الموظفين. نقدّم لكم حلاً متكاملاً يتجاوز مجرد الغرف.',
  introTitle: <>عصري ومريح و<em>فعّال من حيث التكلفة</em></>,
  introBody: [
    'اكتشفوا سكناً عصرياً ومريحاً وفعّالاً من حيث التكلفة، ينتقل بسلاسة من أجواء العمل إلى راحة حقيقية كأنكم في بيتكم. ولا يقتصر ما نقدّمه على الغرف المجهّزة جيداً والأسرّة المصمّمة بذكاء، بل يشمل ثلاث وجبات يومية، ومتاجر ومقاهي داخل القرية، ومرافق ترفيهية — ليجد العاملون لديكم كل ما يحتاجون إليه للاسترخاء واستعادة النشاط.',
    'كما نوفّر قاعات أعمال متعددة الاستخدامات للاجتماعات والملتقيات المؤسسية. نحن ملاذٌ من خمسة، صُمّم بعناية لمساعدة شركتكم على الازدهار.',
    'ادخلوا إلى عالم الراحة في قرية المسكن — واحة عصرية قريبة من مكان عملكم، تقدّم سكناً آمناً ومريحاً للمواطنين العُمانيين والوافدين على حدٍّ سواء.',
  ],
  rooms: [
    { href: '/facilities/workers', title: 'العمال', tag: 'الجناحان 1 و2', text: 'غرف مشتركة بأسرّة طابقية لعشرة أشخاص، تشمل الوجبات والإنترنت وخدمة الغسيل ضمن باقة شهرية.', image: 'acc.junior1' },
    { href: '/facilities/managers-single-premium', title: 'المدراء · مميّزة فردية', tag: 'S1', text: 'غرفة خاصة مفروشة بالكامل لكبار الموظفين.', image: 'acc.single' },
    { href: '/facilities/managers-double-premium', title: 'المدراء · مميّزة مزدوجة', tag: 'S2', text: 'غرفة مشتركة مفروشة بالكامل لشخصين.', image: 'acc.double' },
    { href: '/facilities/managers-triple-premium', title: 'المدراء · مميّزة ثلاثية', tag: 'S3', text: 'غرفة مشتركة مفروشة بالكامل لثلاثة أشخاص.', image: 'acc.triple' },
  ],
  services: [
    { href: '/facilities/retail-opportunities', title: 'التجزئة', text: 'بقالة وصرافة ومقاهٍ وغير ذلك — على بُعد خطوات قليلة من كل غرفة.', image: 'retail.frontage' },
    { href: '/facilities/business-opportunities', title: 'فرص الأعمال', text: 'وحدات تجزئة تبدأ من 43.15 م² ومكاتب تبدأ من 98.4 م².', image: 'retail.office' },
    { href: '/facilities/catering', title: 'التموين', text: 'ثلاث وجبات يومية، إلى جانب خدمات تموين مخصّصة للاجتماعات والمؤتمرات والاحتفالات.', image: 'cat.hallBig' },
    { href: '/facilities/spaces', title: 'المساحات', text: 'قاعات اجتماعات وفعاليات مزوّدة بأحدث التقنيات والدعم.', image: 'spaces.cafe' },
    { href: '/facilities/lifestyle', title: 'أسلوب الحياة', text: 'ملاعب ومساحات خضراء وصالة رياضية ومقاهٍ وقاعة ترفيهية.', image: 'life.courts' },
  ],
};

const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/facilities', locale) };
}

export default async function Page() {
  const c = await getContent();
  const t = COPY[c.locale];
  return (
    <Overview
      audience="facilities"
      title={t.title}
      lead={t.lead}
      heroImage="acc.tower"
      introTitle={t.introTitle}
      introBody={t.introBody}
      rooms={t.rooms}
      services={t.services}
    />
  );
}
