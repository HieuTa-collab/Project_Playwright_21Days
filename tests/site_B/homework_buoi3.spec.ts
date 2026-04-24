import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
    await page.getByRole('link', { name: 'Log in' }).click();

  await expect(page).toHaveURL(/login/);

});

// Kịch bản 1: click button Computer
test('click button Computer', async ({ page }) => {
await page.locator('.block-category-navigation').getByRole('link', { name: 'Computers' }).click();
  await expect(page).toHaveURL(/computers/);
});

// Kịch bản 2: click button Apparel & Shoes và kiểm tra title
test('click button Apparel & Shoes', async ({ page }) => {

await page.locator('.block-category-navigation').getByRole('link', { name: 'Apparel & Shoes' }).click();

await expect(page).toHaveURL(/apparel-shoes/);
  await expect(page.locator('h1')).toHaveText('Apparel & Shoes');
});

