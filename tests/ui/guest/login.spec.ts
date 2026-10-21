import { test, expect } from '@fixtures';

test.describe('Авторизация', () => {
  test(
    'Вход с несуществующим email и неверным паролем отклоняется',
    { tag: '@smoke' },
    async ({ loginPage }) => {
      const unknownEmail = 'no-such-user@example.com';
      const wrongPassword = 'wrong-password';

      await loginPage.open();
      const response = await loginPage.login(unknownEmail, wrongPassword);

      expect(response.status()).toBe(401);
      await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
    },
  );
});
