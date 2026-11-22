/** Clicks through the interactive parts the way a visitor would. */
import { expect, test } from "@playwright/test";

test("OPTRTE steps switch with a click and with arrow keys", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator("#jt-3").click();
  await expect(page.locator("#jp-3")).toBeVisible();
  await expect(page.locator("#jp-1")).toBeHidden();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#jt-4")).toBeFocused();
  await expect(page.locator("#jp-4")).toBeVisible();
});

test("donate page gives a reference code and fills in the amount from the link", async ({ page }) => {
  await page.goto("/donate.html?amount=25000");
  const code = page.locator(".refbox .code");
  await expect(code).toHaveText(/^BALM-[A-HJ-NP-Z2-9]{4}$/);
  await expect(page.locator("#g-ref")).toHaveValue((await code.textContent())!);
  await expect(page.locator("#g-amount")).toHaveValue("25000");
  await expect(page.locator("#g-date")).not.toHaveValue("");
});

test("gift form explains what's missing instead of sending", async ({ page }) => {
  await page.goto("/donate.html");
  await page.locator('form[name="gift-confirmation"] button[type="submit"]').click();
  await expect(page.locator("#g-name")).toBeFocused();
  await expect(page.locator(".err.show").first()).toHaveText("Please enter your name.");
});

test("contact form picks the reason from the link", async ({ page }) => {
  await page.goto("/contact.html?reason=Partnership");
  await expect(page.locator("#reason")).toHaveValue("Partnership");
});

test("questions open and close", async ({ page }) => {
  await page.goto("/donate.html");
  const first = page.locator(".acc-btn").first();
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "false");
});

test("certificates open full size and close with Escape", async ({ page }) => {
  await page.goto("/financial-transparency.html");
  await page.locator(".cert").first().click();
  await expect(page.locator(".lightbox")).toHaveClass(/open/);
  await page.keyboard.press("Escape");
  await expect(page.locator(".lightbox")).not.toHaveClass(/open/);
});

test("phone menu opens, traps nothing behind it, and closes with Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "phone only");
  await page.goto("/index.html");
  await page.locator(".nav-toggle").click();
  await expect(page.locator(".main-nav")).toHaveClass(/open/);
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(page.locator(".main-nav")).not.toHaveClass(/open/);
});

test("Get Help offers call and WhatsApp buttons", async ({ page }) => {
  await page.goto("/get-help.html");
  await expect(page.getByRole("link", { name: "Call now" })).toHaveAttribute("href", /^tel:\+234/);
  await expect(page.getByRole("link", { name: "Open WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa\.me\/234/);
});
