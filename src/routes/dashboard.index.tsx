import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield, BarChart3, GraduationCap, BookOpen, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Choose your dashboard — EduFlow" }] }),
  component: DashboardPicker,
});

function DashboardPicker() {
  const roles = [
    { to: "/dashboard/admin", icon: Shield, title: "School Director", desc: "Oversee staff, students, approvals and school-wide performance.", tint: "from-primary to-violet" },
    { to: "/dashboard/dos", icon: BarChart3, title: "Director of Studies", desc: "Academic command center — classes, subjects, attendance, marks.", tint: "from-violet to-cyan" },
    { to: "/dashboard/teacher", icon: GraduationCap, title: "Teacher", desc: "Daily workflow — take attendance, submit marks, track students.", tint: "from-cyan to-emerald" },
    { to: "/dashboard/student", icon: BookOpen, title: "Student", desc: "Personal portal — performance, attendance, results and reports.", tint: "from-amber to-violet" },
  ];
  return (
    <div className="min-h-screen bg-surface/40 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <div className="text-[11px] font-medium uppercase tracking-wider text-primary">EduFlow · Demo</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Choose a <span className="font-display italic text-gradient-indigo">dashboard</span>
          </h1>
          <p className="mt-2 text-[13px] text-ink-muted">Explore the experience tailored for each role.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-float"
            >
              <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${r.tint} text-white`}>
                <r.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">{r.title}</h3>
              <p className="mt-1 text-[12px] text-ink-muted">{r.desc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium text-primary">
                Open dashboard <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
