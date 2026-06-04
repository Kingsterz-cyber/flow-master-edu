"use client";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardMock } from "./DashboardMock";
import { Parallax, ParallaxLayer, ease } from "@/components/motion/primitives";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh" aria-hidden />
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />

      {/* Ambient floating gradient blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
        animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-violet/20 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:pt-24">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
            }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-ink-muted shadow-soft backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Introducing EduFlow 2026 — AI-powered school operations</span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
            }}
            className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
          >
            Manage your entire school from{" "}
            <span className="font-display italic text-gradient-indigo">one intelligent</span> platform
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
            }}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base text-ink-muted sm:text-lg"
          >
            Track attendance, manage students, record marks, generate reports, and gain real-time insights —
            all from one powerful platform built for modern education.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
            }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <motion.a
              href="#cta"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-ink px-5 py-3 text-sm font-medium text-background shadow-float"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-violet to-primary opacity-0 transition group-hover:opacity-100" />
              <span className="relative">Start Free</span>
              <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-0.5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-background/80 px-5 py-3 text-sm font-medium text-ink backdrop-blur transition hover:bg-surface"
            >
              <PlayCircle className="h-4 w-4 text-primary" />
              Book Demo
            </motion.a>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { duration: 0.6, ease, delay: 0.2 } },
            }}
            className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-muted"
          >
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
              No credit card required
            </div>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">14-day free trial</span>
          </motion.div>
        </motion.div>

        {/* Dashboard preview with mouse-parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <div className="pointer-events-none absolute -inset-x-8 -top-8 h-72 bg-gradient-to-b from-primary/20 via-violet/10 to-transparent blur-3xl" aria-hidden />
          <Parallax strength={18} className="relative">
            <ParallaxLayer depth={1}>
              <DashboardMock />
            </ParallaxLayer>
          </Parallax>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease }}
          className="mt-16 text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">Trusted by 300+ schools worldwide</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {["Northfield Academy", "Westbrook Schools", "Cedar International", "Riverside High", "Bluemont Prep", "Hilltop Education"].map((n, i) => (
              <motion.span
                key={n}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.5, ease }}
                className="text-sm font-medium tracking-tight text-ink-muted"
              >
                {n}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
