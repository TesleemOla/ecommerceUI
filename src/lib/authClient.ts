import { apiFetch } from './apiClient';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export async function login(email: string, password: string) {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
}

export async function registerCustomer(payload: {
  email: string;
  password: string;
  fullName: string;
}) {
  return apiFetch('/auth/register/customer', {
    method: 'POST',
    body: payload,
  });
}

export async function registerStoreOwner(payload: {
  email: string;
  password: string;
  fullName: string;
}) {
  return apiFetch('/auth/register/store-owner', {
    method: 'POST',
    body: payload,
  });
}


