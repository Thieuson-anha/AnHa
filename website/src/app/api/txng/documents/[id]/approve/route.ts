import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/txng/auth";
import { approveDocument, TxngError } from "@/lib/txng/service";
import { cookies } from "next/headers";

// POST /api/txng/documents/[id]/approve — An Hà duyệt tài liệu
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Lấy email admin từ cookie session (fallback về "admin@anha.vn")
  const adminEmail = req.cookies.get("anha_admin_email")?.value ?? "admin@anha.vn";

  try {
    const doc = await approveDocument(params.id, adminEmail);
    return NextResponse.json({ id: doc.id, status: doc.status, approvedAt: doc.approvedAt });
  } catch (err) {
    if (err instanceof TxngError) {
      const statusCode = err.code === "NOT_FOUND" ? 404 : 409;
      return NextResponse.json({ error: err.message, code: err.code }, { status: statusCode });
    }
    throw err;
  }
}
