import { expect, test } from "@playwright/test";

test("buton receives focus on click", async ({ page }) => {
  await page.goto("/examples/button");
  const button = await page.locator("role=button[name='Button']");
  await button.click();
  await expect(button).toBeFocused();
});
