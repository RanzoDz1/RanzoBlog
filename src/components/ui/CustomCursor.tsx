"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only on desktop with fine pointer
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      if (!visible) setVisible(true);

      // Instant position - zero delay
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseleave", leave);

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a") ||
        t.closest("button") ||
        t.closest("[role='button']") ||
        t.closest(".story-card") ||
        t.closest(".gallery-item") ||
        t.tagName === "INPUT" ||
        t.tagName === "TEXTAREA"
      ) {
        setHovering(true);
      }
    };
    const onOut = () => setHovering(false);

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: hovering ? 12 : 8,
          height: hovering ? 12 : 8,
          borderRadius: "50%",
          background: "var(--live-accent)",
          pointerEvents: "none",
          zIndex: 10001,
          opacity: visible ? 1 : 0,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s, width 0.15s, height 0.15s, background 0.6s",
          willChange: "left, top",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: hovering ? 48 : 36,
          height: hovering ? 48 : 36,
          borderRadius: "50%",
          border: hovering ? "1.5px solid var(--live-accent-50)" : "1px solid var(--live-accent-30)",
          pointerEvents: "none",
          zIndex: 10000,
          opacity: visible ? (hovering ? 0.9 : 0.5) : 0,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s, width 0.15s, height 0.15s, border 0.6s",
          willChange: "left, top",
        }}
      />
    </>
  );
}
