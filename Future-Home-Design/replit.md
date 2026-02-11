# replit.md

## Overview

This is a **Smart House Presentation** web application — a fullscreen, animated slide deck about smart home / IoT concepts. It features a futuristic dark theme with neon accents, keyboard-navigable slides, and Framer Motion animations. Slide content is stored in a PostgreSQL database and served via an Express API, with a React frontend rendering different slide layout types (cover, content, architecture, comparison).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State/Data Fetching**: TanStack React Query for server state management
- **Styling**: Tailwind CSS with CSS variables for theming, using a dark futuristic palette (neon cyan, green, purple)
- **UI Components**: shadcn/ui (new-york style) built on Radix UI primitives, located in `client/src/components/ui/`
- **Animations**: Framer Motion for slide transitions and background effects
- **Fonts**: Orbitron (display/headings), Outfit (body), Space Mono (monospace)
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Slide Layout System
The presentation uses different layout components based on slide `theme`:
- `CoverSlide` — Title/hero slide with large text and icon
- `ContentSlide` — Bullet points or grid of items with icons
- `ArchitectureSlide` — Step-by-step system architecture diagram
- `ComparisonSlide` — Two-column pros/cons layout

### Backend
- **Runtime**: Node.js with TypeScript (tsx for dev, esbuild for production)
- **Framework**: Express 5
- **API Pattern**: REST API with routes defined in `server/routes.ts`, shared route definitions in `shared/routes.ts`
- **Single API endpoint**: `GET /api/slides` returns all slides ordered by `slideOrder`
- **Database seeding**: The server auto-seeds initial slide data on startup if the slides table is empty

### Data Storage
- **Database**: PostgreSQL (required, via `DATABASE_URL` environment variable)
- **ORM**: Drizzle ORM with `drizzle-zod` for schema validation
- **Schema**: Defined in `shared/schema.ts` — single `slides` table with `id`, `title`, `content` (JSONB), `slideOrder`, and `theme`
- **Migrations**: Drizzle Kit with `db:push` command for schema sync

### Shared Code
- `shared/schema.ts` — Database schema and Zod types, shared between client and server
- `shared/routes.ts` — API route definitions with Zod response schemas, used by both frontend hooks and backend handlers

### Build & Deploy
- **Dev**: `npm run dev` runs tsx with Vite dev server middleware (HMR via `server/vite.ts`)
- **Production Build**: `npm run build` runs Vite for client → `dist/public/`, esbuild for server → `dist/index.cjs`
- **Production Start**: `npm start` serves the built files with `server/static.ts`
- The build script bundles specific server dependencies (allowlisted in `script/build.ts`) to reduce cold start times

### Key Design Decisions
1. **JSONB for slide content**: Each slide's `content` column stores flexible JSON, allowing different structures per slide type (arrays of strings, objects with pros/cons, step arrays, etc.)
2. **Shared route definitions**: API paths and response schemas are defined once in `shared/routes.ts` and reused on both client and server for type safety
3. **No authentication**: This is a read-only presentation app with no user auth
4. **Full-screen presentation mode**: The body has `overflow-hidden` and the app is designed for viewport-filling slides with keyboard navigation (arrow keys)

## External Dependencies

### Required Services
- **PostgreSQL Database**: Must be provisioned and connected via `DATABASE_URL` environment variable. Used for storing slide data via Drizzle ORM.

### Key NPM Packages
- `express` v5 — HTTP server
- `drizzle-orm` + `drizzle-kit` — Database ORM and migration tooling
- `pg` — PostgreSQL client (node-postgres)
- `framer-motion` — Animation library for slide transitions
- `@tanstack/react-query` — Server state management
- `wouter` — Client-side routing
- `zod` + `drizzle-zod` — Runtime validation and schema generation
- `lucide-react` — Icon library
- Full shadcn/ui component suite (Radix UI primitives)
- `recharts` — Charting library (available but may not be actively used)
- `vite` — Frontend build tool with HMR in development