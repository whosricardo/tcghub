"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Pagination } from "@/components/common/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { useMarketplaceCards } from "./hooks/useMarketplaceCards";
import { Loader2 } from "lucide-react";

export function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isFetching, isError } = useMarketplaceCards({}, currentPage, limit);

  const currentProducts = data?.content || [];
  const totalElements = data?.totalElements || 0;
  const totalPages = data?.totalPages || 0;

  // usePagination: calcula startItem e endItem para o texto "Mostrando X a Y de Z"
  const { startItem, endItem } = usePagination({
    totalElements,
    page: currentPage,
    limit,
  });

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
      {/* Contador */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">{startItem}</span>
          {" "}a{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">{endItem}</span>
          {" "}de{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">{totalElements}</span>
          {" "}cartas
        </p>
        {isFetching && (
          <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
        )}
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Paginação: componente compartilhado (usa usePagination internamente) */}
      <section className="flex flex-row justify-center items-center">
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            data={currentProducts}
            limit={limit}
            isFetching={isFetching}
            totalElements={totalElements}
            totalPages={totalPages}
          />
      </section>
      
    </div>
  );
}
