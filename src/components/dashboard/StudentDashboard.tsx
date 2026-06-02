import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Panel, KPI, LineChart, Donut, Tag } from "@/components/dashboard/primitives";
import {
  CalendarCheck, Award, BookOpen, Trophy, Download, FileText, Calendar,
  TrendingUp, TrendingDown, Sparkles, ChevronRight, Clock,
} from "lucide-react";

export function StudentDashboard() {
  return (
    <DashboardLayout role="student">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">Term 2 · Week 9</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Hi <span className="font-display italic text-gradient-indigo">Priya</span> — you're on a 6-week streak 🎯
          </h1>
          <p className="mt-1 text-[13px] text-ink-muted">Your grade improved by 0.4 this term. Keep going!</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-ink hover:bg-surface">
            <Calendar className="h-3.5 w-3.5" /> Timetable
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-1.5 text-[12px] font-medium text-background hover:bg-ink/90">
            <Download className="h-3.5 w-3.5" /> Report card
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        <KPI label="Attendance" value="96%" delta="+2.1%" trend="up" icon={CalendarCheck} tint="emerald" spark={[4,5,5,6,7,7,8,9]} />
        <KPI label="Average Grade" value="A−" delta="+0.4" trend="up" icon={Award} tint="primary" spark={[5,5,6,6,7,7,8,8]} />
        <KPI label="Subjects Passed" value="8/8" icon={BookOpen} tint="violet" spark={[6,6,7,7,8,8,8,8]} />
        <KPI label="Current Rank" value="#7" delta="↑ 3" trend="up" icon={Trophy} tint="amber" spark={[10,9,9,8,8,7,7,7]} />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* Performance trend */}
        <div className="col-span-12 xl:col-span-8">
          <Panel
            title={<div className="flex items-center gap-2"><span>Your performance trend</span><Tag tint="emerald">+8% this term</Tag></div>}
            action={
              <div className="flex items-center gap-1">
                {["Term 1","Term 2","Year"].map((t,i) => (
                  <button key={t} className={`rounded-md px-2 py-0.5 text-[10.5px] ${i===1 ? "bg-ink text-background" : "text-ink-muted hover:bg-surface"}`}>{t}</button>
                ))}
              </div>
            }
          >
            <div className="flex items-baseline gap-4">
              <div>
                <div className="text-2xl font-semibold text-ink">87.5</div>
                <div className="text-[10.5px] text-ink-muted">your avg</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-violet">82.1</div>
                <div className="text-[10.5px] text-ink-muted">class avg</div>
              </div>
              <div className="ml-auto flex gap-3 text-[10.5px]">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> You</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-violet" /> Class</span>
              </div>
            </div>
            <div className="mt-3 h-44">
              <LineChart
                data={[74, 76, 78, 80, 82, 81, 84, 86, 85, 88, 87, 90]}
                color="oklch(0.52 0.22 275)"
                gradientId="sA"
                secondary={{ data: [72, 73, 74, 75, 77, 78, 79, 80, 81, 82, 82, 83], color: "oklch(0.58 0.22 295)", gradientId: "sB" }}
              />
            </div>
          </Panel>
        </div>

        {/* Attendance ring */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <Panel title="Attendance · This term">
            <div className="flex items-center gap-5">
              <Donut value={96} label="Attendance" color="oklch(0.62 0.16 165)" />
              <div className="flex-1 space-y-2 text-[11px]">
                <div className="flex justify-between"><span className="text-ink-muted">Present days</span><span className="font-medium text-ink">87</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Late</span><span className="font-medium text-amber">2</span></div>
                <div className="flex justify-between"><span className="text-ink-muted">Absent</span><span className="font-medium text-destructive">3</span></div>
                <div className="mt-2 rounded-lg bg-emerald/10 px-2 py-1.5 text-[10.5px] text-emerald">
                  Above 90% — keep it up!
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Subjects */}
        <div className="col-span-12 md:col-span-6 xl:col-span-7">
          <Panel title="Subject performance" action={<button className="text-[10.5px] text-primary">All grades</button>}>
            <div className="space-y-2.5">
              {[
                { s: "Mathematics", v: 94, g: "A", t: "emerald" },
                { s: "Physics", v: 89, g: "A−", t: "primary" },
                { s: "English", v: 86, g: "B+", t: "primary" },
                { s: "Chemistry", v: 82, g: "B+", t: "violet" },
                { s: "Biology", v: 78, g: "B", t: "amber" },
                { s: "History", v: 71, g: "B−", t: "destructive" },
              ].map((r) => (
                <div key={r.s}>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-ink">{r.s}</span>
                    <div className="flex items-center gap-2">
                      <Tag tint={r.t as any}>{r.g}</Tag>
                      <span className="w-9 text-right font-medium text-ink">{r.v}%</span>
                    </div>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-violet" style={{ width: `${r.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Insights */}
        <div className="col-span-12 xl:col-span-5">
          <Panel title="Performance insights">
            <div className="space-y-2.5">
              <div className="rounded-xl border border-border bg-emerald/5 p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald" />
                  <span className="text-[11px] font-semibold text-ink">Strongest subject</span>
                </div>
                <div className="mt-1 text-[12.5px] font-medium text-ink">Mathematics · 94%</div>
                <div className="text-[10.5px] text-ink-muted">You're in the top 5% of your class.</div>
              </div>
              <div className="rounded-xl border border-border bg-destructive/5 p-3">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-[11px] font-semibold text-ink">Needs improvement</span>
                </div>
                <div className="mt-1 text-[12.5px] font-medium text-ink">History · 71%</div>
                <div className="text-[10.5px] text-ink-muted">Try reviewing chapters 4–6 this week.</div>
              </div>
              <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 to-violet/5 p-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="text-[11px] font-semibold text-ink">AI tip</span>
                </div>
                <div className="mt-1 text-[11px] text-ink-muted">
                  Your attendance went up 4% — and your grades followed. Don't break the streak!
                </div>
              </div>
            </div>
          </Panel>
        </div>

        {/* Upcoming classes */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <Panel title="Upcoming classes today" action={<Clock className="h-3.5 w-3.5 text-ink-muted" />}>
            <ul className="space-y-2">
              {[
                { t: "Mathematics", r: "Room 204 · Mr. Bennett", time: "09:00", tint: "primary" },
                { t: "Physics", r: "Lab 1 · Ms. Rossi", time: "10:30", tint: "violet" },
                { t: "English Lit.", r: "Room 108 · Mr. Williams", time: "12:00", tint: "cyan" },
                { t: "Biology", r: "Lab 2 · Ms. Nair", time: "14:00", tint: "emerald" },
              ].map((c) => (
                <li key={c.t} className="flex items-center gap-3 rounded-lg border border-border bg-surface/60 p-2.5">
                  <div className={`grid h-10 w-12 place-items-center rounded-lg bg-${c.tint}/10 text-${c.tint} text-[11px] font-semibold`}>
                    {c.time}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11.5px] font-medium text-ink">{c.t}</div>
                    <div className="truncate text-[10px] text-ink-muted">{c.r}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Recent results */}
        <div className="col-span-12 md:col-span-6 xl:col-span-4">
          <Panel title="Recent results" action={<button className="text-[10.5px] text-primary">All</button>}>
            <ul className="divide-y divide-border">
              {[
                { s: "Math · Quiz 4", g: "A", v: "94/100", t: "emerald" },
                { s: "Physics · Lab Report", g: "A−", v: "88/100", t: "primary" },
                { s: "English · Essay", g: "B+", v: "86/100", t: "primary" },
                { s: "Chemistry · Mid-term", g: "B+", v: "82/100", t: "violet" },
                { s: "History · Quiz 3", g: "B−", v: "71/100", t: "destructive" },
              ].map((r) => (
                <li key={r.s} className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[11.5px] font-medium text-ink">{r.s}</div>
                    <div className="text-[10px] text-ink-muted">{r.v}</div>
                  </div>
                  <Tag tint={r.t as any}>{r.g}</Tag>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Announcements */}
        <div className="col-span-12 md:col-span-12 xl:col-span-4">
          <Panel title="Announcements">
            <ul className="space-y-2">
              {[
                { t: "Term 2 exams begin Mar 27", d: "Grade 10 timetable shared in email.", tag: ["amber","Exam"] },
                { t: "Science Fair sign-ups open", d: "Submit your project by Mar 20.", tag: ["violet","Event"] },
                { t: "Library hours extended", d: "Open until 8 PM on weekdays.", tag: ["primary","Notice"] },
              ].map((a) => (
                <li key={a.t} className="rounded-xl border border-border bg-surface/60 p-2.5">
                  <div className="mb-1"><Tag tint={a.tag[0] as any}>{a.tag[1]}</Tag></div>
                  <div className="text-[11.5px] font-medium text-ink">{a.t}</div>
                  <div className="text-[10.5px] text-ink-muted">{a.d}</div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Quick actions */}
        <div className="col-span-12">
          <Panel title="Quick actions">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                { i: FileText, l: "View Report Card", t: "bg-primary/10 text-primary" },
                { i: Calendar, l: "View Timetable", t: "bg-violet/15 text-violet" },
                { i: Download, l: "Download Reports", t: "bg-cyan/20 text-cyan" },
                { i: Trophy, l: "Achievements", t: "bg-amber/20 text-amber" },
              ].map((a) => (
                <button key={a.l} className="group flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-3 text-left hover:bg-background hover:shadow-soft">
                  <div className={`grid h-9 w-9 place-items-center rounded-lg ${a.t}`}>
                    <a.i className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-ink">{a.l}</div>
                    <div className="mt-0.5 flex items-center gap-1 text-[10px] text-ink-muted group-hover:text-primary">
                      Open <ChevronRight className="h-2.5 w-2.5" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
