import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/txng/auth";
import { getDocument, TxngError } from "@/lib/txng/service";

// GET /api/txng/documents/[id] — chi tiết tài liệu (chỉ admin)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const doc = await getDocument(params.id);
    return NextResponse.json(doc);
  } catch (err) {
    if (err instanceof TxngError && err.code === "NOT_FOUND") {
      return NextResponse.json({ error: err.message }, { status: 404 });
    }
    throw err;
  }
}
