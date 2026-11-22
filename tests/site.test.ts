/**
 * Builds the whole site into a temporary folder and checks every page.
 * These are the mistakes that are easy to make when editing a page by hand.
 * Run: npm test
 */
import { before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { build, findBrokenLinks, type Page } from "../src/build/build.js";
import { NAV, SITE } from "../src/build/config.js";

let out = "";
let pages: Page[] = [];
const html = new Map<string, string>();

before(async () => {
  out = await mkdtemp(join(tmpdir(), "balm-site-"));
  pages = await build(out);
  for (const f of (await readdir(out)).filter((f) => f.endsWith(".html"))) {
    html.set(f, await readFile(join(out, f), "utf8"));
  }
});

const count = (text: string, re: RegExp): number => (text.match(re) ?? []).length;

describe("the whole site", () => {
  test("builds every page in src/pages", () => {
    assert.ok(pages.length >= 14, `only ${pages.length} pages built`);
    for (const p of pages) assert.ok(html.has(p.file), `${p.file} missing from output`);
  });

  test("has no broken links or images", async () => {
    assert.deepEqual(await findBrokenLinks(out), []);
  });

  test("every menu link points at a real page", () => {
    for (const item of NAV) assert.ok(html.has(item.href), `menu links to missing ${item.href}`);
  });

  test("sitemap lists every page Google should see, and nothing else", async () => {
    const sitemap = await readFile(join(out, "sitemap.xml"), "utf8");
    for (const { file, meta } of pages) {
      const url = file === "index.html" ? `${SITE}/` : `${SITE}/${file}`;
      const listed = sitemap.includes(`<loc>${url}</loc>`);
      assert.equal(listed, !meta.robots.startsWith("noindex"), `${file} sitemap entry is wrong`);
    }
  });

  test("robots.txt and security.txt point at this site", async () => {
    assert.ok((await readFile(join(out, "robots.txt"), "utf8")).includes(`${SITE}/sitemap.xml`));
    const sec = await readFile(join(out, ".well-known", "security.txt"), "utf8");
    assert.match(sec, /^Contact: mailto:/m);
    const expires = sec.match(/^Expires: (.+)$/m)?.[1];
    assert.ok(expires && new Date(expires) > new Date(), "security.txt has expired — renew SECURITY_TXT_EXPIRES");
  });
});

describe("every page", () => {
  test("has a title, a description, one h1 and English language set", () => {
    for (const [file, text] of html) {
      assert.match(text, /<html lang="en-NG">/, file);
      assert.equal(count(text, /<title>[^<]{10,}<\/title>/g), 1, `${file}: title`);
      assert.match(text, /<meta name="description" content="[^"]{40,}">/, `${file}: description too short`);
      assert.equal(count(text, /<h1[\s>]/g), 1, `${file}: should have exactly one <h1>`);
      assert.equal(count(text, /<main id="main">/g), 1, `${file}: should have one <main id="main">`);
    }
  });

  test("tells Google its real address (unless hidden from Google)", () => {
    for (const { file, meta } of pages) {
      const text = html.get(file)!;
      const hasCanonical = text.includes('<link rel="canonical" href="');
      assert.equal(hasCanonical, !meta.robots.startsWith("noindex"), `${file}: canonical link`);
      assert.ok(text.includes(`<meta property="og:image" content="${SITE}/`), `${file}: share image`);
    }
  });

  test("has no editing notes, leftover shortcodes or unfilled placeholders", () => {
    for (const [file, text] of html) {
      assert.ok(!text.includes("<!--"), `${file}: an HTML comment reached the public page`);
      assert.ok(!/\{\{[^}]*\}\}/.test(text), `${file}: a shortcode was not expanded`);
      assert.ok(!/lorem ipsum|TODO|FIXME/i.test(text), `${file}: placeholder text`);
    }
  });

  test("follows the security rules (no inline code the browser would block)", () => {
    for (const [file, text] of html) {
      const scripts = text.match(/<script(?![^>]*\bsrc=)[^>]*>/g) ?? [];
      for (const s of scripts) assert.match(s, /type="application\/ld\+json"/, `${file}: inline script ${s}`);
      assert.ok(!/\son[a-z]+="/i.test(text), `${file}: inline event handler (onclick= etc.)`);
      assert.ok(!/<iframe|<object|<embed/i.test(text), `${file}: embedded frames are blocked by our security rules`);
    }
  });

  test("loads CSS and JS with a fingerprint so updates show up straight away", () => {
    for (const [file, text] of html) {
      assert.match(text, /href="assets\/css\/style\.css\?v=[0-9a-f]{10}"/, file);
      assert.match(text, /src="assets\/js\/main\.js\?v=[0-9a-f]{10}"/, file);
    }
  });

  test("gives every image a description and a size", () => {
    for (const [file, text] of html) {
      for (const img of text.match(/<img\b[^>]*>/g) ?? []) {
        assert.match(img, /\salt="/, `${file}: image without alt text: ${img}`);
        if (!/^<img alt="">$/.test(img)) assert.match(img, /\swidth="\d+"/, `${file}: image without width: ${img}`);
      }
    }
  });

  test("opens outside links safely", () => {
    for (const [file, text] of html) {
      for (const a of text.match(/<a [^>]*href="https?:\/\/[^"]*"[^>]*>/g) ?? []) {
        assert.match(a, /rel="[^"]*noopener/, `${file}: outside link without rel="noopener": ${a}`);
      }
    }
  });
});

describe("forms", () => {
  test("every form is set up for Netlify Forms with a spam trap", () => {
    let forms = 0;
    for (const [file, text] of html) {
      for (const form of text.match(/<form\b[^>]*>[\s\S]*?<\/form>/g) ?? []) {
        forms++;
        const name = form.match(/\sname="([^"]+)"/)?.[1];
        assert.ok(name, `${file}: form without a name`);
        assert.match(form, /data-netlify="true"/, `${file}: ${name} not marked for Netlify`);
        assert.match(form, new RegExp(`<input type="hidden" name="form-name" value="${name}">`), `${file}: ${name} form-name`);
        assert.match(form, /netlify-honeypot="bot-field"/, `${file}: ${name} spam trap setting`);
        assert.match(form, /name="bot-field"/, `${file}: ${name} spam trap field`);
      }
    }
    assert.ok(forms >= 4, `expected at least 4 forms, found ${forms}`);
  });

  test("every visible form field has a label", () => {
    for (const [file, text] of html) {
      for (const field of text.match(/<(input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>/g) ?? []) {
        if (/type="hidden"/.test(field)) continue;
        const id = field.match(/\bid="([^"]+)"/)![1];
        assert.ok(text.includes(`<label for="${id}"`), `${file}: field #${id} has no <label for="${id}">`);
      }
    }
  });
});

describe("help and contact details", () => {
  test("Get Help offers both a call and a WhatsApp message", () => {
    const page = html.get("get-help.html")!;
    assert.match(page, /href="tel:\+234\d+"/);
    assert.match(page, /href="https:\/\/wa\.me\/234\d+\?text=/);
    assert.match(page, /tel:112/, "emergency number missing");
  });

  test("every page footer has phone, WhatsApp and email", () => {
    for (const [file, text] of html) {
      const footer = text.slice(text.indexOf('<footer class="site-footer">'));
      assert.match(footer, /href="tel:/, `${file}: footer phone`);
      assert.match(footer, /href="https:\/\/wa\.me\//, `${file}: footer WhatsApp`);
      assert.match(footer, /href="mailto:/, `${file}: footer email`);
    }
  });

  test("the safeguarding page names who receives reports", () => {
    assert.match(html.get("safeguarding-policy.html")!, /Safeguarding Lead, <strong>Comfort Oluremilekun Samuel<\/strong>/);
  });
});
