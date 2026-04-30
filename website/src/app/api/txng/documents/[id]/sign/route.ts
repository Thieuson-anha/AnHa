import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/txng/auth";
import { signDocument, TxngError } from "@/lib/txng/service";

// POST /api/txng/documents/[id]/sign — An Hà ký số tài liệu (sau khi đã duyệt)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const adminEmail = req.cookies.get("anha_admin_email")?.value ?? "admin@anha.vn";

  try {
    const doc = await signDocument(params.id, adminEmail);
    return NextResponse.json({
      id: doc.id,
      status: doc.status,
      anhaCertSerial: doc.anhaCertSerial,
      signedAt: doc.signedAt,
    });
  } catch (err) {
    if (err instanceof TxngError) {
      const statusCode = err.code === "NOT_FOUND" ? 404 : 409;
      return NextResponse.json({ error: err.message, code: err.code }, { status: statusCode });
    }
    throw err;
  }
}
