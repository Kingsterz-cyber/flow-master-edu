import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KPIWidget, AnalyticsCard, HeatmapWidget, DashboardChart, RankingTable } from "@/components/dashboard/widgets";
import { Tag } from "@/components/dashboard/primitives";
import { motion } from "framer-motion";
import { ease, Counter } from "@/components/motion/primitives";
import { CalendarCheck, Users, AlertTriangle, TrendingUp, Filter, Download } from "lucide-react";

export const Route = createFileRoute("/dashboard/attendance")({
  head: () => ({ meta: [{ title: "Attendance — EduFlow" }] }),
  component: AttendancePage,
});

const ROWS = [
  ["Grade 12-A", "Mr. Bennett", 96, "Excellent", "emerald"],
  ["Grade 10-A", "Ms. Nair", 94, "Excellent", "emerald"],
  ["Grade 9-A", "Ms. Rossi", 92, "Good", "primary"],
  ["Grade 11-A", "Mr. Williams", 91, "Good", "primary"],
  ["Grade 10-B", "Mr. Patel", 84, "Watch", "amber"],
  ["Grade 9-C", "Mr. Davis", 76, "Focus", "destructive"],
] as const;

function AttendancePage() {
  return (
    <DashboardLayout role="dos">
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Daily attendance</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            School-wide <span className="font-display italic text-gradient-indigo">attendance</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">Today's check-ins, trends and class rankings.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] text-ink hover:bg-surface"><Filter className="h-3.5 w-3.5" /> Filter</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90"><Download className="h-3.5 w-3.5" /> Export</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPIWidget icon={CalendarCheck} label="Today's attendance" value={96.4} suffix="%" decimals={1} delta="+1.2%" tint="emerald" index={0} />
        <KPIWidget icon={Users} label="Checked in" value={5056} suffix="/5248" delta="+128" tint="primary" index={1} />
        <KPIWidget icon={AlertTriangle} label="Absent" value={192} delta="−24" trend="down" tint="amber" index={2} />
        <KPIWidget icon={TrendingUp} label="Weekly trend" value={2.1} suffix="%" decimals={1} delta="+", tint="violet" index={3} />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <AnalyticsCard className="col-span-12 xl:col-span-7" title="Attendance trend">
          <div className="text-2xl font-semibold text-ink"><Counter to={96.4} suffix="%" decimals={1} /></div>
          <div className="text-[10.5px] text-ink-muted">12-month school-wide attendance</div>
          <div className="mt-3 h-48">
            <DashboardChart data={[88, 90, 91, 89, 92, 93, 91, 94, 93, 95, 96, 96]} gradientId="attA" color="oklch(0.7 0.2 165)" />
          </div>
        </AnalyticsCard>

        <AnalyticsCard className="col-span-12 xl:col-span-5" title="Top classes (attendance)">
          <RankingTable
            columns={["Class", "Teacher", "Rate", "Status"]}
            rows={ROWS.map(([c, t, r, st, tint]) => [
              <span key="c" className="font-medium">{c}</span>,
              <span key="t" className="text-ink-muted">{t}</span>,
              <span key="r" className="font-semibold">{r}%</span>,
              <Tag key="st" tint={tint as any}>{st}</Tag>,
            ])}
          />
        </AnalyticsCard>

        <AnalyticsCard className="col-span-12" title="Daily attendance heatmap · last 26 weeks">
          <HeatmapWidget weeks={26} seed={4} />
        </AnalyticsCard>
      </div>
    </DashboardLayout>
  );
}
