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
npm run check      # typecheck + build (run before pushing)
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

A wrong icon or colour name stops the build with a clear message, so typos never reach the site.

**To change the header, footer or menu:** edit `src/build/layout.ts` or `src/build/config.ts`.
Every page updates on the next build.

## Going live — checklist

1. **Netlify.** Add new site → Import from GitHub → pick this repo. Netlify reads `netlify.toml`,
   so leave the build settings as they are (`npm run build`, publish `dist`).
2. **Form emails.** Netlify → Site → Forms → Notifications → email for `gift-confirmation`,
   `contact` and `updates`, to thebalmhealthinitiative@gmail.com.
3. **Domain.** When it's bought: change `SITE` in `src/build/config.ts`, push, then add the
   domain in Netlify → Domain management.
4. **Google Search Console.** Add the site, then submit `/sitemap.xml`.
5. **Check security** at securityheaders.com (should score A) and **speed** at pagespeed.web.dev.
6. Renew `SECURITY_TXT_EXPIRES` in `config.ts` every year.

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
