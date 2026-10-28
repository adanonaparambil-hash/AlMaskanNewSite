// Arabic version of site.ts — same exports, keys, order and array lengths. Numbers, hrefs and ids are unchanged.

import type { NavItem } from './site';

export const SITE = {
  name: 'قرية المسكن',
  arabicName: 'قرية المسكن',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://almaskaanvillage.com',
  tagline: 'الارتقاء بالمعيشة والعمل',
  description:
    'قرية المسكن مشروع سكني متعدد الاستخدامات للعاملين، يتمحور حول المجتمع، ويقع في مدينة خزائن الاقتصادية في بركاء، على طريق مسقط–الباطنة السريع في سلطنة عُمان.',
  operator: 'شركة أدرك للمرافق والخدمات ش.م.م (AFS)',
  group: 'مجموعة شركات أدرك',
  address: ['قرية المسكن', 'شركة أدرك للمرافق والخدمات ش.م.م (AFS)', 'مدينة خزائن الاقتصادية، بركاء', 'ص.ب 1465، الرمز البريدي 130', 'سلطنة عُمان'],
  phones: [
    { label: '+968 2200 1300', href: 'tel:+96822001300' },
    { label: '+968 7847 7776', href: 'tel:+96878477776' },
  ],
  email: 'operations@almaskaanvillage.com',
  whatsapp: 'https://wa.me/96878477776',
  reviews: 'https://maps.app.goo.gl/2mk2L5cP3F1qkVeY9',
  responseTime: 'يوم عمل واحد',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/almaskaanoman/' },
    { label: 'Facebook', href: 'https://www.facebook.com/almaskaanvillage' },
    { label: 'Instagram', href: 'https://www.instagram.com/almaskaanvillage' },
    { label: 'YouTube', href: 'https://www.youtube.com/@AlMaskaanVillage' },
  ],
  video: { id: 'ngpgxRNUFh4', title: 'فيلم قرية المسكن' },
};

export const NAV: NavItem[] = [
  { label: 'من نحن', href: '/about-us' },
  {
    label: 'الغرف',
    href: '/rooms',
    children: [
      { label: 'جميع الغرف', href: '/rooms', note: 'للشركات والأفراد' },
      { label: 'الغرفة المشتركة', href: '/rooms/shared', note: 'العمال والموظفون المبتدئون · حتى 10' },
      { label: 'مميّزة فردية', href: '/rooms/single-premium', note: 'المدراء وكبار الموظفين · S1' },
      { label: 'مميّزة مزدوجة', href: '/rooms/double-premium', note: 'المدراء وكبار الموظفين · S2' },
      { label: 'مميّزة ثلاثية', href: '/rooms/triple-premium', note: 'المدراء وكبار الموظفين · S3' },
    ],
  },
  { label: 'مساحات التجزئة', href: '/retail-spaces' },
  {
    label: 'الخدمات',
    href: '/facilities/catering',
    children: [
      { label: 'التموين', href: '/facilities/catering', note: 'ثلاثة منافذ للطعام · شهادة HACCP' },
      { label: 'المساحات', href: '/facilities/spaces', note: 'قاعات اجتماعات ومرافق للفعاليات' },
      { label: 'أسلوب الحياة', href: '/facilities/lifestyle', note: 'الرياضة والصالة الرياضية والمساحات الخضراء' },
    ],
  },
  { label: 'العملاء', href: '/clients' },
  { label: 'الأخبار', href: '/news' },
  { label: 'معرض الصور', href: '/gallery' },
  { label: 'المخطط العام', href: '/masterplan' },
];

export const FOOTER_LINKS = {
  main: [
    { label: 'من نحن', href: '/about-us' },
    { label: 'الغرف', href: '/rooms' },
    { label: 'مساحات التجزئة', href: '/retail-spaces' },
    { label: 'العملاء', href: '/clients' },
    { label: 'الأخبار', href: '/news' },
    { label: 'معرض الصور', href: '/gallery' },
    { label: 'المخطط العام', href: '/masterplan' },
    { label: 'تواصل معنا', href: '/contact-us' },
  ],
  stay: [
    { label: 'السكن', href: '/rooms' },
    { label: 'التجزئة', href: '/retail-spaces' },
    { label: 'التموين', href: '/facilities/catering' },
    { label: 'المساحات', href: '/facilities/spaces' },
    { label: 'أسلوب الحياة', href: '/facilities/lifestyle' },
  ],
};

