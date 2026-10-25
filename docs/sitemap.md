# Sitemap

57 statically generated routes (see `npm run build`) + 1 API route.

```
/                                   Home
/about-us                           About, facts, values, team, story
/facilities                         For companies — overview
  /facilities/workers
  /facilities/managers-single-premium | -double-premium | -triple-premium
  /facilities/retail-opportunities
  /facilities/business-opportunities
  /facilities/catering
  /facilities/spaces
  /facilities/lifestyle
/individuals                        For individuals — overview
  /individuals/junior-staff
  /individuals/senior-staff-single-premium | -double-premium | -triple-premium
  /individuals/residents            (retail for residents)
  /individuals/business-owners
  /individuals/individuals-catering | individuals-spaces | individuals-lifestyle
/clients
/news                               25 announcements
  /news/[slug]                      one page per article (original slugs)
/gallery
/contact-us
/privacy-policy
/api/inquiry                        POST — inquiry delivery (SMTP)
/sitemap.xml, /robots.txt
```

## Redirects (`next.config.ts`)
- `/<article-slug>` → `/news/<article-slug>` (301, all 25)
- `/elevating-living-and-working` → `/about-us` (301)
- `/login`, `/register`, `/dashboard`, `/account`, `/reset-password` → `/contact-us` (302); `/logout` → `/`

## Navigation
Header: About · For Companies ▾ · For Individuals ▾ · Clients · News · Gallery · **Get in touch**. Mobile: full‑screen menu with accordions. Footer: main links, five service lines, address, phones, email, social, privacy.

“Facilities” was kept as the URL for the *companies* audience (the original's naming) but is labelled **For Companies** in the UI; “Individuals” is labelled **For Individuals**.
