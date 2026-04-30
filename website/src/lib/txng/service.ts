import { db } from "@/lib/db";
import type { MinistrySubmitResponse, TxngDocumentStatus } from "./types";
import {
  hashContent,
  verifyCompanySignature,
  signAsAnha,
  buildSignedPayload,
} from "./signing";

// ─── 1. Công ty nộp tài liệu đã ký ─────────────────────────────────────────
export async function submitDocument(params: {
  documentCode: string;
  documentType: string;
  submittedBy: string;
  submitterEmail: string;
  originalContent: string;
  companySignature: string;
  companyCertSerial: string;
}) {
  const contentHash = hashContent(params.originalContent);

  const signatureValid = verifyCompanySignature(
    contentHash,
    params.companySignature,
    params.companyCertSerial
  );
  if (!signatureValid) {
    throw new TxngError("INVALID_COMPANY_SIGNATURE", "Chữ ký số của công ty không hợp lệ");
  }

  const existing = await db.txngDocument.findUnique({
    where: { documentCode: params.documentCode },
  });
  if (existing) {
    throw new TxngError("DUPLICATE_CODE", "Mã tài liệu đã tồn tại trong hệ thống");
  }

  const doc = await db.txngDocument.create({
    data: {
      documentCode: params.documentCode,
      documentType: params.documentType as never,
      submittedBy: params.submittedBy,
      submitterEmail: params.submitterEmail,
      contentHash,
      originalContent: params.originalContent,
      companySignature: params.companySignature,
      companyCertSerial: params.companyCertSerial,
      status: "PENDING_REVIEW",
    },
  });

  await appendAuditLog(doc.id, "SUBMITTED", params.submitterEmail, {
    contentHash,
    companyCertSerial: params.companyCertSerial,
  });

  return doc;
}

// ─── 2. An Hà duyệt tài liệu ────────────────────────────────────────────────
export async function approveDocument(id: string, adminEmail: string) {
  const doc = await getDocumentOrThrow(id);
  assertStatus(doc.status as TxngDocumentStatus, ["PENDING_REVIEW"]);

  const updated = await db.txngDocument.update({
    where: { id },
    data: {
      status: "APPROVED",
      approvedBy: adminEmail,
      approvedAt: new Date(),
    },
  });

  await appendAuditLog(id, "APPROVED", adminEmail);
  return updated;
}

// ─── 3. An Hà từ chối tài liệu ──────────────────────────────────────────────
export async function rejectDocument(id: string, adminEmail: string, reason: string) {
  const doc = await getDocumentOrThrow(id);
  assertStatus(doc.status as TxngDocumentStatus, ["PENDING_REVIEW"]);

  const updated = await db.txngDocument.update({
    where: { id },
    data: {
      status: "REJECTED",
      rejectionReason: reason,
    },
  });

  await appendAuditLog(id, "REJECTED", adminEmail, { reason });
  return updated;
}

// ─── 4. An Hà ký số tài liệu ────────────────────────────────────────────────
export async function signDocument(id: string, adminEmail: string) {
  const doc = await getDocumentOrThrow(id);
  assertStatus(doc.status as TxngDocumentStatus, ["APPROVED"]);

  const { signature, certSerial } = signAsAnha(doc.contentHash);

  const payload = buildSignedPayload({
    documentCode: doc.documentCode,
    documentType: doc.documentType as never,
    submittedBy: doc.submittedBy,
    contentHash: doc.contentHash,
    originalContent: doc.originalContent,
    companySignature: doc.companySignature,
    companyCertSerial: doc.companyCertSerial,
    anhaSignature: signature,
    anhaCertSerial: certSerial,
    signedAt: new Date(),
  });

  const updated = await db.txngDocument.update({
    where: { id },
    data: {
      status: "ANHA_SIGNED",
      anhaSignature: signature,
      anhaCertSerial: certSerial,
      signedPayload: JSON.stringify(payload),
      signedAt: new Date(),
    },
  });

  await appendAuditLog(id, "SIGNED", adminEmail, { certSerial });
  return updated;
}

