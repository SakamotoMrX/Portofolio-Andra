import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 667 },
];

test.describe("Apple Hello Loading Screen Lifecycle & Verification", () => {
  for (const vp of VIEWPORTS) {
    test(`loads, renders SVG, locks scroll, and transitions out cleanly on ${vp.name} (${vp.width}x${vp.height})`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });
      page.on("pageerror", (err) => {
        consoleErrors.push(err.message);
      });

      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Ensure fresh session before navigation
      await page.addInitScript(() => {
        try {
          sessionStorage.clear();
        } catch {}
      });

      await page.goto("/", { waitUntil: "domcontentloaded" });

      const loader = page.locator('[data-testid="loading-screen"]');
      const svg = page.locator('[data-testid="hello-svg"]');
      const path = page.locator('[data-testid="hello-path"]');

      // 1. Loading screen & SVG render check
      await expect(loader).toBeVisible({ timeout: 5000 });
      await expect(svg).toBeVisible();
      await expect(path).toBeVisible();

      // Verify SVG path attributes matching Apple Hello SVG immediately
      const pathData = await path.getAttribute("d");
      expect(pathData).toBeTruthy();
      expect(pathData).toContain("M-145.66,43.747");

      // 2. Scroll lock check while loading
      await expect
        .poll(async () => {
          return page.evaluate(() => {
            return (
              document.body.style.overflow === "hidden" ||
              document.documentElement.style.overflow === "hidden"
            );
          });
        })
        .toBe(true);

      // Capture loading state screenshot
      await page.screenshot({
        path: `screenshots/loading-${vp.name}.png`,
      });

      // Capture fade-out state screenshot during transition
      await page.waitForTimeout(1900);
      await page.screenshot({
        path: `screenshots/fade-out-${vp.name}.png`,
      });

      // 3. Wait for transition out & unmount
      await expect(loader).toBeHidden({ timeout: 10000 });

      // 4. Scroll unlocked check
      const isScrollUnlocked = await page.evaluate(() => {
        return (
          document.body.style.overflow !== "hidden" &&
          document.documentElement.style.overflow !== "hidden"
        );
      });
      expect(isScrollUnlocked).toBe(true);

      // 5. Main content interactive
      const main = page.locator("main");
      await expect(main).toBeVisible();

      // Capture content-visible state screenshot
      await page.screenshot({
        path: `screenshots/content-visible-${vp.name}.png`,
      });

      // 6. Zero console errors
      const criticalErrors = consoleErrors.filter(
        (e) =>
          !e.includes("favicon") &&
          !e.includes("Third-party") &&
          !e.includes("_vercel") &&
          !e.includes("insights") &&
          !e.includes("status of 404")
      );
      expect(criticalErrors).toHaveLength(0);
    });
  }

  test("Client navigation does not replay intro but reset/reload triggers intro", async ({
    page,
  }) => {
    // 1. Initial visit: intro appears and completes
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const loader = page.locator('[data-testid="loading-screen"]');
    await expect(loader).toBeVisible({ timeout: 5000 });
    await expect(loader).toBeHidden({ timeout: 10000 });

    // 2. Client-side navigation to /about: loader stays hidden
    const aboutLink = page.locator('nav a[href="/about"], a[href="/about"]').first();
    if (await aboutLink.count() > 0) {
      await aboutLink.click();
      await page.waitForURL("**/about");
      const aboutLoader = page.locator('[data-testid="loading-screen"]');
      await expect(aboutLoader).toHaveCount(0);
    }

    // 3. Page reload: intro cleanly plays again
    await page.reload({ waitUntil: "domcontentloaded" });
    const reloadedLoader = page.locator('[data-testid="loading-screen"]');
    await expect(reloadedLoader).toBeVisible({ timeout: 5000 });
    await expect(reloadedLoader).toBeHidden({ timeout: 10000 });
  });
});
