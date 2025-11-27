import { apiFetch } from './apiClient';

export interface OrderItem {
  product: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  _id: string;
  store: string;
  customer: string;
  items: OrderItem[];
  total: number;
  status: string;
}

export function createOrder(token: string, payload: { storeId: string; items: { productId: string; quantity: number }[] }) {
  return apiFetch<Order>('/orders', {
    method: 'POST',
    token,
    body: payload,
  });
}

export function listMyOrders(token: string) {
  return apiFetch<Order[]>('/orders/me', { token });
}

export function listStoreOrders(token: string) {
  return apiFetch<Order[]>('/orders/store', { token });
}


