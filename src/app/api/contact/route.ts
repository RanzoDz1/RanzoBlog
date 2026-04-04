import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, brand, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to database
    try {
      await prisma.message.create({
        data: { name, email, brand: brand || "", message },
      });
    } catch (dbErr) {
      console.error("DB save error:", dbErr);
    }

    // Send email notification via Resend
    try {
      await resend.emails.send({
        from: "Ranzo Portfolio <onboarding@resend.dev>",
        to: "ranzodzt@gmail.com",
        subject: `New collab inquiry from ${name}${brand ? ` — ${brand}` : ""}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:8px">
            <h2 style="margin:0 0 24px;color:#111">New message from your portfolio</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#666;width:90px">Name</td><td style="padding:8px 0;font-weight:600;color:#111">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#666">Email</td><td style="padding:8px 0;color:#111"><a href="mailto:${email}">${email}</a></td></tr>
              ${brand ? `<tr><td style="padding:8px 0;color:#666">Brand</td><td style="padding:8px 0;color:#111">${brand}</td></tr>` : ""}
            </table>
            <div style="margin-top:24px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5">
              <p style="margin:0;color:#333;white-space:pre-wrap">${message}</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Resend error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
