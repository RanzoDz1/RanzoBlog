"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { IMAGES } from "@/lib/images";
import { STATS } from "@/lib/data";
import { useT } from "@/lib/i18n";

const ParticleCanvas = dynamic(() => import("@/components/ui/ParticleCanvas"), { ssr: false });

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ── Platform SVG Logos ────────────────────────────────────────────────────────
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function IconKick() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M2 2h4v6.5l4-6.5h5l-5 8 5.5 12H10L7 14.5 6 16v6H2V2zm14 0h4v20h-4V2z"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function IconStreamlabs() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 110 16A8 8 0 0112 4zm0 2a6 6 0 100 12A6 6 0 0012 6zm-1 3h2v2h2v2h-2v2h-2v-2H9v-2h2V9z"/>
    </svg>
  );
}

function IconPayPal() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.477z"/>
    </svg>
  );
}

const SOCIAL_LINKS = [
  { name: "Instagram",      handle: "@RanzoDz",   url: "https://www.instagram.com/ranzodz",                                   Icon: IconInstagram,  color: "#E1306C",  bg: "rgba(225,48,108,0.12)" },
  { name: "YouTube",        handle: "@RanzoDz",   url: "https://www.youtube.com/c/ranzodz",                                   Icon: IconYouTube,    color: "#FF0000",  bg: "rgba(255,0,0,0.1)" },
  { name: "TikTok",         handle: "@RanzoDz",   url: "https://www.tiktok.com/@ranzodz",                                    Icon: IconTikTok,     color: "#f8f8f0",  bg: "rgba(248,248,240,0.08)" },
  { name: "Kick",           handle: "@RanzoDz",   url: "https://kick.com/ranzodz",                                           Icon: IconKick,       color: "#53FC18",  bg: "rgba(83,252,24,0.1)" },
  { name: "Facebook",       handle: "@RanzoDz",   url: "https://www.facebook.com/ranzodz",                                   Icon: IconFacebook,   color: "#1877F2",  bg: "rgba(24,119,242,0.12)" },
  { name: "Facebook 2",     handle: "@RanzoDZA",  url: "https://www.facebook.com/RanzoDZA",                                  Icon: IconFacebook,   color: "#1877F2",  bg: "rgba(24,119,242,0.12)" },
  { name: "YouTube Gaming", handle: "@Gaming",    url: "https://www.youtube.com/channel/UCY8BV1FLuJWY4aV6QSaQ35Q/featured", Icon: IconYouTube,    color: "#FF0000",  bg: "rgba(255,0,0,0.1)" },
  { name: "Donate",         handle: "Streamlabs", url: "https://streamlabs.com/ranzolite/tip",                              Icon: IconStreamlabs, color: "#80F5D2",  bg: "rgba(128,245,210,0.1)" },
  { name: "PayPal",         handle: "Donate",     url: "https://www.paypal.com/paypalme/AbdullahKhalfi",                    Icon: IconPayPal,     color: "#009cde",  bg: "rgba(0,156,222,0.1)" },
];

