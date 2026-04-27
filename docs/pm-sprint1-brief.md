# 📋 PM Review & Sprint 1 Planning — Website An Hà

---

## 1. ✅ Kiến Trúc Review

### Đánh giá tổng thể: **Hợp lý — Approve với một số ghi chú**

| Hạng mục | Đánh giá | Ghi chú |
|---|---|---|
| Sitemap | ✅ Tốt | Đủ trang cho B2B funnel |
| User Journey | ✅ Tốt | 6 bước rõ ràng, đúng mô hình B2B |
| Component Arch | ✅ Tốt | Granular, tái sử dụng được |
| Data Models | ⚠️ Cần bổ sung | Xem ghi chú bên dưới |
| API Routes | ⚠️ Thiếu 1 route | Xem ghi chú bên dưới |

### 📝 Ghi chú kiến trúc

**Bổ sung Data Model `Contact`:**
```typescript
Contact {
  // ... giữ nguyên các field cũ ...
  source: string        // utm_source để track lead từ kênh nào
  productInterest: slug // liên kết tới Product để Sales biết nhu cầu
}
```
> **Lý do:** B2B sales cần biết lead đến từ Google SEO hay referral, và quan tâm loại tem nào — tăng hiệu quả follow-up.

**Bổ sung API route:**
```
/api/cases     ← GET (đã có)
/api/contact   ← POST (đã có)
/api/leads     ← GET (THÊM MỚI) — dành cho internal admin xem danh sách lead
```
> **Lý do:** Sales team cần dashboard tối giản để xem lead mà không phải vào DB trực tiếp.

**Khuyến nghị thêm 1 page:**
```
/admin/leads   ← Protected route, xem danh sách Contact submissions
```

---

## 2. 🗂️ Sprint 1 — Task List Chi Tiết

> **Sprint Goal:** Dựng xong nền móng kỹ thuật và visual identity, sẵn sàng cho việc build core pages ở Sprint 2.
> **Timeline:** Tuần 1–2 | **Definition of Done:** Task pass review của PM, merge vào `main`

---

### 🎨 Designer

---

**[TASK-001] → Designer**
**Mô tả:** Xây dựng Design System & Token cho toàn bộ website An Hà

**Deliverables cụ thể:**

```
Color Tokens:
  --color-primary:     #1A3C5E  (Navy xanh — uy tín, công nghệ)
  --color-accent:      #F5A623  (Vàng — nổi bật CTA)
  --color-danger:      #E53E3E  (Đỏ — cảnh báo hàng giả)
  --color-neutral-*:   Dải gray 50→900

Typography:
  Font heading: Inter hoặc Be Vietnam Pro (hỗ trợ tiếng Việt)
  Font body:    Inter
  Scale: xs/sm/base/lg/xl/2xl/3xl/4xl

Spacing: 4px base unit → 4/8/12/16/24/32/48/64/96

Components cần design:
  - Button (Primary / Secondary / Ghost)
  - Card (ProductCard, CaseStudyCard)
  - Form Input / Select / Textarea
  - Badge / Tag (ngành hàng)
  - Navigation (Desktop + Mobile hamburger)
  - Hero Section layout
  - Footer layout
```

**Acceptance Criteria:**
- [ ] File Figma được chia sẻ với team, có component page riêng
- [ ] Tất cả color contrast đạt WCAG AA (≥ 4.5:1)
- [ ] Có Dark/Light variant cho Button Primary
- [ ] Export được CSS variables hoặc Tailwind config từ tokens
- [ ] Mobile responsive spec cho breakpoints: 375 / 768 / 1280 / 1440px

**Deadline:** Sprint 1 — Cuối ngày **Thứ 4, Tuần 1**
*(Frontend cần design system trước để build layout)*

---

### ⚙️ Backend

---

**[TASK-002] → Backend**
**Mô tả:** Thiết lập Prisma schema, database và seed data

**Deliverables cụ thể:**

```prisma
// Implement đầy đủ 4 models trong architecture.md
// + bổ sung fields: source, productInterest trên Contact
// + thêm model Admin { id, email, passwordHash, role }

// Database: PostgreSQL (Supabase free tier)
// ORM: Prisma 5.x
```

