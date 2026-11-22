/** Every page: no accessibility failures, no script errors, nothing hidden, nothing sliding sideways. */
import { readdirSync } from "node:fs";
import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = readdirSync("src/pages").filter((f) => f.endsWith(".html"));

for (const page of PAGES) {
  test.describe(page, () => {
    test("has no accessibility failures", async ({ page: p }) => {
      // Check the finished colours, not blocks caught half-way through fading in.
      await p.emulateMedia({ reducedMotion: "reduce" });
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
  // Scroll to each block in turn (blocks fade in as they come into view) and check it shows.
  const count = await p.locator(".rv").count();
  const hidden: number[] = [];
  for (let i = 0; i < count; i++) {
    const block = p.locator(".rv").nth(i);
    await block.evaluate((e) => e.scrollIntoView({ block: "center", behavior: "instant" }));
    await p.waitForTimeout(250);
    const opacity = Number(await block.evaluate((e) => getComputedStyle(e).opacity));
    if (opacity < 0.5) hidden.push(i);
  }
  expect(hidden, "blocks that stayed hidden").toEqual([]);
});
