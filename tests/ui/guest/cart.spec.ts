import { test, expect } from '@fixtures';

test.describe('Корзина', () => {
  test(
    'Добавление товара в корзину',
    { tag: '@smoke' },
    async ({ catalogPage, productPage, cartPage, header }) => {
      await catalogPage.open();
      // Переходим на страницу товара
      const name = await catalogPage.openFirstProduct();
      await expect(productPage.name).toHaveText(name);

      const quantity = 1;

      await productPage.addToCart(quantity);
      await expect(header.cartQuantity).toHaveText(String(quantity));

      // Переходим в корзину после добавления товара
      await header.navCart.click();
      await expect(cartPage.quantityOf(name)).toHaveValue(String(quantity));
    },
  );

  test('Удаление товара из корзины', async ({ catalogPage, productPage, cartPage, header }) => {
    await catalogPage.open();
    const name = await catalogPage.openFirstProduct();
    await productPage.addToCart();
    await header.navCart.click();

    await expect(cartPage.rowFor(name)).toBeVisible();

    await cartPage.removeButtonOf(name).click();

    await expect(cartPage.rowFor(name)).toHaveCount(0);
    await expect(header.navCart).toBeHidden();
  });
});
