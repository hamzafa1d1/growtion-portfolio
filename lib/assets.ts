import { list } from "@vercel/blob";

export type AssetCategory = "portfolio-video" | "portfolio-ugc" | "portfolio-landing" | "testimonials-review" | "results-screenshot" | "filming-video";

export interface AssetMap {
  "portfolio-video": (string | null)[];    // 4 slots
  "portfolio-ugc": (string | null)[];      // 4 slots
  "portfolio-landing": (string | null)[];  // 6 slots
  "testimonials-review": (string | null)[]; // 5 slots
  "results-screenshot": (string | null)[];  // 6 slots
  "filming-video": (string | null)[];      // 6 slots
}

/** Number of slots per category — single source of truth. */
export const CATEGORY_SLOTS: Record<AssetCategory, number> = {
  "portfolio-video": 4,
  "portfolio-ugc": 4,
  "portfolio-landing": 6,
  "testimonials-review": 5,
  "results-screenshot": 6,
  "filming-video": 6,
};

export const ASSET_CATEGORIES = Object.keys(CATEGORY_SLOTS) as AssetCategory[];

/**
 * Parses a blob pathname like "portfolio-video-2.mp4" into its category and
 * 1-based slot index. Tolerates a random suffix ("portfolio-video-2-abc.mp4")
 * in case any legacy blobs were stored that way. Returns null if it does not
 * match a known category or has no valid index.
 */
export function parseAssetPathname(
  pathname: string
): { category: AssetCategory; index: number } | null {
  for (const category of ASSET_CATEGORIES) {
    const prefix = category + "-";
    if (!pathname.startsWith(prefix)) continue;
    const rest = pathname.slice(prefix.length); // e.g. "2.mp4" or "2-abc.mp4"
    const numStr = rest.split(".")[0].split("-")[0]; // "2"
    const index = parseInt(numStr, 10);
    if (Number.isNaN(index) || index < 1) return null;
    return { category, index };
  }
  return null;
}

/**
 * Fetches all uploaded asset URLs from Vercel Blob.
 * Falls back gracefully if BLOB_READ_WRITE_TOKEN is not set (local dev).
 */
export async function getAssets(): Promise<AssetMap> {
  const empty: AssetMap = {
    "portfolio-video": [null, null, null, null],
    "portfolio-ugc": [null, null, null, null],
    "portfolio-landing": [null, null, null, null, null, null],
    "testimonials-review": [null, null, null, null, null],
    "results-screenshot": [null, null, null, null, null, null],
    "filming-video": [null, null, null, null, null, null],
  };

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return empty;
  }

  try {
    const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });

    const result = { ...empty };

    // If multiple blobs map to the same slot (e.g. an old .jpg lingering next to
    // a new .png), the most recently uploaded one wins.
    const sorted = [...blobs].sort(
      (a, b) => new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
    );

    for (const blob of sorted) {
      const parsed = parseAssetPathname(blob.pathname);
      if (!parsed) continue;
      const slots = result[parsed.category];
      const idx = parsed.index - 1; // 1-based → 0-based
      if (idx >= 0 && idx < slots.length) {
        slots[idx] = blob.url;
      }
    }

    return result;
  } catch {
    return empty;
  }
}

/** Builds the blob pathname for a given category + 1-based index */
export function assetKey(category: AssetCategory, index: number, ext: string): string {
  return `${category}-${index}.${ext}`;
}
