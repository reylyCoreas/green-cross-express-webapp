"use client";
import react from "react";
import { CartProvider } from "../context/CartContext";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}   