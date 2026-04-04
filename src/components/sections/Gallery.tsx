"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/data";
import { useT } from "@/lib/i18n";

type Category = "all" | "nature" | "cities" | "culture" | "adventures";
const CATEGORIES: { id: Category; label: string; emoji: string }[] = [
  { id: "all",        label: "All",        emoji: "🌐" },
  { id: "nature",     label: "Nature",     emoji: "🏔️" },
  { id: "cities",     label: "Cities",     emoji: "🏙️" },
  { id: "culture",    label: "Culture",    emoji: "🕌" },
  { id: "adventures", label: "Adventures", emoji: "🪂" },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const PREVIEW_COUNT = 4; // photos per category in "All" view

export default function Gallery() {
  const { t } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [category, setCategory] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const groups = CATEGORIES.filter(c => c.id !== "all").map(cat => ({
    ...cat,
    items: GALLERY_ITEMS.filter(i => i.category === cat.id),
  })).filter(g => g.items.length > 0);

  const singleCategoryItems = category !== "all"
    ? GALLERY_ITEMS.filter(i => i.category === category)
    : [];

  return (
    <>
      <section id="gallery" ref={sectionRef} className="section" style={{ background: "var(--surface)" }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }} className="eyebrow justify-center mb-4"
            >
              {t.gallery.eyebrow}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 700, lineHeight: 0.9 }}
            >
              <span style={{ color: "var(--white)" }}>{t.gallery.headline1}</span>{t.gallery.headline1 ? " " : ""}
              <em className="text-gradient-vivid">{t.gallery.headline2}</em>
            </motion.h2>

            {/* Category tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 mt-8"
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-semibold tracking-[1px] uppercase transition-all duration-300"
                  style={{
                    background: category === cat.id ? "var(--purple)" : "rgba(255,255,255,0.04)",
                    border: category === cat.id ? "1px solid var(--purple-l)" : "1px solid var(--border)",
                    color: category === cat.id ? "#fff" : "var(--muted)",
                    boxShadow: category === cat.id ? "0 4px 20px var(--glow-p)" : "none",
                  }}
                >
                  <span>{cat.emoji}</span>
                  {t.gallery.categories[cat.id as keyof typeof t.gallery.categories] ?? cat.label}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Gallery content */}
          <AnimatePresence mode="wait">
            {category === "all" ? (
              /* ── ALL VIEW: 4 preview per category, "See all" to expand ── */
              <motion.div
                key="all"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {groups.map((group) => (
                  <div key={group.id} className="mb-10 last:mb-0">
                    {/* Group header */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl">{group.emoji}</span>
                      <h3 className="text-[15px] font-bold tracking-[1px] uppercase" style={{ color: "var(--white)" }}>
                        {group.label}
                      </h3>
                      <div className="flex-1 h-px ml-2" style={{ background: "var(--border)" }} />
                      <button
                        onClick={() => setCategory(group.id as Category)}
                        className="text-[11px] font-semibold tracking-[1px] uppercase px-4 py-1.5 rounded-full transition-all duration-300 hover:border-purple-500"
                        style={{ color: "var(--purple-l)", border: "1px solid var(--border)", background: "rgba(124,58,237,0.05)" }}
                      >
                        {t.gallery.seeAll} {group.items.length} →
                      </button>
                    </div>

                    {/* Preview row: exactly 4 items, always fills the row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {group.items.slice(0, PREVIEW_COUNT).map((item, i) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, duration: 0.4, ease }}
                          className="gallery-item group relative cursor-pointer overflow-hidden rounded-xl"
                          style={{ border: "1px solid var(--border)", aspectRatio: "1/1" }}
                          onClick={() => setLightbox(item)}
                        >
                          <img
                            src={item.src}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            style={{ filter: "brightness(0.8) saturate(1.1)" }}
                            loading="lazy"
                          />
                          <div
                            className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                            style={{ background: "linear-gradient(to top, rgba(6,6,8,0.9) 0%, rgba(6,6,8,0.3) 60%, transparent 100%)" }}
                          >
                            <p className="text-[13px] font-semibold" style={{ color: "var(--white)" }}>{item.title}</p>
                            <p className="text-[11px]" style={{ color: "var(--muted)" }}>📍 {item.location}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              /* ── SINGLE CATEGORY VIEW: full grid ── */
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Back to all button */}
                <div className="mb-6">
                  <button
                    onClick={() => setCategory("all")}
                    className="text-[11px] font-semibold tracking-[1px] uppercase flex items-center gap-2 transition-colors duration-200 hover:text-white"
                    style={{ color: "var(--muted)" }}
                  >
                    ← Back to all
                  </button>
                </div>

                {/* Full grid - use mixed layout to fill all space */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {singleCategoryItems.map((item, i) => {
                    // Make first item and every 5th item span 2 cols to fill gaps
                    const isWide = i === 0 || (singleCategoryItems.length % 4 !== 0 && i === singleCategoryItems.length - 1 && singleCategoryItems.length % 2 !== 0);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, duration: 0.4, ease }}
                        className={`gallery-item group relative cursor-pointer overflow-hidden rounded-xl ${isWide ? "md:col-span-2" : ""}`}
                        style={{ border: "1px solid var(--border)", aspectRatio: isWide ? "2/1" : "1/1" }}
                        onClick={() => setLightbox(item)}
                      >
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          style={{ filter: "brightness(0.8) saturate(1.1)" }}
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                          style={{ background: "linear-gradient(to top, rgba(6,6,8,0.9) 0%, rgba(6,6,8,0.3) 60%, transparent 100%)" }}
                        >
                          <p className="text-[13px] font-semibold" style={{ color: "var(--white)" }}>{item.title}</p>
                          <p className="text-[11px]" style={{ color: "var(--muted)" }}>📍 {item.location}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6"
            style={{ background: "rgba(6,6,8,0.96)", backdropFilter: "blur(32px)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.title} className="max-w-full max-h-[80vh] object-contain" />
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: "linear-gradient(to top, rgba(6,6,8,0.95) 0%, transparent 100%)" }}>
                <p className="text-[16px] font-semibold" style={{ color: "var(--white)" }}>{lightbox.title}</p>
                <p className="text-[12px]" style={{ color: "var(--muted)" }}>📍 {lightbox.location}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,0,0,0.7)", color: "white", fontSize: "18px" }}
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
