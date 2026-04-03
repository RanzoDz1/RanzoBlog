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
      // KV not configured — that's fine, email still goes out
    }

    // Send email via Resend if configured
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_KEY);
      await resend.emails.send({
        from: "RanzoDz Website <onboarding@resend.dev>",
        to: "ranzodzt@gmail.com",
        subject: `New collab inquiry from ${name}${brand ? ` | ${brand}` : ""}`,
        html: `
          <h2>New Collaboration Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${brand ? `<p><strong>Brand:</strong> ${brand}</p>` : ""}
          <p><strong>Message:</strong></p>
          <blockquote>${message.replace(/\n/g, "<br/>")}</blockquote>
          <hr/>
          <p style="color:#999;font-size:12px">Sent via ranzodz.com contact form</p>
        `,
      });
    } else {
      console.log("Contact form submission:", { name, email, brand, message });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
