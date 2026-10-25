// Converts the WordPress REST export of the original news posts into structured JSON
// (src/content/news.generated.json) and makes sure each referenced image exists locally.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'source-assets/data/posts.json'), 'utf8'));
const media = JSON.parse(fs.readFileSync(path.join(ROOT, 'source-assets/data/media_all.json'), 'utf8'));
const ORIG = path.join(ROOT, 'source-assets/originals');
const BASE = 'https://almaskaanvillage.com/wp-content/uploads/';

const dec = (s) =>
  s.replace(/&#8217;|&rsquo;/g, '’').replace(/&#8216;/g, '‘').replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;/g, '—')
    .replace(/&#8220;|&#8221;|&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;|&#160;/g, ' ').replace(/&#038;/g, '&')
    .replace(/&#8230;/g, '…').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));

// whitelist inline formatting only
const inline = (h) => {
  let s = h
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href, t) => `[[a:${href}|${t}]]`)
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, '[[b:$2]]')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/g, '[[i:$2]]')
    .replace(/<br\s*\/?>/g, ' ')
    .replace(/<[^>]+>/g, '');
  s = dec(s).replace(/\s+/g, ' ').trim();
  const esc = (x) => x.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  s = esc(s)
    .replace(/\[\[a:([^|]+)\|([^\]]*)\]\]/g, (_, href, t) => `<a href="${href.replace(/&amp;/g, '&')}" target="_blank" rel="noopener noreferrer">${t}</a>`)
    .replace(/\[\[b:([^\]]*)\]\]/g, '<strong>$1</strong>')
    .replace(/\[\[i:([^\]]*)\]\]/g, '<em>$1</em>');
  return s;
};

const widgets = (html) => {
  const out = [];
  const re = /data-widget_type="(text-editor|image|heading)\.default">([\s\S]*?)(?=data-widget_type=|$)/g;
  let m;
  while ((m = re.exec(html))) out.push({ type: m[1], html: m[2] });
  return out;
};

const toBlocks = (html) => {
  const blocks = [];
  const re = /<(h[1-6]|p|li|blockquote)[^>]*>([\s\S]*?)<\/\1>|<img[^>]*src="([^"]+)"[^>]*>/g;
  let m;
  while ((m = re.exec(html))) {
    if (m[3]) {
      blocks.push({ type: 'img', src: m[3] });
    } else if (m[1] === 'li') {
      const t = inline(m[2]);
      if (t) blocks.push({ type: 'li', text: t });
    } else {
      const t = inline(m[2]);
      if (!t) continue;
      const lvl = m[1][0] === 'h' ? 'h' : m[1] === 'blockquote' ? 'q' : 'p';
      blocks.push({ type: lvl, text: t });
    }
  }
  return blocks;
};

const excerptOf = (t) => {
  if (t.length <= 200) return t;
  const cut = t.slice(0, 200);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\s]+$/, '') + '…';
};
const full = (u) => u.replace(/-\d+x\d+(\.\w+)$/, '$1');
const need = new Set();
const result = [];
for (const p of posts) {
  const featured = media.find((x) => x.id === p.featured_media);
  const ws = widgets(p.content.rendered);
  const blocks = [];
  for (const w of ws) {
    if (w.type === 'text-editor') blocks.push(...toBlocks(w.html));
  }
  // group consecutive li into lists
  const grouped = [];
  for (const b of blocks) {
    if (b.type === 'li') {
      const last = grouped[grouped.length - 1];
      if (last && last.type === 'ul') last.items.push(b.text);
      else grouped.push({ type: 'ul', items: [b.text] });
    } else grouped.push(b);
  }
  // short unpunctuated paragraphs are sub-headings in the original layout
  grouped.forEach((b, i) => {
    if (b.type !== 'p' || i === grouped.length - 1) return;
    const t = b.text.replace(/<[^>]+>/g, '').trim();
    if (t.length <= 90 && !/[.!?:;,"”)]$/.test(t)) b.type = 'h';
  });
  const feat = featured?.src;
  if (feat) need.add(feat);
  grouped.filter((b) => b.type === 'img').forEach((b) => { b.src = full(b.src); need.add(b.src); });
  const plain = grouped.filter((b) => b.type === 'p').map((b) => b.text.replace(/<[^>]+>/g, ''));
  result.push({
    slug: p.slug,
    title: dec(p.title.rendered),
    date: p.date.slice(0, 10),
    originalUrl: p.link,
    image: feat ? path.basename(feat) : null,
    excerpt: excerptOf(plain.find((t) => t.length >= 80) || plain[0] || ''),
    blocks: grouped,
  });
}

// make sure every needed file is present locally
const missing = [];
for (const u of need) {
  const local = u.replace(BASE, '').replace(/\//g, '_');
  const dest = path.join(ORIG, local);
  if (fs.existsSync(dest)) continue;
  const r = await fetch(u, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!r.ok) { missing.push(u); continue; }
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  console.log('downloaded extra', local);
}
// rewrite image refs to local original file names (flattened)
const flat = (u) => (u ? u.replace(BASE, '').replace(/\//g, '_') : null);
for (const r of result) {
  const f = media.find((x) => path.basename(x.src) === r.image);
  r.imageFile = f ? flat(f.src) : null;
  r.blocks.filter((b) => b.type === 'img').forEach((b) => { b.file = flat(b.src); });
}
fs.mkdirSync(path.join(ROOT, 'src/content'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'src/content/news.generated.json'), JSON.stringify(result, null, 1));
console.log(result.length, 'posts;', result.filter((r) => !r.imageFile).length, 'without image; missing', missing);
console.log('body images:', result.flatMap((r) => r.blocks.filter((b) => b.type === 'img').map((b) => b.file)));
