"use client";
import { useEffect, useRef } from "react";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 140}px, ${e.clientY - 140}px)`;
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
        background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)",
        filter: "blur(28px)",
        willChange: "transform",
        transition: "transform 0.1s ease-out",
      }}
    />
  );
}
