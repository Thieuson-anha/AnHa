import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("anha_admin");
  return NextResponse.json({ ok: true });
}
