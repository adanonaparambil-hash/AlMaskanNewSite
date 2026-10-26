// Curates + optimises the downloaded originals into public/assets and writes the asset manifest.
// Originals stay untouched in source-assets/originals. Run: npm run assets
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const ORIG = path.join(ROOT, 'source-assets/originals');
const PUB = path.join(ROOT, 'public/assets');
const W = (t, ext = 'jpeg') => `2024_02_WhatsApp-Image-2024-02-29-at-${t}.${ext}`;

// key -> [original file, destination (relative to public/assets), alt, note]
const IMAGES = {
  // hero & masterplan
  'hero.aerial': ['hero/aerial-masterplan-2000.jpg', 'images/hero/aerial-masterplan.jpg', 'Aerial rendering of Al Maskaan Village: residential blocks, sports court and amenity buildings in Khazaen Economic City'],
  'hero.courtyard': [W('15.46.42'), 'images/hero/courtyard-aerial.jpg', 'Aerial view of the residential courtyard with basketball and tennis courts'],
  // accommodation
  'acc.tower': [W('15.41.59'), 'images/accommodation/residential-block-corner.jpg', 'Corner of an Al Maskaan Village residential block under a blue sky'],
  'acc.block': [W('15.46.16'), 'images/accommodation/residential-block-frontage.jpg', 'Residential block frontage with parking'],
  'acc.street': [W('15.38.07-1'), 'images/accommodation/landscaped-walkway.jpg', 'Landscaped paved walkway between residential blocks'],
  'acc.junior1': ['2024_02_JB-Bed-room-view-1-scaled.jpg', 'images/accommodation/junior-staff-room-1.jpg', 'Junior staff room with steel bunk beds and wardrobes'],
  'acc.junior2': ['2024_02_JB-Bed-room-view-2-scaled.jpg', 'images/accommodation/junior-staff-room-2.jpg', 'Junior staff room with bunks, desk and wardrobes'],
  'acc.junior3': [W('15.43.24-1'), 'images/accommodation/junior-staff-room-3.jpg', 'Junior staff bunk room with study table'],
  'acc.juniorPlan': [W('15.41.29'), 'images/accommodation/junior-staff-rooms-isometric.jpg', 'Isometric cutaway of junior staff bunk rooms'],
  'acc.single': [W('15.42.27'), 'images/accommodation/senior-single-premium.jpg', 'Single Premium room with queen bed, sofa, desk and television'],
  'acc.single2': [W('15.42.35-1'), 'images/accommodation/senior-single-premium-2.jpg', 'Single Premium room seating corner'],
  'acc.double': [W('15.42.20'), 'images/accommodation/senior-double-premium.jpg', 'Double Premium room with two single beds, sofa and coffee table'],
  'acc.triple': [W('15.42.43'), 'images/accommodation/senior-triple-premium.jpg', 'Triple Premium room with three single beds'],
  // retail
  'retail.frontage': [W('15.53.10'), 'images/retail/retail-frontage.jpg', 'Retail frontage with mobile shop, ATM and exchange units'],
  'retail.office': [W('15.50.48'), 'images/retail/commercial-building.jpg', 'Three-storey commercial building with glazed facade'],
  'retail.commercial2': [W('15.51.46'), 'images/retail/commercial-building-street.jpg', 'Commercial building seen from the street'],
  // catering
  'cat.hall': [W('15.37.10'), 'images/catering/dining-hall-render.jpg', 'Dining hall with serving counters and green chairs'],
  'cat.hall2': [W('15.38.46'), 'images/catering/dining-hall-long.jpg', 'Long dining hall with tables and green chairs'],
  'cat.hallBig': [W('15.38.07-2'), 'images/catering/dining-hall-main.jpg', 'Main community dining hall with red and white chairs'],
  'cat.hallPhoto': ['2024_06_AlMaskaanVillage_WelcomeResidents_2.jpg', 'images/catering/dining-hall-built.jpg', 'The completed dining hall with rows of tables and red chairs'],
  'cat.kitchen': ['2024_04_AlMaskaanVillage_Catering_3.jpg', 'images/catering/central-kitchen.jpg', 'Central kitchen with chefs and commercial cooking equipment'],
  'cat.canapes': [W('15.35.30-1'), 'images/catering/canapes.jpg', 'Canapé platter for events (stock photograph used on the original website)'],
  'cat.desserts': [W('15.35.30'), 'images/catering/dessert-cups.jpg', 'Dessert cups served at an event (stock photograph used on the original website)'],
  'cat.buffet': ['2024_06_AlMaskaanVillage_Catering_1.jpg', 'images/catering/buffet-service.jpg', 'Buffet service for corporate events'],
  'cat.chef': ['2024_02_catering-popup.jpeg', 'images/catering/chef-plating.jpg', 'Chef plating a dish (stock photograph used on the original website)'],
  // spaces & facilities
  'spaces.lounge': [W('15.55.55'), 'images/spaces/office-lounge.jpg', 'Bright office lounge with round tables and white chairs'],
  'spaces.lounge2': [W('15.57.02'), 'images/spaces/meeting-lounge.jpg', 'Meeting lounge with glass-walled meeting room'],
  'spaces.cafe': [W('15.56.45-1'), 'images/spaces/cafe-atrium.jpg', 'Cafe on a double-height atrium with landscaped stair'],
  'spaces.cafe2': [W('15.56.55'), 'images/spaces/cafe-atrium-2.jpg', 'Cafe and atrium with planting'],
  'spaces.recreation': [W('15.56.45'), 'images/spaces/recreation-centre.jpg', 'Recreation centre lobby with lounge seating and timber stair'],
  'spaces.games': [W('15.56.55-2'), 'images/spaces/games-lounge.jpg', 'Lounge with colourful sofas beside a glass-walled room'],
  // lifestyle
  'life.garden': ['2024_03_Al-Maskaan-Village1.jpg', 'images/lifestyle/garden-pergola.jpg', 'Landscaped garden with pergola and seating between residential blocks'],
  'life.courts': [W('15.49.48-2'), 'images/lifestyle/courtyard-basketball.jpg', 'Aerial view of the courtyard with basketball and tennis courts'],
  'life.pitch': [W('15.49.48-1'), 'images/lifestyle/football-pitch.jpg', 'Aerial view of the football pitch beside the recreation hall'],
  'life.mosque': [W('15.49.48'), 'images/facilities/mosque-and-pitch.jpg', 'Aerial view of the village mosque, football pitch and parking'],
  'life.hall': [W('15.47.15'), 'images/lifestyle/recreation-hall-exterior.jpg', 'Recreation hall exterior with parking'],
  'fac.service': [W('15.38.07'), 'images/facilities/service-building.jpg', 'Service building exterior with coach'],
  // people
  'people.thomas': ['people/dr-thomas-alexander-2026.jpg', 'images/people/dr-thomas-alexander-2026.jpg', 'Portrait of Dr. Thomas Alexander, Founder and Chairman'],
  'people.aadil': ['2024_02_Dr.-Aadil-Alexander-1.jpg', 'images/people/dr-aadil-alexander.jpg', 'Portrait of Dr. Aadil Alexander, Executive Director'],
  'people.riyas': ['2024_02_Mr.-Riyas-Mohamed-1.jpg', 'images/people/riyas-mohamed.jpg', 'Portrait of Riyas Mohamed, Chief Executive Officer'],
  'people.richard': ['2024_02_Mr.-Richard-Sequeria-1.jpg', 'images/people/richard-sequeira.jpg', 'Portrait of Richard Sequeira, DGM Facility Management'],
  'people.rajan': ['2024_02_Mr.-Rajan-P-1.jpg', 'images/people/rajan-prabhakaran.jpg', 'Portrait of Rajan Prabhakaran, DGM Technical'],
};

