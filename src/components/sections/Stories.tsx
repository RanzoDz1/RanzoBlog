"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { STORIES } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { STORY_TAGS_AR, STORY_LOCATIONS_AR, STORY_TITLES_AR, STORY_EXCERPTS_AR, STORY_SUBTITLES_AR, STORY_BODIES_AR, tr } from "@/lib/dataTranslations";
import Carousel from "@/components/ui/Carousel";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

type Story = typeof STORIES[number] & {
  imageX?: number; imageY?: number; imageZoom?: number;
  titleAr?: string; locationAr?: string; excerptAr?: string; bodyAr?: string[];
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
      .then(d => {
        if (d.data && Array.isArray(d.data) && d.data.length > 0) {
          // KV supplies image position + AR fields.
          // EN body/excerpt/title/location always come from data.ts (source of truth).
          const merged = d.data.map((s: Story) => {
            const src = STORIES.find(x => x.id === s.id);
            return {
              ...s,
              title:    src?.title    ?? s.title,
              subtitle: src?.subtitle ?? s.subtitle,
              excerpt:  src?.excerpt  ?? s.excerpt,
              body:     src?.body     ?? s.body,
              location: src?.location ?? s.location,
              tag:      src?.tag      ?? s.tag,
            };
          });
          setStories(merged);
        }
      })
      .catch(() => {});
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Navigation helpers
  const currentIndex = open ? stories.findIndex(s => s.id === open.id) : -1;

  const goNext = useCallback(() => {
    setOpen(prev => prev ? stories[(stories.findIndex(s => s.id === prev.id) + 1) % stories.length] : null);
  }, [stories]);

  const goPrev = useCallback(() => {
    setOpen(prev => prev ? stories[(stories.findIndex(s => s.id === prev.id) - 1 + stories.length) % stories.length] : null);
  }, [stories]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, goNext, goPrev]);

  const navBtn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: "50%",
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(248,248,240,0.6)", fontSize: 16, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s", flexShrink: 0,
  };

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

          {/* ── STORIES CAROUSEL ── */}
          <div className="w-full" style={{ maxWidth: 1100 }}>
            <Carousel gap={16}>
              {stories.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease }}
                  className="story-card group relative rounded-xl overflow-hidden"
                  style={{ height: 420, width: 300, border: `1px solid var(--border)`, cursor: "pointer", transition: "border-color 0.3s" }}
                  onClick={() => setOpen(story)}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${story.color}60`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
                >
                  {/* Background image */}
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

                  {/* Gradient overlay */}
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
                      {lang === "ar" ? (STORY_TITLES_AR[story.id] ?? (story as Story).titleAr ?? story.title) : story.title}
                    </h3>
                    <p className="line-clamp-3" style={{ fontSize: 12, color: "rgba(248,248,240,0.55)", lineHeight: 1.7 }}>
                      {lang === "ar" ? (STORY_EXCERPTS_AR[story.id] ?? (story as Story).excerptAr ?? story.excerpt) : story.excerpt}
                    </p>

                    {/* Read more hint */}
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ gap: 6, marginTop: 14 }}>
                      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1px", color: story.color }}>
                        {lang === "ar" ? "قرا القصة" : "READ STORY"}
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
            </Carousel>
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
                <AnimatePresence mode="wait">
                  <motion.img
                    key={open.id}
                    src={open.image}
                    alt={open.title}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      objectPosition: `${(open as any).imageX ?? 50}% ${(open as any).imageY ?? 50}%`,
                      filter: "brightness(0.75) saturate(1.15)",
                      position: "absolute", inset: 0,
                    }}
                  />
                </AnimatePresence>
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

                {/* Prev/Next arrows on image (desktop) */}
                <div className="hidden lg:flex absolute bottom-8 left-8 items-center" style={{ gap: 10 }}>
                  <button
                    onClick={goPrev}
                    style={navBtn}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "var(--white)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,248,240,0.6)"; }}
                  >←</button>
                  {/* Dots */}
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {stories.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => setOpen(s)}
                        style={{
                          width: i === currentIndex ? 20 : 6,
                          height: 6, borderRadius: 3, border: "none", cursor: "pointer",
                          background: i === currentIndex ? open.color : "rgba(255,255,255,0.25)",
                          transition: "all 0.3s",
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>
                  <button
                    onClick={goNext}
                    style={navBtn}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "var(--white)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,248,240,0.6)"; }}
                  >→</button>
                </div>
              </div>

              {/* Text panel */}
              <div
                className="flex-1 overflow-y-auto"
                style={{ padding: "clamp(32px, 5vw, 72px)", paddingTop: "clamp(56px, 6vw, 80px)", paddingBottom: "clamp(80px, 6vw, 80px)" }}
              >
                {/* Location */}
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 20, letterSpacing: lang === "ar" ? "0" : "1px" }}>
                  📍 {lang === "ar" ? (tr(STORY_LOCATIONS_AR, open.location, lang) ?? open.locationAr ?? open.location) : open.location}
                </div>

                {/* Title */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={open.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <h2 style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(28px, 4vw, 52px)",
                      fontWeight: 700, lineHeight: 1.1,
                      color: "var(--white)", marginBottom: 12,
                    }}>
                      {lang === "ar" ? (STORY_TITLES_AR[open.id] ?? open.titleAr ?? open.title) : open.title}
                    </h2>

                    {/* Subtitle */}
                    <p style={{ fontSize: 13, color: open.color, fontWeight: 600, marginBottom: 32, letterSpacing: lang === "ar" ? "0" : "1px", textTransform: lang === "ar" ? "none" as const : "uppercase" as const }}>
                      {lang === "ar" ? (STORY_SUBTITLES_AR[open.id] ?? open.subtitle) : open.subtitle}
                    </p>

                    {/* Divider */}
                    <div style={{ width: 48, height: 2, background: open.color, borderRadius: 1, marginBottom: 32, opacity: 0.7 }} />

                    {/* Body paragraphs */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      {(lang === "ar" ? (STORY_BODIES_AR[open.id] ?? open.bodyAr ?? open.body ?? []) : (open.body ?? [])).map((para, i) => (
                        <p key={i} style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(248,248,240,0.72)", fontWeight: 300 }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* ── Bottom nav (mobile + desktop) ── */}
                <div className="flex items-center justify-between" style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <button
                    onClick={goPrev}
                    style={{ ...navBtn, gap: 8, width: "auto", borderRadius: 10, padding: "0 16px", fontSize: 13 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)"; (e.currentTarget as HTMLElement).style.color = "var(--white)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,248,240,0.6)"; }}
                  >← {lang === "ar" ? "السابقة" : "Prev"}</button>

                  {/* Dots */}
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {stories.map((s, i) => (
                      <button
                        key={s.id}
                        onClick={() => setOpen(s)}
                        style={{
                          width: i === currentIndex ? 20 : 6,
                          height: 6, borderRadius: 3, border: "none", cursor: "pointer",
                          background: i === currentIndex ? open.color : "rgba(255,255,255,0.2)",
                          transition: "all 0.3s",
                          padding: 0,
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={goNext}
                    style={{ ...navBtn, gap: 8, width: "auto", borderRadius: 10, padding: "0 16px", fontSize: 13 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.13)"; (e.currentTarget as HTMLElement).style.color = "var(--white)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLElement).style.color = "rgba(248,248,240,0.6)"; }}
                  >{lang === "ar" ? "التالية" : "Next"} →</button>
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
