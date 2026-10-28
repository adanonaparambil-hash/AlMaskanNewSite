// Retail, catering, spaces and lifestyle pages for both audiences (companies = /facilities, individuals = /individuals).
// Transcribed from the original pages; edited lightly for grammar and flow. No figures were added.

export type Stat = { value: number; suffix?: string; unit?: string; label: string };
export type Item = { label?: string; text: string };
export type Section = { title: string; paragraphs?: string[]; items?: Item[]; kicker?: string };
export type Service = {
  slug: string;
  audience: 'individuals' | 'facilities';
  line: 'retail' | 'catering' | 'spaces' | 'lifestyle' | 'business';
  title: string;
  eyebrow: string;
  lead: string;
  image: string;
  gallery: string[];
  stats?: Stat[];
  sections: Section[];
  cta: { title: string; text: string; label: string };
  seo: string;
};

export const SERVICES: Service[] = [
  // ---------------------------------------------------------------- Companies
  {
    slug: 'retail-opportunities',
    audience: 'facilities',
    line: 'retail',
    title: 'Retail for your workforce',
    eyebrow: 'Companies · Retail',
    lead:
      'Choosing Al Maskaan Village as your workforce accommodation means convenience at every turn. Thoughtfully designed retail spaces cover everything from essential daily items to leisurely delights, all just steps away.',
    image: 'retail.frontage',
    gallery: ['retail.office', 'retail.commercial2'],
    sections: [
      {
        title: 'What your workers will enjoy',
        items: [
          { label: 'Comprehensive shopping', text: 'A short stroll from their rooms provides access to everything they require, from groceries and phone accessories to money exchange and fashionable attire.' },
          { label: 'A dynamic community hub', text: 'Cafes and restaurants catering to various tastes create a vibrant atmosphere that enhances the living experience.' },
          { label: 'Time-efficient convenience', text: 'Residents can get what they need without lengthy commutes or crowded stores.' },
          { label: 'Elevated quality of life', text: 'Retail establishments blend into daily life, contributing to a convenient and enriching living experience.' },
        ],
      },
    ],
    cta: { title: 'Equip your workforce with convenience', text: 'Tell us about your team and we will show you how the village supports them.', label: 'Get in touch' },
    seo: 'On-site retail at Al Maskaan Village — groceries, money exchange, phone accessories, cafes and restaurants within a short walk of every room.',
  },
  {
    slug: 'business-opportunities',
    audience: 'facilities',
    line: 'business',
    title: 'Business opportunities',
    eyebrow: 'Companies · Retail & office units',
    lead:
      'For businesses of every size and ambition, Al Maskaan Village presents meticulously designed retail and office units tailored to diverse needs.',
    image: 'retail.office',
    gallery: ['retail.commercial2', 'spaces.lounge'],
    stats: [
      { value: 2000, suffix: '+', unit: 'm²', label: 'Retail spaces' },
      { value: 5000, suffix: '+', unit: 'm²', label: 'Office spaces' },
    ],
    sections: [
      {
        title: '1 · Retail spaces',
        paragraphs: [
          'Whether you are launching a new venture or managing an established company, our rental spaces cater to your distinct needs and growth aspirations. Units range from 43.15 m² to 90.66 m², providing versatile solutions to elevate your business operations.',
        ],
        items: [
          { text: 'Lease contemporary, well-maintained shops strategically located in high-traffic areas.' },
          { text: 'Tap into a pre-established customer base of residents and visitors.' },
          { text: 'Work in a supportive environment within a lively community.' },
        ],
      },
      {
        title: 'Spaces for financial institutions, restaurants and supermarkets',
        paragraphs: ['Some spaces are dedicated to specific needs.'],
        items: [
          { label: 'Exchange stores', text: 'Units of 54.55 m² and 111.03 m² offer ideal spaces, with security and convenience.' },
          { label: 'ATM', text: 'A 24.87 m² ATM space serves as a strategic access point for financial transactions.' },
          { label: 'Bank branch', text: 'A substantial 244.21 m² space provides an excellent location for a comprehensive bank branch.' },
          { label: 'Cafe', text: 'A 90.37 m² cafe unit creates an inviting atmosphere for customers.' },
          { label: 'Restaurant', text: 'A 121.98 m² unit offers ample space for culinary creativity.' },
          { label: 'Supermarket', text: 'A 471 m² supermarket space for a diverse range of groceries and household essentials.' },
        ],
      },
      {
        title: '2 · Office spaces',
        paragraphs: [
          'Whether you run a small start-up, a medium-sized enterprise or a larger corporation, our extensive selection of office units can elevate your productivity.',
        ],
        items: [
          { label: 'A contemporary, polished environment', text: 'Work that combines style and comfort, tailored to businesses of all sizes.' },
          { label: 'Adaptable workspaces', text: 'Adapt office spaces to your team size and work arrangements, fostering collaboration and productivity.' },
          { label: 'Varied selection', text: 'Units range from 98.4 m² to 552.58 m².' },
        ],
      },
    ],
    cta: { title: 'Ready to join our dynamic community?', text: 'Share what you need and we will come back with the right unit.', label: 'Enquire about a unit' },
    seo: 'Retail units from 43.15 m² and office units from 98.4 m² at Al Maskaan Village, Khazaen Economic City — banks, exchange, cafes, restaurants and a supermarket space.',
  },
  {
    slug: 'catering',
    audience: 'facilities',
    line: 'catering',
    title: 'Catering that extends beyond the daily meal',
    eyebrow: 'Companies · Catering',
    lead:
      'Our commitment to three delicious, nutritious meals a day keeps your workforce fuelled and ready to perform. Our catering services also extend far beyond routine sustenance — we understand the power of food to elevate any event.',
    image: 'cat.hallBig',
    gallery: ['cat.kitchen', 'cat.canapes', 'cat.desserts', 'cat.hallPhoto'],
    stats: [
      { value: 3900, suffix: '+', unit: 'm²', label: 'Industrial kitchen' },
      { value: 3000, suffix: '+', label: 'In-house catering serving' },
      { value: 1000, suffix: '+', label: 'External catering serving' },
    ],
    sections: [
      {
        title: 'A culinary experience for every occasion',
        paragraphs: [
          'Whether you are hosting a board meeting, an industry conference or a team-building celebration, we offer bespoke catering to match the tone and purpose of your event. Our chefs collaborate with you to design a menu that reflects your company culture, dietary preferences and budget.',
        ],
        items: [
          { label: 'Meetings', text: 'Impress your stakeholders with sophisticated breakfast spreads, a delicious lunch or elegant afternoon tea.' },
          { label: 'Industry conferences', text: 'Fuel your attendees with vibrant coffee breaks, nourishing lunches and networking dinners that spark meaningful conversations.' },
          { label: 'Team-building celebrations', text: 'Create a fun and festive atmosphere with themed food stations, interactive cooking demonstrations and playful dessert bars.' },
        ],
      },
      {
        title: 'One seamless experience',
        paragraphs: [
          'Leverage our versatile venues for your events and enjoy integrated services that simplify the process of crafting successful and unforgettable moments.',
        ],
      },
    ],
    cta: { title: 'Plan your next event with us', text: 'Tell us the occasion, the numbers and the tone — we will design the menu.', label: 'Get in touch' },
    seo: 'Al Maskaan Catering: three daily meals for your workforce from a 3,900 m² kitchen, plus bespoke catering for meetings, conferences and celebrations.',
  },
  {
    slug: 'spaces',
    audience: 'facilities',
    line: 'spaces',
    title: 'Spaces for business, ready when you are',
    eyebrow: 'Companies · Spaces',
    lead:
      'Whether you are hosting a board meeting, a brainstorming session, a client presentation or any other business gathering, Al Maskaan Spaces has a solution — meeting rooms and venues equipped with the latest technology and modern amenities.',
    image: 'spaces.cafe',
    gallery: ['spaces.lounge', 'spaces.lounge2', 'spaces.recreation', 'spaces.games'],
    stats: [{ value: 5000, suffix: '+', unit: 'm²', label: 'Office spaces' }],
    sections: [
      {
        title: 'A welcoming whereabouts for businesses',
        paragraphs: ['Our commitment extends beyond physical space. Additional services and amenities make life easier and your business run smoother:'],
        items: [
          { label: 'Catering services', text: 'Impress your guests with diverse catering options, tailored to your needs and preferences.' },
          { label: 'High-speed internet', text: 'Stay connected and productive with reliable, secure internet access.' },
          { label: 'Professional support staff', text: 'Our friendly, knowledgeable team is on hand to ensure your experience is exceptional.' },
        ],
      },
    ],
    cta: { title: 'Schedule a tour, or reserve your space', text: 'Contact us today to see how Al Maskaan Spaces can elevate your business experience.', label: 'Get in touch' },
    seo: 'Meeting rooms and venues at Al Maskaan Spaces, Khazaen — modern technology, high-speed internet, catering and professional support.',
  },
  {
    slug: 'lifestyle',
    audience: 'facilities',
    line: 'lifestyle',
    title: 'A community your team can flourish in',
    eyebrow: 'Companies · Lifestyle',
    lead:
      'Choose Al Maskaan Village to unlock the full potential of your most valuable asset — your people. We provide the right environment for peak performance and well-being through a holistic work–life balance.',
    image: 'life.courts',
    gallery: ['life.garden', 'life.pitch', 'life.courts', 'life.mosque'],
    stats: [{ value: 9000, suffix: '+', unit: 'm²', label: 'Landscape spaces' }],
    sections: [
      {
        title: 'More than mere accommodation',
        paragraphs: ['We nurture a thriving community where your team can flourish both professionally and personally:'],
        items: [
          { label: 'Invigorating recreation', text: 'Well-maintained sports courts, expansive green spaces and engaging games promote physical activity and team building.' },
          { label: 'Customised fitness', text: 'A fully equipped gym offers individual workout spaces and group fitness classes.' },
          { label: 'Vibrant social hubs', text: 'Inviting cafes provide warm spaces for interaction and casual meetings, fostering a sense of belonging.' },
          { label: 'Community events and workshops', text: 'Our recreation hall hosts events, workshops and game nights, fostering creativity, connection and team spirit.' },
        ],
      },
      { title: 'A haven for your team', paragraphs: ['More than just a place to stay, a haven for your team to connect, recharge and feel right at home.'] },
    ],
    cta: { title: 'Together, we have fun', text: 'Talk to us about housing your team in a community built for well-being.', label: 'Get in touch' },
    seo: 'Sports courts, green spaces, gym, cafes and a recreation hall at Al Maskaan Village — a holistic work–life environment for your workforce.',
  },

  // -------------------------------------------------------------- Individuals
  {
    slug: 'residents',
    audience: 'individuals',
    line: 'retail',
    title: 'Retail, a step from your door',
    eyebrow: 'Individuals · Retail for residents',
    lead:
      'When you choose Al Maskaan Village for accommodation, you step into a realm of convenience just outside your door. Thoughtfully curated retail spaces offer products and services for every need, from daily essentials to leisurely indulgences.',
    image: 'retail.frontage',
    gallery: ['retail.office', 'retail.commercial2'],
    sections: [
      {
        title: 'What you can expect',
        items: [
          { label: 'One-stop shopping', text: 'Groceries, phone accessories, money exchange, transfer services, medicines and clothing, all within a short stroll of your room.' },
          { label: 'A vibrant community hub', text: 'A lively atmosphere, with cafes and restaurants catering to diverse tastes and preferences.' },
          { label: 'Time-saving convenience', text: 'Long commutes and crowded stores become a thing of the past — get what you need without leaving the village.' },
          { label: 'Enhanced quality of life', text: 'Shops that blend into the daily life of the community for a convenient, enriching living experience.' },
        ],
      },
    ],
    cta: { title: 'Make the village your home', text: 'Ask us about rooms and availability.', label: 'Get in touch' },
    seo: 'Shopping for residents of Al Maskaan Village: groceries, phone accessories, money exchange, medicines, clothing, cafes and restaurants within walking distance.',
  },
  {
    slug: 'business-owners',
    audience: 'individuals',
    line: 'business',
    title: 'Business owners, thrive here',
    eyebrow: 'Individuals · Business owners',
    lead:
      'Showcase your products as a prominent supplier in our vibrant retail space, or elevate your business with a prime office space within our dynamic community — an environment designed for success.',
    image: 'retail.office',
    gallery: ['retail.commercial2', 'retail.frontage'],
    stats: [
      { value: 2000, suffix: '+', unit: 'm²', label: 'Retail spaces' },
      { value: 5000, suffix: '+', unit: 'm²', label: 'Office spaces' },
    ],
    sections: [
      {
        title: '1 · Retail spaces',
        paragraphs: [
          'An exclusive opportunity for individual business owners to thrive in a captive, flourishing market. Whether you are a budding entrepreneur or an established company, we offer tailored options to meet your requirements and fuel your growth.',
        ],
        items: [
          { label: 'All types of business', text: 'Spaces range from 43.15 m² to 90.66 m².' },
          { label: 'Financial solutions', text: '54.55 m² and 111.03 m² units suit an exchange store; a 24.87 m² ATM space; and a 244.21 m² space for a bank branch.' },
          { label: 'Culinary delight', text: 'A 90.37 m² cafe unit, or a 121.98 m² unit for a restaurant.' },
          { label: 'Grocery', text: 'A 471 m² supermarket space for groceries and household essentials.' },
        ],
      },
      {
        title: '2 · Office spaces',
        paragraphs: ['Whether you are a solo entrepreneur, run a small business or lead a larger company, our diverse range of office units can help.'],
        items: [
          { label: 'Modern, professional design', text: 'Stylish, comfortable offices for businesses of all sizes.' },
          { label: 'Flexible configurations', text: 'Tailor offices to your team size and preferred work arrangements.' },
          { label: 'Diverse options', text: 'Units range from 98.4 m² to 552.58 m².' },
        ],
      },
    ],
    cta: { title: 'Ready to join our thriving community?', text: 'Tell us about your enterprise and we will help you find the right space.', label: 'Get in touch' },
    seo: 'Retail units and office spaces for business owners at Al Maskaan Village, Khazaen Economic City — from 43.15 m² to 552.58 m².',
  },
  {
    slug: 'individuals-catering',
    audience: 'individuals',
    line: 'catering',
    title: 'Three meals a day, already taken care of',
    eyebrow: 'Individuals · Catering',
    lead:
      'With three daily meals included in your rental rate, you have access to food whenever you need it — breakfast, lunch or dinner.',
    image: 'cat.hall',
    gallery: ['cat.hall2', 'cat.hallPhoto', 'cat.kitchen'],
    sections: [
      {
        title: 'Cooked for you',
        paragraphs: [
          'Our carefully curated menu aims to satisfy your taste buds, fulfil your nutritional needs and provide unmatched convenience and affordability throughout your stay.',
          'We invite you to indulge in a diverse menu crafted by our skilled chefs, who are dedicated to creating culinary experiences rather than just serving meals. Relax and enjoy.',
        ],
      },
    ],
    cta: { title: 'Come and eat with us', text: 'Ask about rooms — meals are included.', label: 'Get in touch' },
    seo: 'Three daily meals are included in your stay at Al Maskaan Village, prepared by our chefs from a central kitchen.',
  },
  {
    slug: 'individuals-spaces',
    audience: 'individuals',
    line: 'spaces',
    title: 'Where sophistication meets warmth',
    eyebrow: 'Individuals · Spaces',
    lead:
      'Whether you need a space for business meetings, presentations and collaborative sessions, or for a personal event, Al Maskaan Spaces provides rooms equipped with cutting-edge technology and furnishings.',
    image: 'spaces.cafe2',
    gallery: ['spaces.lounge', 'spaces.recreation', 'spaces.games'],
    sections: [
      {
        title: 'For business, and for celebrations',
        paragraphs: [
          'Immerse yourself in a professional setup that suits any business meet-up. Celebrate special occasions — from birthdays to anniversaries and gatherings with loved ones — in versatile, welcoming venues you can transform to create memories you will never forget.',
          'What sets us apart is not only our commitment to hosting business affairs but also diverse catering options tailored to your preferences.',
        ],
      },
    ],
    cta: { title: 'Reserve a space', text: 'Tell us about your occasion.', label: 'Get in touch' },
    seo: 'Meeting rooms and event venues at Al Maskaan Spaces for business meetings and personal celebrations.',
  },
  {
    slug: 'individuals-lifestyle',
    audience: 'individuals',
    line: 'lifestyle',
    title: 'A healthy work–life balance, built in',
    eyebrow: 'Individuals · Lifestyle',
    lead:
      'As busy as you are, it is essential to maintain a healthy work–life balance. At Al Maskaan Village we champion a holistic approach to well-being, with a rich mix of recreational facilities and engaging activities.',
    image: 'life.courts',
    gallery: ['life.garden', 'life.pitch', 'life.courts', 'life.mosque'],
    sections: [
      {
        title: 'Community life, every day',
        paragraphs: [
          'Our commitment to a healthy, active lifestyle extends beyond conventional living spaces, fostering genuine community life with numerous events and activities.',
        ],
        items: [
          { label: 'Courts and green space', text: 'Well-maintained football, tennis and badminton courts, with expansive green areas, set the scene for invigorating matches, leisurely games and spontaneous gatherings.' },
          { label: 'Fitness', text: 'A fully equipped gym accommodates individual workouts and group fitness classes.' },
          { label: 'Cafes', text: 'Inviting cafes serve as vibrant hubs for social interaction and casual meetings.' },
          { label: 'Recreation hall', text: 'A versatile space for community events, workshops, dance classes and game nights that encourage connection and spark creativity — so you always feel among family and friends.' },
        ],
      },
    ],
    cta: { title: 'Consider becoming a resident', text: 'Ask us about rooms and availability.', label: 'Get in touch' },
    seo: 'Football, tennis and badminton courts, a gym, cafes and a recreation hall at Al Maskaan Village.',
  },
];

