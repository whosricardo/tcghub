"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useMarketplaceCards } from "./hooks/useMarketplaceCards";
import { motion } from "motion/react";
import { gentle } from "@/motion/transitions";

const TABS = ["Singles", "Booster Boxes", "Collections/Decks"];

export function MarketplaceHeader() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  
  const { data } = useMarketplaceCards({}, 1, 12);
  const totalElements = data?.totalElements || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={gentle}
      className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
          Marketplace
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Encontre tudo o que você precisa para sua coleção
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                  : "bg-white text-gray-600 hover:bg-gray-100 dark:bg-card dark:text-gray-400 dark:hover:bg-gray-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full md:w-auto">
        <select 
          className="w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-sm outline-none dark:border-gray-800 dark:bg-card md:w-48"
          defaultValue="newest"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </motion.div>
  );
}
