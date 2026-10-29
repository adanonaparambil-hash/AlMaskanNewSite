// Replaces the renders and stock images with AMV's own photos (Oct 2026 shoot) and rebuilds the gallery from them.
// Run after build-assets.mjs, with the path to AMV's photo folder:
//   node scripts/real-photos.mjs "<…>/Al Maskaan Photos amv"
// Writes optimised copies to public/assets/images/amv/, points the image keys (images.generated.json) at them,
// replaces the gallery, and adds the Arabic alt text (images.ar.json). Near-identical burst shots are left out.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC = process.argv[2];
if (!SRC || !fs.existsSync(SRC)) throw new Error('Pass the path to the "Al Maskaan Photos amv" folder');
const OUT_DIR = 'images/amv';
const PUB = path.join(ROOT, 'public/assets', OUT_DIR);
fs.mkdirSync(PUB, { recursive: true });

const SEL = 'AlMaskaanVillageSelection';
const DRONE = 'DRONE PHOTO/JPEG';
const P1 = 'PHOTOS/1', P2 = 'PHOTOS/2', P3 = 'PHOTOS/3';

// image key -> [photo, file name, English alt, Arabic alt]
const KEYS = {
  'hero.aerial': [`${DRONE}/DJI_0208.JPG`, 'village-aerial', 'Aerial view of Al Maskaan Village: residential blocks, dining hall and amenity buildings in Khazaen Economic City', 'منظر جوي لقرية المسكن: المباني السكنية وقاعة الطعام ومباني المرافق في مدينة خزائن الاقتصادية'],
  'hero.courtyard': [`${SEL}/IMG_6569.JPG`, 'courtyard-courts-night', 'The residential courtyard and sports courts lit at night', 'الفناء السكني والملاعب الرياضية مضاءة ليلاً'],
  'acc.tower': [`${P1}/IMG_6499.JPG`, 'residential-block-corner', 'Corner of a residential block with balconies', 'زاوية مبنى سكني بشرفاته'],
  'acc.block': [`${SEL}/OST00087.JPG`, 'residential-block-frontage', 'Residential block frontage with parking', 'واجهة مبنى سكني مع مواقف السيارات'],
  'acc.street': [`${SEL}/IMG_6395.JPG`, 'landscaped-courtyard', 'Landscaped green courtyard and footpath between residential blocks', 'فناء أخضر منسّق وممر للمشاة بين المباني السكنية'],
  'acc.junior1': [`${P3}/OST00298.JPG`, 'shared-room', 'Shared room with steel bunk beds and wardrobes', 'غرفة مشتركة بأسرّة معدنية بطابقين وخزائن ملابس'],
  'acc.junior2': [`${P3}/OST00302.JPG`, 'shared-room-2', 'Shared room with bunks, desk and wardrobe', 'غرفة مشتركة بأسرّة بطابقين ومكتب وخزانة'],
  'acc.junior3': [`${P2}/IMG_6613.JPG`, 'shared-room-3', 'Shared room with bunk beds and wardrobes', 'غرفة مشتركة بأسرّة بطابقين وخزائن ملابس'],
  'acc.bedspace': [`${P3}/OST00305.JPG`, 'individual-bedspace', 'Individual bedspace with a single bed in a shared room', 'سرير فردي في غرفة مشتركة'],
  'acc.basic': [`${P2}/IMG_6614.JPG`, 'basic-room', 'Basic room with bunk beds and wardrobes', 'غرفة أساسية بأسرّة بطابقين وخزائن'],
  'acc.single': [`${P3}/OST00040.JPG`, 'single-premium', 'Single Premium room with queen bed, sofa and coffee table', 'غرفة مميّزة فردية بسرير كوين وأريكة وطاولة قهوة'],
  'acc.single2': [`${P3}/OST00046.JPG`, 'single-premium-2', 'Single Premium room with desk and television', 'غرفة مميّزة فردية بمكتب وتلفزيون'],
  'acc.double': [`${P3}/OST00050.JPG`, 'double-premium', 'Double Premium room with two beds, sofa and coffee table', 'غرفة مميّزة مزدوجة بسريرين وأريكة وطاولة قهوة'],
  'acc.triple': [`${P1}/IMG_6408.JPG`, 'triple-premium', 'Triple Premium room with three beds', 'غرفة مميّزة ثلاثية بثلاثة أسرّة'],
  'retail.frontage': [`${P1}/IMG_6420.JPG`, 'commercial-building', 'Commercial building with Joyalukkas Exchange and the Bank Muscat ATM', 'المبنى التجاري مع جوي الوكاس للصرافة وجهاز الصراف الآلي لبنك مسقط'],
  'retail.office': [`${P1}/IMG_6523.JPG`, 'commercial-building-glass', 'Glass-fronted commercial building with the Al Maskaan Village sign', 'المبنى التجاري بواجهته الزجاجية ولافتة قرية المسكن'],
  'retail.commercial2': [`${P1}/IMG_6521.JPG`, 'commercial-building-corner', 'Corner of the commercial building', 'زاوية المبنى التجاري'],
  'cat.hall': [`${SEL}/OST00267.JPG`, 'dining-hall', 'Safi Dining Hall with rows of tables and red chairs', 'قاعة صافي للطعام بصفوف الطاولات والكراسي الحمراء'],
  'cat.hall2': [`${P3}/OST00271.JPG`, 'dining-hall-2', 'Long view down Safi Dining Hall', 'منظر طولي لقاعة صافي للطعام'],
  'cat.hallBig': [`${P3}/OST00259.JPG`, 'dining-hall-3', 'Safi Dining Hall, the village’s main dining hall', 'قاعة صافي للطعام، قاعة الطعام الرئيسية في القرية'],
  'cat.hallPhoto': [`${P1}/IMG_6543.JPG`, 'dining-hall-4', 'Safi Dining Hall set for service', 'قاعة صافي للطعام جاهزة للخدمة'],
  'cat.kitchen': [`${P3}/OST00097.JPG`, 'central-kitchen', 'The central kitchen with commercial cooking equipment', 'المطبخ المركزي بمعدات الطهي التجارية'],
  'cat.canapes': [`${SEL}/IMG_6602.JPG`, 'buffet-counter', 'Hot dishes at the buffet counter', 'أطباق ساخنة على منضدة البوفيه'],
  'cat.desserts': [`${P3}/OST00146.JPG`, 'kitchen-team', 'The catering team in the central kitchen', 'فريق التموين في المطبخ المركزي'],
  'cat.buffet': [`${P1}/IMG_6587.JPG`, 'chefs-buffet', 'Chefs at the buffet line', 'الطهاة عند خط البوفيه'],
  'cat.chef': [`${P2}/IMG_6659.JPG`, 'chef-wok', 'A chef cooking over a flaming wok', 'طاهٍ يطهو على مقلاة مشتعلة'],
  'spaces.lounge': [`${SEL}/IMG_6343.JPG`, 'lounge', 'Lounge with round tables and chairs', 'صالة جلوس بطاولات مستديرة وكراسٍ'],
  'spaces.lounge2': [`${P3}/OST00026.JPG`, 'lounge-2', 'Lounge with tables and window seating', 'صالة بطاولات وجلسات بجانب النوافذ'],
  'spaces.cafe': [`${P3}/OST00061.JPG`, 'cafe', 'Café seating beside full-height windows', 'جلسات المقهى بجانب نوافذ ممتدة'],
  'spaces.cafe2': [`${P1}/IMG_6403.JPG`, 'lounge-3', 'Lounge with bar seating and city views', 'صالة بمقاعد بار وإطلالة'],
  'spaces.recreation': [`${SEL}/OST00072.JPG`, 'reception', 'Reception lobby', 'بهو الاستقبال'],
  'spaces.games': [`${P3}/OST00020.JPG`, 'lobby-seating', 'Lobby seating area', 'منطقة الجلوس في البهو'],
  'life.garden': [`${P1}/IMG_6468.JPG`, 'pergola-garden', 'Pergola and seating in the landscaped courtyard', 'مظلة خشبية وجلسات في الفناء المنسّق'],
  'life.courts': [`${P1}/IMG_6581.JPG`, 'courts-night', 'Sports courts in the courtyard at night', 'الملاعب الرياضية في الفناء ليلاً'],
  'life.pitch': [`${P1}/IMG_6385.JPG`, 'football-pitch', 'The football pitch beside the recreation building', 'ملعب كرة القدم بجانب مبنى الترفيه'],
  'life.mosque': [`${P1}/IMG_6446.JPG`, 'mosque', 'The village mosque', 'مسجد القرية'],
  'life.hall': [`${P1}/IMG_6391.JPG`, 'recreation-building', 'Recreation building beside the football pitch', 'مبنى الترفيه بجانب ملعب كرة القدم'],
  'fac.service': [`${P2}/IMG_6758.JPG`, 'safi-dining-hall', 'Safi Dining Hall building', 'مبنى قاعة صافي للطعام'],
};

