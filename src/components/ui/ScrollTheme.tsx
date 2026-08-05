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

// Granular enough that the dominant section is re-evaluated smoothly while
// scrolling, without ever touching getBoundingClientRect on the main thread.
const THRESHOLDS = Array.from({ length: 26 }, (_, i) => i / 25);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function ScrollTheme() {
  const topRef    = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cur       = useRef<[number, number, number]>([34, 197, 94]); // start at hero green
  const target    = useRef<[number, number, number]>([34, 197, 94]);
  const painted   = useRef<[number, number, number]>([-1, -1, -1]);
  const raf       = useRef(0);
  const running   = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    // ── Paint: only ever called when the rounded colour actually changed ──
    const paint = (r: number, g: number, b: number) => {
      const [pr, pg, pb] = painted.current;
      if (r === pr && g === pg && b === pb) return;
      painted.current = [r, g, b];

      if (topRef.current) {
        topRef.current.style.background =
          `radial-gradient(ellipse 160% 90% at 50% 0%, rgba(${r},${g},${b},0.13) 0%, transparent 65%)`;
      }
      if (bottomRef.current) {
        bottomRef.current.style.background =
          `radial-gradient(ellipse 160% 90% at 50% 100%, rgba(${r},${g},${b},0.07) 0%, transparent 65%)`;
      }

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
      // NOTE: the scrollbar thumb and ::selection are already declared against
      // these vars in globals.css, so there is no <style> tag to rewrite here.
    };

    // ── Animation: runs only while the colour is still travelling ──
    const tick = () => {
      const spd = 0.08;
      const [tr, tg, tb] = target.current;
      const c = cur.current;
      c[0] = lerp(c[0], tr, spd);
      c[1] = lerp(c[1], tg, spd);
      c[2] = lerp(c[2], tb, spd);

      const done =
        Math.abs(c[0] - tr) < 0.4 &&
        Math.abs(c[1] - tg) < 0.4 &&
        Math.abs(c[2] - tb) < 0.4;

      if (done) {
        c[0] = tr; c[1] = tg; c[2] = tb;
      }

      paint(Math.round(c[0]), Math.round(c[1]), Math.round(c[2]));

      if (done) {
        running.current = false;   // settled — stop burning frames
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (running.current || document.hidden) return;
      running.current = true;
      raf.current = requestAnimationFrame(tick);
    };

    // ── Which section owns the viewport? Answered by IntersectionObserver,
    //    so we never force a synchronous layout while scrolling. ──
    const visible = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible.set(e.target.id, e.isIntersecting ? e.intersectionRect.height : 0);
        }
        let bestId = SECTIONS[0].id;
        let bestPx = -1;
        for (const s of SECTIONS) {
          const px = visible.get(s.id) ?? 0;
          if (px > bestPx) { bestPx = px; bestId = s.id; }
        }
        const next = SECTIONS.find((s) => s.id === bestId)!;
        const [tr, tg, tb] = target.current;
        if (next.r !== tr || next.g !== tg || next.b !== tb) {
          target.current = [next.r, next.g, next.b];
          kick();
        }
      },
      { threshold: THRESHOLDS }
    );

    // Sections are code-split, so they mount after us. Observe whatever exists
    // now and watch for the rest, then stop watching once all are wired up.
    const observed = new Set<string>();
    const wire = () => {
      for (const s of SECTIONS) {
        if (observed.has(s.id)) continue;
        const el = document.getElementById(s.id);
        if (el) { io.observe(el); observed.add(s.id); }
      }
      return observed.size === SECTIONS.length;
    };

    let mo: MutationObserver | null = null;
    if (!wire()) {
      mo = new MutationObserver(() => {
        if (wire()) { mo?.disconnect(); mo = null; }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    const onVisibility = () => { if (!document.hidden) kick(); };
    document.addEventListener("visibilitychange", onVisibility);

    // Paint the initial colour once so the vars match `cur` from frame one.
    paint(34, 197, 94);

    return () => {
      cancelAnimationFrame(raf.current);
      running.current = false;
      io.disconnect();
      mo?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const shared: React.CSSProperties = {
    position: "fixed",
    left: 0,
    right: 0,
    height: "55vh",
    zIndex: 6,
    pointerEvents: "none",
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
