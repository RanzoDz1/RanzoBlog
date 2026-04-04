import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Send email notification via FormSubmit.co
    try {
      await fetch("https://formsubmit.co/ajax/ranzodzt@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: `${brand ? `Brand: ${brand}\n\n` : ""}${message}`,
          _subject: `New collab inquiry from ${name}${brand ? ` — ${brand}` : ""}`,
          _replyto: email,
        }),
      });
    } catch (emailErr) {
      console.error("FormSubmit error:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
