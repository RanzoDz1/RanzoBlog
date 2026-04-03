"use client";
import dynamic from "next/dynamic";

const Preloader    = dynamic(() => import("@/components/ui/Preloader"),    { ssr: false });
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), { ssr: false });
const ScrollTheme  = dynamic(() => import("@/components/ui/ScrollTheme"),  { ssr: false });

export default function ClientShell() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollTheme />
    </>
  );
}
