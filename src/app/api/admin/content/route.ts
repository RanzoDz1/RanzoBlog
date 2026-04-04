import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Singleton to avoid too many connections in serverless
const globalForPrisma = globalThis as unknown as { _prisma?: PrismaClient };
const prisma = globalForPrisma._prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma._prisma = prisma;

function auth(req: NextRequest) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_SECRET}`;
}

// GET /api/admin/content?key=...  (public — content is website data)
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
  try {
    const row = await prisma.settings.findUnique({ where: { key } });
    const data = row ? JSON.parse(row.value) : null;
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: null });
  }
}

// POST /api/admin/content  body: { key, data }
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { key, data } = await req.json();
    if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
    await prisma.settings.upsert({
      where:  { key },
      update: { value: JSON.stringify(data) },
      create: { key,  value: JSON.stringify(data) },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Content save error:", e);
    return NextResponse.json({ ok: false, error: "Failed to save" }, { status: 500 });
  }
}
