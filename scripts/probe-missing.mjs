const h = await (await fetch('https://almaskaanvillage.com/', { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
const grab = (re, n = 6) => [...h.matchAll(re)].slice(0, n).map((m) => m[0].slice(0, 400));
console.log('JOINCHAT/WA:', grab(/joinchat[^<]{0,400}/gi, 4), grab(/whatsapp[^"<]{0,200}/gi, 6));
console.log('PHONE in js:', grab(/"telephone":"[^"]+"|"phone":"[^"]+"|data-settings="[^"]*"[^>]*joinchat/gi, 4));
const i = h.search(/Holding Company/);
console.log('HOLDING html:', h.slice(i - 200, i + 3500).replace(/\s+/g, ' '));
console.log('REVIEWS:', grab(/google[^"<]{0,80}review[^<]{0,200}/gi, 4), grab(/href="https?:\/\/(?:g\.page|maps\.app|www\.google\.com\/maps|search\.google)[^"]*"/gi, 4));
console.log('YT slides:', grab(/swiper-slide[^>]*>[\s\S]{0,300}/g, 3));
