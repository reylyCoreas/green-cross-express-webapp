"use client";

import { useMemo, useState } from "react";
import { products } from "../../lib/products";
import { ProductFilters, ProductFiltersState } from "../../components/ProductFilters";
import { ProductGrid } from "../../components/ProductGrid";

const initialFilters: ProductFiltersState = {
  search: "",
  category: "all",
  strain: "all",
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFiltersState>(initialFilters);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        filters.category !== "all" &&
        product.category !== filters.category
      ) {
        return false;
      }
      if (
        filters.strain !== "all" &&
        product.strain &&
        product.strain !== filters.strain
      ) {
        return false;
      }
      if (filters.strain !== "all" && !product.strain) {
        return false;
      }
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        if (
          !product.name.toLowerCase().includes(q) &&
          !product.description.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="bg-slate-950 px-6 pb-24 pt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-50">
            Our Products
          </h1>
          <p className="text-sm text-slate-400">
            Browse our full selection of premium cannabis products.
          </p>
        </header>

        <ProductFilters value={filters} onChange={setFilters} />

        <section className="space-y-3">
          <p className="text-xs text-slate-500">
            Showing {filteredProducts.length} products
          </p>
          <ProductGrid products={filteredProducts} />
        </section>
      </div>
    </div>
  );
}
