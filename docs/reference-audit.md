# Reference audit — almaskaanvillage.com

Audited 2026-10-25. Method: `robots.txt` and `wp-sitemap.xml` (both permitted), the public WordPress REST API (`/wp-json/wp/v2/pages|posts|media`), the **rendered HTML of every sitemap URL** fetched over HTTP (34 pages and 25 posts listed in the sitemap), the page CSS for background images, and a live look at the homepage in a browser to observe the hero, slider, WhatsApp button and inquiry form. No login, paywall or bot protection was encountered or bypassed.

## What the site is

A WordPress + Elementor marketing site (Forminator for forms, Ultimate Member for accounts) for **Al Maskaan Village**, a worker-accommodation community in **Khazaen Economic City, Barka, Oman**, operated by **Adrak Facilities and Services LLC (AFS)**, part of the Adrak Group. Its tagline is “Elevating Living and Working”. The offer is organised as a **“Haven of Five”** — Accommodation, Retail, Catering, Spaces, Lifestyle — and every vertical is told twice: for **Individuals** (`/individuals/*`) and for **Companies** (`/facilities/*`).

## Pages inspected (all accessible)

| URL | Purpose | Notes |
|---|---|---|
| `/` | Home | Hero slider with the film (YouTube embed `ngpgxRNUFh4`), intro, CEO quote, “Haven of five”, accommodation/retail/catering/spaces/lifestyle tiles, 4‑step story, holding/sister companies, “We typically answer queries in 24 working hours” band |
| `/about-us` | About | Facts & figures counters, Purpose/Vision/Mission, Values (Quality, Sustainability, Empathy), what sets us apart, 5‑person management team |
| `/facilities` | Companies overview | “No more accommodation worries: your workforce is housed!” |
| `/facilities/workers`, `/facilities/managers-single-premium`, `-double-premium`, `-triple-premium` | Company room pages | Specs, booking options, amenities, **rates** |
| `/facilities/retail-opportunities`, `/business-opportunities`, `/catering`, `/spaces`, `/lifestyle` | Company service pages | Counters (3,900 m² kitchen, 5,000 m² offices, 9,000 m² landscape) |
| `/individuals` | Individuals overview | “Your home away from home” |
| `/individuals/junior-staff`, `senior-staff-single|double|triple-premium` | Individual room pages | Same rooms as above with individual copy + rates |
| `/individuals/residents`, `business-owners`, `individuals-catering`, `individuals-spaces`, `individuals-lifestyle` | Individual service pages | |
| `/clients` | Client logos | Logos only, no names or copy |
| `/news` + 25 article URLs | News | 25 posts, 5 Feb 2024 → 11 Nov 2024; “Load More” paging |
| `/gallery` | Media gallery | Filters: Village / Accommodation / Catering / Retail / Spaces / Lifestyle |
| `/contact-us` | Contact | Page body is only a heading; the form lives in the “Get in touch” popup/footer |
| `/privacy-policy` | Legal | **Unedited WordPress template** (comments, Gravatar, login cookies; names `webinprogress.me/almaskan`) |
| `/login`, `/register`, `/dashboard`, `/account`, `/logout`, `/reset-password` | Ultimate Member shortcodes | Raw, unrendered shortcode text in places (`[ultimatemember form_id=…]`) |
| `/elevating-living-and-working` | Old duplicate of the homepage / company profile | Different, older copy and timeline |

Navigation: About Us · Facilities · Clients · News · Media Gallery · Contact Us | Login. Footer: Main links, address, contact numbers, email, Google Reviews (QR image), copyright 2024. A floating WhatsApp button is present (number not exposed in markup).

## Contact facts (footer, consistent across pages)

- Al Maskaan Village, Adrak Facilities and Services LLC (AFS), Khazaen Economic City, Barka, P.O. Box 1465, PC 130, Sultanate of Oman
- T +968 2200 1300 · T +968 7847 7776 · operations@almaskaanvillage.com
- LinkedIn `company/almaskaanoman` · Facebook `almaskaanvillage` · Instagram `almaskaanvillage` · YouTube `@AlMaskaanVillage`

## Inquiry form (Forminator #1685)

Fields: *You are an* Individual / Institution · *You want to submit a* Query / Complaint · *Your query is about Al Maskaan* Village / Accommodation / Catering / Retail / Spaces / Lifestyle · Full name · Email · Phone · Message. The new form keeps all of these (plus an optional organisation field for institutions).

## Conflicts, errors and outdated items — flagged for the owner

| # | Where | Issue | Handling |
|---|---|---|---|
| 1 | Single Premium **room rate** | `/individuals/senior-staff-single-premium`: OMR **305**; `/facilities/managers-single-premium`: OMR **205**. Both state a total package of OMR 350 (= 305 + 45 food + free laundry). | Site shows **305** (the only value consistent with the total). **Owner to confirm.** |
| 2 | Business owners page | “Our**87** m² ATM space” vs. 24.87 m² on `/facilities/business-opportunities` | Site shows **24.87 m²** (typo suspected). Confirm. |
| 3 | Timeline | Homepage: 2022, 2022, 2022, 2023. Legacy page: 2000, 2010, 2015, 2021 for the same four milestones | Site uses the **homepage** years; legacy years look like placeholders. Confirm. |
| 4 | Company naming | “Al Adrak Trading & Contracting Company LLC” (legacy page) vs. “Adrak Facilities and Services LLC (AFS)” / “Adrak Group of Companies” (home, footer) | Site uses the footer/home names. |
| 5 | Facts counters | The catering page lists “In‑house catering serving 3,000+” and “External catering serving 1,000+” with **no unit** (meals per day? guests?) | Reproduced as written; unit needs clarifying. |
| 6 | “Facts” labels | “junior staff accommodations 3,000+” and “senior staff accommodations 1,000+” don't match the room counts on room pages (300+ bunk rooms × 10 beds; 13+13+78 premium rooms) (e.g. senior premium rooms total 104) | Reproduced as written. **Needs verification** before launch. |
| 7 | Privacy policy | Placeholder WordPress text | Replaced with a short, accurate notice of what the new site does; **legal review required** |
| 8 | Meta | No page has an SEO description; titles are `<Page> – Al Maskaan Village` | New titles/descriptions written |
| 9 | Mixed claims | “leader in short and long term housing and serviced quarters in Muscat” (HE visit article) vs. village being in Barka | Left in the article as published |
| 10 | Account pages | Login/registration/dashboard are WordPress plugin pages with no public purpose | Not rebuilt; redirected to Contact (documented) |

## Limitations of this audit

- Forminator form fields are injected by JavaScript; they were read from the live page in a browser, but the form's server-side routing (who receives submissions) is unknown.
- The WhatsApp number behind the floating button is not in the HTML; not reproduced.
- Hero slider slides, partner “Holding/Sister companies” logos and the Google Reviews link target could not be recovered (see `asset-inventory.md`).
- 52 of 344 media-library items were not exposed by the public API.
