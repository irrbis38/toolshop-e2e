import { test as setup, expect } from '../fixtures';
import { requireEnv } from '../utils/env';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page, loginPage, header }) => {
  await loginPage.open();
  const response = await loginPage.login(requireEnv('USER_EMAIL'), requireEnv('USER_PASSWORD'));
  expect(response.status()).toBe(200);

  await expect(page).toHaveURL(/\/account/);
  await expect(header.navMenu).toBeVisible();

  await page.context().storageState({ path: authFile });
});
