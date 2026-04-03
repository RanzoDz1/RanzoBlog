"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Fast at start, slow near end
        const increment = p < 70 ? Math.random() * 15 + 5 : Math.random() * 5 + 1;
        return Math.min(p + increment, 100);
      });
    }, 80);

    // Minimum display time
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setLoading(false), 400);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center"
          style={{ background: "var(--black)" }}
        >
          {/* Background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative z-10 mb-10"
          >
            <div
              className="text-gradient text-[36px] font-bold tracking-[8px]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              RANZODZ
            </div>
            <div
              className="text-center text-[10px] tracking-[4px] uppercase mt-2"
              style={{ color: "var(--muted)" }}
            >
              Travel &middot; Risk &middot; Experience
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="relative z-10 w-48"
          >
            <div
              className="h-[1px] rounded-full overflow-hidden"
              style={{ background: "var(--border)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(to right, var(--purple), var(--purple-l), var(--blue-l))",
                  width: `${progress}%`,
                  transition: "width 0.2s ease-out",
                }}
              />
            </div>
            <div
              className="text-center mt-3 text-[10px] font-semibold tracking-[3px]"
              style={{ color: "var(--muted)" }}
            >
              {Math.round(progress)}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
