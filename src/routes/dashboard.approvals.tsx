import { createFileRoute } from "@tanstack/react-router";
import { ModulePage, Tag } from "@/components/dashboard/ModulePage";
import { Avatar } from "@/components/dashboard/primitives";
import { UserCheck, Clock, GraduationCap, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard/approvals")({
  head: () => ({ meta: [{ title: "Approvals — EduFlow" }] }),
  component: ApprovalsPage,
});

const ROWS = [
  ["Sara Holm", "Teacher · History", "Pending", "2 hours ago", "SH", "from-amber to-destructive"],
  ["Mateo Diaz", "Teacher · Spanish", "Pending", "5 hours ago", "MD", "from-violet to-cyan"],
  ["Hannah Lee", "Student · Grade 9", "Pending", "1 day ago", "HL", "from-primary to-violet"],
  ["Omar Farouk", "Student · Grade 11", "Pending", "1 day ago", "OF", "from-cyan to-emerald"],
  ["Yuki Tanaka", "Teacher · Art", "Pending", "2 days ago", "YT", "from-violet to-primary"],
] as const;

function ApprovalsPage() {
  return (
    <ModulePage
      role="admin"
      eyebrow="Approvals queue"
      title={<>User <span className="font-display italic text-gradient-indigo">approvals</span></>}
      description="Review and approve teachers and students requesting access."
      primaryAction="Bulk approve"
      filters={["All", "Teachers", "Students", "Older than 24h"]}
      kpis={[
        { icon: UserCheck, label: "Pending", value: 14, tint: "amber" },
        { icon: GraduationCap, label: "Teachers pending", value: 4, tint: "violet" },
        { icon: Users, label: "Students pending", value: 10, tint: "primary" },
        { icon: Clock, label: "Avg wait time", value: 6, suffix: "h", tint: "cyan" },
      ]}
      columns={["Name", "Role", "Status", "Requested", "", ""]}
      rows={ROWS.map(([n, r, st, when, ini, tint]) => [
        <div key="n" className="flex items-center gap-2">
          <Avatar initials={ini as string} tint={tint as string} />
          <span className="font-medium">{n}</span>
        </div>,
        <span key="r" className="text-ink-muted">{r}</span>,
        <Tag key="st" tint="amber">{st}</Tag>,
        <span key="w" className="text-ink-muted">{when}</span>,
        <button key="a" className="rounded-md bg-emerald px-2 py-1 text-[10px] font-medium text-white">Approve</button>,
        <button key="r2" className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">Reject</button>,
      ])}
    />
  );
}
