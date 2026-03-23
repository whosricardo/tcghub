'use client'

import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Pagination } from '@/components/common/pagination'
import { useQueryCard } from '../hooks/useQueryCard'
import { CardSearchParams } from '../services/getAllCardList' 

export function CardTable() {
    const [page, setPage] = useState(1)
    const limit = 10
    
    const [params, setParams] = useState<CardSearchParams>({})

    const { data, isLoading, isError, isFetching } = useQueryCard(params, page, limit)

    if (isLoading)
        return <Spinner className="h-15 w-15 text-sky-600 mx-auto mt-10" />

    if (isError)
        return (
            <section className="text-sm text-red-500 p-4">
                Erro ao carregar dados
            </section>
        )

    if (!data || data.content.length === 0){
        return (
            <section className="text-sm text-gray-400 p-4">
                Sem dados no momento, adicione!
            </section>
        )
    }

    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Tabela de Cartas</p>
            </section>
            
            <section className="overflow-x-auto relative px-6 pt-6 pb-4">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Nome</TableHead>
                            <TableHead>Coleção</TableHead>
                            <TableHead>Nº da Carta</TableHead>
                            <TableHead>Raridade</TableHead>
                            <TableHead>Tratamento</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Custo</TableHead>
                            <TableHead>Poder</TableHead>
                            <TableHead>Counter</TableHead>
                            <TableHead>Atributo</TableHead>
                            <TableHead>Cor</TableHead>
                            <TableHead>Subtipos</TableHead>
                            <TableHead>Descrição</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.content?.map((card: any) => (
                            <TableRow key={card.id} className="whitespace-nowrap">
                                <TableCell className="font-medium">
                                    {card.name}
                                </TableCell>
                                <TableCell>{card.collection}</TableCell>
                                <TableCell>{card.cardNumber}</TableCell>
                                <TableCell>{card.rarity}</TableCell>
                                <TableCell>{card.treatment}</TableCell>
                                <TableCell>{card.cardType}</TableCell>
                                <TableCell>{card.cost}</TableCell>
                                <TableCell>{card.power}</TableCell>
                                <TableCell>{card.counter || '-'}</TableCell>
                                <TableCell>{card.combatAttribute}</TableCell>
                                <TableCell>{card.colors}</TableCell>
                                <TableCell 
                                    className="max-w-62.5 truncate" 
                                    title={card.subtypes}
                                >
                                    {card.subtypes}
                                </TableCell>
                                <TableCell 
                                    className="max-w-62.5 truncate" 
                                    title={card.description}
                                >
                                    {card.description}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>

            <section className="flex justify-end p-4 border-t border-t-gray-100">
                <Pagination
                    currentPage={page}
                    setPage={setPage}
                    limit={limit}
                    isFetching={isFetching}
                    data={data}
                    totalElements={data?.totalElements || 0}
                    totalPages={data?.totalPages || 1}
                />
            </section>
        </section>
    )
}