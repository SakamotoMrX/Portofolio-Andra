# PRD — Andra Hero Perf: Professional, Smooth, Grafis Memukau Tanpa Lag

**Topic / Spec slug:** `andra-hero-perf`
**Original topic (verbatim):** `saya ingin website saya professional, smooth, dan grafis yang memukau dengan react. Dan tetap tidak lag. Saya ingin yang di gambar .tsx, lebih di maksimalkan performanya karena masih terlalu lag.`
**Branch:** `perf/andra-hero-smooth` (from `main@5019b97`)
**Base dir:** `/Users/telkom_760047/Github/andra-portfolio`
**Date:** 2026-08-29
**Status:** Fase 0 — Spec / PRD (no code, no push)
**Author:** @designer (Fase 0 autonomous)

---

## 1 — Overview

### 1.1 Problem
Visitor & recruiter membuka hero portfolio Andra dalam 60 detik pertama scroll. Saat ini `components/DistressedLogo.tsx` merender `ANDRA` 180vw dengan `feTurbulence` + SMIL `<animate baseFrequency>` durasi 15s (`0.018 0.009 → 0.038 0.029` loop) + `feDisplacementMap scale=26` + filter region `110% x 120%`. Node yang sama dianimasikan via Framer Motion `y/scale/opacity` dari `useScroll` (parallax) pada `app/(root)/page.jsx`. Workaround sekarang: `IntersectionObserver` + `pauseAnimations()` — tetap rasterisasi ulang filter per-frame di CPU, bukan GPU, menyebabkan jank di desktop mid-range dan Android (dropped frames > 30%, INP spike, scroll tidak 60fps). Biaya: wow factor wavy-distressed hilang jika dimatikan, bounce jika dipertahankan.

### 1.2 Solution
Optimasi `DistressedLogo.tsx` tanpa ganti visual identity: bekukan `feTurbulence` (hapus SMIL `baseFrequency` animation), turunkan `scale` secara adaptive, perkecil filter region ke tight crop, isolasi animasi parallax ke wrapper GPU-only (`transform` + `opacity` saja, `will-change`, `contain: paint`), pisahkan Lenis scroll & Framer Motion parallax agar tidak layout-thrashing. Hasil: tetap wavy distressed ANDRA yang stunning, tapi diraster sekali (atau minimal repaint), full 60fps scroll.

### 1.3 Core Loop
`Load hero → lihat ANDRA wavy besar → scroll 0–100vh → parallax y/scale/opacity smooth → lanjut ke About/Projects tanpa jank`.

### 1.4 Differentiation
Portfolio lain pakai gradient bento slop. Andra: satu hero typographic statement (ANDRA 180vw distressed) yang tidak ada duanya, tapi di-optimize ke GPU compositing — bukan filter animasi per-frame.

### 1.5 Aha Moment
< 1s setelah load: ANDRA terlihat distressed tajam, scroll pertama terasa mentega (60fps, tidak ada stutter), recruiter bertahan > 30s.

---

## 2 — Goals & Success Metrics

| Goal | Metric | Target |
|------|--------|--------|
| Hero scroll 60fps | Chrome DevTools FPS, Framer Motion frame drops | 60fps sustained, 0 long tasks >50ms di hero |
| Scroll handler cepat | p95 scroll handler (useScroll + transform) | < 16 ms (1 frame budget) |
| Lighthouse perf | Lighthouse Performance (desktop + Moto G4) | > 95, Best Practices 100 |
| CLS | CLS hero | 0 (filter tidak geser layout) |
| Visual parity | Pixel diff vs before (static frame) | < 5% — masih terlihat wavy |
| Reduced-motion | `prefers-reduced-motion` | Semua parallax & turbulence off, 0 animation |

---

## 3 — Scope

