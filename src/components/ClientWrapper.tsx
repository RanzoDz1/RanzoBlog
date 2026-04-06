"use client";
import { LanguageProvider } from "@/lib/i18n";
import MouseSpotlight from "@/components/MouseSpotlight";
import NavTransitionProvider from "@/components/NavTransitionProvider";
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <NavTransitionProvider>
        <MouseSpotlight />
        {children}
      </NavTransitionProvider>
    </LanguageProvider>
  );
}
