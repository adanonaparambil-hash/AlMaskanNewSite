# Al Maskaan Village — website

A rebuild of almaskaanvillage.com: bright editorial design, GSAP/ScrollTrigger motion, original content and imagery. Docs are in [`docs/`](docs).

## Run
```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run assets       # re-optimise images from source-assets/originals (needs sharp, already a devDependency)
node scripts/check-site.mjs http://localhost:3000   # crawl: links, assets, titles, descriptions, one h1
```
Node 20+ (built and tested on Node 22).

## Configure the inquiry form
Copy `.env.example` to `.env.local` and set `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `INQUIRY_TO` (and optionally `SMTP_PORT`, `SMTP_SECURE`, `INQUIRY_FROM`) plus `NEXT_PUBLIC_SITE_URL`. Until then the form validates but reports honestly that it could not send, and shows the phone numbers and email.

## Deploy
Any Node host (Vercel, a container, a VPS with `next start` behind nginx). Set the env vars above. On the old WordPress domain, point DNS here; article and account URLs are redirected in `next.config.ts`. Run the crawl script against staging before switching.

## Edit content
- Business facts, nav, contacts: `src/content/site.ts`
- Rooms and rates: `src/content/rooms.ts` · Service pages, team, clients: `src/content/services.ts`
- News: regenerate with `node scripts/build-news.mjs` (from the WordPress export) or edit `src/content/news.generated.json`
- Images: `scripts/build-assets.mjs` (key → original file, destination, alt)
