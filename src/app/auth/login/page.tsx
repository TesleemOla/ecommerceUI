'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/authClient';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);
    try {
      const res = await login(email, password);
      // also persist to httpOnly cookie for server components / middleware
      await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken: res.accessToken, user: res.user }),
      });

      // route based on role
      const role = res.user.role;
      if (role === 'StoreOwner') {
        router.push('/dashboard/store');
      } else if (role === 'SuperAdmin') {
        router.push('/dashboard/superadmin');
      } else {
        router.push('/');
      }
    } catch (err) {
      const anyErr = err as Error & { details?: unknown };
      setError(anyErr.message);
      const details = anyErr.details;
      if (details && typeof details === 'object' && !Array.isArray(details)) {
        const obj = details as Record<string, string | string[]>;
        const next: { email?: string; password?: string } = {};
        if (obj.email) {
          next.email = Array.isArray(obj.email) ? obj.email[0] : String(obj.email);
        }
        if (obj.password) {
          next.password = Array.isArray(obj.password)
            ? obj.password[0]
            : String(obj.password);
        }
        setFieldErrors(next);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-slate-600">
          Sign in to your account to continue shopping
        </p>
      </div>
      <form onSubmit={handleSubmit} className="card bg-white shadow-xl">
        <div className="form-field">
          <label className="form-label">Email Address</label>
          <input
            className="form-input"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
          )}
        </div>
        <div className="form-field">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            required
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {fieldErrors.password && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>
          )}
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          </div>
        )}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Logging in…
            </span>
          ) : (
            'Sign In'
          )}
        </button>
        <p className="text-center text-sm text-slate-600 mt-4">
          Don't have an account?{' '}
          <a href="/auth/register/customer" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}


