import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/eduflow/Navbar";
import { Hero } from "@/components/eduflow/Hero";
import { Stats } from "@/components/eduflow/Stats";
import { Features } from "@/components/eduflow/Features";
import { DashboardShowcase } from "@/components/eduflow/DashboardShowcase";
import { Analytics } from "@/components/eduflow/Analytics";
import { Roles } from "@/components/eduflow/Roles";
import { HowItWorks } from "@/components/eduflow/HowItWorks";
import { Testimonials } from "@/components/eduflow/Testimonials";
import { FAQ } from "@/components/eduflow/FAQ";
import { CTA } from "@/components/eduflow/CTA";
import { Footer } from "@/components/eduflow/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduFlow — Intelligent School Management Platform" },
      { name: "description", content: "Manage students, teachers, attendance, marks, reports, and real-time analytics from one powerful platform built for modern schools." },
      { property: "og:title", content: "EduFlow — Intelligent School Management Platform" },
      { property: "og:description", content: "Manage students, teachers, attendance, marks, reports, and real-time analytics from one powerful platform built for modern schools." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <DashboardShowcase />
        <Analytics />
        <Roles />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
