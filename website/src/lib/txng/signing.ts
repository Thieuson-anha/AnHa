import crypto from "crypto";
import type { MinistrySignedPayload, TxngDocumentType } from "./types";

// ─── An Hà Certificate metadata ──────────────────────────────────────────────
// Production: thay bằng serial thật từ CA (VNPT-CA, Viettel-CA, …)
const ANHA_CERT_SERIAL = process.env.ANHA_CERT_SERIAL ?? "ANHA-DEV-CERT-0001";

// ─── Canonical content hash ───────────────────────────────────────────────────
export function hashContent(base64Content: string): string {
  return crypto.createHash("sha256").update(base64Content, "utf8").digest("hex");
}

// ─── Verify company signature ─────────────────────────────────────────────────
// Production: dùng công ty public key + companyCertSerial để verify RSA/ECDSA.
// Ở đây bỏ qua verify vì không có public key của từng công ty đối tác.
// Trả về true nếu signature không rỗng (placeholder để hook PKI vào sau).
export function verifyCompanySignature(
  _contentHash: string,
  _signature: string,
  _certSerial: string
): boolean {
  // TODO(production): verify RSA/ECDSA signature với company public certificate
  // Ví dụ: crypto.verify("sha256", Buffer.from(contentHash), publicKey, Buffer.from(signature, "hex"))
  return _signature.length > 0;
}

// ─── An Hà digital signing ────────────────────────────────────────────────────
// Production: gọi HSM / USB token qua PKCS#11 để ký bằng An Hà private key.
// Dev/staging: dùng HMAC-SHA256 với ANHA_SIGNING_SECRET làm key giả lập.
export function signAsAnha(contentHash: string): { signature: string; certSerial: string } {
  const secret = process.env.ANHA_SIGNING_SECRET;

  if (!secret) {
    throw new Error("ANHA_SIGNING_SECRET chưa được cấu hình");
  }

  // TODO(production): replace với HSM call
  // Ví dụ PKCS#11: pkcs11.sign(privateKeyHandle, Buffer.from(contentHash, "hex"))
  const signature = crypto
    .createHmac("sha256", secret)
    .update(contentHash)
    .digest("hex");

  return { signature, certSerial: ANHA_CERT_SERIAL };
}

// ─── Build signed payload gửi lên bộ ─────────────────────────────────────────
export function buildSignedPayload(params: {
  documentCode: string;
  documentType: TxngDocumentType;
  submittedBy: string;
  contentHash: string;
  originalContent: string;
  companySignature: string;
  companyCertSerial: string;
  anhaSignature: string;
  anhaCertSerial: string;
  signedAt: Date;
}): MinistrySignedPayload {
  return {
    documentCode: params.documentCode,
    documentType: params.documentType,
    submittedBy: params.submittedBy,
    contentHash: params.contentHash,
    originalContent: params.originalContent,
    companySignature: params.companySignature,
    companyCertSerial: params.companyCertSerial,
    anhaSignature: params.anhaSignature,
    anhaCertSerial: params.anhaCertSerial,
    signedAt: params.signedAt.toISOString(),
  };
}
