import { Users, GraduationCap, CheckCircle2, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Students Managed", accent: "text-primary", bg: "bg-primary/10" },
  { icon: GraduationCap, value: "300+", label: "Teachers Supported", accent: "text-violet", bg: "bg-violet/15" },
  { icon: CheckCircle2, value: "98%", label: "Attendance Accuracy", accent: "text-emerald", bg: "bg-emerald/15" },
  { icon: Clock, value: "24/7", label: "Platform Availability", accent: "text-cyan", bg: "bg-cyan/20" },
];

export function Stats() {
  return (
    <section className="relative border-y border-border bg-surface/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group bg-background p-8 transition hover:bg-surface">
            <div className={`mb-4 grid h-10 w-10 place-items-center rounded-lg ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.accent}`} />
            </div>
            <div className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-ink-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
