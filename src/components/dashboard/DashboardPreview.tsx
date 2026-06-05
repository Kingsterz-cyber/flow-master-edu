"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders any dashboard composition at full fidelity, then scales it down to fit
 * a container — so landing-page previews are the real components.
 */
export function DashboardPreview({
  children,
  width = 1280,
  height = 820,
  className = "",
}: {
  children: ReactNode;
  width?: number;
  height?: number;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      setScale(Math.min(1, w / width));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card shadow-float ${className}`}
      style={{ height: height * scale }}
      aria-hidden
    >
      <div
        className="pointer-events-none origin-top-left"
        style={{
          width,
          height,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
