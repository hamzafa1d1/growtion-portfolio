import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import type { AssetCategory } from "@/lib/assets";

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
          // Each upload is a distinct item in the category's collection. The
          // client provides a unique pathname ("<category>-<uid>.<ext>") and we
          // still add a random suffix, so uploads never collide and the CDN
          // never serves a stale file. Nothing is cleaned up on upload —
          // items are only removed via explicit delete.
          addRandomSuffix: true,
        };
      },

      // Direct-to-Blob upload has no server-side post-processing anymore.
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
