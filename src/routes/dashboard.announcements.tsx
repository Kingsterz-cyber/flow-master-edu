import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { Bell, Send, Users, Pin } from "lucide-react";

export const Route = createFileRoute("/dashboard/announcements")({
  head: () => ({ meta: [{ title: "Announcements — EduFlow" }] }),
  component: AnnouncementsPage,
});

const ROWS = [
  ["Spring break schedule released", "All users", "Apr 5–13", "Mar 14", "Published"],
  ["New AI lab inaugurated", "Grades 9–12", "Weekly rotations", "Mar 12", "Published"],
  ["Updated transport routes", "Parents", "Routes 4, 7", "Mar 10", "Published"],
  ["Term 2 exam timetable", "Students", "Mar 27 onwards", "Mar 08", "Scheduled"],
  ["Science fair sign-ups", "Students", "Closes Mar 20", "Mar 05", "Published"],
] as const;

function AnnouncementsPage() {
  return (
    <ModulePage
      role="admin"
      eyebrow="Communications"
      title={<>School <span className="font-display italic text-gradient-indigo">announcements</span></>}
      description="Reach students, teachers and parents with targeted updates."
      primaryAction="New announcement"
      filters={["All", "Published", "Scheduled", "Drafts"]}
      kpis={[
        { icon: Bell, label: "Sent (30d)", value: 18, delta: "+4", tint: "primary" },
        { icon: Send, label: "Open rate", value: 72.4, suffix: "%", decimals: 1, delta: "+3%", tint: "emerald" },
        { icon: Users, label: "Recipients", value: 5560, delta: "+128", tint: "violet" },
        { icon: Pin, label: "Pinned", value: 3, tint: "amber" },
      ]}
      columns={["Title", "Audience", "Detail", "Sent", "Status", ""]}
      rows={ROWS.map(([t, a, d, s, st]) => [
        <span key="t" className="font-medium">{t}</span>,
        <span key="a" className="text-ink-muted">{a}</span>,
        <span key="d" className="text-ink-muted">{d}</span>,
        <span key="s" className="text-ink-muted">{s}</span>,
        <Tag key="st" tint={st === "Published" ? "emerald" : "amber"}>{st}</Tag>,
        <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">Edit</button>,
      ])}
    />
  );
}
