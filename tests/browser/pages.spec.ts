/** Every page: no accessibility failures, no script errors, nothing hidden, nothing sliding sideways. */
import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = readdirSync("src/pages").filter((f) => f.endsWith(".html"));

for (const page of PAGES) {
  test.describe(page, () => {
    test("has no accessibility failures", async ({ page: p }) => {
      await p.goto(`/${page}`);
      // Show every section as if the visitor had scrolled through the page.
      await p.evaluate(() => document.querySelectorAll(".rv, .rv-stagger").forEach((e) => e.classList.add("in")));
      await p.waitForTimeout(900);
      const { violations } = await new AxeBuilder({ page: p })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();
      const summary = violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
      expect(summary, summary.join("\n")).toEqual([]);
    });

    test("loads without script errors and fits the screen", async ({ page: p }) => {
      const errors: string[] = [];
      p.on("pageerror", (e) => errors.push(e.message));
      p.on("console", (m) => m.type() === "error" && errors.push(m.text()));
      await p.goto(`/${page}`);
      await expect(p.locator("html")).toHaveClass(/reveal-ready/);
      expect(errors).toEqual([]);
      const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "page scrolls sideways").toBeLessThanOrEqual(1);
    });
  });
}

test("content still appears if the script breaks", async ({ page: p }) => {
  // Make every script feature fail, then check the page is still readable.
  await p.addInitScript(() => {
    document.querySelectorAll = () => {
      throw new Error("simulated failure");
    };
  });
  await p.goto("/about.html");
  await p.waitForTimeout(3500);
  const hidden = await p.evaluate(() =>
    Array.from(document.getElementsByClassName("rv")).filter((e) => getComputedStyle(e).opacity === "0").length,
  );
  expect(hidden).toBe(0);
});
