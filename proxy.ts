import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TOKEN = "gw-sess-f3a9b2c1d7e4f6a0b8c2d5e1f9a3b7c4";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/dashboard and its sub-routes
  if (pathname.startsWith("/admin/dashboard")) {
    const token = request.cookies.get("gw_session")?.value;
    if (token !== SESSION_TOKEN) {
      const loginUrl = new URL("/admin", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
