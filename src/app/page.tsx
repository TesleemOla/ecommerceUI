import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 p-8 md:p-12 text-white">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Welcome to Your
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-yellow-200 to-pink-200">
              Multi-Store Marketplace
            </span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed">
            Discover unique products from verified sellers. Shop with confidence
            from approved stores, or start your own store and reach customers worldwide.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/stores"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              🛍️ Browse Stores
            </Link>
            <Link
              href="/auth/register/customer"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-all duration-200"
            >
              Create Account
            </Link>
            <Link
              href="/auth/register/store-owner"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-6 py-3 text-base font-semibold text-white hover:bg-white/20 transition-all duration-200"
            >
              Become a Seller
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Quick Links Card */}
      <section className="grid gap-6 md:grid-cols-[2fr,1fr] items-start">
        <div className="card bg-gradient-to-br from-slate-50 to-white">
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Get Started</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Join thousands of customers shopping from verified stores. Browse products,
            add to cart, and checkout securely. Store owners can manage their inventory
            and orders, while admins oversee the marketplace.
          </p>
        </div>
        <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <h2 className="font-semibold text-lg mb-4 text-slate-900">Quick Access</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/auth/login"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform"></span>
                Log in to your account
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/store"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform"></span>
                Store owner dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/superadmin"
                className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors group"
              >
                <span className="w-2 h-2 rounded-full bg-blue-600 group-hover:scale-150 transition-transform"></span>
                Superadmin panel
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">
          How It Works
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            title="👥 Customers"
            icon="🛒"
            items={[
              'Browse approved stores and products',
              'Add items to cart and place orders',
              'Track your order history',
            ]}
            gradient="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            title="🏪 Store Owners"
            icon="📦"
            items={[
              'Request a store and get approved',
              'Manage products and inventory',
              'Process and fulfill orders',
            ]}
            gradient="from-purple-500 to-pink-500"
          />
          <FeatureCard
            title="⚡ Superadmin"
            icon="🔧"
            items={[
              'Review pending store applications',
              'Approve or reject stores',
              'Oversee marketplace operations',
            ]}
            gradient="from-orange-500 to-red-500"
          />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  icon,
  items,
  gradient,
}: {
  title: string;
  icon: string;
  items: string[];
  gradient: string;
}) {
  return (
    <div className="card group hover:border-blue-300">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} mb-4 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-slate-900">{title}</h3>
      <ul className="space-y-3 text-sm text-slate-600">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


