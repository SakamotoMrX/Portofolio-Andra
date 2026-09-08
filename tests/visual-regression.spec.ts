import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

const SCREENSHOTS_DIR = path.resolve(process.cwd(), "screenshots");

test.beforeAll(() => {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }
});

test.describe("Visual Regression & Animation Lifecycle Suite", () => {
  for (const vp of VIEWPORTS) {
    test(`captures animation lifecycle, settled homepage, and verifies scroll lock release on ${vp.name} (${vp.width}x${vp.height})`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => {
        consoleErrors.push(err.message);
      });

      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Clear session storage to trigger loader
      await page.addInitScript(() => {
        try {
          sessionStorage.clear();
        } catch {}
      });

      await page.goto("/", { waitUntil: "commit" });

      const loader = page.locator('[data-testid="loading-screen"]');
      const svg = page.locator('[data-testid="hello-svg"]');
      const helloPath = page.locator('[data-testid="hello-path"]');

      // 1. Verify loader is visible
      await expect(loader).toBeVisible({ timeout: 5000 });
      await expect(svg).toBeVisible();
      await expect(helloPath).toBeVisible();

      // Scroll locked during loading
      const isLocked = await page.evaluate(() => {
        return (
          document.body.style.overflow === "hidden" ||
          document.documentElement.style.overflow === "hidden"
        );
      });
      expect(isLocked).toBe(true);

      // Capture active SVG writing animation screenshot
      const activeAnimPath = path.join(
        SCREENSHOTS_DIR,
        `${vp.name}-active-animation.png`
      );
      await page.screenshot({ path: activeAnimPath });
      expect(fs.existsSync(activeAnimPath)).toBe(true);

      // Wait for exit transition & unmount (loader duration: 1.8s + exit transition: 0.65s ~ 2.5s)
      await expect(loader).toBeHidden({ timeout: 10000 });
      await expect(loader).toHaveCount(0);

      // 2. Verify document.body.style.overflow is "unset" or ""
      const bodyOverflow = await page.evaluate(
        () => document.body.style.overflow
      );
      expect(["unset", ""]).toContain(bodyOverflow);

      // 3. Verify homepage content is visible and settle down
      const main = page.locator("main");
      await expect(main).toBeVisible();

      // Capture settled homepage screenshot
      const settledPath = path.join(
        SCREENSHOTS_DIR,
        `${vp.name}-settled-page.png`
      );
      await page.screenshot({ path: settledPath });
      expect(fs.existsSync(settledPath)).toBe(true);

      // 4. Verify no critical errors
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

    test(`verifies /about and /projects layout & navigation on ${vp.name} (${vp.width}x${vp.height})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // Bypass loader for navigation test
      await page.addInitScript(() => {
        try {
          sessionStorage.setItem("andra_intro_seen", "true");
        } catch {}
      });

      // 1. Visit /about
      await page.goto("/about", { waitUntil: "domcontentloaded" });
      const mainAbout = page.locator("main").first();
      await expect(mainAbout).toBeVisible({ timeout: 10000 });

      const aboutPath = path.join(SCREENSHOTS_DIR, `${vp.name}-about.png`);
      await page.screenshot({ path: aboutPath });
      expect(fs.existsSync(aboutPath)).toBe(true);

      // 2. Visit /projects
      await page.goto("/projects", { waitUntil: "domcontentloaded" });
      const mainProjects = page.locator("main").first();
      await expect(mainProjects).toBeVisible({ timeout: 10000 });

      const projectsPath = path.join(
        SCREENSHOTS_DIR,
        `${vp.name}-projects.png`
      );
      await page.screenshot({ path: projectsPath });
      expect(fs.existsSync(projectsPath)).toBe(true);
    });
  }
});
