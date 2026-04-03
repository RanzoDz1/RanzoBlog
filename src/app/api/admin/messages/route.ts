import { NextRequest, NextResponse } from "next/server";

function auth(req: NextRequest) {
  return req.headers.get("Authorization") === `Bearer ${process.env.ADMIN_SECRET}`;
}

// In-memory fallback when KV isn't configured
const memMessages: Message[] = [];

export interface Message {
  id: string;
  name: string;
  email: string;
  brand?: string;
  message: string;
  date: string;
  read: boolean;
}

async function getKV() {
  try {
    const { kv } = await import("@vercel/kv");
    return kv;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const kv = await getKV();
    if (kv) {
      const msgs = (await kv.get<Message[]>("ranzo:messages")) ?? [];
      return NextResponse.json({ messages: msgs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) });
    }
    return NextResponse.json({ messages: memMessages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) });
  } catch {
    return NextResponse.json({ messages: memMessages });
  }
}

export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, read } = await req.json();
  try {
    const kv = await getKV();
    if (kv) {
      const msgs = (await kv.get<Message[]>("ranzo:messages")) ?? [];
      const updated = msgs.map(m => m.id === id ? { ...m, read } : m);
      await kv.set("ranzo:messages", updated);
      return NextResponse.json({ ok: true });
    }
    const i = memMessages.findIndex(m => m.id === id);
    if (i !== -1) memMessages[i].read = read;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await req.json();
  try {
    const kv = await getKV();
    if (kv) {
      const msgs = (await kv.get<Message[]>("ranzo:messages")) ?? [];
      await kv.set("ranzo:messages", msgs.filter(m => m.id !== id));
      return NextResponse.json({ ok: true });
    }
    const i = memMessages.findIndex(m => m.id === id);
    if (i !== -1) memMessages.splice(i, 1);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// Called by contact route to store a message
export async function POST(req: NextRequest) {
  const msg: Message = await req.json();
  try {
    const kv = await getKV();
    if (kv) {
      const msgs = (await kv.get<Message[]>("ranzo:messages")) ?? [];
      msgs.unshift(msg);
      await kv.set("ranzo:messages", msgs.slice(0, 200)); // keep last 200
      return NextResponse.json({ ok: true });
    }
    memMessages.unshift(msg);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // silent fail
  }
}
