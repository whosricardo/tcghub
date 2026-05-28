"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ZoomIn, ShoppingCart, CheckCircle, ShieldCheck } from 'lucide-react';
import { useMarketplaceCardById } from './hooks/useMarketplaceCardById';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'motion/react';
import { gentle, smooth, snappy, bouncy } from '@/motion/transitions';
import { BuyingOptions } from './BuyingOptions';
import { useListingsByProductId } from './hooks/useListingsByProductId';
import { useCartStore } from '@/store/cartStore';
import { Modal } from '@/shared/modal';

interface ProductDetailsProps {
    cardId: string;
}

export function ProductDetails({ cardId }: ProductDetailsProps) {
    const { data: card, isLoading, error } = useMarketplaceCardById(cardId);
    const [isExpanded, setIsExpanded] = useState(false);
    
    const addItem = useCartStore((state) => state.addItem);
    const [isCartModalOpen, setIsCartModalOpen] = useState(false);
    const { data: listings, isLoading: isLoadingListings } = useListingsByProductId(Number(cardId));

    const handleAddListingToCart = (listing: any) => {
        if (!card) return;
        addItem({
            id: `${card.id}-supplier-${listing.supplierId}-${Date.now()}`,
            cardId: card.id,
            listingId: listing.id,
            title: card.title,
            image: card.image,
            edition: card.edition,
            condition: listing.itemCondition,
            price: listing.currentPrice,
            quantity: 1,
            sellerName: `Fornecedor #${listing.supplierId}`,
            shippingCost: 2.50
        });
        setIsCartModalOpen(true);
    };

    if (error || !card) {
        return <div className="p-8 text-center text-red-500">Erro ao carregar os detalhes da carta.</div>;
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={gentle}
            className="w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8"
        >
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                {/* Coluna Principal (Imagem e Detalhes) */}
                <div className="flex flex-col md:flex-row gap-8 lg:flex-1">
                    {/* Coluna da Imagem */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={smooth}
                        className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] shrink-0 flex flex-col items-center"
                    >
                    <div className="relative w-full aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 group">
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 30vw"
                        />
                    </div>
                    <button 
                        onClick={() => setIsExpanded(true)}
                        className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <ZoomIn size={16} />
                        <span>Expandir carta</span>
                    </button>
                </motion.div>

                {/* Coluna de Detalhes */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={smooth}
                    className="w-full md:flex-1"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {card.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm md:text-base text-gray-600 dark:text-gray-400 mb-8">
                        <span>Set:</span>
                        <Link href={`/marketplace?collection=${encodeURIComponent(card.edition)}`} className="text-blue-600 hover:underline">
                            {card.edition}
                        </Link>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">|</span>
                        <Link href={`/marketplace?name=${encodeURIComponent(card.title)}`} className="text-blue-600 hover:underline">
                            Ver todas as versões
                        </Link>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                        Product Details
                    </h2>

                    {/* Descrição */}
                    <div className="mb-8 text-gray-700 dark:text-gray-300 min-h-[100px]">
                        <div className="space-y-4">
                            <p className="leading-relaxed">
                                {card.description || "Nenhuma descrição disponível para esta carta."}
                            </p>
                        </div>
                    </div>

                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.05, ...smooth } }
                        }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800"
                    >
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Rarity</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.rarity}</span>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Card Number</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.cardNumber || 'N/A'}</span>
                        </motion.div>
            
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Card Type</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.cardType || 'N/A'}</span>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Cost</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.cost || 'N/A'}</span>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Power</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.power || 'N/A'}</span>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Attribute</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.combatAttribute || 'N/A'}</span>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Life</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.life || 'N/A'}</span>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }}>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Counter</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.counter || 'N/A'}</span>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: snappy } }} className="col-span-2 md:col-span-4">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Subtypes</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                                {Array.isArray(card.subtypes) ? card.subtypes.join(', ') : (card.subtypes || 'N/A')}
                            </span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

                {/* Coluna Opções de Compra */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={smooth}
                    className="w-full lg:w-[320px] xl:w-[360px] shrink-0 sticky top-24 self-start"
                >
                    <BuyingOptions card={card} />
                </motion.div>
            </div>

            {/* Seção de Anúncios Disponíveis */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <ShieldCheck className="text-blue-600 dark:text-blue-400" />
                    Anúncios Disponíveis
                </h2>

                {isLoadingListings ? (
                    <div className="flex justify-center p-8">
                        <Skeleton className="w-full h-40 rounded-xl dark:bg-gray-800 animate-pulse" />
                    </div>
                ) : !listings || listings.length === 0 ? (
                    <div className="text-center p-8 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500">
                        Nenhum anúncio disponível para esta carta no momento.
                    </div>
                ) : (
                    <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <th className="p-4">Vendedor</th>
                                    <th className="p-4">Condição</th>
                                    <th className="p-4">Idioma</th>
                                    <th className="p-4">Preço</th>
                                    <th className="p-4 text-center">Qtd Disponível</th>
                                    <th className="p-4 text-right">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm text-gray-700 dark:text-gray-300">
                                {listings.map((listing) => (
                                    <tr key={listing.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors">
                                        <td className="p-4 font-semibold text-gray-900 dark:text-white">
                                            Fornecedor #{listing.supplierId}
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                                {listing.itemCondition}
                                            </span>
                                        </td>
                                        <td className="p-4">{listing.productLanguage}</td>
                                        <td className="p-4 font-bold text-gray-900 dark:text-white">
                                            R$ {listing.currentPrice.toFixed(2)}
                                        </td>
                                        <td className="p-4 text-center">{listing.availableQuantity}</td>
                                        <td className="p-4 text-right flex justify-end">
                                            <button
                                                onClick={() => handleAddListingToCart(listing)}
                                                disabled={listing.availableQuantity <= 0}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-xs disabled:bg-gray-200 disabled:text-gray-400 animate-fade-in"
                                            >
                                                <ShoppingCart size={14} />
                                                Adicionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal de Sucesso Adicionar ao Carrinho */}
            <Modal isOpen={isCartModalOpen} isClose={() => setIsCartModalOpen(false)}>
                <div className="flex flex-col items-center justify-center p-4 text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={bouncy}
                    >
                        <CheckCircle size={64} className="text-blue-600 dark:text-blue-400" />
                    </motion.div>
                    
                    <h2 className="text-2xl font-bold text-gray-950 dark:text-gray-950">
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
                            onClick={() => setIsCartModalOpen(false)}
                            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                        >
                            Continuar comprando
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Modal de Imagem Expandida */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setIsExpanded(false)}
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={smooth}
                            className="relative w-full max-w-[400px] lg:max-w-[400px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full aspect-[2.5/3.5] max-h-[80vh] rounded-lg overflow-hidden bg-gray-50 dark:bg-black/20 mb-3">
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 600px"
                                />
                            </div>
                            <button 
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-1 right-2 text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-blue-300 font-semibold uppercase tracking-wide text-sm transition-colors py-1"
                            >
                                Fechar
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function ProductDetailsSkeleton() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={gentle}
            className="w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8 animate-pulse"
        >
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                <div className="flex flex-col md:flex-row gap-8 lg:flex-1">
                    <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[30%] shrink-0 flex flex-col items-center">
                        <Skeleton className="w-full aspect-[2.5/3.5] rounded-xl dark:bg-gray-800" />
                        <Skeleton className="w-32 h-4 mt-4 dark:bg-gray-800" />
                    </div>
                    <div className="w-full md:flex-1">
                        <Skeleton className="w-3/4 h-10 mb-4 dark:bg-gray-800" />
                        <Skeleton className="w-1/2 h-5 mb-8 dark:bg-gray-800" />
                        
                        <h2 className="text-xl font-semibold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2 text-transparent">
                            Product Details
                        </h2>

                        <div className="space-y-2 mb-8">
                            <Skeleton className="w-full h-4 dark:bg-gray-800" />
                            <Skeleton className="w-full h-4 dark:bg-gray-800" />
                            <Skeleton className="w-3/4 h-4 dark:bg-gray-800" />
                        </div>

                        <div className="space-y-2 mb-8">
                            <Skeleton className="w-full h-4 dark:bg-gray-800" />
                            <Skeleton className="w-full h-4 dark:bg-gray-800" />
                            <Skeleton className="w-3/4 h-4 dark:bg-gray-800" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i}>
                                    <Skeleton className="w-16 h-3 mb-2 dark:bg-gray-800" />
                                    <Skeleton className="w-24 h-5 dark:bg-gray-800" />
                                </div>
                            ))}
                            <div className="col-span-2 md:col-span-4">
                                <Skeleton className="w-16 h-3 mb-2 dark:bg-gray-800" />
                                <Skeleton className="w-48 h-5 dark:bg-gray-800" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0">
                    <Skeleton className="w-full h-[500px] rounded-xl dark:bg-gray-800" />
                </div>
            </div>
        </motion.div>
    );
}
