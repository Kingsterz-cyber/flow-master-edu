"use client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Panel, Tag } from "@/components/dashboard/primitives";
import { Counter, FadeUp, StaggerGroup, StaggerItem, ease, DrawPath } from "@/components/motion/primitives";
import { motion } from "framer-motion";
import {
  Users, CalendarCheck, Award, AlertTriangle, GraduationCap, BookOpen,
  Sparkles, TrendingUp, ArrowUpRight, ChevronRight, Activity,
} from "lucide-react";

/* ---------- helpers ---------- */
const WEEKDAYS = ["Mon", "", "Wed", "", "Fri", "", ""];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildHeatmap() {
  const weeks = 26;
  const days = 7;
  const data: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < days; d++) {
      // weekends low, weekdays high w/ variation
      const base = d === 5 || d === 6 ? 0 : 0.55 + Math.random() * 0.45;
      const noise = (Math.sin(w * 0.7 + d) + 1) * 0.15;
      col.push(Math.min(1, base + noise * (d === 5 || d === 6 ? 0 : 1)));
    }
    data.push(col);
  }
  return data;
}
const HEAT = buildHeatmap();
function heatColor(v: number) {
  if (v === 0) return "oklch(0.96 0.005 260)";
  if (v < 0.4) return "oklch(0.92 0.06 275)";
  if (v < 0.65) return "oklch(0.78 0.12 275)";
  if (v < 0.85) return "oklch(0.62 0.18 275)";
  return "oklch(0.48 0.22 275)";
}

