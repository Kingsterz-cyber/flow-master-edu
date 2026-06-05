import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AnalyticsCard } from "@/components/dashboard/widgets";
import { motion } from "framer-motion";
import { ease } from "@/components/motion/primitives";
import { Building2, Palette, KeyRound, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "School settings — EduFlow" }] }),
  component: SettingsPage,
});

const SECTIONS = [
  { icon: Building2, t: "School profile", d: "Name, address, contact, branding logo and colors." },
  { icon: GraduationCap, t: "Academic years", d: "Define academic years, terms and key calendar dates." },
  { icon: KeyRound, t: "Registration codes", d: "Generate and rotate codes for teachers and students." },
  { icon: Palette, t: "Grading system", d: "Configure grading bands, letter grades and pass marks." },
];

function SettingsPage() {
  return (
    <DashboardLayout role="admin">
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-6"
      >
        <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Administration</div>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          School <span className="font-display italic text-gradient-indigo">settings</span>
        </h1>
        <p className="mt-1 text-[13px] text-ink-muted">Manage school branding, codes, academic years and grading.</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {SECTIONS.map((s, i) => (
          <AnalyticsCard key={s.t} index={i} title={<div className="flex items-center gap-2"><s.icon className="h-3.5 w-3.5 text-primary" />{s.t}</div>}>
            <p className="text-[12px] text-ink-muted">{s.d}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
              <div className="rounded-lg border border-border bg-surface/60 p-2.5">
                <div className="text-ink-muted">Last updated</div>
                <div className="mt-0.5 font-medium text-ink">Mar 10, 2026</div>
              </div>
              <div className="rounded-lg border border-border bg-surface/60 p-2.5">
                <div className="text-ink-muted">Owner</div>
                <div className="mt-0.5 font-medium text-ink">Dr. Amelia Hart</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg bg-ink px-3 py-1.5 text-[11.5px] font-medium text-background hover:bg-ink/90">Manage</button>
              <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-[11.5px] text-ink hover:bg-surface">View history</button>
            </div>
          </AnalyticsCard>
        ))}
      </div>
    </DashboardLayout>
  );
}
