"use client";
import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
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
        width: 600,
        height: 600,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, rgba(124,58,237,0.03) 35%, transparent 70%)",
        filter: "blur(48px)",
        willChange: "transform",
        transition: "transform 0.12s ease-out",
      }}
    />
  );
}
