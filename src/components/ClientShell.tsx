"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Preloader    = dynamic(() => import("@/components/ui/Preloader"),    { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ScrollTheme  = dynamic(() => import("@/components/ui/ScrollTheme"),  { ssr: false });

// Scroll to hash section after page load (for /#sectionId navigation)
function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    // Wait for dynamic sections to mount
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  return null;
}

export default function ClientShell() {
  return (
    <>
      <HashScroll />
      <Preloader />
      <CustomCursor />
      <ScrollTheme />
    </>
  );
}
