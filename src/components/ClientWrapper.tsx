"use client";
import { LanguageProvider } from "@/lib/i18n";
import MouseSpotlight from "@/components/MouseSpotlight";
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <LanguageProvider><MouseSpotlight />{children}</LanguageProvider>;
}
