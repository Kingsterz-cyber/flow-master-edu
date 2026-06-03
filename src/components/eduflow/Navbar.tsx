import { GraduationCap, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Analytics", href: "#analytics" },
  { label: "Solutions", href: "#solutions" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-soft">
          <a href="#" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
              <GraduationCap className="h-4.5 w-4.5" strokeWidth={2.25} />
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-ink">EduFlow</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="rounded-md px-3 py-1.5 text-sm text-ink-muted transition hover:bg-surface hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/auth/login"
              className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-ink-muted transition hover:text-ink sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              to="/auth"
              className="inline-flex items-center rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-background shadow-soft transition hover:opacity-90"
            >
              Get Started
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-3 md:hidden">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block rounded-md px-3 py-2 text-sm text-ink-muted hover:bg-surface"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
