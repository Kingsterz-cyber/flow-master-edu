"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function FadeUp({
  children,
  delay = 0,
  className,
  as: As = motion.div,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: any;
}) {
  return (
    <As
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </As>
  );
}

export function StaggerGroup({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

/** Count-up number animation when in view */
export function Counter({
  to,
  duration = 1.6,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const start = performance.now();
    const from = 0;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      const v = from + (to - from) * eased;
      el.textContent = `${prefix}${v.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, decimals, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

/** Mouse-parallax container; children with data-depth get translated */
export function Parallax({
  children,
  className,
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 80, damping: 18, mass: 0.6 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx * strength);
    y.set(ny * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ "--px": sx, "--py": sy } as CSSProperties}
    >
      <ParallaxContext.Provider value={{ sx, sy }}>{children}</ParallaxContext.Provider>
    </motion.div>
  );
}

import { createContext, useContext } from "react";
const ParallaxContext = createContext<{ sx: any; sy: any } | null>(null);

export function ParallaxLayer({
  depth = 1,
  children,
  className,
}: {
  depth?: number;
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(ParallaxContext);
  const tx = useTransform(ctx?.sx ?? useMotionValue(0), (v: number) => v * depth);
  const ty = useTransform(ctx?.sy ?? useMotionValue(0), (v: number) => v * depth);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

/** Hover-lift card with soft glow */
export function HoverLift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={`group relative ${className}`}
    >
      <span className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 0%, oklch(0.92 0.08 275 / 0.45), transparent 60%)",
        }}
      />
      {children}
    </motion.div>
  );
}

/** Animated SVG path that draws itself when in view */
export function DrawPath({
  d,
  stroke,
  strokeWidth = 2,
  fill = "none",
  duration = 1.4,
  delay = 0,
}: {
  d: string;
  stroke: string;
  strokeWidth?: number;
  fill?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration, ease, delay }}
    />
  );
}
