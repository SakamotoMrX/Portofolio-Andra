# Testable Requirements — ANDRA Hero Redesign

**Derived from:** `prd.md`
**Spec slug:** `andra-hero-redesign`

---

## Structure

**R-01 — Device bezel wraps all site content**
- **Traceability:** PRD §2 Goal, §3 Scope ("Replace current hero + ContainerScroll demo with a single persistent device shell")
- **Verification:** Playwright
- **Pass:** `getBoundingClientRect()` of the device bezel element contains the bounding rects of all section elements (About, Projects, System, Contact, footer) at docked phase.
- **Fail:** Any section element extends beyond the bezel's bounding box.

**R-02 — All site sections render inside the inner scroll container**
- **Traceability:** PRD §3 Scope ("Render ALL site sections inside the inner scroll container: About, Projects, System, Contact, footer (ANDRA logo + GITHUB/INSTAGRAM links)")
- **Verification:** Playwright DOM query
- **Pass:** Every section element (`#about`, `#projects`, `#system`, `#contact`, footer) is a direct or nested child of the inner screen container ref.
- **Fail:** Any section exists as a sibling of the inner screen container outside the device shell.

**R-03 — Separate hero section and ContainerScroll demo section are removed**
- **Traceability:** PRD §3 Scope ("Replace current hero + ContainerScroll demo with a single persistent device shell"), §4 Current State
- **Verification:** Playwright DOM query
- **Pass:** No `#home` section and no `#container-scroll-demo` section exist as separate top-level sections in the DOM.
- **Fail:** Either `#home` or `#container-scroll-demo` is found as a standalone section element.

---

## Animation

**R-04 — Reveal phase animates device with scale and rotateX on scroll**
- **Traceability:** PRD §2 Goal ("Device animates in (existing scroll-linked scale/rotate)"), §5 Architecture Phase 1, §3 Scope ("Keep existing `useScroll` + `useTransform` animation (scale, rotateX, header translateY))")
- **Verification:** Playwright
- **Pass:** During 0→1 scroll progress, the device card element has `rotateX` transitioning from 20→0 and `scale` transitioning from 1.05→1 (desktop) as measured via `getComputedStyle()`.
- **Fail:** `rotateX` or `scale` values remain static during scroll progress, or do not match the specified ranges.

**R-05 — Header translates upward during reveal phase**
- **Traceability:** PRD §5 Architecture Phase 1 ("translateY: 0→-100 on header")
- **Verification:** Playwright
- **Pass:** Header element's `transform: translateY()` transitions from `0` to `-100px` as scroll progress goes from 0 to 1.
- **Fail:** Header translateY does not change or does not reach `-100px`.

**R-06 — No dead padding from Aceternity demo remains**
- **Traceability:** PRD §5 Architecture Phase 1 ("No dead padding — remove the Aceternity demo's `pt-[1000px] pb-[500px]`")
- **Verification:** Playwright / CSS inspection
- **Pass:** The outer container does not have `padding-top: 1000px` or `padding-bottom: 500px` (or equivalent Tailwind `pt-[1000px]` / `pb-[500px]`).
- **Fail:** Either `pt-[1000px]` or `pb-[500px]` is present on the outer container element.

**R-07 — Container height provides sufficient scroll distance for smooth animation**
- **Traceability:** PRD §5 Architecture Phase 1 ("Container height: `h-[150vh]` to `h-[200vh]`")
- **Verification:** Playwright
- **Pass:** The outer scroll container's height is between `150vh` and `200vh` (inclusive).
- **Fail:** Container height is outside the `150vh`–`200vh` range.

---

## Scroll Behavior

**R-08 — Device bezel becomes sticky/fixed once reveal progress reaches 1**
- **Traceability:** PRD §2 Goal ("Device bezel stays fixed/sticky after reveal completes"), §5 Architecture Phase 2 ("Device bezel: `position: sticky; top: 0`")
- **Verification:** Playwright
- **Pass:** After scroll progress ≥ 0.95, the bezel element has `position: sticky` (or `position: fixed`) with `top: 0`, and its bounding rect remains unchanged after an additional 500px of scroll.
- **Fail:** Bezel rect changes by more than 1px after 500px additional scroll, or position is not sticky/fixed.

**R-09 — Inner screen becomes an independent scroll container**
- **Traceability:** PRD §2 Goal ("All site content renders and scrolls INSIDE the device's screen area"), §3 Scope ("inner screen becomes an independent scroll container (`overflow-y: auto`, `overscroll-behavior: contain`)")
- **Verification:** Playwright CSS inspection
- **Pass:** The inner screen element has `overflow-y: auto` and `overscroll-behavior: contain` computed styles.
- **Fail:** Either `overflow-y` is not `auto` or `overscroll-behavior` is not `contain`.

