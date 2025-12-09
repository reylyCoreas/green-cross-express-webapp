# AI Architecture Guide - GreenCross Web Application

> **Purpose**: This document explains every layer of the GreenCross tech stack in detail for AI agents that need to understand, modify, or extend the codebase. It includes explanations of how each technology is used, where it's implemented, and common syntax patterns.

---

## Table of Contents
1. [Tech Stack Overview](#tech-stack-overview)
2. [Next.js (App Router)](#nextjs-app-router)
3. [React & TypeScript](#react--typescript)
4. [Tailwind CSS v4](#tailwind-css-v4)
5. [React Hook Form & Zod](#react-hook-form--zod)
6. [Nodemailer](#nodemailer)
7. [State Management (React Context)](#state-management-react-context)
8. [Project Structure](#project-structure)
9. [Data Flow Diagrams](#data-flow-diagrams)
10. [Common Patterns & Syntax](#common-patterns--syntax)

---

## Tech Stack Overview

| Technology | Version | Purpose | Used In |
|------------|---------|---------|---------|
| **Next.js** | 15.x (App Router) | Server-side rendering, routing, API routes | All pages and API endpoints |
| **React** | 19.x | Component-based UI library | All components |
| **TypeScript** | 5.x | Type-safe JavaScript superset | Entire codebase |
| **Tailwind CSS** | 4.x (via @tailwindcss/postcss) | Utility-first CSS framework | All styling |
| **React Hook Form** | 7.x | Form state & validation management | PreorderModal |
| **Zod** | 3.x | Schema validation library | API routes & forms |
| **Nodemailer** | 6.x | Email sending library | Preorder API route |
| **React Context API** | (Built into React) | Global state management | Cart & checkout state |

---

## Next.js (App Router)

### What It Is
Next.js is a React metaframework that provides:
- **File-based routing** (folders = routes)
- **Server & client components** (separate rendering contexts)
- **API routes** (backend endpoints within the app)
- **Built-in optimization** (image optimization, code splitting)

### How We Use It

#### 1. **File-Based Routing**
The `src/app/` directory defines all routes:

```
src/app/
├── page.tsx              → "/" (Home page)
├── layout.tsx            → Root layout (wraps all pages)
├── products/
│   └── page.tsx          → "/products" (Products listing)
├── locations/
│   └── page.tsx          → "/locations" (Store locations)
└── api/
    └── preorder/
        └── route.ts      → POST "/api/preorder" (API endpoint)
```

- **`page.tsx`**: Defines a route's UI
- **`layout.tsx`**: Wraps child pages with shared UI (navbar, providers)
- **`route.ts`**: Defines API endpoints (GET, POST, etc.)

#### 2. **Server vs Client Components**
- **Server Components** (default): Render on the server, no JavaScript sent to client
  - Example: `src/app/page.tsx` (static home page)
  - Pattern: No `"use client"` directive at top of file
  
- **Client Components**: Render in browser, needed for interactivity
  - Example: `src/components/CartDrawer.tsx` (uses state, event handlers)
  - Pattern: File starts with `"use client"` directive

```tsx
// Server component (default)
export default function Home() {
  return <Hero />; // Static rendering
}

// Client component (requires "use client")
"use client";
import { useState } from "react";
export default function Products() {
  const [filters, setFilters] = useState({});
  // ^ useState only works in client components
}
```

#### 3. **API Routes**
- Located in `src/app/api/` directory
- Export named functions matching HTTP methods: `GET`, `POST`, `PUT`, etc.
- Example: `src/app/api/preorder/route.ts`

```ts
export async function POST(request: Request) {
  const json = await request.json(); // Parse request body
  // Process data...
  return NextResponse.json({ ok: true }); // Return JSON response
}
```

### Key Next.js Patterns

#### Link Navigation
```tsx
import Link from "next/link";

// Use Link for client-side navigation (no page reload)
<Link href="/products">Shop Now</Link>
```

#### Image Optimization
```tsx
import Image from "next/image";

// Next.js automatically optimizes images
<Image 
  src={product.imageUrl} 
  alt={product.name} 
  fill // Fills parent container
  className="object-cover" // Tailwind classes work
/>
```

#### Metadata (SEO)
```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: "GreenCross – Premium Cannabis Delivered",
  description: "Browse curated cannabis products...",
};
```

---

## React & TypeScript

### What It Is
- **React**: Component-based library for building UIs
- **TypeScript**: Adds static typing to JavaScript

### How We Use It

#### 1. **Component Patterns**

**Functional Components (100% of codebase uses these)**
```tsx
// Basic component
export function Hero() {
  return <section>...</section>;
}

// Component with props (typed with TypeScript)
type Props = {
  product: Product; // Product is a custom type
};

export function ProductCard({ product }: Props) {
  return <div>{product.name}</div>;
}
```

**Client Components with State**
```tsx
"use client";
import { useState } from "react";

export function ProductsPage() {
  // State: [currentValue, setterFunction]
  const [filters, setFilters] = useState<ProductFiltersState>({
    search: "",
    category: "all",
    strain: "all"
  });

  // Update state
  const handleChange = (newFilters: ProductFiltersState) => {
    setFilters(newFilters);
  };

  return <ProductFilters value={filters} onChange={handleChange} />;
}
```

#### 2. **TypeScript Type System**

**Defining Types**
```ts
// src/lib/products.ts
export type Category = "flower" | "edibles" | "concentrates" | "vapes"; // Union type
export type Strain = "indica" | "sativa" | "hybrid" | "cbd";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  strain: Strain | null; // Can be a Strain OR null
  featured?: boolean; // Optional property
  description: string;
};
```

**Using Types**
```tsx
import { Product } from "../lib/products";

// Function parameter typed
export function ProductCard({ product }: { product: Product }) {
  // TypeScript ensures product.name exists and is a string
  return <h3>{product.name}</h3>;
}
```

#### 3. **Hooks (React State & Effects)**

**useState** - Component state
```tsx
const [count, setCount] = useState(0); // Initial value: 0
setCount(count + 1); // Update state
```

**useEffect** - Side effects (runs after render)
```tsx
import { useEffect } from "react";

useEffect(() => {
  // This runs after component mounts
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords);
  });
}, []); // Empty array = run once on mount
```

**useMemo** - Memoized computed value
```tsx
const filteredProducts = useMemo(() => {
  return products.filter(p => p.category === filters.category);
}, [products, filters.category]); // Recompute only when these change
```

**useContext** - Access global state
```tsx
import { useCart } from "../lib/cart-context";

export function Navbar() {
  const { detailedItems, setCartOpen } = useCart(); // Get cart state
  const itemCount = detailedItems.reduce((sum, item) => sum + item.quantity, 0);
}
```

---

## Tailwind CSS v4

### What It Is
Utility-first CSS framework. Instead of writing CSS classes, you compose styles using pre-defined utility classes.

### How We Use It

#### 1. **Configuration**
- **No `tailwind.config.js`** (Tailwind v4 removes this)
- PostCSS plugin enabled in `postcss.config.mjs`:
  ```js
  plugins: {
    "@tailwindcss/postcss": {},
  }
  ```
- Global styles in `src/app/globals.css`

#### 2. **Utility Classes**

**Layout**
```tsx
<div className="flex items-center justify-between gap-4">
  {/* 
    flex: display: flex
    items-center: align-items: center (vertical)
    justify-between: justify-content: space-between (horizontal)
    gap-4: gap: 1rem (16px)
  */}
</div>
```

**Sizing**
```tsx
<div className="h-9 w-9 max-w-6xl">
  {/*
    h-9: height: 2.25rem (36px)
    w-9: width: 2.25rem
    max-w-6xl: max-width: 72rem (1152px)
  */}
</div>
```

**Colors**
```tsx
<div className="bg-slate-950 text-emerald-400 border-white/10">
  {/*
    bg-slate-950: background-color: rgb(2 6 23) (dark blue-gray)
    text-emerald-400: color: rgb(52 211 153) (green)
    border-white/10: border-color: rgba(255, 255, 255, 0.1) (10% opacity white)
  */}
</div>
```

**Responsive Design**
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {/*
    Mobile (default): 1 column
    sm: (640px+): 2 columns
    lg: (1024px+): 3 columns
  */}
</div>
```

**Conditional Classes**
```tsx
className={`rounded-full ${active ? "text-emerald-400" : "text-slate-300"}`}
// Template literal for dynamic classes
```

#### 3. **Custom Utility Class**
```css
/* src/app/globals.css */
.field-input {
  @apply w-full rounded-lg border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400;
}
```

Used in forms:
```tsx
<input className="field-input" placeholder="Enter name" />
```

---

## React Hook Form & Zod

### What They Are
- **React Hook Form**: Manages form state, validation, and submission
- **Zod**: Schema validation library (validates data structure)

### How We Use Them

#### 1. **Defining a Schema (Zod)**
```ts
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(1, "Required"), // String, at least 1 char
  email: z.string().email().optional(), // Valid email OR undefined
  pickupDate: z.string().min(1, "Required"),
});

// Infer TypeScript type from schema
type FormValues = z.infer<typeof schema>;
// Result: { fullName: string; email?: string; pickupDate: string }
```

#### 2. **Using React Hook Form**
```tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function PreorderModal() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema), // Connect Zod validation
    defaultValues: { fullName: "", email: "", pickupDate: "" },
  });

  async function onSubmit(values: FormValues) {
    // values is type-safe and validated
    await fetch("/api/preorder", {
      method: "POST",
      body: JSON.stringify(values),
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register("fullName")} />
      {form.formState.errors.fullName && (
        <span>{form.formState.errors.fullName.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Key Methods:**
- `form.register("fieldName")`: Connects input to form state
- `form.formState.errors`: Object containing validation errors
- `form.handleSubmit(onSubmit)`: Validates before calling onSubmit
- `form.reset()`: Clears form back to defaultValues

---

## Nodemailer

### What It Is
Node.js library for sending emails via SMTP.

### How We Use It

Located in: `src/app/api/preorder/route.ts`

```ts
import nodemailer from "nodemailer";

// Create transporter (SMTP client)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false, // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER, // Email account
    pass: process.env.SMTP_PASS, // Email password
  },
});

// Send email
await transporter.sendMail({
  from: process.env.SMTP_FROM ?? "no-reply@greencross.local",
  to: "greencrossmgmt@gmail.com", // Fixed recipient
  subject: `New preorder – ${customer.fullName}`,
  text: "Order details...", // Plain text body
});
```

**Environment Variables Required:**
- `SMTP_HOST`: SMTP server hostname
- `SMTP_PORT`: SMTP server port (usually 587 or 465)
- `SMTP_USER`: Email account username
- `SMTP_PASS`: Email account password
- `SMTP_FROM`: Sender email address

---

## State Management (React Context)

### What It Is
React Context API provides global state without prop drilling (passing props through many layers).

### How We Use It

Located in: `src/lib/cart-context.tsx`

#### 1. **Creating Context**
```tsx
import { createContext, useContext, useState } from "react";

// Define the shape of context data
type CartContextValue = {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  subtotal: number;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
};

// Create context (undefined initially)
const CartContext = createContext<CartContextValue | undefined>(undefined);
```

#### 2. **Providing Context**
```tsx
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);

  const addItem = (productId: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });
  };

  const value: CartContextValue = {
    items,
    addItem,
    removeItem: (id) => setItems(prev => prev.filter(i => i.productId !== id)),
    subtotal: items.reduce((sum, item) => sum + item.quantity * getPrice(item), 0),
    isCartOpen,
    setCartOpen,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
```

#### 3. **Consuming Context**
```tsx
// Custom hook for accessing context
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}

// In any component
export function Navbar() {
  const { detailedItems, setCartOpen } = useCart();
  return <button onClick={() => setCartOpen(true)}>Cart ({detailedItems.length})</button>;
}
```

#### 4. **Wrapping App with Provider**
```tsx
// src/app/layout.tsx
import { CartProvider } from "../lib/cart-context";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CartProvider>
          {/* All children can now access cart context */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
```

---

## Project Structure

```
green-leaf-express-webapp/
├── src/
│   ├── app/                      # Next.js App Router (routes & pages)
│   │   ├── layout.tsx            # Root layout (wraps all pages)
│   │   ├── page.tsx              # Home page (/)
│   │   ├── globals.css           # Global styles & Tailwind imports
│   │   ├── products/
│   │   │   └── page.tsx          # Products listing page (/products)
│   │   ├── locations/
│   │   │   └── page.tsx          # Locations page (/locations)
│   │   └── api/
│   │       └── preorder/
│   │           └── route.ts      # POST /api/preorder (email sending)
│   │
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.tsx            # Top navigation bar
│   │   ├── Hero.tsx              # Landing page hero section
│   │   ├── FeatureCards.tsx      # 3-card feature section
│   │   ├── ProductFilters.tsx    # Search + category/strain filters
│   │   ├── ProductCard.tsx       # Individual product tile
│   │   ├── ProductGrid.tsx       # Grid layout for product cards
│   │   ├── CartDrawer.tsx        # Right-side cart drawer
│   │   ├── PreorderModal.tsx     # Checkout modal with form
│   │   ├── LocationMap.tsx       # Location map preview + nearest detection
│   │   └── icons.tsx             # SVG icon components
│   │
│   └── lib/                      # Business logic & data
│       ├── cart-context.tsx      # Cart state management (Context API)
│       ├── products.ts           # Product catalog (static data)
│       ├── locations.ts          # Store locations (static data)
│       └── geo.ts                # Geolocation utilities (haversine distance)
│
├── public/                       # Static assets (if any)
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS (Tailwind) configuration
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
├── WARP.md                       # Project documentation for Warp AI
└── AI_ARCHITECTURE_GUIDE.md     # This file
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Wraps entire app with fonts, providers, navbar, cart drawer |
| `src/app/page.tsx` | Home page (Hero + FeatureCards) |
| `src/app/products/page.tsx` | Products listing with filters |
| `src/app/locations/page.tsx` | Store locations with map |
| `src/app/api/preorder/route.ts` | API endpoint for preorder submission |
| `src/lib/cart-context.tsx` | Global cart state (items, UI flags, actions) |
| `src/lib/products.ts` | Static product catalog |
| `src/lib/locations.ts` | Static location data |
| `src/lib/geo.ts` | Distance calculation utilities |
| `src/components/*` | Reusable UI components |

---

## Data Flow Diagrams

### 1. **Adding a Product to Cart**

```
User clicks "Add to Order" button
           ↓
ProductCard.onClick calls useCart().addItem(productId)
           ↓
CartContext.addItem updates items state
           ↓
CartContext.setCartOpen(true) opens drawer
           ↓
CartDrawer re-renders showing new item
```

### 2. **Preorder Submission**

```
User fills form in PreorderModal
           ↓
User clicks "Place Pre-Order"
           ↓
React Hook Form validates via Zod schema
           ↓
If valid: onSubmit makes POST /api/preorder
           ↓
API route validates with Zod again
           ↓
API route sends email via Nodemailer
           ↓
API returns { ok: true }
           ↓
Modal shows success, clears cart, closes drawer
```

### 3. **Product Filtering**

```
User types in search or clicks category pill
           ↓
ProductFilters.onChange updates parent state
           ↓
ProductsPage.setFilters updates filters state
           ↓
useMemo recomputes filteredProducts
           ↓
ProductGrid re-renders with filtered list
```

---

## Common Patterns & Syntax

### 1. **Conditional Rendering**

```tsx
// If-else with ternary
{hasItems ? (
  <div>Cart has items</div>
) : (
  <div>Cart is empty</div>
)}

// Conditional with &&
{error && <p className="text-rose-300">{error}</p>}
// ^ Only renders <p> if error is truthy
```

### 2. **List Rendering**

```tsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
// ^ Always provide unique "key" prop for list items
```

### 3. **Event Handlers**

```tsx
// Inline arrow function
<button onClick={() => setCartOpen(true)}>Open</button>

// Function reference
<button onClick={handleClick}>Click</button>

// With parameters
<button onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
```

### 4. **State Updates (Immutable)**

```tsx
// Arrays - don't mutate, create new array
setItems([...items, newItem]); // Add
setItems(items.filter(item => item.id !== id)); // Remove
setItems(items.map(item => item.id === id ? { ...item, qty: 2 } : item)); // Update

// Objects - don't mutate, create new object
setFilters({ ...filters, category: "flower" }); // Update one property
```

### 5. **TypeScript Prop Types**

```tsx
// Inline type
export function Button({ label }: { label: string }) { ... }

// Separate type
type ButtonProps = {
  label: string;
  onClick?: () => void; // Optional prop
};
export function Button({ label, onClick }: ButtonProps) { ... }
```

### 6. **Async/Await (API Calls)**

```tsx
async function onSubmit(values: FormValues) {
  setSubmitting(true);
  try {
    const res = await fetch("/api/preorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Failed");
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  } finally {
    setSubmitting(false);
  }
}
```

### 7. **Template Literals (String Interpolation)**

```tsx
// Embed variables in strings
const message = `Hello, ${user.name}!`;

// Multi-line strings
const text = `
  Line 1
  Line 2
`;

// Dynamic class names
className={`base-class ${active ? "active" : "inactive"}`}
```

### 8. **Optional Chaining & Nullish Coalescing**

```tsx
// Optional chaining (?.) - safe property access
const phone = customer?.contact?.phone; // Doesn't error if customer is null

// Nullish coalescing (??) - default value only if null/undefined
const port = process.env.PORT ?? 3000; // Use 3000 if PORT is null/undefined
```

### 9. **Array Methods (Functional)**

```tsx
// filter: keep items matching condition
const flowers = products.filter(p => p.category === "flower");

// map: transform each item
const prices = products.map(p => p.price);

// reduce: aggregate to single value
const total = items.reduce((sum, item) => sum + item.price, 0);

// find: get first match
const product = products.find(p => p.id === "blue-dream");
```

### 10. **Destructuring**

```tsx
// Object destructuring
const { name, price } = product;
// Same as: const name = product.name; const price = product.price;

// Array destructuring
const [first, second] = items;
// Same as: const first = items[0]; const second = items[1];

// In function parameters
export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return <h1>{title}</h1>;
}
```

---

## Summary Cheatsheet

| Concept | Syntax Example |
|---------|----------------|
| **Client Component** | `"use client";` at top of file |
| **Server Component** | No directive (default) |
| **State** | `const [value, setValue] = useState(initial);` |
| **Effect** | `useEffect(() => { /* side effect */ }, [deps]);` |
| **Context** | `const value = useContext(MyContext);` |
| **Conditional Render** | `{condition ? <A /> : <B />}` |
| **List Render** | `{items.map(item => <div key={item.id}>{item.name}</div>)}` |
| **Event Handler** | `<button onClick={() => doSomething()}>Click</button>` |
| **Props** | `export function Comp({ name }: { name: string }) {}` |
| **CSS Classes** | `className="flex items-center gap-4"` |
| **Dynamic Classes** | `className={\`base ${active && "active"}\`}` |
| **API Route** | `export async function POST(request: Request) {}` |
| **Form Hook** | `const form = useForm<T>({ resolver: zodResolver(schema) });` |
| **Schema** | `const schema = z.object({ name: z.string() });` |
| **Type Inference** | `type T = z.infer<typeof schema>;` |
| **Async/Await** | `const res = await fetch(url); const data = await res.json();` |

---

## Notes for AI Agents

1. **Always check if a component needs `"use client"`**: If it uses hooks (useState, useEffect, useContext) or event handlers, it must be a client component.

2. **Type safety is enforced**: Every function, prop, and state variable is typed. Use existing types from `src/lib/*.ts` when possible.

3. **Tailwind instead of CSS files**: All styling is done via utility classes. Refer to Tailwind docs for class names.

4. **Context pattern**: Cart state is global via React Context. Use `useCart()` hook in any component, but ensure it's wrapped by `CartProvider`.

5. **Form validation**: Always use Zod schemas for both client-side (React Hook Form) and server-side (API routes) validation.

6. **Image optimization**: Use Next.js `<Image>` component, not `<img>`, for automatic optimization.

7. **Navigation**: Use `<Link>` from `next/link`, not `<a>`, for client-side routing.

8. **Environment variables**: Required for SMTP in production. Check `src/app/api/preorder/route.ts` for list.

9. **Static data**: Products and locations are hardcoded in `src/lib/products.ts` and `src/lib/locations.ts`. Modify these arrays to change catalog.

10. **Code style**: Functional components, TypeScript strict mode, no class components, immutable state updates, explicit return types preferred.

---

**End of AI Architecture Guide**
