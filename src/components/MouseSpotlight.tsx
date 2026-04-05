"use client";
import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      // Instant position — no CSS transition delay
      el.style.transform = `translate(${e.clientX - 140}px, ${e.clientY - 140}px)`;

      // Match current section accent color from CSS vars updated by scroll system
      const s = getComputedStyle(document.documentElement);
      const r = s.getPropertyValue("--live-r").trim();
      const g = s.getPropertyValue("--live-g").trim();
      const b = s.getPropertyValue("--live-b").trim();
      el.style.background = `radial-gradient(circle, rgba(${r},${g},${b},0.20) 0%, rgba(${r},${g},${b},0.07) 45%, transparent 70%)`;
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 280,
        height: 280,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        background: "radial-gradient(circle, rgba(34,197,94,0.20) 0%, rgba(34,197,94,0.07) 45%, transparent 70%)",
        filter: "blur(28px)",
        willChange: "transform",
      }}
    />
  );
}
