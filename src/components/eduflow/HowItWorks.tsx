import { Building2, UserPlus, Users, LineChart, FileText } from "lucide-react";

const steps = [
  { icon: Building2, title: "Create your school", desc: "Set up your institution profile, branding, and campuses in minutes." },
  { icon: UserPlus, title: "Invite teachers", desc: "Send secure verification links — teachers join with school code." },
  { icon: Users, title: "Enroll students", desc: "Bulk import or onboard one-by-one with parent details and classes." },
  { icon: LineChart, title: "Track performance", desc: "Real-time attendance, grades, and behavior insights flow in." },
  { icon: FileText, title: "Generate reports", desc: "Beautiful PDF report cards and analytics ready to share." },
];

export function HowItWorks() {
  return (
    <section className="relative bg-surface/60 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" /> How it works
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Get started in{" "}
            <span className="font-display italic text-gradient-indigo">five simple steps</span>
          </h2>
        </div>

        <div className="relative">
          {/* timeline line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full bg-background shadow-float ring-1 ring-border">
                  <span className="absolute -inset-1 rounded-full bg-primary/20 animate-pulse-ring" />
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="mt-5 rounded-2xl border border-border bg-background p-5 text-center shadow-soft">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-primary">Step {i + 1}</div>
                  <div className="mt-1 text-base font-semibold text-ink">{s.title}</div>
                  <p className="mt-2 text-xs text-ink-muted">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
