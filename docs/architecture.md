# Kiến trúc Website An Hà
> Tác giả: PM Agent | Cập nhật: Sprint 1

## Sitemap

```
/                          ← Home (Hero + Tổng quan)
/giai-phap                 ← Giải pháp (các loại tem)
  /giai-phap/tem-qr        ← Tem QR Code
  /giai-phap/tem-hologram  ← Tem Hologram
  /giai-phap/tem-serial    ← Tem Serial Number
/cong-nghe                 ← Công nghệ (how it works)
/du-an                     ← Dự án thực tế (case studies)
  /du-an/[slug]            ← Chi tiết từng dự án
/ve-chung-toi              ← Về An Hà (company info)
/lien-he                   ← Liên hệ (B2B lead form)
/api/contact               ← POST submit contact
/api/newsletter            ← POST subscribe newsletter
/api/products              ← GET danh sách giải pháp
/api/cases                 ← GET case studies
```

## User Journey (B2B)

```
1. Discovery (Google SEO / Referral)
   ↓
2. Landing Page → Hiểu vấn đề (hàng giả) + giải pháp An Hà
   ↓
3. Xem Giải pháp → Chọn loại tem phù hợp ngành hàng
   ↓
4. Xem Công nghệ → Tin tưởng vào chất lượng kỹ thuật
   ↓
5. Xem Dự án → Social proof từ khách hàng đã dùng
   ↓
6. Liên hệ → Submit form → Sales team follow up
```

## Component Architecture

```
Layout
├── Header (Navigation + CTA "Nhận báo giá")
└── Footer (Links + Contact info + Certifications)

Pages
├── HomePage
│   ├── HeroSection (Headline + CTA + background video/image)
│   ├── ProblemSection (Thực trạng hàng giả ở VN)
│   ├── SolutionOverview (3 loại tem, icon cards)
│   ├── HowItWorksSection (3-step process)
│   ├── StatsSection (Số liệu ấn tượng: khách hàng, tem đã in...)
│   ├── TrustedBySection (Logo đối tác)
│   ├── TestimonialSection (Quote từ khách hàng)
│   └── CTASection (Final CTA + link Liên hệ)
│
├── GiaiPhapPage
│   ├── ProductHero
│   ├── ProductGrid (3 loại tem)
│   └── ProductCTA
│
├── CongNghePage
│   ├── TechHero
│   ├── TechFeatureList
│   └── SecurityCertificates
│
├── DuAnPage
│   ├── CaseStudyGrid
│   └── CaseStudyCard
│
├── VeChungToiPage
│   ├── CompanyStory
│   ├── TeamSection
│   └── CertificationsSection
│
└── LienHePage
    ├── ContactForm (B2B: Tên công ty, Ngành hàng, Số lượng, Email, Phone)
    └── ContactInfo (Địa chỉ, Hotline, Email)
```

## Data Models

```typescript
Contact {
  id, companyName, industry, quantity, email, phone,
  message, status (new/contacted/qualified/closed), createdAt
}

Product {
  id, name, slug, description, features[], useCases[], imageUrl
}

CaseStudy {
  id, title, slug, client, industry, challenge,
  solution, result, testimonial, imageUrl
}

Subscriber { id, email, createdAt }
```

## Sprint Plan

### Sprint 1 (Tuần 1-2): Foundation
- [TASK-001] Designer → Design system + tokens
- [TASK-002] Backend → Prisma schema + DB setup
- [TASK-003] Frontend → Layout (Header/Footer) + routing
- [TASK-004] Backend → /api/contact endpoint
- [TASK-005] Frontend → HomePage skeleton

### Sprint 2 (Tuần 3-4): Core Pages
- [TASK-006] Frontend → GiaiPhapPage + ProductCard component
- [TASK-007] Frontend → CongNghePage
- [TASK-008] Frontend → DuAnPage + CaseStudyCard
- [TASK-009] Backend → /api/cases + /api/products
- [TASK-010] Frontend → ContactForm + validation

### Sprint 3 (Tuần 5-6): Polish & Launch
- [TASK-011] Frontend → VeChungToiPage + LienHePage
- [TASK-012] Tester → E2E tests Playwright
- [TASK-013] Frontend → SEO metadata, OG tags
- [TASK-014] Tester → Lighthouse audit + performance fix
- [TASK-015] PM → Deployment to Vercel
