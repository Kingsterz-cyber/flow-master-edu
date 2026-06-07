"use client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/components/motion/primitives";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KPIWidget, AnalyticsCard, RankingTable } from "@/components/dashboard/widgets";
import { Tag, Avatar } from "@/components/dashboard/primitives";
import {
  Users, UserPlus, Award, AlertTriangle, Search, Filter, Download,
  ChevronRight, ChevronDown, GraduationCap, Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/dashboard/students")({
  head: () => ({ meta: [{ title: "Students — EduFlow" }] }),
  component: StudentsPage,
});

/* -------- mock hierarchy -------- */
type ClassNode = {
  id: string;
  label: string;
  count: number;
  teacher: string;
  attendance: number;
  avg: number;
};
type GradeNode = { id: string; label: string; streams: ClassNode[] };
type LevelNode = { id: string; label: string; grades: GradeNode[] };

const TREE: LevelNode[] = [
  {
    id: "o", label: "O-Level",
    grades: [
      { id: "s1", label: "S1", streams: [
        { id: "s1a", label: "S1 A", count: 32, teacher: "Ms. Rossi",   attendance: 96, avg: 88 },
        { id: "s1b", label: "S1 B", count: 30, teacher: "Mr. Patel",   attendance: 94, avg: 86 },
        { id: "s1c", label: "S1 C", count: 28, teacher: "Mr. Davis",   attendance: 87, avg: 79 },
      ]},
      { id: "s2", label: "S2", streams: [
        { id: "s2a", label: "S2 A", count: 32, teacher: "Ms. Nair",    attendance: 95, avg: 90 },
        { id: "s2b", label: "S2 B", count: 31, teacher: "Mr. Bennett", attendance: 92, avg: 84 },
        { id: "s2c", label: "S2 C", count: 30, teacher: "Mr. Williams",attendance: 80, avg: 74 },
      ]},
      { id: "s3", label: "S3", streams: [
        { id: "s3a", label: "S3 A", count: 30, teacher: "Ms. Chen",    attendance: 94, avg: 88 },
        { id: "s3b", label: "S3 B", count: 29, teacher: "Mr. Owusu",   attendance: 91, avg: 82 },
      ]},
      { id: "s4", label: "S4", streams: [
        { id: "s4a", label: "S4 A", count: 28, teacher: "Mr. Bennett", attendance: 96, avg: 91 },
        { id: "s4b", label: "S4 B", count: 27, teacher: "Ms. Rossi",   attendance: 89, avg: 83 },
      ]},
    ],
  },
  {
    id: "a", label: "A-Level",
    grades: [
      { id: "s5", label: "S5", streams: [
        { id: "s5sci", label: "S5 Sciences",   count: 24, teacher: "Mr. Bennett", attendance: 97, avg: 93 },
        { id: "s5art", label: "S5 Arts",       count: 22, teacher: "Ms. Holm",    attendance: 92, avg: 86 },
      ]},
      { id: "s6", label: "S6", streams: [
        { id: "s6sci", label: "S6 Sciences",   count: 23, teacher: "Mr. Bennett", attendance: 98, avg: 95 },
        { id: "s6biz", label: "S6 Business",   count: 21, teacher: "Mr. Owusu",   attendance: 93, avg: 88 },
      ]},
    ],
  },
];

const ROSTER = (cls: ClassNode) => [
  ["#2401", "Sophia Chen", 98, 92, "Excellent", "emerald", "SC", "from-primary to-violet"],
  ["#2402", "Liam Park", 94, 86, "Good", "primary", "LP", "from-violet to-cyan"],
  ["#2403", "Ava Robinson", 89, 78, "Watch", "amber", "AR", "from-cyan to-emerald"],
  ["#2404", "Noah Kim", 72, 64, "At risk", "destructive", "NK", "from-amber to-destructive"],
  ["#2405", "Mia Patel", 96, 95, "Excellent", "emerald", "MP", "from-primary to-cyan"],
  ["#2406", "Aarav Singh", 95, 94, "Excellent", "emerald", "AS", "from-violet to-cyan"],
  ["#2407", "Ethan Brooks", 78, 66, "Watch", "amber", "EB", "from-violet to-primary"],
].slice(0, Math.min(7, cls.count));

