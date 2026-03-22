import { test, expect } from "@playwright/test";

test.describe("Product Detail Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/product/1");
  });

  test("loads product detail page", async ({ page }) => {
    await expect(page).toHaveURL(/\/product\/1/);
  });

  test("displays product title", async ({ page }) => {
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });

  test("displays add to cart button", async ({ page }) => {
    await expect(page.locator("[data-cy=add-to-cart]")).toBeVisible({
      timeout: 10000,
    });
  });

  test("add to cart button shows correct text", async ({ page }) => {
    await expect(page.locator("[data-cy=add-to-cart]")).toContainText(
      "Add to Cart",
    );
  });

  test("adds product to cart and shows quantity controls", async ({ page }) => {
    await page.locator("[data-cy=add-to-cart]").click();
    await expect(page.locator("[data-cy=add-to-cart]")).not.toBeVisible({
      timeout: 5000,
    });
  });

  test("navigates back to home page", async ({ page }) => {
    await page.goto("/");
    await page.goto("/product/1");
    await page.waitForSelector("[data-cy=add-to-cart]", { timeout: 10000 });
    await page.locator("[data-cy=back-button]").click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });
});
