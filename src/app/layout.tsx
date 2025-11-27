import React from 'react';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { UserMenu } from '@/components/UserMenu';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Marketplace',
  description: 'Multi-store ecommerce marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
        <div className="min-h-screen flex flex-col">
          <CartProvider>
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
                <a
                  href="/"
                  className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  🛍️ Marketplace
                </a>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                  <a
                    href="/stores"
                    className="text-slate-700 hover:text-blue-600 transition-colors relative group"
                  >
                    Stores
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a
                    href="/cart"
                    className="text-slate-700 hover:text-blue-600 transition-colors relative group"
                  >
                    Cart
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a
                    href="/orders"
                    className="text-slate-700 hover:text-blue-600 transition-colors relative group"
                  >
                    My Orders
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a
                    href="/dashboard/store"
                    className="text-slate-700 hover:text-blue-600 transition-colors relative group"
                  >
                    Dashboard
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <a
                    href="/dashboard/superadmin"
                    className="text-slate-700 hover:text-blue-600 transition-colors relative group"
                  >
                    Admin
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                  <UserMenu />
                </nav>
                <div className="md:hidden">
                  <UserMenu />
                </div>
              </div>
            </header>
            <main className="flex-1">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
          </CartProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}


