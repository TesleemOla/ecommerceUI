'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerStoreOwner } from '@/lib/authClient';

export default function RegisterStoreOwnerPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
  }>({});

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setLoading(true);
    try {
      await registerStoreOwner({ email, password, fullName });
      router.push('/auth/login');
    } catch (err) {
      const anyErr = err as Error & { details?: unknown };
      setError(anyErr.message);
      const details = anyErr.details;
      if (details && typeof details === 'object' && !Array.isArray(details)) {
        const obj = details as Record<string, string | string[]>;
        const next: {
          fullName?: string;
          email?: string;
          password?: string;
        } = {};
        if (obj.fullName) {
          next.fullName = Array.isArray(obj.fullName)
            ? obj.fullName[0]
            : String(obj.fullName);
        }
        if (obj.email) {
          next.email = Array.isArray(obj.email)
            ? obj.email[0]
            : String(obj.email);
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
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Become a Seller
        </h1>
        <p className="text-slate-600">
          Start your store and reach customers worldwide
        </p>
      </div>
      <div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="text-sm text-slate-700">
            <p className="font-semibold mb-1">After registration:</p>
            <p>You&apos;ll be able to request a store. A superadmin will review and approve it before customers can place orders.</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="card bg-white shadow-xl">
        <div className="form-field">
          <label className="form-label">Full Name</label>
          <input
            className="form-input"
            required
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {fieldErrors.fullName && (
            <p className="text-xs text-red-600 mt-1">{fieldErrors.fullName}</p>
          )}
        </div>
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
            minLength={6}
            placeholder="At least 6 characters"
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
              Creating account…
            </span>
          ) : (
            'Create Seller Account'
          )}
        </button>
        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{' '}
          <a href="/auth/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}


