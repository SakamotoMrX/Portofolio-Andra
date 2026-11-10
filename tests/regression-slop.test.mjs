import fs from "node:fs";
import assert from "node:assert/strict";

const read = (p) => fs.readFileSync(p, "utf8");
const ok = (file, needle, label) => {
  assert.ok(read(file).includes(needle), `${label} missing in ${file}`);
  console.log(`PASS ${label}`);
};
const none = (file, needle, label) => {
  assert.ok(!read(file).includes(needle), `${label} found in ${file}`);
  console.log(`PASS ${label}`);
};

const page = "app/(root)/page.jsx";
const css = "app/globals.css";

// page: the composition and the live thing
ok(page, "<motion.h1", "page: one h1, the scaling wordmark");
ok(page, "Selected work", "page: work heading");
ok(page, 'role="switch"', "page: working switches");
ok(page, "ping(", "page: live reachability check");
ok(page, "<noscript>", "page: content shows without script");
none(page, "font-mono", "page: no monospace");
none(page, "padStart", "page: no index numbering");

// every listed project has its screenshot and a destination
const projects = JSON.parse(read("json/data.json")).Projects.filter((p) => p.show);
assert.ok(projects.length >= 4, "at least four projects");
for (const p of projects) {
  assert.ok(p.preview.startsWith("https://"), `${p.slug}: preview url`);
  assert.ok(fs.existsSync(`public${p.thumbnail}`), `${p.slug}: thumbnail file`);
}
console.log(`PASS data: ${projects.length} projects with preview and thumbnail`);

// layout: nothing between the visitor and the page
ok("app/layout.jsx", "ReducedMotionProvider", "layout: ReducedMotionProvider");
none("app/layout.jsx", "LoadingProvider", "layout: no blocking loader");
none("app/layout.jsx", "SmoothScrollProvider", "layout: native scrolling");

// globals: tokens and accessibility queries
ok(css, "--font-sans", "globals: system type stack");
ok(css, "prefers-reduced-motion", "globals: reduced motion");
ok(css, "prefers-reduced-transparency", "globals: reduced transparency");
ok(css, "prefers-contrast", "globals: more contrast");
none(css, "linear-gradient(135deg, #", "globals: no decorative gradients added");

console.log("\nAll regression invariants PASS");