### In (Fase 1 code)
- `components/DistressedLogo.tsx` optimization: hapus `<animate baseFrequency>`, `baseFrequency` jadi static `0.022 0.012` (tuned), `numOctaves 2→1` atau `stitchTiles`, `scale 26 → 16–18` (prop default baru), `filter x/y/width/height` tight (`0 -5% 100% 115%` + `filterUnits=objectBoundingBox`), `color-interpolation-filters: sRGB`, isolate dengan `contain: paint` dan `will-change: filter` hanya saat needed.
- Hero parallax wrapper separation di `app/(root)/page.jsx`: bungkus `<DistressedLogo>` dengan `<div>` khusus untuk `motion.div` y/scale/opacity (jangan di `<svg>` yang punya filter). Tambah `will-change: transform, opacity`, `transform: translateZ(0)` / `contain: paint`.
- `useReducedMotion` gating yang konsisten (sudah ada `shouldReduce`, perlu propagate ke DistressedLogo `animate=false` saat reduce).
- `BlobParallax.jsx` audit: pastikan tidak reflow (sudah RAF + CSS vars, keep).
- `SmoothScrollProvider.tsx` tune: verifikasi `lerp 0.07 / duration 1.5` tidak konflik dengan Framer Motion spring.

### Out / Non-Goals
- Library baru (three.js, pixi, shader libs) — dilarang.
- Perubahan copy/layout hero (text blur, magnetic links tetap).
- Backend, CMS, API, DB.
- Redesign total / rebrand.
- Optimasi route lain (about/projects) kecuali side-effect.

### Constraints
- Stack: Next 15.2.8, React 19, Framer Motion 12.5, Lenis 1.3.26, Tailwind 4, no new deps.
- Harus keep visual distressed wavy (bukan hilangkan filter).
- Mobile 375px & Android mid-range harus lolos 60fps.
- No push tanpa izin user.

---

## 4 — Constraints & Assumptions

- Asumsi: lag utama bukan JS bundle melainkan raster filter + 180vw + SMIL per-frame. Validated via DevTools: `feTurbulence` animated adalah expensive paint.
- Constraint GPU: hanya `transform` & `opacity` boleh di-animate di scroll; `filter` tidak boleh di-animate per-frame.
- Constraint a11y: `prefers-reduced-motion: reduce` harus mematikan semua motion (Framer Motion `MotionConfig reducedMotion="user"` sudah ada di `ReducedMotionProvider`).
- Constraint Tailwind: preserve kelas `w-[min(180vw,2160px)]` tapi tambahkan `contain-paint` & `overflow-x-clip` sudah ada — jangan stretch lebih.
- No breaking change props: `DistressedLogo` props tetap backward compatible (`scale? seed? animate? duration?`).

---

## 5 — Users & JTBD

**Persona primer:** Recruiter / hiring manager / tech lead buka `andra-portfolio` 45–90 detik, nilai profesionalisme dari hero pertama.
**Persona sekunder:** Peer devops yang cek kredibilitas stack (Linux/Docker).
**JTBD:** "When I open Andra's portfolio, I want to be impressed in 5s by a bold, professional hero that feels premium and smooth, so I stay to read projects instead of bouncing due to jank."

- Job 1: See who Andra is in one glance (ANDRA + tagline).
- Job 2: Scroll without stutter (trust signal).
- Job 3: Navigate to Projects/Contact tanpa layout shift.

---

## 6 — Tech Stack

- **Framework:** Next.js 15.2.8 (App Router, Turbopack dev)
- **UI:** React 19, TailwindCSS 4, Framer Motion 12.5 (useScroll/useTransform/useSpring — GPU only)
- **Smooth scroll:** Lenis 1.3.26 (single RAF in `SmoothScrollProvider.tsx`)
- **Icons:** FontAwesome 6.7.2
- **Build:** sharp, next-sitemap, cross-env
- **No new runtime deps.** Dev-only: `next/bundle-analyzer` available.
- Target browsers: Chrome/Edge/Safari evergreen, iOS Safari 16+, Android Chrome mid-range.

---

## 7 — Component Inventory & Architecture

| Component | File | Role | Perf touch |
|-----------|------|------|------------|
| **DistressedLogo** | `components/DistressedLogo.tsx` | SVG text ANDRA + feTurbulence/displacement | **Hot path** — freeze turbulence, shrink filter, isolate |
| **HeroSection** | `app/(root)/page.jsx` (default `Page`) | `heroRef` + `useScroll` + `yLogo/scaleLogo/opacityLogo` | **Hot path** — isolate motion wrapper, remove motion from filtered node |
| **BlobParallax** | `components/BlobParallax.jsx` | mousemove → CSS vars on blobs (RAF) | Keep, already RAF-gated, coarse-pointer off |
| **SmoothScrollProvider** | `components/SmoothScrollProvider.tsx` | Lenis RAF | Keep, tune, ensure not double-RAF with motion |
| **ReducedMotionProvider** | `components/ReducedMotionProvider.jsx` | `MotionConfig reducedMotion="user"` | Propagate to DistressedLogo |
| **Neofetch** | `components/Neofetch.jsx` | Section system | No change, below fold |
| **Reveal/BlurText/MagneticLink** | `app/(root)/page.jsx` | Content reveals | No change, viewport once |

