"use client";
import { useEffect, useRef } from "react";

// Color wheel progression: Green → Teal → Blue → Violet → Amber → Rose
// Each step is a smooth neighbour on the spectrum — no random jumps
const SECTIONS = [
  { id: "hero",    r: 34,  g: 197, b: 94  }, // 🟢 Green   — aurora sky
  { id: "about",   r: 6,   g: 182, b: 212 }, // 🩵 Cyan    — fresh, personal
  { id: "travels", r: 59,  g: 130, b: 246 }, // 🔵 Blue    — ocean & sky
  { id: "stories", r: 139, g: 92,  b: 246 }, // 🟣 Violet  — deep narrative
  { id: "apps",    r: 245, g: 158, b: 11  }, // 🟡 Amber   — warm & practical
  { id: "collab",  r: 244, g: 63,  b: 94  }, // 🌹 Rose    — passion & action
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ScrollTheme() {
  const topRef    = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const barRef    = useRef<HTMLStyleElement | null>(null);
  const cur       = useRef<[number, number, number]>([34, 197, 94]); // start at hero green
  const raf       = useRef(0);

  useEffect(() => {
    // Inject dynamic scrollbar style
    const style = document.createElement("style");
    document.head.appendChild(style);
    barRef.current = style;

    const tick = () => {
      const winH = window.innerHeight;
      let best = SECTIONS[0];
      let bestScore = -Infinity;

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = s === SECTIONS[0]
          ? el.getBoundingClientRect()
          : el.getBoundingClientRect();
        const visible = Math.min(rect.bottom, winH) - Math.max(rect.top, 0);
        if (visible > bestScore) { bestScore = visible; best = s; }
      }

      // Smooth interpolation toward target
      const spd = 0.04;
      cur.current = [
        lerp(cur.current[0], best.r, spd),
        lerp(cur.current[1], best.g, spd),
        lerp(cur.current[2], best.b, spd),
      ] as [number, number, number];

      const [r, g, b] = cur.current.map(Math.round);

      // ── TOP glow overlay (above section bg, below content) ──
      if (topRef.current) {
        topRef.current.style.background =
          `radial-gradient(ellipse 160% 90% at 50% 0%, rgba(${r},${g},${b},0.13) 0%, transparent 65%)`;
      }
      // ── BOTTOM glow overlay ──
      if (bottomRef.current) {
        bottomRef.current.style.background =
          `radial-gradient(ellipse 160% 90% at 50% 100%, rgba(${r},${g},${b},0.07) 0%, transparent 65%)`;
      }

      // ── Scrollbar color ──
      if (barRef.current) {
        barRef.current.textContent = `
          ::-webkit-scrollbar-thumb { background: rgba(${r},${g},${b},0.55) !important; border-radius: 4px; }
          ::selection { background: rgba(${r},${g},${b},0.55) !important; }
        `;
      }

      // ── CSS vars — used everywhere for live theming ──
      const root = document.documentElement;

      // Bright version: blend 50% toward white for gradient highlights
      const lr = Math.min(255, Math.round(r + (255 - r) * 0.5));
      const lg = Math.min(255, Math.round(g + (255 - g) * 0.5));
      const lb = Math.min(255, Math.round(b + (255 - b) * 0.5));

      root.style.setProperty("--live-r",            String(r));
      root.style.setProperty("--live-g",            String(g));
      root.style.setProperty("--live-b",            String(b));
      root.style.setProperty("--live-accent",       `rgb(${r},${g},${b})`);
      root.style.setProperty("--live-accent-bright",`rgb(${lr},${lg},${lb})`);
      root.style.setProperty("--live-accent-08",    `rgba(${r},${g},${b},0.08)`);
      root.style.setProperty("--live-accent-15",    `rgba(${r},${g},${b},0.15)`);
      root.style.setProperty("--live-accent-30",    `rgba(${r},${g},${b},0.30)`);
      root.style.setProperty("--live-accent-50",    `rgba(${r},${g},${b},0.50)`);
      root.style.setProperty("--live-glow",         `rgba(${r},${g},${b},0.35)`);
      root.style.setProperty("--live-glow-lg",      `rgba(${r},${g},${b},0.18)`);

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      barRef.current?.remove();
    };
  }, []);

  const shared: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    height: "55vh",
    zIndex: 6,
    pointerEvents: "none",
    willChange: "background",
    mixBlendMode: "screen",   // blends with dark backgrounds — makes color visible
  };

  return (
    <>
      {/* Top glow */}
      <div ref={topRef}    style={{ ...shared, top: 0 }} />
      {/* Bottom glow */}
      <div ref={bottomRef} style={{ ...shared, bottom: 0, top: "auto" }} />
    </>
  );
}
