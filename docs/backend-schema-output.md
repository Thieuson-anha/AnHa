# Implementation: An Hà Backend - Sprint 1

## 1. Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────

enum Industry {
  thuc_pham    @map("thuc-pham")
  duoc_pham    @map("duoc-pham")
  my_pham      @map("my-pham")
  dien_tu      @map("dien-tu")
  may_mac      @map("may-mac")
  khac
}

enum EstimatedQuantity {
  duoi_10000      @map("duoi-10000")
  tu_10000_50000  @map("10000-50000")
  tu_50000_200000 @map("50000-200000")
  tren_200000     @map("tren-200000")
}

enum ContactStatus {
  NEW
  IN_PROGRESS
  QUOTED
  CLOSED_WON
  CLOSED_LOST
}

// ─────────────────────────────────────────────
// Models
// ─────────────────────────────────────────────

/// B2B lead từ form liên hệ
model Contact {
  id                String            @id @default(cuid())
  companyName       String            @db.VarChar(100)
  industry          Industry
  estimatedQuantity EstimatedQuantity
  contactName       String            @db.VarChar(100)
  email             String            @db.VarChar(254)
  phone             String            @db.VarChar(20)
  message           String?           @db.VarChar(1000)
  status            ContactStatus     @default(NEW)
  ipAddress         String?           @db.VarChar(45) // IPv4 + IPv6
  userAgent         String?           @db.VarChar(500)
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  @@index([email])
  @@index([status])
  @@index([createdAt])
  @@index([industry])
  @@map("contacts")
}

/// Giải pháp tem (seed data, không CRUD qua API)
model Product {
  id          String   @id @db.VarChar(50) // e.g. "tem-qr"
  name        String   @db.VarChar(100)
  description String   @db.Text
  features    String[] // PostgreSQL array
  useCases    String[]
  imageUrl    String   @db.VarChar(500)
  sortOrder   Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isActive, sortOrder])
  @@map("products")
}

/// Case study khách hàng
model CaseStudy {
  id           String   @id @default(cuid())
  slug         String   @unique @db.VarChar(150)
  title        String   @db.VarChar(200)
  industry     Industry
  clientName   String   @db.VarChar(100)
  summary      String   @db.VarChar(300)  // Dùng cho listing
  content      String   @db.Text          // Markdown/HTML chi tiết
  results      Json                        // { metric: string, value: string }[]
  imageUrl     String   @db.VarChar(500)
  isPublished  Boolean  @default(false)
  publishedAt  DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([isPublished, publishedAt])
  @@index([industry])
  @@map("case_studies")
}

/// Người đăng ký nhận newsletter
model Subscriber {
  id          String    @id @default(cuid())
  email       String    @unique @db.VarChar(254)
  isActive    Boolean   @default(true)
  confirmedAt DateTime?
  ipAddress   String?   @db.VarChar(45)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([isActive])
  @@map("subscribers")
}
```

---

## 2. Zod Validation Schemas

```typescript
// lib/validations/contact.schema.ts

import { z } from "zod";

// ─── Reusable: Vietnamese phone number ───────
const vnPhoneRegex = /^(0|\+84)[0-9]{9}$/;

const vietnamesePhone = z
  .string()
  .regex(vnPhoneRegex, "Số điện thoại không hợp lệ (VD: 0901234567)");

// ─── Enums khớp với Prisma ───────────────────
export const INDUSTRY_VALUES = [
  "thuc-pham",
  "duoc-pham",
  "my-pham",
  "dien-tu",
  "may-mac",
  "khac",
] as const;

export const QUANTITY_VALUES = [
  "duoi-10000",
  "10000-50000",
  "50000-200000",
  "tren-200000",
] as const;

export type Industry = (typeof INDUSTRY_VALUES)[number];
export type EstimatedQuantity = (typeof QUANTITY_VALUES)[number];

// ─── Contact Form Schema ─────────────────────
export const contactSchema = z.object({
  companyName: z
    .string({ required_error: "Tên công ty là bắt buộc" })
    .min(2, "Tên công ty phải có ít nhất 2 ký tự")
    .max(100, "Tên công ty không được vượt quá 100 ký tự")
    .trim(),

  industry: z.enum(INDUSTRY_VALUES, {
    errorMap: () => ({ message: "Ngành nghề không hợp lệ" }),
  }),

  estimatedQuantity: z.enum(QUANTITY_VALUES, {
    errorMap: () => ({ message: "Số lượng dự kiến không hợp lệ" }),
  }),

  contactName: z
    .string({ required_error: "Họ tên là bắt buộc" })
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(100, "Họ tên không được vượt quá 100 ký tự")
    .trim(),

  email: z
    .string({ required_error: "Email là bắt buộc" })
    .email("Email không hợp lệ")
    .max(254, "Email không được vượt quá 254 ký tự")
    .toLowerCase()
    .trim(),

  phone: vietnamesePhone,

  message: z
    .string()
    .max(1000, "Tin nhắn không được vượt quá 1000 ký tự")
    .trim()
    .optional(),
});

// Inferred type để dùng trong handler
export type ContactInput = z.infer<typeof contactSchema>;

