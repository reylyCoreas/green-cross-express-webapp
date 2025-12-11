"use client"; // Enable client-side rendering
import React from "react";
import { Metadata } from "next";
import ClientProviders from "../components/ClientProviders";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
<<<<<<< HEAD
import AgeGate from "../components/AgeGate";
import { Geist, Geist_Mono } from "next/font/google";
=======
import { CartProvider } from "../context/CartContext";
import { Geist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import React from "react";
import ClientProviders from "../components/ClientProviders";
>>>>>>> eddd6309d9a27edafedbababa35f3df9344bee64

//Move all client-only logic into a client wrapper and mark AgeGate as client. 
<<<<<<< HEAD

export const metadata: Metadata = {
  title: "GreenCross – Premium Cannabis PreOrdere & Pickup in Houston",
=======
export const metadata: MetaData = {
  title: "GreenCross – Premium Cannabis PreOrdred",
>>>>>>> eddd6309d9a27edafedbababa35f3df9344bee64
  description:
    "Browse curated cannabis products, pre-order online, and pick up at your nearest GreenCross location in Houston.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<<<<<<< HEAD
=======
// Metadata
export const metadata: Metadata = {
  title: "GreenCross – Premium Cannabis PreOrdred",
  description:
    "Browse curated cannabis products, pre-order online, and pick up at your nearest GreenCross location in Houston.",
};

>>>>>>> eddd6309d9a27edafedbababa35f3df9344bee64
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        <ClientProviders>
          {/* AgeGate is a client component that manages its own visibility via localStorage.
              We pass a no-op onConfirm because the AgeGate hides itself and can optionally notify. */}
          <AgeGate onConfirm={() => {}} />

          <div className="flex min-h-screen flex-col bg-transparent">
            <Navbar />
            <main className="flex-1 bg-transparent">{children}</main>
            <CartDrawer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

