"use client";
import { Users, UserCog, CalendarCheck, ClipboardList, FileBarChart, LineChart, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { ease } from "@/components/motion/primitives";

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Features
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Everything your school needs,{" "}
            <span className="font-display italic text-gradient-indigo">beautifully unified</span>
          </h2>
          <p className="mt-4 text-base text-ink-muted">
            A complete operating system for education — from daily operations to long-term academic strategy.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Big: Students */}
          <Card className="col-span-12 md:col-span-7 lg:col-span-8 row-span-2" icon={Users} title="Student Management" desc="Unified profiles for every learner — academics, attendance, behavior, parents, and history in one timeline.">
            <div className="mt-6 rounded-xl border border-border bg-background p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-xs font-medium text-ink">Class 10-A · 32 students</div>
                <span className="text-[10px] text-ink-muted">Today</span>
              </div>
              <div className="space-y-2">
                {[
                  { n: "Amara Okonkwo", g: "A+", a: 98, color: "bg-emerald" },
                  { n: "Liam Chen", g: "A", a: 96, color: "bg-primary" },
                  { n: "Sofía Reyes", g: "A−", a: 94, color: "bg-violet" },
                  { n: "Noah Patel", g: "B+", a: 89, color: "bg-cyan" },
                ].map((s) => (
                  <div key={s.n} className="flex items-center justify-between rounded-lg bg-surface/60 px-3 py-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`grid h-7 w-7 place-items-center rounded-full ${s.color} text-[10px] font-semibold text-white`}>
                        {s.n.split(" ").map(p => p[0]).join("")}
                      </div>
                      <span className="text-xs text-ink">{s.n}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-ink-muted">
                      <span>{s.a}%</span>
                      <span className="rounded-md bg-background px-1.5 py-0.5 font-medium text-ink shadow-ring">{s.g}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Teachers */}
          <Card className="col-span-12 md:col-span-5 lg:col-span-4" icon={UserCog} title="Teacher Management" desc="Invite teachers with secure school verification, assign classes, and track activity.">
            <div className="mt-5 flex -space-x-2">
              {["bg-primary", "bg-violet", "bg-cyan", "bg-emerald", "bg-amber"].map((c, i) => (
                <div key={i} className={`grid h-9 w-9 place-items-center rounded-full ${c} text-[10px] font-semibold text-white ring-2 ring-background`}>
                  {String.fromCharCode(65 + i)}{String.fromCharCode(75 + i)}
                </div>
              ))}
              <div className="grid h-9 w-9 place-items-center rounded-full bg-surface text-[10px] font-medium text-ink-muted ring-2 ring-background">
                +28
              </div>
            </div>
          </Card>

          {/* Attendance */}
          <Card className="col-span-12 md:col-span-5 lg:col-span-4" icon={CalendarCheck} title="Attendance Tracking" desc="Real-time roll calls with one-tap marking and automated parent notifications.">
            <div className="mt-5 grid grid-cols-7 gap-1">
              {Array.from({ length: 28 }).map((_, i) => {
                const states = ["bg-emerald", "bg-emerald", "bg-emerald", "bg-amber", "bg-emerald", "bg-primary/30", "bg-emerald"];
                return <div key={i} className={`h-6 rounded ${states[i % 7]} opacity-${70 + (i % 3) * 10}`} />;
              })}
            </div>
            <div className="mt-3 flex justify-between text-[10px] text-ink-muted">
              <span>Last 4 weeks</span><span className="text-emerald font-medium">98.2% present</span>
            </div>
          </Card>

          {/* Marks */}
          <Card className="col-span-12 md:col-span-7 lg:col-span-4" icon={ClipboardList} title="Marks Management" desc="Configurable grading scales, weighted assessments, and instant grade calculations.">
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { s: "Math", v: 92 },
                { s: "Physics", v: 88 },
                { s: "English", v: 95 },
              ].map((x) => (
                <div key={x.s} className="rounded-lg border border-border p-2.5">
                  <div className="text-[10px] text-ink-muted">{x.s}</div>
                  <div className="mt-1 text-lg font-semibold text-ink">{x.v}</div>
                  <div className="mt-1 h-1 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-cyan" style={{ width: `${x.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Reports */}
          <Card className="col-span-12 md:col-span-6 lg:col-span-7" icon={FileBarChart} title="Academic Reports" desc="Beautiful PDF report cards, term summaries, and parent updates generated in seconds.">
            <div className="mt-5 flex items-end gap-3">
              <div className="relative w-32 overflow-hidden rounded-lg border border-border bg-background p-3 shadow-soft">
                <div className="mb-2 text-[9px] font-medium text-ink">Term Report</div>
                <div className="space-y-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-1 rounded bg-surface" style={{ width: `${50 + i * 8}%` }} />
                  ))}
                </div>
                <div className="mt-3 rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">A− Grade</div>
              </div>
              <div className="flex-1 space-y-2">
                {["Class summary", "Parent letter", "Subject analysis"].map((t) => (
                  <div key={t} className="flex items-center justify-between rounded-lg bg-surface/60 px-3 py-2 text-xs text-ink">
                    {t}
                    <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Analytics */}
          <Card className="col-span-12 md:col-span-6 lg:col-span-5" icon={LineChart} title="Real-Time Analytics" desc="Live dashboards on enrollment, performance, and operations — always up to date.">
            <svg viewBox="0 0 200 80" className="mt-5 h-20 w-full">
              <defs>
                <linearGradient id="fgrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.58 0.22 295)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="oklch(0.58 0.22 295)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,60 C30,50 50,30 80,32 C110,34 130,55 160,40 C180,30 195,20 200,18 L200,80 L0,80 Z" fill="url(#fgrad)" />
              <path d="M0,60 C30,50 50,30 80,32 C110,34 130,55 160,40 C180,30 195,20 200,18" fill="none" stroke="oklch(0.58 0.22 295)" strokeWidth="2" />
            </svg>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon: Icon, title, desc, children, className = "",
}: { icon: any; title: string; desc: string; children?: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow duration-500 hover:shadow-float ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 0%, oklch(0.92 0.09 275 / 0.55), transparent 65%)",
        }}
      />
      <div className="relative flex items-start gap-3">
        <motion.div
          whileHover={{ rotate: -6, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-violet/15 text-primary"
        >
          <Icon className="h-5 w-5" />
        </motion.div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
          <p className="mt-1 text-sm text-ink-muted">{desc}</p>
        </div>
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}
