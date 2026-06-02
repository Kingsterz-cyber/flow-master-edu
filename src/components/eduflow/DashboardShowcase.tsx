import { DashboardMock } from "./DashboardMock";

export function DashboardShowcase() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-violet" /> Dashboard
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Powerful insights{" "}
            <span className="font-display italic text-gradient-indigo">at a glance</span>
          </h2>
          <p className="mt-4 text-base text-ink-muted">
            A single command center for attendance, academic performance, class rankings, teacher activity, and school-wide statistics.
          </p>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute -inset-x-8 -top-8 h-72 bg-gradient-to-b from-violet/15 via-primary/10 to-transparent blur-3xl" aria-hidden />
          <div className="relative">
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
}
