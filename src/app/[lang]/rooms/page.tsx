import type { Metadata } from 'next';
import { RoomsOverview } from '@/components/overview';
import { getContent } from '@/i18n/server';
import { alternatesFor } from '@/i18n/config';

const en = {
  metaTitle: 'Rooms — for company workforces and individuals',
  metaDescription:
    'Furnished rooms at Al Maskaan Village, Khazaen Economic City: shared rooms for workers and junior staff, and Single, Double and Triple Premium rooms for managers and senior staff — meals, Wi-Fi and laundry included. Get a quote.',
  title: <>Rooms for every <em>team</em>, and everyone in it</>,
  lead: 'From shared rooms for whole workforces to private premium rooms — for companies and individuals alike.',
  introEyebrow: 'Secure and comfortable',
  introTitle: <>Contemporary, convenient and <em>cared for</em></>,
  introBody: [
    'Experience contemporary, convenient accommodation that transitions seamlessly from work to genuine home-away-from-home comfort. Our offering goes beyond well-appointed rooms and cleverly designed bunks to include three daily meals, on-site shops and cafes, and recreational facilities — so every resident has what they need to relax and recharge.',
    'Whether you are a company housing a workforce, or an Omani citizen or expatriate looking for a place of your own close to work, Al Maskaan Village offers secure, comfortable rooms and a warm, vibrant community.',
  ],
  services: [
    { href: '/retail-spaces', title: 'Retail Spaces', text: 'Shops and services already open in the village, and units available to rent.', image: 'retail.frontage' },
    { href: '/facilities/catering', title: 'Catering', text: 'Three daily meals with every stay, plus catering for meetings and celebrations.', image: 'cat.hallBig' },
    { href: '/facilities/spaces', title: 'Spaces', text: 'Meeting rooms and venues with modern technology and support.', image: 'spaces.cafe' },
    { href: '/facilities/lifestyle', title: 'Lifestyle', text: 'Courts, green space, a gym, cafes and a recreation hall.', image: 'life.courts' },
  ],
};

const ar: typeof en = {
  metaTitle: 'الغرف — للقوى العاملة لدى الشركات وللأفراد',
  metaDescription:
    'غرف مفروشة في قرية المسكن بمدينة خزائن الاقتصادية: غرف مشتركة للعمال والموظفين المبتدئين، وغرف مميّزة فردية ومزدوجة وثلاثية للمدراء وكبار الموظفين — مع الوجبات والإنترنت والغسيل. اطلب عرض سعر.',
  title: <>غرف لكل <em>فريق</em>، ولكل فرد فيه</>,
  lead: 'من الغرف المشتركة للقوى العاملة بالكامل إلى الغرف المميّزة الخاصة — للشركات والأفراد على حد سواء.',
  introEyebrow: 'آمن ومريح',
  introTitle: <>عصري ومريح و<em>مخدوم بعناية</em></>,
  introBody: [
    'استمتع بسكن عصري ومريح ينقلك بسلاسة من أجواء العمل إلى راحة حقيقية تشعرك وكأنك في بيتك. ولا يقتصر ما نقدّمه على الغرف المجهزة جيداً والأسرّة المصممة بذكاء، بل يشمل ثلاث وجبات يومية، ومتاجر ومقاهي داخل القرية، ومرافق ترفيهية — ليجد كل مقيم ما يحتاجه للاسترخاء واستعادة نشاطه.',
    'سواء كنت شركة تبحث عن سكن لقواها العاملة، أو مواطناً عُمانياً أو وافداً يبحث عن مكان خاص به قريب من العمل، توفّر لك قرية المسكن غرفاً آمنة ومريحة ومجتمعاً دافئاً نابضاً بالحياة.',
  ],
  services: [
    { href: '/retail-spaces', title: 'مساحات التجزئة', text: 'متاجر وخدمات تعمل بالفعل في القرية، ووحدات متاحة للإيجار.', image: 'retail.frontage' },
    { href: '/facilities/catering', title: 'التموين', text: 'ثلاث وجبات يومية مع كل إقامة، إضافة إلى التموين للاجتماعات والاحتفالات.', image: 'cat.hallBig' },
    { href: '/facilities/spaces', title: 'المساحات', text: 'قاعات اجتماعات ومرافق مجهزة بأحدث التقنيات والدعم.', image: 'spaces.cafe' },
    { href: '/facilities/lifestyle', title: 'أسلوب الحياة', text: 'ملاعب ومساحات خضراء وصالة رياضية ومقاهٍ وقاعة ترفيهية.', image: 'life.courts' },
  ],
};

const COPY = { en, ar };

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getContent();
  const t = COPY[locale];
  return { title: t.metaTitle, description: t.metaDescription, alternates: alternatesFor('/rooms', locale) };
}

export default async function Page() {
  const t = COPY[(await getContent()).locale];
  return <RoomsOverview title={t.title} lead={t.lead} introEyebrow={t.introEyebrow} introTitle={t.introTitle} introBody={t.introBody} services={t.services} />;
}
