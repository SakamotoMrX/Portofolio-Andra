import fs from "node:fs";
import assert from "node:assert/strict";

const read = (p) => fs.readFileSync(p, "utf8");
const ok = (file, needle, label) => {
  assert.ok(read(file).includes(needle), `${label} missing in ${file}`);
  console.log(`PASS ${label}`);
};
const any = (file, needles, label) => {
  const c = read(file);
  assert.ok(needles.some((n) => c.includes(n)), `${label} missing in ${file}`);
  console.log(`PASS ${label}`);
};

// page.jsx — 7 invariants
ok("app/(root)/page.jsx", "DistressedLogo", "page: DistressedLogo");
ok("app/(root)/page.jsx", "ANDRA", "page: ANDRA");
ok("app/(root)/page.jsx", "glass-btn", "page: glass-btn");
ok("app/(root)/page.jsx", "useScroll", "page: useScroll");
ok("app/(root)/page.jsx", "BlurText", "page: BlurText");
ok("app/(root)/page.jsx", "View Projects", "page: View Projects");
ok("app/(root)/page.jsx", "useTransform", "page: useTransform");

// loading — 3 files share bg
ok("app/(root)/loading.jsx", "bg-[#f6f5f0]", "loading root: bg cream");
ok("app/about/loading.jsx", "bg-[#f6f5f0]", "loading about: bg cream");
ok("app/projects/loading.jsx", "bg-[#f6f5f0]", "loading projects: bg cream");

// not-found — 2
ok("app/not-found.jsx", "glass-static", "not-found: glass-static");
ok("app/not-found.jsx", "text-[#121212]", "not-found: text #121212");

// layout — 4
ok("app/layout.jsx", "SmoothScrollProvider", "layout: SmoothScrollProvider");
ok("app/layout.jsx", "BlobParallax", "layout: BlobParallax");
ok("app/layout.jsx", "ReducedMotionProvider", "layout: ReducedMotionProvider");
ok("app/layout.jsx", "Navbar", "layout: Navbar");

// Neofetch — scanline or system grid
any("components/Neofetch.jsx", ["scanline", "system grid", "System"], "Neofetch: scanline/system");

// BlobParallax — 2
ok("components/BlobParallax.jsx", "--parallax-x", "BlobParallax: --parallax-x");
any("components/BlobParallax.jsx", ["pointer: coarse", "coarse"], "BlobParallax: coarse pointer");

// SmoothScrollProvider — 2
ok("components/SmoothScrollProvider.tsx", "lerp: 0.07", "SmoothScroll: lerp 0.07");
ok("components/SmoothScrollProvider.tsx", "lenis.raf", "SmoothScroll: lenis.raf");

// globals.css — 3
ok("app/globals.css", "--accent", "globals: --accent");
ok("app/globals.css", "glass-btn", "globals: glass-btn");
ok("app/globals.css", "hero-grid", "globals: hero-grid");

console.log("\nAll regression invariants PASS (23 checks)");
