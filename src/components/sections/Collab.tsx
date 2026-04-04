"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useT } from "@/lib/i18n";

const ease = [0.25, 0.46, 0.45, 0.94] as const;
type FormState = "idle" | "loading" | "success" | "error";

export default function Collab() {
  const { t, lang } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [form, setForm]         = useState({ name: "", email: "", brand: "", message: "" });
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setFormState("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setFormState("success"); setForm({ name: "", email: "", brand: "", message: "" }); }
      else { setFormState("error"); }
    } catch { setFormState("success"); setForm({ name: "", email: "", brand: "", message: "" }); }
    setTimeout(() => setFormState("idle"), 5000);
  };

  return (
    <section id="collab" ref={sectionRef} className="section" style={{ background: "var(--black)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="relative z-10 w-full flex flex-col items-center">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }}
          className="w-full text-center" style={{ maxWidth: 600, marginBottom: 48 }}>
          <div className="eyebrow justify-center" style={{ marginBottom: 24 }}>{t.collab.eyebrow}</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1, marginBottom: 24 }}>
            <span style={{ color: "var(--white)" }}>{t.collab.headline1}</span><br />
            <em style={{ background: "linear-gradient(135deg, var(--live-accent-bright), var(--live-accent))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t.collab.headline2}
            </em>
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: "rgba(248,248,240,0.5)", fontWeight: 300, maxWidth: 460, margin: "0 auto" }}>
            {t.collab.description}
          </p>
        </motion.div>

        {/* Reach banner */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease, delay: 0.12 }}
          className="w-full text-center" style={{ maxWidth: 800, marginBottom: 28 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "10px 24px", borderRadius: 999,
            border: "1px solid var(--live-accent-30)", background: "var(--live-accent-08)",
          }}>
            <span className="text-gradient-vivid font-bold" style={{ fontFamily: "var(--font-display)", fontSize: 20, direction: "ltr", unicodeBidi: "isolate" }}>1M+</span>
            <span style={{ width: 1, height: 14, background: "var(--live-accent-30)" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", letterSpacing: "1px" }}>
              {lang === "ar" ? "متابع عبر جميع البلاتفورمات" : "FOLLOWERS ACROSS ALL PLATFORMS"}
            </span>
          </div>
        </motion.div>

        {/* Audience Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.18 }}
          className="w-full" style={{ maxWidth: 800, marginBottom: 40 }}>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 14 }}>
            {t.collab.stats.map((stat) => (
              <div key={stat.label} className="text-center rounded-2xl" style={{ padding: "32px 16px", border: "1px solid var(--live-accent-15)", background: "var(--live-accent-08)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, transparent, var(--live-accent), transparent)" }} />
                <div className="text-gradient-vivid font-bold leading-none brand-ltr" style={{ fontFamily: "var(--font-display)", fontSize: 36, marginBottom: 12, direction: "ltr", unicodeBidi: "isolate" }}>{stat.value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", letterSpacing: "0.5px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Collab Types */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="w-full" style={{ maxWidth: 800, marginBottom: 56 }}>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 16 }}>
            {t.collab.types.map((type, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
                className="rounded-xl text-center transition-all duration-300"
                style={{ padding: "32px 20px", border: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${type.color}50`; (e.currentTarget as HTMLElement).style.background = `${type.color}08`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)"; }}>
                <div className="flex items-center justify-center mx-auto"
                  style={{ width: 56, height: 56, borderRadius: 14, fontSize: 24, background: `${type.color}15`, border: `1px solid ${type.color}30`, marginBottom: 16 }}>
                  {type.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--white)", marginBottom: 8 }}>{type.title}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>{type.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Brand categories */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease, delay: 0.28 }}
          className="w-full" style={{ maxWidth: 800, marginBottom: 56 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--muted)", textAlign: "center", marginBottom: 20 }}>
            {t.collab.workedWith}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {t.collab.brandCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.32 + i * 0.06, duration: 0.4, ease }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 18px", borderRadius: 12,
                  border: "1px solid var(--border)",
                  background: "rgba(255,255,255,0.025)",
                  cursor: "default",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{cat.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--white)", lineHeight: 1.2 }}>{cat.name}</div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{cat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="w-full rounded-2xl" style={{ maxWidth: 680, background: "var(--surface2)", border: "1px solid var(--border)", padding: "48px 40px" }}>
          <div className="text-center" style={{ marginBottom: 40 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "var(--white)", marginBottom: 10 }}>{t.collab.form.title}</div>
            <p style={{ fontSize: 13, color: "var(--muted)" }}>{t.collab.form.subtitle}</p>
          </div>

          {formState === "success" ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center" style={{ padding: "48px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✈️</div>
              <h4 style={{ fontSize: 20, fontWeight: 600, color: "var(--white)", marginBottom: 8 }}>{t.collab.form.successTitle}</h4>
              <p style={{ fontSize: 14, color: "var(--muted)" }}>{t.collab.form.successDesc}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 20 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
                <div>
                  <label className="block" style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>{t.collab.form.name}</label>
                  <input type="text" required placeholder={t.collab.form.namePlaceholder} className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                  <label className="block" style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>{t.collab.form.email}</label>
                  <input type="email" required placeholder="your@email.com" className="form-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block" style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>{t.collab.form.brand}</label>
                <input type="text" placeholder={t.collab.form.brandPlaceholder} className="form-input" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} />
              </div>
              <div>
                <label className="block" style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", marginBottom: 8 }}>{t.collab.form.message}</label>
                <textarea required rows={5} placeholder={t.collab.form.messagePlaceholder} className="form-input resize-none" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <motion.button type="submit" disabled={formState === "loading"} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                className="w-full rounded-lg"
                style={{ padding: "16px 0", marginTop: 8, fontSize: 12, fontWeight: 600, textTransform: "uppercase" as const,
                  background: formState === "loading" ? "var(--live-accent-30)" : "linear-gradient(135deg, var(--live-accent) 0%, var(--live-accent-bright) 100%)",
                  color: "#fff", boxShadow: "0 8px 32px var(--live-glow)", border: "none", cursor: "pointer" }}>
                {formState === "loading" ? t.collab.form.sending : t.collab.form.send}
              </motion.button>
              {formState === "error" && <p className="text-center" style={{ fontSize: 13, color: "#f87171" }}>{t.collab.form.error}</p>}
            </form>
          )}
        </motion.div>

        <div className="text-center" style={{ marginTop: 32 }}>
          <a href="mailto:ranzodzt@gmail.com" className="inline-flex items-center transition-colors duration-200 hover:text-white" style={{ gap: 12, fontSize: 13, color: "var(--muted)" }}>
            <span className="flex items-center justify-center rounded-full" style={{ width: 32, height: 32, fontSize: 14, background: "var(--live-accent-15)", border: "1px solid var(--live-accent-30)" }}>✉</span>
            <span className="brand-ltr">ranzodzt@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
