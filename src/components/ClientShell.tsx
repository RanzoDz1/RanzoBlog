"use client";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const Preloader    = dynamic(() => import("@/components/ui/Preloader"),    { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ScrollTheme  = dynamic(() => import("@/components/ui/ScrollTheme"),  { ssr: false });

// Scroll to a target section after page load (URL hash fallback)
function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  return null;
}

// Intercept browser back button:
//   • If scrolled down → scroll to top first
//   • If already at top → let browser navigate away normally
function BackInterceptor() {
  useEffect(() => {
    // Push a state so we can intercept the first back press
    history.pushState({ __ranzodz: true }, "");

    const onPopState = () => {
      if (window.scrollY > 50) {
        // Not at top — scroll up and put the interceptor back
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.pushState({ __ranzodz: true }, "");
      }
      // Already at top — do nothing, browser navigates away naturally
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  return null;
}

export default function ClientShell() {
  return (
    <>
      <HashScroll />
      <BackInterceptor />
      <Preloader />
      <CustomCursor />
      <ScrollTheme />
    </>
  );
}
