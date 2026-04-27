# E2E Tests & Unit Tests - Dự án An Hà

## 1. Playwright E2E - Contact Form (`tests/e2e/contact-form.spec.ts`)

```typescript
import { test, expect, Page } from '@playwright/test';

// ─────────────────────────────────────────────
// Helpers & Fixtures
// ─────────────────────────────────────────────

const CONTACT_URL = '/lien-he';

/** Dữ liệu hợp lệ cho happy-path (TC-002) */
const VALID_FORM_DATA = {
  companyName: 'Test Corp',
  industry:    'thuc-pham',        // value của <select>
  email:       'test@test.com',
  phone:       '0901234567',
  contactName: 'Test User',
  quantity:    '10000-50000',      // value của <select>/<radio>
  message:     'Yêu cầu báo giá', // optional field
} as const;

/**
 * Điền toàn bộ form liên hệ.
 * Tách ra helper để tái sử dụng giữa các test case.
 */
async function fillContactForm(
  page: Page,
  overrides: Partial<typeof VALID_FORM_DATA> = {},
): Promise<void> {
  const data = { ...VALID_FORM_DATA, ...overrides };

  await page.getByLabel(/tên công ty/i).fill(data.companyName);
  await page.getByLabel(/họ tên người liên hệ/i).fill(data.contactName);
  await page.getByLabel(/ngành hàng/i).selectOption(data.industry);
  await page.getByLabel(/email/i).fill(data.email);
  await page.getByLabel(/số điện thoại/i).fill(data.phone);

  // Quantity có thể là <select> hoặc radio group
  const quantitySelect = page.getByLabel(/số lượng/i);
  const tagName = await quantitySelect.evaluate((el) =>
    el.tagName.toLowerCase(),
  );
  if (tagName === 'select') {
    await quantitySelect.selectOption(data.quantity);
  } else {
    await page
      .getByRole('radio', { name: new RegExp(data.quantity, 'i') })
      .check();
  }

  if (data.message) {
    const messageField = page.getByLabel(/ghi chú|tin nhắn/i);
    if (await messageField.isVisible()) {
      await messageField.fill(data.message);
    }
  }
}

// ─────────────────────────────────────────────
// Test Suite
// ─────────────────────────────────────────────

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(CONTACT_URL);
    // Đảm bảo form đã render xong
    await expect(
      page.getByRole('heading', { name: /liên hệ/i }),
    ).toBeVisible();
  });

  // ───────────────────────────────────────────
  // TC-002: Happy path – submit thành công
  // ───────────────────────────────────────────
  test('TC-002: submit form hợp lệ → hiện success message, clear form', async ({
    page,
  }) => {
    // Intercept API để không phụ thuộc vào backend thật
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status:      201,
        contentType: 'application/json',
        body:        JSON.stringify({ success: true }),
      });
    });

    await fillContactForm(page);

    // Chụp snapshot trước khi submit để so sánh sau
    const submitBtn = page.getByRole('button', { name: /gửi yêu cầu/i });
    await expect(submitBtn).toBeEnabled();
    await submitBtn.click();

    // ── Assertions: Loading state ──────────────
    await expect(submitBtn).toBeDisabled(); // button disabled khi đang gửi

    // ── Assertions: Success state ──────────────
    const successMessage = page.getByRole('alert').filter({
      hasText: /thành công|chúng tôi sẽ liên hệ|cảm ơn/i,
    });
    await expect(successMessage).toBeVisible({ timeout: 5_000 });

    // ── Assertions: Form đã được reset ─────────
    await expect(page.getByLabel(/tên công ty/i)).toHaveValue('');
    await expect(page.getByLabel(/email/i)).toHaveValue('');
    await expect(page.getByLabel(/số điện thoại/i)).toHaveValue('');

    // ── Accessibility: success message có role=alert ─
    await expect(successMessage).toHaveAttribute('role', 'alert');
  });

  // ───────────────────────────────────────────
  // TC-002b: Verify request payload đúng format
  // ───────────────────────────────────────────
  test('TC-002b: payload gửi lên API đúng schema', async ({ page }) => {
    let capturedBody: Record<string, unknown> = {};

    await page.route('**/api/contact', async (route) => {
      const request = route.request();
      capturedBody = JSON.parse(request.postData() ?? '{}');

      await route.fulfill({
        status:      201,
        contentType: 'application/json',
        body:        JSON.stringify({ success: true }),
      });
    });

    await fillContactForm(page);
    await page.getByRole('button', { name: /gửi yêu cầu/i }).click();

    // Đợi request được gửi
    await page.waitForResponse('**/api/contact');

    expect(capturedBody).toMatchObject({
      companyName:  VALID_FORM_DATA.companyName,
      email:        VALID_FORM_DATA.email,
      phone:        VALID_FORM_DATA.phone,
      contactName:  VALID_FORM_DATA.contactName,
      industry:     VALID_FORM_DATA.industry,
      quantity:     VALID_FORM_DATA.quantity,
    });
  });

  // ───────────────────────────────────────────
  // TC-003: Email sai format → validation error
  // ───────────────────────────────────────────
  test('TC-003: email không hợp lệ → hiện error message', async ({
    page,
  }) => {
    // Mock để chắc chắn API không được gọi
    let apiCalled = false;
    await page.route('**/api/contact', () => {
      apiCalled = true;
    });

    await fillContactForm(page, { email: 'notanemail' });
    await page.getByRole('button', { name: /gửi yêu cầu/i }).click();

    // ── Error message phải xuất hiện dưới field email ──
    const emailField   = page.getByLabel(/email/i);
    const emailWrapper = emailField.locator('xpath=ancestor::div[1]');
    const errorMsg     = emailWrapper.getByText(/email không hợp lệ/i);

    await expect(errorMsg).toBeVisible();

    // ── Email field phải có aria-invalid ──────────────
    await expect(emailField).toHaveAttribute('aria-invalid', 'true');

    // ── API KHÔNG được gọi khi validation fail ─────────
    expect(apiCalled).toBe(false);
  });

  // ───────────────────────────────────────────
  // TC-003b: Các field required bị bỏ trống
  // ───────────────────────────────────────────
  test('TC-003b: submit form trống → hiện tất cả required errors', async ({
    page,
  }) => {
    await page.getByRole('button', { name: /gửi yêu cầu/i }).click();

    // Tất cả required fields phải có error
    const requiredErrors = [
      /tên công ty.*bắt buộc|bắt buộc.*tên công ty/i,
      /email.*bắt buộc|bắt buộc.*email/i,
      /số điện thoại.*bắt buộc|bắt buộc.*điện thoại/i,
    ];

    for (const pattern of requiredErrors) {
      await expect(page.getByText(pattern).first()).toBeVisible();
    }
  });

  // ───────────────────────────────────────────
  // TC-003c: Phone sai format
  // ───────────────────────────────────────────
  test('TC-003c: số điện thoại sai format → error message', async ({
    page,
  }) => {
    await fillContactForm(page, { phone: '123' }); // quá ngắn
    await page.getByRole('button', { name: /gửi yêu cầu/i }).click();

    const phoneField   = page.getByLabel(/số điện thoại/i);
    const phoneWrapper = phoneField.locator('xpath=ancestor::div[1]');

    await expect(
      phoneWrapper.getByText(/số điện thoại không hợp lệ/i),
    ).toBeVisible();
    await expect(phoneField).toHaveAttribute('aria-invalid', 'true');
  });

  // ───────────────────────────────────────────
  // TC-API-500: API trả về 500 → error toast
  // ───────────────────────────────────────────
  test('API 500 → hiện thông báo lỗi server cho người dùng', async ({
    page,
  }) => {
    await page.route('**/api/contact', async (route) => {
      await route.fulfill({
        status:      500,
        contentType: 'application/json',
        body:        JSON.stringify({ error: 'Internal Server Error' }),
      });
    });

    await fillContactForm(page);
    await page.getByRole('button', { name: /gửi yêu cầu/i }).click();

    await expect(
      page.getByText(/lỗi|thử lại|không thể gửi/i).first(),
    ).toBeVisible({ timeout: 5_000 });

    // Form KHÔNG bị reset khi lỗi (user có thể retry)
    await expect(page.getByLabel(/tên công ty/i)).toHaveValue(
      VALID_FORM_DATA.companyName,
    );
  });
});
```