const COPY = {
  // logos & icons are copied untouched
  'logos/al-maskaan-village-logo.png': '2024_01_logo-6.png',
  'logos/al-maskaan-village-mark.png': '2024_03_logo-favicon.png',
  'logos/al-maskaan-village-logo-dots.png': '2024_01_AMV-Logo-Dots.png',
  'logos/amv-accommodation.png': '2024_02_AMV-Accommodation-Logo-V.png',
  'logos/amv-catering.png': '2024_02_AMV-Catering-Logo-V.png',
  'logos/amv-retail.png': '2024_02_AMV-Retail-Logo-V.png',
  'logos/amv-spaces.png': '2024_02_AMV-Spaces-Logo-V.png',
  'logos/amv-lifestyle.png': '2024_02_AMV-Lifestyle-Logo-V.png',
  'logos/amv-mark-accommodation.png': '2024_01_haven-of-5-accomodation.png',
  'logos/amv-mark-catering.png': '2024_01_haven-of-5-catering.png',
  'logos/amv-mark-retail.png': '2024_01_haven-of-5-retail.png',
  'logos/amv-mark-spaces.png': '2024_01_haven-of-5-spaces.png',
  'logos/amv-mark-lifestyle.png': '2024_01_haven-of-5-lifestyle.png',
};
const CLIENTS = {
  'images/clients/al-naba-group.png': '2025_09_ANG-Logo_11zon-1-1.png',
  'images/clients/al-naba-ambition-unlimited.jpg': '2025_09_COMPANY-LOGO_11zon-1.jpg',
  'images/clients/home-suite.jpg': '2025_09_homesuite_11zon-1.jpg',
  'images/clients/muscat-hills-aluminium.jpg': '2025_09_muscat_11zon-1.jpg',
  'images/clients/food-development-company.jpg': '2025_09_food-Logo-1-salalah-mills_11zon-1.jpg',
  'images/clients/kv-group.jpg': '2025_09_suhol-1-1_11zon-1.jpg',
  'images/clients/suhol-alfayha.jpg': '2025_09_suhol-2-1_11zon-1.jpg',
};


