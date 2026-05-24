import { list } from "@vercel/blob";

export type AssetCategory = "portfolio-video" | "portfolio-ugc" | "portfolio-landing" | "testimonials-review" | "results-screenshot";

export interface AssetMap {
  "portfolio-video": (string | null)[];    // 4 slots
  "portfolio-ugc": (string | null)[];      // 4 slots
  "portfolio-landing": (string | null)[];  // 6 slots
  "testimonials-review": (string | null)[]; // 5 slots
  "results-screenshot": (string | null)[];  // 6 slots
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
  };

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return empty;
  }

  try {
    const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });

    const result = { ...empty };

    for (const blob of blobs) {
      const name = blob.pathname; // e.g. "portfolio-video-1.jpg"
      for (const category of Object.keys(result) as AssetCategory[]) {
        if (name.startsWith(category + "-")) {
          // Extract index: "portfolio-video-2.jpg" → "2" → index 1
          const rest = name.replace(category + "-", ""); // "2.jpg"
          const numStr = rest.split(".")[0];
          const idx = parseInt(numStr, 10) - 1;
          const slots = result[category];
          if (!isNaN(idx) && idx >= 0 && idx < slots.length) {
            slots[idx] = blob.url;
          }
        }
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
