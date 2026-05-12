import React from 'react';
import { ShoppingCart, Check, ShieldCheck, Star } from 'lucide-react';

interface BuyingOptionsProps {
    price: number;
}

export function BuyingOptions({ price }: BuyingOptionsProps) {
    return (
        <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-6">
            <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Opções de Compra
            </h3>

            {/* Direto da Loja */}
            <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Direto da Loja</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full uppercase">Premium</span>
                </div>
                
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">R$ {price.toFixed(2)}</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 mb-1">NM</span>
                </div>

                <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 mb-3">
                    <li className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-500" />
                        Autenticidade Garantida
                    </li>
                    <li className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-500" />
                        Processamento Imediato
                    </li>
                    <li className="flex items-center gap-1.5">
                        <Check size={14} className="text-green-500" />
                        Devolução Grátis
                    </li>
                </ul>

                <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
                    <ShoppingCart size={16} />
                    Adicionar ao Carrinho
                </button>
            </div>

            {/* Menor preço de parceiros */}
            <div className="space-y-3 pb-4">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">Menor preço de parceiros</span>
                </div>
                
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">R$ 1.80</span>
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
                    <div className="text-gray-500">+ R$ 1.31 frete (Grátis acima de R$ 5)</div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors text-sm">
                    <ShoppingCart size={16} />
                    Adicionar ao Carrinho
                </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                <ShieldCheck size={14} />
                <span>Transação Segura via TCGHub</span>
            </div>
        </div>
    );
}
