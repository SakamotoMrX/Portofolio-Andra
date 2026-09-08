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

      await page.goto("/", { waitUntil: "commit" });

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
      const isScrollLocked = await page.evaluate(() => {
        return (
          document.body.style.overflow === "hidden" ||
          document.documentElement.style.overflow === "hidden"
        );
      });
      expect(isScrollLocked).toBe(true);

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

  test("Session intelligence prevents replay on subsequent navigation", async ({
    page,
  }) => {
    // 1. First visit: clears storage and completes intro
    await page.addInitScript(() => {
      sessionStorage.clear();
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const loader = page.locator('[data-testid="loading-screen"]');
    await expect(loader).toBeVisible({ timeout: 5000 });
    await expect(loader).toBeHidden({ timeout: 10000 });

    // Verify session flag is stored
    const flag = await page.evaluate(() =>
      sessionStorage.getItem("andra_intro_seen")
    );
    expect(flag).toBe("true");

    // 2. Subsequent page visit in same session: loader should not show up
    await page.goto("/about", { waitUntil: "domcontentloaded" });
    const aboutLoader = page.locator('[data-testid="loading-screen"]');
    await expect(aboutLoader).toHaveCount(0);

    // 3. Return to home: loader still absent
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const homeLoader = page.locator('[data-testid="loading-screen"]');
    await expect(homeLoader).toHaveCount(0);
  });
});
