import type { ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

export function Panel({ children, className = "", title, action }: { children: ReactNode; className?: string; title?: ReactNode; action?: ReactNode }) {
  return (
    <div className={`rounded-2xl border border-border bg-card shadow-soft ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="text-[12.5px] font-semibold text-ink">{title}</div>
          {action ?? <MoreHorizontal className="h-3.5 w-3.5 text-ink-muted" />}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}

export function KPI({
  label, value, delta, trend = "up", icon: Icon, tint = "primary", spark,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon: any;
  tint?: "primary" | "violet" | "cyan" | "emerald" | "amber";
  spark?: number[];
}) {
  const tintMap: Record<string, { bg: string; text: string; stroke: string }> = {
    primary: { bg: "bg-primary/10", text: "text-primary", stroke: "oklch(0.52 0.22 275)" },
    violet: { bg: "bg-violet/15", text: "text-violet", stroke: "oklch(0.58 0.22 295)" },
    cyan: { bg: "bg-cyan/20", text: "text-cyan", stroke: "oklch(0.65 0.13 210)" },
    emerald: { bg: "bg-emerald/15", text: "text-emerald", stroke: "oklch(0.62 0.16 165)" },
    amber: { bg: "bg-amber/20", text: "text-amber", stroke: "oklch(0.72 0.15 80)" },
  };
  const t = tintMap[tint];
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowUpRight;
  const trendColor = trend === "up" ? "text-emerald bg-emerald/10" : trend === "down" ? "text-destructive bg-destructive/10" : "text-ink-muted bg-ink/5";

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:shadow-float">
      <div className="flex items-start justify-between">
        <div className={`grid h-8 w-8 place-items-center rounded-lg ${t.bg}`}>
          <Icon className={`h-4 w-4 ${t.text}`} />
        </div>
        {delta && (
          <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9.5px] font-medium ${trendColor}`}>
            <TrendIcon className="h-2.5 w-2.5" />
            {delta}
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">{label}</div>
        <div className="mt-0.5 text-2xl font-semibold tracking-tight text-ink">{value}</div>
      </div>
      {spark && (
        <svg viewBox="0 0 100 28" className="mt-2 h-7 w-full">
          <polyline
            fill="none"
            stroke={t.stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={spark.map((v, i) => `${(i / (spark.length - 1)) * 100},${28 - (v / Math.max(...spark)) * 24}`).join(" ")}
          />
        </svg>
      )}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, sub, action }: { eyebrow?: string; title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <div className="text-[10.5px] font-medium uppercase tracking-wider text-primary">{eyebrow}</div>}
        <h2 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">{title}</h2>
        {sub && <p className="mt-0.5 text-[12px] text-ink-muted">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function LineChart({ data, color = "oklch(0.52 0.22 275)", height = 140, gradientId = "g1", showGrid = true, secondary }: {
  data: number[];
  color?: string;
  height?: number;
  gradientId?: string;
  showGrid?: boolean;
  secondary?: { data: number[]; color: string; gradientId: string };
}) {
  const w = 600;
  const max = Math.max(...data, ...(secondary?.data ?? [0])) * 1.15;
  const min = 0;
  const toPath = (d: number[]) =>
    d
      .map((v, i) => {
        const x = (i / (d.length - 1)) * w;
        const y = height - ((v - min) / (max - min)) * height;
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  const toArea = (d: number[]) => `${toPath(d)} L${w},${height} L0,${height} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        {secondary && (
          <linearGradient id={secondary.gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={secondary.color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={secondary.color} stopOpacity="0" />
          </linearGradient>
        )}
      </defs>
      {showGrid &&
        [0.25, 0.5, 0.75].map((p) => (
          <line key={p} x1="0" x2={w} y1={height * p} y2={height * p} stroke="oklch(0.92 0.01 260)" strokeDasharray="3 4" strokeWidth="0.8" />
        ))}
      {secondary && (
        <>
          <path d={toArea(secondary.data)} fill={`url(#${secondary.gradientId})`} />
          <path d={toPath(secondary.data)} fill="none" stroke={secondary.color} strokeWidth="1.8" />
        </>
      )}
      <path d={toArea(data)} fill={`url(#${gradientId})`} />
      <path d={toPath(data)} fill="none" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export function BarChart({ data, labels, color = "oklch(0.52 0.22 275)" }: { data: number[]; labels: string[]; color?: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex h-full items-end gap-2">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="relative flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md transition hover:opacity-80"
              style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg, ${color}, ${color}88)` }}
            />
          </div>
          <span className="text-[9.5px] text-ink-muted">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

export function Donut({ value, color = "oklch(0.52 0.22 275)", size = 96, label }: { value: number; color?: string; size?: number; label?: string }) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(0.94 0.01 260)" strokeWidth="7" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          stroke={color} strokeWidth="7" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-ink">{value}%</div>
          {label && <div className="text-[9px] uppercase tracking-wider text-ink-muted">{label}</div>}
        </div>
      </div>
    </div>
  );
}

export function Tag({ children, tint = "ink" }: { children: ReactNode; tint?: "ink" | "emerald" | "amber" | "violet" | "primary" | "destructive" | "cyan" }) {
  const map: Record<string, string> = {
    ink: "bg-ink/5 text-ink",
    emerald: "bg-emerald/15 text-emerald",
    amber: "bg-amber/20 text-amber",
    violet: "bg-violet/15 text-violet",
    primary: "bg-primary/10 text-primary",
    destructive: "bg-destructive/10 text-destructive",
    cyan: "bg-cyan/20 text-cyan",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9.5px] font-medium ${map[tint]}`}>
      {children}
    </span>
  );
}

export function Avatar({ initials, tint = "from-primary to-violet" }: { initials: string; tint?: string }) {
  return (
    <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br ${tint} text-[10px] font-semibold text-white`}>
      {initials}
    </div>
  );
}
