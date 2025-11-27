'use client';

import { useEffect, useState } from 'react';
import { listProducts, Product } from '@/lib/productsClient';
import { useCart } from '@/context/CartContext';

interface StorePageProps {
  params: { id: string };
}

export default function StoreDetailPage({ params }: StorePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    let active = true;
    setLoading(true);
    listProducts(params.id)
      .then((data) => {
        if (active) {
          setProducts(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          setError((err as Error).message);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });
    return () => {
      active = false;
    };
  }, [params.id]);

  const PAGE_SIZE = 9;
  const filtered = products.filter((p) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      p.name.toLowerCase().includes(term) ||
      (p.description ?? '').toLowerCase().includes(term)
    );
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Store Products
        </h1>
        <p className="text-lg text-slate-600">
          Add items to your cart and checkout when you&apos;re ready
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            className="form-input w-full pl-10"
            placeholder="Search products…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        </div>
        <p className="text-sm text-slate-600 font-medium">
          Showing <span className="text-blue-600">{pageItems.length}</span> of{' '}
          <span className="text-blue-600">{filtered.length}</span> products
        </p>
      </div>
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="product-card animate-pulse space-y-3">
              <div className="h-6 w-2/3 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-8 w-1/2 bg-slate-200 rounded" />
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className="card bg-red-50 border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      {!loading && !error && (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((product) => (
              <div key={product._id} className="product-card">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${product.price.toFixed(2)}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : 'Out of stock'}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={product.stock <= 0}
                  onClick={() =>
                    addItem(params.id, {
                      productId: product._id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                >
                  {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            ))}
            {pageItems.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-lg font-semibold text-slate-700 mb-2">No products found</p>
                <p className="text-sm text-slate-600">
                  This store doesn&apos;t have any products yet
                </p>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border-2 border-slate-300 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← Previous
              </button>
              <span className="px-4 py-2 text-sm font-semibold text-slate-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="px-4 py-2 rounded-lg border-2 border-slate-300 text-sm font-semibold text-slate-700 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

