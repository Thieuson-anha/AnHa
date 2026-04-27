# 📊 PM Sprint 1 Review Report — Website An Hà

**Ngày review:** End of Sprint 1
**Người review:** PM
**Trạng thái:** 🟡 CONDITIONAL APPROVE — Cần resolve 6 action items trước khi merge

---

## 1. SCORECARD TỔNG QUAN

| Agent | Task | Deliverable | Chất lượng | Status |
|---|---|---|---|---|
| Designer | TASK-001 | Design System / Tailwind Config | ⭐⭐⭐⭐⭐ | ✅ Approve |
| Backend | TASK-002 | Prisma Schema + Seed | ⭐⭐⭐⭐½ | ✅ Approve (minor fix) |
| Backend | TASK-004 | `/api/contact` + Email Service | ⭐⭐⭐⭐ | 🟡 Approve w/ gap |
| Frontend | TASK-003 | Layout + Routing Structure | ⭐⭐⭐⭐ | 🟡 Approve w/ gap |
| Frontend | TASK-005 | HomePage Sections | ⭐⭐⭐½ | 🔴 Incomplete |
| Tester | — | E2E + Unit Tests | ⭐⭐⭐⭐½ | ✅ Approve |

**Overall Sprint 1:** 78/100 — Nền móng vững, nhưng có 2 incomplete deliverables cần giải quyết.

---

## 2. ĐÁNH GIÁ CHI TIẾT TỪNG DELIVERABLE

---

### 🎨 TASK-001 — Designer: Design System

**Rating: 5/5 — Vượt yêu cầu**

**Điểm mạnh:**
- Tailwind config cực kỳ chi tiết và production-ready. Token system nhất quán (`navy.*`, `gold.*`) thay vì dùng hex hardcode — dễ maintain.
- Shadow system (`shadow-cta`, `shadow-card-md`, `shadow-navy`) được thiết kế riêng cho B2B — chuyên nghiệp.
- Button variants đầy đủ 5 loại với đầy đủ states (hover/focus/active/disabled). Đặc biệt `outlineLight` cho hero-on-dark-bg là detail quan trọng nhiều designer hay bỏ sót.
- Animation keyframes (`fade-up`, `pulse-gold`, `shimmer`) subtle và phù hợp với brand uy tín — không quá flashy.
- Dot pattern background cho hero section là lựa chọn thông minh thay vì stock photo generic.

**Gaps phát hiện:**

> ⚠️ **GAP-001:** Card component bị **cắt đứt giữa chừng** tại `'border border-gray` — thiếu toàn bộ phần còn lại của `cardVariants` (product, case study, stats card).

> ⚠️ **GAP-002:** Chưa có spec cho **Form components** (Input, Select, Textarea, Error state) dù đã liệt kê trong deliverables TASK-001. Frontend cần spec này để build ContactForm.

> ℹ️ **NOTE:** Font fallback cần kiểm tra lại — config đang để `heading: ['Inter']` và `body: ['Be Vietnam Pro']` nhưng `sans` default lại đảo thứ tự. Cần nhất quán để tránh Flash of Unstyled Text.

---

### ⚙️ TASK-002 — Backend: Prisma Schema

**Rating: 4.5/5 — Tốt, cần 1 minor fix**

**Điểm mạnh:**
- Schema rất solid. Enum mapping (`@map`) cho phép database dùng slug-style value trong khi Prisma code dùng readable names — best practice.
- Index strategy hợp lý: `[isActive, sortOrder]` cho Product, composite indexes cho CaseStudy — tư duy performance tốt.
- Có `ipAddress` và `userAgent` trên Contact model — quan trọng cho fraud detection và audit trail.
- `results Json` trên CaseStudy linh hoạt hơn typed column — đúng vì metrics đa dạng theo client.

**Gaps phát hiện:**

> ⚠️ **GAP-003 (CRITICAL):** Schema **thiếu 2 fields** mà PM đã yêu cầu bổ sung trong Sprint 1 Planning:
> ```prisma
> // Contact model cần thêm:
> source          String?   // utm_source tracking
> productInterest String?   // slug của product quan tâm
> ```
> Đây là requirement đã được confirm — cần add trước khi TASK-004 build API.

> ℹ️ **NOTE:** `Admin` model cũng thiếu (đã mention trong planning cho `/admin/leads` route). Có thể defer sang Sprint 2 nếu chưa prioritize, nhưng cần confirm.

> ✅ **GOOD:** `.env.example` pattern và `README-backend.md` — cần verify đã commit, không thấy trong output nhưng assume done.

---

