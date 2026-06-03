import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Mail, ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, PasswordField, SubmitButton } from "@/components/forms/Field";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({ meta: [{ title: "Reset your password · EduFlow" }] }),
  component: ForgotPasswordPage,
});

type Step = 0 | 1 | 2 | 3;

function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [pw, setPw] = useState({ a: "", b: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = () => setStep((s) => (Math.min(3, (s + 1) as Step)) as Step);
  const fakeLoad = (cb: () => void) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      cb();
    }, 900);
  };

  const steps = ["Email", "Verify", "Password", "Done"];

  return (
    <AuthShell
      eyebrow={`Step ${step + 1} of 4`}
      title={
        step === 0 ? <>Reset your <span className="font-display italic text-gradient-indigo">password</span></> :
        step === 1 ? <>Check your <span className="font-display italic text-gradient-indigo">inbox</span></> :
        step === 2 ? <>Choose a <span className="font-display italic text-gradient-indigo">new password</span></> :
        <>You're all <span className="font-display italic text-gradient-indigo">set</span>.</>
      }
      subtitle={
        step === 0 ? "Tell us the email tied to your EduFlow account and we'll send a 6-digit code." :
        step === 1 ? `We sent a 6-digit verification code to ${email}. Codes expire in 10 minutes.` :
        step === 2 ? "Pick something memorable — and strong. Avoid reusing passwords from other sites." :
        "Your password has been updated. You can now sign in with your new credentials."
      }
      footer={
        step < 3 ? (
          <Link to="/auth/login" className="inline-flex items-center gap-1 font-medium text-ink-muted hover:text-ink">
            <ArrowLeft className="h-3 w-3" /> Back to login
          </Link>
        ) : null
      }
    >
      <div className="mb-6 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div className="flex-1">
              <div
                className={`h-1 rounded-full transition-all ${
                  i < step ? "bg-emerald" : i === step ? "bg-gradient-to-r from-primary to-violet" : "bg-border"
                }`}
              />
              <div className={`mt-1.5 text-[10px] uppercase tracking-wider ${i <= step ? "text-ink" : "text-ink-muted"}`}>
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {step === 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.includes("@")) { setError("Enter a valid email"); return; }
            setError(null);
            fakeLoad(next);
          }}
          className="space-y-4"
        >
          <Field
            label="Account email"
            type="email"
            placeholder="you@school.edu"
            icon={<Mail className="h-3.5 w-3.5" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error ?? undefined}
            autoFocus
          />
          <SubmitButton loading={loading} type="submit">Send verification code</SubmitButton>
        </form>
      )}

      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (code.some((c) => !c)) { setError("Enter all 6 digits"); return; }
            setError(null);
            fakeLoad(next);
          }}
          className="space-y-4"
        >
          <OtpInput value={code} onChange={setCode} />
          {error && <p className="text-[11.5px] text-destructive">{error}</p>}
          <SubmitButton loading={loading} type="submit">Verify code</SubmitButton>
          <button type="button" className="block w-full text-center text-[12px] text-ink-muted hover:text-ink">
            Didn't receive it? <span className="font-medium text-primary">Resend code</span>
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (pw.a.length < 8) { setError("Minimum 8 characters"); return; }
            if (pw.a !== pw.b) { setError("Passwords don't match"); return; }
            setError(null);
            fakeLoad(next);
          }}
          className="space-y-4"
        >
          <PasswordField
            label="New password"
            value={pw.a}
            onChange={(e) => setPw((p) => ({ ...p, a: e.target.value }))}
            showStrength
            placeholder="At least 8 characters"
          />
          <PasswordField
            label="Confirm new password"
            value={pw.b}
            onChange={(e) => setPw((p) => ({ ...p, b: e.target.value }))}
            error={error && pw.a !== pw.b ? "Passwords don't match" : undefined}
            success={pw.b && pw.a === pw.b ? "Passwords match" : undefined}
            placeholder="Re-enter your password"
          />
          <SubmitButton loading={loading} type="submit">Update password</SubmitButton>
        </form>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald/30 bg-emerald/8 p-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-ink">Password updated</div>
              <div className="text-[11.5px] text-ink-muted">All sessions on other devices have been signed out.</div>
            </div>
          </div>
          <Link
            to="/auth/login"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[13.5px] font-medium text-background shadow-float transition hover:opacity-95"
          >
            <ShieldCheck className="h-4 w-4" /> Continue to log in
          </Link>
        </div>
      )}
    </AuthShell>
  );
}

function OtpInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => { refs.current[0]?.focus(); }, []);

  const set = (i: number, v: string) => {
    const c = v.replace(/[^0-9]/g, "").slice(-1);
    const next = [...value];
    next[i] = c;
    onChange(next);
    if (c && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-ink">Verification code</label>
      <div className="flex gap-2">
        {value.map((d, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => set(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
            }}
            className="h-13 w-full rounded-xl border border-border bg-card py-3 text-center font-display text-[22px] text-ink shadow-soft outline-none transition focus:border-primary/60 focus:ring-4 focus:ring-primary/12"
          />
        ))}
      </div>
    </div>
  );
}
