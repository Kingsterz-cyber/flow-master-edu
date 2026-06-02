import { GraduationCap } from "lucide-react";

const cols = [
  { title: "Product", links: ["Features", "Analytics", "Reports", "Integrations"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Blog"] },
  { title: "Resources", links: ["FAQ", "Documentation", "Changelog", "Security"] },
  { title: "Contact", links: ["hello@eduflow.app", "Support", "Sales", "Press"] },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-4.5 w-4.5" strokeWidth={2.25} />
              </div>
              <span className="text-base font-semibold text-ink">EduFlow</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              The intelligent operating system for modern schools — built for directors, teachers, and students.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-ink-muted">
              <span className="h-2 w-2 rounded-full bg-emerald" />
              All systems operational
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-ink">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink-muted transition hover:text-ink">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-muted">© 2026 EduFlow Inc. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-ink-muted">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <a href="#" className="hover:text-ink">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
