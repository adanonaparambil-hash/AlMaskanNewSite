# Content inventory — original page → new destination

Content lives in `src/content/` (typed data) and `src/content/news.generated.json` (the 25 articles, converted from the WordPress export by `scripts/build-news.mjs`). Copy was edited lightly for grammar and flow; no statistics, prices, dates or claims were added.

| Original | Content preserved | New destination |
|---|---|---|
| `/` hero | “Redefining Worker Accommodation in Khazaen Economic City”; film | Home hero + click‑to‑play film (`VideoFacade`) |
| `/` intro | Value proposition, pioneer in affordable worker accommodation, Barka / Muscat–Batinah Expressway | Home §2 Introduction |
| `/` quote + `/elevating…` quote | Dr. Thomas Alexander quote | Home §3 (shortened to the verifiable first lines) |
| `/` “Everyone deserves a place to call Home” | Approach copy | Home §3 |
| `/about-us` facts | 7 counters | Home §4 + About |
| `/` “Haven of five” | 5 verticals | Home horizontal “Haven of five” section |
| `/` accommodation tiles | Junior / Senior (Single, Double, Triple) | Home §5 room showcase → room pages |
| `/` retail/catering/spaces/lifestyle tiles | Taglines | Home §6–§9 |
| `/` “Our Story” | 4 milestones (2022×3, 2023) | Home §10 + About timeline |
| `/news` | 25 articles, dates, images | `/news`, `/news/[slug]`, Home §11 |
| footer | Address, phones, email, social, © | Footer + Contact |
| contact popup | Form fields | `/contact-us`, Home §12, `InquiryForm` |
| `/about-us` | Purpose/Vision/Mission, values, apart/committed, team bios | `/about-us` |
| `/facilities` | Complete solution copy, five verticals | `/facilities` |
| `/facilities/workers`, `managers-*` | Specs, booking, amenities, rates | `/facilities/[slug]` (RoomPage) |
| `/facilities/retail-opportunities`, `business-opportunities`, `catering`, `spaces`, `lifestyle` | All paragraphs, unit sizes, counters | `/facilities/[slug]` (ServicePage) |
| `/individuals` and sub‑pages | Same, individual wording | `/individuals`, `/individuals/[slug]` |
| `/clients` | 7 logos | `/clients` (names taken from the visible logo text) |
| `/gallery` | Image gallery with filters | `/gallery` (41 curated images, lightbox) |
| `/privacy-policy` | WordPress placeholder | Rewritten notice — needs legal review |
| `/login` etc. | Plugin pages | Redirect to `/contact-us` (not rebuilt) |

## SEO
Original titles were `<Page> – Al Maskaan Village`, with no meta descriptions. Every new page has a unique title, description, canonical URL and Open Graph data; articles carry `NewsArticle` JSON‑LD. Original URLs are preserved (`/about-us`, `/facilities/*`, `/individuals/*`, `/clients`, `/news`, `/gallery`, `/contact-us`, `/privacy-policy`); article URLs moved from `/<slug>` to `/news/<slug>` with permanent redirects for all 25.

## Not carried over (and why)
Account/login pages; WhatsApp floating button (number unknown); Google Reviews QR; holding/sister company logo carousels (no assets exposed); hero slider slides. See `reference-audit.md`.
