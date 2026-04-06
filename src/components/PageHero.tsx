"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

const BG_MAP: Record<string, string> = {
  about:   IMAGES.auroraArms,
  travels: IMAGES.fjord1,
  stories: IMAGES.auroraWide,
  collab:  IMAGES.desertArab,
};

interface PageHeroProps {
  page: "about" | "travels" | "stories" | "collab";
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
}

export default function PageHero({ page, eyebrow, title, titleAccent, subtitle }: PageHeroProps) {
  const bg = BG_MAP[page];
  return (
    <section style={{
      position: "relative",
      minHeight: "clamp(520px, 68vh, 700px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-end",
      overflow: "hidden",
      background: "var(--black)",
      paddingTop: 96,
      paddingBottom: 80,
    }}>
      {/* Background image */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.25) saturate(1.2)",
      }} />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(6,6,8,0.3) 0%, rgba(6,6,8,0.1) 40%, rgba(6,6,8,0.85) 100%)",
      }} />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: "absolute", top: 96, left: "clamp(24px, 5vw, 80px)", display: "flex", alignItems: "center", gap: 8, zIndex: 10 }}
      >
        <Link href="/" style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: "1.5px", textTransform: "uppercase" }}>Home</Link>
        <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>›</span>
        <span style={{ fontSize: 11, color: "var(--live-accent-bright)", letterSpacing: "1.5px", textTransform: "uppercase" }}>{page}</span>
      </motion.div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="eyebrow justify-center"
          style={{ marginBottom: 16 }}
        >
          {eyebrow}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 700, lineHeight: 0.95, color: "var(--white)", marginBottom: titleAccent ? 0 : 0 }}
        >
          {title}
          {titleAccent && <><br /><em className="text-gradient-vivid">{titleAccent}</em></>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ marginTop: 16, fontSize: 15, color: "rgba(248,248,240,0.45)", maxWidth: 480, margin: "16px auto 0" }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
