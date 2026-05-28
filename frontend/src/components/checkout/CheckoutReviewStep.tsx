"use client";

import React from 'react';
import Image from 'next/image';
import { useCartStore, CartItem } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, Truck } from 'lucide-react';

export function CheckoutReviewStep() {
    const { items, selectedShippingMethod, getCartTotal, getShippingTotal } = useCartStore();
    const { nextStep } = useCheckoutStore();

    // Group items by seller
    const itemsBySeller: Record<string, CartItem[]> = {};
    items.forEach(item => {
        if (!itemsBySeller[item.sellerName]) {
            itemsBySeller[item.sellerName] = [];
        }
        itemsBySeller[item.sellerName].push(item);
    });

    const cartTotal = getCartTotal();
    const shippingTotal = getShippingTotal();
    const grandTotal = cartTotal + shippingTotal;

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <ShoppingBag className="size-16 text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seu carrinho está vazio</h3>
                <p className="text-sm text-gray-500 mt-1">Adicione cartas do marketplace antes de fechar a compra.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingBag className="size-5 text-sky-600" />
                Revisão do Pedido
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Verifique os pacotes e cartas de cada vendedor antes de preencher o endereço de entrega.
            </p>

            <div className="space-y-4">
                {Object.entries(itemsBySeller).map(([sellerName, sellerItems]) => {
                    const shippingMethod = selectedShippingMethod[sellerName] || 'local';
                    const packageSubtotal = sellerItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    const isFreeShipping = packageSubtotal >= 50.0;
                    const shippingPrice = isFreeShipping
                        ? 0
                        : (shippingMethod === 'regional' ? 15.50 : (sellerItems[0]?.shippingCost || 0));

                    return (
                        <div
                            key={sellerName}
                            className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl p-5 shadow-xs space-y-4"
                        >
                            {/* Seller Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-50 dark:border-gray-900 pb-3">
                                <div>
                                    <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Vendedor</span>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{sellerName}</h4>
                                </div>
                                <div className="flex items-center gap-2 text-xs bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-800">
                                    <Truck className="size-3.5 text-gray-500" />
                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                        Frete: {isFreeShipping ? (
                                            <span className="text-green-600 dark:text-green-400 font-semibold">Grátis (acima de R$50)</span>
                                        ) : (
                                            `$ ${shippingPrice.toFixed(2)} (${shippingMethod === 'regional' ? 'Regional' : 'Local'})`
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Seller Items */}
                            <div className="divide-y divide-gray-50 dark:divide-gray-900">
                                {sellerItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 py-3 first:pt-0 last:pb-0 items-center">
                                        <div className="relative size-12 shrink-0 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50">
                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="object-contain w-full h-full"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-[10px] text-gray-400">TCG</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.title}</h5>
                                            <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-900 rounded-md font-mono text-[10px] border border-gray-200 dark:border-gray-800">{item.condition}</span>
                                                <span>•</span>
                                                <span className="truncate">{item.edition}</span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">
                                                $ {item.price.toFixed(2)}
                                            </span>
                                            <div className="text-xs text-gray-400 dark:text-gray-600 mt-0.5">
                                                Qtd: {item.quantity}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Seller Package Subtotal */}
                            <div className="flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/30 p-3 rounded-lg border border-gray-50 dark:border-gray-900 text-xs">
                                <span className="text-gray-500">Subtotal do Pacote</span>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    $ {(packageSubtotal + shippingPrice).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Panel */}
            <div className="bg-sky-50/30 dark:bg-sky-950/10 border border-sky-100/50 dark:border-sky-950/30 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-sky-800 dark:text-sky-400 uppercase tracking-wider">
                    Resumo do Pedido
                </h4>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                        <span>Cartas</span>
                        <span className="font-medium text-gray-900 dark:text-white">$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Frete Total</span>
                        <span className="font-medium text-gray-900 dark:text-white">$ {shippingTotal.toFixed(2)}</span>
                    </div>

                    <Separator className="my-2 bg-sky-100/50 dark:bg-sky-950/30" />

                    <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                        <span>Total Geral</span>
                        <span className="text-sky-600 dark:text-sky-400">$ {grandTotal.toFixed(2)}</span>
                    </div>
                </div>

                <Button
                    onClick={nextStep}
                    className="w-full h-11 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-sm shadow-sky-600/10"
                >
                    Prosseguir para Entrega
                </Button>
            </div>
        </div>
    );
}