**R-10 — Inner scroll container height is constrained to bezel proportions**
- **Traceability:** PRD §5 Architecture Phase 2 ("Height constrained to bezel proportions (e.g., `height: calc(100vh - bezel_margins)`)")
- **Verification:** Playwright
- **Pass:** Inner screen element's height equals `calc(100vh - bezel_margins)` within ±2px tolerance, accounting for bezel padding/border and nav bar height.
- **Fail:** Inner screen height exceeds or is less than the expected constrained height by more than 2px.

**R-11 — Further scroll after docking changes innerRef.scrollTop, not window scroll**
- **Traceability:** PRD §7 AC2 ("after progress reaches 1, bezel's bounding box stays fixed while further scroll events change `innerRef.scrollTop`"), §5 Architecture Phase 2
- **Verification:** Playwright
- **Pass:** After docking, scrolling 500px via the page results in `innerRef.scrollTop` changing by ~500px while `window.scrollY` remains constant and bezel rect is identical.
- **Fail:** `window.scrollY` changes by more than 10px, or `innerRef.scrollTop` does not change, or bezel rect changes.

**R-12 — Zero overflow violations at any scroll position (desktop)**
- **Traceability:** PRD §2 Goal ("Zero overflow violations at any scroll position"), §7 AC1 ("at every ~50px scroll increment during 0→1 progress, all content stays fully contained within the bezel")
- **Verification:** Playwright
- **Pass:** At every 50px scroll increment from 0 to max scroll, no content element's bounding rect exceeds the bezel's bounding rect.
- **Fail:** At any scroll increment, a content element extends beyond the bezel bounds.

**R-13 — No duplicate or nested native scrollbars visible unintentionally**
- **Traceability:** PRD §7 AC6 ("No duplicate/nested native scrollbars visible unintentionally — only the inner container's scrollbar")
- **Verification:** Visual check
- **Pass:** Only one visible scrollbar exists on the page, and it belongs to the inner container. No scrollbar on the outer page/window.
- **Fail:** Two or more scrollbars are visible, or a scrollbar appears on the outer page element.

---

## Navigation

**R-14 — Nav links scroll the inner container, not the outer window**
- **Traceability:** PRD §3 Scope ("Change nav bar anchor links to scroll the inner container ref instead of `window`"), §5 Architecture Nav bar scroll behavior, §7 AC3
- **Verification:** Playwright
- **Pass:** Clicking a nav link (PROJECTS, SYSTEM, CONTACT) causes `innerRef.current.scrollTo()` to be called, and the target section becomes visible within the inner container while `window.scrollY` remains unchanged.
- **Fail:** `window.scrollY` changes, or the target section is not visible within the inner container after the click.

**R-15 — Nav link scroll offset targets the correct section**
- **Traceability:** PRD §5 Architecture Nav bar scroll behavior ("Each section's offset is computed relative to the inner container's scroll context")
- **Verification:** Playwright
- **Pass:** Clicking PROJECTS scrolls the inner container to bring `#projects` into view; clicking SYSTEM brings `#system` into view; clicking CONTACT brings `#contact` into view. Each target section's rect relative to the inner container shows it is in the viewport.
- **Fail:** Any clicked nav link does not bring the corresponding section into view within the inner container.

**R-16 — External nav links (GitHub) open in new tab unchanged**
- **Traceability:** PRD §3 Scope ("External links (GitHub) remain unchanged"), §4 Current State ("GitHub icon → `https://github.com/SakamotoMrX`")
- **Verification:** Playwright
- **Pass:** The GitHub nav link has `href="https://github.com/SakamotoMrX"` and `target="_blank"`. Clicking it opens the external URL in a new tab.
- **Fail:** The GitHub link `href` or `target` attribute differs, or it triggers inner container scroll instead of navigating externally.

**R-17 — Nav bar visual design is unchanged**
- **Traceability:** PRD §3 Scope ("Do NOT change the visual design of the nav bar itself (just its scroll behavior)")
- **Verification:** Visual check (Playwright screenshot comparison)
- **Pass:** Nav bar styling (colors, fonts, spacing, layout) matches the pre-redesign screenshot within a 1px tolerance.
- **Fail:** Any visual difference in the nav bar's styling is detected.

---

## Content

**R-18 — "ANDRA" headline is visible in the first viewport on load**
- **Traceability:** PRD §3 Scope ("Replace placeholder title 'Unleash the power of / Scroll Animations' with 'ANDRA'"), §7 AC7, §8 Deliverables
- **Verification:** Playwright
- **Pass:** Text content "ANDRA" is present and visible in the viewport on initial page load at both desktop (1440x900) and mobile (390x844) viewport sizes.
- **Fail:** "ANDRA" text is missing, not visible, or the placeholder text "Unleash the power of / Scroll Animations" still appears.

