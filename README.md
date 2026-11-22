# The Balm Health Initiative — Website

Website for **The Balm Health Initiative and Social Intervention (TBHISI)**.
Written in **TypeScript**, built into plain HTML/CSS/JS, hosted on **Netlify**.
The live site has no framework and loads no outside scripts.

## Commands

```
npm install        # once, after cloning
npm start          # build the site and preview it at http://localhost:3000
npm run build      # build the site into dist/
npm run typecheck  # check all TypeScript for mistakes
npm test           # quick tests: build helpers + every built page (2 seconds)
npm run check      # typecheck + tests + build  ← run this before pushing
npm run test:browser  # slow: opens every page in a real browser (see Tests below)
```

## How the files fit together

```
src/
  pages/           ← EDIT PAGE CONTENT HERE (just the middle part of each page)
  client/main.ts   ← browser code: menu, animations, tabs, copy buttons, forms
  build/
    config.ts      ← site address, contact details, menu  ← change the domain here
    layout.ts      ← <head>, header, footer shared by every page
    icons.ts       ← every icon used on the site
    shortcodes.ts  ← {{icon:...}} and {{art:...}} helpers
    build.ts       ← puts it all together into dist/
public/            ← copied as-is: CSS, fonts, images, favicon, web manifest
dist/              ← the finished website (made by the build — never edit, not in git)
tests/
  *.test.ts        ← quick tests (npm test)
  browser/         ← browser tests (npm run test:browser)
.github/workflows/ ← runs every check on GitHub after each push
netlify.toml       ← Netlify build + security + speed settings
serve.json         ← keeps the local preview behaving like Netlify
```

`npm run build` also writes `sitemap.xml`, `robots.txt` and `.well-known/security.txt`
into `dist/`, using the address in `config.ts`.

### Writing a page

Each file in `src/pages/` starts with settings, then `---`, then the page body:

```
title: Contact Us | The Balm Health Initiative, Ota, Ogun State
description: One sentence for Google and link previews.
nav: contact
---
<main id="main"> ... </main>
```

- `nav` highlights a menu item (`about`, `programs`, `stories`, `transparency`, `involved`,
  `contact`), or use `donate`, `legal` or `404`.
- `robots: noindex, follow` hides a page from Google (optional).

Shortcodes you can use in a body:

| Shortcode | Makes |
|---|---|
| `{{icon:heart}}` | an inline icon (names are in `src/build/icons.ts`) |
| `{{art:green:bed:Hospital visits}}` | a coloured placeholder panel with an icon and label. Colours: `green`, `coral`, `ochre`, `forest` |

| `{{phone}}` `{{email}}` | the phone number / email from `config.ts` |
| `{{tel}}` `{{mailto}}` `{{whatsapp}}` | link addresses for calling, emailing, WhatsApp |
| `{{whatsapp:Hello, I need help}}` | a WhatsApp link with that message already typed in |
| `{{safeguarding-lead}}` | the Safeguarding Lead's name |

A wrong icon, colour or shortcode name stops the build with a clear message, so typos never reach the site.
So does a link to a page or `#section` that doesn't exist. `<!-- notes -->` in a page are removed from the
public site, so you can leave notes for yourself.

**To change the header, footer or menu:** edit `src/build/layout.ts` or `src/build/config.ts`.
Every page updates on the next build.

## Tests

`npm test` builds the site into a temporary folder and checks every page: titles and descriptions,
one main heading, no broken links, no editing notes left in, every form set up for Netlify with a spam trap,
every form field labelled, every image described, the security rules respected, and the
call/WhatsApp/email details present.

`npm run test:browser` opens every page in Chrome at computer and phone size. It runs the axe
accessibility scanner, checks for script errors and sideways scrolling, checks content still shows if the
script breaks, and clicks through the menu, OPTRTE steps, donate form, questions and certificates.
The first time, run `npx playwright install chromium` to download the test browser.

GitHub runs all of this after every push (`.github/workflows/check.yml`). A green ✓ next to a commit
means everything passed; a red ❌ means something broke — click it to see what.

## Going live — checklist

1. **Netlify.** Add new site → Import from GitHub → pick this repo. Netlify reads `netlify.toml`,
   so leave the build settings as they are (`npm run build`, publish `dist`).
2. **Form emails.** Netlify → Site → Forms → Notifications → email for `gift-confirmation`,
   `contact` and `updates`, to thebalmhealthinitiative@gmail.com.
3. **Domain.** When it's bought, add it in Netlify → Domain management. The build picks up the
   new address by itself (from Netlify's `URL` setting). Also update `PLANNED_DOMAIN` in `config.ts`.
4. **Google Search Console.** Add the site, then submit `/sitemap.xml`.
5. **Check security** at securityheaders.com (should score A) and **speed** at pagespeed.web.dev.
6. Renew `SECURITY_TXT_EXPIRES` in `config.ts` every year (`npm test` fails when it expires, as a reminder).

## How gift checking works (bank transfer)

1. Each visitor on the Donate page gets a code like `BALM-7KQ2`.
2. They put it in the transfer description and fill the "I've sent a gift" form.
3. The form lands in Netlify (and your email).
4. Someone checks the Zenith Bank statement for that code and amount, then emails a thank-you.

Never accept a screenshot alone as proof — screenshots are easy to fake. Only the bank statement counts.

**Later:** Paystack can give a dedicated account number or payment page that confirms
transfers automatically and emails receipts.

## Adding real photos

Photo spots currently show coloured art panels. To use a real photo, put it in
`public/assets/images/` and add an `<img>` inside the `frame` div in `src/pages/`. The art
panel stays behind it as a backup if the photo fails to load.
Only publish photos of people who agreed in writing (see the safeguarding policy).
Keep photos under ~300 KB (squoosh.app shrinks them).

Adding a story: see the instructions inside `src/pages/stories.html`.
