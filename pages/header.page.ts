import type { Locator, Page } from '@playwright/test';

export class Header {
  readonly navMenu: Locator;
  readonly navCart: Locator;
  readonly cartQuantity: Locator;

  constructor(page: Page) {
    this.navMenu = page.getByTestId('nav-menu');
    this.navCart = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
  }
}
