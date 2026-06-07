# EduFlow — Complete Module Buildout

Goal: every sidebar item across all 4 roles opens a **fully designed working module** (KPIs, filters, search, tables, charts, drill-downs, empty/loading states), styled to match the uploaded moodboards (Linear/Stripe/Vercel/Notion/Framer/Raycast feel, both light + dark).

Current state: foundations, theme, widget library, role architecture, DOS dashboard, and `ModulePage` scaffold all exist. Several routes still use a thin `ModulePage` shell — they look polished but read as "lists" rather than full apps. The four role dashboards exist but vary in depth.

---

## Phase 1 — Design system tighten (foundation)
- Audit `src/styles.css` tokens: ensure parity between light/dark for `--surface`, `--border`, `--ink-muted`, plus a softer elevated card surface used in the moodboard (`--card-elevated`).
- Standardize shared primitives in `src/components/dashboard/primitives.tsx`:
  - `PageHeader` (eyebrow + title + description + actions)
  - `Toolbar` (search input + filter chips + view switch + export)
  - `DataTable` (sticky header, hover row, status pill column, row actions menu, pagination footer)
  - `EmptyState`, `LoadingSkeleton`, `Tabs` (segmented control), `Drawer` (right-side details panel)
- Add `KPIRow` helper that renders 4–6 KPIs consistently across modules.

## Phase 2 — School Director (Admin) modules
- **Dashboard** (already): polish KPIs, add Quick Actions strip + School Growth area chart + Activity feed.
- **Staff**: tabs (DOS / Teachers / All), search, dept filter, table (avatar, name, role, dept, classes, last active, status), row drawer with assign-department & activate/deactivate.
- **Students**: hierarchical tree (Students → O-Level/A-Level → S1–S6 → streams A/B/C). Clicking a class shows class KPIs (count, attendance, avg, class teacher) + student table with actions (View, Edit, Transfer, Generate Report).
- **Approvals**: tabs (Pending Teachers / Pending Students), bulk select, approve/reject, side drawer with full registration details.
- **Reports**: report builder (type: Student/Class/Subject/School + year/term/class/subject filters) + recent generated reports table with download.
- **Announcements**: composer (title, body, audience targeting: All / Teachers / Students / Specific Class) + list of published/scheduled/drafts with engagement (open rate, recipients).
- **School Settings**: tabs for Branding (logo upload, colors), School Codes, Academic Years (CRUD), Grading System (band editor: A: 80–100, etc.).

## Phase 3 — DOS modules
- **Dashboard** (already polished): keep, ensure heatmap + rankings + AI insights.
- **Academic Analytics** (exists): expand with grade distribution histogram + teacher activity ranking.
- **Classes**: O-Level/A-Level tree; selecting a class opens tabbed workspace (Overview / Students / Attendance / Marks / Reports / Analytics).
- **Subjects**: grouped by department (Sciences, Languages, Humanities, ICT, Business, Arts) as collapsible sections; each subject row expands to teachers/classes/avg score/trend sparkline.
- **Attendance** (exists): keep, add daily/weekly/monthly tabs and class rankings panel.
- **Marks**: marks-entry table (class × students × assessments) + review tab + performance analysis (subject comparison bar, grade distribution donut).
- **Reports**: shared with admin component, scoped to academic reports.
- **Teacher Performance**: table (teacher, classes, attendance-submission %, marks-submission %, activity score, trend), with filter by department.

## Phase 4 — Teacher modules
- **Dashboard**: today's classes timeline, KPIs (assigned classes/subjects, attendance submitted, marks submitted), pending assessments, recent student activity, quick actions.
- **My Classes**: class cards grid → click opens workspace with tabs (Overview / Students / Attendance / Assessments / Marks / Reports / Analytics).
- **Attendance**: record-attendance grid (student rows × Present/Absent/Late toggles), edit history.
- **Marks**: create assessment (CAT / Quiz / Assignment / Exam), then score-entry table auto-computing Total/Avg/Grade per row.
- **Students**: roster across assigned classes, filter by class.
- **Announcements**: lightweight composer scoped to teacher's classes.

## Phase 5 — Student modules
- **Dashboard**: KPIs (attendance %, avg grade, class rank, recent results), progress chart, upcoming assessments, announcements.
- **My Subjects**: subject cards with teacher, latest grade, trend; click → subject detail (teacher info + assessment history table CAT1/CAT2/Exam/Total/Grade).
- **My Attendance**: attendance % big number, monthly trend chart, calendar/heatmap, history table.
- **My Marks**: results grouped by subject (Mathematics → Teacher: Mr. John → assessments table) + performance trend chart.
- **Reports**: list of report cards by term with download buttons.
- **Announcements**: read-only feed.

## Phase 6 — Polish + QA
- Page transition wrapper (fade/slide on route change) wired into `DashboardLayout`.
- Verify dark mode on every new module.
- Ensure each route has loading skeleton + empty state fallbacks.
- Smoke-test all sidebar links per role; no dead pages.

---

## Technical notes
- All new pages live under `src/routes/dashboard.*.tsx` + components under `src/components/dashboard/modules/<role>/`.
- Reuse `widgets/index.tsx` (`KPIWidget`, `DashboardChart`, `HeatmapWidget`, `RankingTable`).
- New shared building blocks: `DataTable`, `Toolbar`, `Drawer`, `Tree`, `Tabs`, `PageHeader` in `primitives.tsx`.
- Mock data colocated under `src/data/` (typed) to keep components clean and make later API swap trivial.
- Framer Motion only for: sidebar active-pill (existing), KPI count-up (existing), chart path-draw (existing), table row fade-in stagger, drawer slide.

---

## Execution order
This is large. I'll execute in this order in subsequent turns:
1. Phase 1 (primitives + tokens) — single pass.
2. Phase 2 (Director modules) — biggest user-visible win.
3. Phase 3 (DOS) — fills the analytical core.
4. Phase 4 (Teacher) — workflow-heavy.
5. Phase 5 (Student) — motivational portal.
6. Phase 6 (polish).

**Reply "go" to execute all phases, or name the phase(s) you want first** (e.g. "phase 1 + 2 only").