// ─── 5. Nộp tài liệu đã ký lên hệ thống bộ ─────────────────────────────────
export async function submitToMinistry(id: string, adminEmail: string) {
  const doc = await getDocumentOrThrow(id);
  assertStatus(doc.status as TxngDocumentStatus, ["ANHA_SIGNED"]);

  if (!doc.signedPayload) {
    throw new TxngError("MISSING_PAYLOAD", "Tài liệu chưa có signed payload");
  }

  const result = await callMinistryApi(JSON.parse(doc.signedPayload));

  if (result.success) {
    await db.txngDocument.update({
      where: { id },
      data: {
        status: "SUBMITTED",
        ministryRef: result.ref,
        ministrySubmittedAt: new Date(),
        ministryResponse: JSON.stringify(result),
      },
    });
    await appendAuditLog(id, "MINISTRY_SENT", adminEmail, { ref: result.ref });
  } else {
    await db.txngDocument.update({
      where: { id },
      data: {
        status: "SUBMISSION_FAILED",
        ministryResponse: JSON.stringify(result),
      },
    });
    await appendAuditLog(id, "MINISTRY_FAILED", adminEmail, {
      errorCode: result.errorCode,
      message: result.message,
    });
  }

  return result;
}

// ─── 6. Lấy danh sách tài liệu (admin) ──────────────────────────────────────
export async function listDocuments(params: {
  status?: TxngDocumentStatus;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(50, Math.max(1, params.limit ?? 20));
  const skip = (page - 1) * limit;

  const where = params.status ? { status: params.status } : {};

  const [items, total] = await Promise.all([
    db.txngDocument.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: { auditLogs: { orderBy: { createdAt: "asc" } } },
    }),
    db.txngDocument.count({ where }),
  ]);

  return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
}

// ─── 7. Lấy chi tiết tài liệu ───────────────────────────────────────────────
export async function getDocument(id: string) {
  const doc = await db.txngDocument.findUnique({
    where: { id },
    include: { auditLogs: { orderBy: { createdAt: "asc" } } },
  });
  if (!doc) throw new TxngError("NOT_FOUND", "Không tìm thấy tài liệu");
  return doc;
}

// ─── Ministry API client ─────────────────────────────────────────────────────
async function callMinistryApi(payload: object): Promise<MinistrySubmitResponse> {
  const endpoint = process.env.MINISTRY_API_ENDPOINT;

  // Dev/staging: mock phản hồi thành công khi chưa có endpoint thật
  if (!endpoint) {
    return {
      success: true,
      ref: `MOCK-${Date.now()}`,
      message: "Mock submission accepted (no MINISTRY_API_ENDPOINT set)",
    };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MINISTRY_API_TOKEN ?? ""}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return {
      success: false,
      errorCode: `HTTP_${res.status}`,
      message: text || res.statusText,
    };
  }

  return (await res.json()) as MinistrySubmitResponse;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function getDocumentOrThrow(id: string) {
  const doc = await db.txngDocument.findUnique({ where: { id } });
  if (!doc) throw new TxngError("NOT_FOUND", "Không tìm thấy tài liệu");
  return doc;
}

function assertStatus(current: TxngDocumentStatus, allowed: TxngDocumentStatus[]) {
  if (!allowed.includes(current)) {
    throw new TxngError(
      "INVALID_STATUS",
      `Trạng thái hiện tại "${current}" không cho phép thao tác này`
    );
  }
}

async function appendAuditLog(
  documentId: string,
  action: string,
  actor: string,
  metadata?: object
) {
  await db.txngAuditLog.create({
    data: {
      documentId,
      action,
      actor,
      metadata: metadata ? JSON.stringify(metadata) : null,
    },
  });
}

export class TxngError extends Error {
  constructor(
    public readonly code: string,
    message: string
  ) {
    super(message);
    this.name = "TxngError";
  }
}
