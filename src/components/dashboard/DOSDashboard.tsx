"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Panel, Tag, Avatar } from "@/components/dashboard/primitives";
import { KPIWidget, AnalyticsCard, HeatmapWidget, DashboardChart, AnimatedBars, RankingTable } from "@/components/dashboard/widgets";
import { motion } from "framer-motion";
import { Counter, ease } from "@/components/motion/primitives";
import {
  CalendarCheck, Award, AlertTriangle, GraduationCap, BookOpen, NotebookPen,
  FileText, Sparkles, TrendingUp, ChevronRight, Activity,
} from "lucide-react";

const INSIGHTS = [
  { tint: "emerald", icon: TrendingUp, t: "Attendance improved by 5%", d: "Strongest weeks since November · driven by grades 10 and 11." },
  { tint: "primary", icon: Award, t: "Grade 10A leads academically", d: "Average 94.2 — up 3.1 pts vs last term." },
  { tint: "violet", icon: BookOpen, t: "Mathematics scores rising", d: "Median up from 78 to 86 across grades 9–11." },
  { tint: "amber", icon: AlertTriangle, t: "12 students need academic support", d: "Combination of attendance drop and falling assessments." },
];

const SUBJECTS: [string, number, "primary" | "violet" | "emerald" | "amber" | "destructive"][] = [
  ["Mathematics", 91, "primary"],
  ["Physics", 88, "violet"],
  ["English", 84, "primary"],
  ["Biology", 81, "emerald"],
  ["History", 72, "amber"],
  ["Chemistry", 86, "violet"],
  ["Computer Sci.", 89, "primary"],
];

const CLASSES = [
  ["1", "Grade 12-A", "Mr. Bennett", 96, 94, "Top"],
  ["2", "Grade 10-A", "Ms. Nair", 94, 92, "Excellent"],
  ["3", "Grade 11-A", "Mr. Williams", 91, 88, "Good"],
  ["4", "Grade 9-A", "Ms. Rossi", 89, 84, "Good"],
  ["5", "Grade 10-B", "Mr. Patel", 84, 81, "Watch"],
  ["6", "Grade 9-C", "Mr. Davis", 76, 72, "Focus"],
];

const TEACHERS = [
  ["Marcus Bennett", "Math", 6, 96, 94, "MB", "from-primary to-violet"],
  ["Elena Rossi", "Physics", 5, 93, 91, "ER", "from-violet to-cyan"],
  ["Jordan Williams", "English", 7, 89, 87, "JW", "from-cyan to-emerald"],
  ["Priya Nair", "Biology", 4, 91, 88, "PN", "from-amber to-violet"],
];

const RISK = [
  { n: "Noah Kim", c: "Grade 9-C", att: 64, gr: 58, reason: "Low attendance · 2 missing assessments", t: "from-amber to-destructive", in: "NK" },
  { n: "Aria Hassan", c: "Grade 10-B", att: 71, gr: 62, reason: "Falling grades in Physics & Math", t: "from-cyan to-violet", in: "AH" },
  { n: "Ethan Brooks", c: "Grade 11-A", att: 78, gr: 66, reason: "3 missing assessments this term", t: "from-violet to-primary", in: "EB" },
  { n: "Lina Park", c: "Grade 9-A", att: 69, gr: 63, reason: "Declining attendance, last 4 weeks", t: "from-primary to-cyan", in: "LP" },
];

