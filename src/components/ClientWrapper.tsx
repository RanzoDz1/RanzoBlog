"use client";
import { usePathname } from "next/navigation";
import { LanguageProvider } from "@/lib/i18n";
import MouseSpotlight from "@/components/MouseSpotlight";
import NavTransitionProvider from "@/components/NavTransitionProvider";
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  return (
    <LanguageProvider>
      <NavTransitionProvider>
        {!isAdmin && <MouseSpotlight />}
        {children}
      </NavTransitionProvider>
    </LanguageProvider>
  );
}
