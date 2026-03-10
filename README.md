# Adhery

Conversational AI that keeps GLP-1 patients on therapy. Most patients churn in the first 90 days - Adhery catches them with real conversations at scale.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) v9+

### Install and run

```bash
git clone https://github.com/sarbak/adhery.git
cd adhery
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the marketing site.

### Key pages

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/pitch` | Customer-facing pitch deck (13 slides) |
| `/slides` | Investor-facing slide deck (23 slides) |

### Available scripts

```bash
pnpm dev      # Start development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/) 4
- [PostHog](https://posthog.com/) for analytics
- [Vercel](https://vercel.com/) for deployment

## Project structure

```
src/app/
  page.tsx        # Marketing landing page
  pitch/page.tsx  # Customer pitch deck
  slides/page.tsx # Investor slide deck
demo/             # Voice AI demo scripts
data-patients/    # Enrollment form samples
```

## License

MIT
