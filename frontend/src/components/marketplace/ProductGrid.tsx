import { ProductCard } from "./ProductCard";
import { Product } from "@/mockedData/marketplace";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex w-full items-center justify-center gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-800 dark:bg-card dark:hover:bg-gray-900">
          &lt;
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md bg-linear-to-r from-[#0070c9] to-[#60a5fa] font-medium text-white shadow-sm hover:opacity-90">
          1
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-card dark:text-gray-300 dark:hover:bg-gray-900">
          2
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-card dark:text-gray-300 dark:hover:bg-gray-900">
          3
        </button>
        <span className="flex h-10 w-10 items-center justify-center text-gray-500">
          ...
        </span>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-card dark:text-gray-300 dark:hover:bg-gray-900">
          42
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-card dark:hover:bg-gray-900">
          &gt;
        </button>
      </div>
    </div>
  );
}
