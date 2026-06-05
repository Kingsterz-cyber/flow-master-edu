"use client";
import { DashboardLayout, type Role } from "@/components/dashboard/DashboardLayout";
import { KPIWidget, AnalyticsCard, RankingTable } from "@/components/dashboard/widgets";
import { Tag } from "@/components/dashboard/primitives";
import { motion } from "framer-motion";
import { ease } from "@/components/motion/primitives";
import { Search, Filter, Plus, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ModuleKPI = {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  tint?: "primary" | "violet" | "cyan" | "emerald" | "amber";
};

export function ModulePage({
  role,
  eyebrow,
  title,
  description,
  kpis,
  columns,
  rows,
  filters = ["All", "Active", "Pending", "Archived"],
  primaryAction = "New",
  extra,
}: {
  role: Role;
  eyebrow: string;
  title: ReactNode;
  description: string;
  kpis: ModuleKPI[];
  columns: string[];
  rows: (string | number | ReactNode)[][];
  filters?: string[];
  primaryAction?: string;
  extra?: ReactNode;
}) {
  return (
    <DashboardLayout role={role}>
      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }}
        className="mb-6 flex flex-wrap items-end justify-between gap-3"
      >
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">{eyebrow}</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h1>
          <p className="mt-1 text-[13px] text-ink-muted">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] text-ink hover:bg-surface">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90">
            <Plus className="h-3.5 w-3.5" /> {primaryAction}
          </button>
        </div>
      </motion.div>

      {kpis.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {kpis.map((k, i) => (
            <KPIWidget key={k.label} {...k} index={i} />
          ))}
        </div>
      )}

      {extra && <div className="mt-6">{extra}</div>}

      <div className="mt-6">
        <AnalyticsCard
          title={
            <div className="flex items-center gap-3">
              <span>Records</span>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2 py-1">
                <Search className="h-3 w-3 text-ink-muted" />
                <input className="w-32 bg-transparent text-[11px] outline-none placeholder:text-ink-muted" placeholder="Search…" />
              </div>
              <div className="flex items-center gap-1">
                {filters.map((f, i) => (
                  <button
                    key={f}
                    className={`rounded-md px-2 py-0.5 text-[10.5px] ${i === 0 ? "bg-ink text-background" : "text-ink-muted hover:bg-surface"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          }
          action={<button className="text-[10.5px] text-primary">Export</button>}
        >
          <RankingTable columns={columns} rows={rows} />
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-[11px] text-ink-muted">
            <span>Showing {rows.length} of {rows.length * 12} records</span>
            <div className="flex items-center gap-1">
              <button className="rounded-md border border-border px-2 py-0.5 hover:bg-surface">Prev</button>
              <button className="rounded-md border border-border px-2 py-0.5 hover:bg-surface">1</button>
              <button className="rounded-md bg-ink px-2 py-0.5 text-background">2</button>
              <button className="rounded-md border border-border px-2 py-0.5 hover:bg-surface">3</button>
              <button className="rounded-md border border-border px-2 py-0.5 hover:bg-surface">Next</button>
            </div>
          </div>
        </AnalyticsCard>
      </div>
    </DashboardLayout>
  );
}

export { Tag };
