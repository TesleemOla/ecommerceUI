import { cookies } from 'next/headers';
import { listMyOrders } from '@/lib/ordersClient';

export default async function MyOrdersPage() {
  const token = cookies().get('accessToken')?.value ?? null;

  if (!token) {
    return (
      <p className="text-sm text-slate-600">
        You need to log in as a customer to see your orders.
      </p>
    );
  }

  const orders = await listMyOrders(token);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-lg text-slate-600">
          View your order history and track your purchases
        </p>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Order #{order._id.slice(-8).toUpperCase()}
                </h3>
                <p className="text-sm text-slate-500">
                  {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                </p>
              </div>
              <span
                className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : order.status === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="space-y-2 mb-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm py-2"
                >
                  <span className="text-slate-600">
                    {item.quantity} × ${item.unitPrice.toFixed(2)}
                  </span>
                  <span className="font-semibold text-slate-900">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-sm font-semibold text-slate-700">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <div className="card text-center py-12 bg-gradient-to-br from-slate-50 to-white">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg font-semibold text-slate-700 mb-2">
              No orders yet
            </p>
            <p className="text-sm text-slate-600 mb-6">
              Start shopping to see your orders here
            </p>
            <a
              href="/stores"
              className="inline-flex items-center justify-center btn-primary"
            >
              Browse Stores
            </a>
          </div>
        )}
      </div>
    </div>
  );
}