---

## 2. Playwright E2E - Navigation (`tests/e2e/navigation.spec.ts`)

```typescript
import { test, expect, Page } from '@playwright/test';

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

interface NavLink {
  label:        string;   // text hiển thị trên nav
  expectedPath: string;   // path mong đợi sau khi click
  headingRegex: RegExp;   // heading đặc trưng của page đó
}

const NAV_LINKS: NavLink[] = [
  {
    label:        'Giải pháp',
    expectedPath: '/giai-phap',
    headingRegex: /giải pháp|tem chống hàng giả/i,
  },
  {
    label:        'Công nghệ',
    expectedPath: '/cong-nghe',
    headingRegex: /công nghệ|bảo mật/i,
  },
  {
    label:        'Dự án',
    expectedPath: '/du-an',
    headingRegex: /dự án|case study|thực tế/i,
  },
  {
    label:        'Về chúng tôi',
    expectedPath: '/ve-chung-toi',
    headingRegex: /về chúng tôi|an hà/i,
  },
  {
    label:        'Liên hệ',
    expectedPath: '/lien-he',
    headingRegex: /liên hệ|contact/i,
  },
];

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Click nav link trên desktop (ẩn hamburger) */
async function clickDesktopNav(page: Page, label: string): Promise<void> {
  await page
    .locator('nav')
    .getByRole('link', { name: label, exact: true })
    .click();
}

/** Mở mobile menu rồi click link */
async function clickMobileNav(page: Page, label: string): Promise<void> {
  const hamburger = page.getByRole('button', {
    name: /menu|hamburger|toggle nav/i,
  });
  await hamburger.click();
  await page
    .getByRole('navigation')
    .getByRole('link', { name: label, exact: true })
    .click();
}

// ─────────────────────────────────────────────
// Test Suite
// ─────────────────────────────────────────────

test.describe('Navigation', () => {
  // ───────────────────────────────────────────
  // TC-005: Desktop nav links
  // ───────────────────────────────────────────
  test.describe('Desktop (1280px)', () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('nav')).toBeVisible();
    });

    for (const link of NAV_LINKS) {
      // Playwright chạy từng link như test độc lập
      test(`TC-005: click "${link.label}" → navigate đúng route, không 404`, async ({
        page,
      }) => {
        await clickDesktopNav(page, link.label);

        // ── URL đúng ──────────────────────────────────
        await expect(page).toHaveURL(new RegExp(link.expectedPath));

        // ── Không có lỗi 404 ─────────────────────────
        const response = await page.waitForResponse(
          (res) => res.url().includes(link.expectedPath),
        ).catch(() => null); // graceful nếu Next.js dùng SPA nav

        if (response) {
          expect(response.status()).not.toBe(404);
        }

        // ── Page có heading nhận diện được ────────────
        await expect(
          page.getByRole('heading', { name: link.headingRegex }).first(),
        ).toBeVisible({ timeout: 5_000 });

        // ── Link active được highlight ─────────────────
        const activeLink = page
          .locator('nav')
          .getByRole('link', { name: link.label, exact: true });
        const ariaCurrentOrClass = await activeLink.evaluate((el) => {
          return (
            el.getAttribute('aria-current') === 'page' ||
            el.classList.contains('active') ||
            el.classList.contains('text-primary') // tuỳ design system
          );
        });
        expect(ariaCurrentOrClass).toBe(true);
      });
    }

    test('TC-005-CTA: nút "Nhận báo giá" → redirect đến /lien-he', async ({
      page,
    }) => {
      await page
        .getByRole('link',