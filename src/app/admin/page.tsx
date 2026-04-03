"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTINENTS, STORIES, TRAVEL_APPS } from "@/lib/data";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Msg { id: string; name: string; email: string; brand?: string; message: string; date: string; read: boolean; }
type Tab = "messages" | "countries" | "stories" | "apps" | "settings";
type Story = (typeof STORIES)[0];
type App   = (typeof TRAVEL_APPS)[0];

// ── Shared Styles ─────────────────────────────────────────────────────────────
const card:  React.CSSProperties = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 24 };
const inp:   React.CSSProperties = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 14px", color: "#f8f8f0", fontSize: 13, width: "100%", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(248,248,240,0.35)", marginBottom: 6, display: "block" };
const btnP:  React.CSSProperties = { padding: "9px 22px", borderRadius: 8, fontSize: 12, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", border: "none", background: "linear-gradient(135deg,#7c3aed,#6366f1)", color: "#fff" };
const btnG:  React.CSSProperties = { padding: "9px 22px", borderRadius: 8, fontSize: 12, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", background: "rgba(255,255,255,0.06)", color: "rgba(248,248,240,0.6)", border: "1px solid rgba(255,255,255,0.1)" };
const btnD:  React.CSSProperties = { padding: "9px 22px", borderRadius: 8, fontSize: 12, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", border: "none", background: "rgba(239,68,68,0.12)", color: "#f87171" };
const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

// ── Login ─────────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: (t: string) => void }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr("");
    try {
      const r = await fetch("/api/admin-auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: u, password: p }) });
      const d = await r.json();
      if (d.success) onLogin(d.token); else setErr("Invalid credentials");
    } catch { setErr("Connection error"); }
    setLoading(false);
  };
  return (
    <div style={{ minHeight: "100vh", background: "#060608", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ui)" }}>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 40%, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ ...card, width: 380, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 4, background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>RANZODZ</div>
          <div style={{ fontSize: 11, color: "rgba(248,248,240,0.35)", letterSpacing: 2, textTransform: "uppercase" }}>Admin Dashboard</div>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div><span style={label}>Username</span><input style={inp} placeholder="admin" value={u} onChange={e => setU(e.target.value)} autoFocus /></div>
          <div><span style={label}>Password</span><input style={inp} type="password" placeholder="••••••••" value={p} onChange={e => setP(e.target.value)} /></div>
          {err && <div style={{ fontSize: 12, color: "#f87171", textAlign: "center" }}>{err}</div>}
          <button type="submit" disabled={loading} style={{ ...btnP, padding: "13px 0", marginTop: 8, width: "100%" }}>{loading ? "Signing in…" : "Sign In →"}</button>
        </form>
      </motion.div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "messages",  label: "Messages",    icon: "✉" },
  { id: "countries", label: "Countries",   icon: "🌍" },
  { id: "stories",   label: "Stories",     icon: "📖" },
  { id: "apps",      label: "Travel Apps", icon: "📱" },
  { id: "settings",  label: "Settings",    icon: "⚙️" },
];
function Sidebar({ tab, setTab, onLogout }: { tab: Tab; setTab: (t: Tab) => void; onLogout: () => void }) {
  return (
    <div style={{ width: 220, background: "#0d0d12", borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", padding: "0", flexShrink: 0, minHeight: "100vh" }}>
      <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 3, background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RANZODZ</div>
        <div style={{ fontSize: 9, color: "rgba(248,248,240,0.3)", letterSpacing: 2, marginTop: 3, textTransform: "uppercase" }}>Admin Panel</div>
      </div>
      <div style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", textAlign: "left", transition: "all 0.2s", background: tab === t.id ? "rgba(124,58,237,0.18)" : "transparent", color: tab === t.id ? "#a78bfa" : "rgba(248,248,240,0.45)", fontWeight: tab === t.id ? 600 : 400, fontSize: 13 }}>
            <span style={{ fontSize: 17 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <button onClick={onLogout} style={{ ...btnG, width: "100%", textAlign: "center" as const, padding: "10px 0" }}>Sign Out</button>
      </div>
    </div>
  );
}

// ── Messages ──────────────────────────────────────────────────────────────────
function Messages({ token }: { token: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([]); const [sel, setSel] = useState<Msg | null>(null); const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try { const r = await fetch("/api/admin/messages", { headers: { Authorization: `Bearer ${token}` } }); const d = await r.json(); setMsgs(d.messages ?? []); } catch { setMsgs([]); }
    setLoading(false);
  }, [token]);
  useEffect(() => { load(); }, [load]);
  const mark = async (id: string, read: boolean) => { await fetch("/api/admin/messages", { method: "PATCH", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ id, read }) }); setMsgs(m => m.map(x => x.id === id ? { ...x, read } : x)); if (sel?.id === id) setSel(s => s ? { ...s, read } : s); };
  const del = async (id: string) => { if (!confirm("Delete this message?")) return; await fetch("/api/admin/messages", { method: "DELETE", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); setMsgs(m => m.filter(x => x.id !== id)); if (sel?.id === id) setSel(null); };
  const unread = msgs.filter(m => !m.read).length;
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* list */}
      <div style={{ width: 320, borderRight: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#f8f8f0" }}>Inbox</span>
          {unread > 0 && <span style={{ background: "#7c3aed", color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{unread}</span>}
          <button onClick={load} style={{ ...btnG, marginLeft: "auto", padding: "5px 12px", fontSize: 11 }}>↻ Refresh</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {loading ? <div style={{ padding: 24, color: "rgba(248,248,240,0.35)", fontSize: 13 }}>Loading…</div>
            : msgs.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: "rgba(248,248,240,0.25)" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>✉</div>
                <div style={{ fontSize: 13 }}>No messages yet</div>
              </div>
            ) : msgs.map(m => (
              <div key={m.id} onClick={() => { setSel(m); if (!m.read) mark(m.id, true); }} style={{ padding: "16px 20px", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.05)", background: sel?.id === m.id ? "rgba(124,58,237,0.1)" : "transparent", transition: "background 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  {!m.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />}
                  <span style={{ fontSize: 13, fontWeight: m.read ? 400 : 600, color: m.read ? "rgba(248,248,240,0.65)" : "#f8f8f0", flex: 1 }}>{m.name}</span>
                  <span style={{ fontSize: 10, color: "rgba(248,248,240,0.3)", flexShrink: 0 }}>{fmt(m.date)}</span>
                </div>
                {m.brand && <div style={{ fontSize: 11, color: "#a78bfa", marginBottom: 3 }}>{m.brand}</div>}
                <div style={{ fontSize: 12, color: "rgba(248,248,240,0.4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</div>
              </div>
            ))}
        </div>
      </div>
      {/* detail */}
      <div style={{ flex: 1, padding: 36, overflowY: "auto" }}>
        {!sel ? (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "rgba(248,248,240,0.2)" }}>
            <span style={{ fontSize: 44 }}>✉</span><span style={{ fontSize: 14 }}>Select a message to read</span>
          </div>
        ) : (
          <motion.div key={sel.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, gap: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#f8f8f0", marginBottom: 6 }}>{sel.name}</div>
                <a href={`mailto:${sel.email}`} style={{ fontSize: 13, color: "#818cf8", textDecoration: "none" }}>{sel.email}</a>
                {sel.brand && <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 12, color: "rgba(248,248,240,0.6)" }}>🏢 {sel.brand}</div>}
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <button onClick={() => mark(sel.id, !sel.read)} style={btnG}>{sel.read ? "Mark Unread" : "Mark Read"}</button>
                <button onClick={() => del(sel.id)} style={btnD}>Delete</button>
              </div>
            </div>
            <div style={{ fontSize: 11, color: "rgba(248,248,240,0.3)", marginBottom: 20 }}>📅 {fmt(sel.date)}</div>
            <div style={{ ...card, fontSize: 14, lineHeight: 1.85, color: "rgba(248,248,240,0.8)", whiteSpace: "pre-wrap" }}>{sel.message}</div>
            <a href={`mailto:${sel.email}?subject=Re: Your inquiry`} style={{ display: "inline-block", marginTop: 20, ...btnP, textDecoration: "none" }}>Reply via Email ↗</a>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ── Countries ─────────────────────────────────────────────────────────────────
type Photo = { src: string; caption: string };
type CountryEntry = { name: string; flag: string; photos?: Photo[] };
type ContinentEntry = { id: string; name: string; emoji: string; color: string; countries: CountryEntry[] };

function Countries({ token }: { token: string }) {
  const [continents, setContinents] = useState<ContinentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(CONTINENTS[0].id);
  const [editCountry, setEditCountry] = useState<string | null>(null);
  const [nc, setNc] = useState({ name: "", flag: "" });
  const [newPhoto, setNewPhoto] = useState({ src: "", caption: "" });
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);

  // Load from KV on mount, fall back to CONTINENTS defaults
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/admin/content?key=countries", { headers: { Authorization: `Bearer ${token}` } });
        const d = await r.json();
        if (d.data && Array.isArray(d.data) && d.data.length > 0) {
          setContinents(d.data);
        } else {
          setContinents(CONTINENTS.map(c => ({ ...c, countries: c.countries.map(co => ({ ...co })) })));
        }
      } catch {
        setContinents(CONTINENTS.map(c => ({ ...c, countries: c.countries.map(co => ({ ...co })) })));
      }
      setLoading(false);
    })();
  }, [token]);

  const cont = continents.find(c => c.id === active);
  const editingCountry = cont?.countries.find(c => c.name === editCountry);

  const removeCountry = (i: number) => { setContinents(cs => cs.map(c => c.id === active ? { ...c, countries: c.countries.filter((_, j) => j !== i) } : c)); setEditCountry(null); };
  const addCountry = () => { if (!nc.name.trim()) return; setContinents(cs => cs.map(c => c.id === active ? { ...c, countries: [...c.countries, { name: nc.name.trim(), flag: nc.flag || "🏳" }] } : c)); setNc({ name: "", flag: "" }); };

  const addPhoto = () => {
    if (!editCountry || !newPhoto.src.trim()) return;
    setContinents(cs => cs.map(c => c.id === active ? { ...c, countries: c.countries.map(co => co.name === editCountry ? { ...co, photos: [...(co.photos || []), { src: newPhoto.src.trim(), caption: newPhoto.caption.trim() }] } : co) } : c));
    setNewPhoto({ src: "", caption: "" });
  };
  const removePhoto = (pi: number) => {
    if (!editCountry) return;
    setContinents(cs => cs.map(c => c.id === active ? { ...c, countries: c.countries.map(co => co.name === editCountry ? { ...co, photos: (co.photos || []).filter((_, i) => i !== pi) } : co) } : c));
  };

  const [saveErr, setSaveErr] = useState("");
  const save = async () => {
    setSaving(true); setSaveErr("");
    try {
      const r = await fetch("/api/admin/content", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ key: "countries", data: continents }) });
      if (r.ok) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
      else { const d = await r.json().catch(() => ({})); setSaveErr(d.error || `Error ${r.status}`); }
    } catch { setSaveErr("Network error"); }
    finally { setSaving(false); }
  };

  if (loading) return <div style={{ padding: 36, color: "rgba(248,248,240,0.35)", fontSize: 14 }}>Loading countries…</div>;
  if (!cont) return null;

  return (
    <div style={{ padding: 36, maxWidth: 900 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: "#f8f8f0", marginBottom: 4 }}>Countries</h2><p style={{ fontSize: 13, color: "rgba(248,248,240,0.4)" }}>Manage visited countries and photos per continent. Click a country to edit its photos.</p></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          {saveErr && <div style={{ fontSize: 12, color: "#f87171" }}>{saveErr}</div>}
          <button onClick={save} disabled={saving} style={btnP}>{saving ? "Saving…" : saved ? "✓ Saved!" : "Save Changes"}</button>
        </div>
      </div>

      {/* Continent tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {continents.map(c => (
          <button key={c.id} onClick={() => { setActive(c.id); setEditCountry(null); }} style={{ padding: "9px 18px", borderRadius: 8, border: active === c.id ? `1px solid ${c.color}50` : "1px solid rgba(255,255,255,0.08)", background: active === c.id ? `${c.color}22` : "rgba(255,255,255,0.04)", color: active === c.id ? c.color : "rgba(248,248,240,0.5)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {c.emoji} {c.name} ({c.countries.length})
          </button>
        ))}
      </div>

      {/* Country chips — click to select and manage photos */}
      <div style={{ ...card, marginBottom: 20 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "rgba(248,248,240,0.35)", marginBottom: 16 }}>
          {cont.countries.length} Countries · <span style={{ color: cont.color }}>click a country to add/remove photos</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {cont.countries.map((c, i) => (
            <div
              key={i}
              onClick={() => setEditCountry(editCountry === c.name ? null : c.name)}
              style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999, background: editCountry === c.name ? `${cont.color}22` : `${cont.color}14`, border: `1px solid ${editCountry === c.name ? cont.color + "50" : cont.color + "30"}`, fontSize: 13, color: editCountry === c.name ? "#f8f8f0" : "rgba(248,248,240,0.75)", cursor: "pointer", transition: "all 0.15s" }}
            >
              <span style={{ fontSize: 17 }}>{c.flag}</span>
              <span>{c.name}</span>
              {c.photos && c.photos.length > 0 && <span style={{ fontSize: 10, opacity: 0.65, marginLeft: 2 }}>📷 {c.photos.length}</span>}
              <button onClick={e => { e.stopPropagation(); removeCountry(i); }} style={{ background: "none", border: "none", color: "rgba(248,248,240,0.3)", cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1, marginLeft: 4 }}>×</button>
            </div>
          ))}
        </div>
      </div>

      {/* Photo editor panel — appears when a country is selected */}
      <AnimatePresence>
        {editCountry && editingCountry && (
          <motion.div key={editCountry} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: 20 }}>
            <div style={{ ...card, borderColor: `${cont.color}40` }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: cont.color, marginBottom: 16 }}>
                📷 Photos for {editCountry} · {(editingCountry.photos || []).length} photo(s)
              </div>

              {/* Existing photos list */}
              {(editingCountry.photos || []).length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                  {(editingCountry.photos || []).map((photo, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ width: 60, height: 44, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,0.05)" }}>
                        <img src={photo.src} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2"; }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, color: "rgba(248,248,240,0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{photo.src}</div>
                        <div style={{ fontSize: 11, color: "rgba(248,248,240,0.35)", marginTop: 2 }}>{photo.caption || "No caption"}</div>
                      </div>
                      <button onClick={() => removePhoto(pi)} style={{ ...btnD, padding: "5px 12px", fontSize: 11, flexShrink: 0 }}>Remove</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: "12px 0 20px", fontSize: 13, color: "rgba(248,248,240,0.3)" }}>No photos yet for {editCountry}. Add your first photo below.</div>
              )}

              {/* Add new photo */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "rgba(248,248,240,0.35)", marginBottom: 12 }}>Add New Photo</div>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
                  <div style={{ flex: "2 1 200px" }}><span style={label}>Image URL (Google Drive, Imgur, etc.)</span><input style={inp} placeholder="https://lh3.googleusercontent.com/d/..." value={newPhoto.src} onChange={e => setNewPhoto(p => ({ ...p, src: e.target.value }))} /></div>
                  <div style={{ flex: "1 1 140px" }}><span style={label}>Caption</span><input style={inp} placeholder="e.g. Sahara Desert" value={newPhoto.caption} onChange={e => setNewPhoto(p => ({ ...p, caption: e.target.value }))} onKeyDown={e => e.key === "Enter" && addPhoto()} /></div>
                  <button onClick={addPhoto} style={{ ...btnP, flexShrink: 0 }}>+ Add Photo</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add new country */}
      <div style={card}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "rgba(248,248,240,0.35)", marginBottom: 16 }}>Add Country</div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}><span style={label}>Country Name</span><input style={inp} placeholder="e.g. Japan" value={nc.name} onChange={e => setNc(p => ({ ...p, name: e.target.value }))} onKeyDown={e => e.key === "Enter" && addCountry()} /></div>
          <div style={{ width: 110 }}><span style={label}>Flag Emoji</span><input style={inp} placeholder="🇯🇵" value={nc.flag} onChange={e => setNc(p => ({ ...p, flag: e.target.value }))} /></div>
          <button onClick={addCountry} style={{ ...btnP, flexShrink: 0 }}>Add</button>
        </div>
      </div>
    </div>
  );
}

