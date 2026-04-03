"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { NAV_LINKS, SOCIALS } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    setHidden(y > 200 && y > lastY.current);
    lastY.current = y;
  });

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
          padding: scrolled ? "12px clamp(16px, 5vw, 40px)" : "16px clamp(16px, 5vw, 40px)",
          background: scrolled ? "rgba(6,6,8,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        {/* ── LAYER 1: Logo left + CTA right ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="text-[20px] font-bold tracking-[4px] text-gradient"
            style={{ fontFamily: "var(--font-display)", flexShrink: 0 }}
            whileHover={{ letterSpacing: "6px" }}
            transition={{ duration: 0.3 }}
          >
            RANZODZ
          </motion.a>

          {/* CTA + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button
              onClick={() => scrollTo("#collab")}
              className="hidden md:block text-[11px] font-semibold tracking-[2px] uppercase rounded-full transition-all duration-300"
              style={{
                padding: "10px 24px",
                background: "linear-gradient(135deg, var(--live-accent), var(--live-accent-bright))",
                boxShadow: "0 4px 20px var(--live-glow)",
                color: "#fff",
                transition: "background 0.6s, box-shadow 0.6s",
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Work With Me
            </button>

            <button
              className="md:hidden flex flex-col gap-[5px] p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }} className="block w-6 h-[1.5px] bg-white origin-center" />
              <motion.span animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }} className="block w-6 h-[1.5px] bg-white" />
              <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }} className="block w-6 h-[1.5px] bg-white origin-center" />
            </button>
          </div>
        </div>

        {/* ── LAYER 2: Nav links — position:absolute on the full nav, centered on viewport ── */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "auto",
          }}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="relative text-[11px] font-semibold tracking-[2px] uppercase transition-colors duration-200"
              style={{
                color: activeSection === link.href.replace("#", "") ? "var(--white)" : "var(--muted)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
              }}
            >
              {link.label}
              {activeSection === link.href.replace("#", "") && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[1px]"
                  style={{ background: "linear-gradient(to right, var(--live-accent), var(--live-accent-bright))", transition: "background 0.6s" }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: "rgba(6,6,8,0.97)", backdropFilter: "blur(24px)" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.href)}
                  className="text-[32px] font-light tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollTo("#collab")}
                className="mt-4 btn-primary"
              >
                Work With Me
              </motion.button>
            </nav>
            <div className="absolute bottom-12 flex gap-6">
              {SOCIALS.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] font-semibold tracking-[1px]" style={{ color: "var(--muted)" }}>
                  {s.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