// Gallery: [original suffix, category, alt]  (categories mirror the original site's filters)
const GALLERY = [
  ['15.49.48-2','village','Aerial view of the courtyard with basketball and tennis courts'],
  ['15.46.42','village','Courtyard seen from above with sports courts and landscaping'],
  ['15.49.48-4','village','Courtyard with tennis courts and residential blocks'],
  ['15.49.48-3','village','Courtyard with courts and residential balconies'],
  ['15.49.48','village','Mosque, football pitch and parking from above'],
  ['15.49.48-1','village','Football pitch and amenity building from above'],
  ['15.38.07-1','village','Paved landscaped walkway between residential blocks'],
  ['15.41.59','village','Residential block corner at street level'],
  ['15.41.59-1','village','Residential block facade'],
  ['15.46.16','village','Residential block frontage and parking'],
  ['15.47.15','village','Recreation hall exterior'],
  ['15.38.07','village','Service building exterior'],
  ['15.50.48','village','Commercial building with glazed facade'],
  ['15.51.46','village','Commercial building corner'],
  ['15.51.14','village','Amenity building exterior'],
  ['15.57.10','village','Amenity building entrance and parking'],
  ['15.41.45','accommodation','Junior staff bunk room'],
  ['15.43.24-1','accommodation','Junior staff room with study table'],
  ['15.43.24','accommodation','Junior staff room with wardrobes'],
  ['15.41.29','accommodation','Isometric view of junior staff bunk rooms'],
  ['15.44.21','accommodation','Isometric view of bunk room layout'],
  ['15.42.27','accommodation','Single Premium room'],
  ['15.42.35-1','accommodation','Single Premium room with seating'],
  ['15.42.20','accommodation','Double Premium room'],
  ['15.42.20-1','accommodation','Double Premium room with sofa'],
  ['15.42.43','accommodation','Triple Premium room'],
  ['15.42.43-1','accommodation','Triple Premium room with three beds'],
  ['15.37.10','catering','Dining hall with serving counters'],
  ['15.38.46','catering','Long dining hall with green chairs'],
  ['15.38.07-2','catering','Main community dining hall'],
  ['15.38.07-3','catering','Dining hall from the entrance'],
  ['15.35.30-1','catering','Canapé platter'],
  ['15.35.30','catering','Dessert cups'],
  ['15.53.10','retail','Retail frontage with mobile shop, ATM and exchange'],
  ['15.55.55','spaces','Office lounge'],
  ['15.57.02','spaces','Meeting lounge'],
  ['15.56.45-1','spaces','Cafe atrium'],
  ['15.56.55','spaces','Cafe and atrium planting'],
  ['15.56.45','lifestyle','Recreation centre lobby'],
  ['15.56.55-2','lifestyle','Lounge beside a glass-walled meeting room'],
  ['15.56.55-1','lifestyle','Cafe seating beside the atrium'],
];