**R-19 — Tagline "Junior DevOps & Infrastructure Automation" is preserved**
- **Traceability:** PRD §3 Scope ("Keep 'Junior DevOps & Infrastructure Automation' tagline")
- **Verification:** Playwright
- **Pass:** Text content "Junior DevOps & Infrastructure Automation" is present and visible in the hero/device screen area.
- **Fail:** Tagline text is missing or not visible.

**R-20 — GitHub and View Projects CTA buttons are present and functional in hero area**
- **Traceability:** PRD §3 Scope ("Keep GitHub / View Projects CTA buttons in the hero area"), §7 AC8
- **Verification:** Playwright
- **Pass:** Both buttons exist with correct `href` attributes — GitHub links to `https://github.com/SakamotoMrX` with `target="_blank"`, View Projects links to `#projects`. Both are clickable/navigable.
- **Fail:** Either button is missing, has wrong `href`, or is not clickable.

**R-21 — Placeholder image is replaced with a real local asset from `/public/image/`**
- **Traceability:** PRD §3 Scope ("Replace placeholder image with a real local asset from `/public/image/`"), §4 Current State image candidates, §8 Deliverables
- **Verification:** Playwright network + visual
- **Pass:** The device screen image loads from `/public/image/` (e.g., `projects-showcase_home.png`, `linux-server-lab.jpg`, or `projects-showcase.jpg`). Network requests show no 404 for the image. Image renders without broken-image icon.
- **Fail:** Image returns 404, shows broken-image icon, or still uses a placeholder path.

**R-22 — Projects grid reflows to fewer columns for constrained screen**
- **Traceability:** PRD §5 Architecture Content reflow ("Projects grid: Fewer columns (e.g., 2-col instead of 3-col on desktop), tighter gaps")
- **Verification:** Playwright CSS inspection
- **Pass:** The Projects grid displays 2 columns (not 3) within the docked device screen on desktop, with tighter gap spacing than the pre-redesign layout.
- **Fail:** Projects grid shows 3 columns or more, or gap spacing is not reduced.

**R-23 — Type scale is reduced proportionally to fit constrained width**
- **Traceability:** PRD §5 Architecture Content reflow ("Type scale: Reduce heading sizes proportionally to fit ~60-70% of viewport width"), §3 Scope ("Content is reflowed for the constrained screen area (not just scaled down)")
- **Verification:** Playwright CSS inspection
- **Pass:** Heading font sizes within the device screen are reduced compared to the pre-redesign values, and content width fits within ~60-70% of viewport width. No `transform: scale()` or `zoom` CSS is applied for reflow.
- **Fail:** Headings overflow the viewport width, or `transform: scale()` / `zoom` is used for reflow.

**R-24 — Vertical spacing is compressed to fit more content in less height**
- **Traceability:** PRD §5 Architecture Content reflow ("Spacing: Compress vertical margins/padding to fit more content in less height")
- **Verification:** Playwright CSS inspection
- **Pass:** Vertical margins and padding on sections within the device screen are reduced compared to pre-redesign values, allowing all sections to fit within the constrained height.
- **Fail:** Section spacing exceeds pre-redesign values, or content overflows vertically beyond the inner container.

**R-25 — Footer (ANDRA logo + GITHUB/INSTAGRAM/EMAIL links) renders inside device screen**
- **Traceability:** PRD §3 Scope ("Render ALL site sections inside the inner scroll container: About, Projects, System, Contact, footer (ANDRA logo + GITHUB/INSTAGRAM/EMAIL links)")
- **Verification:** Playwright DOM query
- **Pass:** Footer element is a child of the inner scroll container and contains ANDRA logo, GITHUB, INSTAGRAM, and EMAIL links.
- **Fail:** Footer is outside the inner container, or any of the required links (ANDRA logo, GITHUB, INSTAGRAM, EMAIL) is missing.

---

## Responsive

**R-26 — Desktop (1440x900): no layout overflow, all elements inside bezel bounds**
- **Traceability:** PRD §2 Goal ("No overflow violations at any scroll position"), §7 AC4, §3 Scope ("Responsive verification at desktop (1440x900)")
- **Verification:** Playwright
- **Pass:** At 1440x900 viewport, all elements inside the docked screen stay within bezel bounds at every scroll position. No `overflow` violations detected.
- **Fail:** Any element extends beyond bezel bounds at 1440x900.

