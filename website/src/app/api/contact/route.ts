import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { prisma } from "@/lib/db";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = contactSchema.parse(body);

    await prisma.contact.create({ data });

    return NextResponse.json(
      { success: true, message: "Chúng tôi sẽ liên hệ trong 24h." },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      for (const issue of err.issues) {
        const field = issue.path[0] as string;
        if (field) errors[field] = issue.message;
      }
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    console.error("[api/contact]", err);
    return NextResponse.json(
      { success: false, message: "Lỗi máy chủ, vui lòng thử lại." },
      { status: 500 }
    );
  }
}
