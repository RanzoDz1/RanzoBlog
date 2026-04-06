"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SOCIALS } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { useNavTransition } from "@/components/NavTransitionProvider";

const NAV_PAGES = [
  { sectionId: "hero",    labelKey: "home"    },
  { sectionId: "about",   labelKey: "about"   },
  { sectionId: "travels", labelKey: "travels" },
  { sectionId: "stories", labelKey: "stories" },
  { sectionId: "collab",  labelKey: "collab"  },
] as const;

export default function Navbar() {
  const { t, lang, setLang } = useT();
  const { navigateTo: slideNavigateTo } = useNavTransition();
  const [scrolled, setScrolled]       = useState(false);
  const [hidden, setHidden]           = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const lastY = useRef(0);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    setHidden(y > 200 && y > lastY.current);
    lastY.current = y;
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ["hero", "about", "travels", "stories", "collab"];
    const obs: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25 }
      );
      o.observe(el);
      obs.push(o);
    });
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  // ── Page-transition slide ─────────────────────────────────
  const navigateTo = (sectionId: string) => {
    // Close mobile menu only after overlay fully covers it
    slideNavigateTo(sectionId, { onCovered: () => setMobileOpen(false) });
  };

  const getIsActive = (sectionId: string) => activeSection === sectionId;

  const navLabels: Record<string, string> = {
    home: t.nav.home, about: t.nav.about, travels: t.nav.travels,
    stories: t.nav.stories, collab: t.nav.collab,
  };

  const LangToggle = () => (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: "6px 12px", borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.05)",
        fontSize: 11, fontWeight: 700, letterSpacing: "0.5px",
        color: "var(--muted)", cursor: "pointer",
        transition: "all 0.2s", flexShrink: 0,
      }}
      aria-label="Switch language"
    >
      <span style={{ direction: "ltr", unicodeBidi: "isolate" }}>
        {lang === "en" ? "عربي" : "EN"}
      </span>
    </button>
  );

  return (
    <>
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0"
        style={{
          zIndex: 9999,
          padding: scrolled ? "12px clamp(16px, 5vw, 40px)" : "16px clamp(16px, 5vw, 40px)",
          background: scrolled ? "rgba(6,6,8,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigateTo("hero")}
            className="brand-ltr text-[20px] font-bold tracking-[4px] text-gradient"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", flexShrink: 0, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            RANZODZ
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <LangToggle />
            <button
              onClick={() => navigateTo("collab-form")}
              className="hidden md:block text-[11px] font-semibold tracking-[2px] uppercase rounded-full"
              style={{
                padding: "10px 24px",
                background: "linear-gradient(135deg, var(--live-accent), var(--live-accent-bright))",
                boxShadow: "0 4px 20px var(--live-glow)", color: "#fff",
                transition: "all 0.3s",
                letterSpacing: lang === "ar" ? "0" : undefined,
                border: "none", cursor: "pointer",
              }}
            >
              {t.nav.workWithMe}
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

        {/* Centered nav links */}
        <div
          className="hidden md:flex items-center gap-8"
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          {NAV_PAGES.map((link) => {
            const isActive = getIsActive(link.sectionId);
            return (
              <button
                key={link.sectionId}
                onClick={() => navigateTo(link.sectionId)}
                className="relative text-[11px] font-semibold uppercase transition-colors duration-200"
                style={{
                  color: isActive ? "var(--white)" : "var(--muted)",
                  background: "none", border: "none", cursor: "pointer",
                  padding: "4px 0",
                  letterSpacing: lang === "ar" ? "0" : "2px",
                  fontFamily: lang === "ar" ? "'Cairo', system-ui, sans-serif" : undefined,
                  fontSize: lang === "ar" ? "13px" : "11px",
                }}
              >
                {navLabels[link.labelKey]}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[1px]"
                    style={{ background: "linear-gradient(to right, var(--live-accent), var(--live-accent-bright))" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 flex flex-col justify-center items-center"
            style={{ background: "rgba(6,6,8,0.97)", backdropFilter: "blur(24px)", zIndex: 9997 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_PAGES.map((link, i) => (
                <motion.div key={link.sectionId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <button
                    onClick={() => navigateTo(link.sectionId)}
                    className="text-[32px] font-light tracking-widest uppercase"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: getIsActive(link.sectionId) ? "var(--live-accent-bright)" : "var(--white)",
                      background: "none", border: "none", cursor: "pointer",
                      letterSpacing: lang === "ar" ? "0" : undefined,
                    }}
                  >
                    {navLabels[link.labelKey]}
                  </button>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <button
                  onClick={() => navigateTo("collab-form")}
                  className="mt-4 btn-primary"
                  style={{ border: "none", cursor: "pointer" }}
                >
                  {t.nav.workWithMe}
                </button>
              </motion.div>
            </nav>
            <div className="absolute bottom-12 flex gap-6">
              {SOCIALS.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="text-[12px] font-semibold brand-ltr" style={{ color: "var(--muted)" }}>
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
