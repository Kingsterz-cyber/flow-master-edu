import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

export function Analytics() {
  return (
    <section id="analytics" className="relative bg-surface/60 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-end gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-ink-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" /> Analytics
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Turn school data into{" "}
              <span className="font-display italic text-gradient-indigo">actionable insights</span>
            </h2>
            <p className="mt-4 max-w-lg text-base text-ink-muted">
              Performance trends, attendance patterns, subject analysis, and class comparisons —
              presented with clarity so you can decide faster.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {[
              { i: TrendingUp, t: "Performance Trends" },
              { i: Activity, t: "Attendance Trends" },
              { i: BarChart3, t: "Subject Analysis" },
              { i: PieChart, t: "Class Comparisons" },
            ].map((x) => (
              <li key={x.t} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 text-sm text-ink">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
                  <x.i className="h-4 w-4" />
                </span>
                {x.t}
              </li>
            ))}
          </ul>
        </div>

        {/* Big dashboard */}
        <div className="mt-14 grid grid-cols-12 gap-4">
          <div className="col-span-12 overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-soft lg:col-span-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-ink">Academic Performance — Last 12 months</div>
                <div className="text-xs text-ink-muted">Average across all grades</div>
              </div>
              <div className="flex gap-1.5">
                {["bg-primary", "bg-violet", "bg-cyan"].map((c, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                    <span className={`h-2 w-2 rounded-full ${c}`} />
                    {["Grade 10", "Grade 11", "Grade 12"][i]}
                  </div>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 600 220" className="h-64 w-full">
              <defs>
                <linearGradient id="ag1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[40, 90, 140, 190].map((y) => (
                <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="oklch(0.92 0.01 260)" strokeDasharray="2 4" />
              ))}
              <path d="M0,170 C50,150 100,120 150,110 C200,100 250,140 300,120 C350,100 400,70 450,80 C500,90 550,55 600,40 L600,220 L0,220 Z" fill="url(#ag1)" />
              <path d="M0,170 C50,150 100,120 150,110 C200,100 250,140 300,120 C350,100 400,70 450,80 C500,90 550,55 600,40" fill="none" stroke="oklch(0.52 0.22 275)" strokeWidth="2.5" />
              <path d="M0,180 C60,170 120,150 180,140 C240,130 300,160 360,140 C420,120 480,110 540,95 C570,88 590,80 600,75" fill="none" stroke="oklch(0.58 0.22 295)" strokeWidth="2.5" />
              <path d="M0,190 C60,185 120,170 180,160 C240,150 300,170 360,155 C420,140 480,130 540,115 C570,108 590,100 600,95" fill="none" stroke="oklch(0.78 0.13 210)" strokeWidth="2.5" />
              {[0, 100, 200, 300, 400, 500, 600].map((x, i) => (
                <text key={x} x={x} y="215" fontSize="9" fill="oklch(0.5 0.025 260)">{["Jan","Mar","May","Jul","Sep","Nov","Dec"][i]}</text>
              ))}
            </svg>
          </div>

          <div className="col-span-12 space-y-4 lg:col-span-4">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="text-sm font-medium text-ink">Subject Distribution</div>
              <div className="mt-4 flex items-center gap-5">
                <div className="relative h-28 w-28">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.94 0.01 260)" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.52 0.22 275)" strokeWidth="3.5" strokeDasharray="35 100" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.58 0.22 295)" strokeWidth="3.5" strokeDasharray="25 100" strokeDashoffset="-35" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.78 0.13 210)" strokeWidth="3.5" strokeDasharray="22 100" strokeDashoffset="-60" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="oklch(0.72 0.16 165)" strokeWidth="3.5" strokeDasharray="18 100" strokeDashoffset="-82" />
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-ink">A−</div>
                      <div className="text-[9px] text-ink-muted">avg</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  {[
                    { c: "bg-primary", t: "STEM", v: "35%" },
                    { c: "bg-violet", t: "Humanities", v: "25%" },
                    { c: "bg-cyan", t: "Languages", v: "22%" },
                    { c: "bg-emerald", t: "Arts", v: "18%" },
                  ].map((x) => (
                    <div key={x.t} className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${x.c}`} />
                      <span className="text-ink">{x.t}</span>
                      <span className="ml-auto text-ink-muted">{x.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-ink">Academic Growth</div>
                <span className="rounded-full bg-emerald/10 px-2 py-0.5 text-[10px] font-medium text-emerald">+18.4%</span>
              </div>
              <div className="mt-4 flex items-end gap-2">
                {[40, 55, 48, 70, 62, 80, 75, 92].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/20 to-primary" style={{ height: `${h}px` }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[9px] text-ink-muted">
                <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
