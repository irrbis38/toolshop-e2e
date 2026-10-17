import type { Locator, Page } from '@playwright/test';

export class Header {
  readonly navMenu: Locator;

  constructor(page: Page) {
    this.navMenu = page.getByTestId('nav-menu');
  }
}
