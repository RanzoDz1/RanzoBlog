"use client";
import { useRef, useState, useCallback } from "react";

interface CarouselProps {
  children: React.ReactNode[];
  gap?: number;
}

export default function Carousel({ children, gap = 16 }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanLeft(t.scrollLeft > 8);
    setCanRight(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
  }, []);

  const scroll = (dir: 1 | -1) => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + gap : 280;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
    color: active ? "#fff" : "rgba(255,255,255,0.2)",
    fontSize: 18,
    cursor: active ? "pointer" : "default",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transition: "all 0.2s",
    backdropFilter: "blur(8px)",
    flexShrink: 0,
  });

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Left arrow */}
      <button onClick={() => canLeft && scroll(-1)} style={{ ...btnStyle(canLeft), left: -20 }} aria-label="Previous">‹</button>

      {/* Track */}
      <div
        ref={trackRef}
        onScroll={update}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          padding: "4px 2px 12px",
        }}
      >
        {children.map((child, i) => (
          <div key={i} data-card style={{ scrollSnapAlign: "start", flexShrink: 0 }}>
            {child}
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button onClick={() => canRight && scroll(1)} style={{ ...btnStyle(canRight), right: -20 }} aria-label="Next">›</button>

      <style>{`[data-card]::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
