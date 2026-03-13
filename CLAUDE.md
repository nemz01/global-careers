# Global Careers

## Project Overview
Global Careers is the US subsidiary website of **Arobas Personnel** (Montreal-based IT staffing agency). It connects US companies with pre-vetted offshore IT professionals from 12+ countries at 60-80% cost savings.

- **Stack**: Next.js 14, TypeScript, Tailwind CSS, Supabase, next-intl, Framer Motion
- **Languages**: English (default), Spanish
- **HQ**: Orlando, FL | Operations: Montréal, QC

## Quick Start
```bash
pnpm install
cp .env.example .env.local  # Fill in Supabase keys
pnpm dev
```

## Architecture

### Routing
- App Router with `app/[locale]/` pattern
- next-intl v4 for i18n with `localePrefix: 'as-needed'`
- EN is default (no prefix), ES gets `/es/` prefix
- Localized pathnames defined in `i18n/routing.ts`

### Design System
- **Dark theme** with glassmorphic effects (backdrop-blur, glass cards)
- **Brand colors**: primary-cyan `#00A3E0`, secondary-blue `#0066CC`, deep-blue `#003D7A`, dark-navy `#0A1628`
- **Accent**: brand-gold `#D4A843`, brand-silver `#94A3B8`
- **Fonts**: Montserrat (headings), Inter (body)
- Components: `GlassCard`, `ShinyButton`, `AnimatedBackground`, `AnimatedCounter`

### API Routes Pattern
All API routes follow this pattern (from Arobas reference):
1. `export const dynamic = 'force-dynamic'`
2. Rate limiting via `checkRateLimit()` (Upstash Redis + in-memory fallback)
3. Zod validation of request body
4. Supabase admin client via `getSupabaseAdmin()`
5. Try/catch with proper error responses
6. Security headers via `addSecurityHeaders()`

### Anti-Spam
- Honeypot fields on all forms
- Cloudflare Turnstile CAPTCHA
- Disposable email detection
- Combined check via `checkAntiSpam()`

### Database
- Supabase with RLS enabled on all tables
- Migration: `supabase/migrations/001_initial_schema.sql`
- Tables: business_leads, calculator_submissions, bookings, candidates, placements, email_queue, roles, page_views, testimonials

## Key Directories
```
app/[locale]/          # Localized pages
app/api/               # API routes (no auth prefix)
app/auth/              # Auth pages (login, callback)
app/dashboard/         # Admin dashboard (no i18n)
components/
  ui/                  # Reusable UI (GlassCard, ShinyButton, etc.)
  layout/              # Header, Footer, LayoutWrapper
  sections/            # Homepage sections
  calculator/          # Savings calculator components
  roles/               # Role directory components
  contact/             # Contact form
  booking/             # Booking form
  seo/                 # Schema markup
lib/                   # Core utilities (supabase, auth, anti-spam, salary-data)
messages/              # EN/ES translation JSON files
i18n/                  # next-intl config (routing.ts, request.ts)
```

## Conventions
- Use `'use client'` only when needed (hooks, motion, interactivity)
- Server components by default for pages with `generateMetadata`
- Use `GlassCard` for all card-like containers
- Use `ShinyButton` for primary CTAs
- Translation keys follow `namespace.key` pattern
- All form submissions go through API routes, never direct Supabase calls from client

## Environment Variables
See `.env.example` for required variables.
