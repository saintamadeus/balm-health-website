#!/usr/bin/env python3
"""
Tiny page builder for The Balm website.

Why: the header, footer and <head> tags are the same on every page.
Writing them once here means you change them in ONE place.

How to use:
    python build.py
It reads every file in src/ and writes the finished .html pages next to
this script (the site root). The output is plain HTML — no framework.

Each src file starts with a few "key: value" lines, then a line with ---,
then the page body. Shortcodes you can use in a body:
    {{icon:NAME}}                 an inline icon (see ICONS below)
    {{art:COLOUR:ICON:Label}}     a placeholder art panel (green/coral/ochre/forest)
                                   — swap for a real <img> when photos exist
"""
import re, pathlib, datetime

SITE = "https://www.thebalmhealthinitiative.org"   # change once the domain is bought
ORG = "The Balm Health Initiative and Social Intervention"
EMAIL = "thebalmhealthinitiative@gmail.com"
PHONE = "+234 907 852 4319"
PHONE_TEL = "+2349078524319"
TODAY = datetime.date.today().isoformat()

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"

# ---------------------------------------------------------------- icons
P = {
 "heart":    '<path d="M20.8 8.6c0-2.6-2.1-4.6-4.6-4.6-1.6 0-3.1.9-3.9 2.2-.8-1.3-2.3-2.2-3.9-2.2-2.6 0-4.6 2.1-4.6 4.6 0 5.4 8.5 10.4 8.5 10.4s8.5-5 8.5-10.4Z"/>',
 "pulse":    '<path d="M20.8 8.6c0-2.6-2.1-4.6-4.6-4.6-1.6 0-3.1.9-3.9 2.2-.8-1.3-2.3-2.2-3.9-2.2-2.6 0-4.6 2.1-4.6 4.6 0 5.4 8.5 10.4 8.5 10.4s8.5-5 8.5-10.4Z"/><path d="M2.5 12h3l2-3 3 6 2-3h9"/>',
 "cross":    '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z"/>',
 "brain":    '<path d="M9.5 3a3.5 3.5 0 0 0-3.5 3.5 3 3 0 0 0-2 5.2 3.5 3.5 0 0 0 2.4 6 3.5 3.5 0 0 0 3.1 2.3V3Z"/><path d="M14.5 3a3.5 3.5 0 0 1 3.5 3.5 3 3 0 0 1 2 5.2 3.5 3.5 0 0 1-2.4 6 3.5 3.5 0 0 1-3.1 2.3V3Z"/>',
 "people":   '<circle cx="8.5" cy="8" r="3"/><path d="M2.5 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M14.7 13a5 5 0 0 1 6.8 4.6"/>',
 "sprout":   '<path d="M12 21V10"/><path d="M12 10C12 6 8 5 4 5c0 4 1 8 8 8Z"/><path d="M12 10c0-4 4-5 8-5 0 4-1 8-8 8Z"/>',
 "chart":    '<path d="M3 3v18h18"/><path d="M7 16v-4"/><path d="M12 16V8"/><path d="M17 16v-7"/>',
 "handshake":'<path d="M2.5 12.5 6 9l4 3.5 4-4 3.5 3-2.8 3a2 2 0 0 1-2.8 0l-.4-.4"/><path d="m9.8 12.7 2.7 2.7a2 2 0 0 0 2.8 0l.2-.2"/><path d="m14 8.5 3-3 4 4-3 3"/>',
 "globe":    '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z"/>',
 "shield":   '<path d="M12 3 4.5 5.7v5.6c0 5 3.2 8.4 7.5 9.7 4.3-1.3 7.5-4.7 7.5-9.7V5.7Z"/><path d="m8.7 12.2 2.4 2.4 4.4-4.9"/>',
 "lock":     '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>',
 "check":    '<circle cx="12" cy="12" r="9.3"/><path d="m8 12.3 2.6 2.6 5.4-6"/>',
 "arrow":    '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
 "plus":     '<path d="M12 5v14"/><path d="M5 12h14"/>',
 "pin":      '<path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/>',
 "phone":    '<path d="M4 4.5c0 8.6 6.9 15.5 15.5 15.5.6 0 1-.4 1-1v-3.2c0-.5-.4-1-1-1l-3.3-.4c-.4 0-.8.1-1 .4l-1.3 1.3a12 12 0 0 1-5.5-5.5l1.3-1.3c.3-.3.4-.7.4-1L9.7 5c0-.6-.4-1-1-1H5.5c-.8 0-1.5.7-1.5 1.5Z"/>',
 "mail":     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6 8.5 7 8.5-7"/>',
 "basket":   '<path d="M3 9h18l-1.6 10.2a2 2 0 0 1-2 1.8H6.6a2 2 0 0 1-2-1.8Z"/><path d="m8 9 2.6-5"/><path d="m16 9-2.6-5"/><path d="M9.5 13.5v3.5"/><path d="M14.5 13.5v3.5"/>',
 "calendar": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M3 11h18"/><path d="m9.5 16 1.8 1.8 3.4-3.6"/>',
 "file":     '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/>',
 "scales":   '<path d="M12 3v18"/><path d="M7 7h10"/><path d="m5 11 2.5-4L10 11a2.5 2.5 0 0 1-5 0Z"/><path d="m14 11 2.5-4L19 11a2.5 2.5 0 0 1-5 0Z"/><path d="M8 21h8"/>',
 "bed":      '<path d="M3 18V6"/><path d="M3 14h18v4"/><path d="M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/>',
 "handheart":'<path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16"/><path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.8-2.9l-4.2 3.9"/><path d="m2 15 6 6"/><path d="M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.7 2.7 0 0 0 16 4a2.8 2.8 0 0 0-4.9 1.8c0 1.2.8 2 1.5 2.7L16 11Z"/>',
 "search":   '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
 "steth":    '<path d="M5 3v5a5 5 0 0 0 10 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
 "refresh":  '<path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 21v-5h5"/>',
 "book":     '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2"/><path d="M8 7h8"/><path d="M8 11h6"/>',
 "briefcase":'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 13h18"/>',
 "copy":     '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
 "bank":     '<path d="M3 10 12 4l9 6"/><path d="M5 10v8"/><path d="M9.5 10v8"/><path d="M14.5 10v8"/><path d="M19 10v8"/><path d="M3 21h18"/>',
 "news":     '<path d="M4 4h13v15a2 2 0 0 0 2 2H6a2 2 0 0 1-2-2Z"/><path d="M17 8h3v11a2 2 0 0 1-2 2"/><path d="M8 8h5"/><path d="M8 12h5"/><path d="M8 16h3"/>',
 "camera":   '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13.5" r="3.5"/>',
 "clock":    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 "zoom":     '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/><path d="M11 8.5v5"/><path d="M8.5 11h5"/>',
 "star":     '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
 "flag":     '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
 "send":     '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
 "eye":      '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
}