const out = { images: {}, manifest: [], gallery: [] };
const ensure = (p) => fs.mkdirSync(path.dirname(p), { recursive: true });
const rec = (o) => out.manifest.push(o);
const stat = async (f) => { const m = await sharp(f).metadata(); return { w: m.width, h: m.height }; };

for (const [key, [file, dest, alt]] of Object.entries(IMAGES)) {
  const src = path.join(ORIG, file);
  if (!fs.existsSync(src)) { console.warn('MISSING', file); continue; }
  const d = path.join(PUB, dest);
  ensure(d);
  const meta = await stat(src);
  const width = Math.min(meta.w, 2200);
  await sharp(src).rotate().resize({ width, withoutEnlargement: true }).jpeg({ quality: 84, mozjpeg: true, progressive: true }).toFile(d);
  const o = await stat(d);
  out.images[key] = { src: '/assets/' + dest, w: o.w, h: o.h, alt };
  rec({ key, original: file, local: 'assets/' + dest, w: o.w, h: o.h, origW: meta.w, origH: meta.h, bytes: fs.statSync(d).size });
  if (meta.w < 1000) console.warn('LOW-RES', key, meta.w + 'x' + meta.h);
}
for (const [dest, file] of Object.entries({ ...COPY, ...CLIENTS })) {
  const src = path.join(ORIG, file);
  if (!fs.existsSync(src)) { console.warn('MISSING', file); continue; }
  const d = path.join(PUB, dest.startsWith('images/') ? dest : dest);
  ensure(d);
  if (/clients/.test(dest) && /\.jpg$/.test(dest)) {
    await sharp(src).resize({ width: 480, withoutEnlargement: true }).jpeg({ quality: 88 }).toFile(d);
  } else if (/clients/.test(dest)) {
    await sharp(src).resize({ width: 480, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(d);
  } else fs.copyFileSync(src, d);
  const m = await stat(d);
  rec({ key: dest, original: file, local: 'assets/' + dest, w: m.w, h: m.h, bytes: fs.statSync(d).size });
}

// social share image
await sharp(path.join(ORIG, '2024_03_Al-Maskaan-Village.jpg')).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 84 }).toFile(path.join(PUB, 'hero/og.jpg'));

// gallery
for (const [suffix, cat, alt] of GALLERY) {
  const file = W(suffix);
  const src = path.join(ORIG, file);
  if (!fs.existsSync(src)) { console.warn('MISSING', file); continue; }
  const dest = `images/gallery/${cat}-${suffix.replaceAll('.', '')}.jpg`;
  const d = path.join(PUB, dest);
  ensure(d);
  const meta = await stat(src);
  await sharp(src).rotate().resize({ width: 1800, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(d);
  const o = await stat(d);
  out.gallery.push({ src: '/assets/' + dest, w: o.w, h: o.h, cat, alt });
  rec({ key: 'gallery.' + cat, original: file, local: 'assets/' + dest, w: o.w, h: o.h, origW: meta.w, origH: meta.h, bytes: fs.statSync(d).size });
}

// news images
const news = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/content/news.generated.json'), 'utf8'));
out.news = {};
for (const n of news) {
  if (!n.imageFile) continue;
  const src = path.join(ORIG, n.imageFile);
  const dest = `images/news/${n.date}-${n.slug.slice(0, 48).replace(/-+$/, '')}.jpg`;
  const d = path.join(PUB, dest);
  ensure(d);
  const meta = await stat(src);
  await sharp(src).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(d);
  const o = await stat(d);
  out.news[n.slug] = { src: '/assets/' + dest, w: o.w, h: o.h };
  rec({ key: 'news.' + n.slug, original: n.imageFile, local: 'assets/' + dest, w: o.w, h: o.h, origW: meta.w, origH: meta.h, bytes: fs.statSync(d).size });
}

fs.writeFileSync(path.join(ROOT, 'src/content/images.generated.json'), JSON.stringify({ images: out.images, news: out.news, gallery: out.gallery }, null, 1));
fs.writeFileSync(path.join(ROOT, 'source-assets/curated-manifest.json'), JSON.stringify(out.manifest, null, 1));
console.log('images', Object.keys(out.images).length, 'news', Object.keys(out.news).length, 'manifest', out.manifest.length);
