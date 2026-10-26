# Animation plan & system

GSAP 3.15 + ScrollTrigger + SplitText (all free). **Native scrolling** — Lenis was evaluated and rejected: the site is content‑heavy with pinned and sticky sections, and smooth‑scroll libraries add risk (anchor links, keyboard, find‑in‑page, iOS) for little benefit.

## Architecture (`src/lib/motion/`)
Content opts in with data attributes; **all animation logic lives in the library**, none in components.

| Attribute | Effect | File |
|---|---|---|
| `data-hero="bg|eyebrow|title|copy|cta|cue"` + `data-site-header`/`data-nav-bit` | Opening sequence | `hero.ts` |
| `data-reveal="lines"` | Masked line‑by‑line rise (SplitText, `autoSplit` re‑splits on resize/fonts) | `reveals.ts` |
| `data-reveal="fade"` (`data-delay`) | Short rise + fade | `reveals.ts` |
| `data-reveal="mask"` (`data-dir`) | Clip‑path wipe + image settling from 1.22× | `reveals.ts` |
| `data-stagger` / `data-stagger-item` | Staggered card/list entrance | `reveals.ts` |
| `data-counter="3000"` | Number counter (SSR already shows the final value) | `reveals.ts` |
| `data-parallax="0.08"` | Scrubbed parallax on an oversized `.media__inner` (amount capped to the 12 % buffer) | `scroll.ts` |
| `data-expand` / `-frame` / `-copy` | Image expansion on a sticky stage (230vh) | `scroll.ts` |
| `data-timeline` / `-line` / `-item` | Scroll‑drawn line, items activate | `scroll.ts` |
| `data-hscroll` / `-track` / `-panel` / `-bar` / `-count` | Pinned horizontal story | `scroll.ts` |
| `[data-site-header]` | Solid after 80px, tucks away on scroll‑down, returns on scroll‑up/focus | `scroll.ts` |

Shared vocabulary: ease `expo.out` for reveals/wipes, `power3.out` for fades; durations 0.5 / 0.9 / 1.3 s; reveal start `top 86%`, `once: true`. Only `transform`, `opacity`, `clip-path` are animated.

## Lifecycle
`MotionProvider` (client, root layout) runs `initMotion()` on mount and after every route change. Everything is created inside one `gsap.matchMedia()`: conditions `reduce`, `motion`, `desktop (≥1024px)`, `wide (≥760px)`. Leaving a condition or navigating calls `mm.revert()`, which kills tweens, ScrollTriggers, pin‑spacers and SplitText instances. `ScrollTrigger.refresh()` runs on `load` and when web fonts are ready. Pinned sections are created first with `refreshPriority: 1` so triggers below them are measured with the pin spacing.

## Hero (≈2.2s)
bg clip‑reveal + 1.18→1 scale → nav bits fade/drop (0.45s) → eyebrow → headline lines (0.8s) → copy (1.35s) → CTAs (1.55s) → scroll cue (1.95s). After intro the image drifts (+12 % y, 1.06 scale) on scroll via a separate wrapper so the tweens never fight.

## Section choreography
Intro: masked images alternate direction with parallax · Community: image wipe + quote fade · Facts: staggered counters · **Haven of five: pinned horizontal scroll** (distance = real `scrollWidth − clientWidth`, `invalidateOnRefresh`, counter + progress bar, images drift against the track; releases naturally; <1024px it is a plain vertical stack) · Accommodation: sticky stage cross‑fades on hover/focus/touch · Catering collage wipes · Spaces card overlap · **Lifestyle image expansion** (used once) · Story timeline · News/cards stagger.

## Reduced motion & no‑JS
- Inline head script adds `.motion-on` (which hides animated elements) **only** when motion is allowed. Reduced‑motion visitors, no‑JS visitors (`<noscript>` rule) and failed initialisation (`revealAll`) all see everything immediately.
- CSS transitions are cut to ~0 under `prefers-reduced-motion`; the scroll cue animation stops; the horizontal track stays natively scrollable.

## Touch & keyboard
Hover effects have `:focus-visible`/`:focus-within` twins; room rows use `pointerenter` (fires on tap) + focus; menus close with Esc and trap focus; no animation is required to operate anything.

