"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { Product, getProductById } from "./products";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type PreorderDetails = {
  fullName: string;
  phoneNumber: string;
  email?: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
};

export type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  detailedItems: {
    product: Product;
    quantity: number;
    lineTotal: number;
  }[];
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setCheckoutOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  const detailedItems = useMemo(() => {
    return items
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        const lineTotal = product.price * item.quantity;
        return { product, quantity: item.quantity, lineTotal };
      })
      .filter(Boolean) as {
      product: Product;
      quantity: number;
      lineTotal: number;
    }[];
  }, [items]);

  const subtotal = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [detailedItems]
  );

  const addItem = (productId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clear = () => {
    setItems([]);
  };

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    subtotal,
    detailedItems,
    isCartOpen,
    setCartOpen,
    isCheckoutOpen,
    setCheckoutOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
