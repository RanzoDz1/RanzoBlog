"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { STORIES } from "@/lib/data";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Stories() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [stories, setStories] = useState(STORIES);

  useEffect(() => {
    fetch("/api/admin/content?key=stories")
      .then(r => r.json())
      .then(d => { if (d.data && Array.isArray(d.data) && d.data.length > 0) setStories(d.data); })
      .catch(() => {});
  }, []);

  return (
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
          <div className="eyebrow justify-center" style={{ marginBottom: 20 }}>Real Stories</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>
            <span style={{ color: "var(--white)" }}>Stories from</span><br />
            <em className="text-gradient-vivid">the road.</em>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(248,248,240,0.45)", lineHeight: 1.8, margin: 0 }}>
            Six moments that changed everything. Raw, real, unfiltered.
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
              style={{ height: "clamp(300px, 50vw, 420px)", border: "1px solid var(--border)" }}
            >
              {/* Background image */}
              <div className="story-card-img absolute inset-0">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.45) saturate(1.2)" }}
                  loading="lazy"
                />
              </div>

              {/* Color hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${story.color}30 0%, transparent 60%)` }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(6,6,8,0.97) 0%, rgba(6,6,8,0.4) 50%, transparent 100%)" }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0" style={{ padding: 28 }}>
                <div className="flex items-center" style={{ gap: 8, marginBottom: 14 }}>
                  <span
                    style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" as const,
                      padding: "4px 10px", borderRadius: 999,
                      background: `${story.color}20`, color: story.color, border: `1px solid ${story.color}40`,
                    }}
                  >
                    {story.tag}
                  </span>
                  <span style={{ fontSize: 9, letterSpacing: "2px", textTransform: "uppercase" as const, color: "var(--muted)" }}>
                    {story.number}
                  </span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, lineHeight: 1.15, color: "var(--white)", marginBottom: 10 }}>
                  {story.title}
                </h3>
                <p className="line-clamp-3" style={{ fontSize: 12, color: "rgba(248,248,240,0.55)", lineHeight: 1.7 }}>
                  {story.excerpt}
                </p>
              </div>

              {/* Location badge */}
              <div className="absolute glass" style={{ top: 20, right: 20, padding: "6px 12px", borderRadius: 999, fontSize: 10, letterSpacing: "1px", color: "var(--muted)" }}>
                📍 {story.location}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