## Glass redesign additions (2026-10-25) — `src/lib/motion/showcase.ts`
Lenis smooth scrolling is now on (`smooth.ts`, driven by GSAP's ticker; never for reduced-motion visitors).

| Attribute | Effect |
|---|---|
| `data-reveal="chars"` | Letters flip up out of a word mask (hero, room pages, many h2s) |
| `data-reveal="blur"` | Words come into focus from a blur (service pages, articles) |
| `data-reveal="scale"` | Heading settles from oversize while its tracking closes (overview pages, facts, news index) |
| `data-scramble` (+ `data-scramble-text`) | Plain-text eyebrows decode from random glyphs; real text kept in `aria-label` |
| `data-stack` / `data-stack-card` | Sticky accommodation cards; each sinks back and dims while the next slides over |
| `data-curtain` (Media `curtain`) | Two dark leaves part from the centre over an image |
| `data-speed="0.2"` | Element drifts at its own pace (catering collage; ≥760px only) |
| `data-circle` / `-media` / `-label` / `-card` | Sticky stage: a circle of image opens to full screen, outlined label grows away, glass card arrives (Spaces) |
| `data-drift-x="-18"` | Horizontal scrubbed drift (footer wordmark) |
| `data-progress` | Gold reading-progress line |
| `data-glow` | Pointer-following glow inside glass panels (fine pointers) |

`PageHero` takes `fx` (`chars` default, `blur`, `scale`, `lines`) so neighbouring pages open differently: rooms = chars, services = blur + curtain image, overviews/clients = scale, about = chars.

**Preloader** (`Preloader.tsx`): first page of a session only — the head script adds `.is-loading` (motion allowed + no `amv-intro` in sessionStorage). Count 0→100 never passes real page load; panels sweep open; fires `preloader:done`, which releases the paused hero timeline. CSS failsafe hides it after 6s if JS never runs.

### Footer & loader v2 (2026-10-25)
- **Loader**: a pill-shaped window onto the hero aerial grows with the 0→100 count; the five Haven bars fill in turn; "Al Maskaan Village" letters flip in (difference blend over the image); at 100 the window expands to full screen and the loader fades into the hero, which then skips its own wipe (`waiting` in `hero.ts`). Page underneath is `inert` and scroll-locked while covered. Skipped entirely if scripts arrive after 4s; count holds at 86 until `load` (2.5s safety); CSS failsafe at 10s.
- **Footer**: Haven-colour seam with a travelling highlight; magnetic orb with a rotating "Get in touch" ring; glass link panel with Haven dots and sliding arrows; `data-fill` wordmark (gold fills left→right, scrubbed to `bottom bottom` so it always completes); `data-footer-rise` one-time rise (deliberately not scrubbed — end-of-page content may never reach a scrub's end); live Barka clock; Back to top (Lenis-aware, focuses `<main>`).

## Cross-device hardening (2026-10-26)
- **Capability classes** set by the head script before first paint: `is-touch`, `is-ios`, `is-webkit`, `is-lite` (touch, ≤4 cores/≤4 GB, Save-Data). `perf.ts` also samples real fps ~6.5s after load and adds `is-lite` below 45fps. Lite = no grain, static ambient light, solid instead of blurred glass, no cursor.
- **Touch devices (phones, tablets, iPads)**: no loader, no Lenis, no pinned scenes (`desktop` media condition now requires a fine pointer); they use the native-scroll layouts. Reveals, scrubbed sticky scenes, marquees and the hero film still run.
- **Failsafes**: every motion module is individually guarded; if any fails, everything is revealed. Head timers: 9s without `__amvReady` → `motion-failed` (all content visible, loader removed); 13s → `is-loading` always cleared. The loader has its own 7s wall-clock deadline; the hero timeline starts regardless after 9s.
- GSAP `lagSmoothing(0)`: slow frames no longer stretch animation time.
- WebKit: gold gradient text uses a solid colour (background-clip:text + transformed glyphs disappears on Safari/iOS); `100svh` for pinned/sticky stages; `-webkit-backface-visibility`; `overflow-x: clip` on `main`/footer/hero stops transformed elements widening the page (it had grown the layout viewport from 375 to 422px on phones).
- `browserslist` now includes Safari/iOS 14+, so CSS is prefixed/lowered for them.