def icon(name, cls="icon", extra=""):
    return f'<svg class="{cls}{(" "+extra) if extra else ""}" viewBox="0 0 24 24" aria-hidden="true">{P[name]}</svg>'

ART_BG = ('<svg class="art-bg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
          '<circle cx="330" cy="40" r="120" fill="#fff" fill-opacity=".18"/>'
          '<circle cx="40" cy="280" r="150" fill="#fff" fill-opacity=".14"/>'
          '<circle cx="200" cy="150" r="200" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="1.5"/>'
          '<circle cx="200" cy="150" r="140" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.5"/>'
          '</svg>')

def art(colour, ic, label=""):
    lab = f'<span class="frame-label">{label}</span>' if label else ""
    return f'<div class="art art-{colour}">{ART_BG}<span class="art-icon">{icon(ic)}</span></div>{lab}'

def shortcodes(s):
    s = re.sub(r"\{\{icon:(\w+)\}\}", lambda m: icon(m.group(1)), s)
    s = re.sub(r"\{\{art:(\w+):(\w+):?([^}]*)\}\}", lambda m: art(m.group(1), m.group(2), m.group(3)), s)
    return s

# ---------------------------------------------------------------- layout
NAV = [
    ("about", "about.html", "About"),
    ("programs", "programs.html", "Programs"),
    ("stories", "stories.html", "Stories"),
    ("transparency", "financial-transparency.html", "Transparency"),
    ("involved", "get-involved.html", "Get Involved"),
    ("contact", "contact.html", "Contact"),
]

