import { test, expect } from '@playwright/test';

test.describe('Каталог', () => {
  test('Страница каталога содержит карточку товара', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('/');

    const productNames = page.getByTestId('product-name');

    await expect(productNames.first()).toBeVisible();
    await expect(productNames).not.toHaveCount(0);
  });
});
