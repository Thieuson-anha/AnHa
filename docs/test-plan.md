# Test Plan - An Hà
> Tác giả: Tester Agent | Sprint 2

## Test Strategy

### Phạm vi test
1. Unit tests: Components, API handlers, validation schemas
2. Integration tests: API endpoints với DB
3. E2E tests: Luồng người dùng chính
4. Performance: Lighthouse audit
5. Accessibility: axe-core audit

## Test Cases

### TC-001: Trang chủ load thành công
- **Type**: E2E
- **Priority**: Critical
- **Steps**: Navigate to /
- **Expected**: Status 200, hero section visible, nav links present

### TC-002: Submit form liên hệ - Happy path
- **Type**: E2E
- **Priority**: Critical
- **Steps**:
  1. Navigate to /lien-he
  2. Fill: companyName="Test Corp", industry="thuc-pham", email="test@test.com", phone="0901234567", contactName="Test User", quantity="10000-50000"
  3. Click "Gửi yêu cầu"
- **Expected**: Success message hiện, form cleared

### TC-003: Submit form liên hệ - Validation errors
- **Type**: E2E
- **Priority**: High
- **Steps**: Submit form với email sai format "notanemail"
- **Expected**: Error message "Email không hợp lệ" xuất hiện dưới field

### TC-004: Mobile responsive - Header
- **Type**: E2E
- **Priority**: High
- **Steps**: Viewport 375x812, navigate to /
- **Expected**: Hamburger menu visible, desktop nav hidden

### TC-005: Navigation links hoạt động
- **Type**: E2E
- **Priority**: High
- **Steps**: Click từng link nav: Giải pháp, Công nghệ, Dự án, Về chúng tôi, Liên hệ
- **Expected**: Mỗi link navigate đúng route, no 404

### TC-006: API /api/contact - Valid request
- **Type**: Integration
- **Priority**: Critical
- **Expected**: 201, success:true, email được gửi

### TC-007: API /api/contact - Invalid phone
- **Type**: Integration
- **Priority**: High
- **Expected**: 400, errors.phone present

### TC-008: API /api/contact - Rate limit
- **Type**: Integration
- **Priority**: Medium
- **Steps**: Send 6 requests cùng IP trong 1 giờ
- **Expected**: 6th request trả về 429

### TC-009: SEO - Meta tags
- **Type**: Unit/Snapshot
- **Priority**: High
- **Check**: title, description, og:title, og:description, og:image trên mỗi page

### TC-010: Lighthouse Performance
- **Type**: Performance
- **Priority**: High
- **Target**: Performance ≥ 90, Accessibility ≥ 90, SEO = 100, Best Practices ≥ 90

## E2E Test Files
```
tests/e2e/
├── home.spec.ts
├── contact-form.spec.ts
├── navigation.spec.ts
├── responsive.spec.ts
└── seo.spec.ts
```

## Unit Test Files
```
src/
├── components/__tests__/ContactForm.test.tsx
├── components/__tests__/ProductCard.test.tsx
├── app/api/contact/__tests__/route.test.ts
└── lib/__tests__/validation.test.ts
```
