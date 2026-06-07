"use client";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ease } from "@/components/motion/primitives";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AnalyticsCard } from "@/components/dashboard/widgets";
import { Tag } from "@/components/dashboard/primitives";
import { Building2, Palette, KeyRound, GraduationCap, Upload, RotateCw, Plus, Trash2, School } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "School settings — EduFlow" }] }),
  component: SettingsPage,
});

const TABS = [
  { id: "brand", label: "Branding", icon: Palette },
  { id: "years", label: "Academic years", icon: GraduationCap },
  { id: "codes", label: "Registration codes", icon: KeyRound },
  { id: "grades", label: "Grading system", icon: Building2 },
] as const;
type TabId = typeof TABS[number]["id"];

function SettingsPage() {
  const [tab, setTab] = useState<TabId>("brand");

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
        <p className="mt-1 text-[13px] text-ink-muted">Manage branding, registration codes, academic years and grading bands.</p>
      </motion.div>

      <div className="grid grid-cols-12 gap-4">
        <aside className="col-span-12 md:col-span-3">
          <div className="rounded-2xl border border-border bg-card p-2 shadow-soft">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id} onClick={() => setTab(t.id)}
                  className={`group relative flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[12.5px] ${active ? "font-medium text-primary" : "text-ink-muted hover:bg-surface hover:text-ink"}`}
                >
                  {active && <motion.span layoutId="settings-active" className="absolute inset-0 rounded-lg bg-primary/10" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                  <t.icon className={`relative h-3.5 w-3.5 ${active ? "text-primary" : "text-ink-muted"}`} />
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <div className="col-span-12 md:col-span-9">
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}>
            {tab === "brand" && <BrandingPanel />}
            {tab === "years" && <YearsPanel />}
            {tab === "codes" && <CodesPanel />}
            {tab === "grades" && <GradesPanel />}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function BrandingPanel() {
  const [name, setName] = useState("Northfield High");
  const [tagline, setTagline] = useState("Curiosity. Character. Community.");
  const [primary, setPrimary] = useState("#5B5BFF");
  return (
    <AnalyticsCard title="School branding">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="grid h-32 place-items-center rounded-2xl border border-dashed border-border bg-surface/60">
            <div className="text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-violet text-white"><School className="h-5 w-5" /></div>
              <div className="mt-2 text-[11px] text-ink-muted">PNG or SVG, up to 2 MB</div>
            </div>
          </div>
          <button className="mt-2 inline-flex items-center gap-1 rounded-lg border border-border bg-card px-3 py-1.5 text-[11.5px] text-ink hover:bg-surface"><Upload className="h-3 w-3" /> Upload logo</button>
        </div>
        <div className="md:col-span-2 space-y-3">
          <Field label="School name" value={name} onChange={setName} />
          <Field label="Tagline" value={tagline} onChange={setTagline} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Contact email" value="hello@northfield.edu" onChange={() => {}} />
            <Field label="Phone" value="+1 (415) 555-0142" onChange={() => {}} />
          </div>
          <div>
            <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">Primary color</div>
            <div className="mt-1 flex items-center gap-2">
              <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="h-9 w-12 cursor-pointer rounded-lg border border-border bg-card" />
              <input value={primary} onChange={(e) => setPrimary(e.target.value)} className="rounded-lg border border-border bg-background px-2.5 py-2 text-[12.5px] outline-none focus:border-primary" />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="rounded-lg bg-ink px-3 py-1.5 text-[11.5px] font-medium text-background hover:bg-ink/90">Save changes</button>
            <button className="rounded-lg border border-border bg-card px-3 py-1.5 text-[11.5px] text-ink hover:bg-surface">Discard</button>
          </div>
        </div>
      </div>
    </AnalyticsCard>
  );
}

