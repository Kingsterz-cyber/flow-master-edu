import { Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "Can multiple schools use the platform?", a: "Yes. EduFlow is fully multi-tenant. Directors can create unlimited schools, each with isolated data, branding, and permissions. Perfect for districts and education groups." },
  { q: "Is attendance tracked in real time?", a: "Absolutely. Teachers mark attendance from any device and the data syncs instantly. Parents and admins see live status, with automated alerts for absences." },
  { q: "Can reports be exported?", a: "Every report, transcript, and analytics view can be exported as PDF, CSV, or Excel. You can also schedule recurring email reports to parents and stakeholders." },
  { q: "Is teacher access secure?", a: "Teachers join through secure school-verification invites with role-based permissions, SSO support, and full audit logging. Your data stays yours." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-surface/60 py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Questions
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Frequently asked{" "}
            <span className="font-display italic text-gradient-indigo">questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium text-ink">{f.q}</span>
                  <span className={`grid h-8 w-8 place-items-center rounded-full bg-surface transition ${isOpen ? "rotate-45 bg-primary text-primary-foreground" : "text-ink"}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-ink-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
