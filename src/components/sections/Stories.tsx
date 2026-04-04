"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { STORIES } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { STORY_TAGS_AR, STORY_LOCATIONS_AR, STORY_TITLES_AR, STORY_EXCERPTS_AR, tr } from "@/lib/dataTranslations";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

type Story = typeof STORIES[number] & {
  imageX?: number; imageY?: number; imageZoom?: number;
};

export default function Stories() {
  const { t, lang } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [stories, setStories] = useState<Story[]>(STORIES);
  const [open, setOpen] = useState<Story | null>(null);

  useEffect(() => {
    fetch("/api/admin/content?key=stories")
      .then(r => r.json())
      .then(d => { if (d.data && Array.isArray(d.data) && d.data.length > 0) setStories(d.data); })
      .catch(() => {});
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <section id="stories" ref={sectionRef} className="section" style={{ background: "var(--black)" }}>
        <div
          className="absolute top-0 left-0 w-full h-px opacity-30"
          style={{ background: "linear-gradient(to right, transparent, var(--purple-l), transparent)" }}
        />

        <div className="w-full flex flex-col items-center">

          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="text-center w-full"
            style={{ maxWidth: 480, marginBottom: 56 }}
          >
            <div className="eyebrow justify-center" style={{ marginBottom: 20 }}>{t.stories.eyebrow}</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>
              <span style={{ color: "var(--white)" }}>{t.stories.headline1}</span><br />
              <em className="text-gradient-vivid">{t.stories.headline2}</em>
            </h2>
            <p style={{ fontSize: 14, color: "rgba(248,248,240,0.45)", lineHeight: 1.8, margin: 0 }}>
              {t.stories.description}
            </p>
          </motion.div>

          {/* ── STORIES GRID ── */}
          <div
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ maxWidth: 1100, gap: 16 }}
          >
            {stories.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease }}
                className="story-card group relative rounded-xl overflow-hidden"
                style={{ height: "clamp(300px, 50vw, 420px)", border: `1px solid var(--border)`, cursor: "pointer", transition: "border-color 0.3s" }}
                onClick={() => setOpen(story)}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${story.color}60`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                {/* Background image — no hover darkening */}
                <div className="story-card-img absolute inset-0" style={{ overflow: "hidden" }}>
                  <img
                    src={story.image}
                    alt={story.title}
                    draggable={false}
                    className="group-hover:scale-105 transition-transform duration-700"
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      objectPosition: `${(story as any).imageX ?? 50}% ${(story as any).imageY ?? 50}%`,
                      transform: `scale(${(story as any).imageZoom ?? 1})`,
                      transformOrigin: `${(story as any).imageX ?? 50}% ${(story as any).imageY ?? 50}%`,
                      filter: "brightness(0.45) saturate(1.2)",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay — static, no hover change */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(6,6,8,0.97) 0%, rgba(6,6,8,0.3) 50%, transparent 100%)" }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0" style={{ padding: 28 }}>
                  <div className="flex items-center" style={{ gap: 8, marginBottom: 14 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: lang === "ar" ? "0" : "3px", textTransform: "uppercase" as const,
                      padding: "4px 10px", borderRadius: 999,
                      background: `${story.color}20`, color: story.color, border: `1px solid ${story.color}40`,
                    }}>
                      {tr(STORY_TAGS_AR, story.tag, lang)}
                    </span>
                    <span style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase" as const, color: "var(--muted)" }}>
                      {story.number}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, lineHeight: 1.15, color: "var(--white)", marginBottom: 10 }}>
                    {lang === "ar" ? (STORY_TITLES_AR[story.id] ?? story.title) : story.title}
                  </h3>
                  <p className="line-clamp-3" style={{ fontSize: 12, color: "rgba(248,248,240,0.55)", lineHeight: 1.7 }}>
                    {lang === "ar" ? (STORY_EXCERPTS_AR[story.id] ?? story.excerpt) : story.excerpt}
                  </p>

                  {/* Read more hint */}
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ gap: 6, marginTop: 14 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1px", color: story.color }}>
                      {lang === "ar" ? "اقرأ القصة" : "READ STORY"}
                    </span>
                    <span style={{ color: story.color, fontSize: 12 }}>→</span>
                  </div>
                </div>

                {/* Location badge */}
                <div className="absolute glass" style={{ top: 20, right: 20, padding: "6px 12px", borderRadius: 999, fontSize: 10, letterSpacing: lang === "ar" ? "0" : "1px", color: "var(--muted)" }}>
                  📍 {tr(STORY_LOCATIONS_AR, story.location, lang)}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── STORY MODAL ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[400] flex items-stretch"
            style={{ background: "rgba(4,4,6,0.98)" }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease }}
              className="relative flex flex-col lg:flex-row w-full h-full"
              style={{ overflow: "hidden" }}
              onClick={e => e.stopPropagation()}
            >
              {/* Image panel */}
              <div className="lg:w-[42%] flex-shrink-0 relative" style={{ minHeight: "35vh" }}>
                <img
                  src={open.image}
                  alt={open.title}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: `${(open as any).imageX ?? 50}% ${(open as any).imageY ?? 50}%`,
                    filter: "brightness(0.75) saturate(1.15)",
                    position: "absolute", inset: 0,
                  }}
                />
                {/* Gradient into content */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(4,4,6,0.97) 100%)" }} />
                <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, rgba(4,4,6,0.97) 20%, transparent 80%)" }} />

                {/* Tag + number overlay */}
                <div className="absolute top-8 left-8 flex items-center" style={{ gap: 10 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: lang === "ar" ? "0" : "3px", textTransform: "uppercase" as const,
                    padding: "5px 12px", borderRadius: 999,
                    background: `${open.color}25`, color: open.color, border: `1px solid ${open.color}50`,
                  }}>
                    {tr(STORY_TAGS_AR, open.tag, lang)}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{open.number}</span>
                </div>
              </div>

              {/* Text panel */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ padding: "clamp(32px, 5vw, 72px)", paddingTop: "clamp(56px, 6vw, 80px)" }}
              >
                {/* Location */}
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 20, letterSpacing: lang === "ar" ? "0" : "1px" }}>
                  📍 {tr(STORY_LOCATIONS_AR, open.location, lang)}
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 4vw, 52px)",
                  fontWeight: 700, lineHeight: 1.1,
                  color: "var(--white)", marginBottom: 12,
                }}>
                  {lang === "ar" ? (STORY_TITLES_AR[open.id] ?? open.title) : open.title}
                </h2>

                {/* Subtitle */}
                <p style={{ fontSize: 13, color: open.color, fontWeight: 600, marginBottom: 32, letterSpacing: lang === "ar" ? "0" : "1px", textTransform: "uppercase" as const }}>
                  {open.subtitle}
                </p>

                {/* Divider */}
                <div style={{ width: 48, height: 2, background: open.color, borderRadius: 1, marginBottom: 32, opacity: 0.7 }} />

                {/* Body paragraphs */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {(open.body ?? []).map((para, i) => (
                    <p key={i} style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(248,248,240,0.72)", fontWeight: 300 }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setOpen(null)}
                className="absolute top-6 right-6 flex items-center justify-center rounded-full"
                style={{ width: 40, height: 40, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--muted)", fontSize: 18, cursor: "pointer", transition: "all 0.2s", zIndex: 10 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--white)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
