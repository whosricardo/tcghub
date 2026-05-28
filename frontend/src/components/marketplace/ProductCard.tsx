"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition, useOptimistic } from "react";
import { Heart, ShoppingCart, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/mockedData/marketplace";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [optimisticFavorite, addOptimisticFavorite] = useOptimistic(
    product.isFavorite,
    (state, newFavorite: boolean) => newFavorite
  );

  const [optimisticAdded, addOptimisticCart] = useOptimistic(
    false,
    (state, added: boolean) => added
  );

  const [imgSrc, setImgSrc] = useState(product.image);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(async () => {
      addOptimisticFavorite(!optimisticFavorite);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(async () => {
      addOptimisticCart(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };

  const getBadgeVariant = (rarity: string) => {
    const r = rarity?.toUpperCase() || "";
    if (r.includes("SEC") || r.includes("SR") || r.includes("MYTHIC")) return "mythic";
    if (r.includes("R") || r.includes("RARE")) return "rare";
    return "common";
  };

  return (
    <Link
      href={`/marketplace/${product.id}`}
      className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950 dark:hover:border-blue-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={getBadgeVariant(product.rarity)}>
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
          <Heart className={`h-5 w-5 ${optimisticFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
        <Image
          src={imgSrc || "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80"}
          alt={product.title}
          fill
          loading="lazy"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImgSrc("https://images.unsplash.com/photo-1618331835717-801e976710b2?w=500&q=80")}
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
              ${(Number(product.price) || 0).toFixed(2)}
            </span>
          </div>
          
          <Button 
            className={`rounded-full transition-all duration-300 ${
              isHovered 
                ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600' 
                : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
            }`}
            size="icon"
            disabled={optimisticAdded || isPending}
            onClick={handleAddToCart}
          >
            {optimisticAdded ? <ShoppingCart className="h-4 w-4 fill-current" /> : <ShoppingCart className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </Link>
  );
}
