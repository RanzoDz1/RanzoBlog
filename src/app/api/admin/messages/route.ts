import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function auth(req: NextRequest) {
  const secret = (process.env.ADMIN_SECRET || "").trim();
  return req.headers.get("Authorization") === `Bearer ${secret}`;
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const messages = await prisma.message.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("GET messages error:", err);
    return NextResponse.json({ messages: [] });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, read } = await req.json();
  try {
    await prisma.message.update({ where: { id }, data: { read } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PATCH message error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  try {
    await prisma.message.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE message error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
