import type { Locator, Page } from '@playwright/test';

export class ProductPage {
  readonly name: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  constructor(private readonly page: Page) {
    this.name = page.getByRole('heading', { level: 1 });
    this.quantityInput = page.getByTestId('quantity');
    this.addToCartButton = page.getByTestId('add-to-cart');
  }

  async addToCart(quantity = 1): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.request().method() === 'POST' &&
        /^\/carts\/[^/]+$/.test(new URL(response.url()).pathname),
    );

    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
    await responsePromise;
  }
}
