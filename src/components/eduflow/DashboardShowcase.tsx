"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/components/motion/primitives";
import { DashboardPreview } from "./DashboardPreview";
import { AdminDashboard } from "./AdminDashboard";
import { DOSDashboard } from "./DOSDashboard";
import { TeacherDashboard } from "./TeacherDashboard";
import { StudentDashboard } from "./StudentDashboard";
import { Link } from "@tanstack/react-router";
import { Shield, BarChart3, GraduationCap, BookOpen, ArrowUpRight } from "lucide-react";

type RoleId = "admin" | "dos" | "teacher" | "student";

const ROLES: { id: RoleId; label: string; sub: string; icon: any; tint: string; to: string }[] = [
  { id: "admin",   label: "School Director", sub: "School-wide overview",  icon: Shield,        tint: "from-primary to-violet",  to: "/dashboard/admin" },
  { id: "dos",     label: "Director of Studies", sub: "Academic command",  icon: BarChart3,     tint: "from-violet to-cyan",     to: "/dashboard/dos" },
  { id: "teacher", label: "Teacher",         sub: "Daily teaching",        icon: GraduationCap, tint: "from-cyan to-emerald",    to: "/dashboard/teacher" },
  { id: "student", label: "Student",         sub: "Personal portal",       icon: BookOpen,      tint: "from-amber to-violet",    to: "/dashboard/student" },
];

export function DashboardShowcase() {
  const [active, setActive] = useState<RoleId>("dos");

  const renderDash = () => {
    switch (active) {
      case "admin":   return <AdminDashboard embed />;
      case "dos":     return <DOSDashboard embed />;
      case "teacher": return <TeacherDashboard embed />;
      case "student": return <StudentDashboard embed />;
    }
  };

  return (
    <section id="solutions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" /> Live product preview
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            One platform.{" "}
            <span className="font-display italic text-gradient-indigo">Four roles.</span>
          </h2>
          <p className="mt-4 text-base text-ink-muted">
            Every role gets a dashboard tailored to what they actually do. These previews
            render the real components you'll use inside EduFlow.
          </p>
        </div>

        {/* Role tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {ROLES.map((r) => {
            const isActive = active === r.id;
            return (
              <motion.button
                key={r.id}
                onClick={() => setActive(r.id)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`group relative flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-left transition ${
                  isActive ? "border-primary/40 bg-card shadow-soft" : "border-border bg-card/60 hover:bg-card"
                }`}
              >
                <div className={`grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br ${r.tint} text-white`}>
                  <r.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-ink">{r.label}</div>
                  <div className="text-[10.5px] text-ink-muted">{r.sub}</div>
                </div>
                {isActive && (
                  <motion.span
                    layoutId="role-tab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute -bottom-px left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-primary to-violet"
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-x-8 -top-8 h-72 bg-gradient-to-b from-violet/15 via-primary/10 to-transparent blur-3xl" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease }}
            >
              <DashboardPreview width={1320} height={900}>
                {renderDash()}
              </DashboardPreview>
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12px] text-ink-muted">
              You're viewing the actual <span className="font-medium text-ink">{ROLES.find((r) => r.id === active)?.label}</span> dashboard — scaled to fit.
            </p>
            <Link
              to={ROLES.find((r) => r.id === active)!.to}
              className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90"
            >
              Open live dashboard <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
