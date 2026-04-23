"""
Scan a folder of JPGs, extract GPS EXIF, reverse-geocode to country,
and write a JSON report. Does NOT upload anything.

Usage:
  python scripts/scan-photos.py "D:\\Images\\Camera & Video ALL" scripts/scan-report.json
"""
import os, sys, json, time
from pathlib import Path
from PIL import Image, ExifTags
import reverse_geocoder as rg

ROOT = sys.argv[1] if len(sys.argv) > 1 else r"D:\Images\Camera & Video ALL"
OUT  = sys.argv[2] if len(sys.argv) > 2 else r"scripts/scan-report.json"

GPS_IFD = 34853  # EXIF GPSInfo tag

def to_deg(val):
    """Convert EXIF rational to decimal degrees."""
    try:
        d, m, s = val
        return float(d) + float(m)/60.0 + float(s)/3600.0
    except Exception:
        return None

def extract_gps(path):
    try:
        with Image.open(path) as img:
            exif = img.getexif()
            if not exif:
                return None
            gps = exif.get_ifd(GPS_IFD)
            if not gps:
                return None
            lat = to_deg(gps.get(2))
            lon = to_deg(gps.get(4))
            if lat is None or lon is None:
                return None
            if gps.get(1) == 'S': lat = -lat
            if gps.get(3) == 'W': lon = -lon
            # Also capture datetime for sorting
            dt = exif.get(36867) or exif.get(306)
            return {"lat": lat, "lon": lon, "dt": dt}
    except Exception:
        return None

def main():
    root = Path(ROOT)
    jpgs = []
    print("Enumerating JPGs...")
    for p in root.rglob("*"):
        if p.is_file() and p.suffix.lower() in (".jpg", ".jpeg"):
            jpgs.append(p)
    print(f"Found {len(jpgs)} JPG files")

    records = []
    t0 = time.time()
    with_gps = 0
    for i, p in enumerate(jpgs):
        if i % 200 == 0:
            print(f"  [{i}/{len(jpgs)}] with_gps={with_gps} elapsed={time.time()-t0:.1f}s", flush=True)
        g = extract_gps(p)
        if g:
            with_gps += 1
            records.append({
                "path": str(p),
                "size": p.stat().st_size,
                "lat": g["lat"],
                "lon": g["lon"],
                "dt":  g["dt"],
            })

    print(f"Extracted GPS from {with_gps}/{len(jpgs)} JPGs")
    print("Reverse geocoding...")
    coords = [(r["lat"], r["lon"]) for r in records]
    if coords:
        results = rg.search(coords)
        for r, hit in zip(records, results):
            r["cc"]   = hit.get("cc")
            r["city"] = hit.get("name")
            r["admin1"] = hit.get("admin1")

    # Summary by country
    by_cc = {}
    for r in records:
        cc = r.get("cc") or "??"
        by_cc.setdefault(cc, []).append(r)

    summary = {
        "root": str(root),
        "total_jpgs": len(jpgs),
        "with_gps": with_gps,
        "countries": {cc: len(v) for cc, v in sorted(by_cc.items(), key=lambda x: -len(x[1]))},
        "records": records,
    }

    Path(OUT).parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=1)
    print(f"Wrote {OUT}")
    print("\nBy country:")
    for cc, n in sorted(summary["countries"].items(), key=lambda x: -x[1]):
        print(f"  {cc}: {n}")

if __name__ == "__main__":
    main()
