import { NextRequest, NextResponse } from "next/server";
import { del, list } from "@vercel/blob";
import { requireAuth } from "@/lib/auth";
import { parseAssetPathname } from "@/lib/assets";

export async function DELETE(request: NextRequest) {
  const isAuth = await requireAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
  }

  const { key } = await request.json() as { key: string };
  if (!key) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  // Resolve the slot (category + index) the caller wants to clear. Matching on
  // the parsed slot — not a raw string prefix — avoids "slot 1" also matching
  // "slot 10" and deletes every blob for that slot regardless of extension.
  const target = parseAssetPathname(key);
  if (!target) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });
  const matches = blobs.filter((b) => {
    const parsed = parseAssetPathname(b.pathname);
    return parsed?.category === target.category && parsed.index === target.index;
  });

  if (matches.length === 0) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  await del(matches.map((b) => b.url), { token: process.env.BLOB_READ_WRITE_TOKEN });
  return NextResponse.json({ ok: true });
}
