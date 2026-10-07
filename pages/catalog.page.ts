import type { Locator, Page } from '@playwright/test';

export class CatalogPage {
  readonly productNames: Locator;

  constructor(private readonly page: Page) {
    this.productNames = page.getByTestId('product-name');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  productCard(name: string): Locator {
    return this.page
      .getByRole('link')
      .filter({ has: this.page.getByTestId('product-name') })
      .filter({ hasText: name });
  }
}
