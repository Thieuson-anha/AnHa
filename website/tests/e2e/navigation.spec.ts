import { test, expect } from "@playwright/test";

const NAV_ROUTES = [
  { href: "/giai-phap", label: "Giải pháp" },
  { href: "/cong-nghe", label: "Công nghệ" },
  { href: "/du-an", label: "Dự án" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
  { href: "/lien-he", label: "Liên hệ" },
];

test.describe("Navigation", () => {
  // TC-001
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/An Hà/);
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByText("Bảo vệ thương hiệu")).toBeVisible();
  });

  // TC-005
  test("all nav links navigate correctly", async ({ page }) => {
    for (const route of NAV_ROUTES) {
      await page.goto("/");
      await page.click(`a[href="${route.href}"]`);
      await expect(page).not.toHaveURL(/404/);
      await expect(page.getByRole("main")).toBeVisible();
    }
  });

  test("logo navigates to home", async ({ page }) => {
    await page.goto("/lien-he");
    await page.click('a[href="/"]');
    await expect(page).toHaveURL("/");
  });

  test("CTA button in nav goes to contact page", async ({ page }) => {
    await page.goto("/");
    await page.click('a[href="/lien-he"]:has-text("Nhận báo giá")');
    await expect(page).toHaveURL("/lien-he");
  });
});
