import { expect, test } from "@playwright/test";

test("popover is positioned correctly", async ({ page }, testInfo) => {
  testInfo.snapshotSuffix = "";
  await page.goto("/examples/combobox-textarea");

  const textarea = await page.locator("role=combobox[name='Comment']");
  await textarea.click({ position: { x: 10, y: 10 } });
  await textarea.type("Hello @a");

  const popover = await page.locator(".popover[role='listbox']");
  await expect(popover).toBeVisible();

  expect(await textarea.screenshot()).toMatchSnapshot();

  await textarea.type("\n\n\n\n\n\n\n\n\n\n");
  await textarea.press("ArrowUp");
  await textarea.press("ArrowUp");
  await textarea.press("ArrowUp");
  await textarea.press("ArrowUp");
  await textarea.type("@");

  expect(await textarea.screenshot()).toMatchSnapshot();

  await page.mouse.wheel(0, -50);
  await page.waitForTimeout(250);

  expect(await textarea.screenshot()).toMatchSnapshot();
});
