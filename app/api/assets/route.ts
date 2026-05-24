import { NextResponse } from "next/server";
import { getAssets } from "@/lib/assets";

export const revalidate = 60; // cache for 60 seconds

export async function GET() {
  const assets = await getAssets();
  return NextResponse.json(assets, {
    headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" },
  });
}
