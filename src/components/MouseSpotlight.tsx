"use client";
import { useEffect, useRef } from "react";
import { subscribePointer, isCoarsePointer, prefersReducedMotion } from "@/lib/pointer";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isCoarsePointer() || prefersReducedMotion()) return;

    // Position only. The gradient colour is expressed in CSS against the
    // --live-* vars, so the browser recolours it for free — no getComputedStyle
    // read (which forced a full style recalc on every single mouse event) and
    // no background rewrite (which re-rasterised a blurred layer every event).
    return subscribePointer((x, y) => {
      el.style.transform = `translate3d(${x - 140}px, ${y - 140}px, 0)`;
    });
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
        background:
          "radial-gradient(circle, rgba(var(--live-r),var(--live-g),var(--live-b),0.20) 0%, rgba(var(--live-r),var(--live-g),var(--live-b),0.07) 45%, transparent 70%)",
        filter: "blur(28px)",
        willChange: "transform",
      }}
    />
  );
}
