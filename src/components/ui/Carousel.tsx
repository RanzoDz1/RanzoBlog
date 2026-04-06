"use client";
import { useRef, useState, useCallback, useEffect } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  gap?: number;
}

export default function Carousel({ children, gap = 16 }: CarouselProps) {
  const trackRef   = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number | null>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [pressing, setPressing] = useState<-1 | 0 | 1>(0);

  // drag state
  const isPointerDown  = useRef(false);
  const didDrag        = useRef(false);   // true only if moved >5px
  const dragStartX     = useRef(0);
  const dragStartScroll = useRef(0);
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
    const start = t.scrollLeft;
    const diff  = target - start;
    if (Math.abs(diff) < 1) return;
    const duration = 480;
    let startTime: number | null = null;
    const ease = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      t.scrollLeft = start + diff * ease(progress);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else update();
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const scroll = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + gap : 300;
    animateScroll(t.scrollLeft + dir * step);
  };

  // ── Pointer events (mouse + touch unified) ──────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    const t = trackRef.current;
    if (!t) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    isPointerDown.current = true;
    didDrag.current = false;
    dragStartX.current = e.clientX;
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

  // Block click on children only if a real drag happened
  const onClickCapture = (e: React.MouseEvent) => {
    if (didDrag.current) {
      e.stopPropagation();
      e.preventDefault();
      didDrag.current = false;
    }
  };

  const BtnArrow = ({ dir }: { dir: 1 | -1 }) => {
    const active = dir === -1 ? canLeft : canRight;
    const isPress = pressing === dir;
    return (
      <button
        onClick={() => active && scroll(dir)}
        onMouseDown={() => active && setPressing(dir)}
        onMouseUp={() => setPressing(0)}
        onMouseLeave={() => setPressing(0)}
        aria-label={dir === -1 ? "Previous" : "Next"}
        style={{
          position: "absolute",
          top: "50%",
          transform: isPress ? "translateY(-50%) scale(0.88)" : "translateY(-50%) scale(1)",
          [dir === -1 ? "left" : "right"]: -22,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: `1px solid ${active ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)"}`,
          background: active
            ? isPress ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)"
            : "rgba(255,255,255,0.02)",
          color: active ? "#fff" : "rgba(255,255,255,0.18)",
          fontSize: 22,
          lineHeight: 1,
          cursor: active ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          transition: "background 0.18s, border-color 0.18s, transform 0.12s, color 0.18s",
          backdropFilter: "blur(10px)",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {dir === -1 ? "‹" : "›"}
      </button>
    );
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <BtnArrow dir={-1} />

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
          <div key={i} data-card style={{ scrollSnapAlign: "start", flexShrink: 0, display: "flex", alignSelf: "stretch" }}>
            {child}
          </div>
        ))}
      </div>

      <BtnArrow dir={1} />

      <style>{`
        div[style*="overflow-x: auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
