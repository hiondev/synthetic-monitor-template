import { test, expect } from "@playwright/test";

test("HLT 2023 is alive", async ({ page }) => {
  await page.goto("https://www.hlt23.fi/");
  await page.getByRole("button", { name: "Aloita vastaaminen" }).click();
  await page.getByRole("button", { name: "Luo tunnus" }).click();
  await expect(page.getByRole("heading")).toHaveText("Luo käyttäjätunnus");
});
