import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { DashboardMock } from "./DashboardMock";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-ink-muted shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Introducing EduFlow 2026 — AI-powered school operations</span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
            Manage your entire school from{" "}
            <span className="font-display italic text-gradient-indigo">one intelligent</span> platform
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base text-ink-muted sm:text-lg">
            Track attendance, manage students, record marks, generate reports, and gain real-time insights —
            all from one powerful platform built for modern education.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-background shadow-float transition hover:scale-[1.02]"
            >
              Start Free
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-5 py-3 text-sm font-medium text-ink backdrop-blur transition hover:bg-surface"
            >
              <PlayCircle className="h-4 w-4 text-primary" />
              Book Demo
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-muted">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
              No credit card required
            </div>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">14-day free trial</span>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="pointer-events-none absolute -inset-x-8 -top-8 h-72 bg-gradient-to-b from-primary/20 via-violet/10 to-transparent blur-3xl" aria-hidden />
          <div className="relative">
            <DashboardMock />
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Trusted by 300+ schools worldwide</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {["Northfield Academy", "Westbrook Schools", "Cedar International", "Riverside High", "Bluemont Prep", "Hilltop Education"].map((n) => (
              <span key={n} className="text-sm font-medium tracking-tight text-ink-muted">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
