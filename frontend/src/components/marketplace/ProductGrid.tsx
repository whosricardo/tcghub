"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { usePagination } from "@/hooks/use-pagination";
import { useMarketplaceCards } from "./hooks/useMarketplaceCards";
import { Loader2 } from "lucide-react";

export function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError } = useMarketplaceCards({}, currentPage, limit);

  const currentProducts = data?.content || [];
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 0;

  // Utilize the required custom hook to maintain structure, 
  // even though data is pre-sliced by the backend API.
  const { startItem, endItem } = usePagination({
    totalElements,
    page: currentPage,
    limit,
  });

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const pageNumbers = Array.from(
    { length: Math.min(3, totalPages > 0 ? totalPages : 1) },
    (_, i) => i + 1
  );

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center p-12">
        <p className="text-red-500">Erro ao carregar as cartas do Marketplace.</p>
      </div>
    );
  }

  if (currentProducts.length === 0) {
    return (
      <div className="flex w-full items-center justify-center p-12">
        <p className="text-gray-500">Nenhuma carta encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando <span className="font-medium text-gray-900 dark:text-gray-100">{startItem}</span> a <span className="font-medium text-gray-900 dark:text-gray-100">{endItem}</span> de <span className="font-medium text-gray-900 dark:text-gray-100">{totalElements}</span> cartas
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex w-full items-center justify-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-800 dark:bg-card dark:hover:bg-gray-900"
          >
            &lt;
          </button>
          
          {pageNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={
                currentPage === num
                  ? "flex h-10 w-10 items-center justify-center rounded-md bg-linear-to-r from-[#0070c9] to-[#60a5fa] font-medium text-white shadow-sm hover:opacity-90"
                  : "flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-card dark:text-gray-300 dark:hover:bg-gray-900"
              }
            >
              {num}
            </button>
          ))}

          {totalPages > 3 && (
            <span className="flex h-10 w-10 items-center justify-center text-gray-500">
              ...
            </span>
          )}
          
          {totalPages > 3 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={
                currentPage === totalPages
                  ? "flex h-10 w-10 items-center justify-center rounded-md bg-linear-to-r from-[#0070c9] to-[#60a5fa] font-medium text-white shadow-sm hover:opacity-90"
                  : "flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-card dark:text-gray-300 dark:hover:bg-gray-900"
              }
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-800 dark:bg-card dark:hover:bg-gray-900"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
