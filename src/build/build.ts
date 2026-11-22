/**
 * Builds the website into dist/.
 *
 *   npm run build
 *
 * 1. Copies everything in public/ (CSS, fonts, images, icons) as-is.
 * 2. Compiles src/client/main.ts into assets/js/main.js for the browser.
 * 3. Turns each file in src/pages/ into a full page (adds <head>, header, footer).
 * 4. Writes sitemap.xml, robots.txt and .well-known/security.txt.
 * 5. Checks every link and image on every page, and stops if one is broken.
 *
 * Each file in src/pages/ starts with a few "key: value" lines, then a line
 * with ---, then the page body. See README.md for the shortcodes.
 */
import { createHash } from "node:crypto";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

import { EMAIL, SECURITY_TXT_EXPIRES, SITE, SITEMAP_PRIORITY } from "./config.js";
import { footer, head, header, orgJsonLd, pageUrl, type PageMeta } from "./layout.js";
import { expandShortcodes } from "./shortcodes.js";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PAGES = join(ROOT, "src", "pages");
const CLIENT = join(ROOT, "src", "client", "main.ts");
const PUBLIC = join(ROOT, "public");

export interface Page {
  file: string;
  meta: PageMeta;
}

/** Splits a page source into its settings and its body. */
export function parsePage(file: string, source: string): { meta: PageMeta; body: string } {
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

/** Removes <!-- notes --> so editing notes never reach the public site. */
export function stripComments(html: string): string {
  return html.replace(/[ \t]*<!--[\s\S]*?-->[ \t]*\n?/g, "");
}

/** Short fingerprint of a file's contents, used to make browsers fetch a fresh copy after a change. */
function fingerprint(content: string | Buffer): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 10);
}

/** Points the page at the current versions of the CSS and JS files. */
export function addAssetVersions(html: string, versions: Record<string, string>): string {
  let out = html;
  for (const [path, version] of Object.entries(versions)) {
    out = out.replaceAll(`"${path}"`, `"${path}?v=${version}"`);
  }
  return out;
}

/** Compiles the browser script. Type errors are caught separately by `npm run typecheck`. */
async function buildClient(outDir: string): Promise<string> {
  const source = await readFile(CLIENT, "utf8");
  const { outputText } = ts.transpileModule(source, {
    fileName: "main.ts",
    compilerOptions: {
      target: ts.ScriptTarget.ES2019, // works on older phones still common in Nigeria
      module: ts.ModuleKind.None,
      removeComments: false,
    },
  });
  await mkdir(join(outDir, "assets", "js"), { recursive: true });
  await writeFile(join(outDir, "assets", "js", "main.js"), outputText, "utf8");
  return outputText;
}

async function buildPages(outDir: string, versions: Record<string, string>): Promise<Page[]> {
  const files = (await readdir(PAGES)).filter((f) => f.endsWith(".html")).sort();
  const pages: Page[] = [];
  for (const file of files) {
    const { meta, body } = parsePage(file, await readFile(join(PAGES, file), "utf8"));
    const extra = file === "index.html" ? orgJsonLd() : "";
    const html =
      head(meta, file, extra) +
      header(meta.nav) +
      expandShortcodes(stripComments(body)) +
      footer(meta.nav) +
      "\n</body>\n</html>\n";
    await writeFile(join(outDir, file), addAssetVersions(html, versions), "utf8");
    pages.push({ file, meta });
  }
  return pages;
}

async function buildSeoFiles(outDir: string, pages: Page[]): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const rows = pages
    .filter(({ meta }) => !meta.robots.startsWith("noindex"))
    .map(
      ({ file }) =>
        `  <url><loc>${pageUrl(file)}</loc><lastmod>${today}</lastmod>` +
        `<priority>${SITEMAP_PRIORITY[file] ?? "0.4"}</priority></url>`,
    );
  await writeFile(
    join(outDir, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      rows.join("\n") +
      "\n</urlset>\n",
    "utf8",
  );

  await writeFile(join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`, "utf8");

  await mkdir(join(outDir, ".well-known"), { recursive: true });
  await writeFile(
    join(outDir, ".well-known", "security.txt"),
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
}

/**
 * Finds every link and image on every page that points at something missing:
 * a file that doesn't exist, or a #section that isn't on the target page.
 */
export async function findBrokenLinks(outDir: string): Promise<string[]> {
  const files = (await readdir(outDir)).filter((f) => f.endsWith(".html"));
  const ids = new Map<string, Set<string>>();
  const html = new Map<string, string>();
  for (const f of files) {
    const text = await readFile(join(outDir, f), "utf8");
    html.set(f, text);
    ids.set(f, new Set(Array.from(text.matchAll(/\sid="([^"]+)"/g), (m) => m[1]!)));
  }
  const problems: string[] = [];
  for (const [f, text] of html) {
    for (const [, attr, url] of text.matchAll(/\s(href|src)="([^"]*)"/g)) {
      if (!url || /^(https?:|mailto:|tel:|data:|sms:)/.test(url)) continue;
      const [pathAndQuery = "", frag] = url.split("#");
      const path = pathAndQuery.split("?")[0] ?? "";
      const target = path || f;
      if (path && !existsSync(join(outDir, path))) {
        problems.push(`${f}: ${attr}="${url}" — file not found`);
      } else if (frag && target.endsWith(".html") && !ids.get(target)?.has(frag)) {
        problems.push(`${f}: ${attr}="${url}" — no element with id "${frag}" on ${target}`);
      }
    }
  }
  return problems;
}

/** Builds the whole site into outDir. Returns the pages it made. */
export async function build(outDir = join(ROOT, "dist"), log: (msg: string) => void = () => {}): Promise<Page[]> {
  await rm(outDir, { recursive: true, force: true });
  await cp(PUBLIC, outDir, { recursive: true });
  log("  copied    public/ → dist/");

  const js = await buildClient(outDir);
  const css = await readFile(join(outDir, "assets", "css", "style.css"));
  const versions = { "assets/js/main.js": fingerprint(js), "assets/css/style.css": fingerprint(css) };
  log("  script    assets/js/main.js");

  const pages = await buildPages(outDir, versions);
  for (const p of pages) log(`  page      ${p.file}`);

  await buildSeoFiles(outDir, pages);
  log("  seo       sitemap.xml, robots.txt, .well-known/security.txt");

  const broken = await findBrokenLinks(outDir);
  if (broken.length) throw new Error(`Broken links found:\n  ${broken.join("\n  ")}`);
  log("  links     all links and images point somewhere real");
  return pages;
}

// Run the build when this file is started directly (npm run build), not when imported by tests.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const started = Date.now();
  build(undefined, console.log)
    .then((pages) => console.log(`Built ${pages.length} pages into dist/ for ${SITE} in ${Date.now() - started} ms`))
    .catch((err: unknown) => {
      console.error("Build failed:", err instanceof Error ? err.message : err);
      process.exit(1);
    });
}
