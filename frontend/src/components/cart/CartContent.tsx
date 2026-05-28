"use client"

import React, { useMemo } from 'react';
import { useCartStore } from '@/store/cartStore';
import { CartItemCard } from './CartItemCard';
import { CartSummary } from './CartSummary';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { gentle, smooth } from '@/motion/transitions';

export function CartContent() {
    const { items, removeItem, updateQuantity, selectedShippingMethod, setShippingMethod } = useCartStore();

    const groupedItems = useMemo(() => {
        const groups: Record<string, typeof items> = {};
        items.forEach(item => {
            if (!groups[item.sellerName]) {
                groups[item.sellerName] = [];
            }
            groups[item.sellerName].push(item);
        });
        return groups;
    }, [items]);

    if (items.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={gentle}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-12 text-center flex flex-col items-center justify-center min-h-[400px]"
            >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-gray-400 dark:text-gray-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Seu carrinho está vazio</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                    Looks like you haven't added any cards to your cart yet. Explore the marketplace to find what you're looking for!
                </p>
                <Link
                    href="/marketplace"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                    Explorar Marketplace
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-6">
                {Object.entries(groupedItems).map(([sellerName, sellerItems], index) => {
                    const FREE_SHIPPING_THRESHOLD = 50.0;
                    const packageSubtotal = sellerItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    const isFreeShipping = packageSubtotal >= FREE_SHIPPING_THRESHOLD;
                    const method = selectedShippingMethod[sellerName] || 'local';
                    const packageShipping = isFreeShipping ? 0 : (method === 'regional' ? 15.50 : (sellerItems[0]?.shippingCost || 0));

                    const amountAway = Math.max(0, FREE_SHIPPING_THRESHOLD - packageSubtotal);
                    const progressPercent = Math.min(100, (packageSubtotal / FREE_SHIPPING_THRESHOLD) * 100);

                    return (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ ...smooth, delay: index * 0.1 }}
                            key={sellerName}
                            className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden"
                        >
                            <div className="bg-[#1e293b] text-white px-6 py-3 flex justify-between items-center">
                                <div className="flex items-center gap-2 font-medium">
                                    <ShoppingBag size={16} />
                                    {sellerName}
                                </div>
                                <span className="text-sm text-gray-300">Package {index + 1} of {Object.keys(groupedItems).length}</span>
                            </div>

                            <div className="p-6 flex flex-col gap-6">
                                <div className="max-h-[280px] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                                    {sellerItems.map(item => (
                                        <CartItemCard
                                            key={item.id}
                                            item={item}
                                            onRemove={() => removeItem(item.id)}
                                            onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                                        />
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">Package Subtotal:</span>
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">$ {(packageSubtotal + packageShipping).toFixed(2)}</span>
                                        </div>
                                        <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex justify-between">
                                                <span>Items ({sellerItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                                                <span>$ {packageSubtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Shipping</span>
                                                <span>$ {packageShipping.toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
                                            {isFreeShipping ? (
                                                <p className="text-green-600 dark:text-green-400 font-semibold">
                                                    You've unlocked free shipping!
                                                </p>
                                            ) : (
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    You're <span className="font-semibold text-blue-600 dark:text-blue-400">R$ {amountAway.toFixed(2)} away</span> from free shipping with this seller!
                                                </p>
                                            )}

                                            {!isFreeShipping && (
                                                <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline mt-1">
                                                    Shop this seller
                                                </button>
                                            )}

                                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
                                                <div
                                                    className={`h-1.5 rounded-full transition-all duration-500 ${isFreeShipping ? 'bg-green-500' : 'bg-blue-600'}`}
                                                    style={{ width: `${progressPercent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-3">
                                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Shipping Option</h4>
                                        <div className="space-y-2">
                                            <label className="flex items-center justify-between p-3 border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg cursor-pointer">
                                                <div className="flex gap-3 items-start">
                                                    <input
                                                        type="radio"
                                                        name={`shipping-${sellerName}`}
                                                        checked={method === 'local'}
                                                        onChange={() => setShippingMethod(sellerName, 'local')}
                                                        className="mt-1"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Local Warehouse</div>
                                                        <div className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-0.5">
                                                            <span>✓</span> 15km away • 2-3 days
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">$ {(sellerItems[0]?.shippingCost || 0).toFixed(2)}</span>
                                            </label>

                                            <label className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <div className="flex gap-3 items-start">
                                                    <input
                                                        type="radio"
                                                        name={`shipping-${sellerName}`}
                                                        checked={method === 'regional'}
                                                        onChange={() => setShippingMethod(sellerName, 'regional')}
                                                        className="mt-1"
                                                    />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">Regional Warehouse</div>
                                                        <div className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1 mt-0.5">
                                                            <span>🚚</span> 240km away • 4-5 days
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">$ {isFreeShipping ? '0.00' : '15.50'}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Removed bottom actions */}
            </div>

            <div className="w-full lg:w-[380px] shrink-0 space-y-6 sticky top-24 self-start">
                <CartSummary />
            </div>
        </div>
    );
}
