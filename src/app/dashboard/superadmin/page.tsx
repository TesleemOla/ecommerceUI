import { cookies } from 'next/headers';
import { approveStore, listPendingStores } from '@/lib/storesClient';

async function approve(storeId: string, status: 'Approved' | 'Rejected') {
  'use server';
  const token = cookies().get('accessToken')?.value;
  if (!token) return;
  await approveStore(storeId, status, token);
}

export default async function SuperadminDashboardPage() {
  const token = cookies().get('accessToken')?.value ?? null;

  if (!token) {
    return (
      <p className="text-sm text-slate-600">
        Log in as the superadmin to review pending stores.
      </p>
    );
  }

  const pendingStores = await listPendingStores(token);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Superadmin Panel
        </h1>
        <p className="text-lg text-slate-600">
          Review and manage store applications
        </p>
      </div>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            Pending Store Applications
          </h2>
          <span className="text-sm font-semibold text-slate-600">
            {pendingStores.length} pending
          </span>
        </div>
        <div className="space-y-4">
          {pendingStores.map((store) => (
            <form
              key={store._id}
              className="card bg-white hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {store.name}
                  </h3>
                  {store.description && (
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {store.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-3 md:flex-col lg:flex-row">
                  <button
                    formAction={async () => approve(store._id, 'Approved')}
                    className="btn-primary flex-1 md:flex-none"
                  >
                    ✓ Approve
                  </button>
                  <button
                    formAction={async () => approve(store._id, 'Rejected')}
                    className="px-4 py-2 rounded-lg border-2 border-red-300 text-sm font-semibold text-red-600 hover:bg-red-50 hover:border-red-400 transition-all"
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            </form>
          ))}
          {pendingStores.length === 0 && (
            <div className="card text-center py-12 bg-gradient-to-br from-slate-50 to-white">
              <div className="text-6xl mb-4">✅</div>
              <p className="text-lg font-semibold text-slate-700 mb-2">
                All caught up!
              </p>
              <p className="text-sm text-slate-600">
                No pending store applications at this time
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


