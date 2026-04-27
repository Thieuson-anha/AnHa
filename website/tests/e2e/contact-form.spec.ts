import { test, expect } from "@playwright/test";

const VALID_FORM = {
  companyName: "Công ty Test TNHH",
  contactName: "Nguyễn Văn Test",
  email: "test@company.com",
  phone: "0901234567",
};

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lien-he");
  });

  // TC-002: Happy path
  test("submits valid form successfully", async ({ page }) => {
    await page.fill('[name="companyName"]', VALID_FORM.companyName);
    await page.selectOption('[name="industry"]', "thuc-pham");
    await page.selectOption('[name="estimatedQuantity"]', "10000-50000");
    await page.fill('[name="contactName"]', VALID_FORM.contactName);
    await page.fill('[name="phone"]', VALID_FORM.phone);
    await page.fill('[name="email"]', VALID_FORM.email);

    await page.click('button[type="submit"]');

    await expect(page.getByText("Gửi thành công!")).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("24 giờ làm việc")).toBeVisible();
  });

  // TC-003: Email validation error
  test("shows error for invalid email", async ({ page }) => {
    await page.fill('[name="companyName"]', VALID_FORM.companyName);
    await page.selectOption('[name="industry"]', "thuc-pham");
    await page.selectOption('[name="estimatedQuantity"]', "10000-50000");
    await page.fill('[name="contactName"]', VALID_FORM.contactName);
    await page.fill('[name="phone"]', VALID_FORM.phone);
    await page.fill('[name="email"]', "notanemail");

    await page.click('button[type="submit"]');

    await expect(page.getByText("Email không hợp lệ")).toBeVisible();
  });

  test("shows error for invalid Vietnamese phone", async ({ page }) => {
    await page.fill('[name="companyName"]', VALID_FORM.companyName);
    await page.selectOption('[name="industry"]', "thuc-pham");
    await page.selectOption('[name="estimatedQuantity"]', "10000-50000");
    await page.fill('[name="contactName"]', VALID_FORM.contactName);
    await page.fill('[name="phone"]', "12345");
    await page.fill('[name="email"]', VALID_FORM.email);

    await page.click('button[type="submit"]');

    await expect(page.getByText(/điện thoại/i)).toBeVisible();
  });
});
