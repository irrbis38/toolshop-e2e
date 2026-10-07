import { test, expect } from '../../fixtures';

test.describe('Каталог', () => {
  test.beforeEach(async ({catalogPage}) => {
    await catalogPage.open();
  })

  test('Страница каталога содержит карточку товара', { tag: '@smoke' }, async ({ catalogPage }) => {
    await expect(catalogPage.productNames.first()).toBeVisible();
    await expect(catalogPage.productNames).not.toHaveCount(0);
  });
});
