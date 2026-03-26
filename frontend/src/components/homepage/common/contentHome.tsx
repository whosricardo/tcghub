'use client'

import { useQueryAllCards } from '@/hooks/useQueryAllCards'
import { CarrouselCards } from './carrouselCards'
import TableSkeleton from '@/shared/table-skeleton'

export default function ContentHome() {
    const { data: cards, isLoading, isError } = useQueryAllCards('allSetCards')
    return (
        <section className="w-full py-12 px-8 flex flex-col items-center justify-center">
            <section className="w-full max-w-5xl mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Cartas em Destaque
                </h2>
                <p className="text-sm text-gray-500">
                    As cartas mais populares do momento
                </p>
            </section>

            {isLoading && (
                <section className="w-full py-12 px-8 flex row items-center justify-center">
                    {
                        Array.from({length: 5}).map((_, index) => (
                            <section key={index} className='h-30 w-30'>
                                <TableSkeleton/>
                            </section>
                        ))
                    }
                    <TableSkeleton/>
                </section>
            )}

            {isError && (
                <p className="text-red-500 my-10">
                    Falha ao carregar as cartas. Tente novamente mais tarde.
                </p>
            )}

            {!isLoading && !isError && cards && (
                <CarrouselCards data={cards} />
            )}
        </section>
    )
}
