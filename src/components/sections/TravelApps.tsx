"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TRAVEL_APPS } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { APP_CATEGORIES_AR, tr } from "@/lib/dataTranslations";
import Carousel from "@/components/ui/Carousel";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function TravelApps() {
  const { t, lang } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section ref={sectionRef} className="section" style={{ background: "var(--surface)" }}>
      <div className="w-full flex flex-col items-center">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          className="text-center w-full"
          style={{ maxWidth: 520, marginBottom: 56 }}
        >
          <div className="eyebrow justify-center" style={{ marginBottom: 20 }}>{t.apps.eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>
            <span style={{ color: "var(--white)" }}>{t.apps.headline1}</span>
            <em className="text-gradient-vivid">{t.apps.headline2}</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(248,248,240,0.45)", lineHeight: 1.8, margin: 0 }}>
            {t.apps.description}
          </p>
        </motion.div>

        {/* ── APPS CAROUSEL ── */}
        <div className="w-full" style={{ maxWidth: 900 }}>
          <Carousel gap={16}>
            {TRAVEL_APPS.map((app, i) => (
              <motion.a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease }}
                className="rounded-xl text-center transition-all duration-300"
                style={{
                  padding: "32px 24px",
                  border: "1px solid var(--border)",
                  background: "rgba(255,255,255,0.02)",
                  display: "block",
                  width: 220,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${app.color}50`;
                  (e.currentTarget as HTMLElement).style.background = `${app.color}08`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Icon */}
                <div
                  className="flex items-center justify-center mx-auto"
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 16,
                    fontSize: 26,
                    background: `${app.color}18`,
                    border: `1px solid ${app.color}30`,
                    marginBottom: 16,
                  }}
                >
                  {app.emoji}
                </div>

                {/* Name */}
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--white)", marginBottom: 6 }}>
                  {app.name}
                </div>

                {/* Category */}
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: lang === "ar" ? "0" : "1.5px", textTransform: "uppercase" as const, color: app.color, marginBottom: 10 }}>
                  {tr(APP_CATEGORIES_AR, app.category, lang)}
                </div>

                {/* Description */}
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
                  {app.desc}
                </div>
              </motion.a>
            ))}
          </Carousel>
        </div>

      </div>
    </section>
  );
}
