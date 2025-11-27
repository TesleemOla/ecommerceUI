const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';

export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface ApiOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
  cache?: RequestCache;
}

export async function apiFetch<T>(
  path: string,
  { method = 'GET', body, token, cache = 'no-store' }: ApiOptions = {},
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache,
  });

  if (!res.ok) {
    let message = 'Unexpected error';
    let details: unknown;
    try {
      const data = await res.json();
      message = data.message ?? message;
      details = data.message ?? data.errors ?? data;
    } catch {
      // ignore
    }
    const error: Error & { details?: unknown } = new Error(message);
    if (details !== undefined) {
      error.details = details;
    }
    throw error;
  }

  return res.json();
}


