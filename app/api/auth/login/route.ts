import { NextRequest, NextResponse } from "next/server";
import { ADMIN_USERNAME, ADMIN_PASSWORD, createSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body as { username: string; password: string };

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("gw_session", createSessionCookie(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
