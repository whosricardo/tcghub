'use client'

import React, { useState, useEffect } from 'react'
import SearchButton from "./search-button";
import SeachFilter from "./search-filters";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDebounce } from 'use-debounce';
import { useQueryCardVerification } from '@/components/admin/hooks/useQueryCardVerification';
import TableSkeleton from '@/shared/table-skeleton';
import Link from 'next/link';

const searchSchema = z.object({
    searchQuery: z.string()
});
type SearchForm = z.infer<typeof searchSchema>;

export default function SearchBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    const { register, watch } = useForm<SearchForm>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            searchQuery: ''
        }
    });

    const searchQuery = watch('searchQuery');
    const [debouncedValue] = useDebounce(searchQuery, 500);
    
    const { data: cardSuggestions, isLoading } = useQueryCardVerification(debouncedValue);

    useEffect(() => {
        if (searchQuery.length > 2) {
            setIsDropdownOpen(true);
        } else {
            setIsDropdownOpen(false);
        }
    }, [searchQuery]);

    return (
        <form className="relative flex flex-col w-full max-w-2xl" onSubmit={(e) => e.preventDefault()}>
            <section className="flex items-center w-full border border-gray-300 rounded-lg bg-white overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all z-10">   
                <section className="hidden md:block shrink-0 border-r border-gray-300 h-full">
                    <SeachFilter filter={'All'} className="border-none overflow-hidden bg-transparent shadow-none" />
                </section>

                <input 
                    {...register('searchQuery')}
                    autoComplete="off"
                    placeholder='Tente pesquisar pela "carta do Zoro"' 
                    className="flex-1 w-full px-3 py-2 text-gray-700 outline-none bg-transparent"
                    onFocus={() => {
                        if (searchQuery.length > 2) setIsDropdownOpen(true);
                    }}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                />

                <section className="shrink-0 border-l border-gray-300 h-full p-2">
                    <SearchButton />
                </section>
            </section>

            {isDropdownOpen && debouncedValue.length > 2 && (
                <ul className="absolute top-full left-0 mt-2 z-[9999] w-full bg-white border border-gray-200 max-h-80 overflow-y-auto rounded-lg shadow-xl">
                    {isLoading && (
                        Array.from({ length: 3 }).map((_, index) => (
                            <section key={index} className="p-3">
                                <TableSkeleton />
                            </section>
                        ))
                    )}
                    
                    {cardSuggestions?.length === 0 && !isLoading && (
                        <li className="p-4 text-center text-gray-500">Nenhuma carta encontrada.</li>
                    )}
                    
                    {cardSuggestions?.map((card: any, index: number) => (
                        <li 
                            key={card.id || index}
                            onMouseDown={(e) => e.preventDefault()}
                            className="p-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-sm transition-colors cursor-pointer"
                        >
                            <Link href={`/marketplace/product/${card.card_set_id}`} className="flex items-center gap-4">
                                {card.card_image ? (
                                    <img 
                                        src={card.card_image} 
                                        alt={card.card_name} 
                                        className="w-12 h-16 object-cover rounded-md border border-gray-200 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-12 h-16 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                                        <span className="text-xs text-gray-400">Sem foto</span>
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900">{card.card_name}</span>
                                    <span className="text-xs text-gray-500">{card.set_name} • {card.card_set_id}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}