**Architecture change (minimal):**
```
before: <motion.div style={y/scale/opacity}><svg filter=erode> + SMIL animate
after:  <motion.div style={y/scale/opacity} will-change>  // GPU wrapper
          <div style="contain:paint">
            <svg filter=erode-staticNoSMIL>                // raster 1x
```
No Context lift, no new provider.

---

## 8 — Data Models & Props

No DB. Props-only:

```ts
// DistressedLogo — updated
type DistressedLogoProps = {
  text?: string;        // default "ANDRA"
  className?: string;
  style?: CSSProperties;
  scale?: number;       // default 16 (was 26) — visual tuned, still wavy
  seed?: number;        // default 5
  animate?: boolean;    // default false (was true) — static turbulence; set true only if user wants opt-in subtle CSS displacement
  duration?: number;    // deprecated / ignored if animate=false, keep for BC
};
```

Hero motion values (unchanged API):
```ts
const yLogo = useTransform(scrollYProgress, [0,1], [0, shouldReduce?0:72]);
const scaleLogo = useTransform(scrollYProgress, [0,1], [1, shouldReduce?1:0.92]);
const opacityLogo = useTransform(scrollYProgress, [0,1], [1, shouldReduce?1:0.45]);
```

---

## 9 — File Structure

```
spec/andra-hero-perf/
  prd.md                ← this file (Fase 0)
  plan.md               (Fase 1 — not yet)
  qa.md                 (Fase 1 — not yet)
components/
  DistressedLogo.tsx    ← main edit
  BlobParallax.jsx      ← audit only
  SmoothScrollProvider.tsx ← audit only
  ReducedMotionProvider.jsx
app/(root)/page.jsx     ← hero wrapper isolation edit
app/globals.css         ← add contain-paint / will-change if needed (no new tokens)
```

No new files unless `plan.md` decides alternative (e.g., `useIsMounted` helper — avoid).

---

## 10 — User Flows & Core Loop

**Flow 1 — Happy scroll (fine pointer, no reduce):**
1. LCP hero: ANDRA renders static distorted (1 paint).
2. User scrolls → Lenis smooth + Framer Motion `y/scale/opacity` on isolated wrapper (compositor thread).
3. No filter repaint, FPS 60, opacity fades to 0.45 at end.
4. Continue to About/Projects — no CLS.

**Flow 2 — Reduced-motion / coarse pointer:**
1. `shouldReduce=true` → parallax 0, DistressedLogo `animate=false`, Blobs no mousemove.
2. Static hero, no motion, passes a11y.

**Edge:** Resize 375→1440, orientation change, tab background/foreground — filter stays stable, IntersectionObserver not needed after removing SMIL (can keep or remove observer).

---

## 11 — Functional Requirements

- FR1: DistressedLogo renders wavy distressed look tanpa SMIL animation (static turbulence).
- FR2: Filter region tidak cause overflow scroll horizontal (tight crop).
- FR3: Hero parallax y/scale/opacity tetap jalan smooth di fine pointer, off saat `prefers-reduced-motion`.
- FR4: No new dependencies, no API change breaking.
- FR5: ReducedMotionProvider + DistressedLogo `animate` prop terhubung (truth source = `useReducedMotion()`).
- FR6: Visual regression: snapshot hero at scroll 0 vs before — manual review, diff < 5%.
- FR7: Lenis + Framer Motion tidak double-RAF stutter.

---

## 12 — Non-Functional Requirements (Performance)

- NFR1: Hero scroll 60fps sustained on MB Air M1 (Chrome) + Moto G Power / Redmi 10C profile.
- NFR2: p95 scroll handler < 16ms (measure via `performance.mark` / DevTools).
- NFR3: Total Blocking Time < 150ms, INP < 200ms on hero.
- NFR4: Lighthouse Performance > 95 desktop, > 90 mobile (Moto G4). CLS 0, LCP < 1.8s.
- NFR5: Filter paint count: 1 initial, 0 per-frame durante scroll (verify via Paint Profiler).
- NFR6: Bundle size tidak naik (no new deps). `next build` passes.