export const servicesFor = (audience: Service['audience']) => SERVICES.filter((s) => s.audience === audience);
export const findService = (audience: Service['audience'], slug: string) => SERVICES.find((s) => s.audience === audience && s.slug === slug);

export const ABOUT = {
  purpose: 'To nurture human and business fulfilment.',
  vision: 'To create a home-away-from-home community and foster growth and wellbeing.',
  mission: 'To revolutionise workers’ accommodation and service while providing companies with affordable and hassle-free solutions.',
  values: [
    { name: 'Quality', text: 'We are committed to providing services and activities that exceed our customers’ expectations. We continuously improve the quality of everything we do to ensure customer satisfaction and deliver on our high standards of excellence.' },
    { name: 'Sustainability', text: 'We are here to stay, and we are committed to meeting the needs of the present without compromising the ability to generate future growth and prosperity. We will respect the environment, conduct business ethically and responsibly, and make decisions based on the common good.' },
    { name: 'Empathy', text: 'We are committed to building meaningful relationships and a culture where everyone feels valued and respected. We regularly solicit feedback, listen to our stakeholders’ stories and experiences, and address their concerns in a timely way.' },
  ],
  apart: [
    { label: 'Forward-thinking and innovative', text: 'We constantly explore new horizons and embrace cutting-edge solutions to enhance our services.' },
    { label: 'Dedicated to inclusivity', text: 'We foster a vibrant, welcoming environment for everyone, where diversity is celebrated and all individuals feel valued and respected.' },
    { label: 'Unwavering commitment', text: 'We are passionate about exceeding expectations and offering a seamless experience that supports productivity and well-being.' },
  ],
  committed: [
    { label: 'A comfortable and affordable haven', text: 'A space that feels like home, offering exceptional value for money.' },
    { label: 'An environment for productivity and well-being', text: 'Resources and amenities designed to support professional and personal needs, helping our community thrive in every aspect of life.' },
    { label: 'Continuous improvement', text: 'We are always seeking ways to elevate our residents’ experience and remain at the forefront of the accommodation industry.' },
  ],
  team: [
    {
      name: 'Dr. Thomas Alexander',
      role: 'Founder and Chairman',
      image: 'people.thomas',
      bio: [
        'Dr. Thomas Alexander has been instrumental in propelling the company to its current stature. Under his leadership the company has flourished, with approximately 6,000 employees and an order book surpassing USD 1 billion. Its operations and projects extend across the Sultanate of Oman.',
        'With a career spanning over three decades, Dr. Alexander has been a driving force in the delivery of engineering and construction services in Oman, with a diverse portfolio of landmark projects across industries.',
      ],
    },
    {
      name: 'Dr. Aadil Alexander',
      role: 'Executive Director',
      image: 'people.aadil',
      bio: [
        'Dr. Aadil Alexander spearheads strategic asset management initiatives at Al Adrak Group. He aligns asset expansion with business growth while empowering teams to monitor efficiency, and leads data collection and analysis to optimise asset utilisation.',
        'He implements preventive maintenance to extend equipment lifespan and minimise downtime, and ensures the seamless allocation of essential resources to support site progress.',
      ],
    },
    {
      name: 'Riyas Mohamed',
      role: 'Chief Executive Officer',
      image: 'people.riyas',
      bio: [
        'Riyas Mohamed leads Al Adrak Group’s strategic direction, formulating and executing plans to achieve organisational goals. He guides and aligns departments, and manages daily operations including resource allocation, staffing and coordination.',
        'His hands-on approach ensures smooth operations, while his communication and collaborative spirit build trust with stakeholders and drive mutually beneficial partnerships.',
      ],
    },
    {
      name: 'Richard Sequeira',
      role: 'Vice President — Group Facilities, Agriculture & Carbon',
      image: 'people.richard',
      bio: [
        'Richard Sequeira oversees site mobilisation, camp set-ups and a centralised kitchen catering to the needs of over 10,000 guests, ensuring efficient, high-standard facility operations and maintenance.',
        'He also leads Trufud, the company’s agricultural and aquaponics arm, spearheading initiatives that enhance Oman’s food security, and manages Al Maskaan Village.',
      ],
    },
    {
      name: 'Rajan Prabhakaran',
      role: 'General Manager — Projects & Development',
      image: 'people.rajan',
      bio: [
        'Rajan Prabhakaran oversees the technical aspects of Al Adrak Group projects. With over two decades of experience in Oman and India, he navigates project complexities, ensuring adherence to quality standards and optimal execution.',
      ],
    },
    {
      name: 'Rajesh Menon',
      role: 'General Manager — Al Maskaan Village & Business Development',
      image: 'people.rajesh',
      bio: [
        'Rajesh Menon leads Al Maskaan Village as General Manager and heads its business development. He oversees a community of more than 1,300 residents across over 400 rooms, serving a diverse portfolio of corporate clients. His remit covers property operations, guest experience, food and beverage, and commercial performance. Under his leadership, the Village’s dining outlets (Liwan Restaurant, Mint Café and Safi Dining Hall) operate under HACCP certification. He has also introduced structured systems for revenue management, procurement and compliance.',
        'He brings nearly three decades of experience in hospitality, facilities management and sales across India and Oman, including leadership roles with Frankincense Hotel & Resorts and Hotel Muscat Holiday (formerly Holiday Inn). A certified Train The Trainer professional who speaks six languages, he is committed to delivering on the Village’s promise of going beyond accommodation.',
      ],
    },
  ],
};

export const CLIENTS = [
  { name: 'Al-Nab’a Group L.L.C', file: '/assets/images/clients/al-naba-group.png' },
  { name: 'Al-Nab’a — Ambition Unlimited', file: '/assets/images/clients/al-naba-ambition-unlimited.jpg' },
  { name: 'Home Suite', file: '/assets/images/clients/home-suite.jpg' },
  { name: 'Muscat Hills Aluminium Systems', file: '/assets/images/clients/muscat-hills-aluminium.jpg' },
  { name: 'Food Development Company', file: '/assets/images/clients/food-development-company.jpg' },
  { name: 'KV Group', file: '/assets/images/clients/kv-group.jpg' },
  { name: 'Suhol Alfayha', file: '/assets/images/clients/suhol-alfayha.jpg' },
];
