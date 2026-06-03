import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, UserPlus, LogIn, ArrowRight, Shield } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/auth/")({
  head: () => ({ meta: [{ title: "Welcome to EduFlow" }] }),
  component: AuthLanding,
});

function AuthLanding() {
  const options = [
    {
      to: "/auth/login",
      icon: LogIn,
      title: "Log in",
      desc: "Access your existing EduFlow workspace.",
      tint: "from-ink to-ink",
      pill: "Returning user",
    },
    {
      to: "/auth/create-school",
      icon: Building2,
      title: "Create a school",
      desc: "Set up a new EduFlow workspace as a director.",
      tint: "from-primary to-violet",
      pill: "School director",
    },
    {
      to: "/auth/join-school",
      icon: UserPlus,
      title: "Join an existing school",
      desc: "Use your school code to register as a teacher.",
      tint: "from-cyan to-emerald",
      pill: "Teacher",
    },
  ];

  return (
    <AuthShell
      eyebrow="Welcome"
      title={<>Let's get you into <span className="font-display italic text-gradient-indigo">EduFlow</span>.</>}
      subtitle="Choose how you'd like to continue. You can switch roles anytime from settings."
      side="quote"
      footer={
        <span className="inline-flex items-center gap-1.5">
          <Shield className="h-3 w-3" /> Single sign-on (SAML / Google Workspace) available on Enterprise.
        </span>
      }
    >
      <div className="space-y-2.5">
        {options.map((o) => (
          <Link
            key={o.to}
            to={o.to}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-float"
          >
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${o.tint} text-white shadow-soft`}>
              <o.icon className="h-5 w-5" strokeWidth={2.1} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[13.5px] font-semibold text-ink">{o.title}</h3>
                <span className="rounded-full bg-surface px-1.5 py-0.5 text-[9.5px] font-medium uppercase tracking-wider text-ink-muted">
                  {o.pill}
                </span>
              </div>
              <p className="mt-0.5 text-[12px] text-ink-muted">{o.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-ink-muted transition group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </AuthShell>
  );
}
