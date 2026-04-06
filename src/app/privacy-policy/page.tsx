import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | RanzoDz",
  description: "Privacy Policy for RanzoDz. Learn how we collect, use, and protect your personal data on ranzodz.com.",
  alternates: { canonical: "https://ranzodz.com/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicy() {
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
            style={{
              display: "inline-block",
              marginBottom: 32,
              fontSize: 13,
              color: "var(--blue-l, #60a5fa)",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </a>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 800, marginBottom: 8, fontFamily: "var(--font-display, inherit)" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted, rgba(248,248,240,0.4))" }}>Last updated: {lastUpdated}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40, fontSize: 15, lineHeight: 1.8, color: "rgba(248,248,240,0.65)" }}>
          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>1. Introduction</h2>
            <p>
              RanzoDz (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website{" "}
              <a href="https://ranzodz.com" style={{ color: "var(--blue-l, #60a5fa)" }}>https://ranzodz.com</a>{" "}
              (the &ldquo;Service&rdquo;). This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>2. Information We Collect</h2>
            <p style={{ marginBottom: 12 }}>We may collect the following information:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Usage data (pages visited, time spent, interactions) — only with your consent</li>
              <li>Device and browser information (browser type, OS, screen size)</li>
              <li>General geographic region (country/city level, not precise location)</li>
              <li>Messages submitted via the collaboration/contact form</li>
              <li>Uploaded photos (if you use admin features — admin users only)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>3. Cookies &amp; Analytics</h2>
            <p style={{ marginBottom: 12 }}>
              We use <strong style={{ color: "var(--white, #f8f8f0)" }}>Vercel Analytics</strong> for privacy-friendly, cookie-less analytics. Additionally, we may use <strong style={{ color: "var(--white, #f8f8f0)" }}>Google Analytics</strong> if you accept cookies.
            </p>
            <p>
              You can opt out at any time by declining our cookie banner or visiting{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: "var(--blue-l, #60a5fa)" }}>
                Google&apos;s opt-out page
              </a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>4. Third-Party Services</h2>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Cloudinary</strong> — image storage and delivery for travel photos</li>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Vercel</strong> — hosting provider</li>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Google Fonts</strong> — typography (may set cookies)</li>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Vercel Analytics</strong> — privacy-friendly analytics</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>5. Your Rights (GDPR)</h2>
            <p style={{ marginBottom: 12 }}>If you are in the EEA or UK, you have the right to:</p>
            <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Access</strong> — request a copy of your data</li>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Erasure</strong> — request deletion of your data</li>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Objection</strong> — object to processing</li>
              <li><strong style={{ color: "var(--white, #f8f8f0)" }}>Portability</strong> — request transfer of your data</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Contact: <a href="mailto:ranzodzt@gmail.com" style={{ color: "var(--blue-l, #60a5fa)" }}>ranzodzt@gmail.com</a>
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>6. Data Security</h2>
            <p>
              We use HTTPS encryption, Content Security Policy headers, and industry-standard security practices to protect your data. Uploaded travel photos are stored securely on Cloudinary&apos;s CDN.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>7. Children&apos;s Privacy</h2>
            <p>
              This website is not directed to individuals under 16. We do not knowingly collect data from minors.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 12 }}>8. Contact</h2>
            <div style={{ padding: "16px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontSize: 14 }}>
              <p style={{ fontWeight: 700, color: "var(--white, #f8f8f0)", marginBottom: 6 }}>RanzoDz</p>
              <p>Email: <a href="mailto:ranzodzt@gmail.com" style={{ color: "var(--blue-l, #60a5fa)" }}>ranzodzt@gmail.com</a></p>
              <p>Website: <a href="https://ranzodz.com" style={{ color: "var(--blue-l, #60a5fa)" }}>https://ranzodz.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
