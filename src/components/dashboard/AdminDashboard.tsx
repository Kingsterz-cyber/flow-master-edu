import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Panel, KPI, SectionHeading, LineChart, BarChart, Tag, Avatar } from "@/components/dashboard/primitives";
import {
  Users, GraduationCap, BookOpen, CalendarCheck, Award, Hourglass,
  UserPlus, FileText, Plus, CalendarDays, MoreHorizontal, ArrowUpRight,
  NotebookPen, Bell, Sparkles, ChevronRight, CheckCircle2,
} from "lucide-react";

export function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      {/* Hero greeting */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Monday · March 16, 2026</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Welcome back, <span className="font-display italic text-gradient-indigo">Amelia</span>
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">Here's what's happening across Northfield High today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-surface">
            <CalendarDays className="h-3.5 w-3.5" /> This term
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90">
            <FileText className="h-3.5 w-3.5" /> Generate report
          </button>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <KPI label="Total Students" value="5,248" delta="+128" trend="up" icon={Users} tint="primary" spark={[3,4,3,5,6,5,7,8]} />
        <KPI label="Total Teachers" value="312" delta="+6" trend="up" icon={GraduationCap} tint="violet" spark={[2,3,3,4,4,5,6,6]} />
        <KPI label="Total Classes" value="184" delta="+4" trend="up" icon={BookOpen} tint="cyan" spark={[3,3,4,4,5,5,5,6]} />
        <KPI label="Attendance Rate" value="96.4%" delta="+2.1%" trend="up" icon={CalendarCheck} tint="emerald" spark={[4,5,6,5,7,8,7,9]} />
        <KPI label="Avg Score" value="A−" delta="+0.3" trend="up" icon={Award} tint="primary" spark={[3,4,4,5,5,6,7,8]} />
        <KPI label="Pending Approvals" value="14" delta="−3" trend="down" icon={Hourglass} tint="amber" spark={[8,7,6,6,5,5,4,3]} />
      </div>

      {/* Bento grid */}
      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* Attendance trend - large */}
        <div className="col-span-12 xl:col-span-8">
          <Panel
            title={
              <div className="flex items-center gap-2">
                <span>Attendance & Performance trend</span>
                <Tag tint="emerald">+12.4% MoM</Tag>
              </div>
            }
            action={
              <div className="flex items-center gap-1">
                {["1W", "1M", "3M", "1Y"].map((t, i) => (
                  <button key={t} className={`rounded-md px-2 py-0.5 text-[10.5px] ${i === 2 ? "bg-ink text-background" : "text-ink-muted hover:bg-surface"}`}>
                    {t}
                  </button>
                ))}
              </div>
            }
          >
            <div className="flex items-baseline gap-4">
              <div>
                <div className="text-2xl font-semibold text-ink">96.4%</div>
                <div className="text-[10.5px] text-ink-muted">avg attendance</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-violet">87.2</div>
                <div className="text-[10.5px] text-ink-muted">avg performance</div>
              </div>
              <div className="ml-auto flex gap-3 text-[10.5px]">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Attendance</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet" /> Performance</span>
              </div>
            </div>
            <div className="mt-3 h-48">
              <LineChart
                data={[78, 82, 80, 86, 88, 84, 90, 92, 89, 94, 93, 96]}
                color="oklch(0.52 0.22 275)"
                gradientId="adminA"
                secondary={{ data: [70, 72, 75, 74, 78, 80, 82, 81, 85, 84, 86, 87], color: "oklch(0.58 0.22 295)", gradientId: "adminB" }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[9.5px] text-ink-muted">
              {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => <span key={m}>{m}</span>)}
            </div>
          </Panel>
        </div>

        {/* Quick actions */}
        <div className="col-span-12 xl:col-span-4">
          <Panel title="Quick actions">
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: UserPlus, label: "Add Student", tint: "bg-primary/10 text-primary" },
                { icon: GraduationCap, label: "Add Teacher", tint: "bg-violet/15 text-violet" },
                { icon: BookOpen, label: "Create Class", tint: "bg-cyan/20 text-cyan" },
                { icon: FileText, label: "Generate Report", tint: "bg-emerald/15 text-emerald" },
              ].map((a) => (
                <button key={a.label} className="group flex flex-col gap-2 rounded-xl border border-border bg-surface p-3 text-left hover:bg-background hover:shadow-soft">
                  <div className={`grid h-8 w-8 place-items-center rounded-lg ${a.tint}`}>
                    <a.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-[12px] font-medium text-ink">{a.label}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[10px] text-ink-muted group-hover:text-primary">
                      Open <ChevronRight className="h-2.5 w-2.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-violet/10 p-3">
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-primary/15 text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="text-[12px] font-medium text-ink">AI Insight</div>
                  <div className="text-[10.5px] text-ink-muted">Grade 9-C attendance dropped 4.2% this week.</div>
                </div>
              </div>
              <button className="mt-2 w-full rounded-md bg-ink px-2 py-1.5 text-[11px] font-medium text-background hover:bg-ink/90">
                Investigate
              </button>
            </div>
          </Panel>
        </div>

        {/* Class performance comparison */}
        <div className="col-span-12 md:col-span-6 xl:col-span-5">
          <Panel title="Class performance comparison" action={<button className="text-[10.5px] text-primary">View all</button>}>
            <div className="h-44">
              <BarChart
                data={[88, 92, 76, 84, 90, 81, 86, 94]}
                labels={["9A","9B","9C","10A","10B","11A","11B","12A"]}
                color="oklch(0.52 0.22 275)"
              />
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[11px]">
              <span className="text-ink-muted">Top: <span className="font-medium text-ink">12A · 94%</span></span>
              <span className="text-ink-muted">Needs focus: <span className="font-medium text-destructive">9C · 76%</span></span>
            </div>
          </Panel>
        </div>

        {/* Subject performance */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <Panel title="Subject performance" action={<MoreHorizontal className="h-3.5 w-3.5 text-ink-muted" />}>
            <div className="space-y-2.5">
              {[
                { s: "Mathematics", v: 91, t: "primary" },
                { s: "Physics", v: 86, t: "violet" },
                { s: "English", v: 83, t: "cyan" },
                { s: "Biology", v: 78, t: "emerald" },
                { s: "History", v: 72, t: "amber" },
              ].map((r) => (
                <div key={r.s}>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-ink">{r.s}</span>
                    <span className="font-medium text-ink">{r.v}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div className={`h-full rounded-full bg-${r.t}`} style={{ width: `${r.v}%`, background: `linear-gradient(90deg, var(--${r.t === "primary" ? "primary" : r.t}), var(--violet))` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Activity feed */}
        <div className="col-span-12 xl:col-span-3">
          <Panel title="Recent activity" action={<button className="text-[10.5px] text-primary">All</button>}>
            <ul className="space-y-3">
              {[
                { i: NotebookPen, c: "bg-primary/10 text-primary", t: "Marks submitted", d: "Mr. Davis · Grade 10A Math", time: "2m" },
                { i: UserPlus, c: "bg-emerald/15 text-emerald", t: "New student registered", d: "Sophia Chen · Grade 9", time: "18m" },
                { i: CalendarCheck, c: "bg-cyan/20 text-cyan", t: "Attendance recorded", d: "Grade 11B · Period 3", time: "1h" },
                { i: FileText, c: "bg-violet/15 text-violet", t: "Report generated", d: "Term 2 academic summary", time: "3h" },
                { i: Bell, c: "bg-amber/20 text-amber", t: "Announcement sent", d: "Parent-teacher meeting", time: "5h" },
              ].map((a, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className={`grid h-7 w-7 place-items-center rounded-lg ${a.c}`}>
                    <a.i className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11.5px] font-medium text-ink">{a.t}</div>
                    <div className="truncate text-[10.5px] text-ink-muted">{a.d}</div>
                  </div>
                  <span className="text-[9.5px] text-ink-muted">{a.time}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Recent Students Table */}
        <div className="col-span-12 xl:col-span-8">
          <Panel
            title="Recent students"
            action={<button className="inline-flex items-center gap-1 text-[10.5px] text-primary">View directory <ArrowUpRight className="h-3 w-3" /></button>}
          >
            <div className="-mx-4 overflow-x-auto">
              <table className="w-full text-[11.5px]">
                <thead>
                  <tr className="border-b border-border text-left text-[10px] uppercase tracking-wider text-ink-muted">
                    <th className="px-4 py-2 font-medium">Student</th>
                    <th className="px-4 py-2 font-medium">Class</th>
                    <th className="px-4 py-2 font-medium">Attendance</th>
                    <th className="px-4 py-2 font-medium">Avg score</th>
                    <th className="px-4 py-2 font-medium">Status</th>
                    <th className="px-4 py-2 font-medium text-right">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { n: "Sophia Chen", c: "Grade 9-A", a: 98, s: 92, st: ["emerald","Excellent"], j: "Mar 14", t: "from-primary to-violet", in: "SC" },
                    { n: "Liam Park", c: "Grade 10-B", a: 94, s: 86, st: ["primary","Good"], j: "Mar 12", t: "from-violet to-cyan", in: "LP" },
                    { n: "Ava Robinson", c: "Grade 11-A", a: 89, s: 78, st: ["amber","Watch"], j: "Mar 10", t: "from-cyan to-emerald", in: "AR" },
                    { n: "Noah Kim", c: "Grade 9-C", a: 72, s: 64, st: ["destructive","At risk"], j: "Mar 09", t: "from-amber to-destructive", in: "NK" },
                    { n: "Mia Patel", c: "Grade 12-A", a: 96, s: 95, st: ["emerald","Excellent"], j: "Mar 08", t: "from-primary to-cyan", in: "MP" },
                  ].map((r) => (
                    <tr key={r.n} className="transition hover:bg-surface/60">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar initials={r.in} tint={r.t} />
                          <div>
                            <div className="font-medium text-ink">{r.n}</div>
                            <div className="text-[10px] text-ink-muted">id #{Math.floor(Math.random()*9000+1000)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-ink-muted">{r.c}</td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-16 overflow-hidden rounded-full bg-surface">
                            <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${r.a}%` }} />
                          </div>
                          <span className="text-ink">{r.a}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 font-medium text-ink">{r.s}</td>
                      <td className="px-4 py-2.5">
                        <Tag tint={r.st[0] as any}>{r.st[1]}</Tag>
                      </td>
                      <td className="px-4 py-2.5 text-right text-ink-muted">{r.j}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        {/* Upcoming events */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <Panel title="Upcoming events" action={<Plus className="h-3.5 w-3.5 text-ink-muted" />}>
            <ul className="space-y-2.5">
              {[
                { d: "18", m: "MAR", t: "Parent-Teacher Conference", s: "10:00 AM · Main Hall", tint: "primary" },
                { d: "22", m: "MAR", t: "Science Fair 2026", s: "All day · Auditorium", tint: "violet" },
                { d: "27", m: "MAR", t: "Term 2 Exams begin", s: "9:00 AM · All grades", tint: "amber" },
                { d: "02", m: "APR", t: "Annual Sports Day", s: "8:00 AM · Field", tint: "emerald" },
              ].map((e) => (
                <li key={e.t} className="flex items-center gap-3 rounded-lg border border-border bg-surface/60 p-2.5">
                  <div className={`grid h-11 w-11 place-items-center rounded-lg bg-${e.tint}/10 text-${e.tint}`}>
                    <div className="text-center">
                      <div className="text-[14px] font-semibold leading-none">{e.d}</div>
                      <div className="text-[8.5px] uppercase tracking-wider">{e.m}</div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11.5px] font-medium text-ink">{e.t}</div>
                    <div className="truncate text-[10px] text-ink-muted">{e.s}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Teacher overview */}
        <div className="col-span-12 md:col-span-6 xl:col-span-6">
          <Panel title="Teacher overview" action={<button className="text-[10.5px] text-primary">All teachers</button>}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                { n: "Marcus Bennett", s: "Math · 6 classes", p: 94, t: "from-primary to-violet", in: "MB" },
                { n: "Elena Rossi", s: "Physics · 5 classes", p: 91, t: "from-violet to-cyan", in: "ER" },
                { n: "Jordan Williams", s: "English · 7 classes", p: 88, t: "from-cyan to-emerald", in: "JW" },
                { n: "Priya Nair", s: "Biology · 4 classes", p: 90, t: "from-amber to-violet", in: "PN" },
              ].map((t) => (
                <div key={t.n} className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-2.5">
                  <Avatar initials={t.in} tint={t.t} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11.5px] font-medium text-ink">{t.n}</div>
                    <div className="truncate text-[10px] text-ink-muted">{t.s}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[12px] font-semibold text-ink">{t.p}%</div>
                    <div className="text-[9px] text-ink-muted">rating</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Announcements */}
        <div className="col-span-12 xl:col-span-6">
          <Panel title="School announcements" action={<button className="text-[10.5px] text-primary">New</button>}>
            <ul className="space-y-2">
              {[
                { t: "Spring break schedule released", d: "Apr 5–Apr 13. Detailed schedule shared with all parents.", tag: ["primary","School-wide"], time: "2h ago" },
                { t: "New AI lab inaugurated", d: "Grades 9–12 will rotate weekly for hands-on sessions.", tag: ["violet","Academics"], time: "1d ago" },
                { t: "Updated transport routes", d: "Routes 4 and 7 will start 10 minutes earlier from Monday.", tag: ["amber","Operations"], time: "3d ago" },
              ].map((a) => (
                <li key={a.t} className="rounded-xl border border-border bg-surface/60 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <Tag tint={a.tag[0] as any}>{a.tag[1]}</Tag>
                    <span className="ml-auto text-[10px] text-ink-muted">{a.time}</span>
                  </div>
                  <div className="text-[12px] font-medium text-ink">{a.t}</div>
                  <div className="mt-0.5 text-[10.5px] text-ink-muted">{a.d}</div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
