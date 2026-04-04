import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, brand, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store message in KV (silent fail if not configured)
    try {
      const { kv } = await import("@vercel/kv");
      const msgs: object[] = (await kv.get("ranzo:messages")) ?? [];
      msgs.unshift({
        id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name, email, brand: brand || "", message,
        date: new Date().toISOString(),
        read: false,
      });
      await kv.set("ranzo:messages", msgs.slice(0, 200));
    } catch {
      // KV not configured — messages still go out via email
    }

    // Send email via FormSubmit.co — free, unlimited, no API key needed
    // NOTE: First ever submission will send a confirmation email to ranzodzt@gmail.com
    // Just click "Confirm" in that email once, then all future submissions arrive instantly.
    try {
      await fetch("https://formsubmit.co/ajax/ranzodzt@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New collab inquiry from ${name}${brand ? ` — ${brand}` : ""}`,
          _template: "table",
          _captcha: "false",
          Name: name,
          Email: email,
          ...(brand ? { Brand: brand } : {}),
          Message: message,
        }),
      });
    } catch (mailErr) {
      // Email failed silently — message is still saved to admin dashboard
      console.error("FormSubmit error:", mailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
