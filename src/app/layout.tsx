import React from 'react';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { UserMenu } from '@/components/UserMenu';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

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
      <body className="min-h-screen bg-linear-to-b from-white to-slate-50 text-slate-900">
        <div className="min-h-screen flex flex-col">
          <CartProvider>
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
              <Navbar />
                  <UserMenu />
                <div className="md:hidden">
                  <UserMenu />
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