def header(active):
    links = "\n".join(
        f'      <a href="{href}"{" aria-current=\"page\"" if key == active else ""}>{label}</a>'
        for key, href, label in NAV)
    donate_cur = ' aria-current="page"' if active == "donate" else ""
    return f'''<a class="skip-link" href="#main">Skip to main content</a>

<header class="site-header">
  <div class="header-bar">
    <a class="brand" href="index.html" aria-label="The Balm — home">
      <img src="assets/images/logo_icon.png" alt="" width="46" height="50">
      <span class="brand-text">
        <span class="brand-name">THE BALM</span>
        <span class="brand-sub">Health Initiative &amp; Social Intervention</span>
      </span>
    </a>
    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-nav"></button>
    <nav class="main-nav" id="primary-nav" aria-label="Main">
{links}
      <a class="header-cta" href="donate.html"{donate_cur}>{icon("heart")} Donate</a>
    </nav>
  </div>
</header>
'''

def footer(active):
    give_bar = "" if active in ("donate", "404") else f'''
<div class="give-bar" aria-hidden="false">
  <span>Help someone get care today</span>
  <a class="btn btn-primary" href="donate.html">Donate</a>
</div>'''
    return f'''
<footer class="site-footer">
  <div class="container">
    <div class="foot-grid">
      <div>
        <div class="foot-brand">
          <span class="logo-tile"><img src="assets/images/logo_icon.png" alt="" width="37" height="40"></span>
          <span>THE BALM</span>
        </div>
        <p>A registered health and social intervention NGO in Nigeria, improving health and wellbeing for vulnerable people and underserved communities.</p>
        <p class="reg-line">Incorporated Trustees of The Balm Health Initiative and Social Interventions (TBHISI) &middot; CAC RN 9000092 &middot; <a href="financial-transparency.html">Registration &amp; compliance</a></p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul class="foot-links">
          <li><a href="about.html">About us</a></li>
          <li><a href="leadership.html">Leadership &amp; board</a></li>
          <li><a href="programs.html">Our programs</a></li>
          <li><a href="stories.html">Stories &amp; updates</a></li>
          <li><a href="financial-transparency.html">Transparency</a></li>
        </ul>
      </div>
      <div>
        <h4>Take part</h4>
        <ul class="foot-links">
          <li><a href="donate.html">Donate</a></li>
          <li><a href="get-involved.html#volunteer">Volunteer</a></li>
          <li><a href="get-involved.html#partner">Partner with us</a></li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </div>
      <div>
        <h4>Policies</h4>
        <ul class="foot-links">
          <li><a href="safeguarding-policy.html">Safeguarding</a></li>
          <li><a href="privacy-policy.html">Privacy</a></li>
          <li><a href="accessibility.html">Accessibility</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>&copy; <span data-year>2026</span> {ORG}.</span>
      <span>Progressive Egbusi Community, off Oladele, Bells Drive, Ota, Ogun State &middot; <a href="tel:{PHONE_TEL}" style="color:inherit">{PHONE}</a></span>
    </div>
  </div>
</footer>
{give_bar}
'''

