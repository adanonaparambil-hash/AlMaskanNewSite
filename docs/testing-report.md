# Testing report

Tested 2026-10-25 on Windows 11, Node 22.19, in the Claude desktop built‑in browser (Chromium) against `next dev` and the **production build** (`next build` + `next start`).

## Automated
| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | pass |
| `next build` | pass — 57 routes (56 static, 1 dynamic API) |
| `scripts/check-site.mjs` crawl of the production server | **52 pages, 425 assets, 0 broken links/assets**; every page has a title, meta description and exactly one `h1` |
| Image optimiser | hero served as AVIF, 124 KB at 1920 w (source JPEG 275 KB) |
| Redirects | `/bank-muscat-atm-now-active` → `/news/…` 308 ✔ |
| `POST /api/inquiry` | invalid → 422; valid without SMTP → 503 `not_configured` (as designed) |
| Console | no errors or warnings in production (one expected 503 after submitting the form with no SMTP configured) |
| Home on localhost, production build | DCL 36 ms, load 170 ms, LCP ≈190 ms, **CLS 0**, 258 KB transferred above the fold |

## Manual / visual (desktop 1440×900 and phone 375×812)
- **Hero**: sequence plays (bg wipe → nav → headline lines → copy → CTAs → cue); headline legible over the aerial; mobile hero reworked after the first run (headline had sat on the busy image).
- **Scroll reveals, counters** (3,000+ … 300+), **parallax**, **stagger**, **timeline** (line draws, dots activate) ✔.
- **Horizontal “Haven of five”**: pins, translates by the real overflow, progress bar and counter update, releases into the next section ✔.
- **Image expansion** (lifestyle): measured `clip-path` `inset(16% 22%)` → `9.2%/12.6%` → `2.3%/3.2%` → `0` over 1,500 px of scroll ✔.
- **Reverse scrolling / jumping**: scrubbed effects follow in both directions; `once` reveals don't replay.
- **Room showcase**, header dropdowns (hover + keyboard focus), **mobile menu** (opens, accordion, closes, Esc, focus trap), **gallery filter + lightbox** (focus moves to Close; ←/→/Esc) ✔.
- **Forms**: empty submit shows three inline errors and focuses the first; a valid submission without SMTP shows “…your message was not sent” with phone/email fallbacks — never a fake success ✔.
- Horizontal overflow on a 375 px viewport: none.

## Defects found and fixed during testing
1. Triggers below the pinned section were measured **before** the pin spacer existed (expansion never progressed) → pinned section is now created first with `refreshPriority: 1`.
2. Motion start used `requestAnimationFrame`, which is suspended in background tabs and left content hidden → timer‑based start.
3. Pinned panels overflowed the viewport bottom → section is a flex column with a measured track height.
4. **Gallery images overwrote each other** (a regex collapsed file names; all 16 “village” images were the same file) → fixed; alt text re‑verified against a contact sheet of all 41 images and two alts corrected.
5. Mobile menu left a tall gap for collapsed groups → simplified accordion.
6. Home news row left an orphan card → three equal cards.
7. News excerpts truncated mid‑word → word‑boundary excerpts built from the first full paragraph.
8. Room‑page galleries with one image rendered full‑width (soft) → minimum two columns.

## Not tested / limitations (honest list)
- **Reduced motion** was verified by code path and CSS (everything is visible without the `motion-on` class; `revealAll` fallback) but not by toggling the OS setting in the browser pane.
- The built‑in pane is a single Chromium instance with a software compositor (≈2 fps when hidden); frame‑rate and "feel" on real devices — especially iOS Safari for the pinned section — **need a manual pass**. No Firefox/Safari testing.
- No tablet‑specific screenshots beyond the 1024 px breakpoint logic; only 375 px and 1440 px were inspected visually.
- No Lighthouse/axe run; accessibility is by construction (landmarks, labels, focus states, contrast tokens) and manual keyboard checks.
- The inquiry form has never delivered a real email (no SMTP credentials exist).
- Imagery: mostly architectural renderings (as on the original); resolution caps at ~1600 px, so very large screens show some softness; rights not confirmed.
- Facts flagged in `reference-audit.md` (rates, timeline, counters) await owner confirmation.

## Glass redesign — 2026-10-25
| Check | Result |
|---|---|
| `tsc --noEmit` | pass |
| `next build` | pass — 57 routes |
| `check-site.mjs` against `next start` | 52 pages, 432 assets, 0 broken links/assets, SEO basics present |
| `POST /api/inquiry` with accommodation fields | 503 `not_configured` (as designed, no SMTP); invalid → 422 |
| Console (production, home scrolled top→bottom) | no errors |
| Desktop 1440 / phone 375 | hero, preloader, stacking room cards, curtain, collage speeds, circle reveal, timeline, glass form with accommodation step, footer wordmark, mobile menu; no horizontal overflow at 375px |
| Navigation from inside pinned sections (link, Back, Forward) | no errors |

Defects found and fixed: gold italics vanished once split into letters (gradient now on each piece); large overlapping sticky cards with `backdrop-filter` rendered black in the software compositor (now an opaque tinted surface); stack cards dimmed too early; eyebrow scramble used a self-killing `ScrollTrigger.create({ once })` that aborted ScrollTrigger's refresh and every trigger after it (now a scroll-triggered tween) and replaced React's text node (now edits it in place); pinned sections were direct children of `<main>`, so React's removal on navigation failed once ScrollTrigger had wrapped them in a pin-spacer (now each has a React-owned wrapper); timeline years unreadable without the active state; privacy notice now lists the accommodation fields; page-transition and glow colours come from tokens; heading ids moved onto the headings so SplitText's `aria-label` names the sections; CSS failsafe reveals content if scripts never start.

Not tested: real iOS/Android devices and Safari/Firefox; OS-level reduced-motion toggle (code path only); frame rate on low-end phones (the blur layers are the cost to watch). Note: on this machine `next dev` workers crash under memory pressure (`Jest worker … retry limit`, `EPIPE`) during long sessions — verify with `next build && next start`.
