import { NextRequest, NextResponse } from "next/server";

function auth(req: NextRequest) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_SECRET}`;
}

async function getKV() {
  try {
    const { kv } = await import("@vercel/kv");
    return kv;
  } catch {
    return null;
  }
}

// GET /api/admin/content?key=countries|stories|apps  (public — content is website data)
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get("key");
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
  try {
    const kv = await getKV();
    if (kv) {
      const data = await kv.get(`ranzo:content:${key}`);
      return NextResponse.json({ data });
    }
    return NextResponse.json({ data: null });
  } catch {
    return NextResponse.json({ data: null });
  }
}

// POST /api/admin/content  body: { key, data }
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key, data } = await req.json();
  if (!key) return NextResponse.json({ error: "Missing key" }, { status: 400 });
  try {
    const kv = await getKV();
    if (kv) {
      await kv.set(`ranzo:content:${key}`, data);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: "KV not configured" });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save" }, { status: 500 });
  }
}
