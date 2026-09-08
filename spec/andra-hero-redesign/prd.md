# PRD: Hero Section Redesign — "ANDRA" Persistent Device Shell

**Spec slug:** `andra-hero-redesign`
**Repo:** `/Users/telkom_760047/Github/andra-portfolio`
**Status:** ○ draft
**Date:** 2026-09-02

---

## 1. Problem

The current portfolio site has two disconnected sections:
1. A plain-text hero (`#home`) with eyebrow text, heading, and CTA buttons
2. A ContainerScroll device-frame demo (`#container-scroll-demo`) sitting below with placeholder content

Neither works as a cohesive identity. The device-frame component is powerful but treated as a one-shot demo, not the site's primary visual language.

**Problem statement:** Andra's portfolio needs a unified visual identity where the device frame IS the site — not a hero gimmick, but a persistent shell that frames all content. The tablet bezel reveals on load, docks in place, and every section scrolls inside its screen.

---

## 2. Goal

Transform the ContainerScroll device frame into a **persistent site shell**:
1. **Reveal phase:** On page load, the device animates in (existing scroll-linked scale/rotate)
2. **Docked phase:** Once fully revealed, the bezel locks in the viewport. All site content (About, Projects, System, Contact, footer) renders and scrolls INSIDE the device's screen area

The visitor lands on the page, watches the device materialize, then interacts with the entire site through the device's screen — like using a real tablet.

**Success criteria:**
- Device bezel stays fixed/sticky after reveal completes
- All sections render inside the device screen, not below the bezel
- Nav links scroll the inner container, not the outer page
- Content is reflowed for the constrained screen area (not just scaled down)
- Mobile (<768px) falls back to normal full-width scroll (no nested device)
- Zero overflow violations at any scroll position

---

## 3. Scope

### In scope
- Replace current hero + ContainerScroll demo with a single persistent device shell
- **Reveal phase:** Keep existing `useScroll` + `useTransform` animation (scale, rotateX, header translateY)
- **Docked phase:** New — once reveal progress = 1, device bezel becomes sticky/fixed, inner screen becomes an independent scroll container (`overflow-y: auto`, `overscroll-behavior: contain`)
- Render ALL site sections inside the inner scroll container: About, Projects, System, Contact, footer (ANDRA logo + GITHUB/INSTAGRAM/EMAIL links)
- Change nav bar anchor links to scroll the inner container ref instead of `window`
- Reflow content layouts (type scale, spacing, grid columns) to fit the constrained device screen — not CSS transform/zoom
- Replace placeholder title "Unleash the power of / Scroll Animations" with "ANDRA"
- Keep "Junior DevOps & Infrastructure Automation" tagline
- Keep GitHub / View Projects CTA buttons in the hero area
- Replace placeholder image with a real local asset from `/public/image/`
- Mobile fallback (<768px): normal full-width scroll, no nested device container
- Responsive verification at desktop (1440x900) and mobile (390x844)

### Out of scope
- Do NOT change the visual design of the nav bar itself (just its scroll behavior)
- Do NOT add new sections or restructure content beyond the device-shell adaptation
- Do NOT rewrite ContainerScroll animation logic from scratch — re-skin, not rebuild

---

## 4. Current State (verified by explorer)

### File: `app/(root)/page.jsx` (417 lines, "use client", `.jsx`)
- **Hero section** (lines 168-233): `<section id="home">` with `min-h-screen`, DistressedLogo, two BlurText lines, GitHub/View Projects buttons
- **ContainerScroll demo** (lines 235-237): `<section id="container-scroll-demo">` renders `<HeroScrollDemo />`
- **About** (lines 239-293): `SectionLabel "01 — About"`, hero.jpg portrait, focusAreas
- **Projects** (lines 295-364): `SectionLabel "02 — Projects"`, maps data.Projects
- **System** (lines 366-368): Neofetch terminal
- **Contact** (lines 370-414): `SectionLabel "04 — Contact"`, email, footer with GitHub/Instagram links
- Sections are in a flat list — no nesting, no shared scroll container

