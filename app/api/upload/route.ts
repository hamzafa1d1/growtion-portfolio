import { NextRequest, NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Must match lib/auth.ts SESSION_TOKEN
const SESSION_TOKEN = "gw-sess-f3a9b2c1d7e4f6a0b8c2d5e1f9a3b7c4";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,

      // Called when the client asks for an upload token (step 1)
      onBeforeGenerateToken: async () => {
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

        return {
          // No content-type allowlist: any video format (or image) can be
          // uploaded to any section. Only the authenticated admin reaches here,
          // and a strict MIME list would otherwise reject valid but unusual
          // video containers/codecs.
          maximumSizeInBytes: 500 * 1024 * 1024, // 500 MB
          // Each upload is a distinct item; unique pathname + random suffix so
          // uploads never collide or overwrite. Removal is via explicit delete.
          addRandomSuffix: true,
        };
      },

      // Direct-to-Blob upload has no server-side post-processing.
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
