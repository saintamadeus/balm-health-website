# The Balm Health Initiative and Social Intervention — Website

Official website for **The Balm Health Initiative and Social Intervention (TBHISI)**, a nonprofit and humanitarian organization improving health outcomes and social wellbeing for vulnerable individuals and underserved communities in Nigeria.

## About

TBHISI is registered in Nigeria as Incorporated Trustees under Part F of CAMA 2020. Full registration numbers (CAC, SCUML, TIN) and certificate scans are published on the site's [Regulatory Compliance & Financial Transparency](financial-transparency.html) page — that is the single source of truth for those details; they're deliberately not repeated elsewhere on the site.

## Tech stack

Static site — plain HTML5, CSS3, and vanilla JavaScript. No build step, no framework, no dependencies. Any static host (Netlify, Vercel, GitHub Pages) can serve it as-is.

## Structure

```
.
├── index.html                      Home
├── about.html                      Mission, vision, core values (B.A.L.M), objectives
├── leadership.html                 Founder bio, Board of Trustees, org structure
├── programs.html                   Five thematic program areas
├── financial-transparency.html     Regulatory compliance (CAC/SCUML/TIN) + certificates, fund allocation
├── get-involved.html               Donate (demo form), volunteer, partner
├── contact.html                    Contact form + details
├── privacy-policy.html
├── safeguarding-policy.html
├── accessibility.html              Accessibility statement
├── sitemap.xml / robots.txt
└── assets/
    ├── css/style.css               Shared stylesheet (brand colors, animations, responsive layout)
    ├── js/main.js                  Mobile nav, scroll-reveal animation, donation form, contact form
    └── images/                     Logo, founder photo, CAC/SCUML certificate scans
```

## Known placeholders (not yet live)

- **Donations**: the donation form is a working UI demo. It is not connected to a real payment processor yet. Wire up Paystack (or Flutterwave) before accepting real donations online — until then, direct donors to the bank transfer details on the Get Involved / Financial Transparency pages.
- **Contact form**: currently opens the visitor's email client (`mailto:`) pre-filled with their message. No backend/database is connected yet.
- **Financial statements**: no audited annual report exists yet (organization incorporated November 2025) — this is disclosed openly on the Financial Transparency page rather than hidden.

## Local preview

No build tools required. Open `index.html` directly in a browser, or serve the folder with any static file server, e.g.:

```
npx serve .
```

## Deployment

Currently deployed for client review via [Netlify Drop](https://app.netlify.com/drop). For a permanent deployment with a custom domain, connect this repository to Netlify or Vercel for continuous deployment on every push to `main`.

## License

All rights reserved © The Balm Health Initiative and Social Intervention.
