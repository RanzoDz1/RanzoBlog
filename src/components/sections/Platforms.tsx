"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useT } from "@/lib/i18n";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
      <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}
function IconKick() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M2 2h4v6.5l4-6.5h5l-5 8 5.5 12H10L7 14.5 6 16v6H2V2zm14 0h4v20h-4V2z"/>
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

const PLATFORMS = [
  {
    name: "Instagram",
    handle: "@RanzoDz",
    typeKey: "instagram" as const,
    url: "https://www.instagram.com/ranzodz",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.07)",
  },
  {
    name: "YouTube",
    handle: "@RanzoDz",
    typeKey: "youtube" as const,
    url: "https://www.youtube.com/c/ranzodz",
    color: "#FF4444",
    bg: "rgba(255,68,68,0.07)",
  },
  {
    name: "TikTok",
    handle: "@RanzoDz",
    typeKey: "tiktok" as const,
    url: "https://www.tiktok.com/@ranzodz",
    color: "#f0f0e8",
    bg: "rgba(248,248,240,0.04)",
  },
  {
    name: "Kick",
    handle: "@RanzoDz",
    typeKey: "kick" as const,
    url: "https://kick.com/ranzodz",
    color: "#53FC18",
    bg: "rgba(83,252,24,0.07)",
    live: true,
  },
  {
    name: "Facebook",
    handle: "@RanzoDz",
    typeKey: "facebook" as const,
    url: "https://www.facebook.com/ranzodz",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.07)",
  },
  {
    name: "Facebook",
    handle: "@RanzoDZA",
    typeKey: "facebook2" as const,
    url: "https://www.facebook.com/RanzoDZA",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.07)",
  },
];

const ICONS: Record<string, () => React.ReactElement> = {
  Instagram: IconInstagram,
  YouTube: IconYouTube,
  TikTok: IconTikTok,
  Kick: IconKick,
  Facebook: IconFacebook,
};

export default function Platforms() {
  const { t, lang } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const isAr = lang === "ar";

  return (
    <section ref={sectionRef} className="section" style={{ background: "var(--black)", paddingTop: "clamp(64px, 8vw, 96px)", paddingBottom: "clamp(64px, 8vw, 96px)" }}>
      {/* top accent glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[250px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, var(--live-accent-08) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center"
          style={{ marginBottom: 52 }}
        >
          <div className="eyebrow justify-center" style={{ marginBottom: 20 }}>
            {t.platforms.eyebrow}
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 4.5vw, 52px)",
            fontWeight: 700,
            lineHeight: isAr ? 1.25 : 1.05,
            color: "var(--white)",
          }}>
            {t.platforms.headline1}{" "}
            <em className="text-gradient-vivid">{t.platforms.headline2}</em>
          </h2>
          <p style={{
            fontSize: 15,
            color: "rgba(248,248,240,0.45)",
            fontWeight: 300,
            marginTop: 14,
            maxWidth: 380,
            margin: "14px auto 0",
            lineHeight: 1.7,
          }}>
            {t.platforms.description}
          </p>
        </motion.div>

        {/* ── Platform cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 14 }}>
          {PLATFORMS.map((platform, i) => {
            const PlatformIcon = ICONS[platform.name];
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
                whileHover={{ scale: 1.025 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "22px 26px",
                  borderRadius: 16,
                  border: `1px solid ${platform.color}22`,
                  background: platform.bg,
                  textDecoration: "none",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${platform.color}55`;
                  el.style.boxShadow = `0 8px 40px ${platform.color}18`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${platform.color}22`;
                  el.style.boxShadow = "none";
                }}
              >
                {/* Subtle top accent line */}
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(to right, transparent, ${platform.color}40, transparent)`,
                }} />

                {/* Icon */}
                <div style={{
                  width: 54, height: 54, borderRadius: 14, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${platform.color}14`,
                  border: `1px solid ${platform.color}30`,
                  color: platform.color,
                }}>
                  {PlatformIcon && <PlatformIcon />}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "var(--white)" }}>
                      {platform.name}
                    </span>
                    {platform.live && (
                      <span style={{
                        fontSize: 8, fontWeight: 800, padding: "2px 7px",
                        borderRadius: 999, background: "#53FC18",
                        color: "#060608", letterSpacing: "1px",
                        textTransform: "uppercase",
                      }}>
                        LIVE
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: 11, color: "var(--muted)", marginBottom: 5,
                    direction: "ltr", unicodeBidi: "isolate",
                  }}>
                    {platform.handle}
                  </div>
                  <div style={{
                    fontSize: 11, fontWeight: 600,
                    color: platform.color === "#f0f0e8" ? "rgba(248,248,240,0.6)" : platform.color,
                    opacity: 0.85,
                  }}>
                    {t.platforms.types[platform.typeKey]}
                  </div>
                </div>

                {/* Arrow */}
                <div style={{
                  fontSize: 16, color: "var(--muted)", flexShrink: 0,
                  direction: "ltr", unicodeBidi: "isolate",
                }}>
                  →
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* ── Total reach strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.5, ease }}
          className="flex flex-wrap items-center justify-center"
          style={{ gap: 10, marginTop: 40 }}
        >
          {[
            { short: "1M+", label: "Total Followers", labelAr: "متابع" },
            { short: "100M+", label: "Total Views", labelAr: "مشاهدة" },
            { short: "6", label: "Platforms", labelAr: "بلاتفورم" },
          ].map((s) => (
            <div key={s.label} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 18px", borderRadius: 999,
              border: "1px solid var(--live-accent-30)",
              background: "var(--live-accent-08)",
            }}>
              <span className="text-gradient font-bold" style={{
                fontFamily: "var(--font-display)", fontSize: 16, lineHeight: 1,
                direction: "ltr", unicodeBidi: "isolate",
              }}>
                {s.short}
              </span>
              <span style={{ width: 1, height: 12, background: "var(--live-accent-30)", flexShrink: 0 }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", letterSpacing: "1px", textTransform: "uppercase" as const }}>
                {isAr ? s.labelAr : s.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
