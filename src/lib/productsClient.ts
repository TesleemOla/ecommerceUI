import { apiFetch } from './apiClient';

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  store: string;
}

export function listProducts(storeId?: string) {
  const query = storeId ? `?storeId=${encodeURIComponent(storeId)}` : '';
  return apiFetch<Product[]>(`/products${query}`);
}


