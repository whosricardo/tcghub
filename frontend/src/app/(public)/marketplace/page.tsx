import { Suspense } from "react";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { MarketplaceHeader } from "@/components/marketplace/MarketplaceHeader";
import { ProductGrid } from "@/components/marketplace/ProductGrid";

import Navbar from "@/components/homepage/layout/navbar";

export default function MarketplacePage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50/50 dark:bg-background">
      <Navbar />
      
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="flex items-start gap-8">
          <FilterSidebar />
          
          <div className="flex-1 overflow-hidden">
            <MarketplaceHeader />
            <ProductGrid />
          </div>
        </div>
      </div>
    </main>
  );
}
