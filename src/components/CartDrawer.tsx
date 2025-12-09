"use client";

import { useCart } from "../lib/cart-context";
import { MinusIcon, PlusIcon, TrashIcon } from "./icons";
import { PreorderModal } from "./PreorderModal";

export function CartDrawer() {
  const {
    detailedItems,
    subtotal,
    isCartOpen,
    setCartOpen,
    setCheckoutOpen,
    isCheckoutOpen,
    removeItem,
    updateQuantity,
  } = useCart();

  const hasItems = detailedItems.length > 0;

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-slate-950 shadow-2xl shadow-black/60 transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-50">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
              🧺
            </span>
            <span>Your Order</span>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
          {hasItems ? (
            detailedItems.map(({ product, quantity, lineTotal }) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-slate-900/70 px-3 py-3"
              >
                <div className="flex flex-1 flex-col text-xs">
                  <span className="font-semibold text-slate-50">
                    {product.name}
                  </span>
                  <span className="text-slate-400">${product.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700"
                  >
                    <MinusIcon className="h-3 w-3" />
                  </button>
                  <span className="w-5 text-center text-sm text-slate-50">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700"
                  >
                    <PlusIcon className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex flex-col items-end justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-slate-500 hover:bg-slate-800 hover:text-rose-300"
                  >
                    <TrashIcon className="h-3 w-3" />
                  </button>
                  <span className="text-emerald-400">${lineTotal.toFixed(2)}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              Your cart is empty. Add products from the menu to get started.
            </p>
          )}
        </div>

        <div className="border-t border-white/10 px-6 py-4">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
            <span>Subtotal</span>
            <span className="text-base font-semibold text-emerald-400">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            disabled={!hasItems}
            onClick={() => {
              setCheckoutOpen(true);
            }}
            className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
          >
            Proceed to Checkout
          </button>
        </div>
      </aside>

      <PreorderModal open={isCheckoutOpen} onOpenChange={setCheckoutOpen} />
    </>
  );
}
