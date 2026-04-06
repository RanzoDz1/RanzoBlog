"use client";
import { useRef, useState, useCallback, useEffect } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  gap?: number;
}

export default function Carousel({ children, gap = 16 }: CarouselProps) {
  const trackRef        = useRef<HTMLDivElement>(null);
  const rafRef          = useRef<number | null>(null);
  const isPointerDown   = useRef(false);
  const didDrag         = useRef(false);
  const dragStartX      = useRef(0);
  const dragStartScroll = useRef(0);

  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanLeft(t.scrollLeft > 8);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
  }, []);

  useEffect(() => { update(); }, [update]);

  const animateScroll = (target: number) => {
    const t = trackRef.current;
    if (!t) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start    = t.scrollLeft;
    const diff     = target - start;
    if (Math.abs(diff) < 1) return;
    const duration = 420;
    let startTime: number | null = null;
    const ease = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      t.scrollLeft = start + diff * ease(p);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else update();
    };
    rafRef.current = requestAnimationFrame(step);
  };

  // Scroll 2 cards at a time
  const scroll = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? (card.offsetWidth + gap) * 2 : 500;
    animateScroll(t.scrollLeft + dir * step);
  };

  // ── Pointer drag (unified mouse + touch) ───────────────────
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const t = trackRef.current;
    if (!t) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    isPointerDown.current  = true;
    didDrag.current        = false;
    dragStartX.current     = e.clientX;
    dragStartScroll.current = t.scrollLeft;
    t.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    const t = trackRef.current;
    if (!t) return;
    const delta = dragStartX.current - e.clientX;
    if (!didDrag.current && Math.abs(delta) > 5) {
      didDrag.current = true;
      setDragging(true);
    }
    if (didDrag.current) {
      t.scrollLeft = dragStartScroll.current + delta;
      update();
    }
  };

  const onPointerUp = () => {
    isPointerDown.current = false;
    setDragging(false);
  };

  // Only block child clicks when a real drag occurred
  const onClickCapture = (e: React.MouseEvent) => {
    if (didDrag.current) {
      e.stopPropagation();
      e.preventDefault();
      didDrag.current = false;
    }
  };

  // ── Arrow button (inside the track bounds) ─────────────────
  const Arrow = ({ dir }: { dir: 1 | -1 }) => {
    const active = dir === -1 ? canLeft : canRight;
    return (
      <button
        onPointerDown={e => e.stopPropagation()} // don't trigger carousel drag
        onClick={e => { e.stopPropagation(); active && scroll(dir); }}
        aria-label={dir === -1 ? "Previous" : "Next"}
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          [dir === -1 ? "left" : "right"]: 6,
          zIndex: 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1px solid ${active ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.08)"}`,
          background: active ? "rgba(10,10,14,0.80)" : "rgba(10,10,14,0.40)",
          backdropFilter: "blur(12px)",
          color: active ? "#fff" : "rgba(255,255,255,0.20)",
          fontSize: 20,
          lineHeight: 1,
          cursor: active ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.18s, border-color 0.18s, color 0.18s, transform 0.12s",
          flexShrink: 0,
          userSelect: "none",
          pointerEvents: "auto",
        }}
        onMouseEnter={e => { if (active) (e.currentTarget as HTMLElement).style.background = "rgba(30,30,40,0.95)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = active ? "rgba(10,10,14,0.80)" : "rgba(10,10,14,0.40)"; }}
      >
        {dir === -1 ? "‹" : "›"}
      </button>
    );
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Arrows sit inside the wrapper — never clipped */}
      <Arrow dir={-1} />
      <Arrow dir={1} />

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: "6px 4px 14px",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            data-card
            style={{ scrollSnapAlign: "start", flexShrink: 0, display: "flex", alignSelf: "stretch" }}
          >
            {child}
          </div>
        ))}
      </div>

      <style>{`
        div[style*="overflow-x: auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