// ── Stories ───────────────────────────────────────────────────────────────────
function StoriesTab({ token }: { token: string }) {
  const [stories, setStories] = useState<Story[]>(STORIES.map(s => ({ ...s })));
  const [open, setOpen] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveErr, setSaveErr] = useState("");

  // Load saved stories from KV on mount
  useEffect(() => {
    fetch("/api/admin/content?key=stories", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d.data && Array.isArray(d.data) && d.data.length > 0) setStories(d.data); })
      .catch(() => {});
  }, [token]);

  const upd = (i: number, f: string, v: string) => setStories(ss => ss.map((s, j) => j === i ? { ...s, [f]: v } : s));

  const save = async () => {
    setSaving(true);
    setSaveErr("");
    try {
      const r = await fetch("/api/admin/content", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ key: "stories", data: stories }),
      });
      if (r.ok) {
        setSaved(true);
        setOpen(null);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const d = await r.json().catch(() => ({}));
        setSaveErr(d.error || `Error ${r.status}`);
      }
    } catch (e) {
      setSaveErr("Network error — check connection");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div style={{ padding: 36, maxWidth: 860 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: "#f8f8f0", marginBottom: 4 }}>Stories</h2><p style={{ fontSize: 13, color: "rgba(248,248,240,0.4)" }}>Edit your travel stories shown on the site.</p></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          {saveErr && <div style={{ fontSize: 12, color: "#f87171" }}>{saveErr}</div>}
          <button onClick={save} disabled={saving} style={btnP}>{saving ? "Saving…" : saved ? "✓ Saved!" : "Save All"}</button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {stories.map((s, i) => (
          <div key={s.id} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={s.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 999, background: `${s.color}18`, color: s.color, border: `1px solid ${s.color}30` }}>{s.tag}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f8f8f0" }}>{s.title}</div>
                <div style={{ fontSize: 12, color: "rgba(248,248,240,0.4)", marginTop: 2 }}>📍 {s.location}</div>
              </div>
              <button onClick={() => setOpen(open === i ? null : i)} style={open === i ? btnD : btnG}>{open === i ? "Close" : "Edit"}</button>
            </div>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 20, marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div><span style={label}>Title</span><input style={inp} value={s.title} onChange={e => upd(i, "title", e.target.value)} /></div>
                    <div><span style={label}>Location</span><input style={inp} value={s.location} onChange={e => upd(i, "location", e.target.value)} /></div>
                    <div><span style={label}>Tag Label</span><input style={inp} value={s.tag} onChange={e => upd(i, "tag", e.target.value)} /></div>
                    <div><span style={label}>Accent Color</span><input style={inp} value={s.color} onChange={e => upd(i, "color", e.target.value)} /></div>
                    <div style={{ gridColumn: "1/-1" }}><span style={label}>Short Description</span><textarea style={{ ...inp, minHeight: 80, resize: "none" as const }} value={s.excerpt} onChange={e => upd(i, "excerpt", e.target.value)} /></div>
                    <div style={{ gridColumn: "1/-1" }}><span style={label}>Image URL</span><input style={inp} value={s.image} onChange={e => upd(i, "image", e.target.value)} /></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Apps ──────────────────────────────────────────────────────────────────────
function AppsTab({ token }: { token: string }) {
  const [apps, setApps] = useState<App[]>(TRAVEL_APPS.map(a => ({ ...a })));
  const [open, setOpen] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [na, setNa] = useState({ name: "", emoji: "", category: "", desc: "", url: "", color: "#7c3aed" });
  const [saving, setSaving] = useState(false); const [saved, setSaved] = useState(false);
  const upd = (i: number, f: string, v: string) => setApps(as => as.map((a, j) => j === i ? { ...a, [f]: v } : a));
  const remove = (i: number) => { if (!confirm("Remove this app?")) return; setApps(as => as.filter((_, j) => j !== i)); };
  const add = () => { if (!na.name.trim()) return; setApps(as => [...as, { ...na }]); setNa({ name: "", emoji: "", category: "", desc: "", url: "", color: "#7c3aed" }); setAdding(false); };
  const [saveErr, setSaveErr] = useState("");
  const save = async () => {
    setSaving(true); setSaveErr("");
    try {
      const r = await fetch("/api/admin/content", { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ key: "apps", data: apps }) });
      if (r.ok) { setSaved(true); setOpen(null); setTimeout(() => setSaved(false), 2500); }
      else { const d = await r.json().catch(() => ({})); setSaveErr(d.error || `Error ${r.status}`); }
    } catch { setSaveErr("Network error"); }
    finally { setSaving(false); }
  };
  return (
    <div style={{ padding: 36, maxWidth: 860 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div><h2 style={{ fontSize: 20, fontWeight: 700, color: "#f8f8f0", marginBottom: 4 }}>Travel Apps</h2><p style={{ fontSize: 13, color: "rgba(248,248,240,0.4)" }}>Manage your travel toolkit shown on the site.</p></div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setAdding(!adding)} style={btnG}>+ Add App</button>
          <button onClick={save} disabled={saving} style={btnP}>{saving ? "Saving…" : saved ? "✓ Saved!" : "Save All"}</button>
        </div>
      </div>
      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: 16 }}>
            <div style={{ ...card, borderColor: "rgba(124,58,237,0.3)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#a78bfa", marginBottom: 16 }}>New App</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 14 }}>
                <div><span style={label}>Name</span><input style={inp} placeholder="Skyscanner" value={na.name} onChange={e => setNa(p => ({ ...p, name: e.target.value }))} /></div>
                <div><span style={label}>Emoji</span><input style={inp} placeholder="✈️" value={na.emoji} onChange={e => setNa(p => ({ ...p, emoji: e.target.value }))} /></div>
                <div><span style={label}>Category</span><input style={inp} placeholder="Flights" value={na.category} onChange={e => setNa(p => ({ ...p, category: e.target.value }))} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                <div><span style={label}>URL</span><input style={inp} placeholder="https://..." value={na.url} onChange={e => setNa(p => ({ ...p, url: e.target.value }))} /></div>
                <div><span style={label}>Color</span><input style={inp} placeholder="#7c3aed" value={na.color} onChange={e => setNa(p => ({ ...p, color: e.target.value }))} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><span style={label}>Description</span><input style={inp} placeholder="What it's used for…" value={na.desc} onChange={e => setNa(p => ({ ...p, desc: e.target.value }))} /></div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={add} style={btnP}>Add App</button>
                <button onClick={() => setAdding(false)} style={btnG}>Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {apps.map((a, i) => (
          <div key={i} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, background: `${a.color}18`, border: `1px solid ${a.color}30`, flexShrink: 0 }}>{a.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#f8f8f0" }}>{a.name}</div>
                <div style={{ fontSize: 11, color: a.color, textTransform: "uppercase", letterSpacing: "1px", marginTop: 2 }}>{a.category}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={open === i ? btnD : btnG}>{open === i ? "Close" : "Edit"}</button>
                <button onClick={() => remove(i)} style={btnD}>Remove</button>
              </div>
            </div>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 16, marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
                    <div><span style={label}>Name</span><input style={inp} value={a.name} onChange={e => upd(i, "name", e.target.value)} /></div>
                    <div><span style={label}>Emoji</span><input style={inp} value={a.emoji} onChange={e => upd(i, "emoji", e.target.value)} /></div>
                    <div><span style={label}>Category</span><input style={inp} value={a.category} onChange={e => upd(i, "category", e.target.value)} /></div>
                    <div style={{ gridColumn: "1/-1" }}><span style={label}>URL</span><input style={inp} value={a.url} onChange={e => upd(i, "url", e.target.value)} /></div>
                    <div style={{ gridColumn: "1/-1" }}><span style={label}>Description</span><input style={inp} value={a.desc} onChange={e => upd(i, "desc", e.target.value)} /></div>
                    <div><span style={label}>Color</span><input style={inp} value={a.color} onChange={e => upd(i, "color", e.target.value)} /></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Settings ──────────────────────────────────────────────────────────────────
interface HeroPos { desktopX: number; desktopY: number; mobileX: number; mobileY: number; imageUrl: string; }
const DEFAULT_POS: HeroPos = { desktopX: 55, desktopY: 30, mobileX: 35, mobileY: 20, imageUrl: "" };

// Slider extracted outside Settings so it's a stable component reference
function PosSlider({ lbl, field, value, onChange }: { lbl: string; field: keyof HeroPos; value: number; onChange: (f: keyof HeroPos, v: number) => void }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "rgba(248,248,240,0.35)" }}>{lbl}</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#a78bfa", fontFamily: "monospace", minWidth: 52, textAlign: "right" as const }}>{value}%</span>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={e => onChange(field, Number(e.target.value))}
        style={{ width: "100%", accentColor: "#7c3aed", cursor: "pointer" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "rgba(248,248,240,0.25)", marginTop: 4 }}>
        <span>0% — Left</span><span>50% — Center</span><span>100% — Right</span>
      </div>
    </div>
  );
}

