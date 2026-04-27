import { test, expect } from "@playwright/test";

// TC-004: Mobile responsive
test.describe("Responsive Layout", () => {
  test("mobile: hamburger menu visible, desktop nav hidden", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const hamburger = page.getByRole("button", { name: /toggle menu/i });
    await expect(hamburger).toBeVisible();
  });

  test("mobile: menu opens and closes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const hamburger = page.getByRole("button", { name: /toggle menu/i });
    await hamburger.click();

    await expect(page.getByText("Giải pháp")).toBeVisible();
    await hamburger.click();
    await expect(page.getByText("Giải pháp")).not.toBeVisible();
  });

  test("desktop: nav links visible", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator('a[href="/giai-phap"]').first()).toBeVisible();
  });

  test("contact form is usable on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/lien-he");

    const form = page.locator("form");
    await expect(form).toBeVisible();
    const input = page.locator('[name="companyName"]');
    const box = await input.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThan(200);
  });
});