export function DOSDashboard({ embed = false }: { embed?: boolean }) {
  const content = (
    <>
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Director of Studies · Spring term</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Academic <span className="font-display italic text-gradient-indigo">command center</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">Track every class, subject and teacher across the school.</p>
        </div>
        <div className="flex items-center gap-2">
          {["Today", "Week", "Term", "Year"].map((t, i) => (
            <button
              key={t}
              className={`rounded-lg px-3 py-1.5 text-[12px] transition ${
                i === 2 ? "bg-ink text-background" : "border border-border bg-card text-ink hover:bg-surface"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Row 1: KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KPIWidget icon={CalendarCheck} label="Attendance Rate" value={96.4} suffix="%" decimals={1} delta="+2.1%" tint="emerald" index={0} />
        <KPIWidget icon={Award} label="Academic Average" value={87.2} decimals={1} delta="+3.1" tint="primary" index={1} />
        <KPIWidget icon={AlertTriangle} label="Students At Risk" value={12} delta="−4" trend="down" tint="amber" index={2} />
        <KPIWidget icon={NotebookPen} label="Marks Submitted" value={186} suffix="/210" delta="+24" tint="violet" index={3} />
        <KPIWidget icon={GraduationCap} label="Teacher Activity" value={92} suffix="%" delta="+5%" tint="cyan" index={4} />
        <KPIWidget icon={FileText} label="Reports Generated" value={74} delta="+12" tint="primary" index={5} />
      </div>

      {/* Row 2: trends */}
      <div className="mt-6 grid grid-cols-12 gap-4">
        <AnalyticsCard
          className="col-span-12 xl:col-span-7"
          title={<div className="flex items-center gap-2"><span>Attendance & Performance trend</span><Tag tint="emerald">+2.1%</Tag></div>}
          action={
            <div className="flex gap-1">
              {["1M", "3M", "Term", "Year"].map((t, i) => (
                <button key={t} className={`rounded-md px-2 py-0.5 text-[10.5px] ${i === 2 ? "bg-ink text-background" : "text-ink-muted hover:bg-surface"}`}>{t}</button>
              ))}
            </div>
          }
        >
          <div className="flex items-baseline gap-5">
            <div>
              <div className="text-2xl font-semibold text-ink"><Counter to={96.4} suffix="%" decimals={1} /></div>
              <div className="text-[10.5px] text-ink-muted">attendance</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-violet"><Counter to={87.2} decimals={1} /></div>
              <div className="text-[10.5px] text-ink-muted">academic avg</div>
            </div>
            <div className="ml-auto flex gap-3 text-[10.5px]">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Attendance</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet" /> Performance</span>
            </div>
          </div>
          <div className="mt-3 h-48">
            <DashboardChart
              data={[88, 90, 91, 89, 92, 93, 91, 94, 93, 95, 96, 96]}
              gradientId="dosA"
              color="oklch(0.62 0.22 275)"
              secondary={{ data: [72, 74, 76, 75, 78, 80, 82, 81, 84, 86, 87, 88], color: "oklch(0.68 0.22 295)", gradientId: "dosB" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[9.5px] text-ink-muted">
            {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => <span key={m}>{m}</span>)}
          </div>
        </AnalyticsCard>

        <AnalyticsCard
          className="col-span-12 xl:col-span-5"
          title={<div className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" /><span>AI insights</span><Tag tint="primary">Live</Tag></div>}
        >
          <ul className="space-y-2">
            {INSIGHTS.map((it, i) => (
              <motion.li
                key={it.t}
                initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                whileHover={{ y: -2 }}
                className="group flex items-start gap-2.5 rounded-xl border border-border bg-surface/60 p-3 transition hover:bg-background"
              >
                <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-${it.tint}/15 text-${it.tint}`}>
                  <it.icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-medium text-ink">{it.t}</div>
                  <div className="mt-0.5 text-[11px] text-ink-muted">{it.d}</div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </motion.li>
            ))}
          </ul>
        </AnalyticsCard>
      </div>

      {/* Row 3: Heatmap primary + subject ranking */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <AnalyticsCard
          className="col-span-12 xl:col-span-8"
          title={<div className="flex items-center gap-2"><span>School-wide daily attendance</span><Tag tint="primary">182 days</Tag></div>}
          action={<button className="text-[10.5px] text-primary">Export CSV</button>}
        >
          <HeatmapWidget weeks={26} seed={2} label="Last 26 weeks · daily attendance intensity" />
        </AnalyticsCard>

        <AnalyticsCard className="col-span-12 xl:col-span-4" title="Subject performance">
          <div className="space-y-2.5">
            {SUBJECTS.map(([name, v, tint], i) => (
              <div key={name}>
                <div className="flex justify-between text-[11px]">
                  <span className="text-ink">{name}</span>
                  <span className="font-semibold text-ink"><Counter to={v} suffix="%" /></span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: i * 0.05, ease }}
                    className={`h-full rounded-full bg-${tint}`}
                    style={{ background: `linear-gradient(90deg, var(--${tint === "primary" ? "primary" : tint}), var(--violet))` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </AnalyticsCard>
      </div>

      {/* Row 4: Class comparison bars + teacher table */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <AnalyticsCard className="col-span-12 xl:col-span-6" title="Class performance comparison" action={<button className="text-[10.5px] text-primary">All</button>}>
          <AnimatedBars
            data={[88, 92, 76, 84, 90, 81, 86, 94]}
            labels={["9A", "9B", "9C", "10A", "10B", "11A", "11B", "12A"]}
          />
        </AnalyticsCard>

        <AnalyticsCard className="col-span-12 xl:col-span-6" title="Class rankings" action={<button className="text-[10.5px] text-primary">Open</button>}>
          <RankingTable
            columns={["#", "Class", "Teacher", "Attendance", "Avg", "Status"]}
            rows={CLASSES.map(([r, c, t, a, s, st]) => [
              <span key="r" className="font-semibold text-ink-muted">{r}</span>,
              <span key="c" className="font-medium">{c}</span>,
              <span key="t" className="text-ink-muted">{t}</span>,
              <span key="a">{a}%</span>,
              <span key="s" className="font-semibold">{s}</span>,
              <Tag key="st" tint={st === "Top" || st === "Excellent" ? "emerald" : st === "Good" ? "primary" : st === "Watch" ? "amber" : "destructive"}>{st}</Tag>,
            ])}
          />
        </AnalyticsCard>
      </div>

      {/* Row 5: Teacher activity + risk monitor */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <AnalyticsCard className="col-span-12 xl:col-span-7" title="Teacher performance" action={<button className="text-[10.5px] text-primary">Full report</button>}>
          <RankingTable
            columns={["Teacher", "Subject", "Classes", "Activity", "Avg score", ""]}
            rows={TEACHERS.map(([n, s, cl, act, avg, ini, tint]) => [
              <div key="n" className="flex items-center gap-2">
                <Avatar initials={ini as string} tint={tint as string} />
                <span className="font-medium">{n}</span>
              </div>,
              <span key="s" className="text-ink-muted">{s}</span>,
              <span key="c">{cl}</span>,
              <div key="a" className="flex items-center gap-2">
                <div className="h-1 w-16 overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${act}%` }} />
                </div>
                <span>{act}%</span>
              </div>,
              <span key="v" className="font-semibold">{avg}</span>,
              <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">View</button>,
            ])}
          />
        </AnalyticsCard>

        <AnalyticsCard
          className="col-span-12 xl:col-span-5"
          title={<div className="flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-amber" /><span>Student risk monitor</span><Tag tint="amber">12 flagged</Tag></div>}
        >
          <ul className="space-y-2">
            {RISK.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease }}
                whileHover={{ y: -2 }}
                className="rounded-xl border border-border bg-surface/60 p-3 transition hover:bg-background hover:shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar initials={s.in} tint={s.t} />
                    <div>
                      <div className="text-[12px] font-medium text-ink">{s.n}</div>
                      <div className="text-[10px] text-ink-muted">{s.c}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10.5px]">
                    <span className="rounded-md bg-destructive/10 px-1.5 py-0.5 font-medium text-destructive">Att {s.att}%</span>
                    <span className="rounded-md bg-amber/15 px-1.5 py-0.5 font-medium text-amber">Avg {s.gr}</span>
                  </div>
                </div>
                <div className="mt-1.5 text-[10.5px] text-ink-muted">{s.reason}</div>
              </motion.li>
            ))}
          </ul>
        </AnalyticsCard>
      </div>

      {/* Marks activity */}
      <div className="mt-4 grid grid-cols-12 gap-4">
        <AnalyticsCard className="col-span-12" title={<div className="flex items-center gap-2"><Activity className="h-3.5 w-3.5 text-primary" /><span>Marks submission activity</span></div>}>
          <HeatmapWidget weeks={26} seed={9} label="Last 26 weeks · marks submitted per day" />
        </AnalyticsCard>
      </div>
    </>
  );

  if (embed) return <div className="p-4 sm:p-6">{content}</div>;
  return <DashboardLayout role="dos">{content}</DashboardLayout>;
}