// ─── Helper: format Zod errors → { field: message } ───
export function formatZodErrors(
  error: z.ZodError
): Record<string, string> {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const field = issue.path.join(".");
    // Chỉ lấy lỗi đầu tiên của mỗi field
    if (!acc[field]) {
      acc[field] = issue.message;
    }
    return acc;
  }, {});
}
```

---

## 3. Rate Limiter Utility

```typescript
// lib/rate-limit.ts
// In-memory store — dùng Redis (Upstash) ở production

interface RateLimitEntry {
  count: number;
  resetAt: number; // Unix timestamp ms
}

// Map key: `${ip}:${route}`
const store = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
  limit: number;       // max requests
  windowMs: number;    // window in milliseconds
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  ip: string,
  route: string,
  config: RateLimitConfig
): RateLimitResult {
  const key = `${ip}:${route}`;
  const now = Date.now();
  const entry = store.get(key);

  // Window đã hết → reset
  if (!entry || now > entry.resetAt) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + config.windowMs,
    };
    store.set(key, newEntry);
    return {
      success: true,
      remaining: config.limit - 1,
      resetAt: newEntry.resetAt,
    };
  }

  // Trong window, vượt limit
  if (entry.count >= config.limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Trong window, còn quota
  entry.count += 1;
  return {
    success: true,
    remaining: config.limit - entry.count,
    resetAt: entry.resetAt,
  };
}

// ─── Preset configs từ api-spec.md ───────────
export const RATE_LIMITS = {
  contact:    { limit: 5,   windowMs: 60 * 60 * 1000 },      // 5/IP/hour
  newsletter: { limit: 3,   windowMs: 60 * 60 * 1000 },      // 3/IP/hour
  readonly:   { limit: 100, windowMs: 60 * 1000 },            // 100/IP/min
} as const;
```

---

## 4. Email Service (Resend)

```typescript
// lib/email/resend.service.ts

import { Resend } from "resend";
import type { ContactInput } from "@/lib/validations/contact.schema";

const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER = "An Hà <no-reply@anha.vn>";
const INTERNAL_EMAIL = process.env.INTERNAL_NOTIFY_EMAIL ?? "sales@anha.vn";

// ─── Map label cho UI email ──────────────────
const INDUSTRY_LABELS: Record<string, string> = {
  "thuc-pham": "Thực phẩm",
  "duoc-pham": "Dược phẩm",
  "my-pham":   "Mỹ phẩm",
  "dien-tu":   "Điện tử",
  "may-mac":   "May mặc",
  khac:        "Khác",
};

const QUANTITY_LABELS: Record<string, string> = {
  "duoi-10000":    "Dưới 10,000",
  "10000-50000":   "10,000 – 50,000",
  "50000-200000":  "50,000 – 200,000",
  "tren-200000":   "Trên 200,000",
};

// ─── 1. Notify internal team ─────────────────
export async function sendInternalNotification(
  lead: ContactInput & { id: string }
): Promise<void> {
  await resend.emails.send({
    from: SENDER,
    to: INTERNAL_EMAIL,
    subject: `[Lead mới] ${lead.companyName} – ${INDUSTRY_LABELS[lead.industry]}`,
    html: buildInternalEmailHtml(lead),
  });
}

// ─── 2. Auto-reply cho khách hàng ────────────
export async function sendAutoReply(lead: ContactInput): Promise<void> {
  await resend.emails.send({
    from: SENDER,
    to: lead.email,
    subject: "An Hà đã nhận yêu cầu của bạn",
    html: buildAutoReplyHtml(lead),
  });
}

// ─── HTML builders ────────────────────────────

function buildInternalEmailHtml(
  lead: ContactInput & { id: string }
): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #1a56db;">Lead mới từ website An Hà</h2>
      <table style="border-collapse: collapse; width: 100%;">
        <tr><td style="padding: 8px; font-weight: bold;">ID:</td>
            <td style="padding: 8px;">${lead.id}</td></tr>
        <tr style="background:#f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Công ty:</td>
            <td style="padding: 8px;">${escapeHtml(lead.companyName)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Ngành:</td>
            <td style="padding: 8px;">${INDUSTRY_LABELS[lead.industry]}</td></tr>
        <tr style="background:#f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Số lượng DK:</td>
            <td style="padding: 8px;">${QUANTITY_LABELS[lead.estimatedQuantity]}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Liên hệ:</td>
            <td style="padding: 8px;">${escapeHtml(lead.contactName)}</td></tr>
        <tr style="background:#f9f9f9;">
            <td style="padding: 8px; font-weight: bold;">Email:</td>
            <td style="padding: 8px;">${lead.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">SĐT:</td>
            <td style="padding: 8px;">${lead.phone}</td></tr>
        ${lead.message ? `
        <tr style="background:#f9f9f9;">
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Tin nhắn:</td>
            <td style="padding: 8px;">${escapeHtml(lead.message)}</td></tr>
        ` : ""}
      </table>
      <p style="margin-top: 16px; color: #666; font-size: 12px;">
        Vui lòng liên hệ lại trong vòng 24 giờ.
      </p>
    </div>
  `;
}

function buildAutoReplyHtml(lead: ContactInput): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #1a56db;">Xin chào ${escapeHtml(lead.contactName)},</h2>
      <p>Chúng tôi đã nhận được yêu cầu từ <strong>${escapeHtml(lead.companyName)}</strong>.</p>
      <p>Đội ngũ tư vấn của An Hà sẽ liên hệ với bạn trong vòng <strong>24 giờ làm việc</strong>.</p>
      <hr style="border: none;