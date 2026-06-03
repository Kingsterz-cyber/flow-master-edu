import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Mail, User, Copy, Check, PartyPopper, ArrowRight } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, PasswordField, SubmitButton } from "@/components/forms/Field";

export const Route = createFileRoute("/auth/create-school")({
  head: () => ({ meta: [{ title: "Create your school · EduFlow" }] }),
  component: CreateSchoolPage,
});

interface SchoolResult {
  schoolName: string;
  schoolId: string;
  code: string;
}

function genCode(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function CreateSchoolPage() {
  const [form, setForm] = useState({
    schoolName: "",
    schoolEmail: "",
    directorName: "",
    directorEmail: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SchoolResult | null>(null);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.schoolName) errs.schoolName = "School name is required";
    if (!form.schoolEmail.includes("@")) errs.schoolEmail = "Enter a valid school email";
    if (!form.directorName) errs.directorName = "Director name is required";
    if (!form.directorEmail.includes("@")) errs.directorEmail = "Enter a valid email";
    if (form.password.length < 8) errs.password = "Minimum 8 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords don't match";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult({
        schoolName: form.schoolName,
        schoolId: "SCH-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
        code: `${genCode(3)}-${genCode(3)}`,
      });
    }, 1100);
  };

  if (result) return <SuccessView result={result} />;

  return (
    <AuthShell
      eyebrow="School director"
      title={<>Launch your <span className="font-display italic text-gradient-indigo">school workspace</span></>}
      subtitle="Set up the master account for your institution. You'll be able to invite teachers right after."
      footer={
        <>
          Already have a workspace?{" "}
          <Link to="/auth/login" className="font-medium text-primary hover:underline">
            Log in instead
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="rounded-2xl border border-border bg-surface/40 p-3.5">
          <div className="mb-3 text-[10.5px] font-medium uppercase tracking-wider text-ink-muted">School</div>
          <div className="space-y-3">
            <Field
              label="School name"
              icon={<Building2 className="h-3.5 w-3.5" />}
              placeholder="Northbridge Academy"
              value={form.schoolName}
              onChange={update("schoolName")}
              error={errors.schoolName}
            />
            <Field
              label="School email"
              type="email"
              icon={<Mail className="h-3.5 w-3.5" />}
              placeholder="hello@northbridge.edu"
              value={form.schoolEmail}
              onChange={update("schoolEmail")}
              error={errors.schoolEmail}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/40 p-3.5">
          <div className="mb-3 text-[10.5px] font-medium uppercase tracking-wider text-ink-muted">Director account</div>
          <div className="space-y-3">
            <Field
              label="Full name"
              icon={<User className="h-3.5 w-3.5" />}
              placeholder="Amelia Hart"
              value={form.directorName}
              onChange={update("directorName")}
              error={errors.directorName}
            />
            <Field
              label="Personal email"
              type="email"
              icon={<Mail className="h-3.5 w-3.5" />}
              placeholder="amelia@northbridge.edu"
              value={form.directorEmail}
              onChange={update("directorEmail")}
              error={errors.directorEmail}
            />
            <PasswordField
              label="Password"
              placeholder="At least 8 characters"
              value={form.password}
              onChange={update("password")}
              error={errors.password}
              showStrength
            />
            <PasswordField
              label="Confirm password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={update("confirm")}
              error={errors.confirm}
              success={form.confirm && form.confirm === form.password ? "Passwords match" : undefined}
            />
          </div>
        </div>

        <SubmitButton loading={loading} type="submit">
          Create my school
        </SubmitButton>
        <p className="text-center text-[11px] text-ink-muted">
          By continuing you accept our <span className="underline">Terms</span> and{" "}
          <span className="underline">Privacy Policy</span>.
        </p>
      </form>
    </AuthShell>
  );
}

function SuccessView({ result }: { result: SchoolResult }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <AuthShell
      eyebrow="School ready"
      title={<><span className="font-display italic text-gradient-indigo">{result.schoolName}</span> is live.</>}
      subtitle="Share the school code with your teachers so they can join and start onboarding their classes."
      side="quote"
    >
      <div className="space-y-5">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/8 via-violet/8 to-cyan/8 p-5">
          <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-emerald/15 px-2 py-0.5 text-[10px] font-medium text-emerald">
            <PartyPopper className="h-3 w-3" /> Created
          </div>
          <div className="text-[10.5px] uppercase tracking-wider text-ink-muted">School code</div>
          <div className="mt-2 flex items-center gap-3">
            <div className="font-display text-[44px] tracking-[0.06em] text-ink">{result.code}</div>
            <button
              onClick={copy}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-[12px] font-medium text-ink transition hover:bg-surface"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-lg bg-card/70 px-2.5 py-1.5">
              <div className="uppercase tracking-wider text-ink-muted text-[9.5px]">School ID</div>
              <div className="font-medium text-ink">{result.schoolId}</div>
            </div>
            <div className="rounded-lg bg-card/70 px-2.5 py-1.5">
              <div className="uppercase tracking-wider text-ink-muted text-[9.5px]">Plan</div>
              <div className="font-medium text-ink">Starter · 30-day trial</div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-border bg-card p-4">
          <div className="text-[12.5px] font-semibold text-ink">Next: invite your teachers</div>
          <p className="mt-1 text-[12px] text-ink-muted">
            Teachers go to <span className="font-medium text-ink">eduflow.app/join</span> and enter your code. You'll
            review and approve each request from the dashboard.
          </p>
        </div>

        <Link
          to="/dashboard/admin"
          className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[13.5px] font-medium text-background shadow-float transition hover:opacity-95"
        >
          Open my dashboard
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </AuthShell>
  );
}
