import { EMAIL, FACEBOOK, NAV, ORG, PHONE, PHONE_TEL, SITE, whatsappLink } from "./config.js";
import { icon } from "./icons.js";

/** The settings written at the top of each file in src/pages/. */
export interface PageMeta {
  title: string;
  description: string;
  /** Which menu item to highlight (see NAV in config.ts), or "donate", "legal", "404". */
  nav: string;
  /** Defaults to "index, follow". Use "noindex, follow" to hide a page from Google. */
  robots: string;
}

/** Address of a page on the live site. The home page is just the site root. */
export function pageUrl(file: string): string {
  return `${SITE}/${file === "index.html" ? "" : file}`;
}

export function head(meta: PageMeta, file: string, extraHead = ""): string {
  const { title, description: desc, robots } = meta;
  const url = pageUrl(file);
  const ogImg = `${SITE}/assets/images/og-image.jpg`;
  const canonical = robots.startsWith("noindex") ? "" : `<link rel="canonical" href="${url}">\n`;
  return `<!DOCTYPE html>
<html lang="en-NG">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
${canonical}<meta name="robots" content="${robots}">
<meta name="theme-color" content="#0F2E22">
<meta name="referrer" content="strict-origin-when-cross-origin">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${ORG}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Balm Health Initiative and Social Intervention">
<meta property="og:locale" content="en_NG">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImg}">

<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="assets/images/icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/figtree-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
<script src="assets/js/main.js"></script>
${extraHead}</head>
<body>
`;
}

export function header(active: string): string {
  const links = NAV.map(
    ({ key, href, label }) =>
      `      <a href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a>`,
  ).join("\n");
  const donateCur = active === "donate" ? ' aria-current="page"' : "";
  return `<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header">
  <div class="header-bar">
    <a class="brand" href="index.html">
      <img src="assets/images/logo_icon.png" alt="" width="46" height="50">
      <span class="brand-text">
        <span class="brand-name">THE BALM</span>
        <span class="brand-sub">Health Initiative &amp; Social Intervention</span>
      </span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav"></button>
    <nav class="main-nav" id="primary-nav" aria-label="Main">
${links}
      <a class="header-cta" href="donate.html"${donateCur}>${icon("heart")} Donate</a>
    </nav>
  </div>
</header>
`;
}

export function footer(active: string): string {
  const giveBar =
    active === "donate" || active === "404"
      ? ""
      : `
<aside class="give-bar" aria-label="Donate">
  <span>Help someone get care today</span>
  <a class="btn btn-primary" href="donate.html">Donate</a>
</aside>`;
  return `
<footer class="site-footer">
  <div class="container">
    <div class="foot-grid">
      <div>
        <div class="foot-brand">
          <span class="logo-tile"><img src="assets/images/logo_icon.png" alt="" width="37" height="40"></span>
          <span>THE BALM</span>
        </div>
        <p>A registered health and social intervention NGO in Nigeria, improving health and wellbeing for vulnerable people and underserved communities.</p>
        <ul class="foot-contact">
          <li><a href="tel:${PHONE_TEL}">${icon("phone")} ${PHONE}</a></li>
          <li><a href="${whatsappLink()}" rel="noopener">${icon("whatsapp")} WhatsApp us</a></li>
          <li><a href="mailto:${EMAIL}">${icon("mail")} ${EMAIL}</a></li>${
            FACEBOOK ? `\n          <li><a href="${FACEBOOK}" rel="noopener">${icon("facebook")} Facebook</a></li>` : ""
          }
        </ul>
        <p class="reg-line">Incorporated Trustees of The Balm Health Initiative and Social Interventions (TBHISI) &middot; CAC RN 9000092 &middot; <a href="financial-transparency.html">Registration &amp; compliance</a></p>
      </div>
      <div>
        <h2 class="foot-h">Explore</h2>
        <ul class="foot-links">
          <li><a href="about.html">About us</a></li>
          <li><a href="leadership.html">Leadership &amp; board</a></li>
          <li><a href="programs.html">Our programs</a></li>
          <li><a href="stories.html">Stories &amp; updates</a></li>
          <li><a href="financial-transparency.html">Transparency</a></li>
        </ul>
      </div>
      <div>
        <h2 class="foot-h">Take part</h2>
        <ul class="foot-links">
          <li><a href="get-help.html">Get help</a></li>
          <li><a href="donate.html">Donate</a></li>
          <li><a href="get-involved.html#volunteer">Volunteer</a></li>
          <li><a href="get-involved.html#partner">Partner with us</a></li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </div>
      <div>
        <h2 class="foot-h">Policies</h2>
        <ul class="foot-links">
          <li><a href="safeguarding-policy.html">Safeguarding</a></li>
          <li><a href="privacy-policy.html">Privacy</a></li>
          <li><a href="accessibility.html">Accessibility</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>&copy; <span data-year>2026</span> ${ORG}.</span>
      <span>Progressive Egbusi Community, off Oladele, Bells Drive, Ota, Ogun State</span>
    </div>
  </div>
</footer>
${giveBar}
`;
}

/** Structured data for Google about the organisation. Added to the home page only. */
export function orgJsonLd(): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ORG,
    alternateName: ["TBHISI", "The Balm"],
    url: `${SITE}/`,
    logo: `${SITE}/assets/images/logo_full.png`,
    image: `${SITE}/assets/images/og-image.jpg`,
    description:
      "A CAC-registered health and social intervention NGO in Nigeria improving healthcare access, mental health support and social protection for vulnerable people and underserved communities.",
    foundingDate: "2025-11-17",
    founder: { "@type": "Person", name: "Comfort Oluremilekun Samuel", jobTitle: "Founder & Executive Director" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Progressive Egbusi Community, off Oladele, Bells Drive",
      addressLocality: "Ota",
      addressRegion: "Ogun State",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE.replaceAll(" ", "-"),
      email: EMAIL,
      contactType: "customer service",
      areaServed: "NG",
      availableLanguage: "English",
    },
    areaServed: { "@type": "Country", name: "Nigeria" },
    ...(FACEBOOK ? { sameAs: [FACEBOOK] } : {}),
    identifier: [
      { "@type": "PropertyValue", propertyID: "CAC", value: "RN 9000092" },
      { "@type": "PropertyValue", propertyID: "SCUML", value: "SC 281404687" },
    ],
  };
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>\n`;
}
