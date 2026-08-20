# The Balm Health Initiative and Social Intervention — Website

Official website for **The Balm Health Initiative and Social Intervention (TBHISI)**, a registered health and social intervention NGO in Nigeria improving health outcomes and social wellbeing for vulnerable individuals and underserved communities.

## Tech stack

Static site — HTML5, CSS3, vanilla JavaScript. No build step, no framework, no runtime dependencies. Deployable to any static host (Netlify, Vercel, GitHub Pages).

Fonts: Bricolage Grotesque (display) + Inter (body), loaded from Google Fonts.

## Structure

```
.
├── index.html                      Home
├── about.html                      Mission, vision, B.A.L.M values, objectives
├── leadership.html                 Founder, Board of Trustees, org structure
├── programs.html                   Five thematic program areas
├── financial-transparency.html     Regulatory compliance (CAC/SCUML/TIN) + certificates
├── get-involved.html               Donate, volunteer, partner, FAQ
├── contact.html                    Contact details + validated form
├── privacy-policy.html
├── safeguarding-policy.html
├── accessibility.html
├── sitemap.xml / robots.txt
└── assets/
    ├── css/style.css               Design system (tokens, components, responsive)
    ├── js/main.js                  Interaction layer
    └── images/                     Logo, founder photo, CAC + SCUML certificates
```

## Design system

Defined as CSS custom properties at the top of `style.css`:

- **Palette** — saturated greens (`--green-500` `#16C172`), coral (`--coral-500` `#FF4B3E`), amber accent, green-tinted neutrals. `--coral-text` `#D42A20` is the AA-safe coral used for text and solid buttons carrying white text.
- **Section rhythm** — light sections alternate with `.sec-dark` (near-black `#04140C` with green/coral radial glows). This contrast rhythm is deliberate.
- **Elevation** — `--sh-sm/md/lg` plus colored glows.

### Accessibility

All 28 text/background pairs in the system were programmatically audited against WCAG AA (4.5:1 body, 3:1 large text) and pass. `prefers-reduced-motion` disables all animation. Full keyboard navigation, visible focus rings, skip link, labelled form fields with inline errors.

## Interaction layer (`main.js`)

Scroll progress bar · sticky header shrink · slide-in mobile nav with scrim · scroll-reveal + stagger · animated stat counters · accordion (FAQ) · certificate lightbox · copy-to-clipboard · donation widget · contact form validation.

## SEO

- Keyword-targeted titles, meta descriptions and H1s ("health NGO in Nigeria", "NGO in Nigeria", "Ogun State")
- JSON-LD `NGO` schema on the homepage (address, founder, contact point, area served)
- Open Graph + Twitter Card tags, canonical URLs, geo meta tags
- `sitemap.xml` with priorities and `robots.txt`

**Canonical URLs currently point to `https://www.thebalmhealthinitiative.org`.** If a different domain is registered, update the `SITE` constant and rebuild, or find-and-replace across all HTML files.

## Known placeholders (not yet live)

- **Donations** — the form is a working UI preview. Not connected to a payment processor. Paystack keys must be added before it can accept real donations; until then direct donors to bank transfer.
- **Contact form** — opens the visitor's email client via `mailto:`. No backend.
- **Financial statements** — no audited report exists yet (incorporated Nov 2025). Disclosed openly on the transparency page.
- **Photo gallery** — planned; awaiting real programme photographs.

## Local preview

Open `index.html` directly, or serve the folder:

```
npx serve .
```

## Deployment

See `Balm-Website-Deployment-Guide.pdf` in the parent folder for step-by-step .org domain setup, DNS, HTTPS and Google Search Console instructions.

## License

All rights reserved © The Balm Health Initiative and Social Intervention.
