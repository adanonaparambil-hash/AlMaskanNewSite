// Crawls a running instance (default http://localhost:3200): every internal page, link, image and asset must return 200.
// Usage: node scripts/check-site.mjs [baseUrl]
const base = process.argv[2] ?? 'http://localhost:3200';
const seen = new Set();
const queue = ['/'];
const bad = [];
const assets = new Set();
let pages = 0;

while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await fetch(base + path, { redirect: 'manual' });
  if (res.status >= 300 && res.status < 400) { bad.push(`${path} -> redirect ${res.status}`); continue; }
  if (!res.ok) { bad.push(`${path} -> ${res.status}`); continue; }
  if (!(res.headers.get('content-type') ?? '').includes('html')) continue;
  pages++;
  const html = await res.text();
  if (!/<title>[^<]+<\/title>/.test(html)) bad.push(`${path}: missing <title>`);
  if (!/<meta name="description"/.test(html)) bad.push(`${path}: missing meta description`);
  if ((html.match(/<h1[ >]/g) ?? []).length !== 1) bad.push(`${path}: expected exactly one h1, found ${(html.match(/<h1[ >]/g) ?? []).length}`);
  for (const m of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const h = m[1];
    if (/^\/(_next|assets)\//.test(h) || /\.(png|jpg|ico|xml|txt)$/.test(h)) assets.add(h);
    else queue.push(h.replace(/\/$/, '') || '/');
  }
  for (const m of html.matchAll(/(?:src|srcSet)="(\/[^"]+)"/g)) assets.add(m[1].split(' ')[0]);
  for (const m of html.matchAll(/\/_next\/image\?url=([^&"]+)/g)) assets.add(decodeURIComponent(m[1]));
}
for (const a of assets) {
  if (a.startsWith('/_next/image')) continue;
  const r = await fetch(base + a);
  if (!r.ok) bad.push(`asset ${a} -> ${r.status}`);
}
// sample optimised image endpoint
const r = await fetch(base + '/_next/image?url=%2Fassets%2Fimages%2Fhero%2Faerial-masterplan.jpg&w=1920&q=82', { headers: { accept: 'image/avif,image/webp' } });
if (!r.ok) bad.push('image optimiser -> ' + r.status);
console.log(`${pages} pages, ${assets.size} assets checked; image optimiser content-type: ${r.headers.get('content-type')}`);
console.log(bad.length ? 'PROBLEMS:\n' + bad.join('\n') : 'No broken links, assets or missing SEO basics.');
process.exit(bad.length ? 1 : 0);
