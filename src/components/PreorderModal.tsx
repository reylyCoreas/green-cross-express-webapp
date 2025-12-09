"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "../lib/cart-context";
import { locations } from "../lib/locations";

const schema = z.object({
  fullName: z.string().min(1, "Required"),
  phoneNumber: z.string().min(7, "Required"),
  email: z.string().email().optional().or(z.literal("")),
  pickupLocation: z.string().min(1, "Required"),
  pickupDate: z.string().min(1, "Required"),
  pickupTime: z.string().min(1, "Required"),
  specialInstructions: z.string().optional(),
});

export type PreorderFormValues = z.infer<typeof schema>;

export function PreorderModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { subtotal, detailedItems, clear, setCartOpen } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PreorderFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      pickupLocation: "",
      pickupDate: "",
      pickupTime: "",
      specialInstructions: "",
    },
  });

  const total = subtotal;

  async function onSubmit(values: PreorderFormValues) {
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: values,
          items: detailedItems.map((item) => ({
            productId: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            lineTotal: item.lineTotal,
          })),
          total,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to place preorder");
      }

      setSuccess("Your pre-order has been received. We\'ll text you when it\'s ready for pickup.");
      clear();
      form.reset();
      setCartOpen(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/70">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Complete Your Pre-Order
            </h2>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-100"
            onClick={() => onOpenChange(false)}
          >
            ✕
          </button>
        </div>

        <form
          className="space-y-4 text-sm text-slate-200"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name *" error={form.formState.errors.fullName?.message}>
              <input
                className="field-input"
                {...form.register("fullName")}
                placeholder="John Doe"
              />
            </Field>
            <Field
              label="Phone Number *"
              error={form.formState.errors.phoneNumber?.message}
            >
              <input
                className="field-input"
                {...form.register("phoneNumber")}
                placeholder="(713) 555-0123"
              />
            </Field>
          </div>

          <Field label="Email" error={form.formState.errors.email?.message}>
            <input
              className="field-input"
              {...form.register("email")}
              placeholder="john@example.com"
            />
          </Field>

          <Field
            label="Pickup Location *"
            error={form.formState.errors.pickupLocation?.message}
          >
            <select className="field-input" {...form.register("pickupLocation")}>
              <option value="">Select a location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.name}>
                  {loc.name} – {loc.addressLines[0]}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Pickup Date *"
              error={form.formState.errors.pickupDate?.message}
            >
              <input
                type="date"
                className="field-input"
                {...form.register("pickupDate")}
              />
            </Field>
            <Field
              label="Pickup Time *"
              error={form.formState.errors.pickupTime?.message}
            >
              <select className="field-input" {...form.register("pickupTime")}>
                <option value="">Select time</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
              </select>
            </Field>
          </div>

          <Field label="Special Instructions">
            <textarea
              rows={3}
              className="field-input resize-none"
              {...form.register("specialInstructions")}
              placeholder="Any special requests..."
            />
          </Field>

          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-sm">
            <span className="text-slate-300">Total</span>
            <span className="text-lg font-semibold text-emerald-400">
              ${total.toFixed(2)}
            </span>
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {success && <p className="text-sm text-emerald-300">{success}</p>}

          <button
            type="submit"
            disabled={submitting || !detailedItems.length}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500"
          >
            {submitting ? "Placing Order..." : "Place Pre-Order"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-medium text-slate-200">
      <span className="mb-1 block">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[11px] text-rose-300">{error}</span>}
    </label>
  );
}
