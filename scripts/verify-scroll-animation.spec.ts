import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 390, height: 844, name: 'mobile' },
];

function getViewportTest(vp: { width: number; height: number; name: string }) {
  test(`ContainerScroll containment - ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(800);

    // Disable smooth scrolling to ensure instant position changes
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
    });

    // Locate the outer frame (Card) with border-[#6C6C6C] and rounded-[30px]
    const outerFrame = page.locator('div.border-\\[\\#6C6C6C\\].rounded-\\[30px\\]').first();
    // Locate image inside the container-scroll section
    const image = page.locator('#container-scroll-demo img').first();
    // The inner div with overflow-hidden
    const overflowDiv = page.locator('#container-scroll-demo div.overflow-hidden').first();

    await expect(outerFrame).toBeVisible({ timeout: 10000 });
    await expect(image).toBeVisible({ timeout: 10000 });

    // Get section bounding rect
    const section = page.locator('#container-scroll-demo');
    const sectionBox = await section.boundingBox();
    expect(sectionBox).not.toBeNull();
    const sectionTop = sectionBox!.y;
    const sectionBottom = sectionBox!.y + sectionBox!.height;

    const startY = Math.max(0, Math.floor(sectionTop - 500 / 50) * 50);
    const endY = Math.ceil((sectionBottom + 500) / 50) * 50;

    // Dead zone check: verify wrapper does NOT have pt-[1000px] pb-[500px]
    const wrapper = page.locator('#container-scroll-demo > div').first();
    const wrapperClass = await wrapper.getAttribute('class');
    expect(wrapperClass).not.toContain('1000px');
    expect(wrapperClass).not.toContain('pb-\\[500px\\]');

    let allPassed = true;
    const debugDir = 'debug-screenshots';
    if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir, { recursive: true });

    for (let y = startY; y <= endY; y += 50) {
      await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
      await page.waitForTimeout(60);

      const frameBox = await outerFrame.boundingBox();
      const imageBox = await image.boundingBox();

      if (!frameBox || !imageBox) {
        console.log(`SKIP at scrollY=${y}: missing bounding box`);
        continue;
      }

      // Verify computed overflow is hidden
      const overflow = await overflowDiv.evaluate((el) => window.getComputedStyle(el).overflow);
      if (overflow !== 'hidden') {
        allPassed = false;
        console.log(`FAIL overflow at scrollY=${y}: overflow="${overflow}"`);
        await page.screenshot({ path: `${debugDir}/overflow-scrollY-${y}-${vp.name}.png` });
      }

      // Check containment with 1px tolerance for border/padding
      const tolerance = 1;
      const violations: string[] = [];
      if (imageBox.y < frameBox.y - tolerance) {
        violations.push(`top: image.top=${imageBox.y.toFixed(1)} < frame.top=${frameBox.y.toFixed(1)}`);
      }
      if (imageBox.y + imageBox.height > frameBox.y + frameBox.height + tolerance) {
        violations.push(`bottom: image.bottom=${(imageBox.y + imageBox.height).toFixed(1)} > frame.bottom=${(frameBox.y + frameBox.height).toFixed(1)}`);
      }
      if (imageBox.x < frameBox.x - tolerance) {
        violations.push(`left: image.left=${imageBox.x.toFixed(1)} < frame.left=${frameBox.x.toFixed(1)}`);
      }
      if (imageBox.x + imageBox.width > frameBox.x + frameBox.width + tolerance) {
        violations.push(`right: image.right=${(imageBox.x + imageBox.width).toFixed(1)} > frame.right=${(frameBox.x + frameBox.width).toFixed(1)}`);
      }

      if (violations.length > 0) {
        allPassed = false;
        console.log(`FAIL at scrollY=${y} viewport=${vp.name}: ${violations.join('; ')}`);
        await page.screenshot({ path: `${debugDir}/scrollY-${y}-${vp.name}.png` });
      }
    }

    // Dead zone measurement: gap from previous section bottom to ContainerScroll top,
    // and from ContainerScroll bottom to next section top (about)
    const aboutSection = page.locator('#about');
    const homeSection = page.locator('#home');
    const homeBox = await homeSection.boundingBox();
    const aboutBox = await aboutSection.boundingBox();

    if (homeBox && aboutBox && sectionBox) {
      const gapBefore = sectionBox!.y - (homeBox!.y + homeBox!.height);
      const gapAfter = aboutBox!.y - (sectionBox!.y + sectionBox!.height);
      console.log(`  Dead zone gap before ContainerScroll: ${gapBefore.toFixed(0)}px`);
      console.log(`  Dead zone gap after ContainerScroll: ${gapAfter.toFixed(0)}px`);
      if (gapBefore > 300 || gapAfter > 300) {
        allPassed = false;
        console.log(`FAIL: Dead zone gap exceeds 300px (before=${gapBefore.toFixed(0)}, after=${gapAfter.toFixed(0)})`);
      }
    }

    expect(allPassed).toBe(true);
  });
}

for (const vp of VIEWPORTS) {
  getViewportTest(vp);
}
