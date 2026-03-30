'use client'

import { useQueryAllCards } from '@/hooks/useQueryAllCards'
import { CarrouselCards } from './carrouselCards'
import { CardItemSkeleton } from './CardItemSkeleton'

export default function ContentHome() {
    const { data: cards, isLoading, isError } = useQueryAllCards('allSetCards')

    return (
        <section
            id="cardItems"
            className="w-full py-12 px-8 flex flex-col items-center justify-center"
        >
            <section className="w-full max-w-5xl mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Cartas em Destaque
                </h2>
                <p className="text-sm text-gray-500">
                    As cartas mais populares do momento
                </p>
            </section>

            {isLoading && (
                <section className="w-full max-w-5xl flex items-center justify-start gap-4 overflow-hidden">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <section key={index} className="w-64 shrink-0">
                            <CardItemSkeleton />
                        </section>
                    ))}
                </section>
            )}

            {isError && (
                <p className="text-red-500 my-10">
                    Falha ao carregar as cartas. Tente novamente mais tarde.
                </p>
            )}

            {!isLoading && !isError && cards && <CarrouselCards data={cards} />}
        </section>
    )
}
