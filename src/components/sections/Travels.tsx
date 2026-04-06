"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTINENTS } from "@/lib/data";
import { useT } from "@/lib/i18n";
import { COUNTRY_NAMES_AR, tr } from "@/lib/dataTranslations";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// Photos mapped to country names — cleared, will be re-added via admin
const COUNTRY_PHOTOS: Record<string, { src: string; caption: string }[]> = {};

type ContinentData = { id: string; name: string; emoji: string; color: string; countries: { name: string; flag: string; photos?: { src: string; caption: string }[] }[] };

export default function Travels() {
  const { t, lang } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const check = () => { if (el.getBoundingClientRect().top < window.innerHeight) { setIsInView(true); window.removeEventListener('scroll', check); } };
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  const [active, setActive] = useState("europe");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const [dynamicContinents, setDynamicContinents] = useState<ContinentData[] | null>(null);
  const [dynamicPhotos, setDynamicPhotos] = useState<Record<string, { src: string; caption: string }[]>>(COUNTRY_PHOTOS);

  // Load countries + photos from KV (admin-saved data), fall back to defaults
  useEffect(() => {
    fetch("/api/admin/content?key=countries")
      .then(r => r.json())
      .then(d => {
        if (d.data && Array.isArray(d.data) && d.data.length > 0) {
          setDynamicContinents(d.data);
          // Merge KV photos over the hardcoded defaults
          const merged = { ...COUNTRY_PHOTOS };
          for (const cont of d.data as ContinentData[]) {
            for (const country of cont.countries) {
              if (country.photos && country.photos.length > 0) {
                merged[country.name] = country.photos;
              }
            }
          }
          setDynamicPhotos(merged);
        }
      })
      .catch(() => {}); // silent fail — use defaults
  }, []);

  const continents = dynamicContinents ?? CONTINENTS;
  const activeCont = continents.find(c => c.id === active) ?? continents[0];
  const countryPhotos = selectedCountry ? (dynamicPhotos[selectedCountry] ?? []) : [];

  const handleCountryClick = (name: string) => {
    setSelectedCountry(prev => prev === name ? null : name);
  };

  const handleContinentClick = (id: string) => {
    setActive(id);
    setSelectedCountry(null);
  };

  return (
    <>
      <section id="travels" ref={sectionRef} className="section" style={{ background: "var(--surface)" }}>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />

        <div className="relative z-10 w-full flex flex-col items-center">

          {/* ── HEADER ── */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-center w-full"
            style={{ maxWidth: 560, marginBottom: 56 }}
          >
            <div className="eyebrow justify-center" style={{ marginBottom: 20 }}>{t.travels.eyebrow}</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>
              <span style={{ color: "var(--white)" }}>{t.travels.headline1}</span><br />
              <em className="text-gradient-vivid">{t.travels.headline2}</em>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(248,248,240,0.45)", lineHeight: 1.8, margin: 0 }}>
              {t.travels.description}{" "}
              <strong style={{ color: "var(--white)" }}>{t.travels.countriesStrong}</strong> {t.travels.countriesEnd}
            </p>
          </motion.div>

          {/* ── CONTINENT SELECTOR ── */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="w-full flex md:justify-center overflow-x-auto"
            style={{ maxWidth: 860, marginBottom: 40, gap: 12, scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" as any, paddingBottom: 4 }}
          >
            {continents.map((cont) => (
              <button
                key={cont.id}
                onClick={() => handleContinentClick(cont.id)}
                className="relative rounded-xl text-left transition-all duration-300"
                style={{
                  padding: "16px 14px",
                  flexShrink: 0,
                  minWidth: 120,
                  border: active === cont.id ? `1px solid ${cont.color}40` : "1px solid var(--border)",
                  background: active === cont.id ? `${cont.color}12` : "rgba(255,255,255,0.02)",
                }}
              >
                {active === cont.id && (
                  <motion.div
                    layoutId="cont-glow"
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: `${cont.color}08`, boxShadow: `0 0 40px ${cont.color}20` }}
                  />
                )}
                <div style={{ fontSize: 22, marginBottom: 8 }}>{cont.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4, color: active === cont.id ? "var(--white)" : "var(--muted)" }}>
                  {t.travels.continents[cont.id as keyof typeof t.travels.continents] ?? cont.name}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, lineHeight: 1, color: active === cont.id ? cont.color : "var(--muted)" }}>
                  {cont.countries.length}
                </div>
                <div style={{ fontSize: 9, letterSpacing: lang === "ar" ? "0" : "2px", textTransform: "uppercase" as const, color: "var(--muted)", marginTop: 3 }}>{lang === "ar" ? "دولة" : "countries"}</div>
              </button>
            ))}
          </motion.div>

          {/* ── COUNTRY CHIPS + PHOTOS ── */}
          <div className="w-full" style={{ maxWidth: 860 }}>
            <div>
              <div key={active}>
                {/* Continent label */}
                <div className="flex items-center" style={{ gap: 16, marginBottom: 20 }}>
                  <span style={{ fontSize: 32 }}>{activeCont.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 600, color: "var(--white)", lineHeight: 1 }}>
                      {t.travels.continents[activeCont.id as keyof typeof t.travels.continents] ?? activeCont.name}
                    </h3>
                    <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                      {activeCont.countries.length} · {t.travels.clickToView}
                    </p>
                  </div>
                </div>

                {/* Country chips — scroll row on mobile, all wrapped on desktop */}
                <div className="hidden md:flex md:flex-wrap" style={{ gap: 8, marginBottom: 24 }}>
                  {activeCont.countries.map((c, i) => {
                    const hasPhotos = !!(dynamicPhotos[c.name] && dynamicPhotos[c.name].length > 0);
                    const isSelected = selectedCountry === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => hasPhotos && handleCountryClick(c.name)}
                        className="flex items-center rounded-full transition-all duration-300"
                        style={{
                          gap: 8, padding: "8px 16px",
                          border: isSelected ? `1px solid ${activeCont.color}80` : hasPhotos ? `1px solid ${activeCont.color}30` : "1px solid var(--border)",
                          background: isSelected ? `${activeCont.color}18` : "rgba(255,255,255,0.02)",
                          fontSize: 12,
                          color: isSelected ? "var(--white)" : hasPhotos ? activeCont.color : "var(--muted)",
                          cursor: hasPhotos ? "pointer" : "default",
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{c.flag}</span>
                        <span style={{ fontWeight: 500 }}>{tr(COUNTRY_NAMES_AR, c.name, lang)}</span>
                        {hasPhotos && <span style={{ fontSize: 10, opacity: 0.7 }}>📷</span>}
                      </button>
                    );
                  })}
                </div>
                {/* Mobile: horizontal scroll row */}
                <div className="flex md:hidden" style={{ flexWrap: "nowrap", overflowX: "auto", gap: 8, marginBottom: 24, scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" as any, paddingBottom: 4 }}>
                  {activeCont.countries.map((c, i) => {
                    const hasPhotos = !!(dynamicPhotos[c.name] && dynamicPhotos[c.name].length > 0);
                    const isSelected = selectedCountry === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => hasPhotos && handleCountryClick(c.name)}
                        className="flex items-center rounded-full transition-all duration-300"
                        style={{
                          gap: 8,
                          padding: "8px 16px",
                          flexShrink: 0,
                          border: isSelected ? `1px solid ${activeCont.color}80` : hasPhotos ? `1px solid ${activeCont.color}30` : "1px solid var(--border)",
                          background: isSelected ? `${activeCont.color}18` : "rgba(255,255,255,0.02)",
                          fontSize: 12,
                          color: isSelected ? "var(--white)" : hasPhotos ? activeCont.color : "var(--muted)",
                          cursor: hasPhotos ? "pointer" : "default",
                        }}
                      >
                        <span style={{ fontSize: 16 }}>{c.flag}</span>
                        <span style={{ fontWeight: 500 }}>{tr(COUNTRY_NAMES_AR, c.name, lang)}</span>
                        {hasPhotos && <span style={{ fontSize: 10, opacity: 0.7 }}>📷</span>}
                      </button>
                    );
                  })}
                </div>{/* end mobile scroll row */}

                {/* Country photos panel */}
                <AnimatePresence>
                  {selectedCountry && countryPhotos.length > 0 && (
                    <motion.div
                      key={selectedCountry}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        className="rounded-xl"
                        style={{ padding: "24px", background: "rgba(255,255,255,0.02)", border: `1px solid ${activeCont.color}20`, marginBottom: 16 }}
                      >
                        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: lang === "ar" ? "0" : "1.5px", textTransform: "uppercase" as const, color: activeCont.color, marginBottom: 16 }}>
                          📍 {tr(COUNTRY_NAMES_AR, selectedCountry, lang)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 12 }}>
                          {countryPhotos.map((photo, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: i * 0.08, duration: 0.4, ease }}
                              className="relative rounded-xl overflow-hidden cursor-pointer group"
                              style={{ aspectRatio: "4/3", border: "1px solid var(--border)" }}
                              onClick={() => setLightbox(photo)}
                            >
                              <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                style={{
                                  objectPosition: `${(photo as any).x ?? 50}% ${(photo as any).y ?? 50}%`,
                                  transform: `scale(${(photo as any).zoom ?? 1})`,
                                  transformOrigin: `${(photo as any).x ?? 50}% ${(photo as any).y ?? 50}%`,
                                  filter: "brightness(0.85) saturate(1.1)",
                                }}
                                loading="lazy"
                              />
                              <div
                                className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: "linear-gradient(to top, rgba(6,6,8,0.9) 0%, transparent 60%)", padding: "12px" }}
                              >
                                <p style={{ fontSize: 11, color: "var(--white)", fontWeight: 500 }}>{photo.caption}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.p
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{ fontSize: 12, letterSpacing: "1px", color: "var(--muted)", marginTop: 8 }}
            >
              {lang === "ar" ? "والمزيد يتزاد مع كل رحلة. العدّ ما يوقفش." : "+ more being added every journey. The count never stops."}
            </motion.p>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center"
            style={{ background: "rgba(6,6,8,0.98)", padding: 24 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="relative rounded-2xl overflow-hidden"
              style={{ maxWidth: "90vw", maxHeight: "85vh", border: "1px solid var(--border)" }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.caption} style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain", display: "block" }} />
              <div className="absolute bottom-0 left-0 right-0" style={{ padding: "16px 20px", background: "linear-gradient(to top, rgba(6,6,8,0.95) 0%, transparent 100%)" }}>
                <p style={{ fontSize: 14, color: "var(--white)", fontWeight: 500 }}>📍 {lightbox.caption}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 flex items-center justify-center rounded-full"
                style={{ width: 36, height: 36, background: "rgba(0,0,0,0.7)", color: "white", fontSize: 18, border: "none", cursor: "pointer" }}
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
