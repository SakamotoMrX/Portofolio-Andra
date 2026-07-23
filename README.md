# Andra Portfolio (Next.js, Vercel-Ready, Neofetch Style)

Personal portfolio website built with **Next.js 15 (App Router)**, **TailwindCSS**, **Framer Motion**, and a custom **Neofetch Terminal** section.

---

## 🚀 Features

- **Hero & About Sections**: Rebranded for **Andra (SakamotoMrX)** — Junior DevOps based in Bogor, Indonesia.
- **Neofetch Section**: Linux terminal-inspired card component (`components/Neofetch.jsx`) driven by `data/neofetch.js` with monospace dot-leaders and category accent styling.
- **Projects Showcase**: Dynamic JSON-driven project cards from `json/data.json`.
- **Responsive Layout**: Full-page snap scroll navigation for desktop & seamless mobile layout.
- **SEO & Metadata**: OpenGraph, Twitter Cards, and JSON-LD Person structured data.
- **Vercel Ready**: Zero-config deployment with env var guards for optional services (Spotify, Chat).

---

## 🛠️ Tech Stack & System Specs

- **Role**: Junior DevOps
- **Location**: Bogor, Indonesia
- **Tech Journey**: 15 years 5 months
- **OS**: macOS, Linux, Windows
- **IDEs & Tools**: Antigravity IDE, Vim, Nvim, Lazygit, Arduino IDE
- **Languages**: Bash, YAML, Indonesian, English
- **Skills**: Linux SysAdmin, Virtual Machines, Containerization, Git & GitHub, Deploying, SDLC & Agile
- **Hobbies**: Larping Linux (software), Arduino (hardware)

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Run dev server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   pnpm build
   ```

---

## 🖼️ Replacing Photo Placeholders

Refer to `public/image/README.md` for full dimensions and component mappings. Simply replace these files in `public/image/`:

- `hero.jpg` (400x550 px) — Main portrait
- `about-1.jpg`, `about-2.jpg`, `about-3.jpg` (400x500 px) — "Who Am I" collage
- `education-1.jpg`, `education-2.jpg`, `education-3.jpg` (400x300 px) — Milestones cover photos
- `og-image.png` (1200x630 px) — Social media link preview banner

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<YOUR_USERNAME>/andra-portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → Click **Add New Project**.
3. Import your `andra-portfolio` GitHub repository.
4. Next.js App Router will be auto-detected.
5. *(Optional)* Add environment variables from `.env.example` if using Spotify or Chat.
6. Click **Deploy**!
