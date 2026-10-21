import { expect, type APIRequestContext } from '@playwright/test';
import type { Product, ProductsPage } from './types';

export async function getFirstProduct(request: APIRequestContext): Promise<Product> {
  const response = await request.get('/products');
  expect(response.status()).toBe(200);

  const { data }: ProductsPage = await response.json();
  const [first] = data;
  if (!first) {
    throw new Error('Список продуктов пуст, нечего сравнивать.');
  }
  return first;
}
