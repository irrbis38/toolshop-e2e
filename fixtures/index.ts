import { test as base } from '@playwright/test';
import { CatalogPage } from '@pages/catalog.page';
import { LoginPage } from '@pages/login.page';
import { Header } from '@pages/pages.header';

type Fixtures = {
  catalogPage: CatalogPage;
  loginPage: LoginPage;
  header: Header;
};

export const test = base.extend<Fixtures>({
  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page);
    await use(catalogPage);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  header: async ({ page }, use) => {
    await use(new Header(page));
  },
});

export { expect } from '@playwright/test';