### File: `components/ui/container-scroll-animation.tsx` (102 lines)
- Props: `titleComponent` (ReactNode), `children` (ReactNode)
- Outer: `h-[60rem] md:h-[80rem]`, `p-2 md:p-20`
- Inner: `py-10 md:py-40`, `perspective: "1000px"`
- Card: `h-[30rem] md:h-[40rem]`, `border-4 border-[#6C6C6C]`, `bg-[#222222]`, `rounded-[30px]`
- Screen: `overflow-hidden rounded-2xl`, `bg-gray-100 dark:bg-zinc-900`
- Animation: `rotateX: 20→0`, `scale: 1.05→1` (desktop) / `0.7→0.9` (mobile)

### File: `components/ui/container-scroll-demo.tsx` (33 lines)
- `HeroScrollDemo`: ContainerScroll with placeholder title + `<Image src="/image/projects-showcase_home.png">`

### Image candidates in `/public/image/`
- `projects-showcase_home.png` (2000x785) — currently used in demo
- `linux-server-lab.jpg` (1920x1200)
- `projects-showcase.jpg` (1920x1179)
- `hero.jpg` (1024x702) — About section portrait
- Per-project screenshots under `public/image/projects/`

### Nav links (page.jsx)
- ABOUT → `#about`, PROJECTS → `#projects`, SYSTEM → `#system`, CONTACT → `#contact`
- GitHub icon → `https://github.com/SakamotoMrX` (external)

### Buttons (lines 202-220)
- GitHub: `href="https://github.com/SakamotoMrX"`, `target="_blank"`, `variant="primary"`
- View Projects: `href="#projects"`, `variant="outline"`

---

## 5. Architecture: Two-Phase Scroll

### Phase 1 — Reveal (existing behavior, keep as-is)
- Outer page scroll drives the tablet's scale/rotate animation
- `useScroll({ target: outerContainerRef })` + `useTransform` maps scroll progress to:
  - `rotateX: 20→0`
  - `scale: 1.05→1` (desktop) / `0.7→0.9` (mobile)
  - `translateY: 0→-100` on header
- Container height: `h-[150vh]` to `h-[200vh]` (enough scroll distance for smooth animation)
- No dead padding — remove the Aceternity demo's `pt-[1000px] pb-[500px]`

### Phase 2 — Docked (new)
- Once `scrollYProgress` reaches 1 (or a threshold like 0.95):
  - Device bezel: `position: sticky; top: 0` (or `fixed` with appropriate inset)
  - Inner screen div: `overflow-y: auto; overscroll-behavior: contain`
  - Height constrained to bezel proportions (e.g., `height: calc(100vh - bezel_margins)`)
- ALL site sections render as children inside this inner scroll container
- The hero image (used during reveal) is replaced by site content once docked

### Nav bar scroll behavior
- Current: `<a href="#projects">` scrolls `window`
- New: `onClick` handler calls `innerRef.current.scrollTo({ top: sectionOffsetTop, behavior: 'smooth' })`
- Each section's offset is computed relative to the inner container's scroll context
- External links (GitHub) remain unchanged

### Content reflow for constrained screen
- **Projects grid:** Fewer columns (e.g., 2-col instead of 3-col on desktop), tighter gaps
- **Type scale:** Reduce heading sizes proportionally to fit ~60-70% of viewport width
- **Spacing:** Compress vertical margins/padding to fit more content in less height
- **System terminal:** May need to reduce font size or height
- **Contact/footer:** Stack vertically, reduce padding
- Use Tailwind responsive utilities — NOT CSS `transform: scale()` or `zoom`

### Reveal phase screen content
During the reveal animation (bezel scaling from small+tilted to full size), the device screen shows the hero content — ANDRA headline, tagline, and CTA buttons. This content is part of the same inner scroll container that later holds all site sections. There is no separate "image" — the tab IS the web from the first frame.

The hero content (ANDRA heading, "Junior DevOps & Infrastructure Automation" tagline, GitHub/View Projects buttons) sits at the top of the inner scroll container and remains visible when the user scrolls back to the top after exploring other sections.

### Mobile behavior (<768px)
- Persistent device shell applies on ALL viewports, including mobile
- No fallback to normal full-width scroll — the device frame is always the site shell
- Device frame scales appropriately for small screens (existing mobile scale range `0.7→0.9` may need tuning)
- Inner scroll container height adjusts to fit the smaller bezel
- Content inside reflows for narrow width (single-column layouts, smaller type)
- The device-mockup-within-phone-screen aesthetic is intentional and accepted

