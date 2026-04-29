import { test, expect } from '@playwright/test';

test.beforeEach('herokuapp page', async ({ page }) => {
    //vao page https://the-internet.herokuapp.com/
    await page.goto('https://the-internet.herokuapp.com/');

    await page.getByText('Welcome to the-internet').isVisible();

});

test('check A/B Testing', async ({ page }) => {
    //click vào link "A/B Testing"
    await page.getByRole('link', { name: 'A/B Testing' }).click()
    
    await expect(page).toHaveURL(/abtest/);
});

test('check Add/Remove Elements', async ({ page }) => {
    //click vào link "Add/Remove Elements"
await page.getByRole('link', { name: 'Add/Remove Elements' }).click();

    await expect(page).toHaveURL(/add_remove_elements/);

    //Click vào button "Add Element" lần 1
    await page.getByRole('button', { name: 'Add Element' }).click();

    await expect(page.getByRole('button', { name: 'Delete' })).toBeVisible();

    //Click vào button "Add Element" lần 2
    await page.getByRole('button', { name: 'Add Element' }).click();

    //Kiểm tra xem có 2 button "Delete" không
    await expect(page.getByRole('button', { name: 'Delete' })).toHaveCount(2);


    });

   //kiểm tra số lượng button "Delete" có phải là 5 không;
   test ('check Add/Remove Elements - 5 Delete buttons', async ({ page }) => {

    const numOfClicks = 5;
    const addButton = page.getByRole('button', { name: 'Add Element' });
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    await page.getByRole('link', { name: 'Add/Remove Elements' }).click();

for (let i = 0; i < numOfClicks; i++) {
    await addButton.click();
    console.log(`Đã click Add Element ${i + 1} lần`);
    await page.waitForTimeout(200); // Đợi một chút để nút Delete kịp render); 
  }

    // 4. Quản lý và Verify số lượng hiển thị
  const actualCount = await deleteButtons.count(); // Đếm số nút thực tế [cite: 656]
  
  console.log(`Số lượng nút Delete hiện tại là: ${actualCount}`);


//dùng lệnh expect chuyên dụng của Playwright cho locator
  await expect(deleteButtons).toHaveCount(numOfClicks); //   

 //clicj button "Delete" lần lượt cho đến khi hết 
 for(let i = 0; i < numOfClicks; i++) {
    await deleteButtons.first().click(); // Click nút Delete đầu tiên trong danh sách
    console.log(`Đã click Delete ${i + 1} lần`);
        await page.waitForTimeout(200); // Đợi một chút để nút Delete kịp render); 

  }

  // Kiểm tra xem có còn nút "Delete" nào không
  await expect(deleteButtons).toHaveCount(0); // Đảm bảo không còn nút Delete nào hiển thị
console.log('✅ Đã xóa hết tất cả các nút Delete');    
});


//xử lý checkbox
test('check Checkboxes', async ({ page }) => {
    //click vào link "Checkboxes"
    await page.getByRole('link', { name: 'Checkboxes' }).click();

    await expect(page).toHaveURL(/checkboxes/);

    //Kiểm tra xem có 2 checkbox không
    const count = await page.getByRole('checkbox').count();
    expect(count).toBe(2);  
    console.log(`Số lượng checkbox: ${count}`);

    //click checkbox 1
 await page.getByRole('checkbox').nth(0).check();

    //Kiểm tra xem checkbox 1 đã được chọn chưa
    await expect(page.getByRole('checkbox').nth(0)).toBeChecked();
    console.log('Checkbox 1 đã được chọn');

    //checck checkbox 2, nếu checkbox 2 đã dc checck thì bỏ check, nếu chưa được check thì check
    const checkbox2 = page.getByRole('checkbox').nth(1);
    
    if (await checkbox2.isChecked()) {
        console.log('Checkbox 2 đã được chọn, sẽ bỏ chọn');

        await checkbox2.uncheck();
        await expect(checkbox2).not.toBeChecked();
        console.log('Checkbox 2 đã được bỏ chọn');
    } else {
        console.log('Checkbox 2 chưa được chọn, sẽ chọn');

        await checkbox2.check();
        await expect(checkbox2).toBeChecked();
        console.log('Checkbox 2 đã được chọn'); 
    }
    });

    //xử ly Dropdown
    test('check Dropdown', async ({ page }) => {
        //click vào link "Dropdown"
        await page.getByRole('link', { name: 'Dropdown' }).click();

        // await expect(page).toHaveURL(/dropdown/);
