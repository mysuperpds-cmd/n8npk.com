# N8NPK.com

n8n automation & AI workflow solutions website for N8NPK — an independent automation studio serving businesses in Pakistan and international clients.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app` — routes (pages, layouts, sitemap, robots)
- `src/components` — UI primitives, layout, sections, workflow and form components
- `src/lib/content` — centralized content data: services, workflows, industries, blog posts, pricing, case studies
- `src/lib/site-config.ts` — site-wide config, navigation and contact details

## Editing content

All copy that changes often lives in `src/lib/content/*.ts` as typed arrays — add a new service, workflow, industry, blog post or pricing plan there and the relevant listing/detail pages and sitemap update automatically.

## Environment variables

Copy `.env.example` to `.env.local` to configure analytics IDs and the future n8n webhook URL for the lead forms. Forms currently show a success state locally; wire `N8N_LEAD_WEBHOOK_URL` into an API route or server action when ready to receive submissions.

## Deployment

Standard Next.js app — deploy to Vercel or any Node hosting that supports `next build` / `next start`.
