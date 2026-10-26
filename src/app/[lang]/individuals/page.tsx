import type { Metadata } from 'next';
import { Overview } from '@/components/overview';
import { getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

const en = {
  metaTitle: 'For individuals — your home away from home',
  metaDescription:
    'Secure, comfortable and affordable accommodation for individuals at Al Maskaan Village, with three daily meals, shopping, recreation and community on site in Khazaen Economic City.',
  title: <>Your home <em>away</em> from home</>,
  lead: 'Everything you need to unwind and enjoy your time, close to your workplace.',
  introTitle: <>Everything you need to <em>unwind</em></>,
  introBody: [
    'Step into the comfort of Al Maskaan Village — a modern oasis designed to bring you peace and relaxation after a long day of work. Situated conveniently close to your workplace, we offer secure and comfortable accommodation, meticulously designed to cater to your every need.',
    'Whether you are an Omani citizen or an expatriate seeking a haven of tranquillity, Al Maskaan Village provides everything you need to unwind and enjoy your time away from work. Let our warm hospitality and vibrant community embrace you, making your stay a truly rewarding experience.',
  ],
  rooms: [
    { href: '/individuals/junior-staff', title: 'Junior Staff', tag: 'Wing 1 & 2', text: 'A place to stay alongside other residents in a bunk room for ten, with meals, internet and laundry included.', image: 'acc.junior1' },
    { href: '/individuals/senior-staff-single-premium', title: 'Senior Staff · Single Premium', tag: 'S1', text: 'Privacy and your own cosy after-work space.', image: 'acc.single' },
    { href: '/individuals/senior-staff-double-premium', title: 'Senior Staff · Double Premium', tag: 'S2', text: 'A space for two, with everything you need to feel at home.', image: 'acc.double' },
    { href: '/individuals/senior-staff-triple-premium', title: 'Senior Staff · Triple Premium', tag: 'S3', text: 'Share the space, reduce the rent, keep the comfort.', image: 'acc.triple' },
  ],
  services: [
    { href: '/individuals/residents', title: 'Retail', text: 'Shopping, money exchange, medicines, cafes and restaurants within a short stroll.', image: 'retail.frontage' },
    { href: '/individuals/business-owners', title: 'Business owners', text: 'Retail and office units for entrepreneurs and established companies.', image: 'retail.office' },
    { href: '/individuals/individuals-catering', title: 'Catering', text: 'Three daily meals are included in your rental rate.', image: 'cat.hall' },
    { href: '/individuals/individuals-spaces', title: 'Spaces', text: 'Rooms for business meetings and personal celebrations.', image: 'spaces.cafe2' },
    { href: '/individuals/individuals-lifestyle', title: 'Lifestyle', text: 'Football, tennis and badminton, a gym, cafes and a recreation hall.', image: 'life.courts' },
  ],
};

const ar: typeof en = {
  metaTitle: 'للأفراد — بيتك بعيداً عن البيت',
  metaDescription:
    'سكن آمن ومريح وبأسعار معقولة للأفراد في قرية المسكن، مع ثلاث وجبات يومية ومتاجر ومرافق ترفيهية ومجتمع نابض بالحياة داخل القرية في مدينة خزائن الاقتصادية.',
  title: <>بيتك <em>بعيداً</em> عن البيت</>,
  lead: 'كل ما تحتاج إليه للاسترخاء والاستمتاع بوقتك، بالقرب من مكان عملك.',
  introTitle: <>كل ما تحتاج إليه <em>للاسترخاء</em></>,
  introBody: [
    'ادخل إلى عالم الراحة في قرية المسكن — واحة عصرية صُمّمت لتمنحك السكينة والاسترخاء بعد يوم عمل طويل. وبفضل موقعنا القريب من مكان عملك، نقدّم لك سكناً آمناً ومريحاً، صُمّم بعناية فائقة ليلبّي جميع احتياجاتك.',
    'سواء كنت مواطناً عُمانياً أو وافداً تبحث عن ملاذ للهدوء، توفّر لك قرية المسكن كل ما تحتاج إليه للاسترخاء والاستمتاع بوقتك بعيداً عن العمل. دع ضيافتنا الدافئة ومجتمعنا النابض بالحياة يحتضنانك، لتكون إقامتك تجربة مُجزية حقاً.',
  ],
  rooms: [
    { href: '/individuals/junior-staff', title: 'الموظفون المبتدئون', tag: 'الجناحان 1 و2', text: 'مكان للإقامة إلى جانب مقيمين آخرين في غرفة بأسرّة طابقية لعشرة أشخاص، تشمل الوجبات والإنترنت وخدمة الغسيل.', image: 'acc.junior1' },
    { href: '/individuals/senior-staff-single-premium', title: 'كبار الموظفين · مميّزة فردية', tag: 'S1', text: 'خصوصية ومساحة دافئة خاصة بك بعد العمل.', image: 'acc.single' },
    { href: '/individuals/senior-staff-double-premium', title: 'كبار الموظفين · مميّزة مزدوجة', tag: 'S2', text: 'مساحة لشخصين، فيها كل ما تحتاجان إليه لتشعرا وكأنكما في البيت.', image: 'acc.double' },
    { href: '/individuals/senior-staff-triple-premium', title: 'كبار الموظفين · مميّزة ثلاثية', tag: 'S3', text: 'تشارك المساحة، وتخفّض الإيجار، وتحافظ على الراحة.', image: 'acc.triple' },
  ],
  services: [
    { href: '/individuals/residents', title: 'التجزئة', text: 'تسوّق وصرافة وأدوية ومقاهٍ ومطاعم على بُعد خطوات قليلة.', image: 'retail.frontage' },
    { href: '/individuals/business-owners', title: 'أصحاب الأعمال', text: 'وحدات تجزئة ومكاتب لروّاد الأعمال والشركات القائمة.', image: 'retail.office' },
    { href: '/individuals/individuals-catering', title: 'التموين', text: 'ثلاث وجبات يومية مشمولة في قيمة الإيجار.', image: 'cat.hall' },
    { href: '/individuals/individuals-spaces', title: 'المساحات', text: 'قاعات لاجتماعات العمل والاحتفالات الشخصية.', image: 'spaces.cafe2' },
    { href: '/individuals/individuals-lifestyle', title: 'أسلوب الحياة', text: 'كرة القدم والتنس والريشة الطائرة، وصالة رياضية ومقاهٍ وقاعة ترفيهية.', image: 'life.courts' },
  ],
};

const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/individuals', locale) };
}

export default async function Page() {
  const c = await getContent();
  const t = COPY[c.locale];
  return (
    <Overview
      audience="individuals"
      title={t.title}
      lead={t.lead}
      heroImage="life.garden"
      introTitle={t.introTitle}
      introBody={t.introBody}
      rooms={t.rooms}
      services={t.services}
    />
  );
}
