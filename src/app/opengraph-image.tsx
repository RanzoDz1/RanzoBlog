import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RanzoDz | Travel. Risk. Experience.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#060608",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image — aurora road */}
        <img
          src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80&fm=jpg&fit=crop"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.30) saturate(1.3)",
          }}
          alt=""
        />

        {/* Cinematic overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(6,6,8,0.4) 0%, rgba(6,6,8,0.1) 40%, rgba(6,6,8,0.7) 100%)",
            display: "flex",
          }}
        />

        {/* Purple/blue glow orb */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, rgba(37,99,235,0.2) 50%, transparent 80%)",
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 24,
              padding: "8px 20px",
              borderRadius: 999,
              border: "1px solid rgba(124,58,237,0.4)",
              background: "rgba(124,58,237,0.12)",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(196,181,253,0.9)", letterSpacing: "3px", textTransform: "uppercase" }}>
              🌍 &nbsp; Travel Content Creator
            </span>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: "-3px",
              lineHeight: 1,
              marginBottom: 20,
              background: "linear-gradient(135deg, #f8f8f0 0%, #c4b5fd 40%, #60a5fa 100%)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            RanzoDz
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              fontWeight: 300,
              color: "rgba(248,248,240,0.6)",
              letterSpacing: "1px",
              marginBottom: 48,
              display: "flex",
            }}
          >
            Travel.&nbsp;
            <span style={{ color: "rgba(196,181,253,0.9)", fontWeight: 600 }}>Risk.</span>
            &nbsp;Experience.
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 0,
            }}
          >
            {[
              { value: "50+", label: "Countries" },
              { value: "6", label: "Continents" },
              { value: "1M+", label: "Followers" },
            ].map((stat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "12px 36px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 800,
                      background: "linear-gradient(135deg, #c4b5fd, #60a5fa)",
                      backgroundClip: "text",
                      color: "transparent",
                      lineHeight: 1,
                      marginBottom: 4,
                      display: "flex",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(248,248,240,0.35)", letterSpacing: "2.5px", textTransform: "uppercase", display: "flex" }}>
                    {stat.label}
                  </span>
                </div>
                {i < 2 && (
                  <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.1)", display: "flex" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 48,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(248,248,240,0.25)", letterSpacing: "1px" }}>
            ranzodz.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
