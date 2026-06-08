This is a very large backend build. The current EduFlow app is UI-only (mock data, no auth, no DB). Turning it into a production multi-school SaaS with auth, RLS, CRUD, realtime, reports, and analytics — across 4 roles and ~30 modules — is genuinely several days of work. I want to do it right, not stub it. Here's the proposed sequencing. Each phase ends in a working app; I won't move to the next without your go-ahead.

## What stays the same
The entire visual layer: theme tokens, dark mode, sidebar, topbar, widgets (`KPIWidget`, `HeatmapWidget`, `DashboardChart`, `RankingTable`), motion primitives, landing page, auth screens. I'll wire these to real data — not redesign them.

## Phase 0 — Enable Lovable Cloud + schema foundation
- Enable Lovable Cloud (Supabase).
- Migrations for the full multi-school schema with `school_id` on every tenant table + RLS:
  - `schools`, `school_members` (role per user per school), `user_roles` (app_role enum: `director`, `dos`, `teacher`, `student`)
  - `academic_categories` → `academic_levels` → `classes` (user-defined, not hardcoded O/A-Level)
  - `departments`, `subjects`, `subject_teachers` (teacher↔subject↔class), `class_teachers`
  - `registration_codes` (school-level TCH-/STD-), `enrollment_codes` (class-level S2A-001)
  - `students` (full profile: personal, contact, home, guardian), `teachers`
  - `assessments`, `marks`, `attendance`
  - `announcements`, `approvals`, `audit_logs`, `notifications`
  - `academic_years`, `terms`, `grading_bands`
- `has_role()` security-definer function; `is_school_member(school_id, role)` helper.
- RLS: every select/insert/update scoped to `school_id` via membership; no cross-school leakage.
- GRANTs on every public table per platform rules.

## Phase 1 — Auth & onboarding (real)
- Real Supabase email/password auth wired into existing `/auth/*` screens (no redesign).
- Director signup → creates `schools` row, auto-generates `TCH-XXXX` and `STD-XXXX` codes, makes director account active.
- Teacher signup → school + TCH code + class-teacher question → pending approval.
- Student signup → school + STD code + enrollment code (S2A-001) → auto-assigned to class → pending approval.
- `/auth/_authenticated` gate + role-based dashboard redirect (`/dashboard/director`, `/dos`, `/teacher`, `/student`).

## Phase 2 — Director modules (real CRUD)
- School Settings: branding, academic-year, grading bands, rotate registration codes.
- Academic Structure Builder: create categories → levels → classes → streams (user-defined).
- Departments & Subjects CRUD.
- Staff list (real teachers), Students list, Approvals queue (approve/reject pending teachers & students), Announcements, Reports (read-only aggregates).
- Director dashboard KPIs from real counts/aggregates.

## Phase 3 — Class Teacher + Enrollment Codes
- "My Class" sidebar section appears only when `class_teachers.user_id = auth.uid()`.
- Generate enrollment codes (S2A-001…), track Unused / Used / Pending.
- Class roster auto-sorted alphabetically, with search/filter/pagination.

## Phase 4 — Teacher workspace + Assessments + Marks + Attendance
- "My Teaching Classes" = cards from `subject_teachers` (Subject + Class).
- Class Workspace tabs: Overview / Students / Attendance / Assessments / Marks / Reports / Analytics.
- Assessments CRUD (CAT, Quiz, Practical, Exam, custom; name, total marks, term, weight).
- Marks entry grid → writes to `marks` with teacher_id+subject_id+class_id+assessment_id; auto totals/grade/rank.
- Attendance daily entry (Present/Absent/Late) → writes to `attendance`.

## Phase 5 — DOS dashboard (real analytics)
- All KPIs computed via SQL views / server functions: attendance rate, pass rate, class rankings, subject rankings, students-at-risk (low attendance + declining grades), teacher activity, grade distribution.
- Heatmap from real attendance + marks submission events.

## Phase 6 — Student dashboard (own data only)
- Attendance %, average grade, class rank, recent results, subject performance — all RLS-scoped to `student_id = auth.uid()`.

## Phase 7 — Reports (PDF)
- Server function generates Student Report Card / Class Report / Subject Report / School Report as real PDFs (jsPDF or pdf-lib in a server fn). Pulls live marks, attendance, rankings, comments.

## Phase 8 — Realtime + Notifications + Audit + Polish
- Supabase Realtime subscriptions on `marks`, `attendance`, `approvals`, `announcements` → live dashboard updates.
- Notification center, audit_logs, student transfer, promotion (S1→S2 preserving history).
- Final routing pass — every sidebar item lands on the correct role's page; no cross-role bleed.

## Technical notes
- Stack: TanStack Start + Supabase via Lovable Cloud. Server functions (`createServerFn` + `requireSupabaseAuth`) for all writes/aggregates; `supabaseAdmin` only for verified server-side flows. No edge functions unless required by a webhook.
- RLS is the security boundary — no client-side role checks for data access.
- Existing mock-data files (`src/data/*`, hardcoded arrays in module pages) get replaced with `useQuery` against server functions; component shells stay.
- I'll likely add: `jspdf` (or `pdf-lib`) for reports, `date-fns` (already in), `@tanstack/react-table` for searchable/sortable tables.

## What I need from you before I start

1. **Confirm scope & sequencing.** This is ~8 phases. Do you want me to execute all of them in order, stopping after each for review? Or batch (e.g., Phases 0–2 first, then 3–5, then 6–8)?
2. **First action.** Phase 0 requires enabling Lovable Cloud (creates the database). OK to enable now?
3. **Anything to defer?** Reports PDFs (Phase 7), audit logs, promotion, and transfer are nice-to-have. Confirm if any of these can ship later.

Reply with: "Go phases 0–2" (or similar) and I'll start.