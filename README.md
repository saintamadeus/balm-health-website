# The Balm Health Initiative — Website (v4)

Plain HTML, CSS and JavaScript. No framework. Built to be hosted on **Netlify** (free).

## How the files fit together

```
src/                 ← EDIT PAGES HERE (just the middle part of each page)
build.py             ← run this after editing; it adds the header, footer and meta tags
*.html               ← the finished pages (made by build.py — don't edit these by hand)
assets/css/style.css ← all colours, fonts and layout
assets/js/main.js    ← menu, animations, tabs, copy buttons, forms
assets/fonts/        ← Fraunces (headings) + Figtree (text), stored on our own site
assets/images/       ← logo, founder photo, certificates, icons, social share image
netlify.toml         ← security + speed settings for Netlify
sitemap.xml          ← list of pages for Google (made by build.py)
robots.txt           ← tells search engines what to look at
site.webmanifest     ← lets phones "add to home screen" with our logo
.well-known/security.txt ← where to report a security problem
```

**To change a page:** edit the file in `src/`, then run:

```
python build.py
```

**To change the header, footer or menu:** edit `build.py` (one place, all pages update).

## Before going live — checklist

1. **Domain.** When it's bought, change `SITE` at the top of `build.py`, and the address in
   `robots.txt` and `.well-known/security.txt`. Run `python build.py`.
2. **Deploy to Netlify.** Drag the whole folder onto app.netlify.com/drop, or connect GitHub.
   Forms only work on Netlify (they use Netlify Forms).
3. **Turn on form emails.** Netlify → Site → Forms → Notifications → "Email notification" for
   `gift-confirmation`, `contact` and `updates`. Send them to thebalmhealthinitiative@gmail.com.
4. **Google Search Console.** Add the site, then submit `sitemap.xml`.
5. **Check security.** Paste the live address into securityheaders.com — it should score A.
6. **Check speed.** Paste it into pagespeed.web.dev.
7. Renew the date in `.well-known/security.txt` every year.

## How gift checking works (bank transfer)

1. Each visitor on the Donate page gets a code like `BALM-7KQ2`.
2. They put it in the transfer description and fill the "I've sent a gift" form.
3. The form lands in Netlify (and your email).
4. Someone checks the Zenith Bank statement for that code and amount, then emails a thank-you.

Never accept a screenshot alone as proof — screenshots are easy to fake. Only the bank statement counts.

**Later:** with Paystack you can get a dedicated account number or payment page that confirms
transfers automatically and emails receipts. Swap it in when the NGO is ready.

## Adding real photos

Photo spots currently show coloured art panels. To use a real photo, add an `<img>` inside the
`frame` div in `src/` — the art panel stays behind it as a backup if the photo fails to load.
Only publish photos of people who agreed in writing (see the safeguarding policy).
Keep photos under ~300 KB (use squoosh.app to shrink them).

Adding a story: see the instructions inside `src/stories.html`.
