
"use client"; // Enable client-side rendering
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../lib/cart-context";
import { Navbar } from "../components/Navbar";
import { CartDrawer } from "../components/CartDrawer";
import AgeGate from "../components/AgeGate";
import { useState } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    const stored = localStorage.getItem("ageVerified");
    if (stored === "true") setVerified(true);
  }, []);

  // Called when user confirms 21+
  const handleConfirm = () => {
    localStorage.setItem("ageVerified", "true");
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