**Checklist:**
```
□ prisma/schema.prisma — đầy đủ 4 models
□ .env.example — có DATABASE_URL, JWT_SECRET (không commit .env)
□ prisma/seed.ts — seed 3 Product records + 2 CaseStudy mẫu
□ npm run db:push — chạy được không lỗi
□ npm run db:seed — seed thành công, verify bằng Prisma Studio
□ README-backend.md — hướng dẫn setup local trong 5 bước
```

**Acceptance Criteria:**
- [ ] Schema migrate thành công trên PostgreSQL
- [ ] Seed data có đủ field để Frontend render được UI (không có null bất ngờ)
- [ ] Prisma Studio hiển thị đúng relations
- [ ] Không có credentials nào bị commit lên Git

**Deadline:** Sprint 1 — Cuối ngày **Thứ 5, Tuần 1**

---

**[TASK-004] → Backend**
**Mô tả:** Xây dựng `/api/contact` endpoint với validation và email notification

**Spec chi tiết:**

```typescript
// POST /api/contact
Request Body: {
  companyName: string    // required, min 2 chars
  industry:    string    // required, enum: ['thực phẩm','dược phẩm','mỹ phẩm','điện tử','khác']
  quantity:    string    // required, enum: ['<1000','1000-10000','>10000']
  email:       string    // required, valid email format
  phone:       string    // required, regex VN phone: /^(0|\+84)[0-9]{9}$/
  message:     string    // optional, max 500 chars
  productInterest: string // optional, slug của product
  source:      string    // optional, utm_source
}

Response 200: { success: true, message: "Chúng tôi sẽ liên hệ trong 24h" }
Response 400: { success: false, errors: { field: "message" }[] }
Response 500: { success: false, message: "Lỗi server" }
```

**Acceptance Criteria:**
- [ ] Validation đầy đủ, trả về lỗi rõ ràng theo từng field
- [ ] Ghi Contact vào DB với `status: "new"`
- [ ] Gửi email thông báo tới `sales@anha.vn` (dùng Resend hoặc Nodemailer)
- [ ] Rate limiting: tối đa 5 request/IP/giờ (chống spam)
- [ ] Có unit test cho validation logic (Jest)
- [ ] Postman collection được export và commit vào `/docs/api/`

**Deadline:** Sprint 1 — Cuối ngày **Thứ 6, Tuần 2**

---

### 🖥️ Frontend

---

**[TASK-003] → Frontend**
**Mô tả:** Thiết lập Next.js project, routing structure và Layout components

**Tech stack:**
```
Framework:    Next.js 14 (App Router)
Styling:      Tailwind CSS + CSS Variables từ Design System
Animation:    Framer Motion (subtle, professional — không quá flashy)
Icons:        Lucide React
Forms:        React Hook Form + Zod
State:        Zustand (nếu cần global state)
```

**Deliverables:**

```
app/
├── layout.tsx              ← Root layout (font, metadata base)
├── (public)/
│   ├── layout.tsx          ← Layout với Header + Footer
│   ├── page.tsx            ← Home (placeholder)
│   ├── giai-phap/page.tsx  ← Placeholder
│   ├── cong-nghe/page.tsx  ← Placeholder
│   ├── du-an/page.tsx      ← Placeholder
│   ├── ve-chung-toi/page.tsx
│   └── lien-he/page.tsx

components/
├── layout/
│   ├── Header.tsx    ← Nav links + CTA button "Nhận báo giá"
│   ├── Footer.tsx    ← 3-column: Links / Contact / Certifications
│   └── MobileMenu.tsx
└── ui/               ← Button, Card, Badge (theo Design System)
```

**Header spec:**
```
Logo (trái) | Nav: Giải pháp / Công nghệ / Dự án / Về chúng tôi (giữa)
| CTA Button "Nhận báo giá" → /lien-he (phải)

Mobile: Hamburger menu, full-screen overlay
Scroll behavior: sticky + shadow sau khi scroll 50px
```

**Acceptance Criteria:**
- [ ] Tất cả routes trả về 200 (dù là placeholder)
- [ ] Header responsive hoàn chỉnh ở 375px và 1280px
- [ ] Active nav link được highlight đúng theo route hiện tại
- [ ] Lighthouse Performance ≥ 85 (placeholder page)
- [ ] Không có TypeScript errors (`npm run type-check` pass)
- [ ] Tailwind config import đúng color tokens từ Design System

**Dependency:** Cần TASK-001 hoàn thành trước (Design tokens)
**Deadline:** Sprint 1 — Cuối ngày **Thứ 6, Tuần 1**

