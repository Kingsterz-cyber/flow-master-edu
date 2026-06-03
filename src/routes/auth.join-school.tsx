import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, User, KeyRound, Clock, CheckCircle2, Building2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, PasswordField, SubmitButton } from "@/components/forms/Field";

export const Route = createFileRoute("/auth/join-school")({
  head: () => ({ meta: [{ title: "Join a school · EduFlow" }] }),
  component: JoinSchoolPage,
});

function JoinSchoolPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", code: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<{ school: string } | null>(null);

  const upd = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = "Required";
    if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (form.password.length < 8) errs.password = "Minimum 8 characters";
    const cleanCode = form.code.replace(/\s|-/g, "");
    if (cleanCode.length < 6) errs.code = "School code must be 6 characters";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted({ school: "Northbridge Academy" });
    }, 1100);
  };

  if (submitted) {
    return (
      <AuthShell
        eyebrow="Request sent"
        title={<>You're <span className="font-display italic text-gradient-indigo">almost in</span>.</>}
        subtitle="Your registration request was sent to the school administrator for approval. We'll email you the moment it's reviewed."
        side="quote"
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber/15 text-amber">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10.5px] font-medium uppercase tracking-wider text-amber">Pending approval</div>
                <div className="text-[14px] font-semibold text-ink">{submitted.school}</div>
              </div>
            </div>
            <ol className="mt-5 space-y-3 border-l border-border pl-5">
              {[
                { t: "Request submitted", d: "Just now", done: true },
                { t: "Administrator review", d: "Usually within a few hours", done: false },
                { t: "Welcome email + access", d: "We'll notify you here", done: false },
              ].map((s, i) => (
                <li key={i} className="relative">
                  <span
                    className={`absolute -left-[26px] grid h-4 w-4 place-items-center rounded-full ${
                      s.done ? "bg-emerald text-white" : "border border-border bg-card text-ink-muted"
                    }`}
                  >
                    {s.done ? <CheckCircle2 className="h-3 w-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-ink-muted" />}
                  </span>
                  <div className="text-[12.5px] font-medium text-ink">{s.t}</div>
                  <div className="text-[11px] text-ink-muted">{s.d}</div>
                </li>
              ))}
            </ol>
          </div>
          <Link
            to="/"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border bg-card text-[13px] font-medium text-ink transition hover:bg-surface"
          >
            Back to homepage
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Teacher onboarding"
      title={<>Join your <span className="font-display italic text-gradient-indigo">school</span> in seconds</>}
      subtitle="Use the 6-character code shared by your school director. We'll create your teacher account and send it for approval."
      footer={
        <>
          Director instead?{" "}
          <Link to="/auth/create-school" className="font-medium text-primary hover:underline">
            Create a new school
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <Field
          label="Full name"
          icon={<User className="h-3.5 w-3.5" />}
          placeholder="Jane Doe"
          value={form.name}
          onChange={upd("name")}
          error={errors.name}
        />
        <Field
          label="Work email"
          type="email"
          icon={<Mail className="h-3.5 w-3.5" />}
          placeholder="jane@school.edu"
          value={form.email}
          onChange={upd("email")}
          error={errors.email}
        />
        <PasswordField
          label="Password"
          placeholder="Choose a strong password"
          value={form.password}
          onChange={upd("password")}
          error={errors.password}
          showStrength
        />
        <Field
          label="School code"
          icon={<KeyRound className="h-3.5 w-3.5" />}
          placeholder="ABC-XYZ"
          value={form.code}
          onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
          hint="Ask your school director for this 6-character code."
          error={errors.code}
          className="font-mono tracking-[0.15em]"
        />

        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3 py-2.5 text-[11.5px] text-ink-muted">
          <Building2 className="h-3.5 w-3.5 text-primary" />
          Your account will need administrator approval before you can sign in.
        </div>

        <SubmitButton loading={loading} type="submit">
          Send registration request
        </SubmitButton>
      </form>
    </AuthShell>
  );
}
