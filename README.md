# Andra Portfolio

Personal portfolio website for Andra, a Junior DevOps based in Bogor, Indonesia.

Built with Next.js, Tailwind CSS, Framer Motion, and a small Neofetch-inspired terminal section. Project data is managed in `json/data.json`.

## Run locally

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

To create a production build:

```bash
pnpm build
pnpm start
```

## Main folders

- `app/` contains pages and layouts.
- `components/` contains reusable UI components.
- `json/data.json` contains project information.
- `public/image/` contains images used by the site.

The project can be deployed directly to Vercel. Optional services such as chat and Spotify are controlled through environment variables.
