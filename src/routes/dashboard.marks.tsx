"use client";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ease } from "@/components/motion/primitives";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KPIWidget, AnalyticsCard, HeatmapWidget, AnimatedBars, RankingTable } from "@/components/dashboard/widgets";
import { Tag } from "@/components/dashboard/primitives";
import { ClipboardList, NotebookPen, Award, AlertTriangle, Filter, Plus, Save, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/marks")({
  head: () => ({ meta: [{ title: "Marks — EduFlow" }] }),
  component: MarksPage,
});

const RECENT = [
  ["Term 2 · Math · Grade 10-A", "Mr. Bennett", "Mar 14", 32, "Submitted", "emerald"],
  ["Term 2 · Physics · Grade 11-A", "Ms. Rossi", "Mar 13", 28, "Submitted", "emerald"],
  ["Term 2 · English · Grade 9-A", "Mr. Williams", "Mar 12", 30, "Pending review", "amber"],
  ["Term 2 · Biology · Grade 10-B", "Ms. Nair", "Mar 11", 31, "Submitted", "emerald"],
  ["Term 2 · History · Grade 9-C", "Mr. Davis", "Mar 10", 0, "Missing", "destructive"],
] as const;

const STUDENTS = [
  { id: "#2401", name: "Sophia Chen" },
  { id: "#2402", name: "Liam Park" },
  { id: "#2403", name: "Ava Robinson" },
  { id: "#2404", name: "Noah Kim" },
  { id: "#2405", name: "Mia Patel" },
  { id: "#2406", name: "Aarav Singh" },
  { id: "#2407", name: "Ethan Brooks" },
];

const ASSESSMENTS = [
  { key: "cat1", label: "CAT 1", max: 20 },
  { key: "cat2", label: "CAT 2", max: 20 },
  { key: "quiz", label: "Quiz",  max: 10 },
  { key: "exam", label: "Exam",  max: 50 },
];

const TABS = ["Overview", "Marks entry", "Submissions"] as const;
type Tab = typeof TABS[number];

function gradeOf(pct: number) {
  if (pct >= 80) return { g: "A", tint: "emerald" as const };
  if (pct >= 70) return { g: "B", tint: "primary" as const };
  if (pct >= 60) return { g: "C", tint: "violet" as const };
  if (pct >= 50) return { g: "D", tint: "amber" as const };
  return { g: "F", tint: "destructive" as const };
}

function MarksPage() {
  const [tab, setTab] = useState<Tab>("Overview");

  return (
    <DashboardLayout role="dos">
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Assessments</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Marks &amp; <span className="font-display italic text-gradient-indigo">grading</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">Review submissions, grade distribution and enter new scores.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] text-ink hover:bg-surface"><Filter className="h-3.5 w-3.5" /> Filter</button>
          <button onClick={() => setTab("Marks entry")} className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90"><Plus className="h-3.5 w-3.5" /> Enter marks</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPIWidget icon={NotebookPen} label="Submitted (term)" value={186} suffix="/210" delta="+24" tint="primary" index={0} />
        <KPIWidget icon={Award} label="Avg score" value={87.2} decimals={1} delta="+3.1" tint="emerald" index={1} />
        <KPIWidget icon={ClipboardList} label="Pending review" value={18} tint="amber" index={2} />
        <KPIWidget icon={AlertTriangle} label="Missing" value={4} trend="down" tint="violet" index={3} />
      </div>

      {/* Tabs */}
      <div className="mt-6 inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1 shadow-soft">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className="relative rounded-lg px-3 py-1.5 text-[12px] font-medium">
            {tab === t && (
              <motion.span layoutId="marks-tab" className="absolute inset-0 rounded-lg bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
            )}
            <span className={`relative ${tab === t ? "text-background" : "text-ink-muted"}`}>{t}</span>
          </button>
        ))}
      </div>

      {tab === "Overview" && <OverviewPanel />}
      {tab === "Marks entry" && <EntryPanel />}
      {tab === "Submissions" && <SubmissionsPanel />}
    </DashboardLayout>
  );
}

