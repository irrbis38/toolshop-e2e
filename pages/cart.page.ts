import type { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  rowFor(name: string): Locator {
    return this.page
      .getByRole('row')
      .filter({ has: this.page.getByTestId('product-title').filter({ hasText: name }) });
  }

  quantityOf(name: string): Locator {
    return this.rowFor(name).getByTestId('product-quantity');
  }

  removeButtonOf(name: string): Locator {
    return this.rowFor(name).locator('a.btn-danger');
  }
}