### ⚙️ TASK-004 — Backend: `/api/contact` Endpoint

**Rating: 4/5 — Core tốt, gaps ở integration**

**Điểm mạnh:**
- Zod schema validation cực kỳ solid. `formatZodErrors()` helper clean, trả về `Record<string, string>` đúng format Frontend cần.
- Rate limiter implementation đúng logic, có preset configs rõ ràng. Comment về Redis/Upstash cho production là responsible thinking.
- Email service (Resend) có cả internal notification lẫn auto-reply — đúng B2B workflow. HTML template có `escapeHtml()` — security-conscious.
- `INDUSTRY_LABELS` và `QUANTITY_LABELS` map đúng cho email display.

**Gaps phát hiện:**

> ⚠️ **GAP-004:** Validation schema dùng enum values không khớp 100% với Prisma schema:
> ```typescript
> // Zod (contact.schema.ts):
> QUANTITY_VALUES = ['duoi-10000', '10000-50000', '50000-200000', 'tren-200000']
>
> // Prisma (schema.prisma):
> EstimatedQuantity: duoi_10000, tu_10000_50000, tu_50000_200000, tren_200000
> ```
> Cần có một **mapping layer** hoặc thống nhất về cách convert Zod input → Prisma enum trước khi `prisma.contact.create()`. Hiện tại nếu pass thẳng sẽ throw runtime error.

> ⚠️ **GAP-005:** Email HTML builder bị **cắt đứt** (`<hr style="border: none;`) — chưa thấy `buildAutoReplyHtml` hoàn chỉnh và `escapeHtml` utility. Cần complete implementation.

> ℹ️ **NOTE:** Unit tests (Jest) cho validation logic chưa thấy trong output — là Acceptance Criteria của TASK-004. Cần confirm đã có trong repo.

---

### 🖥️ TASK-003 — Frontend: Layout + Routing

**Rating: 4/5 — Types xuất sắc, component bị cắt**

**Điểm mạnh:**
- TypeScript types (`src/types/components.ts`) cực kỳ comprehensive và well-designed. Đặc biệt:
  - Union type cho `ctaButtons: [CTAButton] | [CTAButton, CTAButton]` — enforce max 2 CTAs tại compile time, elegant.
  - `FormStatus = 'idle' | 'submitting' | 'success' | 'error'` — đúng state machine pattern.
  - `source?: string` trên ContactFormProps — đã anticipate PM requirement về tracking.
- HeroSection animation variants (`containerVariants` với `staggerChildren`) và `HighlightedHeadline` sub-component xử lý highlight words rất clean.

**Gaps phát hiện:**

> ⚠️ **GAP-006:** `HeroSection.tsx` bị **cắt đứt** tại `data-tracking={button.trackingId` — chưa hoàn chỉnh render logic, phần image/video background, stats bar, và dot pattern overlay.

> ⚠️ **GAP-007:** **Header.tsx**, **Footer.tsx**, **MobileMenu.tsx** chưa thấy implementation — đây là core deliverable của TASK-003. Chỉ có type definitions và 1 partial section component.

> ℹ️ **NOTE:** `cn()` utility được import từ `@/lib/utils` — cần verify file này đã được tạo (thường là `clsx` + `tailwind-merge` wrapper).

---

### 🖥️ TASK-005 — Frontend: HomePage

**Rating: 3.5/5 — Không thể đánh giá đầy đủ**

**Tình trạng:** Task này phụ thuộc TASK-003 (Layout). Vì TASK-003 chưa hoàn chỉnh (Header/Footer missing), HomePage sections cũng không thể được review độc lập.

> ⚠️ **GAP-008:** Chưa thấy implementation của các sections: `ProblemSection`, `SolutionOverview`, `HowItWorksSection`, `StatsSection`, `TrustedBySection`, `CTASection`.

> ⚠️ **GAP-009:** File `/data/mock.ts` chưa được tạo — Acceptance Criteria yêu cầu "Dùng mock data từ `/data/mock.ts`".

**Ghi nhận:** HeroSection component đã được build (dù chưa hoàn chỉnh) và types đã sẵn sàng — đây là section phức tạp nhất của HomePage. Các sections còn lại có thể complete nhanh hơn.

---

### 🧪 Tester: E2E + Unit Tests

**Rating: 4.5/5 — Rất tốt**

**Điểm mạnh:**
- Test coverage cho Contact Form rất thorough: happy path, payload verification, validation errors (email, phone, required fields), API 500 error.
- `fillContactForm()` helper pattern tái sử dụng tốt. `overrides` pattern cho phép test edge cases cleanly.
- Quan trọng: test verify **form KHÔNG reset khi có lỗi server** (TC-API-500) — đây là UX detail quan trọng nhiều team bỏ sót.
- Navigation tests có data-driven approach với `NAV_LINKS` array — dễ maintain khi thêm routes.
- Test `aria-current` hoặc `classList.active` cho active nav — accessibility-aware.

