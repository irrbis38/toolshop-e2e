import type { Locator, Page } from '@playwright/test';

export class CatalogPage {
  readonly productNames: Locator;
  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  readonly searchCaption: Locator;
  readonly searchResultCount: Locator;

  constructor(private readonly page: Page) {
    this.productNames = page.getByTestId('product-name');
    this.searchInput = page.getByTestId('search-query');
    this.searchSubmit = page.getByTestId('search-submit');
    this.searchCaption = page.getByTestId('search-caption');
    this.searchResultCount = page.getByTestId('search-result-count');
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
}
