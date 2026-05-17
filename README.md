# Wayfare Construction Inspections — Marketing Site

The Astro project that produces **inspections.wayfarecon.com**. Static-output, Netlify-deployed, designed to hit 90+ Lighthouse across the board so Google Ads quality score is cheap.

---

## What's in the box

```
.
├── astro.config.mjs        Astro config + sitemap integration
├── netlify.toml            Build + headers + redirects
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── images/             (drop hero + report photos here)
│   └── reports/            (drop sample-report.pdf here)
└── src/
    ├── components/         Header.astro, Footer.astro
    ├── content/
    │   ├── config.ts       Validation schema for location markdown
    │   └── locations/      15 suburb markdown files
    ├── layouts/
    │   └── BaseLayout.astro
    ├── pages/              Every URL on the site (Astro = file-based routing)
    │   ├── index.astro
    │   ├── services/...
    │   ├── locations/[slug].astro   ← generates all 15 suburb pages
    │   ├── about.astro
    │   ├── pricing.astro
    │   ├── faqs.astro
    │   ├── book.astro
    │   ├── contact.astro
    │   ├── sample-report.astro
    │   ├── thank-you.astro
    │   └── 404.astro
    └── styles/global.css   The whole design system (one file)
```

---

## Run it locally

You need Node 20+ installed.

```bash
cd "Wayfare-Inspections-Site"
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:4321`). Edits hot-reload automatically.

To build for production:
```bash
npm run build
```
Output lands in `dist/`. That's what Netlify deploys.

To preview the built output locally before pushing:
```bash
npm run preview
```

---

## Adding a new suburb page

This is the workhorse routine. Every new location takes about two minutes.

1. Copy any existing file in `src/content/locations/` — say `mildura.md` — to a new file. Slug becomes the URL (`/locations/my-new-suburb/`).
2. Edit the frontmatter:
   ```yaml
   suburb: "My New Suburb"
   postcode: "3500"
   state: "VIC"               # or "NSW"
   tier: "A"                  # A = full page on Locations hub; B = smaller card
   driveMinutes: 25
   metaDescription: "..."
   summary: "..."
   order: 80                  # controls hub ordering, lower = earlier
   commonDefects:             # optional; renders as a bulleted block
     - "Defect one"
     - "Defect two"
   ```
3. Below the frontmatter, write **2–3 paragraphs of unique local content** — soil type, building stock, common defects, climate. Do not boilerplate this. Boilerplate suburb pages get penalised by Google.
4. Save. Re-run `npm run dev` if it isn't already running. Open `http://localhost:4321/locations/my-new-suburb/`.
5. Commit and push. Netlify rebuilds automatically.

That's it. The `[slug].astro` template handles the hero, the schema markup, the booking CTAs, the neighbouring-suburbs grid, all of it.

---

## Adding a new top-level page

Drop an `.astro` file into `src/pages/`. Filename becomes the URL (with `index.astro` being the folder root). Start by copying `about.astro` and editing.

Every page should:
- Import `BaseLayout.astro` and wrap content in it.
- Pass a unique `title` and `description`.
- Include a breadcrumb in the hero (`<p class="crumbs">...</p>`).
- End with a CTA section linking to `/book/`.

---

## Deploy to Netlify

### One-time setup

1. Push this folder to a GitHub (or GitLab, Bitbucket) repository.
2. Log in to Netlify → **Add new site** → **Import an existing project**.
3. Pick the repo. Netlify auto-detects Astro and uses the build settings in `netlify.toml`. No manual config needed.
4. Click **Deploy**. First build takes ~2 minutes.

### Connecting the subdomain

1. In Netlify, go to **Domain settings** → **Add custom domain**.
2. Add `inspections.wayfarecon.com`.
3. In your DNS provider (wherever wayfarecon.com is hosted), add a CNAME record:
   - **Type:** CNAME
   - **Name:** inspections
   - **Value:** the `XXXXX.netlify.app` URL Netlify gave you
4. Netlify auto-provisions a free SSL certificate within 10 minutes.

### Subsequent deploys

`git push` → Netlify builds and deploys automatically. Done.

---

## Pre-launch checklist

A copy of the launch checklist from `Sitemap-and-Content-Plan.md`, with the things that need physical assets called out clearly.

