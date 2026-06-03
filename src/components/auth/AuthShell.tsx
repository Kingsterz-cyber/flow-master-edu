import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { GraduationCap, ShieldCheck, Sparkles, Lock } from "lucide-react";
import { AuthPreview } from "./AuthPreview";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  side?: "preview" | "quote" | "minimal";
}

export function AuthShell({ eyebrow, title, subtitle, children, footer, side = "preview" }: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-ink">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 bg-mesh" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Form side */}
        <div className="flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-background shadow-soft">
              <GraduationCap className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="text-[14.5px] font-semibold tracking-tight text-ink">EduFlow</span>
          </Link>

          <div className="mx-auto w-full max-w-[420px] py-10">
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wider text-primary backdrop-blur">
                <Sparkles className="h-3 w-3" /> {eyebrow}
              </div>
            )}
            <h1 className="text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">{title}</h1>
            {subtitle && <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{subtitle}</p>}

            <div className="mt-7">{children}</div>

            {footer && <div className="mt-6 text-[12.5px] text-ink-muted">{footer}</div>}
          </div>

          <div className="flex items-center justify-between text-[11px] text-ink-muted">
            <div className="flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> 256-bit encrypted · SOC 2 in progress
            </div>
            <Link to="/" className="hover:text-ink">
              ← Back to site
            </Link>
          </div>
        </div>

        {/* Visual side */}
        <div className="relative hidden overflow-hidden border-l border-border bg-gradient-to-br from-surface via-surface-2 to-background lg:block">
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-violet/15 blur-3xl" />

          {side === "preview" && <AuthPreview />}
          {side === "quote" && (
            <div className="relative flex h-full items-center justify-center px-12">
              <div className="max-w-md">
                <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-primary">
                  Trusted by school leaders
                </div>
                <p className="mt-4 font-display text-[34px] leading-[1.15] tracking-tight text-ink">
                  "EduFlow replaced four legacy tools in our network — and our directors actually use it."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-violet" />
                  <div>
                    <div className="text-[13px] font-semibold text-ink">Amelia Hart</div>
                    <div className="text-[11.5px] text-ink-muted">Director · Northbridge Academy</div>
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-2 rounded-xl border border-border bg-card/70 p-3 text-[11.5px] text-ink-muted backdrop-blur">
                  <ShieldCheck className="h-4 w-4 text-emerald" />
                  GDPR · FERPA aligned · daily encrypted backups
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