function StudentsPage() {
  const [openLevels, setOpenLevels] = useState<Record<string, boolean>>({ o: true, a: true });
  const [openGrades, setOpenGrades] = useState<Record<string, boolean>>({ s1: true, s5: true });
  const [selected, setSelected] = useState<ClassNode>(TREE[0].grades[0].streams[0]);
  const [query, setQuery] = useState("");

  const toggleLevel = (id: string) => setOpenLevels((s) => ({ ...s, [id]: !s[id] }));
  const toggleGrade = (id: string) => setOpenGrades((s) => ({ ...s, [id]: !s[id] }));

  return (
    <DashboardLayout role="admin">
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Student directory</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            All <span className="font-display italic text-gradient-indigo">students</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">Drill down by level, grade and stream. Manage rosters and run actions.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] text-ink hover:bg-surface"><Filter className="h-3.5 w-3.5" /> Filter</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90"><UserPlus className="h-3.5 w-3.5" /> Add student</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPIWidget icon={Users} label="Total students" value={5248} delta="+128" tint="primary" index={0} />
        <KPIWidget icon={UserPlus} label="New this term" value={142} delta="+18" tint="violet" index={1} />
        <KPIWidget icon={Award} label="Honor roll" value={612} delta="+24" tint="emerald" index={2} />
        <KPIWidget icon={AlertTriangle} label="At risk" value={12} delta="−4" trend="down" tint="amber" index={3} />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* ----- Tree sidebar ----- */}
        <AnalyticsCard className="col-span-12 xl:col-span-3" title="Hierarchy">
          <div className="mb-3 flex items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1.5">
            <Search className="h-3 w-3 text-ink-muted" />
            <input
              value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search classes…"
              className="w-full bg-transparent text-[11px] outline-none placeholder:text-ink-muted"
            />
          </div>
          <ul className="space-y-1 text-[12px]">
            {TREE.map((level) => (
              <li key={level.id}>
                <button
                  onClick={() => toggleLevel(level.id)}
                  className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left font-medium text-ink hover:bg-surface"
                >
                  {openLevels[level.id] ? <ChevronDown className="h-3.5 w-3.5 text-ink-muted" /> : <ChevronRight className="h-3.5 w-3.5 text-ink-muted" />}
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span>{level.label}</span>
                  <span className="ml-auto text-[10px] text-ink-muted">{level.grades.reduce((a, g) => a + g.streams.reduce((b, s) => b + s.count, 0), 0)}</span>
                </button>
                <AnimatePresence initial={false}>
                  {openLevels[level.id] && (
                    <motion.ul
                      key={level.id}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease }}
                      className="ml-3 overflow-hidden border-l border-border pl-2"
                    >
                      {level.grades.map((grade) => {
                        const filtered = grade.streams.filter((s) => !query || s.label.toLowerCase().includes(query.toLowerCase()));
                        return (
                          <li key={grade.id}>
                            <button
                              onClick={() => toggleGrade(grade.id)}
                              className="flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 text-left text-ink-muted hover:bg-surface hover:text-ink"
                            >
                              {openGrades[grade.id] ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                              <span>{grade.label}</span>
                              <span className="ml-auto text-[10px]">{grade.streams.length} streams</span>
                            </button>
                            <AnimatePresence initial={false}>
                              {openGrades[grade.id] && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.18, ease }}
                                  className="ml-3 overflow-hidden"
                                >
                                  {filtered.map((s) => {
                                    const active = selected.id === s.id;
                                    return (
                                      <li key={s.id}>
                                        <button
                                          onClick={() => setSelected(s)}
                                          className={`group relative flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left ${active ? "font-medium text-primary" : "text-ink-muted hover:bg-surface hover:text-ink"}`}
                                        >
                                          {active && (
                                            <motion.span layoutId="tree-active" className="absolute inset-0 rounded-md bg-primary/10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                                          )}
                                          <span className="relative">{s.label}</span>
                                          <span className="relative ml-auto text-[10px] text-ink-muted">{s.count}</span>
                                        </button>
                                      </li>
                                    );
                                  })}
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </li>
                        );
                      })}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </AnalyticsCard>

        {/* ----- Class detail ----- */}
        <div className="col-span-12 xl:col-span-9 space-y-4">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
          >
            <MiniStat label="Class" value={selected.label} />
            <MiniStat label="Students" value={`${selected.count}`} />
            <MiniStat label="Attendance" value={`${selected.attendance}%`} tint="emerald" />
            <MiniStat label="Avg score" value={`${selected.avg}%`} tint="primary" />
          </motion.div>

          <AnalyticsCard
            title={<div className="flex items-center gap-2"><span>{selected.label} · roster</span><Tag tint="primary">Class teacher · {selected.teacher}</Tag></div>}
            action={
              <div className="flex items-center gap-1.5">
                <button className="rounded-md border border-border bg-surface px-2 py-1 text-[10.5px] text-ink hover:bg-background"><Download className="inline h-3 w-3" /> Export</button>
                <button className="rounded-md bg-primary/10 px-2 py-1 text-[10.5px] font-medium text-primary"><Sparkles className="inline h-3 w-3" /> Generate report</button>
              </div>
            }
          >
            <RankingTable
              columns={["ID", "Student", "Attendance", "Avg", "Status", ""]}
              rows={ROSTER(selected).map(([id, n, att, avg, st, tint, ini, av]) => [
                <span key="i" className="font-mono text-[10.5px] text-ink-muted">{id}</span>,
                <div key="n" className="flex items-center gap-2">
                  <Avatar initials={ini as string} tint={av as string} />
                  <span className="font-medium">{n}</span>
                </div>,
                <div key="a" className="flex items-center gap-2">
                  <div className="h-1 w-14 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${att}%` }} />
                  </div>
                  <span className="text-[11px]">{att}%</span>
                </div>,
                <span key="v" className="font-semibold">{avg}%</span>,
                <Tag key="s" tint={tint as any}>{st}</Tag>,
                <div key="b" className="flex items-center gap-1">
                  <button className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">View</button>
                  <button className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">Transfer</button>
                </div>,
              ])}
            />
          </AnalyticsCard>
        </div>
      </div>
    </DashboardLayout>
  );
}

function MiniStat({ label, value, tint = "ink" }: { label: string; value: string; tint?: "ink" | "emerald" | "primary" }) {
  const color = tint === "emerald" ? "text-emerald" : tint === "primary" ? "text-primary" : "text-ink";
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-soft">
      <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">{label}</div>
      <div className={`mt-1 text-lg font-semibold tracking-tight ${color}`}>{value}</div>
    </div>
  );
}
