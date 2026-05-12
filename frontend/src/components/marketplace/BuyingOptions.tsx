import React from 'react';
import { ShoppingCart, Check, ShieldCheck, Star } from 'lucide-react';

export function BuyingOptions() {
    return (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-6">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Buying Options
            </h3>

            {/* Direct from TCG Store */}
            <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Direct from TCG Store</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full uppercase">Premium</span>
                </div>
                
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">$2.59</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 mb-1">NM</span>
                </div>

                <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 mb-3">
                    <li className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-500" />
                        Guaranteed Authenticity
                    </li>
                    <li className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-500" />
                        Instant Processing
                    </li>
                    <li className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-500" />
                        Free Return Shipping
                    </li>
                </ul>

                <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>

            {/* Certified Partner Store */}
            <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Certified Partner Store</span>
                </div>
                
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$1.80</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 mb-1">NM</span>
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-900 dark:text-gray-200">Kaiser's Kard House</span>
                        <span className="flex items-center text-yellow-500">
                            <Star size={12} fill="currentColor" />
                            <span className="ml-0.5 text-gray-500">5.0</span>
                        </span>
                    </div>
                    <div className="text-gray-500">+ $1.31 shipping (Free over $5)</div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>

            {/* Community Marketplace */}
            <div className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Community Marketplace</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full uppercase">Lowest</span>
                </div>
                
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">$1.40</span>
                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400 mb-1">MP</span>
                </div>

                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <div className="flex items-center gap-1.5">
                        <span className="font-medium text-gray-900 dark:text-gray-200">User_9281</span>
                        <span className="text-gray-500">(12 sales)</span>
                    </div>
                    <div className="text-gray-500">+ $1.20 shipping</div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
                    <ShoppingCart size={16} />
                    Add to Cart
                </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                <ShieldCheck size={14} />
                <span>Secure Transaction via TCG Player</span>
            </div>
        </div>
    );
}
