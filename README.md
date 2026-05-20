# Lineage — Family Tree Landing Page

A premium, scroll-driven landing page for a genealogy / family tree platform. Built with Next.js, React, Tailwind CSS, shadcn/ui, Framer Motion, and Lucide icons.

## Features

- **Scroll storytelling** — The family tree grows and evolves as you scroll through 7 feature sections
- **3D tree motion** — Perspective transforms, rotation, and zoom on the animated SVG tree
- **Growing branches** — Vine-like SVG paths with glow effects and pulsing growth dots
- **Life events timeline** — Event cards orbit and attach to family members
- **Photo memories** — Animated photo cards fly into place on events
- **Reminder notifications** — Birthday/anniversary alert UI
- **Side progress timeline** — Story steps indicator (desktop)
- **Fully responsive** — Cinematic desktop experience with mobile-optimized layouts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Admin email (appointments & contact form)

Copy `.env.example` to `.env.local` and set:

- `RESEND_API_KEY` — from [resend.com](https://resend.com)
- `ADMIN_EMAIL` — where booking and contact notifications are sent
- `EMAIL_FROM` — verified sender in Resend (use `onboarding@resend.dev` for testing)

Restart `npm run dev` after changing env vars.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS 3
- Framer Motion 11
- shadcn/ui (Button, Card)
- lucide-react

## Project Structure

```
src/
  app/              # Next.js app router
  components/
    landing/        # Landing page sections & tree
    ui/             # shadcn/ui primitives
  hooks/            # Scroll stage hook
  lib/              # Data & utilities
```

## Components

| Component | Description |
|-----------|-------------|
| `HeroSection` | Hero with headline, CTAs, animated tree preview |
| `AnimatedFamilyTree` | Main SVG tree with 3D transforms |
| `FeatureScrollSection` | Sticky tree + scrolling feature blocks |
| `PersonNode` | Family member profile cards |
| `EventCard` | Life event cards with icons |
| `ReminderNotification` | Birthday reminder UI |
| `BranchLines` | Animated SVG branch connections |
| `ScrollProgressTimeline` | Side story progress indicator |
| `CTASection` | Final gradient call-to-action |
