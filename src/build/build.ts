/**
 * Builds the website into dist/.
 *
 *   npm run build
 *
 * 1. Copies everything in public/ (CSS, fonts, images, icons) as-is.
 * 2. Turns each file in src/pages/ into a full page (adds <head>, header, footer).
 * 3. Compiles src/client/main.ts into assets/js/main.js for the browser.
 * 4. Writes sitemap.xml, robots.txt and .well-known/security.txt.
 *
 * Each file in src/pages/ starts with a few "key: value" lines, then a line
 * with ---, then the page body. See README.md for the shortcodes.
 */
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import { EMAIL, SECURITY_TXT_EXPIRES, SITE, SITEMAP_PRIORITY } from "./config.js";
import { footer, head, header, orgJsonLd, pageUrl, type PageMeta } from "./layout.js";
import { expandShortcodes } from "./shortcodes.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PAGES = join(ROOT, "src", "pages");
const CLIENT = join(ROOT, "src", "client", "main.ts");
const PUBLIC = join(ROOT, "public");
const DIST = join(ROOT, "dist");

interface Page {
  file: string;
  meta: PageMeta;
}

/** Splits a page source into its settings and its body. */
function parsePage(file: string, source: string): { meta: PageMeta; body: string } {
  const text = source.replace(/\r\n/g, "\n"); // Windows line endings
  const split = text.indexOf("\n---\n");
  if (split === -1) throw new Error(`${file}: missing the "---" line after the page settings.`);

  const fields: Record<string, string> = {};
  for (const line of text.slice(0, split).trim().split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) throw new Error(`${file}: settings line "${line}" needs a "key: value" form.`);
    fields[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  for (const key of ["title", "description"] as const) {
    if (!fields[key]) throw new Error(`${file}: missing "${key}:" at the top.`);
  }
  const meta: PageMeta = {
    title: fields.title!,
    description: fields.description!,
    nav: fields.nav ?? "",
    robots: fields.robots ?? "index, follow",
  };
  return { meta, body: text.slice(split + 5) };
}

async function buildPages(): Promise<Page[]> {
  const files = (await readdir(PAGES)).filter((f) => f.endsWith(".html")).sort();
  const pages: Page[] = [];
  for (const file of files) {
    const { meta, body } = parsePage(file, await readFile(join(PAGES, file), "utf8"));
    const extra = file === "index.html" ? orgJsonLd() : "";
    const html =
      head(meta, file, extra) + header(meta.nav) + expandShortcodes(body) + footer(meta.nav) + "\n</body>\n</html>\n";
    await writeFile(join(DIST, file), html, "utf8");
    pages.push({ file, meta });
    console.log("  page     ", file);
  }
  return pages;
}

/** Compiles the browser script. Type errors are caught separately by `npm run typecheck`. */
async function buildClient(): Promise<void> {
  const source = await readFile(CLIENT, "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName: "main.ts",
    compilerOptions: {
      target: ts.ScriptTarget.ES2019, // works on older phones still common in Nigeria
      module: ts.ModuleKind.None,
      removeComments: false,
    },
  });
  await mkdir(join(DIST, "assets", "js"), { recursive: true });
  await writeFile(join(DIST, "assets", "js", "main.js"), outputText, "utf8");
  console.log("  script    assets/js/main.js");
}

async function buildSeoFiles(pages: Page[]): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const rows = pages
    .filter(({ meta }) => !meta.robots.startsWith("noindex"))
    .map(
      ({ file }) =>
        `  <url><loc>${file === "index.html" ? `${SITE}/` : pageUrl(file)}</loc><lastmod>${today}</lastmod>` +
        `<priority>${SITEMAP_PRIORITY[file] ?? "0.4"}</priority></url>`,
    );
  await writeFile(
    join(DIST, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      rows.join("\n") +
      "\n</urlset>\n",
    "utf8",
  );

  await writeFile(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`, "utf8");

  await mkdir(join(DIST, ".well-known"), { recursive: true });
  await writeFile(
    join(DIST, ".well-known", "security.txt"),
    [
      "# Found a security problem on this website? Please tell us privately.",
      `Contact: mailto:${EMAIL}`,
      `Expires: ${SECURITY_TXT_EXPIRES}`,
      "Preferred-Languages: en",
      `Canonical: ${SITE}/.well-known/security.txt`,
      "",
    ].join("\n"),
    "utf8",
  );
  console.log("  seo       sitemap.xml, robots.txt, .well-known/security.txt");
}

async function main(): Promise<void> {
  const started = Date.now();
  await rm(DIST, { recursive: true, force: true });
  await cp(PUBLIC, DIST, { recursive: true });
  console.log("  copied    public/ → dist/");
  const pages = await buildPages();
  await buildClient();
  await buildSeoFiles(pages);
  console.log(`Built ${pages.length} pages into dist/ in ${Date.now() - started} ms`);
}

main().catch((err: unknown) => {
  console.error("Build failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
