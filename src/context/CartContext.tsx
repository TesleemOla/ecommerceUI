'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  storeId: string | null;
  items: CartItem[];
};

type CartContextValue = {
  storeId: string | null;
  items: CartItem[];
  total: number;
  addItem: (storeId: string, item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ storeId: null, items: [] });

  const value = useMemo<CartContextValue>(() => {
    const total = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      storeId: state.storeId,
      items: state.items,
      total,
      addItem: (storeId, item, quantity = 1) => {
        setState((prev) => {
          // enforce single-store cart
          if (prev.storeId && prev.storeId !== storeId) {
            return prev; // ignore items from other stores
          }
          const existing = prev.items.find(
            (i) => i.productId === item.productId,
          );
          if (existing) {
            return {
              ...prev,
              storeId: storeId,
              items: prev.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return {
            ...prev,
            storeId: storeId,
            items: [...prev.items, { ...item, quantity }],
          };
        });
      },
      removeItem: (productId) => {
        setState((prev) => {
          const items = prev.items.filter((i) => i.productId !== productId);
          return {
            storeId: items.length === 0 ? null : prev.storeId,
            items,
          };
        });
      },
      clear: () => setState({ storeId: null, items: [] }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}


