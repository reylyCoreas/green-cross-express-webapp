"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../lib/cart-context";
import { ShoppingBagIcon } from "./icons";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/locations", label: "Locations" },
];

export function Navbar() {
  const pathname = usePathname();
  const { detailedItems, setCartOpen } = useCart();
  const itemCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500">
            <span className="text-xl text-slate-950">☘️</span>
          </span>
          <span className="text-lg font-semibold text-slate-50">
            Green<span className="text-emerald-400">Cross</span>
          </span>
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  active
                    ? "text-emerald-400"
                    : "hover:text-emerald-300 transition-colors"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {/* Instagram icon placeholder */}
          <a
            href="#"
            aria-label="Instagram"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-300 hover:border-emerald-400 hover:text-emerald-300"
          >
            
            <span className="text-lg">⌁</span>
          </a>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
            aria-label="Open cart"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-slate-950 px-1 text-xs font-semibold text-emerald-400">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
