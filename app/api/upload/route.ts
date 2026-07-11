import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { del, list } from "@vercel/blob";
import { parseAssetPathname, type AssetCategory } from "@/lib/assets";

// Must match lib/auth.ts SESSION_TOKEN
const SESSION_TOKEN = "gw-sess-f3a9b2c1d7e4f6a0b8c2d5e1f9a3b7c4";
const VIDEO_CATEGORIES: AssetCategory[] = ["portfolio-video", "portfolio-ugc", "filming-video"];

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,

      // Called when the client asks for an upload token (step 1)
      onBeforeGenerateToken: async (_pathname, clientPayload) => {
        // Auth: read session cookie from the incoming request
        const cookieHeader = request.headers.get("cookie") ?? "";
        const sessionCookie = cookieHeader
          .split(";")
          .find((c) => c.trim().startsWith("gw_session="))
          ?.split("=")[1]
          ?.trim();
        if (sessionCookie !== SESSION_TOKEN) {
          throw new Error("Unauthorized");
        }

        const { category } = JSON.parse(clientPayload ?? "{}") as { category: AssetCategory };
        const isVideo = VIDEO_CATEGORIES.includes(category);

        return {
          allowedContentTypes: isVideo
            ? ["video/mp4", "video/webm", "video/quicktime"]
            : ["image/jpeg", "image/png", "image/webp", "image/gif"],
          maximumSizeInBytes: 200 * 1024 * 1024, // 200 MB — no serverless bottleneck
          // Each upload gets a unique pathname (e.g. "portfolio-video-1-x7f2.jpg").
          // This fixes two bugs at once:
          //  1) Replacing a slot with the SAME extension no longer throws
          //     "This blob already exists" (deterministic names collided).
          //  2) The replacement gets a brand-new URL, so the CDN never serves
          //     the stale previous file (blobs are cached ~1 month by default).
          // The slot index is still recoverable from the pathname (see
          // parseAssetPathname), and the old file for the slot is deleted below.
          addRandomSuffix: true,
          tokenPayload: clientPayload ?? "",
        };
      },

      // Called after the browser finishes uploading directly to Blob (step 3)
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) return;

        const { category, index } = JSON.parse(tokenPayload ?? "{}") as {
          category: AssetCategory;
          index: string;
        };
        const indexNum = parseInt(index, 10);

        // Clean up any old blobs for this slot (same index, possibly different
        // extension), so a slot never ends up with two files.
        const { blobs } = await list({ token });
        const toDelete = blobs.filter((b) => {
          if (b.url === blob.url) return false; // keep the new one
          const parsed = parseAssetPathname(b.pathname);
          return parsed?.category === category && parsed.index === indexNum;
        });
        if (toDelete.length > 0) {
          await del(toDelete.map((b) => b.url), { token });
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
