import { Shield, GraduationCap, BookOpenCheck, Check } from "lucide-react";

const roles = [
  {
    icon: Shield,
    title: "Administrator",
    tag: "Full control",
    desc: "Manage the entire school — operations, staff, students, finances, and reports.",
    bullets: ["School & multi-campus setup", "Invite & verify teachers", "Compliance reporting"],
    grad: "from-primary to-violet",
  },
  {
    icon: GraduationCap,
    title: "Teacher",
    tag: "Classroom-ready",
    desc: "Track attendance, record marks, and monitor performance for every class.",
    bullets: ["One-tap roll call", "Gradebook & assessments", "Parent communication"],
    grad: "from-violet to-cyan",
  },
  {
    icon: BookOpenCheck,
    title: "Student",
    tag: "Always informed",
    desc: "Monitor grades, attendance, reports, and academic progress in real time.",
    bullets: ["Personal dashboard", "Assignments & schedule", "Progress timeline"],
    grad: "from-cyan to-emerald",
  },
];

export function Roles() {
  return (
    <section id="solutions" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> Built for every role
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            One platform,{" "}
            <span className="font-display italic text-gradient-indigo">three perspectives</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {roles.map((r) => (
            <div key={r.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-soft transition hover:-translate-y-1 hover:shadow-float">
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${r.grad} opacity-15 blur-2xl transition group-hover:opacity-30`} />
              <div className={`mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${r.grad} bg-clip-padding px-2.5 py-1`}>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white mix-blend-difference">{r.tag}</span>
              </div>
              <div className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${r.grad} text-white shadow-float`}>
                <r.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{r.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{r.desc}</p>
              <ul className="mt-6 space-y-2">
                {r.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-ink">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald/15 text-emerald">
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
