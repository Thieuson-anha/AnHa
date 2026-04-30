import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { requireAdminAuth } from "@/lib/txng/auth";
import { listDocuments, submitDocument, TxngError } from "@/lib/txng/service";
import { SubmitDocumentSchema } from "@/lib/txng/validation";
import type { TxngDocumentStatus } from "@/lib/txng/types";

// GET /api/txng/documents — danh sách tài liệu (chỉ admin)
export async function GET(req: NextRequest) {
  if (!requireAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status") as TxngDocumentStatus | null;
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "20", 10);

  const data = await listDocuments({ status: status ?? undefined, page, limit });
  return NextResponse.json(data);
}

// POST /api/txng/documents — công ty nộp tài liệu đã ký
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const input = SubmitDocumentSchema.parse(body);
    const doc = await submitDocument(input);
    return NextResponse.json(
      { id: doc.id, documentCode: doc.documentCode, status: doc.status },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: "Validation failed", details: err.errors }, { status: 422 });
    }
    if (err instanceof TxngError) {
      const statusCode = err.code === "DUPLICATE_CODE" ? 409 : 400;
      return NextResponse.json({ error: err.message, code: err.code }, { status: statusCode });
    }
    throw err;
  }
}