**Content you need to provide me (Acton):**
- [ ] One real on-the-job photo of yourself (hands/boots/torch, not corporate headshot). Drop in `public/images/hero.jpg`.
- [ ] 3–6 real Mildura property photos for use in cards. Drop in `public/images/`.
- [ ] A redacted sample inspection report PDF. Drop in `public/reports/sample-report.pdf`.
- [ ] Confirmed final pricing (current pages assume $595 / $695 / $795 — change in `pricing.astro`, `index.astro`, `[slug].astro` and `book.astro` if different).
- [ ] Confirmed pest-inspection partner (so we know if the $795 "building + pest" is offered from day one).

**Tracking + analytics:**
- [ ] Paste GA4 measurement ID into `src/layouts/BaseLayout.astro` (look for the commented `gtag` block).
- [ ] Paste Google Ads conversion ID into `src/pages/thank-you.astro` (look for the commented `gtag('event','conversion'...)` block).
- [ ] Test the conversion fires once with the GA4 DebugView open.

**Booking flow:**
- [ ] Replace the `formspree.io/f/REPLACE_ME` URL in `book.astro` and `contact.astro` with your real form endpoint (Formspree, Netlify Forms, or a custom backend).
- [ ] Wire a Stripe Payment Link (simplest) or full Stripe Checkout to follow form submission.
- [ ] Test the booking end-to-end with a real card and a real email.

**SEO + DNS:**
- [ ] DNS CNAME pointing `inspections.wayfarecon.com` to Netlify.
- [ ] HTTPS forced (Netlify does this automatically — verify it).
- [ ] Submit sitemap to Google Search Console (`https://inspections.wayfarecon.com/sitemap-index.xml`).
- [ ] Verify ownership in Search Console + Bing Webmaster Tools.
- [ ] Claim and verify Google Business Profile (separate task — Acton).

**Validation:**
- [ ] Run a Lighthouse audit on the home page. Target 90+ on all four metrics.
- [ ] Validate schema markup with Google's Rich Results test (paste a few URLs).
- [ ] Test the site on a real iPhone and a real Android.
- [ ] Walk through every page and check for typos, broken links, missing images.

**Google Ads launch:**
- [ ] Build a single campaign with 1 ad group per Tier A suburb (7 ad groups initially).
- [ ] Each ad group targets `building inspector {suburb}` + close variants.
- [ ] Each ad group's final URL points to the matching `/locations/{slug}/` page.
- [ ] Add negative keywords from the keyword research file: `-car -vehicle -roadworthy -rwc -motor -truck -caravan -bike -boat`.
- [ ] Initial budget: $50–$70/day across the campaign (~$1,500–$2,000/month).
- [ ] Run for 30 days, then re-research based on search-term report.

---

## Brand & content rules

See the brand-guide HTML at `../Wayfare-Claude-Playbook/Brand-Guidelines.html`. Highlights:
- **Voice:** trusted-tradie, plain-talking, thorough/honest/fair. No clichés.
- **UK / Australian English.** "Customise", "colour", "no jargon" — never "customize" or "color".
- **No salesy copy. No exclamation marks. No fake urgency.**
- **No mention of "Wayfare Construction Pty Ltd"** in any client-facing copy. Inheritance is visual only.
- **No stock photos.** Real property and real inspector photos only.

---

## Where to make common edits

| Change | File |
|---|---|
| Phone number | Search-and-replace `0417 875 329` and `+61417875329` across the whole repo |
| Email | Search-and-replace `acton@wayfarecon.com` |
| Brand colours | `src/styles/global.css` — top of the file under `:root` |
| Nav items | `src/components/Header.astro` |
| Footer service-area list | `src/components/Footer.astro` |
| Pricing | `src/pages/pricing.astro`, `src/pages/index.astro`, `src/pages/services/pre-purchase-building-inspection.astro`, `src/pages/locations/[slug].astro`, `src/pages/book.astro` |
| Service-area schema (LocalBusiness) | `src/layouts/BaseLayout.astro` — top of frontmatter |
| FAQs | `src/pages/faqs.astro` |
| A suburb page | `src/content/locations/{slug}.md` |

---

## Questions

Acton — `acton@wayfarecon.com` — `0417 875 329`

Stewardship of this codebase sits with whoever is making changes. Update the Brand Guidelines and the Business Profile in the sibling `Wayfare-Claude-Playbook/` folder when the business or brand evolves, so future Claude sessions inherit the latest context.
