"use client";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, CalendarCheck, ClipboardList,
  BarChart3, FileText, Bell, Settings, School, ChevronDown, Sparkles,
  Trophy, NotebookPen, FileBarChart, BookMarked, ShieldCheck, UserCheck, Building2,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Role } from "./DashboardLayout";

type NavItem = { to: string; icon: any; label: string; badge?: string };
type NavGroup = { label: string; items: NavItem[] };

const NAV: Record<Role, NavGroup[]> = {
  admin: [
    { label: "Overview", items: [
      { to: "/dashboard/admin", icon: LayoutDashboard, label: "Dashboard" },
    ]},
    { label: "Manage", items: [
      { to: "/dashboard/staff", icon: GraduationCap, label: "Staff" },
      { to: "/dashboard/students", icon: Users, label: "Students", badge: "5.2k" },
      { to: "/dashboard/approvals", icon: UserCheck, label: "Approvals", badge: "14" },
    ]},
    { label: "Insights", items: [
      { to: "/dashboard/reports", icon: FileText, label: "Reports" },
      { to: "/dashboard/announcements", icon: Bell, label: "Announcements" },
      { to: "/dashboard/settings", icon: Building2, label: "School Settings" },
    ]},
  ],
  dos: [
    { label: "Overview", items: [
      { to: "/dashboard/dos", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/dashboard/analytics", icon: BarChart3, label: "Academic Analytics" },
    ]},
    { label: "Academic", items: [
      { to: "/dashboard/classes", icon: BookOpen, label: "Classes" },
      { to: "/dashboard/subjects", icon: BookMarked, label: "Subjects" },
      { to: "/dashboard/attendance", icon: CalendarCheck, label: "Attendance" },
      { to: "/dashboard/marks", icon: ClipboardList, label: "Marks" },
    ]},
    { label: "Performance", items: [
      { to: "/dashboard/teacher-performance", icon: ShieldCheck, label: "Teacher Performance" },
      { to: "/dashboard/reports", icon: FileText, label: "Reports" },
    ]},
  ],
  teacher: [
    { label: "Today", items: [
      { to: "/dashboard/teacher", icon: LayoutDashboard, label: "Dashboard" },
    ]},
    { label: "Teaching", items: [
      { to: "/dashboard/classes", icon: BookOpen, label: "My Classes" },
      { to: "/dashboard/attendance", icon: CalendarCheck, label: "Attendance" },
      { to: "/dashboard/marks", icon: NotebookPen, label: "Marks" },
      { to: "/dashboard/students", icon: Users, label: "Students" },
    ]},
    { label: "More", items: [
      { to: "/dashboard/announcements", icon: Bell, label: "Announcements" },
    ]},
  ],
  student: [
    { label: "Me", items: [
      { to: "/dashboard/student", icon: LayoutDashboard, label: "Dashboard" },
      { to: "/dashboard/analytics", icon: TrendingUp, label: "My Progress" },
    ]},
    { label: "Academics", items: [
      { to: "/dashboard/subjects", icon: BookOpen, label: "My Subjects" },
      { to: "/dashboard/attendance", icon: CalendarCheck, label: "Attendance" },
      { to: "/dashboard/marks", icon: Trophy, label: "Marks" },
      { to: "/dashboard/reports", icon: FileBarChart, label: "Reports" },
    ]},
    { label: "More", items: [
      { to: "/dashboard/announcements", icon: Bell, label: "Announcements" },
    ]},
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  admin: "School Director",
  dos: "Director of Studies",
  teacher: "Teacher",
  student: "Student",
};

export function Sidebar({ role }: { role: Role }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const groups = NAV[role];

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: 256 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="hidden border-r border-border bg-card lg:block"
      style={{ width: 256 }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-violet text-primary-foreground shadow-soft">
            <School className="h-4 w-4" strokeWidth={2.4} />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold tracking-tight text-ink">EduFlow</div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">Northfield High</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-ink-muted" />
        </div>

        <div className="px-3 pt-3">
          <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              <span className="text-[11px] font-medium text-ink">{ROLE_LABEL[role]}</span>
            </div>
            <span className="text-[10px] text-ink-muted">2026 cohort</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {groups.map((group) => (
            <div key={group.label} className="mb-4">
              <div className="px-2 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                {group.label}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = path === item.to;
                  return (
                    <li key={item.label + item.to}>
                      <Link
                        to={item.to}
                        className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] transition ${
                          active ? "font-medium text-primary" : "text-ink-muted hover:bg-surface hover:text-ink"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="sidebar-active"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            className="absolute inset-0 rounded-lg bg-primary/10"
                            aria-hidden
                          />
                        )}
                        <item.icon className={`relative h-4 w-4 ${active ? "text-primary" : "text-ink-muted group-hover:text-ink"}`} />
                        <span className="relative flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="relative rounded-md bg-ink/5 px-1.5 py-0.5 text-[9.5px] font-medium text-ink-muted">
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

        <div className="border-t border-border px-3 py-2">
          <Link to="/dashboard/settings" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] text-ink-muted hover:bg-surface">
            <Settings className="h-3.5 w-3.5" /> Settings
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}
