import { NextRequest, NextResponse } from "next/server";
import { put, del, list } from "@vercel/blob";
import { requireAuth } from "@/lib/auth";
import { assetKey, AssetCategory } from "@/lib/assets";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4"];
const MAX_SIZE = 20 * 1024 * 1024; // 20 MB

export async function POST(request: NextRequest) {
  const isAuth = await requireAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Storage not configured (BLOB_READ_WRITE_TOKEN missing)" }, { status: 500 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const category = formData.get("category") as AssetCategory | null;
  const indexStr = formData.get("index") as string | null;

  if (!file || !category || !indexStr) {
    return NextResponse.json({ error: "Missing file, category or index" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "File type not allowed. Use JPG, PNG, WebP, GIF, or MP4." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large. Max 20 MB." }, { status: 400 });
  }

  const index = parseInt(indexStr, 10);
  const ext = file.name.split(".").pop() ?? "jpg";
  const key = assetKey(category, index, ext);

  // Delete any existing blob for this slot (any extension) before uploading
  const token = process.env.BLOB_READ_WRITE_TOKEN!;
  const { blobs: existing } = await list({ token });
  const toDelete = existing.filter((b) => {
    if (!b.pathname.startsWith(category + "-")) return false;
    const rest = b.pathname.replace(category + "-", "");
    const num = parseInt(rest.split(".")[0], 10);
    return num === index;
  });
  if (toDelete.length > 0) {
    await del(toDelete.map((b) => b.url), { token });
  }

  const blob = await put(key, file, {
    access: "public",
    token,
  });

  return NextResponse.json({ url: blob.url, key });
}
