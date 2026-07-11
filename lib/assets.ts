import { list } from "@vercel/blob";

export type AssetCategory =
  | "portfolio-video"
  | "portfolio-ugc"
  | "portfolio-landing"
  | "testimonials-review"
  | "results-screenshot"
  | "filming-video";

export const ASSET_CATEGORIES: AssetCategory[] = [
  "portfolio-video",
  "portfolio-ugc",
  "portfolio-landing",
  "testimonials-review",
  "results-screenshot",
  "filming-video",
];

/** A single uploaded asset within a category. */
export interface AssetItem {
  url: string;
  pathname: string;
  uploadedAt: string; // ISO string
}

/**
 * Each category holds an arbitrary number of assets (no fixed slot count) —
 * uploading more simply appends more, and every uploaded item is displayed.
 */
export type AssetMap = Record<AssetCategory, AssetItem[]>;

function emptyMap(): AssetMap {
  return {
    "portfolio-video": [],
    "portfolio-ugc": [],
    "portfolio-landing": [],
    "testimonials-review": [],
    "results-screenshot": [],
    "filming-video": [],
  };
}

/**
 * Returns the category a blob pathname belongs to (matched by the
 * "<category>-" prefix), or null. No category name is a prefix of another, so
 * the first match is unambiguous. Tolerates the legacy "<category>-<index>..."
 * naming and the current "<category>-<uid>..." naming alike.
 */
export function categoryForPathname(pathname: string): AssetCategory | null {
  for (const category of ASSET_CATEGORIES) {
    if (pathname.startsWith(category + "-")) return category;
  }
  return null;
}

/**
 * Fetches all uploaded assets from Vercel Blob, grouped by category and ordered
 * by upload time (oldest first, so newly added items appear last / stable).
 * Falls back to empty when BLOB_READ_WRITE_TOKEN is not set (local dev).
 */
export async function getAssets(): Promise<AssetMap> {
  const result = emptyMap();

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return result;
  }

  try {
    const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });

    for (const blob of blobs) {
      const category = categoryForPathname(blob.pathname);
      if (!category) continue;
      result[category].push({
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt: new Date(blob.uploadedAt).toISOString(),
      });
    }

    for (const category of ASSET_CATEGORIES) {
      result[category].sort((a, b) => a.uploadedAt.localeCompare(b.uploadedAt));
    }

    return result;
  } catch {
    return result;
  }
}
