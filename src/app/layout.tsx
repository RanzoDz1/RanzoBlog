import type { Metadata } from "next";
import { Space_Grotesk, Cairo } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import CookieBanner from "@/components/CookieBanner";

// Self-hosted at build time — no fonts.googleapis.com round-trip on the
// critical path, and the woff2 files are preloaded from our own origin.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
  preload: false, // only needed once the visitor switches to Arabic
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ranzodz.com"),
  title: "RanzoDz | Travel. Risk. Experience.",
  description: "Abdullah Khalfi | @RanzoDz | Travel content creator & IRL streamer. 50+ countries, 6 continents, 1M+ followers. Stories from the edges of the world.",
  keywords: ["RanzoDz","Ranzo","Abdullah Khalfi","travel creator Algeria","travel influencer Germany","IRL streamer","travel content creator","adventure travel","budget travel","Northern Lights","Africa travel"],
  authors: [{ name: "Abdullah Khalfi", url: "https://ranzodz.com" }],
  creator: "RanzoDz",
  alternates: {
    canonical: "https://ranzodz.com",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website", locale: "en_US", url: "https://ranzodz.com", siteName: "RanzoDz",
    title: "RanzoDz | Travel. Risk. Experience.",
    description: "50+ countries. 6 continents. 1M+ followers. Stories from the edges of the world.",
    images: [{ url: "https://ranzodz.com/opengraph-image", width: 1200, height: 630, alt: "RanzoDz | Travel Creator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ranzodz",
    title: "RanzoDz | Travel. Risk. Experience.",
    description: "50+ countries. 6 continents. 1M+ followers.",
    images: ["https://ranzodz.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${cairo.variable}`}
      style={{ overflowX: "hidden" }}
    >
      <head>
        <meta name="theme-color" content="#060608" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://ranzodz.com/#person",
              name: "Abdullah Khalfi",
              alternateName: "RanzoDz",
              description: "Travel content creator and IRL streamer with 50+ countries visited across 6 continents.",
              url: "https://ranzodz.com",
              image: "https://ranzodz.com/opengraph-image",
              sameAs: [
                "https://instagram.com/ranzodz",
                "https://youtube.com/@ranzodz",
                "https://tiktok.com/@ranzodz",
                "https://kick.com/ranzodz",
                "https://facebook.com/ranzodz",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://ranzodz.com/#website",
              url: "https://ranzodz.com",
              name: "RanzoDz",
              description: "Travel content creator and IRL streamer — 50+ countries, 6 continents.",
              author: { "@id": "https://ranzodz.com/#person" },
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ClientWrapper>
          <main id="main-content" style={{ overflowX: "hidden", width: "100%" }}>{children}</main>
        </ClientWrapper>
        <CookieBanner />
      </body>
    </html>
  );
}
