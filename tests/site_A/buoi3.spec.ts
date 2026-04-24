import { test, expect } from '@playwright/test';

// Hàm này sẽ chạy trước TẤT CẢ các test() bên dưới
test.beforeEach(async ({ page }) => {
  // 1. Đi tới trang Login
  await page.goto('https://opensource-demo.orangehrmlive.com/');

  // 2. Thực hiện các bước đăng nhập
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Đảm bảo đã vào được trang Dashboard rồi mới làm việc khác
  await expect(page).toHaveURL(/dashboard/);
});

// Kịch bản 1: Kiểm tra trang PIM
test('Kiểm tra danh sách nhân viên PIM', async ({ page }) => {
    // 1. Click vào menu PIM
    await page.getByRole('link', { name: 'PIM' }).click();

    // 2. Kiểm tra xem có thấy text "Employee List" không
  await expect(page).toHaveURL(/pim\/viewEmployeeList/);

});

// Kịch bản 2: Kiểm tra trang Admin
test('Kiểm tra trang Admin', async ({ page }) => {
    // 1. Click vào menu Admin
    await page.getByRole('link', { name: 'Admin' }).click();
    
    // 2. Kiểm tra xem có thấy text "System Users" không
  await expect(page).toHaveURL(/admin\/viewSystemUsers/);
});

// Kịch bản 3: Chọn checkbox của nhân viên đầu tiên trong danh sách
test('Chọn checkbox của nhân viên đầu tiên trong danh sách PIM', async ({ page }) => {
   // Đi tới trang danh sách nhân viên
  await page.getByRole('link', { name: 'PIM' }).click();

  const targetName = 'Brown'; // Tên bạn muốn tìm

  // 1. Xác định Locator của hàng chứa tên [cite: 261]
  const row = page.getByRole('row').filter({ hasText: targetName });

  // 2. Tùy chọn cuộn xuống cuối trang (để đảm bảo load hết bảng nếu cần)
  await page.keyboard.press('End');
  
  // Đợi một chút để dữ liệu (nếu có) kịp render
  await page.waitForTimeout(1000); 

  // 3. Kiểm tra xem hàng đó có tồn tại không bằng .count()
  const rowCount = await row.count();

  if (rowCount > 0) {
    // NẾU TÌM THẤY:
    // Cuộn màn hình đến chính xác vị trí của hàng đó
    await row.scrollIntoViewIfNeeded();
    
    // Tìm cái Checkbox nằm bên trong hàng đó và .check() [cite: 262]
    await row.locator('.oxd-checkbox-input').check();
    
    console.log(`✅ Đã tìm thấy và chọn user: ${targetName}`);
    
    // Kiểm tra kết quả
    await expect(row.locator('.oxd-checkbox-input')).toBeChecked();
  } else {
    // NẾU KHÔNG TÌM THẤY:
    console.log(`User is not found: ${targetName}`);
  }
});