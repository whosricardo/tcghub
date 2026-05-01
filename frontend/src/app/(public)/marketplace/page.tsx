import { Suspense } from "react";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { ProductGrid } from "@/components/marketplace/ProductGrid";
import { MOCK_PRODUCTS } from "@/mockedData/marketplace";

import Navbar from "@/components/homepage/layout/navbar";

// Simulate a database fetch
async function fetchProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return MOCK_PRODUCTS;
}

export default async function MarketplacePage() {
  const products = await fetchProducts();

  return (
    <main className="flex min-h-screen flex-col bg-gray-50/50 dark:bg-background">
      <Navbar />
      
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-start gap-8">
          <FilterSidebar />
          
          <div className="flex-1 overflow-hidden">
            <MarketplaceHeader />
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </main>
  );
}
