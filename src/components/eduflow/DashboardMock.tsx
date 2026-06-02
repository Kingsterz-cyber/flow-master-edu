import { Users, TrendingUp, Calendar, Award, BookOpen, Activity, ArrowUpRight, Search, Bell, MoreHorizontal } from "lucide-react";

export function DashboardMock({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative w-full">
      {/* Main dashboard panel */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-float">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface/60 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
            </div>
            <span className="ml-3 text-[11px] font-medium text-ink-muted">eduflow.app / dashboard</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1.5 rounded-md bg-background px-2 py-1 text-[10px] text-ink-muted shadow-ring">
              <Search className="h-3 w-3" /> Search
            </div>
            <Bell className="h-3.5 w-3.5 text-ink-muted" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 p-4">
          {/* Sidebar */}
          <aside className="col-span-3 hidden flex-col gap-1 sm:flex">
            {["Overview", "Students", "Teachers", "Attendance", "Reports"].map((item, i) => (
              <div
                key={item}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] ${
                  i === 0 ? "bg-primary/10 font-medium text-primary" : "text-ink-muted"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-border"}`} />
                {item}
              </div>
            ))}
          </aside>

          {/* Main */}
          <div className="col-span-12 sm:col-span-9 space-y-3">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { icon: Users, label: "Students", val: "5,248", chg: "+12%", color: "text-primary", bg: "bg-primary/10" },
                { icon: Calendar, label: "Attendance", val: "98.2%", chg: "+2.4%", color: "text-emerald", bg: "bg-emerald/15" },
                { icon: Award, label: "Avg Grade", val: "A−", chg: "+0.3", color: "text-violet", bg: "bg-violet/15" },
              ].map((k) => (
                <div key={k.label} className="rounded-xl border border-border bg-background p-2.5">
                  <div className="flex items-center justify-between">
                    <div className={`grid h-7 w-7 place-items-center rounded-md ${k.bg}`}>
                      <k.icon className={`h-3.5 w-3.5 ${k.color}`} />
                    </div>
                    <span className="rounded-full bg-emerald/10 px-1.5 py-0.5 text-[9px] font-medium text-emerald">
                      {k.chg}
                    </span>
                  </div>
                  <div className="mt-2 text-[10px] text-ink-muted">{k.label}</div>
                  <div className="text-base font-semibold text-ink">{k.val}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="rounded-xl border border-border bg-background p-3">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-medium text-ink">Performance Analytics</div>
                  <div className="text-[9px] text-ink-muted">Last 6 months</div>
                </div>
                <div className="flex gap-1">
                  {["6M", "1Y", "All"].map((t, i) => (
                    <span key={t} className={`rounded px-1.5 py-0.5 text-[9px] ${i === 0 ? "bg-ink text-background" : "text-ink-muted"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <svg viewBox="0 0 320 90" className="h-20 w-full">
                <defs>
                  <linearGradient id="grad1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.13 210)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="oklch(0.78 0.13 210)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,70 C40,60 60,30 100,32 C140,34 160,55 200,45 C240,35 270,15 320,18 L320,90 L0,90 Z" fill="url(#grad1)" />
                <path d="M0,70 C40,60 60,30 100,32 C140,34 160,55 200,45 C240,35 270,15 320,18" fill="none" stroke="oklch(0.52 0.22 275)" strokeWidth="1.8" />
                <path d="M0,80 C40,75 70,65 110,60 C150,55 180,68 220,62 C260,56 290,40 320,38" fill="none" stroke="oklch(0.78 0.13 210)" strokeWidth="1.8" />
                <path d="M0,80 C40,75 70,65 110,60 C150,55 180,68 220,62 C260,56 290,40 320,38 L320,90 L0,90 Z" fill="url(#grad2)" />
              </svg>
              <div className="mt-1 flex justify-between text-[9px] text-ink-muted">
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>

            {!compact && (
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-border bg-background p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink">Recent Activity</span>
                    <MoreHorizontal className="h-3 w-3 text-ink-muted" />
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      { i: Activity, t: "Math Quiz graded", c: "text-primary bg-primary/10" },
                      { i: BookOpen, t: "Report sent to parents", c: "text-violet bg-violet/15" },
                      { i: Users, t: "12 new enrollments", c: "text-emerald bg-emerald/15" },
                    ].map((a, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className={`grid h-5 w-5 place-items-center rounded ${a.c}`}>
                          <a.i className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[10px] text-ink">{a.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-background p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-ink">Top Classes</span>
                    <TrendingUp className="h-3 w-3 text-emerald" />
                  </div>
                  <div className="space-y-1.5">
                    {[
                      { n: "Grade 10-A", v: 96 },
                      { n: "Grade 9-B", v: 91 },
                      { n: "Grade 11-A", v: 88 },
                    ].map((c) => (
                      <div key={c.n}>
                        <div className="mb-0.5 flex justify-between text-[10px]">
                          <span className="text-ink">{c.n}</span>
                          <span className="text-ink-muted">{c.v}%</span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-surface">
                          <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${c.v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating chip cards */}
      <div className="absolute -left-4 top-1/3 hidden animate-float rounded-xl border border-border bg-background p-2.5 shadow-float sm:block">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald/15 text-emerald">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] text-ink-muted">Attendance</div>
            <div className="text-sm font-semibold text-ink">+12.4%</div>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 bottom-8 hidden animate-float-slow rounded-xl border border-border bg-background p-2.5 shadow-float sm:block">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <Award className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[10px] text-ink-muted">Avg Score</div>
            <div className="text-sm font-semibold text-ink">A− Grade</div>
            <div className="mt-0.5 flex items-center gap-0.5 text-[9px] text-emerald">
              <ArrowUpRight className="h-2.5 w-2.5" /> 3.2%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