---

**[TASK-005] → Frontend**
**Mô tả:** Build HomePage với đầy đủ sections (dùng mock data)

**Sections cần implement (theo thứ tự):**

```typescript
// 1. HeroSection
{
  headline: "Bảo vệ thương hiệu — Ngăn chặn hàng giả",
  subheadline: "Giải pháp tem chống giả công nghệ cao cho doanh nghiệp Việt",
  cta_primary: "Nhận tư vấn miễn phí" → /lien-he,
  cta_secondary: "Xem giải pháp" → /giai-phap,
  background: gradient navy + subtle pattern (không dùng stock photo generic)
}

// 2. ProblemSection
// Số liệu thực: thiệt hại hàng giả tại VN (research và cite nguồn)
// 3 pain points dạng icon + text

// 3. SolutionOverview
// 3 cards: Tem QR / Tem Hologram / Tem Serial
// Mỗi card: icon, tên, mô tả 2 dòng, link "Tìm hiểu thêm"

// 4. HowItWorksSection
// 3 steps: Tư vấn → Sản xuất → Triển khai
// Visual: numbered steps với connecting line

// 5. StatsSection (mock data)
// "500+ khách hàng" | "50M+ tem đã in" | "99.9% độ chính xác" | "10 năm kinh nghiệm"

// 6. TrustedBySection
// 6-8 logo placeholder (gray, grayscale filter)

// 7. CTASection
// Background: accent color | Text: "Sẵn sàng bảo vệ thương hiệu?"
// Button: "Liên hệ ngay"
```

**Acceptance Criteria:**
- [ ] Tất cả sections render đúng trên mobile/tablet/desktop
- [ ] Không có layout shift (CLS = 0)
- [ ] Images có `alt` text đầy đủ (SEO + accessibility)
- [ ] CTA buttons link đúng tới `/lien-he` và `/giai-phap`
- [ ] Dùng mock data từ `/data/mock.ts` (không hardcode trong component)
- [ ] Smooth scroll animation khi các section vào viewport (Framer Motion)

**Dependency:** Cần TASK-003 hoàn thành (Layout + routing)
**Deadline:** Sprint 1 — Cuối ngày **Thứ 5, Tuần 2**

---

## 3. ⚠️ Risk Register — Sprint 1

---

### 🔴 Risk 1: Design Blocker — Frontend phụ thuộc Design System

**Mô tả:**
TASK-003 và TASK-005 (Frontend) phụ thuộc vào TASK-001 (Designer). Nếu Design System giao chậm hoặc thiếu spec, Frontend bị block 1–2 ngày.

**Khả năng xảy ra:** Cao (dependency trực tiếp)
**Mức độ ảnh hưởng:** Cao (trễ Sprint 1 deadline)

**Giảm thiểu:**
```
✅ Biện pháp phòng ngừa:
   - Designer giao Color Tokens + Typography trước EOD Thứ 3, Tuần 1
     (trước deadline chính thức 1 ngày)
   - Frontend dùng placeholder tokens tạm trong Tailwind config:
     primary: '#1A3C5E', accent: '#F5A623'
   - PM tạo meeting sync Designer-Frontend lúc 9h sáng Thứ 2, Tuần 1

✅ Biện pháp giảm nhẹ (nếu xảy ra):
   - Frontend build structure + logic trước, styling sau
   - Tách PR: [PR-001] Structure (không cần design)
               [PR-002] Styling (sau khi có design tokens)
```

---

### 🟡 Risk 2: Database Schema Thay Đổi Sau Sprint 1

**Mô tả:**
Nếu stakeholder/Sales team yêu cầu thêm field vào `Contact` sau khi DB đã được seed và API đã build (TASK-002 + TASK-004), sẽ cần migration và sửa validation — tốn thêm thời gian Sprint 2.

**Khả năng xảy ra:** Trung bình (thường gặp khi chưa có requirements freeze)
**Mức độ ảnh hưởng:** Trung bình (ảnh hưởng Backend Sprint 2)

**Giảm thiểu:**
```
✅ Biện pháp phòng ngừa:
   - PM tổ chức requirements review với Sales team TRƯỚC khi Backend
     bắt đầu TASK-002 (Thứ 2 Tuần 1)
   - Câu hỏi cần confirm với Sales:
     □ Cần track thêm thông tin gì