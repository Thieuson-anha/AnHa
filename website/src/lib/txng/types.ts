export type TxngDocumentType = "ORDER" | "CONTRACT" | "DECLARATION" | "CERTIFICATION";

export type TxngDocumentStatus =
  | "PENDING_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "ANHA_SIGNED"
  | "SUBMITTED"
  | "SUBMISSION_FAILED";

export interface TxngDocument {
  id: string;
  documentCode: string;
  documentType: TxngDocumentType;
  submittedBy: string;
  submitterEmail: string;
  contentHash: string;
  originalContent: string;
  companySignature: string;
  companyCertSerial: string;
  anhaSignature: string | null;
  anhaCertSerial: string | null;
  signedPayload: string | null;
  status: TxngDocumentStatus;
  rejectionReason: string | null;
  approvedBy: string | null;
  approvedAt: Date | null;
  signedAt: Date | null;
  ministryRef: string | null;
  ministrySubmittedAt: Date | null;
  ministryResponse: string | null;
  createdAt: Date;
  updatedAt: Date;
  auditLogs?: TxngAuditLog[];
}

export interface TxngAuditLog {
  id: string;
  documentId: string;
  action: TxngAuditAction;
  actor: string;
  metadata: string | null;
  createdAt: Date;
}

export type TxngAuditAction =
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "SIGNED"
  | "MINISTRY_SENT"
  | "MINISTRY_FAILED";

// Payload gửi lên hệ thống bộ (sau khi 2 bên ký)
export interface MinistrySignedPayload {
  documentCode: string;
  documentType: TxngDocumentType;
  submittedBy: string;
  contentHash: string;
  originalContent: string;
  companySignature: string;
  companyCertSerial: string;
  anhaSignature: string;
  anhaCertSerial: string;
  signedAt: string; // ISO 8601
}

export interface MinistrySubmitResponse {
  success: boolean;
  ref?: string;     // Mã xác nhận từ bộ
  message?: string;
  errorCode?: string;
}
