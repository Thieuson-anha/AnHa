import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/txng/auth";
import { submitToMinistry, TxngError } from "@/lib/txng/service";

// POST /api/txng/documents/[id]/submit — nộp tài liệu đã ký lên hệ thống bộ
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmail = req.cookies.get("anha_admin_email")?.value ?? "admin@anha.vn";

  try {
    const result = await submitToMinistry(params.id, adminEmail);
    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  } catch (err) {
    if (err instanceof TxngError) {
      const statusCode = err.code === "NOT_FOUND" ? 404 : 409;
      return NextResponse.json({ error: err.message, code: err.code }, { status: statusCode });
    }
    throw err;
  }
}
