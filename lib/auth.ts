import { cookies } from "next/headers";

// Hardcoded credentials — change these if needed
export const ADMIN_USERNAME = "growtion";
export const ADMIN_PASSWORD = "Growtion2025!";

// A fixed session token — acts as the "session ID"
const SESSION_TOKEN = "gw-sess-f3a9b2c1d7e4f6a0b8c2d5e1f9a3b7c4";

export function createSessionCookie() {
  return SESSION_TOKEN;
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("gw_session")?.value;
  return token === SESSION_TOKEN;
}

export async function requireAuth(): Promise<boolean> {
  return getSession();
}
