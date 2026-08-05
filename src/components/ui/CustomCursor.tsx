"use client";
import { useEffect, useRef, useState } from "react";
import { subscribePointer, isCoarsePointer } from "@/lib/pointer";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const visibleRef  = useRef(false);
  const hoveringRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isCoarsePointer()) return;
    if (window.location.pathname.startsWith("/admin")) return;

    // Hide system cursor
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";
    const style = document.createElement("style");
    style.id = "__custom-cursor-style";
    style.textContent = "button{cursor:none!important}a{cursor:none!important}input{cursor:none!important}textarea{cursor:none!important}";
    document.head.appendChild(style);

    // Frame-batched via the shared pointer stream; transform only, so this is
    // a compositor-only update with no layout or style recalculation.
    const unsub = subscribePointer((x, y) => {
      const t = `translate(${x}px,${y}px) translate(-50%,-50%)`;
      if (dotRef.current)  dotRef.current.style.transform  = t;
      if (ringRef.current) ringRef.current.style.transform = t;
      if (!visibleRef.current) { visibleRef.current = true; setVisible(true); }
    });

    const leave = () => { visibleRef.current = false; setVisible(false); };
    const enter = () => { visibleRef.current = true;  setVisible(true); };

    // mouseover only fires when the hovered element changes, but the state
    // write is still guarded so identical results never schedule a render.
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const next = !!(
        t.closest("a") || t.closest("button") || t.closest("[role='button']") ||
        t.closest(".story-card") || t.tagName === "INPUT" || t.tagName === "TEXTAREA"
      );
      if (next !== hoveringRef.current) { hoveringRef.current = next; setHovering(next); }
    };

    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      document.getElementById("__custom-cursor-style")?.remove();
      unsub();
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) return null;

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 10001,
        width: hovering ? 12 : 8, height: hovering ? 12 : 8,
        borderRadius: "50%", background: "var(--live-accent)",
        opacity: visible ? 1 : 0,
        willChange: "transform",
        transition: "opacity 0.2s, width 0.15s, height 0.15s",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 10000,
        width: hovering ? 48 : 36, height: hovering ? 48 : 36,
        borderRadius: "50%",
        border: hovering ? "1.5px solid var(--live-accent-50)" : "1px solid var(--live-accent-30)",
        opacity: visible ? (hovering ? 0.9 : 0.5) : 0,
        willChange: "transform",
        transition: "opacity 0.2s, width 0.15s, height 0.15s",
      }} />
    </>
  );
}
