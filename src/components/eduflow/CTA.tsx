import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-ink p-12 text-center shadow-float sm:p-20">
          <div className="absolute inset-0 opacity-60" aria-hidden style={{
            backgroundImage: `radial-gradient(ellipse 50% 60% at 20% 20%, oklch(0.52 0.22 275 / 0.55), transparent 60%),
              radial-gradient(ellipse 50% 60% at 80% 80%, oklch(0.58 0.22 295 / 0.45), transparent 60%),
              radial-gradient(ellipse 40% 50% at 60% 30%, oklch(0.78 0.13 210 / 0.35), transparent 60%)`,
          }} />
          <div
            className="absolute inset-0 opacity-[0.08]"
            aria-hidden
            style={{
              backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Limited spots for 2026 cohort
            </div>
            <h2 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Transform the way your school{" "}
              <span className="font-display italic">operates</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/70">
              Join modern schools using EduFlow to simplify administration and improve academic performance.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#" className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-float transition hover:scale-[1.02]">
                Get Started Today
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
                Talk to sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
