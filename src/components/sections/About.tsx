"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { IMAGES } from "@/lib/images";
import { useT } from "@/lib/i18n";

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const ICONS = ["🇩🇿", "✈️", "🇩🇪", "🌍"];
const TAG_ACCENTS = [true, true, false, false, false, false];

function Tag({ label, accent }: { label: string; accent: boolean }) {
  return (
    <span style={{
      display: "inline-block", padding: "8px 18px", borderRadius: 999,
      fontSize: 11, fontWeight: 600, textTransform: "uppercase" as const,
      border: accent ? "1px solid var(--live-accent-30)" : "1px solid var(--border)",
      color: accent ? "var(--live-accent-bright)" : "var(--muted)",
      background: accent ? "var(--live-accent-08)" : "rgba(255,255,255,0.03)",
    }}>
      {label}
    </span>
  );
}

export default function About() {
  const { t, lang } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const isAr = lang === "ar";

  return (
    <section id="about" ref={sectionRef} className="section" style={{ background: "var(--black)" }}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, var(--live-accent-08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ── Image ── */}
          <motion.div ref={imageRef} initial={{ opacity: 0, x: isAr ? 40 : -40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease }} className="relative">
            <motion.div style={{ y: imgY }} className="relative rounded-[20px] overflow-hidden">
              <div style={{ aspectRatio: "3/4", position: "relative", borderRadius: "20px", overflow: "hidden", border: "1px solid var(--border)" }}>
                <img src={IMAGES.desertHelmet} alt="Abdullah Khalfi | RanzoDz"
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.88) saturate(1.1)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--live-accent-30) 0%, transparent 55%)" }} />
              </div>
            </motion.div>

            {/* "Currently Exploring" badge — bottom-start */}
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 10 }} animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease }}
              className="absolute bottom-8 glass badge-bottom-start"
              style={{ left: isAr ? "auto" : "1.5rem", right: isAr ? "1.5rem" : "auto", display: "flex", alignItems: "center", gap: 12, padding: "14px 20px" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: "var(--amber-l)", boxShadow: "0 0 10px var(--amber)", animation: "pulse-glow 2s ease-in-out infinite" }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--white)" }}>{t.about.currentlyExploring}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2, direction: "ltr", unicodeBidi: "isolate" }}>{t.about.route}</div>
              </div>
            </motion.div>

            {/* Countries count badge — top-end */}
            <motion.div initial={{ opacity: 0, scale: 0.8, x: isAr ? -10 : 10 }} animate={isInView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.5, ease }}
              className="absolute top-8 glass float"
              style={{ right: isAr ? "auto" : "-1rem", left: isAr ? "-1rem" : "auto", padding: "20px 24px", textAlign: "center" }}>
              <div className="text-gradient-vivid" style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 700, lineHeight: 1, marginBottom: 6, direction: "ltr", unicodeBidi: "isolate" }}>50+</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: "var(--muted)" }}>{t.about.countries}</div>
            </motion.div>
          </motion.div>

          {/* ── Text ── */}
          <motion.div initial={{ opacity: 0, x: isAr ? -40 : 40 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9, ease, delay: 0.1 }}>
            <div className="eyebrow mb-6">{t.about.eyebrow}</div>
            <h2 className="mb-6" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px, 5vw, 58px)", fontWeight: 600, lineHeight: isAr ? 1.2 : 1.05, color: "var(--white)" }}>
              {t.about.headline1}<br />
              <em className="text-gradient-vivid">{t.about.headline2}</em>
            </h2>
            <p className="mb-4" style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(248,248,240,0.5)", fontWeight: 300 }}>{t.about.bio1}</p>
            <p className="mb-8" style={{ fontSize: "15px", lineHeight: 1.9, color: "rgba(248,248,240,0.5)", fontWeight: 300 }}>{t.about.bio2}</p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 40 }}>
              {t.about.tags.map((label, i) => <Tag key={i} label={label} accent={TAG_ACCENTS[i]} />)}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {t.about.timeline.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: isAr ? -20 : 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease }}
                  style={{ display: "flex", gap: 20, paddingBottom: 32, position: "relative" }}>
                  {i < t.about.timeline.length - 1 && (
                    <div className="timeline-line" style={{
                      position: "absolute",
                      left: isAr ? "auto" : 15, right: isAr ? 15 : "auto",
                      top: 32, bottom: 0, width: 1,
                      background: "linear-gradient(to bottom, var(--live-accent-30), transparent)",
                    }} />
                  )}
                  <div style={{ width: 32, height: 32, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, zIndex: 10, border: "1px solid var(--live-accent-50)", background: "var(--live-accent-08)" }}>
                    {ICONS[i]}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "var(--live-accent-bright)", marginBottom: 6 }}>{item.year}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "var(--white)", marginBottom: 6 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
