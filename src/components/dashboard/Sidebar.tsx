import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, CalendarCheck, ClipboardList,
  BarChart3, FileText, Bell, Settings, LifeBuoy, School, ChevronDown, Sparkles,
  Calendar, Trophy, TrendingUp, NotebookPen, ListChecks, FileBarChart, BookMarked,
} from "lucide-react";
import { useState } from "react";

type Role = "admin" | "teacher" | "student";

const NAV: Record<Role, { label: string; items: { to: string; icon: any; label: string; badge?: string }[] }[]> = {
  admin: [
    {
      label: "Overview",
      items: [
        { to: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/dashboard/admin", icon: BarChart3, label: "Analytics" },
      ],
    },
    {
      label: "Manage",
      items: [
        { to: "/dashboard/admin", icon: Users, label: "Students", badge: "5.2k" },
        { to: "/dashboard/admin", icon: GraduationCap, label: "Teachers" },
        { to: "/dashboard/admin", icon: BookOpen, label: "Classes" },
        { to: "/dashboard/admin", icon: BookMarked, label: "Subjects" },
        { to: "/dashboard/admin", icon: CalendarCheck, label: "Attendance" },
        { to: "/dashboard/admin", icon: ClipboardList, label: "Marks" },
      ],
    },
    {
      label: "Insights",
      items: [
        { to: "/dashboard/admin", icon: FileText, label: "Reports" },
        { to: "/dashboard/admin", icon: Bell, label: "Announcements" },
      ],
    },
  ],
  teacher: [
    {
      label: "Today",
      items: [
        { to: "/dashboard/teacher", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/dashboard/teacher", icon: ListChecks, label: "Tasks", badge: "3" },
      ],
    },
    {
      label: "Teaching",
      items: [
        { to: "/dashboard/teacher", icon: BookOpen, label: "My Classes" },
        { to: "/dashboard/teacher", icon: Users, label: "Students" },
        { to: "/dashboard/teacher", icon: CalendarCheck, label: "Attendance" },
        { to: "/dashboard/teacher", icon: NotebookPen, label: "Marks" },
      ],
    },
    {
      label: "Insights",
      items: [
        { to: "/dashboard/teacher", icon: BarChart3, label: "Performance" },
        { to: "/dashboard/teacher", icon: FileBarChart, label: "Reports" },
      ],
    },
  ],
  student: [
    {
      label: "Me",
      items: [
        { to: "/dashboard/student", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/dashboard/student", icon: TrendingUp, label: "Progress" },
      ],
    },
    {
      label: "Academics",
      items: [
        { to: "/dashboard/student", icon: BookOpen, label: "Subjects" },
        { to: "/dashboard/student", icon: Calendar, label: "Timetable" },
        { to: "/dashboard/student", icon: Trophy, label: "Results" },
        { to: "/dashboard/student", icon: CalendarCheck, label: "Attendance" },
      ],
    },
    {
      label: "More",
      items: [
        { to: "/dashboard/student", icon: FileText, label: "Report Card" },
        { to: "/dashboard/student", icon: Bell, label: "Announcements" },
      ],
    },
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  admin: "School Director",
  teacher: "Teacher",
  student: "Student",
};

export function Sidebar({ role }: { role: Role }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const groups = NAV[role];

  return (
    <>
      {/* Mobile toggle handled by Topbar — Sidebar listens via event */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        data-sidebar
      >
        <div className="flex h-full flex-col">
          {/* Brand */}
          <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-violet text-primary-foreground shadow-soft">
              <School className="h-4.5 w-4.5" strokeWidth={2.4} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold tracking-tight text-ink">EduFlow</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-muted">Northfield High</div>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
          </div>

          {/* Role chip */}
          <div className="px-3 pt-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                <span className="text-[11px] font-medium text-ink">{ROLE_LABEL[role]}</span>
              </div>
              <span className="text-[10px] text-ink-muted">2026 cohort</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto px-3 py-3">
            {groups.map((group) => (
              <div key={group.label} className="mb-4">
                <div className="px-2 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                  {group.label}
                </div>
                <ul className="space-y-0.5">
                  {group.items.map((item, i) => {
                    const active = i === 0 && groups.indexOf(group) === 0;
                    return (
                      <li key={item.label}>
                        <Link
                          to={item.to}
                          className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] transition ${
                            active
                              ? "bg-primary/10 font-medium text-primary"
                              : "text-ink-muted hover:bg-surface hover:text-ink"
                          }`}
                        >
                          <item.icon className={`h-4 w-4 ${active ? "text-primary" : "text-ink-muted group-hover:text-ink"}`} />
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="rounded-md bg-ink/5 px-1.5 py-0.5 text-[9.5px] font-medium text-ink-muted">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          {/* Upgrade card */}
          <div className="px-3 pb-3">
            <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/10 via-violet/10 to-cyan/10 p-3">
              <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/20 blur-2xl" />
              <div className="relative flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-[11px] font-semibold text-ink">EduFlow AI</span>
              </div>
              <p className="relative mt-1 text-[10.5px] leading-relaxed text-ink-muted">
                Predict at-risk students and generate weekly insights.
              </p>
              <button className="relative mt-2 w-full rounded-md bg-ink px-2 py-1.5 text-[10.5px] font-medium text-background hover:bg-ink/90">
                Activate beta
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border px-3 py-2">
            <Link to="/dashboard/admin" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] text-ink-muted hover:bg-surface">
              <Settings className="h-3.5 w-3.5" /> Settings
            </Link>
            <Link to="/dashboard/admin" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] text-ink-muted hover:bg-surface">
              <LifeBuoy className="h-3.5 w-3.5" /> Help & support
            </Link>
          </div>
        </div>
      </aside>
      {open && <div className="fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}
