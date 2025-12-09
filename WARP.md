# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Overview

This repo contains the **GreenCross** web application, a dark-themed cannabis preorder site built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS (v4 via `@tailwindcss/postcss`)**. The app lets users:

- Browse a curated catalog of products
- Add items to a right-side cart drawer
- Complete a preorder via a modal checkout form
- Send preorder details to **`greencrossmgmt@gmail.com`** via an API route
- View Houston pickup locations, including nearest-location detection using browser geolocation

The app is single-project (no monorepo) with all code under `src/`.

## Core commands

All commands run from the repo root.

- **Start dev server** (Next.js):
  - `npm run dev`
- **Build for production**:
  - `npm run build`
- **Start production server** (after build):
  - `npm start`
- **Lint** (ESLint over the app):
  - `npm run lint`

There is no dedicated test runner configured yet; add one if you introduce tests.

## High-level structure

- `src/app/layout.tsx`
  - Root layout; wires in fonts, global styles, and the cart context/provider.
  - Renders the shared **navbar** at the top and the **cart drawer** component so it is available on every page.
- `src/app/page.tsx`
  - **Home / Landing** page.
  - Uses `Hero` and `FeatureCards` components to match the primary marketing hero and three-card feature row.
- `src/app/products/page.tsx`
  - **Products** listing (menu) page.
  - Client component that pulls from `lib/products.ts` and applies search + filter logic from `ProductFilters`.
  - Renders a responsive grid of `ProductCard`s, each with a "Featured" badge, strain/weight chips, THC/CBD stats, truncated description, and **“+ Add to Order”** button.
- `src/app/locations/page.tsx`
  - **Locations** page.
  - Client component that uses `lib/locations.ts` and `LocationMap`.
  - Shows a top control bar ("Use My Location" + ZIP search inputs), a visual map placeholder panel, and an **All Locations** grid beneath.
- `src/app/api/preorder/route.ts`
  - API route handling **preorder submission**.
  - Validates the request body with Zod, then sends a formatted email via **Nodemailer**.
  - The email is always sent to **`greencrossmgmt@gmail.com`**; SMTP host/user/pass/from are taken from env vars.

### Shared UI components

All shared components live in `src/components/`.

- `Navbar.tsx`
  - Sticky dark navbar with logo (`Green` + green `Cross`), nav links for **Home / Products / Locations**, Instagram placeholder icon, and a circular cart button with badge showing cart item count.
  - Uses `usePathname()` for active-link styling.
- `Hero.tsx`
  - Landing hero: tag pill ("Houston's Premier Mobile Dispensary"), large two-line heading ("Premium Cannabis" / "Delivered to You" in green), supporting copy, and primary/secondary CTAs (`/products` and `/locations`).
- `FeatureCards.tsx`
  - Three feature cards: **Premium Quality**, **Easy Pre-Order**, **Multiple Locations**.
- `ProductFilters.tsx`
  - Client component exposing `ProductFiltersState` with `search`, `category`, and `strain`.
  - Renders search input, **Category** pill group (All Products, Flower, Edibles, Concentrates, Vapes, Pre-Rolls, Topicals, Accessories) and **Strain** pill group (All Strains, Indica, Sativa, Hybrid, CBD).
- `ProductCard.tsx`
  - Client component for individual product tiles.
  - Displays product image, badges, meta chips, THC/CBD, description, price and **Add to Order** button that calls `useCart().addItem(product.id)`.
- `ProductGrid.tsx`
  - Simple grid wrapper around `ProductCard` with responsive column counts.
- `CartDrawer.tsx`
  - Client side drawer anchored to the right; shows **Your Order** with line items, +/- quantity controls, remove button, subtotal, and **Proceed to Checkout** CTA.
  - Uses `useCart()` for state and renders `PreorderModal` controlled by `isCheckoutOpen`.
- `PreorderModal.tsx`
  - Full-screen overlay modal matching the checkout screenshot.
  - Implemented with **react-hook-form** + **Zod** validation.
  - Fields: Full Name, Phone Number, Email, Pickup Location (select from `lib/locations`), Pickup Date, Pickup Time, Special Instructions, and computed **Total**.
  - On submit, posts to `/api/preorder` with customer, cart items, and total.
  - On success: shows a success message, clears the cart, resets the form, and closes the cart drawer.
- `LocationMap.tsx`
  - Client component responsible for location-awareness.
  - Uses `navigator.geolocation` (when permitted) and `findNearestLocation` from `lib/geo.ts` to determine the nearest pickup location, and displays a stylized "map preview" panel plus text indicating the nearest location or status while resolving.
  - Designed to be SSR-safe (no direct `window`/Leaflet usage during prerender).
- `icons.tsx`
  - Small inline SVG icon components used in the cart and buttons (shopping bag, plus, minus, trash).

### Data & state modules

- `src/lib/products.ts`
  - Static catalog of products (roughly matching the designs: Blue Dream, OG Kush, Sour Diesel, edibles, vapes, pre-rolls, topicals, accessories).
  - Each product has id, name, price, category, strain, optional THC/CBD %, description, and **placeholder image URLs from Pexels/Unsplash**.
  - Exports `getProductById` used by the cart context.
- `src/lib/cart-context.tsx`
  - **Client-side React context** that owns cart state and key UI flags.
  - Exposes:
    - `items` (raw `{ productId, quantity }[]`)
    - `detailedItems` (joined with product data)
    - `subtotal`
    - `addItem`, `removeItem`, `updateQuantity`, `clear`
    - `isCartOpen`, `setCartOpen`, `isCheckoutOpen`, `setCheckoutOpen`
  - `CartProvider` wraps the app in `layout.tsx`, and `useCart()` is used by navbar/cart/modal components.
- `src/lib/locations.ts`
  - Static list of Houston-area locations (e.g. GreenCross Houston at "9030 North Fwy"), with status, address lines, phone, and lat/lng.
- `src/lib/geo.ts`
  - Utility helpers for computing haversine distance and selecting the nearest location given a coordinate.

## Email / preorder behavior

- API route: `src/app/api/preorder/route.ts`.
- Validates incoming JSON, then uses **Nodemailer** to send an email with all preorder details.
- **Email destination is fixed**: `to: "greencrossmgmt@gmail.com"`.
- SMTP configuration is injected via environment variables:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`.
- When wiring up in a new environment, ensure these env vars are present; otherwise the route will fail at runtime even though TypeScript/ESLint pass.

## Styling and Tailwind notes

- Tailwind v4 is enabled via `@tailwindcss/postcss` in `postcss.config.mjs`; there is no `tailwind.config.*` file.
- Global styles live in `src/app/globals.css` and define:
  - A dark radial-gradient background used across the app.
  - Base font-family set to system UI fonts.
  - A utility class `.field-input` that applies the shared form field styling (rounded, dark background, emerald focus ring). This is reused across filters and the preorder modal.

## Images

- Remote product images use stock placeholders hosted on Pexels/Unsplash.
- `next.config.ts` explicitly allows these domains under `images.remotePatterns`.
- When changing image sources, keep this config in sync to avoid build/runtime image errors.

## How to extend or modify

When changing flows or adding features, prefer to:

- Reuse the existing **cart context** rather than adding new global cart state.
- Extend `lib/products.ts` / `lib/locations.ts` for catalog or store changes instead of hard-coding data inside components.
- Keep new pages and shared UI in `src/app/` and `src/components/` respectively so the structure remains consistent.

If you introduce tests or additional tooling (e.g. Playwright, Vitest), update this WARP.md with the relevant commands and any non-obvious project conventions.