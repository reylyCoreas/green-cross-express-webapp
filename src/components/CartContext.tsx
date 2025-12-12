"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
  price?: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("cart", JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  return <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};