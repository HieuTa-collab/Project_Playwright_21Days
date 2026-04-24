import { test, expect } from '@playwright/test';

test('Thực hành tự viết code Login - Site B', async ({ page }) => {
  // 1. Đi tới trang web [cite: 48]
  await page.goto('https://demowebshop.tricentis.com/');

    // 2. click search store text field 
    await page.locator('#small-searchterms').fill('Build your own computer');

    // 3. press enter
    await page.locator('#small-searchterms').press('Enter');

    //verify results
    await expect(page.getByText('Build your own computer')).toBeVisible();

  });