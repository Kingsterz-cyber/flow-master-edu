import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { Avatar } from "@/components/dashboard/primitives";
import { GraduationCap, NotebookPen, CalendarCheck, FileText } from "lucide-react";

export const Route = createFileRoute("/dashboard/teacher-performance")({
  head: () => ({ meta: [{ title: "Teacher performance — EduFlow" }] }),
  component: TeacherPerfPage,
});

const ROWS = [
  ["Marcus Bennett", "Mathematics", 6, 96, 94, "Top", "emerald", "MB", "from-primary to-violet"],
  ["Elena Rossi", "Physics", 5, 93, 91, "Excellent", "emerald", "ER", "from-violet to-cyan"],
  ["Priya Nair", "Biology", 4, 91, 88, "Excellent", "emerald", "PN", "from-amber to-violet"],
  ["Jordan Williams", "English", 7, 89, 87, "Good", "primary", "JW", "from-cyan to-emerald"],
  ["Liam Chen", "Chemistry", 4, 78, 79, "Watch", "amber", "LC", "from-cyan to-violet"],
  ["Sara Holm", "History", 3, 62, 70, "Focus", "destructive", "SH", "from-amber to-destructive"],
] as const;

function TeacherPerfPage() {
  return (
    <ModulePage
      role="dos"
      eyebrow="Performance"
      title={<>Teacher <span className="font-display italic text-gradient-indigo">performance</span></>}
      description="Activity score combines attendance submissions, marks on time and report completion."
      primaryAction="Generate review"
      filters={["All", "Top", "Watch", "Focus"]}
      kpis={[
        { icon: GraduationCap, label: "Active teachers", value: 312, delta: "+6", tint: "primary" },
        { icon: NotebookPen, label: "Marks on time", value: 86, suffix: "%", delta: "+4%", tint: "violet" },
        { icon: CalendarCheck, label: "Attendance subs.", value: 98, suffix: "%", delta: "+2%", tint: "emerald" },
        { icon: FileText, label: "Reports generated", value: 74, delta: "+12", tint: "amber" },
      ]}
      columns={["Teacher", "Subject", "Classes", "Activity", "Avg score", "Status", ""]}
      rows={ROWS.map(([n, s, c, a, v, st, tint, ini, av]) => [
        <div key="n" className="flex items-center gap-2">
          <Avatar initials={ini as string} tint={av as string} />
          <span className="font-medium">{n}</span>
        </div>,
        <span key="s" className="text-ink-muted">{s}</span>,
        <span key="c">{c}</span>,
        <div key="a" className="flex items-center gap-2">
          <div className="h-1 w-14 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${a}%` }} />
          </div>
          <span>{a}%</span>
        </div>,
        <span key="v" className="font-semibold">{v}</span>,
        <Tag key="st" tint={tint as any}>{st}</Tag>,
        <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">View</button>,
      ])}
    />
  );
}
