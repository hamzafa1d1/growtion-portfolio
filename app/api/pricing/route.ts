import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireAuth } from "@/lib/auth";
import { getPricing, normalizePricing, PRICING_PATHNAME } from "@/lib/pricing";

export const revalidate = 60;

export async function GET() {
  const pricing = await getPricing();
  return NextResponse.json(pricing, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" },
  });
}

export async function PUT(request: NextRequest) {
  const isAuth = await requireAuth();
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const config = normalizePricing(body);

  await put(PRICING_PATHNAME, JSON.stringify(config), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true, // fixed pathname — overwrite the existing config
    addRandomSuffix: false,
    cacheControlMaxAge: 0, // don't let the CDN pin a stale config
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ ok: true, config });
}
