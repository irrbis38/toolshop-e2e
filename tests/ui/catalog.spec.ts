import { test, expect } from '../../fixtures';

test.describe('Каталог', () => {
  test.beforeEach(async ({ catalogPage }) => {
    await catalogPage.open();
  });

  test('Страница каталога содержит карточку товара', { tag: '@smoke' }, async ({ catalogPage }) => {
    await expect(catalogPage.productNames.first()).toBeVisible();
  });

  test.describe('Работа поиска в каталоге', () => {
    test('Находит существующий товар', { tag: '@smoke' }, async ({ catalogPage }) => {
      const query = 'hammer';
      await catalogPage.search(query);
      await expect(catalogPage.productNames.first()).toContainText(query, { ignoreCase: true });

      const names = await catalogPage.productNames.allTextContents();

      for (const name of names) {
        expect(name.toLowerCase()).toContain(query);
      }
    });

    test('Не находит несуществующий товар', async ({ catalogPage }) => {
      const query = 'zzzxxx';
      await catalogPage.search(query);
      await expect(catalogPage.searchCaption).toHaveText(`Searched for: ${query}`);
      await expect(catalogPage.productNames).toHaveCount(0);
    });
  });
});
