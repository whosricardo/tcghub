import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CartSummary() {
    const { getCartTotal, getShippingTotal, getItemCount, items, clearCart } = useCartStore();
    
    const cartTotal = getCartTotal();
    const shippingTotal = getShippingTotal();
    const grandTotal = cartTotal + shippingTotal;
    
    const uniquePackages = new Set(items.map(i => i.sellerName)).size;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Cart Summary
            </h2>
            
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Packages</span>
                    <span>{uniquePackages}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Items</span>
                    <span>{getItemCount()}</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800"></div>
                
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Item Total</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Estimated Shipping</span>
                    <span>R$ {shippingTotal.toFixed(2)}</span>
                </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mb-6">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-base font-bold text-gray-900 dark:text-white">Cart Subtotal</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">R$ {grandTotal.toFixed(2)}</span>
                </div>
                <div className="text-[10px] text-gray-500 text-right">Taxes calculated at checkout</div>
            </div>
            
            <div className="space-y-4">
                <Link 
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-full font-semibold transition-colors"
                >
                    Check Out
                    <ArrowRight size={16} />
                </Link>
                
                <button 
                    onClick={clearCart}
                    className="w-full flex items-center justify-center text-sm text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors mt-4"
                >
                    Remove all items
                </button>
            </div>
        </div>
    );
}
