import { TrendingUp, Users, GraduationCap, CheckCircle2, Sparkles } from "lucide-react";

export function AuthPreview() {
  const spark = [12, 18, 14, 22, 19, 28, 24, 34, 30, 40, 36, 46];
  const max = Math.max(...spark);

  return (
    <div className="relative h-full">
      <div className="absolute left-12 top-16 right-8">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-primary">Your school · live</div>
        <h2 className="mt-2 font-display text-[34px] leading-[1.1] tracking-tight text-ink">
          One workspace for the entire <em className="text-gradient-indigo">school year</em>.
        </h2>
        <p className="mt-3 max-w-sm text-[13px] text-ink-muted">
          Attendance, grades, parent updates and admissions — unified in real time.
        </p>
      </div>

      {/* Main dashboard card */}
      <div className="absolute right-8 top-44 w-[420px] rounded-2xl border border-border bg-card/95 p-4 shadow-float backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-ink-muted">School performance</div>
            <div className="mt-0.5 flex items-baseline gap-2">
              <div className="text-[22px] font-semibold tracking-tight text-ink">86.4%</div>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald/15 px-1.5 py-0.5 text-[9.5px] font-medium text-emerald">
                <TrendingUp className="h-2.5 w-2.5" /> +4.2%
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            {["1W", "1M", "1Y"].map((t, i) => (
              <span
                key={t}
                className={`rounded-md px-1.5 py-0.5 text-[9.5px] ${
                  i === 1 ? "bg-ink text-background" : "text-ink-muted"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 400 90" className="mt-3 h-24 w-full">
          <defs>
            <linearGradient id="ap-g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="oklch(0.52 0.22 275)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`M0,${90 - (spark[0] / max) * 70} ${spark
              .map((v, i) => `L${(i / (spark.length - 1)) * 400},${90 - (v / max) * 70}`)
              .join(" ")} L400,90 L0,90 Z`}
            fill="url(#ap-g)"
          />
          <path
            d={`M0,${90 - (spark[0] / max) * 70} ${spark
              .map((v, i) => `L${(i / (spark.length - 1)) * 400},${90 - (v / max) * 70}`)
              .join(" ")}`}
            fill="none"
            stroke="oklch(0.52 0.22 275)"
            strokeWidth="2"
          />
        </svg>
        <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3">
          {[
            { l: "Students", v: "1,284", i: Users },
            { l: "Teachers", v: "92", i: GraduationCap },
            { l: "Attend.", v: "94%", i: CheckCircle2 },
          ].map((k) => (
            <div key={k.l} className="rounded-lg bg-surface/70 px-2 py-1.5">
              <div className="flex items-center gap-1 text-[9.5px] uppercase tracking-wider text-ink-muted">
                <k.i className="h-2.5 w-2.5" /> {k.l}
              </div>
              <div className="mt-0.5 text-[14px] font-semibold text-ink">{k.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating chips */}
      <div className="absolute left-12 top-[420px] flex items-center gap-2.5 rounded-2xl border border-border bg-card/95 p-3 pr-4 shadow-float backdrop-blur-xl animate-float">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald to-cyan text-white">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[12px] font-medium text-ink">Term reports generated</div>
          <div className="text-[10.5px] text-ink-muted">312 report cards · just now</div>
        </div>
      </div>

      <div className="absolute right-16 top-[480px] flex items-center gap-2.5 rounded-2xl border border-border bg-card/95 p-3 pr-4 shadow-float backdrop-blur-xl animate-float-slow">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-violet text-white">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[12px] font-medium text-ink">AI flagged 4 at-risk students</div>
          <div className="text-[10.5px] text-ink-muted">Grade 9 · Math</div>
        </div>
      </div>
    </div>
  );
}
