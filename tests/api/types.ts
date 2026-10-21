export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  in_stock: boolean;
  category: { id: string; name: string; slug: string };
  brand: { id: string; name: string };
}

export interface ProductsPage {
  current_page: number;
  data: Product[];
  per_page: number;
  last_page: number;
  total: number;
}
