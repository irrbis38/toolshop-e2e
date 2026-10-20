import { test as base } from '@playwright/test';
import { CatalogPage } from '@pages/catalog.page';
import { CartPage } from '@pages/cart.page';
import { Header } from '@pages/header.page';
import { LoginPage } from '@pages/login.page';
import { ProductPage } from '@pages/product.page';

type Fixtures = {
  header: Header;
  loginPage: LoginPage;
  catalogPage: CatalogPage;
  productPage: ProductPage;
  cartPage: CartPage;
};

export const test = base.extend<Fixtures>({
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
