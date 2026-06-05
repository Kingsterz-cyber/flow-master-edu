import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { FileText, Download, BarChart3, Calendar } from "lucide-react";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({ meta: [{ title: "Reports — EduFlow" }] }),
  component: ReportsPage,
});

const ROWS = [
  ["Term 2 Academic Summary", "School-wide", "PDF · 4.2 MB", "Mar 14, 2026", "Ready"],
  ["Grade 10 Attendance Report", "Grade 10", "PDF · 1.8 MB", "Mar 13, 2026", "Ready"],
  ["Subject Performance · Math", "Mathematics", "XLSX · 612 KB", "Mar 12, 2026", "Ready"],
  ["Teacher Activity Report", "All teachers", "PDF · 2.3 MB", "Mar 10, 2026", "Ready"],
  ["At-Risk Student Report", "12 students", "PDF · 980 KB", "Mar 09, 2026", "Generating"],
] as const;

function ReportsPage() {
  return (
    <ModulePage
      role="admin"
      eyebrow="Reports & exports"
      title={<>Generate & download <span className="font-display italic text-gradient-indigo">reports</span></>}
      description="Academic summaries, attendance, performance and custom exports."
      primaryAction="New report"
      filters={["All", "Academic", "Attendance", "Performance"]}
      kpis={[
        { icon: FileText, label: "Reports generated", value: 74, delta: "+12", tint: "primary" },
        { icon: Download, label: "Downloads (30d)", value: 2480, delta: "+18%", tint: "violet" },
        { icon: BarChart3, label: "Scheduled", value: 8, tint: "cyan" },
        { icon: Calendar, label: "Next run", value: 1, suffix: "d", tint: "emerald" },
      ]}
      columns={["Name", "Scope", "Format", "Generated", "Status", ""]}
      rows={ROWS.map(([n, s, f, g, st]) => [
        <span key="n" className="font-medium">{n}</span>,
        <span key="s" className="text-ink-muted">{s}</span>,
        <span key="f" className="text-ink-muted">{f}</span>,
        <span key="g" className="text-ink-muted">{g}</span>,
        <Tag key="st" tint={st === "Ready" ? "emerald" : "amber"}>{st}</Tag>,
        <button key="b" className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">
          <Download className="h-3 w-3" /> Download
        </button>,
      ])}
    />
  );
}
