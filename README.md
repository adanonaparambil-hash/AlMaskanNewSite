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

## English / Arabic
- English keeps its URLs (`/about-us`); Arabic lives under `/ar` (`/ar/about-us`). `src/proxy.ts` rewrites unprefixed paths to the internal `en` segment; all routes are under `src/app/[lang]/`. `/en/...` redirects to the unprefixed URL.
- The header and mobile menu have an "العربية / English" switch that opens the same page in the other language.
- **Editing content:** every English data file has an Arabic twin with the same shape — `src/content/site.ar.ts`, `rooms.ar.ts`, `services.ar.ts`, `news.ar.json` (same slugs), `images.ar.json` (alt text by image path). Page-specific copy sits in a `COPY = { en, ar }` object at the top of each page; shared interface text is in `src/i18n/ui.ts`. Change both languages together.
- Server components read the language with `getContent()` (`src/i18n/server.ts`); client components with `useI18n()`. Internal links use `components/LocaleLink` so Arabic visitors stay in Arabic.
- Arabic pages are `dir="rtl"` with Noto Kufi Arabic / IBM Plex Sans Arabic; RTL rules are at the end of `globals.css`. Letter-by-letter animations run word by word in Arabic (Arabic letters join).
- The Arabic text was machine-translated and should be reviewed by a native speaker before launch (names and terms follow one glossary).

## Visitor counter
The footer shows "visitors since launch" (each browser counted once; bots skipped; no cookies or personal data). It needs a small Redis store: in Vercel open the project → **Storage** → **Create Database** → **Upstash for Redis** (free plan) → connect it to this project, then redeploy. Vercel adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`) for you. Until then the counter stays hidden. API: `GET/POST /api/visits`.

## Site assistant (chatbot)
The chat bubble (bottom-left) answers visitors in English or Arabic.
- **Always on:** seven one-tap topics (rooms & rates, meals, shops, meeting spaces, sports & lifestyle, location, contact) built from the site's content; typed questions are matched to the closest topic.
- **With an API key:** typed questions are answered by Claude (`claude-opus-5-5`, low effort, streamed) using a knowledge text compiled from the site's own content files (`src/lib/assistant/knowledge.ts`), cached as the system prompt. It is told to use only that knowledge, quote rates as "subject to confirmation", stay on topic and point to the team when unsure. Refusals fall back server-side (`fallbacks: "default"`).
- **Setup:** add `ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables, then redeploy. Consider a monthly spend limit on the Claude Console. The route has a basic per-visitor rate limit.
- Edit topics in `src/lib/assistant/topics.ts`; the AI knowledge updates automatically when content files change.
