import { test, expect } from "@playwright/test";

test.describe("Cart Page", () => {
  test.beforeEach(async ({ page }) => {
    // Add product to cart first
    await page.goto("/product/1");
    await page.locator("[data-cy=add-to-cart]").click({ timeout: 10000 });
    await page.goto("/cart");
  });

  test("loads the cart page", async ({ page }) => {
    await expect(page).toHaveURL(/\/cart/);
  });

  test("displays added item in cart", async ({ page }) => {
    await expect(
      page.locator("[data-cy=remove-from-cart]").first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test("removes item from cart", async ({ page }) => {
    await page.locator("[data-cy=remove-from-cart]").first().click();
    await expect(page.getByText("Your cart is empty")).toBeVisible();
  });

  test("continue shopping navigates to home", async ({ page }) => {
    await page.getByText("Continue Shopping").click();
    await expect(page).toHaveURL("http://localhost:3000/");
  });

  test("displays order summary", async ({ page }) => {
    await expect(page.getByText("Order Summary")).toBeVisible();
  });
});
