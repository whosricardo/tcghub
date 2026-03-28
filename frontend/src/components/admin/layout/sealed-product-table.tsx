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

import { useQuerySealedProduct } from '../hooks/useQuerySealedProduct'
import { SealedProductSearchParams, SealedProductProps } from '../services/getAllSealedProduct' 

export function SealedProductTable() {
    const [page, setPage] = useState(1)
    const limit = 10
    
    const [params, setParams] = useState<SealedProductSearchParams>({})

    const { data, isLoading, isError, isFetching } = useQuerySealedProduct(params, page, limit)

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
                <p className="font-semibold text-md">Tabela de Produtos Selados</p>
            </section>
            
            <section className="overflow-x-auto relative px-6 pt-6 pb-4">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Nome</TableHead>
                            <TableHead>Coleção</TableHead>
                            <TableHead>Tipo de Selado</TableHead>
                            <TableHead>Descrição</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.content?.map((product: SealedProductProps) => (
                            <TableRow key={product.id} className="whitespace-nowrap">
                                <TableCell className="font-medium">
                                    {product.name}
                                </TableCell>
                                <TableCell>{product.collection}</TableCell>
                                <TableCell>{product.sealedType || '-'}</TableCell>
                                <TableCell 
                                    className="max-w-62.5 truncate" 
                                    title={product.description}
                                >
                                    {product.description}
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