import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "EduFlow replaced four tools we used to juggle. Attendance, grading, and parent comms now live in one place — and our staff actually enjoys using it.",
    name: "Dr. Amelia Hartwell",
    role: "Director, Northfield Academy",
    initials: "AH",
    color: "bg-primary",
  },
  {
    quote: "The analytics are extraordinary. We spotted struggling classes weeks earlier than usual and rolled out targeted support before exam season.",
    name: "Marcus Owolabi",
    role: "Head Administrator, Cedar International",
    initials: "MO",
    color: "bg-violet",
  },
  {
    quote: "Marking attendance used to take 10 minutes per class. Now it takes 30 seconds. The gradebook is the cleanest I've used in 15 years of teaching.",
    name: "Priya Raghavan",
    role: "Lead Teacher, Westbrook Schools",
    initials: "PR",
    color: "bg-cyan",
  },
  {
    quote: "Onboarding our three campuses took an afternoon. The teacher verification flow is exactly the kind of thoughtful detail that builds trust.",
    name: "Jonas Berg",
    role: "Director of Operations, Bluemont Prep",
    initials: "JB",
    color: "bg-emerald",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" /> Loved by educators
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            What schools are{" "}
            <span className="font-display italic text-gradient-indigo">saying</span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:shadow-float">
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/15" />
              <div className="mb-4 flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber text-amber" />
                ))}
              </div>
              <blockquote className="text-[15px] leading-relaxed text-ink">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-full ${t.color} text-xs font-semibold text-white`}>
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-ink">{t.name}</div>
                  <div className="text-xs text-ink-muted">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
