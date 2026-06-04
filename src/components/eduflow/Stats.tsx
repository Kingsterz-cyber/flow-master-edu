"use client";
import { Users, GraduationCap, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Counter, ease } from "@/components/motion/primitives";

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Students Managed", accent: "text-primary", bg: "bg-primary/10" },
  { icon: GraduationCap, value: 300, suffix: "+", label: "Teachers Supported", accent: "text-violet", bg: "bg-violet/15" },
  { icon: CheckCircle2, value: 98, suffix: "%", label: "Attendance Accuracy", accent: "text-emerald", bg: "bg-emerald/15" },
  { icon: Clock, value: 24, suffix: "/7", label: "Platform Availability", accent: "text-cyan", bg: "bg-cyan/20" },
];

export function Stats() {
  return (
    <section className="relative border-y border-border bg-surface/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
            className="group bg-background p-8 transition hover:bg-surface"
          >
            <div className={`mb-4 grid h-10 w-10 place-items-center rounded-lg ${s.bg} transition group-hover:scale-110`}>
              <s.icon className={`h-5 w-5 ${s.accent}`} />
            </div>
            <div className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-sm text-ink-muted">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
