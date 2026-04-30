import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdminAuth } from "@/lib/txng/auth";
import { rejectDocument, TxngError } from "@/lib/txng/service";
import { RejectDocumentSchema } from "@/lib/txng/validation";

// POST /api/txng/documents/[id]/reject — An Hà từ chối tài liệu
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!requireAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const adminEmail = req.cookies.get("anha_admin_email")?.value ?? "admin@anha.vn";

  try {
    const { reason } = RejectDocumentSchema.parse(body);
    const doc = await rejectDocument(params.id, adminEmail, reason);
    return NextResponse.json({ id: doc.id, status: doc.status, rejectionReason: doc.rejectionReason });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 422 });
    }
    if (err instanceof TxngError) {
      const statusCode = err.code === "NOT_FOUND" ? 404 : 409;
      return NextResponse.json({ error: err.message, code: err.code }, { status: statusCode });
    }
    throw err;
  }
}
