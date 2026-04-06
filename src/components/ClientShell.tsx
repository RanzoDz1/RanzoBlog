"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Preloader    = dynamic(() => import("@/components/ui/Preloader"),    { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ScrollTheme  = dynamic(() => import("@/components/ui/ScrollTheme"),  { ssr: false });

// Scroll to a target section after page load
// Checks sessionStorage first (set by Navbar for cross-page nav), then URL hash
function HashScroll() {
  useEffect(() => {
    const stored = sessionStorage.getItem("navScrollTo");
    const hash   = window.location.hash?.slice(1);
    const target = stored || hash;
    if (!target) return;
    if (stored) sessionStorage.removeItem("navScrollTo");
    // Wait for dynamic sections to mount
    const timer = setTimeout(() => {
      const el = document.getElementById(target);
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
