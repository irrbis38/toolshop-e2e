import { expect, test } from '@playwright/test';
import { getFirstProduct } from './helpers';
import type { Product, ProductsPage } from './types';

test.describe('GET /products', () => {
  test('GET /products, возвращает не пустой список товаров', async ({ request }) => {
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

  test('GET /products/{id}, возвращает корректный товар', async ({ request }) => {
    const listed = await getFirstProduct(request);

    const response = await request.get(`/products/${listed.id}`);
    expect(response.status()).toBe(200);

    const product: Product = await response.json();

    expect(product).toMatchObject({
      id: listed.id,
      name: listed.name,
      description: listed.description,
      price: listed.price,
      in_stock: listed.in_stock,
      category: { name: listed.category.name },
      brand: { name: listed.brand.name },
    });
  });
});
