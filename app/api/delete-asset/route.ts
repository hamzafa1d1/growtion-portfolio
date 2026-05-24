import { NextRequest, NextResponse } from "next/server";
import { del, list } from "@vercel/blob";
import { requireAuth } from "@/lib/auth";

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

  // Find the blob by pathname prefix (key without extension might differ)
  const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN });
  const keyBase = key.replace(/\.[^.]+$/, ""); // strip extension
  const match = blobs.find((b) => b.pathname.startsWith(keyBase));

  if (!match) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 });
  }

  await del(match.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
  return NextResponse.json({ ok: true });
}
