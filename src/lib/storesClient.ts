import { apiFetch } from './apiClient';

export interface Store {
  _id: string;
  name: string;
  description?: string;
  status: string;
}

export function listActiveStores() {
  return apiFetch<Store[]>('/stores');
}

export function listPendingStores(token: string) {
  return apiFetch<Store[]>('/stores/pending', { token });
}

export function approveStore(storeId: string, status: 'Approved' | 'Rejected', token: string) {
  return apiFetch<Store>(`/stores/${storeId}/status`, {
    method: 'PATCH',
    token,
    body: { status },
  });
}


