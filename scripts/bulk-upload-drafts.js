/**
 * Bulk-upload the best photos (per country) from scan-report.json
 * to Cloudinary as DRAFTS, then append them to the 'countries' KV
 * with `published: false` so they're hidden until you click Publish.
 *
 * Usage:
 *   node scripts/bulk-upload-drafts.js [--dry]
 *   node scripts/bulk-upload-drafts.js --country=Zimbabwe
 */
const fs = require("fs");
const path = require("path");
// Load .env
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const { v2: cloudinary } = require("cloudinary");
const { PrismaClient } = require("@prisma/client");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ISO_TO_NAME = {
  ZW: "Zimbabwe", TZ: "Tanzania", ZM: "Zambia",
  DE: "Germany",  FR: "France",
  // add more as Option B expands
};
// How many per country we upload as drafts
const TARGETS = {
  ZW: 15, TZ: 15, ZM: 12, DE: 10, FR: 8,
};

const DRY = process.argv.includes("--dry");
const CO_FLAG = (process.argv.find(a => a.startsWith("--country=")) || "").split("=")[1];

function pickBest(records, n) {
  // Quality heuristic: prefer larger file size (better camera/resolution),
  // then spread across different dates (don't pick 5 identical shots).
  const sorted = [...records].sort((a, b) => b.size - a.size);
  // Group by day and take at most 3 per day to ensure variety
  const byDay = new Map();
  const picked = [];
  for (const r of sorted) {
    const day = (r.dt || "").slice(0, 10) || "unknown";
    const count = byDay.get(day) || 0;
    if (count >= 3) continue;
    picked.push(r);
    byDay.set(day, count + 1);
    if (picked.length >= n) break;
  }
  // If we still need more, fall back to top-by-size without the cap
  if (picked.length < n) {
    for (const r of sorted) {
      if (picked.length >= n) break;
      if (!picked.includes(r)) picked.push(r);
    }
  }
  return picked;
}

(async () => {
  const prisma = new PrismaClient();

  // 1. Load scan report
  const report = JSON.parse(fs.readFileSync(path.join(__dirname, "scan-report.json"), "utf8"));

  // 2. Fetch current countries KV
  const row = await prisma.settings.findUnique({ where: { key: "countries" } });
  if (!row) { console.error("No 'countries' row in DB — open the admin once to seed it first."); process.exit(1); }
  let continents = JSON.parse(row.value);

  // Index existing country photo counts
  const existing = new Map();
  for (const cont of continents)
    for (const co of cont.countries)
      existing.set(co.name, (co.photos || []).length);

  // 3. Plan uploads
  const byCc = {};
  for (const r of report.records) (byCc[r.cc] = byCc[r.cc] || []).push(r);

  const plan = [];
  for (const [cc, records] of Object.entries(byCc)) {
    const name = ISO_TO_NAME[cc];
    if (!name) { console.log(`Skip ${cc}: not in target list`); continue; }
    if (CO_FLAG && CO_FLAG !== name) continue;
    const picks = pickBest(records, TARGETS[cc] || 10);
    plan.push({ cc, name, picks });
    console.log(`${cc} ${name}: ${picks.length} to upload (existing: ${existing.get(name) || 0})`);
  }

  if (DRY) { console.log("\n[DRY RUN] No uploads performed."); await prisma.$disconnect(); return; }

  // 4. Upload each pick to Cloudinary, then append to KV with published:false
  let uploaded = 0, failed = 0;
  for (const { cc, name, picks } of plan) {
    for (const r of picks) {
      const basename = path.basename(r.path).replace(/\.[^.]+$/, "");
      const publicId = `${basename}-${Math.random().toString(36).slice(2, 8)}`;
      try {
        const result = await cloudinary.uploader.upload(r.path, {
          folder: `ranzodz/countries/${name}`,
          public_id: publicId,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto", width: 2400, crop: "limit" }],
        });
        // Append to KV
        continents = continents.map(cont => ({
          ...cont,
          countries: cont.countries.map(co => {
            if (co.name !== name) return co;
            const photos = co.photos || [];
            return { ...co, photos: [...photos, {
              src: result.secure_url,
              caption: `${r.city || ""}${r.admin1 ? ", " + r.admin1 : ""}`.trim() || name,
              x: 50, y: 50, zoom: 1,
              published: false,
            }]};
          }),
        }));
        uploaded++;
        console.log(`  ✓ [${uploaded}] ${name}: ${path.basename(r.path)} -> ${result.secure_url.split("/").pop()}`);
      } catch (e) {
        failed++;
        console.error(`  ✗ ${name}: ${path.basename(r.path)} — ${e.message}`);
      }
    }
    // Persist after each country so a crash doesn't lose everything
    await prisma.settings.update({ where: { key: "countries" }, data: { value: JSON.stringify(continents) } });
    console.log(`  [saved] ${name} batch persisted`);
  }

  console.log(`\nDone. Uploaded ${uploaded}, failed ${failed}.`);
  await prisma.$disconnect();
})().catch(e => { console.error(e); process.exit(1); });