function YearsPanel() {
  const years = [
    { y: "2025 / 2026", t: "3 terms", start: "Aug 26, 2025", end: "Jun 19, 2026", status: "Active", tint: "emerald" },
    { y: "2024 / 2025", t: "3 terms", start: "Aug 28, 2024", end: "Jun 20, 2025", status: "Archived", tint: "ink" },
    { y: "2023 / 2024", t: "3 terms", start: "Aug 30, 2023", end: "Jun 21, 2024", status: "Archived", tint: "ink" },
  ] as const;
  return (
    <AnalyticsCard
      title="Academic years"
      action={<button className="inline-flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-[11px] font-medium text-background hover:bg-ink/90"><Plus className="h-3 w-3" /> New year</button>}
    >
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-[12px]">
          <thead className="bg-surface/60 text-[10.5px] uppercase tracking-wider text-ink-muted">
            <tr><th className="px-3 py-2 text-left">Year</th><th className="px-3 py-2">Terms</th><th className="px-3 py-2">Start</th><th className="px-3 py-2">End</th><th className="px-3 py-2">Status</th><th></th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {years.map((y) => (
              <tr key={y.y} className="hover:bg-surface/60">
                <td className="px-3 py-2 font-medium text-ink">{y.y}</td>
                <td className="px-3 py-2 text-center text-ink-muted">{y.t}</td>
                <td className="px-3 py-2 text-center text-ink-muted">{y.start}</td>
                <td className="px-3 py-2 text-center text-ink-muted">{y.end}</td>
                <td className="px-3 py-2 text-center"><Tag tint={y.tint as any}>{y.status}</Tag></td>
                <td className="px-3 py-2 text-right"><button className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">Manage</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AnalyticsCard>
  );
}

function CodesPanel() {
  const codes = [
    { role: "Teacher", code: "NHS-TEA-7F2D", uses: "18 / ∞", expires: "Apr 30, 2026" },
    { role: "Student", code: "NHS-STU-9K3A", uses: "412 / 1000", expires: "Jun 30, 2026" },
    { role: "Parent",  code: "NHS-PAR-2L9X", uses: "104 / ∞", expires: "Jun 30, 2026" },
  ];
  return (
    <AnalyticsCard
      title="Registration codes"
      action={<button className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1 text-[11px] text-ink hover:bg-surface"><RotateCw className="h-3 w-3" /> Rotate all</button>}
    >
      <p className="mb-3 text-[12px] text-ink-muted">Share these codes during onboarding. They control which role new accounts are assigned.</p>
      <div className="space-y-2">
        {codes.map((c) => (
          <div key={c.code} className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface/60 p-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary"><KeyRound className="h-4 w-4" /></div>
            <div className="flex-1 min-w-[160px]">
              <div className="text-[11px] text-ink-muted">{c.role} code</div>
              <div className="font-mono text-[13px] font-semibold text-ink">{c.code}</div>
            </div>
            <div className="text-[11px] text-ink-muted">Uses · <span className="text-ink">{c.uses}</span></div>
            <div className="text-[11px] text-ink-muted">Expires · <span className="text-ink">{c.expires}</span></div>
            <button className="rounded-md border border-border bg-card px-2 py-1 text-[10.5px] text-ink hover:bg-background">Copy</button>
            <button className="rounded-md border border-border bg-card px-2 py-1 text-[10.5px] text-ink hover:bg-background">Rotate</button>
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}

function GradesPanel() {
  const bands = [
    { g: "A", from: 80, to: 100, label: "Excellent", tint: "emerald" },
    { g: "B", from: 70, to: 79, label: "Good", tint: "primary" },
    { g: "C", from: 60, to: 69, label: "Satisfactory", tint: "violet" },
    { g: "D", from: 50, to: 59, label: "Pass", tint: "amber" },
    { g: "F", from: 0,  to: 49, label: "Fail", tint: "destructive" },
  ] as const;
  return (
    <AnalyticsCard
      title="Grading bands"
      action={<button className="inline-flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-[11px] font-medium text-background hover:bg-ink/90"><Plus className="h-3 w-3" /> Add band</button>}
    >
      <div className="space-y-2">
        {bands.map((b) => (
          <div key={b.g} className="grid grid-cols-12 items-center gap-2 rounded-xl border border-border bg-surface/60 p-3">
            <div className="col-span-2 flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-card font-semibold text-ink">{b.g}</span>
              <Tag tint={b.tint as any}>{b.label}</Tag>
            </div>
            <div className="col-span-3 text-[11px] text-ink-muted">From</div>
            <div className="col-span-2"><input defaultValue={b.from} className="w-full rounded-md border border-border bg-background px-2 py-1 text-[12px] outline-none focus:border-primary" /></div>
            <div className="col-span-1 text-center text-ink-muted">—</div>
            <div className="col-span-2"><input defaultValue={b.to} className="w-full rounded-md border border-border bg-background px-2 py-1 text-[12px] outline-none focus:border-primary" /></div>
            <div className="col-span-2 text-right"><button className="rounded-md border border-border bg-card px-2 py-1 text-[10.5px] text-destructive hover:bg-destructive/10"><Trash2 className="inline h-3 w-3" /> Remove</button></div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-[11.5px] text-ink-muted">
        Pass mark is currently <span className="font-medium text-ink">50%</span>. Bands apply to all subjects and academic years unless overridden.
      </div>
    </AnalyticsCard>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[10.5px] uppercase tracking-wider text-ink-muted">{label}</span>
      <input
        value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-2 text-[12.5px] text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}
