
import React from "react";
import { Metadata } from "next";
import ClientProviders from "../components/ClientProviders";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import AgeGate from "../components/AgeGate";
import { Geist, Geist_Mono } from "next/font/google";

//Move all client-only logic into a client wrapper and mark AgeGate as client. 

export const metadata: Metadata = {
  title: "GreenCross – Premium Cannabis PreOrdere & Pickup in Houston",
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

