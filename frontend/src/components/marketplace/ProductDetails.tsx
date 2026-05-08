"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ZoomIn } from 'lucide-react';
import { useMarketplaceCardById } from './hooks/useMarketplaceCardById';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductDetailsProps {
    cardId: string;
}

export function ProductDetails({ cardId }: ProductDetailsProps) {
    const { data: card, isLoading, error } = useMarketplaceCardById(cardId);
    if (error || !card) {
        return <div className="p-8 text-center text-red-500">Erro ao carregar os detalhes da carta.</div>;
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Coluna da Imagem (Aprox 30%) */}
                <div className="w-full md:w-1/3 lg:w-[30%] flex flex-col items-center">
                    <div className="relative w-full aspect-[2.5/3.5] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 30vw"
                        />
                    </div>
                    <button className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                        <ZoomIn size={16} />
                        <span>Expandir carta</span>
                    </button>
                </div>

                {/* Coluna de Detalhes (Aprox 70%) */}
                <div className="w-full md:w-2/3 lg:w-[70%]">
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

                    {/* Grid de Atributos */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Rarity</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.rarity}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Card Number</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.cardNumber || 'N/A'}</span>
                        </div>
            
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Card Type</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.cardType || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Cost</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.cost || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Power</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.power || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Attribute</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.combatAttribute || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Life</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.life || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Counter</span>
                            <span className="font-medium text-gray-900 dark:text-white">{card.counter || 'N/A'}</span>
                        </div>
                        <div className="col-span-2 sm:col-span-3">
                            <span className="block text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Subtypes</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                                {Array.isArray(card.subtypes) ? card.subtypes.join(', ') : (card.subtypes || 'N/A')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProductDetailsSkeleton() {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-6 lg:p-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                <div className="w-full md:w-1/3 lg:w-[30%] flex flex-col items-center">
                    <Skeleton className="w-full aspect-[2.5/3.5] rounded-xl dark:bg-gray-800" />
                    <Skeleton className="w-32 h-4 mt-4 dark:bg-gray-800" />
                </div>
                <div className="w-full md:w-2/3 lg:w-[70%]">
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

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i}>
                                <Skeleton className="w-16 h-3 mb-2 dark:bg-gray-800" />
                                <Skeleton className="w-24 h-5 dark:bg-gray-800" />
                            </div>
                        ))}
                        <div className="col-span-2 sm:col-span-3">
                            <Skeleton className="w-16 h-3 mb-2 dark:bg-gray-800" />
                            <Skeleton className="w-48 h-5 dark:bg-gray-800" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
