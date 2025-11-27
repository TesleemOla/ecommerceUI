import React from 'react'

export default function Footer() {
    return (<footer className="border-t border-slate-200 bg-white/80 backdrop-blur-lg mt-auto">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Marketplace
                  </h3>
                  <p className="text-sm text-slate-600">
                    Your trusted multi-store e-commerce platform. Discover unique products from verified sellers.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-slate-900">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>
                      <a href="/stores" className="hover:text-blue-600 transition-colors">
                        Browse Stores
                      </a>
                    </li>
                    <li>
                      <a href="/auth/register/customer" className="hover:text-blue-600 transition-colors">
                        Create Account
                      </a>
                    </li>
                    <li>
                      <a href="/auth/login" className="hover:text-blue-600 transition-colors">
                        Sign In
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-slate-900">For Sellers</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>
                      <a href="/auth/register/store-owner" className="hover:text-blue-600 transition-colors">
                        Become a Seller
                      </a>
                    </li>
                    <li>
                      <a href="/dashboard/store" className="hover:text-blue-600 transition-colors">
                        Seller Dashboard
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
                <span>© 2024 Marketplace. All rights reserved.</span>
                <span className="mt-2 sm:mt-0">Powered by NestJS + Next.js</span>
              </div>
            </div>
          </footer>);
}