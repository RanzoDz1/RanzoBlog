import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | RanzoDz",
  description: "Terms of Service for RanzoDz. Read the terms governing use of ranzodz.com.",
  alternates: { canonical: "https://ranzodz.com/terms" },
  robots: { index: true, follow: true },
};

export default function Terms() {
  const lastUpdated = "April 7, 2026";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--black, #060608)",
        color: "var(--white, #f8f8f0)",
        padding: "100px 20px 80px",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <a
            href="/"
            style={{ display: "inline-block", marginBottom: 32, fontSize: 13, color: "var(--blue-l, #60a5fa)", textDecoration: "none" }}
          >
            ← Back to Home
          </a>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, marginBottom: 8, fontFamily: "var(--font-display, inherit)" }}>
            Terms of Service
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted, rgba(248,248,240,0.4))" }}>Last updated: {lastUpdated}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40, fontSize: 15, lineHeight: 1.8, color: "rgba(248,248,240,0.65)" }}>
          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>1. Acceptance</h2>
            <p>
              By accessing <a href="https://ranzodz.com" style={{ color: "var(--blue-l, #60a5fa)" }}>https://ranzodz.com</a>, you agree to these Terms of Service. If you do not agree, please do not use the website.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>2. Website Purpose</h2>
            <p>
              RanzoDz is a personal travel blog and content creator portfolio showcasing travel stories, country photos, and social media content from Abdullah Khalfi.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>3. Intellectual Property</h2>
            <p>
              All content on this website — including travel photos, text, videos, and design — is the property of Abdullah Khalfi (&ldquo;RanzoDz&rdquo;) and is protected by copyright law. You may not reproduce, distribute, or use any content without written permission.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>4. Acceptable Use</h2>
            <p style={{ marginBottom: 12 }}>You agree not to:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Copy or reproduce travel photos without permission</li>
              <li>Attempt to access admin sections without authorization</li>
              <li>Submit spam or malicious content via contact forms</li>
              <li>Use automated tools to scrape content</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>5. Disclaimer</h2>
            <p>
              Travel content is for informational and entertainment purposes only. We do not guarantee the accuracy of travel tips, visa requirements, or safety information. Always verify with official sources before traveling.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>6. Limitation of Liability</h2>
            <p>
              RanzoDz shall not be liable for any damages arising from the use of this website or reliance on its content.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>7. Changes</h2>
            <p>
              We may update these terms at any time. Continued use of the website after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>8. Contact</h2>
            <div style={{ padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontSize: 14 }}>
              <p style={{ fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 6 }}>RanzoDz</p>
              <p>Email: <a href="mailto:ranzodzt@gmail.com" style={{ color: "var(--blue-l, #60a5fa)" }}>ranzodzt@gmail.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
