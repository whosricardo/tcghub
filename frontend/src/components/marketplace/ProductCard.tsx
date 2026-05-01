"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/mockedData/marketplace";
import { Flame, Heart, ShoppingCart } from "lucide-react";
import { useOptimistic, useTransition } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isPending, startTransition] = useTransition();

  // Optimistic UI for Favorite
  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(
    product.isFavorite,
    (state, newFavorite: boolean) => newFavorite
  );

  // Optimistic UI for Add to Cart
  const [optimisticAdded, addOptimisticCart] = useOptimistic(
    false,
    (state, added: boolean) => added
  );

  const toggleFavorite = () => {
    startTransition(async () => {
      addOptimisticFavorite(!optimisticFavorite);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };

  const handleAddToCart = () => {
    startTransition(async () => {
      addOptimisticCart(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-card">
      {/* Top Badges */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={product.rarity.includes("MYTHIC") ? "mythic" : product.rarity.includes("RARE") ? "rare" : "common"}>
            {product.rarity}
          </Badge>
          {product.isHot && (
            <Badge variant="hot">
              <Flame className="h-3 w-3" /> HOT
            </Badge>
          )}
        </div>
        <button
          onClick={toggleFavorite}
          className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800"
          aria-label={optimisticFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-5 w-5 ${
              optimisticFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="mt-auto flex flex-col gap-1">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {product.edition}
        </p>
        <h3 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {product.title}
        </h3>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 dark:text-gray-400">Current Price</span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              ${product.price.toFixed(2)}
            </span>
          </div>
          
          <Button 
            variant="default"
            size="sm" 
            onClick={handleAddToCart}
            disabled={optimisticAdded || isPending}
            className="w-24 bg-linear-to-r from-[#0070c9] to-[#60a5fa] font-semibold text-white transition-all"
          >
            {optimisticAdded ? (
              "Added!"
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" /> Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
