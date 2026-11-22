import { defineConfig, devices } from "@playwright/test";

/**
 * Browser tests: open every page in a real browser (computer and phone sizes),
 * scan it for accessibility problems and click through the interactive parts.
 *
 *   npx playwright install chromium   (once)
 *   npm run test:browser
 */
const PORT = 4173;
const chromiumPath = process.env.PW_CHROMIUM_PATH; // only needed on machines with a pre-installed browser

export default defineConfig({
  testDir: "tests/browser",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    ...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {}),
  },
  projects: [
    { name: "computer", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "phone", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npm run build && serve dist -c ../serve.json -l ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
