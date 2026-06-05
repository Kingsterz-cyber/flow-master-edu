import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { BookMarked, GraduationCap, TrendingUp, Award } from "lucide-react";

export const Route = createFileRoute("/dashboard/subjects")({
  head: () => ({ meta: [{ title: "Subjects — EduFlow" }] }),
  component: SubjectsPage,
});

const ROWS = [
  ["Mathematics", "Sciences", 8, 24, 91, "+2.4", "emerald"],
  ["Physics", "Sciences", 6, 18, 88, "+1.8", "emerald"],
  ["Chemistry", "Sciences", 6, 18, 86, "+0.6", "primary"],
  ["Biology", "Sciences", 5, 16, 81, "+1.2", "primary"],
  ["English", "Languages", 7, 22, 84, "+0.4", "primary"],
  ["History", "Humanities", 4, 12, 72, "−1.1", "destructive"],
  ["Computer Science", "ICT", 5, 14, 89, "+3.2", "emerald"],
  ["Business", "Business", 3, 9, 83, "+0.8", "primary"],
] as const;

function SubjectsPage() {
  return (
    <ModulePage
      role="dos"
      eyebrow="Curriculum"
      title={<>School <span className="font-display italic text-gradient-indigo">subjects</span></>}
      description="Subject performance, assigned teachers and class coverage."
      primaryAction="Add subject"
      filters={["All", "Sciences", "Languages", "Humanities", "ICT", "Business"]}
      kpis={[
        { icon: BookMarked, label: "Total subjects", value: 24, tint: "primary" },
        { icon: GraduationCap, label: "Assigned teachers", value: 312, tint: "violet" },
        { icon: TrendingUp, label: "Avg trend", value: 1.6, decimals: 1, delta: "+", tint: "emerald" },
        { icon: Award, label: "Top subject", value: 91, suffix: " · Math", tint: "amber" },
      ]}
      columns={["Subject", "Department", "Teachers", "Classes", "Avg score", "Trend", ""]}
      rows={ROWS.map(([s, d, t, c, v, tr, tint]) => [
        <span key="s" className="font-medium">{s}</span>,
        <span key="d" className="text-ink-muted">{d}</span>,
        <span key="t">{t}</span>,
        <span key="c">{c}</span>,
        <span key="v" className="font-semibold">{v}</span>,
        <Tag key="tr" tint={tint as any}>{tr}</Tag>,
        <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">View</button>,
      ])}
    />
  );
}
