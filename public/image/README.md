# Photo Slots & Image Asset Guide

All image slot file locations, recommended sizes, and components are mapped below. When replacing placeholders with your real photos, simply overwrite the corresponding file in `public/image/` with the same filename.

---

## 📸 Image Slots Mapping

| Filename | Component / Usage | Recommended Dimensions / Ratio | Description |
| :--- | :--- | :--- | :--- |
| `hero.jpg` | Hero header & About page top banner (`app/(root)/page.jsx` & `app/about/page.jsx`) | **400 × 550 px** (3:4 Portrait) | Primary full-body or portrait shot of Andra. |
| `about-1.jpg` | "Who Am I" collage photo 1 (`app/about/components/about/about.jsx`) | **400 × 500 px** (Portrait) | First collage photo (main stack left). |
| `about-2.jpg` | "Who Am I" collage photo 2 (`app/about/components/about/about.jsx`) | **400 × 500 px** (Portrait) | Second collage photo (top right). |
| `about-3.jpg` | "Who Am I" collage photo 3 (`app/about/components/about/about.jsx`) | **400 × 500 px** (Portrait) | Third collage photo (bottom right). |
| `education-1.jpg` | Education & Milestones Card 1 (`app/about/components/education.jsx`) | **400 × 300 px** (4:3 Landscape) | Education / SysAdmin card cover. |
| `education-2.jpg` | Education & Milestones Card 2 (`app/about/components/education.jsx`) | **400 × 300 px** (4:3 Landscape) | Shell automation & lab card cover. |
| `education-3.jpg` | Education & Milestones Card 3 (`app/about/components/education.jsx`) | **400 × 300 px** (4:3 Landscape) | Hardware & Arduino project card cover. |
| `og-image.png` | OpenGraph & Twitter preview (`public/og-image.png`) | **1200 × 630 px** (Strict 1.91:1) | Social media link preview banner image. |
| `Neofetch` Avatar | Terminal section (`components/Neofetch.jsx`) | **N/A** (Pure SVG / ASCII) | Geometric ASCII art component. No photo needed. |

---

## 💡 How to Replace Photos

1. Export your photos in JPG or PNG format.
2. Resize your photos according to the recommended aspect ratio.
3. Save them directly into `public/image/` using the exact filename specified above (e.g. `public/image/hero.jpg`).
4. Re-run `pnpm build` or refresh your dev server to see the updated photos live!
