
"use client"; // Enable client-side rendering
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../lib/cart-context";
import { Navbar } from "../components/Navbar";
import { CartDrawer } from "../components/CartDrawer";
import AgeGate from "../components/AgeGate";
import { useState, useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Use the same storage key that AgeGate uses
const AGE_STORAGE_KEY = "greencross_isOfAge";

export const metadata: Metadata = {
  title: "GreenCross – Premium Cannabis PreOrdered & Ready for pickup Online",
  description:
    "Browse curated cannabis products, pre-order online, and pick up at your nearest GreenCross location in Houston.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const [verified, setVerified] = useState<boolean>(false);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AGE_STORAGE_KEY);
      if (stored === "true") setVerified(true);
    } catch {
      // ignore localStorage errors
    }
  }, []);

  // Called when user confirms 21+
  const handleConfirm = () => {
    try {
      localStorage.setItem(AGE_STORAGE_KEY, "true");
    } catch {}
    setVerified(true);
  };
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        {/* AgeGate popup id ran before any other critical website functionality.*/}
        {!verified && <AgeGate onConfirm={handleConfirm} />}
        <CartProvider>
          <div className="flex min-h-screen flex-col bg-transparent">
            <Navbar />
            <main className="flex-1 bg-transparent">{children}</main>
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