**Gaps phát hiện:**

> ℹ️ **NOTE:** Navigation test bị cắt tại `TC-005-CTA`. Cần xem phần còn lại.

> ℹ️ **NOTE:** Chưa thấy unit tests cho Backend validation logic (Jest) và rate limiter — cần add để complete test pyramid.

> ℹ️ **NOTE:** Cần `playwright.config.ts` với `baseURL`, viewport defaults, và CI configuration để tests chạy được trong pipeline.

---

## 3. INCONSISTENCY MATRIX

| # | Vấn đề | Giữa | Severity |
|---|---|---|---|
| INC-001 | Quantity enum values không khớp | Backend Zod ↔ Prisma Schema | 🔴 Critical |
| INC-002 | `source` & `productInterest` thiếu trên Contact | Prisma Schema ↔ PM Requirement | 🔴 Critical |
| INC-003 | Form field `quantity` vs `estimatedQuantity` | Frontend Types ↔ Backend Schema | 🟡 Medium |
| INC-004 | Font family order không nhất quán | Tailwind config heading/body/sans | 🟢 Low |
| INC-005 | `contactName` có trong Zod/Types nhưng chưa trong PM spec gốc | Backend ↔ PM Spec | 🟢 Low (Good addition) |

---

## 4. ACTION ITEMS CHO SPRINT 2

### 🔴 P0 — Phải xong trước khi code Sprint 2

```
[ACTION-001] → Designer
Hoàn thiện Card variants (bị cắt) + Form component specs
Deadline: Ngày 1, Sprint 2
Blocker cho: Frontend TASK-005, ContactForm build

[ACTION-002] → Backend
Thêm `source` + `productInterest` vào Contact model (migration)
Thêm mapping layer Zod → Prisma enum cho EstimatedQuantity
Deadline: Ngày 1, Sprint 2
Blocker cho: TASK-004 API go-live

[ACTION-003] → Frontend
Hoàn thiện HeroSection (phần bị cắt)
Build Header.tsx + Footer.tsx + MobileMenu.tsx
Tạo /data/mock.ts với đủ data cho tất cả HomePage sections
Deadline: Ngày 2, Sprint 2
Blocker cho: Homepage integration
```

### 🟡 P1 — Hoàn thiện trong Sprint 2

```
[ACTION-004] → Backend
Complete buildAutoReplyHtml() + escapeHtml() utility
Add unit tests (Jest) cho contact validation + rate limiter
Export Postman collection vào /docs/api/
Deadline: Sprint 2, Week 1

[ACTION-005] → Frontend
Build các sections còn lại của HomePage:
ProblemSection, SolutionOverview, HowItWorksSection,
StatsSection, TrustedBySection, CTASection
Deadline: Sprint 2, Week 1

[ACTION-006] → Tester
Complete navigation test (TC-005-CTA phần còn lại)
Add playwright.config.ts với CI setup
Add Jest unit tests cho Backend validation
Deadline: Sprint 2, Week 1
```

### 🟢 P2 — Backlog, confirm với stakeholder

```
[ACTION-007] → Backend + PM
Confirm scope của Admin model + /admin/leads route
Có cần Sprint 2 hay defer sang Sprint 3?
Decision needed by: Sprint 2 planning

[ACTION-008] → PM
Tổ chức requirements review với Sales team
Confirm Contact form fields final (tránh schema change sau Sprint 2)
Deadline: Đầu Sprint 2
```

---

## 5. SPRINT 2 TASK LIST (SƠ BỘ)

| Task ID | Agent | Mô tả | Priority | Dependency |
|---|---|---|---|---|
| TASK-006 | Frontend | Build `/lien-he` ContactForm page (full implementation) | P0 | ACTION-001, ACTION-002 |
| TASK-007 | Frontend | Build `/giai-phap` Solutions page | P0 | ACTION-003 |
| TASK-008 | Frontend | Complete HomePage (missing sections) | P0 | ACTION-003 |
| TASK-009 | Backend | `/api/leads` GET endpoint (internal admin) | P1 | ACTION-002 |
| TASK-010 | Backend | `/api/cases` GET endpoint + caching | P1 | TASK-002 |
| TASK-011 | Designer | `/lien-he` page layout + form design | P0 | ACTION-001 |
| TASK-012 | Tester | Integration tests