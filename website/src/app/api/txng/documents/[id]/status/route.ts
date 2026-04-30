import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET /api/txng/documents/[id]/status
// Public endpoint — công ty có thể tra cứu trạng thái tài liệu của mình.
// Trả về thông tin tối thiểu, không lộ nội dung hoặc chữ ký.
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const doc = await db.txngDocument.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      documentCode: true,
      status: true,
      rejectionReason: true,
      approvedAt: true,
      signedAt: true,
      ministryRef: true,
      ministrySubmittedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!doc) {
    return NextResponse.json({ error: "Không tìm thấy tài liệu" }, { status: 404 });
  }

  return NextResponse.json(doc);
}