---

## 6. Implementation Plan

| Step | Files | Change |
|---|---|---|
| 1 | `app/(root)/page.jsx` | Restructure: wrap all sections in the ContainerScroll's children, remove separate hero + demo sections |
| 2 | `components/ui/container-scroll-animation.tsx` | Add docked-phase logic: sticky positioning, inner scroll container ref, `overscroll-behavior: contain` |
| 3 | `components/ui/container-scroll-demo.tsx` | Delete or repurpose — content moves into page.jsx |
| 4 | `app/(root)/page.jsx` | Reflow Projects/System/Contact layouts for constrained width |
| 5 | `app/(root)/page.jsx` or nav component | Change nav links to scroll inner container |
| 6 | Verify | Playwright: reveal containment, docked stability, nav scroll, overflow checks, mobile fallback |

---

## 7. Acceptance Criteria

| # | Criterion | Verification |
|---|---|---|
| AC1 | Reveal phase: at every ~50px scroll increment during 0→1 progress, all content stays fully contained within the bezel — zero overflow | Playwright getBoundingClientRect checks |
| AC2 | Docked phase: after progress reaches 1, bezel's bounding box stays fixed while further scroll events change `innerRef.scrollTop` — assert bezel rect is identical before and after 500px scroll | Playwright |
| AC3 | Clicking PROJECTS, SYSTEM, CONTACT nav links scrolls the INNER container to bring that section into view — assert target section's rect relative to inner container, not window | Playwright |
| AC4 | No layout overflow at 1440x900 (desktop) — all elements inside docked screen stay within bezel bounds | Playwright |
| AC5 | No layout overflow at 390x844 (mobile) — fallback renders full-width normal scroll, not broken nesting | Playwright |
| AC6 | No duplicate/nested native scrollbars visible unintentionally — only the inner container's scrollbar (styled if custom) | Visual check |
| AC7 | "ANDRA" headline visible in first viewport on load (desktop + mobile) | Playwright screenshot |
| AC8 | GitHub and View Projects buttons present and functional in hero area | Playwright element check |
| AC9 | All sections below hero (About, Projects, System, Contact, footer) render and are accessible | Playwright scroll + visibility check |
| AC10 | No console errors, no broken image requests | Playwright console + network |

---

## 8. Deliverables

1. Diff of all changed files
2. Screenshot of: (a) reveal phase mid-animation, (b) docked phase with About visible, (c) docked phase scrolled to Projects, (d) mobile fallback
3. Playwright test output for AC1-AC6
4. Confirmation of image asset used
5. Confirmation of mobile fallback behavior (user must approve)

---

## 9. Risks & Open Questions

| # | Question / Risk | Impact | Status |
|---|---|---|---|
| Q1 | Which image asset for the reveal phase device screen? | Must confirm before implementation | ○ Open |
| Q2 | Mobile (<768px): persistent device shell on ALL viewports confirmed — no fallback | Device frame scales for small screens; content reflows to single-column | ✓ Confirmed |
| Q3 | Inner scrollbar styling — native or custom (thin, rounded, dark to match device aesthetic)? | Minor polish decision | ○ Open |
| Q4 | Keyboard scroll (Space/Page Down) behavior with nested scroll contexts — documented as accepted trade-off | User experience difference | ✓ Accepted |
| Q5 | Sticky vs. fixed for docked bezel — sticky is simpler but depends on parent overflow; fixed is more reliable but needs z-index management | Implementation complexity | ○ Open — test both |
| Q6 | Inner container height calculation — must account for bezel padding/border, nav bar height, and safe areas on mobile | Layout precision | ○ Risk — tune carefully |

---

## 10. Next Steps

1. User confirms: mobile fallback (skip nested device on <768px) — yes/no/modify
2. User confirms: image asset choice
3. Create branch `feature/andra-hero-device`
4. Implement two-phase scroll in ContainerScroll component
5. Restructure page.jsx to nest sections inside device screen
6. Reflow content layouts for constrained width
7. Update nav scroll behavior
8. Playwright verification on desktop + mobile
9. Present deliverables

---

**Status:** ○ draft
**Next:** `/spec-requirements` to distill testable requirements from this PRD
