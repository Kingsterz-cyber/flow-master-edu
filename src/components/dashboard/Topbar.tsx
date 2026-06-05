"use client";
import { Bell, Search, Plus, Command, HelpCircle, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import type { Role } from "./DashboardLayout";

const PROFILES: Record<Role, { name: string; role: string; initials: string; tint: string }> = {
  admin:   { name: "Dr. Amelia Hart", role: "School Director", initials: "AH", tint: "from-primary to-violet" },
  dos:     { name: "Daniel Owusu",    role: "Director of Studies", initials: "DO", tint: "from-violet to-cyan" },
  teacher: { name: "Marcus Bennett",  role: "Senior Teacher", initials: "MB", tint: "from-cyan to-emerald" },
  student: { name: "Priya Sharma",    role: "Grade 10 · Section A", initials: "PS", tint: "from-amber to-violet" },
};

const TITLES: Record<Role, string> = {
  admin: "School Overview",
  dos: "Academic Command",
  teacher: "Teaching Hub",
  student: "My Academic Hub",
};

const ROLES: Role[] = ["admin", "dos", "teacher", "student"];
const ROLE_SHORT: Record<Role, string> = { admin: "Admin", dos: "DOS", teacher: "Teacher", student: "Student" };

export function Topbar({ role }: { role: Role }) {
  const profile = PROFILES[role];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <Link to="/" className="text-[11.5px] text-ink-muted hover:text-ink">EduFlow</Link>
          <span className="text-ink-muted">/</span>
          <span className="truncate text-[12.5px] font-medium text-ink">{TITLES[role]}</span>
        </div>

        <div className="ml-auto hidden flex-1 max-w-md md:block">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5">
            <Search className="h-3.5 w-3.5 text-ink-muted" />
            <input className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-ink-muted" placeholder="Search students, classes, reports…" />
            <kbd className="hidden items-center gap-0.5 rounded border border-border bg-background px-1 text-[9.5px] text-ink-muted sm:flex">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
        </div>

        <div className="hidden items-center gap-1 rounded-lg border border-border bg-surface p-0.5 lg:flex">
          {ROLES.map((r) => (
            <Link
              key={r}
              to={`/dashboard/${r}`}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition ${
                role === r ? "bg-background text-ink shadow-ring" : "text-ink-muted hover:text-ink"
              }`}
            >
              {ROLE_SHORT[r]}
            </Link>
          ))}
        </div>

        <ThemeToggle />
        <button className="grid h-8 w-8 place-items-center rounded-lg border border-border text-ink-muted hover:bg-surface">
          <HelpCircle className="h-4 w-4" />
        </button>
        <button className="relative grid h-8 w-8 place-items-center rounded-lg border border-border text-ink-muted hover:bg-surface">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-border bg-surface pl-1 pr-2 py-1">
          <div className={`grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br ${profile.tint} text-[10px] font-semibold text-white`}>
            {profile.initials}
          </div>
          <div className="hidden text-left sm:block">
            <div className="text-[11px] font-medium leading-tight text-ink">{profile.name}</div>
            <div className="text-[9.5px] leading-tight text-ink-muted">{profile.role}</div>
          </div>
          <ChevronDown className="h-3 w-3 text-ink-muted" />
        </button>
      </div>
    </header>
  );
}