const LS_KEY = "ranzo_hero_pos";

function Settings({ token }: { token: string }) {
  const [pos, setPos] = useState<HeroPos>(DEFAULT_POS);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "savedLocal">("idle");

  useEffect(() => {
    // 1. Try KV first, fall back to localStorage
    fetch("/api/admin/content?key=hero-position", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => {
        if (d.data) { setPos(d.data); return; }
        // KV empty — check localStorage
        const ls = localStorage.getItem(LS_KEY);
        if (ls) setPos(JSON.parse(ls));
      })
      .catch(() => {
        const ls = localStorage.getItem(LS_KEY);
        if (ls) setPos(JSON.parse(ls));
      });
  }, [token]);

  const handleChange = (f: keyof HeroPos, v: number) => setPos(p => ({ ...p, [f]: v }));

  const save = async () => {
    setStatus("saving");
    // Always save to localStorage first — this ALWAYS works
    localStorage.setItem(LS_KEY, JSON.stringify(pos));
    // Then try the API (KV) — optional, best-effort
    try {
      const r = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key: "hero-position", data: pos }),
      });
      setStatus(r.ok ? "saved" : "savedLocal");
    } catch {
      setStatus("savedLocal");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <div style={{ padding: 40, maxWidth: 680 }}>
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#f8f8f0", marginBottom: 6 }}>Hero Background</div>
        <div style={{ fontSize: 13, color: "rgba(248,248,240,0.4)", lineHeight: 1.7 }}>
          Set the background photo and control its position.<br />
          <strong style={{ color: "rgba(248,248,240,0.65)" }}>Lower X% → subject moves right. Higher X% → subject moves left.</strong>
        </div>
      </div>

      {/* Background Image */}
      <div style={{ ...card, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f8f8f0", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          🖼️ Background Image URL
        </div>
        <div style={{ fontSize: 12, color: "rgba(248,248,240,0.4)", marginBottom: 12 }}>
          Paste a direct image URL (Google Drive, Imgur, etc.). Leave empty to use the default aurora photo.
        </div>
        <input
          style={inp}
          placeholder="https://lh3.googleusercontent.com/d/..."
          value={pos.imageUrl}
          onChange={e => setPos(p => ({ ...p, imageUrl: e.target.value }))}
        />
        {pos.imageUrl && (
          <div style={{ marginTop: 12, borderRadius: 8, overflow: "hidden", height: 140, border: "1px solid rgba(255,255,255,0.08)" }}>
            <img src={pos.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.opacity = "0.2"; }} />
          </div>
        )}
      </div>

      <div style={{ ...card, marginBottom: 32, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 20 }}>💡</span>
        <span style={{ fontSize: 12, color: "rgba(248,248,240,0.5)" }}>After saving, refresh the homepage to see the change live.</span>
      </div>

      {/* Desktop */}
      <div style={{ ...card, marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f8f8f0", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          🖥️ Desktop Position
          <span style={{ fontSize: 10, color: "rgba(248,248,240,0.35)", fontWeight: 400 }}>(wider than 1024px)</span>
        </div>
        <PosSlider lbl="Horizontal (X)" field="desktopX" value={pos.desktopX} onChange={handleChange} />
        <PosSlider lbl="Vertical (Y)"   field="desktopY" value={pos.desktopY} onChange={handleChange} />
      </div>

      {/* Mobile */}
      <div style={{ ...card, marginBottom: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#f8f8f0", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          📱 Mobile Position
          <span style={{ fontSize: 10, color: "rgba(248,248,240,0.35)", fontWeight: 400 }}>(narrower than 1024px)</span>
        </div>
        <PosSlider lbl="Horizontal (X)" field="mobileX" value={pos.mobileX} onChange={handleChange} />
        <PosSlider lbl="Vertical (Y)"   field="mobileY" value={pos.mobileY} onChange={handleChange} />
      </div>

      <button onClick={save} disabled={status === "saving"} style={{ ...btnP, padding: "14px 48px", fontSize: 13 }}>
        {status === "saving"    ? "Saving…"
        : status === "saved"    ? "✓ Saved!"
        : status === "savedLocal" ? "✓ Saved locally — refresh homepage"
        : "Save Position →"}
      </button>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("messages");
  useEffect(() => { const t = sessionStorage.getItem("ranzo_admin"); if (t) setToken(t); }, []);
  const login = (t: string) => { sessionStorage.setItem("ranzo_admin", t); setToken(t); };
  const logout = () => { sessionStorage.removeItem("ranzo_admin"); setToken(null); };
  if (!token) return <Login onLogin={login} />;
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#060608", color: "#f8f8f0", fontFamily: "var(--font-ui)" }}>
      <Sidebar tab={tab} setTab={setTab} onLogout={logout} />
      <main style={{ flex: 1, overflowY: "auto" }}>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
            {tab === "messages"  && <Messages   token={token} />}
            {tab === "countries" && <Countries  token={token} />}
            {tab === "stories"   && <StoriesTab token={token} />}
            {tab === "apps"      && <AppsTab    token={token} />}
            {tab === "settings"  && <Settings   token={token} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
