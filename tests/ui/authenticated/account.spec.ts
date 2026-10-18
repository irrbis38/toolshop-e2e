import { test, expect } from '@fixtures';
import { requireEnv } from '@utils/env';

test('Залогиненный пользователь видит своё имя в шапке', async ({ page, header }) => {
  await page.goto('/account');

  await expect(header.navMenu).toHaveText(requireEnv('USER_NAME'));
});
