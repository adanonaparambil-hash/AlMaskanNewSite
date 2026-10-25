# Design system

Direction: **night oasis** — a deep navy ground lit by slowly drifting light in the five brand colours, frosted-glass surfaces, large editorial serif type with gold-gradient italics, and the village's renderings shown full-bleed. (Replaced the earlier bright ivory direction on 2026-10-25 at the owner's request: "modern, more animated, glassmorphism, award-site feel".)

## Brand check
The logo is a navy house‑mark with Arabic + Latin wordmark; on the dark ground it is rendered white (`filter: brightness(0) invert(1)`). The “Haven of Five” colours are kept as the per-line accents, lifted slightly so they glow on navy. Haven marks sit on a small white tile so their own colours read.

## Tokens (`src/app/globals.css`)
| Token | Value | Use |
|---|---|---|
| `--bg` / `--bg-2` / `--bg-3` | #060E1C / #0A1830 / #10234A | page, alternate bands, image placeholders |
| `--glass`, `--glass-2`, `--glass-edge`, `--glass-hi`, `--blur` | white at 5.5 % / 9 % / 13 % / 28 %, 22px | glass surfaces, edges, hover edges |
| `--text` / `--muted` / `--dim` | #F3EFE6 / #AEB4C1 / #7F879A | text, secondary, fine print |
| `--gold`, `--gold-grad` | #E2C48A, #F4DFAE→#C9A25E | action colour, italics, numbers, focus ring |
| `--navy`, `--navy-deep` | #1A3A6B / #112A52 | brand (kept for reference) |
| `--c-acc, -ret, -cat, -spa, -lif` | #9CC45F #B9BCC4 #F2556A #C88AD9 #F4AC3E | eyebrow dots, rules, glows per service line |
| `--muted`, `--bronze`, `--ink` | aliases | names written inline in pages — keep them |

## Type
- Display: **Fraunces** (optical size 144), weight 300–380, tight tracking; the emphasised phrase of every heading is italic in the gold gradient.
- Text/UI: **Manrope**. Eyebrows are small glass pills with a glowing dot, caps, 0.2em tracking.
- Scale: `display--xl` clamp(2.6→7.2rem), `--lg` (2.1→4.6rem), `--md`, `--sm`; body 1.0625rem/1.65.

## Surfaces & components
- **`.glass`** — gradient white fill, `backdrop-filter: blur(22px) saturate(140%)`, 1px light edge, inner highlight, deep shadow, 22px radius. **`.sheen`** adds a light sweep on hover/focus; **`[data-glow]`** adds a pointer-following gold glow.
- Large overlapping sticky cards (accommodation stack) use an opaque tinted gradient instead of a live blur — cheaper, and avoids GPU glitches.
- **Buttons**: pills. Solid = gold gradient with dark text; line = glass; a fill rises from below on hover.
- **Header**: floating glass pill that solidifies after scrolling and tucks away on scroll-down. **Mobile menu**: full-screen glass opening as a circle from the burger, links staggered in.
- **Cards, facts, specs, rates, checks, amenities, team, values**: glass panels with hover lift.
- **Forms**: glass inputs, chip groups for choices, a progress line for required fields, accommodation details (room type, residents, move-in) revealed when the topic is Accommodation.
- **Ambient**: fixed layer of four blurred brand-coloured lights drifting (CSS keyframes) + animated film grain; a gold reading-progress line at the top.

## Accessibility rules baked in
Skip link; visible 2px gold focus ring; one `h1` per page; landmarks; `aria-current` in navigation; reduced‑motion fallbacks (ambient and grain stop, no preloader, everything visible); scrambled eyebrows keep their real text in `aria-label`; meaningful alt text from `images.generated.json`; no colour‑only meaning.