// gallery: [photo, file name, category, English alt, Arabic alt] — reuses a key's photo where it is the best shot
const GALLERY = [
  [`${DRONE}/DJI_0208.JPG`, 'village-aerial', 'village', 'Aerial view of the village', 'منظر جوي للقرية'],
  [`${DRONE}/DJI_0214.JPG`, 'village-aerial-2', 'village', 'The village from above, with the mosque and dining hall', 'القرية من الأعلى مع المسجد وقاعة الطعام'],
  [`${DRONE}/DJI_0238.JPG`, 'village-aerial-3', 'village', 'The village and the Hajar mountains beyond', 'القرية وجبال الحجر في الأفق'],
  [`${DRONE}/DJI_0260.JPG`, 'village-night-above', 'village', 'The village from directly above at night', 'القرية من الأعلى مباشرة ليلاً'],
  [`${DRONE}/DJI_0276.JPG`, 'village-night-aerial', 'village', 'The village lit up at night', 'القرية مضاءة ليلاً'],
  [`${SEL}/IMG_6750.JPG`, 'block-sign', 'village', 'Residential block with the Al Maskaan Village name', 'مبنى سكني يحمل اسم قرية المسكن'],
  [`${P1}/IMG_6499.JPG`, 'residential-block-corner', 'village', 'Corner of a residential block', 'زاوية مبنى سكني'],
  [`${SEL}/OST00087.JPG`, 'residential-block-frontage', 'village', 'Residential block frontage', 'واجهة مبنى سكني'],
  [`${SEL}/IMG_6395.JPG`, 'landscaped-courtyard', 'village', 'Landscaped courtyard between the blocks', 'الفناء المنسّق بين المباني'],
  [`${P3}/OST00293.JPG`, 'green-courtyard-dusk', 'village', 'Green courtyard at dusk', 'الفناء الأخضر عند الغسق'],
  [`${P2}/IMG_6794.JPG`, 'block-night', 'village', 'Residential block lit at night', 'مبنى سكني مضاء ليلاً'],
  [`${P3}/OST00222.JPG`, 'block-night-2', 'village', 'Residential block and gardens at night', 'مبنى سكني وحدائق ليلاً'],
  [`${P3}/OST00241.JPG`, 'block-night-3', 'village', 'Residential block under the evening sky', 'مبنى سكني تحت سماء المساء'],
  [`${SEL}/IMG_6412.JPG`, 'wayfinding', 'village', 'Signposts to the supermarket, ATM, pharmacy, clinic and dining hall', 'لافتات إرشادية إلى السوبرماركت والصراف الآلي والصيدلية والعيادة وقاعة الطعام'],
  [`${P3}/OST00040.JPG`, 'single-premium', 'accommodation', 'Single Premium room', 'غرفة مميّزة فردية'],
  [`${P3}/OST00046.JPG`, 'single-premium-2', 'accommodation', 'Single Premium room with desk and television', 'غرفة مميّزة فردية بمكتب وتلفزيون'],
  [`${P3}/OST00050.JPG`, 'double-premium', 'accommodation', 'Double Premium room', 'غرفة مميّزة مزدوجة'],
  [`${P1}/IMG_6408.JPG`, 'triple-premium', 'accommodation', 'Triple Premium room', 'غرفة مميّزة ثلاثية'],
  [`${P3}/OST00298.JPG`, 'shared-room', 'accommodation', 'Shared room with bunk beds', 'غرفة مشتركة بأسرّة بطابقين'],
  [`${P3}/OST00306.JPG`, 'shared-room-4', 'accommodation', 'Shared room with wardrobes and beds', 'غرفة مشتركة بخزائن وأسرّة'],
  [`${P2}/IMG_6613.JPG`, 'shared-room-3', 'accommodation', 'Shared room in Wing 1', 'غرفة مشتركة في الجناح 1'],
  [`${SEL}/IMG_6695.JPG`, 'washroom', 'accommodation', 'Shared washroom', 'دورة المياه المشتركة'],
  [`${P1}/IMG_6341.JPG`, 'corridor', 'accommodation', 'Residential corridor', 'ممر في المبنى السكني'],
  [`${SEL}/OST00267.JPG`, 'dining-hall', 'catering', 'Safi Dining Hall', 'قاعة صافي للطعام'],
  [`${P3}/OST00259.JPG`, 'dining-hall-3', 'catering', 'Safi Dining Hall seating', 'جلسات قاعة صافي للطعام'],
  [`${P3}/OST00271.JPG`, 'dining-hall-2', 'catering', 'Long view down the dining hall', 'منظر طولي لقاعة الطعام'],
  [`${P3}/OST00287.JPG`, 'dining-tables', 'catering', 'Dining hall tables and chairs', 'طاولات وكراسي قاعة الطعام'],
  [`${SEL}/IMG_6602.JPG`, 'buffet-counter', 'catering', 'Hot dishes at the buffet counter', 'أطباق ساخنة على منضدة البوفيه'],
  [`${P1}/IMG_6587.JPG`, 'chefs-buffet', 'catering', 'Chefs at the buffet line', 'الطهاة عند خط البوفيه'],
  [`${P2}/IMG_6659.JPG`, 'chef-wok', 'catering', 'A chef cooking over a flaming wok', 'طاهٍ يطهو على مقلاة مشتعلة'],
  [`${P3}/OST00097.JPG`, 'central-kitchen', 'catering', 'The central kitchen', 'المطبخ المركزي'],
  [`${P3}/OST00121.JPG`, 'prep-kitchen', 'catering', 'Food preparation room', 'غرفة تحضير الطعام'],
  [`${P3}/OST00146.JPG`, 'kitchen-team', 'catering', 'The catering team', 'فريق التموين'],
  [`${P2}/IMG_6758.JPG`, 'safi-dining-hall', 'catering', 'Safi Dining Hall building', 'مبنى قاعة صافي للطعام'],
  [`${P2}/IMG_6815.JPG`, 'safi-dining-hall-night', 'catering', 'Safi Dining Hall sign at night', 'لافتة قاعة صافي للطعام ليلاً'],
  [`${P1}/IMG_6420.JPG`, 'commercial-building', 'retail', 'Commercial building with the exchange and ATM', 'المبنى التجاري مع الصرافة والصراف الآلي'],
  [`${P2}/IMG_6807.JPG`, 'joyalukkas-exchange', 'retail', 'Joyalukkas Exchange at night', 'جوي الوكاس للصرافة ليلاً'],
  [`${P2}/IMG_6744.JPG`, 'bank-muscat-atm', 'retail', 'Bank Muscat self-service banking', 'الخدمات المصرفية الذاتية لبنك مسقط'],
  [`${P2}/IMG_6799.JPG`, 'bank-muscat-night', 'retail', 'Bank Muscat at night', 'بنك مسقط ليلاً'],
  [`${P2}/IMG_6702.JPG`, 'clinic-reception', 'retail', 'Clinic reception and waiting area', 'استقبال العيادة ومنطقة الانتظار'],
  [`${P3}/OST00321.JPG`, 'clinic-lab', 'retail', 'The clinic’s laboratory', 'مختبر العيادة'],
  [`${SEL}/OST00088.JPG`, 'exchange-signpost', 'retail', 'Joyalukkas Exchange and the clinic signpost', 'جوي الوكاس للصرافة ولافتة العيادة'],
  [`${SEL}/IMG_6343.JPG`, 'lounge', 'spaces', 'Lounge with round tables', 'صالة بطاولات مستديرة'],
  [`${P3}/OST00026.JPG`, 'lounge-2', 'spaces', 'Lounge with window seating', 'صالة بجلسات بجانب النوافذ'],
  [`${P3}/OST00061.JPG`, 'cafe', 'spaces', 'Café seating', 'جلسات المقهى'],
  [`${P3}/OST00074.JPG`, 'lobby', 'spaces', 'Reception lobby', 'بهو الاستقبال'],
  [`${P3}/OST00020.JPG`, 'lobby-seating', 'spaces', 'Lobby seating area', 'منطقة الجلوس في البهو'],
  [`${P1}/IMG_6385.JPG`, 'football-pitch', 'lifestyle', 'The football pitch', 'ملعب كرة القدم'],
  [`${SEL}/IMG_6569.JPG`, 'courtyard-courts-night', 'lifestyle', 'Courtyard sports courts at night', 'ملاعب الفناء ليلاً'],
  [`${P1}/IMG_6581.JPG`, 'courts-night', 'lifestyle', 'Sports courts from above at night', 'الملاعب من الأعلى ليلاً'],
  [`${P1}/IMG_6446.JPG`, 'mosque', 'lifestyle', 'The village mosque', 'مسجد القرية'],
  [`${P1}/IMG_6468.JPG`, 'pergola-garden', 'lifestyle', 'Pergola in the courtyard', 'المظلة الخشبية في الفناء'],
  [`${SEL}/IMG_6473.JPG`, 'pergola-walk', 'lifestyle', 'Shaded walk under the pergola', 'ممر مظلّل تحت المظلة الخشبية'],
  [`${P2}/IMG_6819.JPG`, 'garden-night', 'lifestyle', 'Bougainvillea and garden lights at night', 'الجهنمية وإنارة الحديقة ليلاً'],
];

