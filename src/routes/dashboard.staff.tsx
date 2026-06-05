import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { Avatar } from "@/components/dashboard/primitives";
import { GraduationCap, Users, ShieldCheck, Clock } from "lucide-react";

export const Route = createFileRoute("/dashboard/staff")({
  head: () => ({ meta: [{ title: "Staff — EduFlow" }] }),
  component: StaffPage,
});

const ROWS = [
  ["Daniel Owusu", "DOS", "Academics", "Active", 96, "DO", "from-violet to-cyan"],
  ["Marcus Bennett", "Teacher", "Mathematics", "Active", 94, "MB", "from-primary to-violet"],
  ["Elena Rossi", "Teacher", "Physics", "Active", 91, "ER", "from-violet to-cyan"],
  ["Jordan Williams", "Teacher", "English", "Active", 88, "JW", "from-cyan to-emerald"],
  ["Priya Nair", "Teacher", "Biology", "Active", 90, "PN", "from-amber to-violet"],
  ["Liam Chen", "Teacher", "Chemistry", "On leave", 78, "LC", "from-cyan to-violet"],
  ["Sara Holm", "Teacher", "History", "Pending", 0, "SH", "from-amber to-destructive"],
] as const;

function StaffPage() {
  return (
    <ModulePage
      role="admin"
      eyebrow="Staff management"
      title={<>School <span className="font-display italic text-gradient-indigo">staff</span></>}
      description="Manage teachers, the Director of Studies and admin staff."
      primaryAction="Invite staff"
      filters={["All", "Teachers", "DOS", "Pending", "On leave"]}
      kpis={[
        { icon: GraduationCap, label: "Total Teachers", value: 312, delta: "+6", tint: "violet" },
        { icon: ShieldCheck, label: "DOS / Leaders", value: 8, tint: "primary" },
        { icon: Users, label: "Active today", value: 287, suffix: "/312", tint: "emerald" },
        { icon: Clock, label: "Pending invites", value: 4, tint: "amber", trend: "down" },
      ]}
      columns={["Name", "Role", "Department", "Status", "Activity", ""]}
      rows={ROWS.map(([n, r, d, st, act, ini, tint]) => [
        <div key="n" className="flex items-center gap-2">
          <Avatar initials={ini as string} tint={tint as string} />
          <span className="font-medium">{n}</span>
        </div>,
        <span key="r" className="text-ink-muted">{r}</span>,
        <span key="d" className="text-ink-muted">{d}</span>,
        <Tag key="st" tint={st === "Active" ? "emerald" : st === "Pending" ? "amber" : "ink"}>{st}</Tag>,
        <span key="a">{act}%</span>,
        <button key="b" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">Manage</button>,
      ])}
    />
  );
}
