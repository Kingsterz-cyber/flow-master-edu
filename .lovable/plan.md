
This is a large refactor. To keep it focused and shippable, I'll execute in phases and confirm scope before starting. Nothing will be rebuilt from scratch — existing components, design tokens, motion primitives, and section structure are preserved.

## Phase 1 — Foundations (theme + shared widgets)

1. **Dark mode system**
   - Extend `src/styles.css` with a proper dark palette (deep charcoal `oklch(0.16 0.012 260)` bg, slate surfaces, brighter primary, glow-friendly heatmap scale). Not a simple invert.
   - Add `ThemeProvider` (`src/components/theme/ThemeProvider.tsx`) with `light` / `dark` / `system`, persisted to `localStorage`, applied via `class="dark"` on `<html>`.
   - Add `ThemeToggle` button used in landing `Navbar` and dashboard `Topbar`.

2. **Shared dashboard widget library** (`src/components/dashboard/widgets/`)
   - `KPIWidget`, `AnalyticsCard`, `HeatmapWidget` (rounded squares + hover glow + staggered reveal), `DashboardChart` (line/area/bar with `pathLength` reveal), `RankingTable`, `InsightsList`.
   - All existing dashboards refactored to consume these — single source of truth so landing previews stay in sync.

3. **`DashboardPreview` wrapper**
   - Scales any real dashboard composition down (CSS `transform: scale()` + pointer-events none) for landing page use. No mockup duplicates.

## Phase 2 — Role architecture

Roles: **Admin (School Director)**, **DOS**, **Teacher**, **Student**.

- Update `Sidebar.tsx` with per-role nav arrays and wire every item to a real route (no dead links).
- Routes added under `src/routes/dashboard.*`:
  - Admin: `staff`, `students`, `approvals`, `reports`, `announcements`, `settings`
  - DOS: `analytics` (reuse), `classes`, `subjects`, `attendance`, `marks`, `reports`, `teacher-performance`
  - Teacher: `classes`, `attendance`, `marks`, `students`, `announcements`
  - Student: `subjects`, `attendance`, `marks`, `reports`, `announcements`
- Each page is a real module (table/filters/cards), not a placeholder.

## Phase 3 — DOS flagship dashboard

New `DOSDashboard.tsx` — most advanced view:
- Row 1: KPIs (Attendance, Avg Score, At Risk, Marks Submitted, Teacher Activity, Reports)
- Row 2: Attendance trend + Academic trend (animated area)
- Row 3: **GitHub-style heatmap (primary visual)** + AI Insights
- Row 4: Subject ranking + Class ranking tables + Teacher performance

## Phase 4 — Admin slim-down

Strip academic depth from `AdminDashboard`. Cards: Total Students/Teachers, Active Classes, School Attendance, Academic Average, Pending Approvals. High-level trends only.

## Phase 5 — Landing page

- Replace `DashboardShowcase` with role tabs (Admin / DOS / Teacher / Student) that render the **real** dashboard components via `DashboardPreview`.
- Tighten `HowItWorks` copy (medium-depth descriptions).
- Polish `FAQ` accordion transitions.
- Feature cards: richer mini previews using the same widget library (heatmap for Attendance, animated bars for Performance, etc.).

## Phase 6 — Animation hygiene

Enforce the allowed set only:
- Card entrance: `opacity/y` 0.45s
- Hover: `y: -4`
- Counters: CountUp
- Charts: `pathLength`
- Heatmap: staggered fade
- Sidebar: width transition
- Modal: scale + fade

Remove any floating/infinite/heavy-parallax usage from existing components.

## Technical notes

- Theme via `class` strategy; tokens swapped per-mode in `styles.css`. Tailwind v4 `@theme` block extended with dark variants where needed.
- `DashboardPreview` uses `transform-origin: top left` + container `overflow-hidden` with fixed viewport, so widgets render at real fidelity.
- All animations centralized in `src/components/motion/primitives.tsx` (already exists) — pruned to the approved set.
- No new deps. No backend changes.

## Out of scope (confirm if needed)

- Real auth / Supabase wiring for the new modules (data stays as typed mock arrays inside each module file).
- PDF export, real notifications, real file storage.

## Scope confirmation

This is ~25–35 new/changed files and will be done in one pass. **Reply "go" to execute all 6 phases**, or tell me which phases to prioritize (e.g. "just dark mode + DOS + real previews" is a good first slice).