/** «ملاذ الخمسة» — خطوط الخدمة الخمسة في القرية، لكلٍّ منها لون شعاره. */
export const HAVEN = [
  {
    key: 'accommodation',
    ask: 'هل أنت شركة تبحث عن سكن للقوى العاملة يعزّز رضا الموظفين وولاءهم، أم فرد يبحث عن مساحة معيشة مريحة وملائمة ومُرضية؟ استكشف خياراتك الآن.',
    tagline: 'اختر ما يناسبك أكثر',
    name: 'السكن',
    color: '#789848',
    mark: '/assets/logos/amv-mark-accommodation.png',
    blurb: 'غرف مفروشة للأفراد وللقوى العاملة في الشركات، من الغرف المشتركة بأسرّة بطابقين إلى الغرف المميّزة الخاصة.',
    image: 'acc.single',
    href: '/rooms',
  },
  {
    key: 'retail',
    ask: 'هل تبحث عن مساحة استراتيجية لتنمية أعمالك في مجتمع مزدهر، أم عن متاجر مصمّمة لتلبية احتياجاتك الخاصة؟ اكتشف العروض المصمّمة خصيصاً لك.',
    tagline: 'تقدّم متاجر المسكن للمقيمين تجربة تسوق متكاملة في مكان واحد، وتمنح أصحاب الأعمال فرصة المساهمة في هذه التجربة.',
    name: 'التجزئة',
    color: '#8c8c8c',
    mark: '/assets/logos/amv-mark-retail.png',
    blurb: 'تجربة تسوق متكاملة في مكان واحد للمقيمين، وسوق ثابتة لأصحاب الأعمال.',
    image: 'retail.frontage',
    href: '/retail-spaces',
  },
  {
    key: 'catering',
    ask: 'هل أنت شركة بحاجة إلى خدمات تموين ترتقي بفعالياتك وتترك انطباعاً يدوم، أم فرد يبحث عن تجربة طعام شهية وسلسة؟ اطّلع على ما يمكننا تقديمه لك.',
    tagline: 'استمتع بالراحة مع تموين المسكن: وجبات شهية مشمولة في إقامتك',
    name: 'التموين',
    color: '#c81828',
    mark: '/assets/logos/amv-mark-catering.png',
    blurb: 'ثلاث وجبات يومياً مشمولة في الإقامة، وخدمات تموين مصمّمة حسب الطلب للاجتماعات والمؤتمرات والاحتفالات.',
    image: 'cat.hallBig',
    href: '/facilities/catering',
  },
  {
    key: 'spaces',
    ask: 'هل تخطط لأي نوع من اجتماعات العمل أو لقاءات الشركات أو الفعاليات المهنية؟ اكتشف المكان المثالي لفعاليتك.',
    tagline: 'ارتقِ بلقاءاتك العملية والشخصية في مساحات المسكن.',
    name: 'المساحات',
    color: '#9858a8',
    mark: '/assets/logos/amv-mark-spaces.png',
    blurb: 'قاعات اجتماعات وأماكن متعددة الاستخدامات للقاءات العمل والعروض التقديمية والاحتفالات الشخصية.',
    image: 'spaces.cafe',
    href: '/facilities/spaces',
  },
  {
    key: 'lifestyle',
    ask: 'هل تحرص شركتك على توفير الاسترخاء والأنشطة الترفيهية بعد العمل، أم أنك فرد مجتهد يتطلع إلى الرفاهية وأوقات الفراغ؟ اكتشف مجموعتنا من خيارات أسلوب الحياة.',
    tagline: 'مع أسلوب الحياة في المسكن: عِش بصحة، اعمل بذكاء، وتواصل بعمق',
    name: 'أسلوب الحياة',
    color: '#d88808',
    mark: '/assets/logos/amv-mark-lifestyle.png',
    blurb: 'ملاعب رياضية ومساحات خضراء وصالة رياضية ومقاهٍ وقاعة ترفيه تبني مجتمعاً حقيقياً.',
    image: 'life.courts',
    href: '/facilities/lifestyle',
  },
];

export const STORY = [
  { year: '2022', title: 'فوز AFS بالعطاء، واستكمال مفهوم المشروع وتصميمه، وبدء أعمال الإنشاء' },
  { year: '2023', title: 'تسمية المشروع قرية المسكن' },
  { year: '2024', title: 'القرية تفتح أبوابها لأول المقيمين، ويتبعها افتتاح السوبرماركت والعيادة وجهاز الصراف الآلي لبنك مسقط وجوي الوكاس للصرافة' },
];

export const STORY_NOW = 'اليوم، موطن لأكثر من 1,300 مقيم في أكثر من 400 غرفة';

export const FACTS = [
  { value: 3000, suffix: '+', label: 'وحدة سكنية للموظفين المبتدئين' },
  { value: 1000, suffix: '+', label: 'وحدة سكنية لكبار الموظفين' },
  { value: 3900, suffix: '+', unit: 'م²', label: 'مساحات التموين' },
  { value: 2000, suffix: '+', unit: 'م²', label: 'مساحات التجزئة' },
  { value: 5000, suffix: '+', unit: 'م²', label: 'المساحات المكتبية' },
  { value: 9000, suffix: '+', unit: 'م²', label: 'مساحات أسلوب الحياة' },
  { value: 300, suffix: '+', label: 'موقف للمركبات' },
];

/** حقائق المجموعة الأم — من السِّيَر الذاتية لفريق الإدارة في صفحة «من نحن» الأصلية. */
export const GROUP = {
  name: 'مجموعة شركات أدرك',
  lead: 'تتولى شركة أدرك للمرافق والخدمات ش.م.م (AFS) تطوير قرية المسكن وتشغيلها، وهي جزء من مجموعة أدرك التي تقدّم خدمات الهندسة والإنشاءات، ولها عمليات ومشاريع في مختلف أنحاء سلطنة عُمان.',
  stats: [
    { value: 6000, prefix: '≈', suffix: '', label: 'موظف في المجموعة' },
    { value: 1, prefix: '', suffix: ' مليار دولار+', label: 'حجم الطلبيات لدى المجموعة' },
    { value: 10000, prefix: '', suffix: '+', label: 'ضيف يخدمهم المطبخ المركزي للمجموعة' },
  ],
  note: 'الأرقام كما وردت في السِّيَر الذاتية لفريق الإدارة على الموقع الأصلي.',
};
