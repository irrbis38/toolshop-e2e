import { expect, test } from '@playwright/test';
import { requireEnv } from '@utils/env';
import type { LoginResponse } from './types';

test.describe('POST /users/login', () => {
  test('возвращает токен при верных учётных данных', async ({ request }) => {
    const response = await request.post('/users/login', {
      data: {
        email: requireEnv('USER_EMAIL'),
        password: requireEnv('USER_PASSWORD'),
      },
    });

    expect(response.status()).toBe(200);

    const body: LoginResponse = await response.json();

    expect(body.access_token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
    expect(body.token_type).toBe('bearer');
    expect(body.expires_in).toBeGreaterThan(0);
  });
});