/* ---------- KPI ---------- */
function AKPI({
  icon: Icon, label, value, suffix = "", delta, trend = "up", tint,
}: {
  icon: any; label: string; value: number; suffix?: string;
  delta?: string; trend?: "up" | "down"; tint: { bg: string; text: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, ease }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-soft transition-shadow duration-500 hover:shadow-float"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(70% 60% at 30% 0%, oklch(0.92 0.08 275 / 0.5), transparent 65%)" }}
      />
      <div className="relative flex items-start justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${tint.bg}`}>
          <Icon className={`h-4 w-4 ${tint.text}`} />
        </div>
        {delta && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
            trend === "up" ? "bg-emerald/10 text-emerald" : "bg-destructive/10 text-destructive"
          }`}>
            <ArrowUpRight className={`h-2.5 w-2.5 ${trend === "down" ? "rotate-90" : ""}`} />
            {delta}
          </span>
        )}
      </div>
      <div className="relative mt-4">
        <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">{label}</div>
        <div className="mt-0.5 text-2xl font-semibold tracking-tight text-ink">
          <Counter to={value} suffix={suffix} decimals={suffix === "%" ? 1 : 0} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Animated line chart ---------- */
function AttendanceTrend() {
  const data = [88, 90, 91, 89, 92, 93, 91, 94, 93, 95, 96, 96];
  const w = 600, h = 180;
  const max = 100, min = 80;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return [x, y] as const;
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;

  return (
    <div className="h-48">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="attGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0.32" />
            <stop offset="100%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1="0" x2={w} y1={h * p} y2={h * p} stroke="oklch(0.92 0.01 260)" strokeDasharray="3 5" strokeWidth="0.8" />
        ))}
        <motion.path
          d={area}
          fill="url(#attGrad)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
        />
        <DrawPath d={path} stroke="oklch(0.52 0.22 275)" strokeWidth={2.2} duration={1.4} />
        {points.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r={3}
            fill="white" stroke="oklch(0.52 0.22 275)" strokeWidth={1.6}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.05, type: "spring", stiffness: 260 }}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[9.5px] text-ink-muted">
        {MONTHS.map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}

function PerformanceTrend() {
  const data = [72, 74, 76, 75, 78, 80, 82, 81, 84, 86, 87, 88];
  const w = 600, h = 180;
  const max = 100, min = 60;
  const points = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / (max - min)) * h,
  ] as const);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <div className="h-48">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="perfGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.22 295)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="oklch(0.58 0.22 295)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1="0" x2={w} y1={h * p} y2={h * p} stroke="oklch(0.92 0.01 260)" strokeDasharray="3 5" strokeWidth="0.8" />
        ))}
        <motion.path d={area} fill="url(#perfGrad)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.6 }} />
        <DrawPath d={path} stroke="oklch(0.58 0.22 295)" strokeWidth={2.2} duration={1.4} />
      </svg>
      <div className="mt-1 flex justify-between text-[9.5px] text-ink-muted">
        {MONTHS.map((m) => <span key={m}>{m}</span>)}
      </div>
    </div>
  );
}

/* ---------- Animated bar chart ---------- */
function AnimatedBars({
  data, labels, colorFrom = "oklch(0.52 0.22 275)", colorTo = "oklch(0.58 0.22 295)",
}: { data: number[]; labels: string[]; colorFrom?: string; colorTo?: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
          <div className="relative flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(v / max) * 100}%` }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.07 }}
              className="relative w-full rounded-t-md"
              style={{ background: `linear-gradient(180deg, ${colorFrom}, ${colorTo}aa)` }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 text-[9px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">
                {v}
              </span>
            </motion.div>
          </div>
          <span className="text-[9.5px] text-ink-muted">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- GitHub-style heatmap ---------- */
function AttendanceHeatmap() {
  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 overflow-x-auto pb-1">
        <div className="mr-1 hidden flex-col gap-[3px] pt-4 text-[8.5px] text-ink-muted sm:flex">
          {WEEKDAYS.map((d, i) => (
            <span key={i} className="h-3 leading-none">{d}</span>
          ))}
        </div>
        <div className="flex gap-[3px]">
          {HEAT.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-[3px]">
              {col.map((v, ri) => (
                <motion.div
                  key={ri}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.25, delay: (ci * 7 + ri) * 0.004, ease }}
                  whileHover={{ scale: 1.35 }}
                  title={`${Math.round(v * 100)}% attendance`}
                  className="h-3 w-3 rounded-[3px]"
                  style={{ background: heatColor(v) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-ink-muted">
        <span>Last 26 weeks · daily attendance</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0.1, 0.45, 0.7, 0.9].map((v) => (
            <span key={v} className="h-2.5 w-2.5 rounded-[2px]" style={{ background: heatColor(v) }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- AI Insights ---------- */
const INSIGHTS = [
  { tint: "emerald", icon: TrendingUp, t: "Attendance increased by 8% this month", d: "Driven by Grade 10 and 11 — strongest weeks since November." },
  { tint: "primary", icon: Award, t: "Grade 10A has the highest performance", d: "Average score 94.2 — up 3.1 pts vs last term." },
  { tint: "violet", icon: BookOpen, t: "Mathematics scores are improving", d: "Median up from 78 to 86 across grades 9–11." },
  { tint: "amber", icon: AlertTriangle, t: "12 students may need academic support", d: "Combination of low attendance and falling assessment scores." },
];

/* ---------- Risk / Teacher activity ---------- */
const RISK = [
  { n: "Noah Kim", c: "Grade 9-C", att: 64, gr: 58, reason: "Low attendance · 2 missing assessments" },
  { n: "Aria Hassan", c: "Grade 10-B", att: 71, gr: 62, reason: "Falling grades in Physics & Math" },
  { n: "Ethan Brooks", c: "Grade 11-A", att: 78, gr: 66, reason: "3 missing assessments this term" },
  { n: "Lina Park", c: "Grade 9-A", att: 69, gr: 63, reason: "Declining attendance, last 4 weeks" },
];

const TEACHER_ACTIVITY = [
  { label: "Attendance submissions", v: 92, color: "oklch(0.52 0.22 275)" },
  { label: "Marks submitted", v: 86, color: "oklch(0.58 0.22 295)" },
  { label: "Reports generated", v: 74, color: "oklch(0.72 0.16 165)" },
];

/* ---------- Page ---------- */
export function AnalyticsDashboard() {
  return (
    <DashboardLayout role="admin">
      {/* Heading */}
      <FadeUp>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Analytics · Spring term</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              School <span className="font-display italic text-gradient-indigo">insights</span>
            </h1>
            <p className="mt-1 text-[13px] text-ink-muted">Simple, actionable insights about students, teachers and academics.</p>
          </div>
          <div className="flex items-center gap-2">
            {["Term", "6M", "1Y", "All"].map((t, i) => (
              <button key={t} className={`rounded-lg px-3 py-1.5 text-[12px] transition ${
                i === 0 ? "bg-ink text-background" : "border border-border bg-card text-ink hover:bg-surface"
              }`}>{t}</button>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* KPI grid */}
      <StaggerGroup className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <AKPI icon={Users} label="Total Students" value={5248} delta="+128" tint={{ bg: "bg-primary/10", text: "text-primary" }} />
        <AKPI icon={CalendarCheck} label="Attendance Rate" value={96.4} suffix="%" delta="+2.1%" tint={{ bg: "bg-emerald/15", text: "text-emerald" }} />
        <AKPI icon={Award} label="Avg School Score" value={87.2} delta="+3.1" tint={{ bg: "bg-violet/15", text: "text-violet" }} />
        <AKPI icon={AlertTriangle} label="Students At Risk" value={12} delta="−4" trend="down" tint={{ bg: "bg-amber/20", text: "text-amber" }} />
        <AKPI icon={GraduationCap} label="Teacher Activity" value={92} suffix="%" delta="+5%" tint={{ bg: "bg-cyan/20", text: "text-cyan" }} />
        <AKPI icon={BookOpen} label="Active Classes" value={184} delta="+4" tint={{ bg: "bg-primary/10", text: "text-primary" }} />
      </StaggerGroup>

      {/* Main analytics */}
      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* Attendance trend */}
        <FadeUp className="col-span-12 xl:col-span-7">
          <Panel
            title={
              <div className="flex items-center gap-2">
                <span>Attendance trend</span>
                <Tag tint="emerald">+2.1% vs last term</Tag>
              </div>
            }
          >
            <div className="flex items-baseline gap-1">
              <div className="text-2xl font-semibold text-ink">
                <Counter to={96.4} suffix="%" decimals={1} />
              </div>
              <span className="text-[11px] text-ink-muted">school-wide</span>
            </div>
            <AttendanceTrend />
          </Panel>
        </FadeUp>

        {/* Insights */}
        <FadeUp className="col-span-12 xl:col-span-5" delay={0.1}>
          <Panel
            title={
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span>AI insights</span>
                <Tag tint="primary">Updated 2m ago</Tag>
              </div>
            }
          >
            <ul className="space-y-2">
              {INSIGHTS.map((it, i) => (
                <motion.li
                  key={it.t}
                  initial={{ opacity: 0, x: 12, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  whileHover={{ x: 2 }}
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
          </Panel>
        </FadeUp>

        {/* Performance trend */}
        <FadeUp className="col-span-12 xl:col-span-7">
          <Panel
            title={
              <div className="flex items-center gap-2">
                <span>Academic performance trend</span>
                <Tag tint="violet">+3.1 pts</Tag>
              </div>
            }
          >
            <div className="flex items-baseline gap-1">
              <div className="text-2xl font-semibold text-ink">
                <Counter to={87.2} decimals={1} />
              </div>
              <span className="text-[11px] text-ink-muted">average score</span>
            </div>
            <PerformanceTrend />
          </Panel>
        </FadeUp>

        {/* Teacher activity */}
        <FadeUp className="col-span-12 xl:col-span-5" delay={0.1}>
          <Panel title={<span>Teacher activity overview</span>}>
            <div className="space-y-4">
              {TEACHER_ACTIVITY.map((t, i) => (
                <div key={t.label}>
                  <div className="mb-1.5 flex items-center justify-between text-[11.5px]">
                    <span className="text-ink">{t.label}</span>
                    <span className="font-semibold text-ink">
                      <Counter to={t.v} suffix="%" />
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.v}%` }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${t.color}, oklch(0.78 0.13 210))` }}
                    />
                  </div>
                </div>
              ))}
              <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-violet/10 p-3">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  <div className="text-[12px] font-medium text-ink">312 teachers active this week</div>
                </div>
                <div className="mt-1 text-[10.5px] text-ink-muted">
                  98% submitted attendance · 86% submitted marks on time.
                </div>
              </div>
            </div>
          </Panel>
        </FadeUp>

        {/* Subject comparison */}
        <FadeUp className="col-span-12 md:col-span-6">
          <Panel title="Subject performance comparison" action={<button className="text-[10.5px] text-primary">Details</button>}>
            <AnimatedBars
              data={[91, 86, 83, 78, 72, 88, 80]}
              labels={["Math","Physics","English","Biology","History","CS","Arts"]}
            />
            <div className="mt-3 flex justify-between border-t border-border pt-2 text-[11px]">
              <span className="text-ink-muted">Top: <span className="font-medium text-ink">Math · 91</span></span>
              <span className="text-ink-muted">Lowest: <span className="font-medium text-destructive">History · 72</span></span>
            </div>
          </Panel>
        </FadeUp>

        {/* Class comparison */}
        <FadeUp className="col-span-12 md:col-span-6" delay={0.05}>
          <Panel title="Class performance comparison" action={<button className="text-[10.5px] text-primary">All classes</button>}>
            <AnimatedBars
              data={[88, 92, 76, 84, 90, 81, 86, 94]}
              labels={["9A","9B","9C","10A","10B","11A","11B","12A"]}
              colorFrom="oklch(0.58 0.22 295)"
              colorTo="oklch(0.78 0.13 210)"
            />
            <div className="mt-3 flex justify-between border-t border-border pt-2 text-[11px]">
              <span className="text-ink-muted">Top: <span className="font-medium text-ink">12A · 94%</span></span>
              <span className="text-ink-muted">Focus: <span className="font-medium text-destructive">9C · 76%</span></span>
            </div>
          </Panel>
        </FadeUp>

        {/* Heatmap (signature) */}
        <FadeUp className="col-span-12 xl:col-span-7">
          <Panel
            title={
              <div className="flex items-center gap-2">
                <span>Daily attendance · school-wide</span>
                <Tag tint="primary">182 days</Tag>
              </div>
            }
            action={<button className="text-[10.5px] text-primary">Export</button>}
          >
            <AttendanceHeatmap />
          </Panel>
        </FadeUp>

        {/* Student risk monitor */}
        <FadeUp className="col-span-12 xl:col-span-5" delay={0.05}>
          <Panel
            title={
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-amber" />
                <span>Student risk monitor</span>
                <Tag tint="amber">12 flagged</Tag>
              </div>
            }
            action={<button className="text-[10.5px] text-primary">View all</button>}
          >
            <ul className="space-y-2">
              {RISK.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease }}
                  className="group rounded-xl border border-border bg-surface/60 p-3 transition hover:bg-background hover:shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-amber to-destructive text-[10px] font-semibold text-white">
                        {s.n.split(" ").map((p) => p[0]).join("")}
                      </div>
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
          </Panel>
        </FadeUp>
      </div>
    </DashboardLayout>
  );
}
