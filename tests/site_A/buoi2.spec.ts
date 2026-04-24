import { test, expect } from '@playwright/test';

test('Thực hành tự viết code Login - Site A', async ({ page }) => {
  // 1. Đi tới trang web [cite: 48]
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Nhập Username bằng Placeholder [cite: 53, 90]
  await page.getByPlaceholder('Username').fill('Admin');

  // 3. Nhập Password [cite: 53, 90]
  await page.getByPlaceholder('Password').fill('admin123');

  // 4. Click nút Login bằng Role [cite: 87, 90]
  await page.getByRole('button', { name: 'Login' }).click();

  // 5. Kiểm tra xem đã vào trang Dashboard chưa (Assertion) [cite: 10, 56]
  await expect(page).toHaveURL(/dashboard/);
});