export default function Hero() {
  const { t, lang } = useT();
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroPos, setHeroPos] = useState<{ desktopX: number; desktopY: number; mobileX: number; mobileY: number; imageUrl?: string } | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fetch custom hero position — KV first, localStorage fallback
  useEffect(() => {
    fetch("/api/admin/content?key=hero-position")
      .then(r => r.json())
      .then(d => {
        if (d.data) { setHeroPos(d.data); return; }
        const ls = localStorage.getItem("ranzo_hero_pos");
        if (ls) setHeroPos(JSON.parse(ls));
      })
      .catch(() => {
        const ls = localStorage.getItem("ranzo_hero_pos");
        if (ls) setHeroPos(JSON.parse(ls));
      });
  }, []);

  // Preload whichever image will be used
  const bgImageUrl = heroPos?.imageUrl || IMAGES.auroraRoad;
  useEffect(() => {
    const img = new Image();
    img.src = bgImageUrl;
    img.onload = () => setBgLoaded(true);
  }, [bgImageUrl]);

  useEffect(() => {
    const t = setTimeout(() => setShowStats(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Mouse follow glow — instant, direct DOM
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });
  const bgY      = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const bgScale  = useTransform(smoothProgress, [0, 1], [1.05, 1.15]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "12%"]);
  const opacity  = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const sidesOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);


  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen min-h-[750px] flex items-start justify-center overflow-hidden"
      style={{ background: "var(--black)" }}
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <div
          className="absolute inset-0"
          style={{ opacity: bgLoaded ? 1 : 0, transition: "opacity 1s", overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: bgLoaded ? `url(${bgImageUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.40) saturate(1.25)",
              // scale(1.5) creates 25% overflow on all sides so translate always has room
              // translate converts 0-100 slider → -15% to +15% shift
              transform: (() => {
                const px = heroPos ? (isMobile ? heroPos.mobileX : heroPos.desktopX) : (isMobile ? 35 : 55);
                const py = heroPos ? (isMobile ? heroPos.mobileY : heroPos.desktopY) : (isMobile ? 20 : 30);
                const tx = (50 - px) / 50 * 15;
                const ty = (50 - py) / 50 * 10;
                // Dynamic minimum scale: just enough so edges never cut, plus tiny margin
                const minScale = Math.max(
                  1 + 2 * Math.abs(tx) / 100,
                  1 + 2 * Math.abs(ty) / 100,
                  1.02
                ) + 0.03;
                return `scale(${minScale.toFixed(3)}) translate(${tx}%, ${ty}%)`;
              })(),
              transition: "transform 0.3s ease",
            }}
          />
        </div>
        {!bgLoaded && (
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.3) 0%, rgba(37,99,235,0.15) 40%, var(--black) 80%)" }} />
        )}
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(6,6,8,0.55) 0%, transparent 20%, transparent 60%, rgba(6,6,8,0.85) 85%, rgba(6,6,8,1) 100%)",
          }}
        />
        {/* Mouse glow */}
        <div
          ref={glowRef}
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
            willChange: "left, top",
          }}
        />
      </div>


      {/* ── LEFT: Stats panel ── */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease }}
            className="absolute left-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col"
            style={{ opacity: sidesOpacity as unknown as number, gap: 2 }}
          >
            <div className="w-px h-12 self-center opacity-20 mb-3" style={{ background: "linear-gradient(to bottom, transparent, var(--white))" }} />
            {[STATS[0], STATS[1], STATS[3]].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease }}
                className="text-left"
                style={{ padding: "10px 18px" }}
              >
                <div
                  className="text-gradient font-bold leading-none"
                  style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 4 }}
                >
                  {stat.short}
                </div>
                <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" as const, color: "var(--muted)" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
            <div className="w-px h-12 self-center opacity-20 mt-3" style={{ background: "linear-gradient(to bottom, var(--white), transparent)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — CENTERED */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        style={{ y: contentY, opacity, padding: "0 20px", paddingTop: isMobile ? "22vh" : "16vh", maxWidth: 720, width: "100%" }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="eyebrow justify-center"
          style={{ marginBottom: isMobile ? 16 : 28 }}
        >
          <span>{t.hero.eyebrow}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease }}
          className="display-xl text-gradient"
          style={{ marginBottom: isMobile ? 12 : 20, textAlign: "center" }}
        >
          RanzoDz
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 3vw, 34px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(248,248,240,0.65)",
            lineHeight: 1.2,
            marginBottom: isMobile ? 10 : 20,
            textAlign: "center",
          }}
        >
          <span className="text-gradient-vivid" style={{ fontStyle: "normal", fontWeight: 600 }}>{t.hero.tagline}</span>{" "}
          {t.hero.taglineEnd}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease }}
          style={{
            fontSize: 15,
            lineHeight: 1.85,
            color: "rgba(248,248,240,0.42)",
            fontWeight: 300,
            letterSpacing: "0.2px",
            marginBottom: isMobile ? 14 : 22,
            maxWidth: 420,
            textAlign: "center",
          }}
        >
          {t.hero.description}
        </motion.p>

        {/* ── Stat pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5, ease }}
          className="flex flex-wrap justify-center"
          style={{ gap: 10, marginBottom: isMobile ? 20 : 28 }}
        >
          {[STATS[0], STATS[1], STATS[3]].map((stat) => (
            <div key={stat.label} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 18px", borderRadius: 999,
              border: "1px solid var(--live-accent-30)",
              background: "var(--live-accent-08)",
            }}>
              <span className="text-gradient font-bold" style={{ fontFamily: "var(--font-display)", fontSize: 17, lineHeight: 1, direction: "ltr", unicodeBidi: "isolate" }}>
                {stat.short}
              </span>
              <span style={{ width: 1, height: 11, background: "var(--live-accent-30)", flexShrink: 0 }} />
              <span style={{ fontSize: 9, fontWeight: 600, color: "var(--muted)", letterSpacing: "1.5px", textTransform: "uppercase" as const }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease }}
          className="flex flex-wrap justify-center"
          style={{ gap: 16 }}
        >
          <button
            className="btn-primary"
            style={{ color: "#000", border: "none", cursor: "pointer" }}
            onClick={() => {
              const el = document.getElementById("collab-form");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {t.nav.workWithMe}
          </button>
          <a href="https://ranzo-portfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-ghost">
            {t.hero.storiesBtn}
          </a>
        </motion.div>

        {/* ── Mobile: Social links row ── */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease }}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 28 }}
          >
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.name} · ${s.handle}`}
                title={`${s.name} ${s.handle}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  border: `1px solid ${s.color}30`,
                  background: s.bg,
                  color: s.color,
                  textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                <s.Icon />
              </a>
            ))}
          </motion.div>
        )}

      </motion.div>

      {/* ── RIGHT: Social links panel ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6, ease }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center"
        style={{ opacity: sidesOpacity as unknown as number, gap: 6 }}
      >
        <div className="w-px h-10 opacity-20" style={{ background: "linear-gradient(to bottom, transparent, var(--white))" }} />
        {SOCIAL_LINKS.map((s, i) => (
          <motion.a
            key={s.name}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.name} · ${s.handle}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 + i * 0.07, duration: 0.4, ease }}
            whileHover={{ scale: 1.12, x: -3 }}
            title={`${s.name} ${s.handle}`}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 10,
              border: `1px solid ${s.color}30`,
              background: s.bg,
              color: s.color,
              textDecoration: "none",
              transition: "all 0.25s",
              flexShrink: 0,
            }}
          >
            <s.Icon />
          </motion.a>
        ))}
        <div className="w-px h-10 opacity-20" style={{ background: "linear-gradient(to bottom, var(--white), transparent)" }} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity: useTransform(smoothProgress, [0, 0.3], [1, 0]) as unknown as number }}
      >
        <Link
          href="/about"
          className="flex flex-col items-center gap-3"
          style={{ textDecoration: "none" }}
          aria-label="Go to About"
        >
          <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase" as const, color: "var(--muted)" }}>{t.hero.scroll}</span>
          <div className="w-px h-14 overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="w-full h-full" style={{ background: "linear-gradient(to bottom, var(--purple-l), var(--blue-l))", animation: "scroll-line 2.5s ease-in-out infinite" }} />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
