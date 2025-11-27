import { cookies } from 'next/headers';
import { listStoreOrders } from '@/lib/ordersClient';
import { listProducts } from '@/lib/productsClient';

export default async function StoreDashboardPage() {
  const token = cookies().get('accessToken')?.value ?? null;

  if (!token) {
    return (
      <p className="text-sm text-slate-600">
        Log in as a store owner to see your store dashboard.
      </p>
    );
  }

  const [orders, products] = await Promise.all([
    listStoreOrders(token),
    listProducts(),
  ]);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Store Dashboard
        </h1>
        <p className="text-lg text-slate-600">
          Manage your products and track your orders
        </p>
      </div>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Products</h2>
          <span className="text-sm font-semibold text-slate-600">
            {products.length} total
          </span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p._id}
              className="card bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-lg flex-1">
                  {p.name}
                </h3>
              </div>
              {p.description && (
                <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                  {p.description}
                </p>
              )}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div>
                  <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${p.price.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Stock: <span className="font-semibold">{p.stock}</span>
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    p.stock > 0
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <div className="col-span-full card text-center py-12 bg-gradient-to-br from-slate-50 to-white">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-lg font-semibold text-slate-700 mb-2">
                No products yet
              </p>
              <p className="text-sm text-slate-600">
                Use the API or an internal tool to create products
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Recent Orders</h2>
          <span className="text-sm font-semibold text-slate-600">
            {orders.length} total
          </span>
        </div>
        <div className="space-y-3">
          {orders.map((o) => (
            <div
              key={o._id}
              className="card bg-white hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-3 md:mb-0">
                  <h3 className="font-bold text-slate-900 mb-1">
                    Order #{o._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      o.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : o.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {o.status}
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${o.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="card text-center py-12 bg-gradient-to-br from-slate-50 to-white">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-lg font-semibold text-slate-700 mb-2">
                No orders yet
              </p>
              <p className="text-sm text-slate-600">
                Orders from customers will appear here
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


