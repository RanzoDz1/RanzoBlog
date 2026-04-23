// Direct Prisma fetch of the 'countries' KV entry so we know which
// countries already have photos (to skip on bulk import).
const fs = require("fs");
const path = require("path");
// Load .env manually
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const { PrismaClient } = require("@prisma/client");

(async () => {
  const prisma = new PrismaClient();
  const row = await prisma.settings.findUnique({ where: { key: "countries" } });
  if (!row) {
    console.log("No 'countries' row — site uses code defaults. No countries have photos yet.");
    fs.writeFileSync("scripts/current-countries.json", JSON.stringify({ data: null }, null, 1));
    process.exit(0);
  }
  const data = JSON.parse(row.value);
  fs.writeFileSync("scripts/current-countries.json", JSON.stringify({ data }, null, 1));
  let total = 0;
  const summary = [];
  for (const cont of data) {
    for (const co of cont.countries || []) {
      const n = (co.photos || []).length;
      if (n > 0) {
        total += n;
        summary.push(`  ${co.flag || ""} ${co.name}: ${n}`);
      }
    }
  }
  console.log(`Countries with photos (existing): ${summary.length}`);
  console.log(summary.join("\n"));
  console.log(`Total photos: ${total}`);
  await prisma.$disconnect();
})().catch(e => { console.error(e); process.exit(1); });
