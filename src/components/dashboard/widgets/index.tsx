"use client";
import { motion } from "framer-motion";
import { Counter, ease, DrawPath } from "@/components/motion/primitives";
import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

/* ----- KPIWidget ----- */
export function KPIWidget({
  icon: Icon, label, value, suffix = "", decimals = 0, delta, trend = "up", tint = "primary", index = 0,
}: {
  icon: any; label: string; value: number; suffix?: string; decimals?: number;
  delta?: string; trend?: "up" | "down" | "flat"; tint?: "primary" | "violet" | "cyan" | "emerald" | "amber";
  index?: number;
}) {
  const tintMap: Record<string, { bg: string; text: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary" },
    violet: { bg: "bg-violet/15", text: "text-violet" },
    cyan: { bg: "bg-cyan/20", text: "text-cyan" },
    emerald: { bg: "bg-emerald/15", text: "text-emerald" },
    amber: { bg: "bg-amber/20", text: "text-amber" },
  };
  const t = tintMap[tint];
  const T = trend === "down" ? ArrowDownRight : ArrowUpRight;
  const tc = trend === "up" ? "bg-emerald/10 text-emerald" : trend === "down" ? "bg-destructive/10 text-destructive" : "bg-ink/5 text-ink-muted";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-soft transition-shadow hover:shadow-float"
    >
      <div className="flex items-start justify-between">
        <div className={`grid h-9 w-9 place-items-center rounded-lg ${t.bg}`}>
          <Icon className={`h-4 w-4 ${t.text}`} />
        </div>
        {delta && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${tc}`}>
            <T className="h-2.5 w-2.5" /> {delta}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">{label}</div>
        <div className="mt-0.5 text-2xl font-semibold tracking-tight text-ink">
          <Counter to={value} suffix={suffix} decimals={decimals} />
        </div>
      </div>
    </motion.div>
  );
}

/* ----- AnalyticsCard ----- */
export function AnalyticsCard({
  title, action, children, className = "", index = 0,
}: { title?: ReactNode; action?: ReactNode; children: ReactNode; className?: string; index?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease }}
      className={`rounded-2xl border border-border bg-card shadow-soft ${className}`}
    >
      {(title || action) && (
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-[12.5px] font-semibold text-ink">{title}</div>
          {action}
        </header>
      )}
      <div className="p-4">{children}</div>
    </motion.section>
  );
}

/* ----- HeatmapWidget (GitHub-style) ----- */
export function HeatmapWidget({
  weeks = 26, seed = 1, label = "Daily activity · last 26 weeks",
}: { weeks?: number; seed?: number; label?: string }) {
  const grid: number[][] = [];
  for (let w = 0; w < weeks; w++) {
    const col: number[] = [];
    for (let d = 0; d < 7; d++) {
      const weekend = d === 5 || d === 6;
      const base = weekend ? 0 : 0.5 + Math.sin((w + seed) * 0.7 + d) * 0.25 + Math.cos((w + d) * 0.3) * 0.2;
      col.push(Math.max(0, Math.min(1, base + (weekend ? 0 : 0.2))));
    }
    grid.push(col);
  }
  const color = (v: number) => {
    if (v === 0) return { bg: "oklch(0.94 0.005 260)", dark: "oklch(0.24 0.018 265)" };
    if (v < 0.35) return { bg: "oklch(0.92 0.07 275)", dark: "oklch(0.32 0.07 275)" };
    if (v < 0.6) return { bg: "oklch(0.78 0.13 275)", dark: "oklch(0.44 0.14 275)" };
    if (v < 0.82) return { bg: "oklch(0.62 0.18 275)", dark: "oklch(0.6 0.2 275)" };
    return { bg: "oklch(0.5 0.22 275)", dark: "oklch(0.72 0.22 275)" };
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-[3px] overflow-x-auto pb-1">
        {grid.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-[3px]">
            {col.map((v, ri) => {
              const c = color(v);
              return (
                <motion.div
                  key={ri}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.22, delay: (ci * 7 + ri) * 0.003, ease }}
                  whileHover={{ scale: 1.4 }}
                  title={`${Math.round(v * 100)}%`}
                  className="h-3 w-3 rounded-[3px] transition-shadow hover:shadow-[0_0_10px_-1px_currentColor]"
                  style={{
                    background: `light-dark(${c.bg}, ${c.dark})`,
                    color: c.bg,
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-ink-muted">
        <span>{label}</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0.1, 0.4, 0.65, 0.9].map((v) => {
            const c = color(v);
            return (
              <span
                key={v}
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{ background: `light-dark(${c.bg}, ${c.dark})` }}
              />
            );
          })}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

/* ----- DashboardChart (line/area with pathLength) ----- */
export function DashboardChart({
  data, color = "oklch(0.62 0.22 275)", height = 180, secondary, gradientId = "g1",
}: {
  data: number[]; color?: string; height?: number;
  secondary?: { data: number[]; color: string; gradientId: string };
  gradientId?: string;
}) {
  const w = 600;
  const max = Math.max(...data, ...(secondary?.data ?? [0])) * 1.1;
  const toPts = (d: number[]) => d.map((v, i) => [(i / (d.length - 1)) * w, height - (v / max) * height] as const);
  const toPath = (pts: readonly (readonly [number, number])[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const pts = toPts(data);
  const path = toPath(pts);
  const area = `${path} L${w},${height} L0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        {secondary && (
          <linearGradient id={secondary.gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={secondary.color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={secondary.color} stopOpacity="0" />
          </linearGradient>
        )}
      </defs>
      {[0.25, 0.5, 0.75].map((p) => (
        <line key={p} x1="0" x2={w} y1={height * p} y2={height * p} stroke="oklch(0.6 0.01 260 / 0.18)" strokeDasharray="3 5" strokeWidth="0.8" />
      ))}
      {secondary && (
        <>
          <motion.path d={`${toPath(toPts(secondary.data))} L${w},${height} L0,${height} Z`} fill={`url(#${secondary.gradientId})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
          <DrawPath d={toPath(toPts(secondary.data))} stroke={secondary.color} strokeWidth={2} duration={1.2} />
        </>
      )}
      <motion.path d={area} fill={`url(#${gradientId})`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} />
      <DrawPath d={path} stroke={color} strokeWidth={2.2} duration={1.4} />
    </svg>
  );
}

/* ----- AnimatedBars ----- */
export function AnimatedBars({
  data, labels, colorFrom = "oklch(0.62 0.22 275)", colorTo = "oklch(0.68 0.22 295)",
}: { data: number[]; labels: string[]; colorFrom?: string; colorTo?: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="group flex flex-1 flex-col items-center gap-1.5">
          <div className="relative flex w-full flex-1 items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(v / max) * 100}%` }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.8, delay: i * 0.06, ease }}
              className="relative w-full rounded-t-md"
              style={{ background: `linear-gradient(180deg, ${colorFrom}, ${colorTo}aa)` }}
            >
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-md bg-ink px-1.5 py-0.5 text-[9px] font-medium text-background opacity-0 transition-opacity group-hover:opacity-100">{v}</span>
            </motion.div>
          </div>
          <span className="text-[9.5px] text-ink-muted">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ----- RankingTable ----- */
export function RankingTable({
  columns, rows,
}: { columns: string[]; rows: (string | number | ReactNode)[][] }) {
  return (
    <div className="-mx-4 overflow-x-auto">
      <table className="w-full text-[11.5px]">
        <thead>
          <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-ink-muted">
            {columns.map((c) => (
              <th key={c} className="px-4 py-2 font-medium">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r, i) => (
            <motion.tr
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.04, ease }}
              className="transition hover:bg-surface/60"
            >
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-2.5 text-ink">{cell}</td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
