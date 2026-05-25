import React, { useState } from 'react';
import { ShoppingCart, Check, ShieldCheck, Star, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Modal } from '@/shared/modal';
import { motion } from 'motion/react';
import { bouncy } from '@/motion/transitions';
import Link from 'next/link';

interface BuyingOptionsProps {
    card: {
        id: string;
        title: string;
        price: number;
        image: string;
        edition: string;
    };
}

export function BuyingOptions({ card }: BuyingOptionsProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToCart = (sellerName: string, price: number, shippingCost: number) => {
        addItem({
            id: `${card.id}-${sellerName}-${Date.now()}`,
            cardId: card.id,
            title: card.title,
            image: card.image,
            edition: card.edition,
            condition: 'NM', // Mocked condition
            price: price,
            quantity: 1,
            sellerName: sellerName,
            shippingCost: shippingCost
        });
        
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="w-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 space-y-6">
                <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Opções de Compra
                </h3>

                {/* Direto da Loja */}
                <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase">Direto da Loja</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full uppercase">Premium</span>
                    </div>
                    
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">$ {card.price.toFixed(2)}</span>
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

                    <button 
                        onClick={() => handleAddToCart("TCGHub Direto", card.price, 0)}
                        className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white py-2.5 rounded-lg font-medium transition-colors text-sm"
                    >
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
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">$ 1.80</span>
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
                        <div className="text-gray-500">+ $ 1.31 frete (Grátis acima de R$ 5)</div>
                    </div>

                    <button 
                        onClick={() => handleAddToCart("Kaiser's Kard House", 1.80, 1.31)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors text-sm"
                    >
                        <ShoppingCart size={16} />
                        Adicionar ao Carrinho
                    </button>
                </div>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-blue-600 dark:text-blue-400">
                    <ShieldCheck size={14} />
                    <span>Transação Segura via TCGHub</span>
                </div>
            </div>

            <Modal isOpen={isModalOpen} isClose={() => setIsModalOpen(false)}>
                <div className="flex flex-col items-center justify-center p-4 text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={bouncy}
                    >
                        <CheckCircle size={64} className="text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                        Produto adicionado!
                    </h2>
                    
                    <p className="text-gray-600">
                        <strong>{card.title}</strong> foi adicionado ao seu carrinho com sucesso.
                    </p>

                    <div className="w-full pt-4 flex flex-col gap-3">
                        <Link 
                            href="/cart" 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                        >
                            Ir para o carrinho
                        </Link>
                        
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                        >
                            Continuar comprando
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