// the "Already open" strip on /retail-spaces
const OUTLETS = {
  exchange: [`${P2}/IMG_6807.JPG`, 'joyalukkas-exchange'],
  clinic: [`${P2}/IMG_6702.JPG`, 'clinic-reception'],
  atm: [`${P2}/IMG_6744.JPG`, 'bank-muscat-atm'],
};

const done = new Map();
async function make(rel, name) {
  if (done.has(name)) return done.get(name);
  const src = path.join(SRC, rel);
  if (!fs.existsSync(src)) throw new Error(`missing photo: ${rel}`);
  const file = path.join(PUB, `${name}.jpg`);
  const info = await sharp(src).rotate().resize({ width: 1800, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(file);
  const out = { src: `/assets/${OUT_DIR}/${name}.jpg`, w: info.width, h: info.height };
  done.set(name, out);
  return out;
}

const genPath = path.join(ROOT, 'src/content/images.generated.json');
const arPath = path.join(ROOT, 'src/content/images.ar.json');
const gen = JSON.parse(fs.readFileSync(genPath, 'utf8'));
const ar = JSON.parse(fs.readFileSync(arPath, 'utf8'));

for (const [key, [rel, name, alt, altAr]] of Object.entries(KEYS)) {
  const o = await make(rel, name);
  gen.images[key] = { ...o, alt };
  ar[o.src] = altAr;
}
gen.gallery = [];
for (const [rel, name, cat, alt, altAr] of GALLERY) {
  const o = await make(rel, name);
  gen.gallery.push({ ...o, cat, alt });
  if (!ar[o.src]) ar[o.src] = altAr;
}
gen.outlets = {};
for (const [key, [rel, name]] of Object.entries(OUTLETS)) gen.outlets[key] = await make(rel, name);

fs.writeFileSync(genPath, JSON.stringify(gen, null, 1));
fs.writeFileSync(arPath, JSON.stringify(ar, null, 2) + '\n');
const bytes = [...done.values()].reduce((n, o) => n + fs.statSync(path.join(ROOT, 'public', o.src)).size, 0);
console.log(`${done.size} photos written (${(bytes / 1048576).toFixed(1)} MB); ${Object.keys(KEYS).length} keys, ${gen.gallery.length} gallery items`);
