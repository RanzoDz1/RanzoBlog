"use client";

/**
 * Single shared pointer stream.
 *
 * Every mouse-following visual on the page (spotlight, hero glow, custom
 * cursor) used to attach its own `mousemove` listener and write to the DOM
 * synchronously inside it. A gaming mouse fires far more often than the
 * display refreshes, so that meant several layout/paint passes per event
 * and a permanently janky pointer.
 *
 * Here there is exactly ONE listener, and subscribers are flushed once per
 * animation frame — so the browser paints at most once per frame no matter
 * how fast the mouse reports.
 */

type PointerCb = (x: number, y: number) => void;

const subscribers = new Set<PointerCb>();

let px = 0;
let py = 0;
let frameQueued = false;
let listening = false;

function flush() {
  frameQueued = false;
  for (const cb of subscribers) cb(px, py);
}

function onMove(e: MouseEvent) {
  px = e.clientX;
  py = e.clientY;
  if (!frameQueued) {
    frameQueued = true;
    requestAnimationFrame(flush);
  }
}

function start() {
  if (listening) return;
  window.addEventListener("mousemove", onMove, { passive: true });
  listening = true;
}

function stop() {
  if (!listening) return;
  window.removeEventListener("mousemove", onMove);
  listening = false;
}

/** Subscribe to frame-batched pointer positions. Returns an unsubscribe fn. */
export function subscribePointer(cb: PointerCb): () => void {
  subscribers.add(cb);
  start();
  return () => {
    subscribers.delete(cb);
    if (subscribers.size === 0) stop();
  };
}

/** True on touch devices, where mouse-following decoration is pointless. */
export function isCoarsePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}

/** Respect the OS "reduce motion" setting. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
