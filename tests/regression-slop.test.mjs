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
ok(page, 'className="hero field"', "page: the sheet-on-field hero");
ok(page, "Selected work", "page: work heading");
none(page, 'className="board"', "page: pipeline board removed");
ok(page, "certs/", "page: certificates shown");
ok("components/site.jsx", "ping(", "shared: live reachability check");
ok(page, 'href="/projects"', "page: the way to the work page");
ok("app/projects/page.jsx", 'className="grid deck"', "work: every site, one swipeable row on a phone");
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
ok(css, "in oklch", "globals: the field interpolates in oklch");

// homelab drawing and the motion that stayed
ok(page, "<Homelab", "skills: homelab diagram");
ok(page, "useVelocityMarquee", "motion: marquee follows scroll");
ok("components/motion.jsx", "playbackRate", "marquee: speed changes without a jump");
ok("components/site.jsx", 'className="sheet" style', "motion: closing sheet rises");

// motion round 2: every move from the reference sites
ok(page, "<SplitTitle", "hero: split headline slides in from both sides");
none(page, "<Decode", "headings: no random-glyph decode");
ok(page, "useSkew", "hero: screenshots bend with scroll speed");
ok("components/home.jsx", "pathLength", "homelab: lines draw in");
ok("components/home.jsx", "animateMotion", "homelab: data flows on live links");
ok("components/motion.jsx", "export function Magnet", "magnetic buttons and links");
ok("components/site.jsx", "useNameSpread", "footer: name gathers as it arrives");
ok("app/template.jsx", "wipe", "page transition wipe");
ok(page, "<InkFill", "about: statement fills to full ink on scroll");
ok("components/Navbar.jsx", "scrollYProgress", "nav: scroll progress line");
ok("components/motion.jsx", "useReducedMotion", "motion: reduced motion respected");

// research round: richer scroll
ok(page, "<Roll", "proof: figures roll like an odometer");
ok(page, "titleY", "hero: title lifts away as the page moves on");
ok("components/site.jsx", "nameY", "footer: name rises out of the footer");
ok(css, ".foot .links a::after", "footer links: underline draws on hover");
none("components/site.jsx", "Decode", "close: no random-glyph decode");
none("components/motion.jsx", "GLYPHS", "motion: decode removed");

// hydration: reduced motion only takes effect after mount, so server and client render the same first frame
ok("components/motion.jsx", "export function useCalm", "motion: mount-safe reduced motion");
for (const f of [page, "components/site.jsx", "components/home.jsx"]) none(f, "useReducedMotion()", `${f}: no first-render reduced-motion branch`);
none("components/motion.jsx", '"0123456789".split', "odometer digits drawn by CSS, not text");

// motion round 3: patterns from the recorded reference sites
ok(page, "<Fan", "certs: certificates dealt into a fan");
none(css, "#pipeline", "pipeline board styles removed");
ok("components/site.jsx", 'className="corners"', "corners: name split to the two bottom corners");
ok(css, ".tickets .ticket { position: sticky", "proof: tickets lock under the nav");
ok(page, "<SkillList", "skills: active item lights while its panel changes");
none(page, "<Spotlight", "stack wall removed");
ok(css, ".deck .card:hover", "work: row lights lime when pointed at");
ok(css, ".foot .name::before", "footer: name printed in layers");

console.log("\nAll regression invariants PASS");
