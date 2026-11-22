/** Unit tests for the small helpers the build is made of. Run: npm test */
import { test } from "node:test";
import assert from "node:assert/strict";

import { addAssetVersions, parsePage, stripComments } from "../src/build/build.js";
import { PHONE, whatsappLink, WHATSAPP } from "../src/build/config.js";
import { icon } from "../src/build/icons.js";
import { art, expandShortcodes } from "../src/build/shortcodes.js";

test("parsePage reads the settings and the body", () => {
  const { meta, body } = parsePage("x.html", "title: Hello\ndescription: A page\nnav: about\n---\n<main>Hi</main>\n");
  assert.equal(meta.title, "Hello");
  assert.equal(meta.description, "A page");
  assert.equal(meta.nav, "about");
  assert.equal(meta.robots, "index, follow");
  assert.equal(body, "<main>Hi</main>\n");
});

test("parsePage handles Windows line endings", () => {
  const { meta, body } = parsePage("x.html", "title: Hello\r\ndescription: A page\r\n---\r\n<main></main>\r\n");
  assert.equal(meta.title, "Hello");
  assert.equal(body, "<main></main>\n");
});

test("parsePage explains what is wrong with a broken page", () => {
  assert.throws(() => parsePage("x.html", "title: Hello\n<main></main>"), /missing the "---" line/);
  assert.throws(() => parsePage("x.html", "description: no title\n---\n"), /missing "title:"/);
  assert.throws(() => parsePage("x.html", "title: A\ndescription: B\nnot a setting\n---\n"), /key: value/);
});

test("icon() draws a known icon and refuses an unknown one", () => {
  assert.match(icon("heart"), /^<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">/);
  assert.throws(() => icon("hart"), /Unknown icon "hart"/);
});

test("art() only accepts the four brand colours", () => {
  assert.match(art("green", "bed", "Label"), /art-green.*frame-label">Label/s);
  assert.throws(() => art("purple", "bed"), /Unknown art colour/);
});

test("shortcodes expand contact details from config", () => {
  const out = expandShortcodes('<a href="{{tel}}">{{phone}}</a> <a href="{{whatsapp}}">WA</a>');
  assert.ok(out.includes(PHONE));
  assert.ok(out.includes(`https://wa.me/${WHATSAPP}`));
});

test("WhatsApp links carry a ready-typed message, safely encoded", () => {
  assert.equal(whatsappLink("Hi & thanks"), `https://wa.me/${WHATSAPP}?text=Hi%20%26%20thanks`);
  const out = expandShortcodes('<a href="{{whatsapp:Hello, I need help}}">');
  assert.ok(out.includes("?text=Hello%2C%20I%20need%20help"));
});

test("an unknown or misspelt shortcode stops the build", () => {
  assert.throws(() => expandShortcodes("{{phnoe}}"), /Unknown shortcode \{\{phnoe\}\}/);
  assert.throws(() => expandShortcodes("{{icon:nope}}"), /Unknown icon/);
});

test("stripComments removes editing notes", () => {
  assert.equal(stripComments("<p>a</p>\n  <!-- private\nnote -->\n<p>b</p>"), "<p>a</p>\n<p>b</p>");
});

test("addAssetVersions adds a fingerprint to CSS and JS links", () => {
  const html = '<link href="assets/css/style.css"><script src="assets/js/main.js"></script>';
  const out = addAssetVersions(html, { "assets/css/style.css": "abc", "assets/js/main.js": "def" });
  assert.equal(out, '<link href="assets/css/style.css?v=abc"><script src="assets/js/main.js?v=def"></script>');
});
