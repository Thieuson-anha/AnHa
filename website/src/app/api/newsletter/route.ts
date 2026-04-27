import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validation";
import { prisma } from "@/lib/db";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = newsletterSchema.parse(body);

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email đã đăng ký." },
        { status: 409 }
      );
    }

    await prisma.subscriber.create({ data: { email } });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: { email: err.issues[0]?.message } },
        { status: 400 }
      );
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
