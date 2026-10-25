# Implementation plan & architecture

## Stack
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · GSAP 3.15 (ScrollTrigger, SplitText) · hand‑written CSS with design tokens (no UI framework, no Tailwind — the design is bespoke and the stylesheet is ~700 lines) · nodemailer for the inquiry API · sharp for the asset pipeline (dev only).

## Folder map
```
src/app/                 routes (all statically generated except /api/inquiry)
src/components/          Header, Footer, ui primitives (Media, Button, PageHero…), InquiryForm,
                         RoomShowcase, GalleryView, VideoFacade, pages.tsx / overview.tsx (templates), MotionProvider
src/content/             site.ts, rooms.ts, services.ts (typed business content),
                         news.generated.json, images.generated.json  (generated)
src/lib/motion/          the reusable GSAP system (see animation-plan.md)
src/lib/images.ts, news.ts
scripts/                 build-news.mjs, build-assets.mjs, write-asset-docs.mjs, check-site.mjs, contact-sheet.mjs
source-assets/           originals/ (315 untouched downloads), data/ (REST exports), manifests
public/assets/           optimised images, logos
docs/                    this documentation
```
Business text, links and image references are data in `src/content`; changing them never touches animation code.

## Pipeline
1. `scripts/build-news.mjs` — WordPress REST export → `news.generated.json` (whitelisted inline markup only).
2. `scripts/build-assets.mjs` (`npm run assets`) — curated originals → `public/assets/images/*` (max 2200px, mozjpeg q84), logos copied, gallery + news images, `images.generated.json` (src, size, alt). Re-runnable.
3. `next build` → static pages; images are served through the Next optimiser (AVIF/WebP, responsive `srcset`, lazy loading; the hero uses `priority`).

## Decisions
- **Native scroll, no Lenis** — reasons in animation-plan.md.
- **Click‑to‑load video** — original film is on YouTube; embed uses `youtube-nocookie.com` only after a click.
- **Inquiry delivery = SMTP** — no endpoint, address or credential was invented. `POST /api/inquiry` validates, honeypots, and returns `503 not_configured` until `SMTP_*` and `INQUIRY_TO` are set (see `.env.example`); the form then truthfully says the message was *not* sent and offers phone/email. Alternatives (Formspree, a CRM webhook, Forminator's endpoint) only need a different body in that one route.
- **Hosting** — needs a Node runtime (API route). A static export is possible only if the form is pointed at an external service.
- **Content that needed owner input** is listed in reference-audit.md (conflicting rates, timeline, facts).

## Remaining work for launch
Confirm flagged facts · set SMTP env · supply WhatsApp number if the floating button is wanted · confirm image/logo licences · have legal review `/privacy-policy` · optionally add analytics (and a consent banner if so) · set `NEXT_PUBLIC_SITE_URL` · DNS/redirect from the old WordPress site.
