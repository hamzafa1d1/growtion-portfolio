import { NextRequest, NextResponse } from "next/server";
import { del, list } from "@vercel/blob";
import { requireAuth } from "@/lib/auth";
import { categoryForPathname } from "@/lib/assets";

export async function DELETE(request: NextRequest) {
  const isAuth = await requireAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
  }

  const { key } = (await request.json()) as { key: string };
  if (!key || !categoryForPathname(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  // Delete the single blob whose pathname matches exactly. Pathnames are unique
  // per upload, so this removes only the intended item.
  const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });
  const match = blobs.find((b) => b.pathname === key);

  if (!match) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  await del(match.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
  return NextResponse.json({ ok: true });
}
