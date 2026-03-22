import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads the home page", async ({ page }) => {
    await expect(page.getByText("All Products")).toBeVisible();
  });

  test("displays product cards", async ({ page }) => {
    await expect(page.locator("[data-cy=product-card]").first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("displays category filter buttons", async ({ page }) => {
    await expect(page.locator("[data-cy=category-filter]").first()).toBeVisible(
      { timeout: 10000 },
    );
  });

  test("filters by category and updates URL", async ({ page }) => {
    await page.locator("[data-cy=category-filter]").first().click();
    await expect(page).toHaveURL(/category=/);
  });

  test("filters persist on page refresh", async ({ page }) => {
    await page.locator("[data-cy=category-filter]").first().click();
    await page.reload();
    await expect(page).toHaveURL(/category=/);
  });

  test("navigates to product detail on card click", async ({ page }) => {
    await page.locator("[data-cy=product-card]").first().click();
    await expect(page).toHaveURL(/\/product\//);
  });
});
