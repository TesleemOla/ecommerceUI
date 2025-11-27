'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const { items, total, storeId, removeItem, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setSuccess(null);

    if (!storeId || items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId,
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Failed to place order');
      }
      clear();
      setSuccess('Order placed successfully.');
      // optionally send user to their orders page
      router.push('/orders');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Shopping Cart
        </h1>
        <p className="text-lg text-slate-600">
          Review your items and proceed to checkout
        </p>
      </div>
      {items.length === 0 && (
        <div className="card text-center py-12 bg-gradient-to-br from-slate-50 to-white">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-lg font-semibold text-slate-700 mb-2">
            Your cart is empty
          </p>
          <p className="text-sm text-slate-600 mb-6">
            Start shopping to add items to your cart
          </p>
          <a
            href="/stores"
            className="inline-flex items-center justify-center btn-primary"
          >
            Browse Stores
          </a>
        </div>
      )}
      {items.length > 0 && (
        <div className="space-y-6">
          <div className="card bg-white shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-slate-900">
              Cart Items ({items.length})
            </h2>
            <ul className="divide-y divide-slate-200 space-y-4">
              {items.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 mb-1">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-600">
                      {item.quantity} × ${item.price.toFixed(2)} = $
                      {(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ml-4 px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold text-slate-900">Total</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${total.toFixed(2)}
              </span>
            </div>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}
            <button
              type="button"
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleCheckout}
              disabled={submitting}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing order…
                </span>
              ) : (
                '💳 Proceed to Checkout'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


