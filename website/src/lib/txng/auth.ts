import { NextRequest } from "next/server";

const ADMIN_COOKIE = "anha_admin";

export function requireAdminAuth(req: NextRequest): boolean {
  const session = req.cookies.get(ADMIN_COOKIE)?.value;
  const expected = process.env.ADMIN_SESSION_TOKEN;
  return !!(session && expected && session === expected);
}
