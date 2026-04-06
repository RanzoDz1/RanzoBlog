import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import CookieBanner from "@/components/CookieBanner";

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
    images: [{ url: "https://ranzodz.com/og-image.jpg", width: 1200, height: 630, alt: "RanzoDz | Travel Creator" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ranzodz",
    title: "RanzoDz | Travel. Risk. Experience.",
    description: "50+ countries. 6 continents. 1M+ followers.",
    images: ["https://ranzodz.com/og-image.jpg"],
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
    <html lang="en" suppressHydrationWarning style={{ overflowX: "hidden" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Cairo:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
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
              image: "https://ranzodz.com/og-image.jpg",
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
