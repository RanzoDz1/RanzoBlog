/**
 * Cloudinary delivery helper.
 *
 * The hero image is picked in the admin panel, so its URL is whatever the owner
 * pasted — typically a raw `res.cloudinary.com/<cloud>/image/upload/v123/x.jpg`
 * with no transformation segment. That delivers the full-size original as plain
 * JPEG: no AVIF/WebP negotiation, no automatic quality.
 *
 * This injects a transformation segment so Cloudinary does the work at the CDN
 * instead of the browser. Non-Cloudinary URLs pass through untouched, and a URL
 * that already carries transformations is left alone so the owner can override.
 */

const UPLOAD_MARKER = "/image/upload/";

/** Matches a leading Cloudinary transformation segment, e.g. "f_auto,q_auto/" or "w_800/". */
const HAS_TRANSFORM = /^[a-z]{1,3}_[^/]*\//i;

export interface CloudinaryOpts {
  /** Cap the delivered width (never upscales). */
  width?: number;
  /** Saturation adjustment, -100..100. 25 ≈ CSS `saturate(1.25)`. */
  saturation?: number;
}

export function optimizeImage(url: string, opts: CloudinaryOpts = {}): string {
  if (!url || !url.includes("res.cloudinary.com")) return url;

  const at = url.indexOf(UPLOAD_MARKER);
  if (at === -1) return url;

  const head = url.slice(0, at + UPLOAD_MARKER.length);
  const tail = url.slice(at + UPLOAD_MARKER.length);
  if (HAS_TRANSFORM.test(tail)) return url;

  const t = ["f_auto", "q_auto"];
  if (opts.width) t.push(`w_${opts.width}`, "c_limit");
  // Baked at the CDN so the browser never has to run a saturate() filter, which
  // would force a re-rasterised render surface on every parallax scale step.
  if (opts.saturation) t.push(`e_saturation:${opts.saturation}`);

  return `${head}${t.join(",")}/${tail}`;
}

/**
 * CSS `brightness(x)` multiplies each sRGB channel by x, which is exactly what
 * compositing black at `1 - x` alpha does. So a darkening filter can be replaced
 * by a flat overlay painted in the SAME background layer — no filter, no extra
 * render surface, no re-raster while the layer animates.
 */
export function darkenLayer(alpha: number): string {
  return `linear-gradient(rgba(0,0,0,${alpha}), rgba(0,0,0,${alpha}))`;
}
