import React from 'react';
import Image from 'next/image';
import { CartItem } from '@/store/cartStore';

interface CartItemCardProps {
    item: CartItem;
    onRemove: () => void;
    onUpdateQuantity: (quantity: number) => void;
}

export function CartItemCard({ item, onRemove, onUpdateQuantity }: CartItemCardProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 first:pt-0">
            <div className="w-20 sm:w-24 shrink-0">
                <div className="relative aspect-[2.5/3.5] rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {item.edition}
                            </p>
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white shrink-0">
                            $ {item.price.toFixed(2)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full uppercase">
                            {item.condition}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Foil - English
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden h-8">
                        <button
                            className="px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                            onClick={() => onUpdateQuantity(item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            -
                        </button>
                        <span className="px-3 text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-900 min-w-[2.5rem] text-center border-x border-gray-200 dark:border-gray-700 h-full flex items-center justify-center">
                            {item.quantity}
                        </span>
                        <button
                            className="px-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors"
                            onClick={() => onUpdateQuantity(item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>

                    <div className="flex gap-3 ml-2 border-l border-gray-200 dark:border-gray-700 pl-4 text-sm">
                        <button
                            onClick={onRemove}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
