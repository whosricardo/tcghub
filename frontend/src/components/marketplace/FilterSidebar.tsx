"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "motion/react";
import { smooth } from "@/motion/transitions";

const EDITIONS = [
  "Romance Dawn",
  "Paramount War",
  "Pillars of Strength",
  "Kingdoms of Intrigue",
  "Awakening of the New Era",
  "Wings of the Captain",
  "Memorial Collection",
  "500 Years in the Future",
  "Two Legends",
  "Premium Booster -The Best-",
  "The New Emperor",
  "Royal Blood",
  "Glorious Rebels",
  "A Legacy of the Master",
  "Inherited Will",
  "Seven Heroes of the Blue Sea",
];
const RARITIES = [
  "Common",
  "Uncommon",
  "Rare",
  "Super Rare",
  "Secret Rare",
  "Leader",
  "Special",
  "Treasure Rare",
  "Promo",
];
const CARD_TYPES = ["Leader", "Character", "Event", "Stage", "DON!"];
const COLORS = ["Red", "Green", "Blue", "Purple", "Black", "Yellow"];

export function FilterSidebar() {
  return (
    <motion.aside 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={smooth}
      className="hidden w-64 shrink-0 flex-col gap-8 md:flex sticky top-[100px] h-[calc(100vh-100px)] overflow-y-auto pb-8"
    >
      <div>
        <h2 className="mb-6 text-xl font-bold">Filters</h2>
        
        {/* Edition Filter */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Edition</h3>
          <div className="flex flex-col gap-3">
            {EDITIONS.map((edition) => (
              <label key={edition} className="flex cursor-pointer items-center gap-3">
                <Checkbox id={`edition-${edition}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{edition}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rarity Filter */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Rarity</h3>
          <div className="flex flex-col gap-3">
            {RARITIES.map((rarity) => (
              <label key={rarity} className="flex cursor-pointer items-center gap-3">
                <Checkbox id={`rarity-${rarity}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{rarity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Color</h3>
          <div className="flex flex-col gap-3">
            {COLORS.map((color) => (
              <label key={color} className="flex cursor-pointer items-center gap-3">
                <Checkbox id={`color-${color}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Card Type Filter */}
        <div className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Card Type</h3>
          <div className="flex flex-col gap-3">
            {CARD_TYPES.map((type) => (
              <label key={type} className="flex cursor-pointer items-center gap-3">
                <Checkbox id={`type-${type}`} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-gray-100">Price Range</h3>
          <div className="flex items-center gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0070c9] dark:border-gray-800 dark:bg-card"
            />
            <span className="text-gray-500">to</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#0070c9] dark:border-gray-800 dark:bg-card"
            />
          </div>
          <button className="mt-4 w-full rounded-md bg-linear-to-r from-[#0070c9] to-[#60a5fa] py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            Apply Price
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
