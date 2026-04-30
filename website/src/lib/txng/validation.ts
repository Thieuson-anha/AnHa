import { z } from "zod";

export const SubmitDocumentSchema = z.object({
  documentCode: z.string().min(1).max(100),
  documentType: z.enum(["ORDER", "CONTRACT", "DECLARATION", "CERTIFICATION"]),
  submittedBy: z.string().min(2).max(200),
  submitterEmail: z.string().email(),
  // Base64-encoded raw document bytes
  originalContent: z.string().min(1),
  // Chữ ký số công ty: hex string
  companySignature: z.string().min(1),
  // Số serial chứng chỉ số của công ty
  companyCertSerial: z.string().min(1),
});

export const RejectDocumentSchema = z.object({
  reason: z.string().min(10).max(1000),
});

export type SubmitDocumentInput = z.infer<typeof SubmitDocumentSchema>;
export type RejectDocumentInput = z.infer<typeof RejectDocumentSchema>;