function OverviewPanel() {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4">
      <AnalyticsCard className="col-span-12 xl:col-span-7" title="Subject performance comparison">
        <AnimatedBars data={[91, 88, 86, 84, 81, 89, 83, 72]} labels={["Math", "Phy", "Chem", "Eng", "Bio", "CS", "Bus", "Hist"]} />
      </AnalyticsCard>

      <AnalyticsCard className="col-span-12 xl:col-span-5" title="Grade distribution">
        <div className="space-y-2.5">
          {[
            { g: "A", v: 28 }, { g: "B", v: 42 }, { g: "C", v: 21 }, { g: "D", v: 7 }, { g: "F", v: 2 },
          ].map((r, i) => (
            <div key={r.g}>
              <div className="flex justify-between text-[11px]">
                <span className="text-ink">Grade {r.g}</span>
                <span className="font-semibold text-ink">{r.v}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                <motion.div
                  initial={{ width: 0 }} whileInView={{ width: `${r.v}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.05, ease }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-violet"
                />
              </div>
            </div>
          ))}
        </div>
      </AnalyticsCard>

      <AnalyticsCard className="col-span-12" title="Marks submission activity">
        <HeatmapWidget weeks={26} seed={11} label="Last 26 weeks · marks submitted per day" />
      </AnalyticsCard>
    </div>
  );
}

function SubmissionsPanel() {
  return (
    <div className="mt-4">
      <AnalyticsCard title="Recent submissions">
        <RankingTable
          columns={["Assessment", "Teacher", "Submitted", "Students", "Status", ""]}
          rows={RECENT.map(([n, t, d, s, st, tint]) => [
            <span key="n" className="font-medium">{n}</span>,
            <span key="t" className="text-ink-muted">{t}</span>,
            <span key="d" className="text-ink-muted">{d}</span>,
            <span key="s">{s || "—"}</span>,
            <Tag key="st" tint={tint as any}>{st}</Tag>,
            <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">Review</button>,
          ])}
        />
      </AnalyticsCard>
    </div>
  );
}

function EntryPanel() {
  const [klass, setKlass] = useState("Grade 10-A");
  const [subject, setSubject] = useState("Mathematics");
  const [scores, setScores] = useState<Record<string, Record<string, number>>>(() =>
    Object.fromEntries(STUDENTS.map((s) => [s.id, { cat1: 16, cat2: 14, quiz: 8, exam: 38 }]))
  );

  const totalMax = useMemo(() => ASSESSMENTS.reduce((a, b) => a + b.max, 0), []);

  const update = (sid: string, key: string, raw: string) => {
    const max = ASSESSMENTS.find((a) => a.key === key)!.max;
    const n = Math.max(0, Math.min(max, Number(raw) || 0));
    setScores((s) => ({ ...s, [sid]: { ...s[sid], [key]: n } }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}
      className="mt-4 space-y-4"
    >
      <AnalyticsCard
        title="New assessment session"
        action={
          <div className="flex items-center gap-1.5">
            <button className="rounded-md border border-border bg-surface px-2 py-1 text-[10.5px] text-ink hover:bg-background">Save draft</button>
            <button className="inline-flex items-center gap-1 rounded-md bg-ink px-2 py-1 text-[10.5px] font-medium text-background hover:bg-ink/90"><Save className="h-3 w-3" /> Submit results</button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Selector label="Class" value={klass} onChange={setKlass} options={["Grade 9-A","Grade 9-B","Grade 10-A","Grade 10-B","Grade 11-A"]} />
          <Selector label="Subject" value={subject} onChange={setSubject} options={["Mathematics","Physics","Chemistry","Biology","English","History","Computer Science"]} />
          <Selector label="Term" value="Term 2" onChange={() => {}} options={["Term 1","Term 2","Term 3"]} />
          <Selector label="Assessment type" value="Mid-term" onChange={() => {}} options={["CAT","Quiz","Assignment","Mid-term","Final exam"]} />
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-[12px]">
            <thead className="bg-surface/60 text-[10.5px] uppercase tracking-wider text-ink-muted">
              <tr>
                <th className="px-3 py-2 text-left">Student</th>
                {ASSESSMENTS.map((a) => (
                  <th key={a.key} className="px-3 py-2 text-right">
                    {a.label}<span className="text-ink-muted/70"> /{a.max}</span>
                  </th>
                ))}
                <th className="px-3 py-2 text-right">Total /{totalMax}</th>
                <th className="px-3 py-2 text-right">Avg</th>
                <th className="px-3 py-2 text-right">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {STUDENTS.map((s, i) => {
                const row = scores[s.id];
                const total = ASSESSMENTS.reduce((a, b) => a + (row[b.key] || 0), 0);
                const pct = (total / totalMax) * 100;
                const g = gradeOf(pct);
                return (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.3, ease }}
                    className="hover:bg-surface/60"
                  >
                    <td className="px-3 py-2">
                      <div className="font-medium text-ink">{s.name}</div>
                      <div className="font-mono text-[10px] text-ink-muted">{s.id}</div>
                    </td>
                    {ASSESSMENTS.map((a) => (
                      <td key={a.key} className="px-3 py-1.5 text-right">
                        <input
                          type="number" min={0} max={a.max}
                          value={row[a.key]}
                          onChange={(e) => update(s.id, a.key, e.target.value)}
                          className="w-14 rounded-md border border-border bg-background px-2 py-1 text-right text-[12px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right font-semibold text-ink">{total}</td>
                    <td className="px-3 py-2 text-right text-ink-muted">{pct.toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right"><Tag tint={g.tint}>{g.g}</Tag></td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-[11.5px] text-ink-muted">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          EduFlow AI will flag any student whose score drops more than 15% vs the previous assessment.
        </div>
      </AnalyticsCard>
    </motion.div>
  );
}

function Selector({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[10.5px] uppercase tracking-wider text-ink-muted">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-2 text-[12.5px] text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
