"use client"; // Enable client-side rendering
import AgeGate from "../components/AgeGate";
import { useState, useEffect } from "react";
import { Metadata } from "next";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import { CartProvider } from "../context/CartContext";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import react from "react";
import ClientProviders from "../components/ClientProviders";



//Move all client-only logic into a client wrapper and mark AgeGate as client. 
export const metadata; MetaData = {
  title: "GreenCross – Premium Cannabis Delivered",
  description:
    "Browse curated cannabis products, pre-order online, and pick up at your nearest GreenCross location in Houston.",
}

export default function RootLayout({children}: {children: React.ReactNode}) { 
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
</html>
  );
}
// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "GreenCross – Premium Cannabis Delivered",
  description:
    "Browse curated cannabis products, pre-order online, and pick up at your nearest GreenCross location in Houston.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {/* AgeGate popup */}
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

