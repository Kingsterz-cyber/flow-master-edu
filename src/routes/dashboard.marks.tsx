import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { KPIWidget, AnalyticsCard, HeatmapWidget, AnimatedBars, RankingTable } from "@/components/dashboard/widgets";
import { Tag } from "@/components/dashboard/primitives";
import { motion } from "framer-motion";
import { ease } from "@/components/motion/primitives";
import { ClipboardList, NotebookPen, Award, AlertTriangle, Filter, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/marks")({
  head: () => ({ meta: [{ title: "Marks — EduFlow" }] }),
  component: MarksPage,
});

const ROWS = [
  ["Term 2 · Math · Grade 10-A", "Mr. Bennett", "Mar 14", 32, "Submitted", "emerald"],
  ["Term 2 · Physics · Grade 11-A", "Ms. Rossi", "Mar 13", 28, "Submitted", "emerald"],
  ["Term 2 · English · Grade 9-A", "Mr. Williams", "Mar 12", 30, "Pending review", "amber"],
  ["Term 2 · Biology · Grade 10-B", "Ms. Nair", "Mar 11", 31, "Submitted", "emerald"],
  ["Term 2 · History · Grade 9-C", "Mr. Davis", "Mar 10", 0, "Missing", "destructive"],
] as const;

function MarksPage() {
  return (
    <DashboardLayout role="dos">
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Assessments</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Marks & <span className="font-display italic text-gradient-indigo">grading</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">Review submissions, grade distribution and subject comparisons.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] text-ink hover:bg-surface"><Filter className="h-3.5 w-3.5" /> Filter</button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90"><Plus className="h-3.5 w-3.5" /> Enter marks</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <KPIWidget icon={NotebookPen} label="Submitted (term)" value={186} suffix="/210" delta="+24" tint="primary" index={0} />
        <KPIWidget icon={Award} label="Avg score" value={87.2} decimals={1} delta="+3.1" tint="emerald" index={1} />
        <KPIWidget icon={ClipboardList} label="Pending review" value={18} tint="amber" index={2} />
        <KPIWidget icon={AlertTriangle} label="Missing", value={4} trend="down" tint="violet" index={3} />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <AnalyticsCard className="col-span-12 xl:col-span-7" title="Subject performance comparison">
          <AnimatedBars
            data={[91, 88, 86, 84, 81, 89, 83, 72]}
            labels={["Math", "Phy", "Chem", "Eng", "Bio", "CS", "Bus", "Hist"]}
          />
        </AnalyticsCard>

        <AnalyticsCard className="col-span-12 xl:col-span-5" title="Grade distribution">
          <div className="space-y-2.5">
            {[
              { g: "A", v: 28 },
              { g: "B", v: 42 },
              { g: "C", v: 21 },
              { g: "D", v: 7 },
              { g: "F", v: 2 },
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

        <AnalyticsCard className="col-span-12" title="Recent submissions">
          <RankingTable
            columns={["Assessment", "Teacher", "Submitted", "Students", "Status", ""]}
            rows={ROWS.map(([n, t, d, s, st, tint]) => [
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
    </DashboardLayout>
  );
}
