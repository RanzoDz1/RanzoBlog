"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setVisible(false);
        window.dispatchEvent(new Event("cookie-consent-updated"));
    };

    const decline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            role="dialog"
            aria-label="Cookie consent"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                padding: "16px",
            }}
        >
            <div style={{
                maxWidth: 900,
                margin: "0 auto",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 16,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(6,6,8,0.95)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                padding: "14px 20px",
                boxShadow: "0 -4px 60px rgba(0,0,0,0.6)",
            }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>🍪</span>
                <p style={{ flex: 1, minWidth: 200, fontSize: 12, lineHeight: 1.6, color: "rgba(248,248,240,0.5)", margin: 0 }}>
                    We use cookies and analytics to understand how visitors use our site and improve your experience. See our{" "}
                    <a href="/privacy-policy" style={{ color: "var(--blue-l, #60a5fa)", textDecoration: "underline" }}>
                        Privacy Policy
                    </a>.
                </p>
                <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                    <button
                        onClick={decline}
                        style={{
                            padding: "8px 16px",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            color: "rgba(248,248,240,0.4)",
                            background: "none",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(248,248,240,0.8)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(248,248,240,0.4)"; }}
                    >
                        Decline
                    </button>
                    <button
                        onClick={accept}
                        style={{
                            padding: "8px 20px",
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            color: "#000",
                            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                            border: "none",
                            borderRadius: 8,
                            cursor: "pointer",
                        }}
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}
