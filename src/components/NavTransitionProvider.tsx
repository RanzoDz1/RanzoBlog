"use client";
import { createContext, useCallback, useContext, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

type NavTransitionCtx = {
  navigateTo: (sectionId: string, opts?: { onCovered?: () => void }) => Promise<void>;
};

const Ctx = createContext<NavTransitionCtx>({ navigateTo: async () => {} });

export function useNavTransition() {
  return useContext(Ctx);
}

export default function NavTransitionProvider({ children }: { children: React.ReactNode }) {
  const overlayControls = useAnimation();
  const busy = useRef(false);

  const navigateTo = useCallback(
    async (sectionId: string, opts?: { onCovered?: () => void }) => {
      if (busy.current) return;
      busy.current = true;

      // Slide overlay in from the right
      await overlayControls.start({
        x: "0%",
        transition: { duration: 0.26, ease: [0.4, 0, 0.2, 1] },
      });

      // Notify caller that screen is fully covered (e.g. close mobile menu)
      opts?.onCovered?.();

      // Instant scroll while hidden
      if (sectionId === "hero") {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      }

      // Brief pause so new view is ready
      await new Promise<void>((r) => setTimeout(r, 30));

      // Slide overlay out to the left
      await overlayControls.start({
        x: "-100%",
        transition: { duration: 0.26, ease: [0.4, 0, 0.2, 1] },
      });

      // Reset to right for next use
      overlayControls.set({ x: "100%" });
      busy.current = false;
    },
    [overlayControls],
  );

  return (
    <Ctx.Provider value={{ navigateTo }}>
      {/* Full-viewport slide overlay */}
      <motion.div
        animate={overlayControls}
        initial={{ x: "100%" }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          background: "var(--black)",
          pointerEvents: "none",
        }}
      />
      {children}
    </Ctx.Provider>
  );
}
