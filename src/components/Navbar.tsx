"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SOCIALS } from "@/lib/data";
import { useT } from "@/lib/i18n";

const NAV_PAGES = [
  { href: "/about",   labelKey: "about"   },
  { href: "/travels", labelKey: "travels" },
  { href: "/stories", labelKey: "stories" },
  { href: "/collab",  labelKey: "collab"  },
] as const;

export default function Navbar() {
  const { t, lang, setLang } = useT();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = { current: 0 };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    setHidden(y > 200 && y > lastY.current);
    lastY.current = y;
  });

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLabels: Record<string, string> = {
    about: t.nav.about, travels: t.nav.travels, stories: t.nav.stories, collab: t.nav.collab,
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
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: scrolled ? "12px clamp(16px, 5vw, 40px)" : "16px clamp(16px, 5vw, 40px)",
          background: scrolled ? "rgba(6,6,8,0.90)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/"
            className="brand-ltr text-[20px] font-bold tracking-[4px] text-gradient"
            style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", flexShrink: 0, textDecoration: "none" }}
          >
            RANZODZ
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <LangToggle />
            <Link
              href="/collab"
              className="hidden md:block text-[11px] font-semibold tracking-[2px] uppercase rounded-full"
              style={{
                padding: "10px 24px",
                background: "linear-gradient(135deg, var(--live-accent), var(--live-accent-bright))",
                boxShadow: "0 4px 20px var(--live-glow)", color: "#fff",
                transition: "all 0.3s",
                letterSpacing: lang === "ar" ? "0" : undefined,
                textDecoration: "none",
              }}
            >
              {t.nav.workWithMe}
            </Link>
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
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[11px] font-semibold uppercase transition-colors duration-200"
                style={{
                  color: isActive ? "var(--white)" : "var(--muted)",
                  textDecoration: "none",
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
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: "rgba(6,6,8,0.97)", backdropFilter: "blur(24px)" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_PAGES.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[32px] font-light tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-display)", color: pathname === link.href ? "var(--live-accent-bright)" : "var(--white)", textDecoration: "none", letterSpacing: lang === "ar" ? "0" : undefined }}
                  >
                    {navLabels[link.labelKey]}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Link href="/collab" onClick={() => setMobileOpen(false)} className="mt-4 btn-primary" style={{ textDecoration: "none" }}>
                  {t.nav.workWithMe}
                </Link>
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
