import { test, expect } from "@playwright/test";

test.describe("Universities Search Filter", () => {
  test("filters universities by name and country", async ({ page }) => {
    // Navigate to your application's page
    await page.goto("/");

    const loginButton = page.locator('button:has-text("Login")');
    await loginButton.click();
    await expect(page.locator("text=Log out")).toBeVisible;

    const nameInput = page.locator('input[placeholder="University name"]');
    const countryInput = page.locator('input[placeholder="Country"]');
    const searchButton = page.locator("text=Retry");

    // Fill the search inputs
    await nameInput.fill("Veer Kunwar");
    await countryInput.fill("India");

    // Click the search button
    await searchButton.click();

    // Wait for the results to be displayed
    await expect(
      page.locator("text=Veer Kunwar Singh University")
    ).toBeVisible();

    await expect(page.locator("text=India")).toBeVisible();
  });
});