def head(meta, path):
    title = meta["title"]
    desc = meta["description"]
    url = f"{SITE}/{'' if path == 'index.html' else path}"
    robots = meta.get("robots", "index, follow")
    og_img = f"{SITE}/assets/images/og-image.jpg"
    canonical = "" if robots.startswith("noindex") else f'<link rel="canonical" href="{url}">\n'
    extra = meta.get("_extra_head", "")
    return f'''<!DOCTYPE html>
<html lang="en-NG">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
{canonical}<meta name="robots" content="{robots}">
<meta name="theme-color" content="#0F2E22">
<meta name="referrer" content="strict-origin-when-cross-origin">

<meta property="og:type" content="website">
<meta property="og:site_name" content="{ORG}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{og_img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="The Balm Health Initiative and Social Intervention">
<meta property="og:locale" content="en_NG">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{og_img}">

<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="assets/images/icon-192.png" type="image/png">
<link rel="apple-touch-icon" href="assets/images/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/figtree-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/style.css">
<script src="assets/js/main.js"></script>
{extra}</head>
<body>
'''

def parse(src_text):
    meta_txt, body = src_text.split("\n---\n", 1)
    meta = {}
    for line in meta_txt.strip().splitlines():
        k, v = line.split(":", 1)
        meta[k.strip()] = v.strip()
    return meta, body

JSONLD_HOME = f'''<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "{ORG}",
  "alternateName": ["TBHISI", "The Balm"],
  "url": "{SITE}/",
  "logo": "{SITE}/assets/images/logo_full.png",
  "image": "{SITE}/assets/images/og-image.jpg",
  "description": "A CAC-registered health and social intervention NGO in Nigeria improving healthcare access, mental health support and social protection for vulnerable people and underserved communities.",
  "foundingDate": "2025-11-17",
  "founder": {{ "@type": "Person", "name": "Comfort Oluremilekun Samuel", "jobTitle": "Founder & Executive Director" }},
  "address": {{
    "@type": "PostalAddress",
    "streetAddress": "Progressive Egbusi Community, off Oladele, Bells Drive",
    "addressLocality": "Ota",
    "addressRegion": "Ogun State",
    "addressCountry": "NG"
  }},
  "contactPoint": {{
    "@type": "ContactPoint",
    "telephone": "{PHONE.replace(' ', '-')}",
    "email": "{EMAIL}",
    "contactType": "customer service",
    "areaServed": "NG",
    "availableLanguage": "English"
  }},
  "areaServed": {{ "@type": "Country", "name": "Nigeria" }},
  "identifier": [
    {{ "@type": "PropertyValue", "propertyID": "CAC", "value": "RN 9000092" }},
    {{ "@type": "PropertyValue", "propertyID": "SCUML", "value": "SC 281404687" }}
  ]
}}
</script>
'''

def build():
    pages = []
    for f in sorted(SRC.glob("*.html")):
        meta, body = parse(f.read_text(encoding="utf-8"))
        path = f.name
        active = meta.get("nav", "")
        if path == "index.html":
            meta["_extra_head"] = JSONLD_HOME
        html = head(meta, path) + header(active) + shortcodes(body) + footer(active) + "\n</body>\n</html>\n"
        (ROOT / path).write_text(html, encoding="utf-8")
        pages.append((path, meta))
        print("built", path)

    # sitemap.xml — every indexable page
    pri = {"index.html": "1.0", "donate.html": "0.9", "programs.html": "0.9", "about.html": "0.9",
           "get-involved.html": "0.8", "stories.html": "0.8", "leadership.html": "0.8",
           "financial-transparency.html": "0.8", "contact.html": "0.7"}
    rows = []
    for path, meta in pages:
        if meta.get("robots", "").startswith("noindex"):
            continue
        loc = f"{SITE}/" if path == "index.html" else f"{SITE}/{path}"
        rows.append(f"  <url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><priority>{pri.get(path, '0.4')}</priority></url>")
    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(rows) + "\n</urlset>\n", encoding="utf-8")
    print("built sitemap.xml")

if __name__ == "__main__":
    build()
