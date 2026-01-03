<<<<<<< HEAD
# MuseAI Frontend (Next.js App Router)

## Overview
MuseAI is a production-ready Next.js (App Router) frontend rebuilt from Figma exports into clean, typed React components. It uses glassmorphism, gradients, and subtle Framer Motion animations to deliver a modern AI music experience.

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- React 18
- TailwindCSS (custom theme + glass/gradient helpers)
- shadcn-style primitives (Button, Input, Select, Textarea)
- Framer Motion for animations
- Lucide React icons

## High-Level Features
- Landing, Features, Pricing, Explore, Studio, Dashboard, and Auth flows (login/signup/forgot/reset)
- Responsive layouts with shared Navigation/Footer
- Animated cards, modals, and CTAs
- Ready for production build (`npm run build`)

## Visual Style
- Glass surfaces (`glass-surface`), gradient orbs (`gradient-orb`), accent gradient buttons
- Subtle hover/scroll animations via Framer Motion

## Folder Structure
- `src/app/` — App Router pages (landing, features, pricing, explore, studio, dashboard, auth/*)
- `src/components/`  
  - `ui/` — shadcn-style primitives (button, input, select, textarea)  
  - `layout/` — navigation, footer  
  - `shared/` — (add shared blocks here if further extracted)  
- `src/lib/` — utilities (`cn`)
- `src/styles/` — global Tailwind layers and helper classes
- `public/assets/` — optimized static assets (music cover images, etc.)

## Development
1) Install dependencies  
```bash
npm install
```
2) Run locally  
```bash
npm run dev
```
3) Env vars  
- None required yet; add as needed to `.env.local`.

Conventions:
- Use Tailwind for layout/styling; keep glass/gradient utility classes for consistency.
- Use shadcn-style primitives for form controls and buttons.
- Prefer Framer Motion for entrance/hover animations.
- Place shared sections/blocks in `src/components/shared/` if reused.

## Deployment (Vercel)
1) Commit and push to GitHub.  
2) In Vercel, import the repo; framework auto-detected as Next.js.  
3) Build command: `next build` (default); Output: `.next` (default).  
4) Deploy and view the live site.  

## Future Enhancements
- SEO/meta tags per page (Open Graph, Twitter cards).
- Additional micro-interactions/animations on scroll and hover.
- Backend integration for auth/session and real data (songs, projects).
- Dashboard logic wired to APIs; replace mock data with live endpoints.
- Analytics and error monitoring (Vercel Analytics/Sentry).

## Running Production Build Locally
```bash
npm run build && npm run start
```

## Preview Reminder
```bash
npm run dev
```
Then open http://localhost:3000.
=======
# MuseAi-Song-Generation-using-AI
>>>>>>> 3825748c3ae8cbca641de9d0566f7018ddd749e4