---

## 13 — Design & Visual Spec

Taste dials: **variance 3 / motion 5 / density 3** (calm editorial, polished scroll, spacious).
- Keep editorial Swiss/minimal hero: ANDRA huge, mono tracking on tagline, glass buttons.
- Anti-slop: no purple gradient, no bento emoji. Keep existing `hero-grid` + `hero-blobs` muted teal/purple.
- DistressedLogo styling: `text-[#121212]`, `w-[min(180vw,2160px)]`, `fontWeight 800`, `fontSize 90` in SVG viewBox 680x200. Scale 16 guideline: enough displacement to feel hand-pressed, not noisy.
- Motion spec: `easeOut, duration 0.6` for reveals, parallax linear via scrollProgress (GPU). `BlurText` stays blur 8px → 0px (isolated, not on filtered node).
- Spacing: hero `py-20`, `contain-paint` wrapper.
- A11y: contrast 4.5:1 preserved, `role=img aria-label` on SVG, focus ring on links.

---

## 14 — Acceptance Criteria (QA Gate — must all pass before merge)

- [ ] AC1: `components/DistressedLogo.tsx` tidak mengandung `<animate` SMIL untuk `baseFrequency`.
- [ ] AC2: Filter attrs: `x="0%" y="-5%" width="100%" height="115%"` (or tighter) + `filterUnits="objectBoundingBox"` + `colorInterpolationFilters="sRGB"`.
- [ ] AC3: Hero parallax `motion.div` wrapper terpisah dari `<svg>` yang punya filter; wrapper punya `will-change: transform, opacity` dan `transform: translateZ(0)`.
- [ ] AC4: Hero scroll 60fps verified: DevTools Performance > 55fps avg, 0 frames > 16ms, Paints: filter repaints 0 durante scroll (screenshot profiler attached in `qa.md`).
- [ ] AC5: `prefers-reduced-motion: reduce` → parallax 0, turbulence static, blobs off (test via DevTools Rendering → emulate).
- [ ] AC6: No horizontal scroll at 375px, 768px, 1440px (overflow-x-clip holds with 180vw).
- [ ] AC7: Lighthouse CI: perf >95 desktop / >90 mobile, CLS 0, no a11y regression.
- [ ] AC8: `npm run build` passes, no new deps in `package.json`, no console errors.
- [ ] AC9: Visual parity approved: side-by-side before/after PNG (static frame) — still wavy, stakeholders ok.

---

## 15 — Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Static turbulence terlihat kurang "hidup" | Medium | Tune `seed` & `baseFrequency 0.022 0.012` + `scale 16` A/B 3 variants sebelum lock; keep `animate` prop for opt-in CSS keyframe if needed later |
| Framer Motion + Lenis jank saat sync | Low | Keep Lenis single RAF, motion uses `transform` only; test with `syncTouch:true` off if needed |
| 180vw cause overflow/clip di mobile | Medium | Keep `overflow-x-clip contain-paint`, test 375px, consider `w-[min(160vw,1800px)]` fallback |
| Filter still expensive even static | Medium | Shrink region + `stitchTiles` + `numOctaves 1`; fallback to pre-rasterized PNG if budget exceeded (last resort, flagged in plan) |
| Reduced-motion not propagated | Low | Wire `useReducedMotion()` → `DistressedLogo animate={false}` explicitly |

---

## 16 — Next Steps (Fase 1 Plan — not executed in Fase 0)

1. Write `spec/andra-hero-perf/plan.md` — 2 alternative approaches (A: freeze filter + isolate wrapper, B: pre-bake distressed SVG path) dengan tradeoff table.
2. Implement Fase 1 code (one commit on this branch): edit `DistressedLogo.tsx` + `app/(root)/page.jsx` + optional `globals.css` token.
3. QA: DevTools Performance profile (video + FPS graph), Lighthouse run desktop+mobile, reduced-motion test, 375/768/1440 screenshots.
4. Prepare `qa.md` evidence ledger.
5. Request user review — **do not push** until user approves (`git status` clean, branch local only).

---

**Fase 0 complete — awaiting Fase 1 (plan → code → QA).**
