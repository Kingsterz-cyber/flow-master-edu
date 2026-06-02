import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Panel, KPI, LineChart, Donut, Tag, Avatar } from "@/components/dashboard/primitives";
import {
  BookOpen, Users, CalendarCheck, NotebookPen, TrendingUp, CheckCircle2,
  Circle, Clock, AlertTriangle, ArrowUpRight, Plus, ChevronRight, Sparkles,
} from "lucide-react";

export function TeacherDashboard() {
  return (
    <DashboardLayout role="teacher">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Monday · Period 2 starts in 14m</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Good morning, <span className="font-display italic text-gradient-indigo">Marcus</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">You have 3 tasks pending and 4 classes scheduled today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-surface">
            <CalendarCheck className="h-3.5 w-3.5" /> Take attendance
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90">
            <NotebookPen className="h-3.5 w-3.5" /> Enter marks
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <KPI label="My Classes" value="6" icon={BookOpen} tint="primary" spark={[3,4,4,5,5,6,6,6]} />
        <KPI label="My Students" value="184" delta="+4" trend="up" icon={Users} tint="violet" spark={[4,5,5,6,6,7,7,8]} />
        <KPI label="Attendance Today" value="4/6" delta="2 left" trend="flat" icon={CalendarCheck} tint="cyan" spark={[3,3,4,5,5,6,6,7]} />
        <KPI label="Pending Marks" value="12" delta="−3" trend="down" icon={NotebookPen} tint="amber" spark={[8,8,7,6,6,5,4,3]} />
        <KPI label="Avg Performance" value="87.4" delta="+1.8" trend="up" icon={TrendingUp} tint="emerald" spark={[6,7,7,8,8,8,9,9]} />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* Performance chart */}
        <div className="col-span-12 xl:col-span-8">
          <Panel
            title={<div className="flex items-center gap-2"><span>Class performance · Grade 10-A Math</span><Tag tint="emerald">+4.2%</Tag></div>}
            action={
              <div className="flex items-center gap-1">
                {["1M","3M","Term"].map((t,i) => (
                  <button key={t} className={`rounded-md px-2 py-0.5 text-[10.5px] ${i===2 ? "bg-ink text-background" : "text-ink-muted hover:bg-surface"}`}>{t}</button>
                ))}
              </div>
            }
          >
            <div className="flex items-baseline gap-4">
              <div>
                <div className="text-2xl font-semibold text-ink">87.4</div>
                <div className="text-[10.5px] text-ink-muted">class average</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-violet">94%</div>
                <div className="text-[10.5px] text-ink-muted">attendance</div>
              </div>
              <div className="ml-auto flex gap-3 text-[10.5px]">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Class avg</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet" /> School avg</span>
              </div>
            </div>
            <div className="mt-3 h-44">
              <LineChart
                data={[72, 76, 78, 80, 82, 84, 83, 85, 87, 86, 88, 90]}
                color="oklch(0.52 0.22 275)"
                gradientId="tA"
                secondary={{ data: [68, 70, 71, 73, 74, 76, 77, 78, 80, 81, 82, 83], color: "oklch(0.58 0.22 295)", gradientId: "tB" }}
              />
            </div>
          </Panel>
        </div>

        {/* Today's tasks */}
        <div className="col-span-12 xl:col-span-4">
          <Panel
            title={<div className="flex items-center gap-2"><span>Today's tasks</span><Tag tint="amber">3 pending</Tag></div>}
            action={<Plus className="h-3.5 w-3.5 text-ink-muted" />}
          >
            <ul className="space-y-2">
              {[
                { i: AlertTriangle, c: "text-destructive bg-destructive/10", t: "Record attendance · 9-B", d: "Period 1 · 8:30 AM", state: "todo" },
                { i: Clock, c: "text-amber bg-amber/15", t: "Submit Math marks · 10-A", d: "Due by 5:00 PM", state: "todo" },
                { i: Clock, c: "text-amber bg-amber/15", t: "Review parent feedback", d: "3 new responses", state: "todo" },
                { i: CheckCircle2, c: "text-emerald bg-emerald/15", t: "Lesson plan uploaded", d: "Chapter 7 · Algebra", state: "done" },
                { i: CheckCircle2, c: "text-emerald bg-emerald/15", t: "Quiz graded · 11-A", d: "32 submissions", state: "done" },
              ].map((task, i) => (
                <li key={i} className="flex items-center gap-2.5 rounded-lg border border-border bg-surface/60 p-2.5">
                  <span className={`grid h-7 w-7 place-items-center rounded-lg ${task.c}`}>
                    <task.i className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className={`text-[11.5px] font-medium ${task.state === "done" ? "text-ink-muted line-through" : "text-ink"}`}>{task.t}</div>
                    <div className="truncate text-[10px] text-ink-muted">{task.d}</div>
                  </div>
                  {task.state === "todo" ? <Circle className="h-3.5 w-3.5 text-ink-muted" /> : <CheckCircle2 className="h-3.5 w-3.5 text-emerald" />}
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Attendance donut */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <Panel title="Attendance · This week" action={<button className="text-[10.5px] text-primary">Details</button>}>
            <div className="flex items-center gap-5">
              <Donut value={94} label="Attendance" />
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald" /><span className="text-ink-muted">Present</span><span className="ml-auto font-medium text-ink">173</span></div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber" /><span className="text-ink-muted">Late</span><span className="ml-auto font-medium text-ink">7</span></div>
                <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-destructive" /><span className="text-ink-muted">Absent</span><span className="ml-auto font-medium text-ink">4</span></div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Subject performance */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <Panel title="Subject breakdown">
            <div className="space-y-2.5">
              {[
                { s: "Algebra", v: 92 },
                { s: "Geometry", v: 86 },
                { s: "Trigonometry", v: 78 },
                { s: "Statistics", v: 84 },
              ].map((r) => (
                <div key={r.s}>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink">{r.s}</span>
                    <span className="font-medium text-ink">{r.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${r.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* AI insight */}
        <div className="col-span-12 xl:col-span-4">
          <Panel title="EduFlow AI · Insights">
            <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 via-violet/10 to-cyan/5 p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-[11px] font-semibold text-ink">Suggested focus</span>
              </div>
              <p className="mt-1 text-[11px] text-ink-muted">
                3 students in Grade 10-A are trending downward in Trigonometry. Consider a focused 20-minute session this week.
              </p>
              <button className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-primary">
                Schedule session <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </Panel>
        </div>

        {/* Top students */}
        <div className="col-span-12 md:col-span-6 xl:col-span-6">
          <Panel title="Top students" action={<button className="text-[10.5px] text-primary">View all</button>}>
            <ul className="divide-y divide-border">
              {[
                { n: "Mia Patel", c: "10-A", v: 96, t: "from-primary to-cyan", in: "MP" },
                { n: "Aarav Singh", c: "10-A", v: 94, t: "from-violet to-cyan", in: "AS" },
                { n: "Sophia Chen", c: "10-A", v: 92, t: "from-cyan to-emerald", in: "SC" },
                { n: "Liam Park", c: "10-A", v: 90, t: "from-amber to-violet", in: "LP" },
              ].map((s, i) => (
                <li key={s.n} className="flex items-center gap-3 py-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-surface text-[10px] font-medium text-ink-muted">{i+1}</span>
                  <Avatar initials={s.in} tint={s.t} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11.5px] font-medium text-ink">{s.n}</div>
                    <div className="text-[10px] text-ink-muted">{s.c}</div>
                  </div>
                  <span className="text-[12px] font-semibold text-emerald">{s.v}%</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Needs attention */}
        <div className="col-span-12 md:col-span-6 xl:col-span-6">
          <Panel title="Students needing attention" action={<Tag tint="destructive">4 flagged</Tag>}>
            <ul className="divide-y divide-border">
              {[
                { n: "Noah Kim", c: "9-C", r: "Attendance < 75%", v: "72%", t: "from-amber to-destructive", in: "NK", tint: "destructive" },
                { n: "Emma Lee", c: "10-B", r: "Avg dropped 8 pts", v: "64", t: "from-cyan to-violet", in: "EL", tint: "amber" },
                { n: "Ravi Iyer", c: "11-A", r: "Missing assignments (3)", v: "—", t: "from-violet to-primary", in: "RI", tint: "amber" },
                { n: "Olivia Brown", c: "10-A", r: "Late submission trend", v: "78", t: "from-primary to-cyan", in: "OB", tint: "amber" },
              ].map((s) => (
                <li key={s.n} className="flex items-center gap-3 py-2">
                  <Avatar initials={s.in} tint={s.t} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11.5px] font-medium text-ink">{s.n}</span>
                      <span className="text-[10px] text-ink-muted">· {s.c}</span>
                    </div>
                    <div className="text-[10px] text-ink-muted">{s.r}</div>
                  </div>
                  <Tag tint={s.tint as any}>{s.v}</Tag>
                  <button className="rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-ink hover:bg-background">
                    Contact
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
