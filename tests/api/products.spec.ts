import { expect, test } from '@playwright/test';
import type { ProductsPage } from './types';

test.describe('GET /products', () => {
  test('Возвращает не пустой список товаров', async ({ request }) => {
    const response = await request.get('/products');

    expect(response.status()).toBe(200);

    const body: ProductsPage = await response.json();

    expect(body.current_page).toBe(1);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data.length).toBeLessThanOrEqual(body.per_page);

    expect(body.data[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
      in_stock: expect.any(Boolean),
      category: { name: expect.any(String) },
      brand: { name: expect.any(String) },
    });
  });
});
