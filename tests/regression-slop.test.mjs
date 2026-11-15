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
ok(page, 'className="board"', "page: the running pipeline");
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


// media: every found picture and clip is on disk and credited
const credits = JSON.parse(read("public/media/credits.json"));
for (const c of credits) {
  assert.ok(fs.existsSync(`public/media/${c.file.split("/").pop()}`), `${c.title}: file on disk`);
  assert.ok(c.license && c.page, `${c.title}: licence and source page`);
}
for (const f of ["cape-town-port.jpg", "emma-maersk.jpg", "kebun-raya-bogor.jpg", "container-ship.webm", "container-ship.mp4", "container-ship-poster.jpg", "krl-bogor.webm", "krl-bogor.mp4", "krl-bogor-poster.jpg"])
  assert.ok(fs.existsSync(`public/media/${f}`), `media: ${f}`);
console.log(`PASS media: ${credits.length} credited files`);
ok("components/site.jsx", "credits.json", "footer: credits rendered from credits.json");
assert.ok(!fs.existsSync("public/image/place/gunung-salak.jpg"), "rejected Mount Salak photo removed");

// hero deploy and receipt proof
ok(page, "<Deploy", "hero: runnable deploy");
ok(page, "<Receipt", "proof: receipt");
ok("components/home.jsx", "BUILD_SHA", "deploy: real build commit");
none("components/home.jsx", "padStart", "home: no index numbering");

ok(page, "<WorkList", "work: title list");

ok(page, "<Interlude", "home: container interlude");
ok(page, "<Homelab", "skills: homelab diagram");
ok(page, "<Latency", "proof: latency panel");
ok("components/site.jsx", "playsInline", "video: inline on iOS");
ok("components/site.jsx", "poster=", "video: poster frame");
none(css, "object-fit: cover", "pictures shown whole");

ok("components/site.jsx", "kebun-raya-bogor", "contact: Bogor photo");
ok("components/site.jsx", "wibTime", "contact: WIB clock");
none("app/projects/archive/page.jsx", "glass", "archive: old glass styles gone");
ok("app/projects/archive/page.jsx", 'className="sheet-runs"', "archive: contact sheet");

console.log("\nAll regression invariants PASS");
