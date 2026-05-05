"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { Pagination } from "@/components/common/pagination";
import { usePagination } from "@/hooks/use-pagination";
import { useMarketplaceCards } from "./hooks/useMarketplaceCards";

const SKELETON_COUNT = 12;

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

  // Exibe skeleton tanto no carregamento inicial quanto nas transições de página
  const showSkeleton = isLoading || isFetching;

  if (isError) {
    return (
      <div className="flex w-full items-center justify-center p-12">
        <p className="text-red-500">Erro ao carregar as cartas do Marketplace.</p>
      </div>
    );
  }

  if (!showSkeleton && currentProducts.length === 0) {
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
          {showSkeleton ? (
            <span className="inline-block h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          ) : (
            <>
              Mostrando{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">{startItem}</span>
              {" "}a{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">{endItem}</span>
              {" "}de{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">{totalElements}</span>
              {" "}cartas
            </>
          )}
        </p>
      </div>

      {/* Grid — skeletons ou cards reais, sempre no mesmo container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {showSkeleton
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {/* Paginação — só aparece quando temos dados reais */}
      {!isLoading && totalPages > 1 && (
        <section className="flex w-full items-center justify-center">
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
      )}
    </div>
  );
}
