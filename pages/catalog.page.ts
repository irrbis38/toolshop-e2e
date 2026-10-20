import type { Locator, Page } from '@playwright/test';

export class CatalogPage {
  readonly productNames: Locator;
  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  readonly searchCaption: Locator;

  constructor(private readonly page: Page) {
    this.productNames = page.getByTestId('product-name');
    this.searchInput = page.getByTestId('search-query');
    this.searchSubmit = page.getByTestId('search-submit');
    this.searchCaption = page.getByTestId('search-caption');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  async search(query: string): Promise<void> {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes('/products/search') && response.ok(),
    );

    await this.searchInput.fill(query);
    await this.searchSubmit.click();
    await responsePromise;
  }

  async openFirstProduct(): Promise<string> {
    const card = this.page.getByRole('link').filter({ has: this.productNames }).first();
    const name = (await card.getByTestId('product-name').innerText()).trim();
    await card.click();
    return name;
  }
}
