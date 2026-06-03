import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Field, PasswordField, Checkbox, SubmitButton } from "@/components/forms/Field";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Log in · EduFlow" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Enter your email and password to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/dashboard" });
    }, 900);
  };

  return (
    <AuthShell
      eyebrow="Sign in"
      title={<>Welcome back to <span className="font-display italic text-gradient-indigo">EduFlow</span></>}
      subtitle="Pick up exactly where you left off — your dashboard, your students, your school."
      footer={
        <>
          New to EduFlow?{" "}
          <Link to="/auth" className="font-medium text-primary hover:underline">
            Create or join a school
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@school.edu"
          icon={<Mail className="h-3.5 w-3.5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error && !email ? "Email is required" : undefined}
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error && !password ? "Password is required" : undefined}
        />

        <div className="flex items-center justify-between">
          <Checkbox label="Remember me for 30 days" checked={remember} onChange={setRemember} />
          <Link to="/auth/forgot-password" className="text-[12px] font-medium text-primary hover:underline">
            Forgot password?
          </Link>
        </div>

        <SubmitButton loading={loading} type="submit">
          Log in to EduFlow
        </SubmitButton>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-[11px] uppercase tracking-wider text-ink-muted">or</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/auth/create-school"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card text-[12.5px] font-medium text-ink transition hover:border-primary/40 hover:bg-surface"
          >
            Create school
          </Link>
          <Link
            to="/auth/join-school"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-card text-[12.5px] font-medium text-ink transition hover:border-primary/40 hover:bg-surface"
          >
            Join school
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
