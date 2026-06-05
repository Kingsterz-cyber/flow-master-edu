import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { Avatar } from "@/components/dashboard/primitives";
import { Users, UserPlus, AlertTriangle, Award } from "lucide-react";

export const Route = createFileRoute("/dashboard/students")({
  head: () => ({ meta: [{ title: "Students — EduFlow" }] }),
  component: StudentsPage,
});

const ROWS = [
  ["Sophia Chen", "Grade 9-A", 98, 92, "Excellent", "emerald", "SC", "from-primary to-violet"],
  ["Liam Park", "Grade 10-B", 94, 86, "Good", "primary", "LP", "from-violet to-cyan"],
  ["Ava Robinson", "Grade 11-A", 89, 78, "Watch", "amber", "AR", "from-cyan to-emerald"],
  ["Noah Kim", "Grade 9-C", 72, 64, "At risk", "destructive", "NK", "from-amber to-destructive"],
  ["Mia Patel", "Grade 12-A", 96, 95, "Excellent", "emerald", "MP", "from-primary to-cyan"],
  ["Aarav Singh", "Grade 10-A", 95, 94, "Excellent", "emerald", "AS", "from-violet to-cyan"],
  ["Lina Park", "Grade 9-A", 69, 63, "At risk", "destructive", "LK", "from-primary to-cyan"],
  ["Ethan Brooks", "Grade 11-A", 78, 66, "Watch", "amber", "EB", "from-violet to-primary"],
] as const;

function StudentsPage() {
  return (
    <ModulePage
      role="admin"
      eyebrow="Student directory"
      title={<>All <span className="font-display italic text-gradient-indigo">students</span></>}
      description="O-Level and A-Level students across all classes and grades."
      primaryAction="Add student"
      filters={["All", "O-Level", "A-Level", "At risk", "New"]}
      kpis={[
        { icon: Users, label: "Total Students", value: 5248, delta: "+128", tint: "primary" },
        { icon: UserPlus, label: "New this term", value: 142, delta: "+18", tint: "violet" },
        { icon: Award, label: "Honor roll", value: 612, delta: "+24", tint: "emerald" },
        { icon: AlertTriangle, label: "At risk", value: 12, delta: "−4", trend: "down", tint: "amber" },
      ]}
      columns={["Student", "Class", "Attendance", "Avg score", "Status", ""]}
      rows={ROWS.map(([n, c, a, s, st, tint, ini, av]) => [
        <div key="n" className="flex items-center gap-2">
          <Avatar initials={ini as string} tint={av as string} />
          <div>
            <div className="font-medium">{n}</div>
            <div className="text-[10px] text-ink-muted">id #{Math.floor(Math.random() * 9000 + 1000)}</div>
          </div>
        </div>,
        <span key="c" className="text-ink-muted">{c}</span>,
        <div key="a" className="flex items-center gap-2">
          <div className="h-1 w-14 overflow-hidden rounded-full bg-surface">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${a}%` }} />
          </div>
          <span>{a}%</span>
        </div>,
        <span key="s" className="font-semibold">{s}</span>,
        <Tag key="st" tint={tint as any}>{st}</Tag>,
        <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">View</button>,
      ])}
    />
  );
}