**R-27 — Mobile (<768px): falls back to normal full-width scroll, no nested device**
- **Traceability:** PRD §2 Goal ("Mobile (<768px) falls back to normal full-width scroll (no nested device)"), §3 Scope ("Mobile fallback (<768px): normal full-width scroll, no nested device container"), §5 Architecture Mobile fallback
- **Verification:** Playwright
- **Pass:** At 390x844 viewport, the device bezel/sticky treatment is absent. Sections render as full-width normal scroll without nested container. `window.scrollY` changes on scroll (not inner container).
- **Fail:** Nested device container appears at <768px, or `window.scrollY` does not change on scroll.

**R-28 — Mobile fallback: hero device reveal animation still displays normally**
- **Traceability:** PRD §5 Architecture Mobile fallback ("Show hero device reveal animation as normal")
- **Verification:** Playwright
- **Pass:** At <768px viewport, the hero device reveal animation (scale/rotate) still plays on scroll, but after reveal the page transitions to standard full-width scroll.
- **Fail:** Reveal animation does not play at mobile viewport, or the page remains stuck in device treatment after reveal.

---

## Quality

**R-29 — No console errors on page load or during interaction**
- **Traceability:** PRD §7 AC10 ("No console errors, no broken image requests")
- **Verification:** Playwright console monitoring
- **Pass:** No console errors, warnings, or failed resource requests during page load, scroll, and navigation interactions.
- **Fail:** Any `console.error` is emitted, or any resource request returns a 404/500 status.

**R-30 — All sections are accessible and reachable via scroll**
- **Traceability:** PRD §7 AC9 ("All sections below hero (About, Projects, System, Contact, footer) render and are accessible"), §7 AC9
- **Verification:** Playwright scroll + visibility check
- **Pass:** All sections (About, Projects, System, Contact, footer) are visible within the viewport after appropriate scroll action on both desktop and mobile.
- **Fail:** Any section cannot be brought into view or remains hidden after scrolling.

**R-31 — Keyboard scroll (Space/Page Down) works within nested scroll context**
- **Traceability:** PRD §9 Risks Q4 ("Keyboard scroll (Space/Page Down) behavior with nested scroll contexts — documented as accepted trade-off")
- **Verification:** Manual / Playwright keyboard interaction
- **Pass:** Pressing Space or Page Down while focused on the inner container scrolls the inner container content. Behavior is consistent and documented as expected.
- **Fail:** Keyboard scroll does not work within the inner container, or causes unexpected page-level scroll.

**R-32 — Sticky vs. fixed bezel behavior is tested and functional**
- **Traceability:** PRD §9 Risks Q5 ("Sticky vs. fixed for docked bezel — sticky is simpler but depends on parent overflow; fixed is more reliable but needs z-index management")
- **Verification:** Playwright
- **Pass:** The bezel remains visible and fixed/sticky at the top of the viewport during the docked phase. Content scrolls behind/within it without obstruction. Z-index layering is correct (no content overlapping the bezel incorrectly).
- **Fail:** Bezel scrolls away, is obscured by content, or content overlaps it incorrectly.

**R-33 — Inner container height accounts for bezel padding/border and nav bar height**
- **Traceability:** PRD §9 Risks Q6 ("Inner container height calculation — must account for bezel padding/border, nav bar height, and safe areas on mobile")
- **Verification:** Playwright
- **Pass:** Inner container height is correctly calculated accounting for bezel padding, border width, and nav bar height, with no content cut off at the bottom edge.
- **Fail:** Content is cut off at the bottom of the inner container, or the inner container height does not account for bezel dimensions.

**R-34 — Reveal phase mid-animation screenshot is consistent**
- **Traceability:** PRD §8 Deliverables ("Screenshot of: (a) reveal phase mid-animation")
- **Verification:** Visual (Playwright screenshot)
- **Pass:** At ~50% scroll progress, the device is mid-reveal animation with visible partial transformation, and all content remains within the bezel.
- **Fail:** Content overflows the bezel at mid-animation, or the device appears fully revealed/not revealed at all.

**R-35 — Docked phase with About visible is consistent**
- **Traceability:** PRD §8 Deliverables ("Screenshot of: (b) docked phase with About visible")
- **Verification:** Visual (Playwright screenshot)
- **Pass:** After reveal completes, the bezel is docked and the About section is fully visible within the inner screen. No visual artifacts or clipping.
- **Fail:** About section is clipped, not fully visible, or bezel is not docked.

**R-36 — Docked phase scrolled to Projects is consistent**
- **Traceability:** PRD §8 Deliverables ("Screenshot of: (c) docked phase scrolled to Projects")
- **Verification:** Visual (Playwright screenshot)
- **Pass:** After scrolling the inner container to Projects, the Projects section is fully visible within the inner screen. The bezel remains docked and unchanged.
- **Fail:** Projects section is not visible, or the bezel has moved from its docked position.

---

*Generated from `prd.md` — all requirements are atomic and testable.*
