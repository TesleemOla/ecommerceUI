'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { listActiveStores } from '@/lib/storesClient';

const PAGE_SIZE = 6;

export default function StoresPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [stores, setStores] = useState<
    { _id: string; name: string; description?: string }[]
  >([]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    listActiveStores()
      .then((data) => {
        if (!active) return;
        setStores(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError((err as Error).message);
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return stores;
    return stores.filter(
      (s) =>
        s.name.toLowerCase().includes(term) ||
        (s.description ?? '').toLowerCase().includes(term),
    );
  }, [stores, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Discover Stores
        </h1>
        <p className="text-lg text-slate-600">
          Browse our curated selection of verified stores
        </p>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <input
            className="form-input w-full pl-10"
            placeholder="Search stores by name or description…"
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
          <span className="text-blue-600">{filtered.length}</span> stores
        </p>
      </div>
      {loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="store-card animate-pulse space-y-3">
              <div className="h-6 w-2/3 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-4/5 bg-slate-100 rounded" />
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
            {pageItems.map((store) => (
              <Link
                key={store._id}
                href={`/stores/${store._id}`}
                className="store-card group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {store.name}
                  </h2>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
                {store.description && (
                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {store.description}
                  </p>
                )}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <span className="text-xs font-semibold text-blue-600">View Products →</span>
                </div>
              </Link>
            ))}
            {pageItems.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg font-semibold text-slate-700 mb-2">No stores found</p>
                <p className="text-sm text-slate-600">
                  Try adjusting your search terms
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

