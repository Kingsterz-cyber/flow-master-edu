import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { BookOpen, Users, Award, Activity } from "lucide-react";

export const Route = createFileRoute("/dashboard/classes")({
  head: () => ({ meta: [{ title: "Classes — EduFlow" }] }),
  component: ClassesPage,
});

const ROWS = [
  ["Grade 9-A", "Ms. Rossi", 32, 96, 89, "Excellent", "emerald"],
  ["Grade 9-B", "Mr. Patel", 30, 94, 87, "Good", "primary"],
  ["Grade 9-C", "Mr. Davis", 28, 76, 72, "Focus", "destructive"],
  ["Grade 10-A", "Ms. Nair", 34, 94, 92, "Excellent", "emerald"],
  ["Grade 10-B", "Mr. Patel", 31, 84, 81, "Watch", "amber"],
  ["Grade 11-A", "Mr. Williams", 29, 91, 88, "Good", "primary"],
  ["Grade 11-B", "Ms. Chen", 27, 88, 86, "Good", "primary"],
  ["Grade 12-A", "Mr. Bennett", 26, 96, 94, "Top", "emerald"],
] as const;

function ClassesPage() {
  return (
    <ModulePage
      role="dos"
      eyebrow="Academic structure"
      title={<>All <span className="font-display italic text-gradient-indigo">classes</span></>}
      description="Manage O-Level and A-Level classes, view attendance and performance."
      primaryAction="Create class"
      filters={["All", "O-Level", "A-Level", "Needs focus"]}
      kpis={[
        { icon: BookOpen, label: "Active classes", value: 184, delta: "+4", tint: "primary" },
        { icon: Users, label: "Avg class size", value: 29.4, decimals: 1, tint: "violet" },
        { icon: Award, label: "Avg performance", value: 86.5, decimals: 1, delta: "+2.3", tint: "emerald" },
        { icon: Activity, label: "Attendance", value: 91.8, suffix: "%", decimals: 1, delta: "+1.4%", tint: "cyan" },
      ]}
      columns={["Class", "Teacher", "Students", "Attendance", "Avg", "Status", ""]}
      rows={ROWS.map(([c, t, s, a, v, st, tint]) => [
        <span key="c" className="font-medium">{c}</span>,
        <span key="t" className="text-ink-muted">{t}</span>,
        <span key="s">{s}</span>,
        <span key="a">{a}%</span>,
        <span key="v" className="font-semibold">{v}</span>,
        <Tag key="st" tint={tint as any}>{st}</Tag>,
        <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">Open</button>,
      ])}
    />
  );
}
