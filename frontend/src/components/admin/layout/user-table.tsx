'use client'

import { useState } from 'react'
import { useUserList } from '../hooks/useUserList'
import { Spinner } from '@/components/ui/spinner'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function UserTable() {
    const [page, setPage] = useState(1)
    const limit = 10

    const { data, isLoading, isError, isFetching } = useUserList(page, limit)
    console.log('data: ', data?.content) 
    
    if (isLoading)
        return <Spinner className="h-15 w-15 text-sky-600 mx-auto mt-10" />
    if (isError)
        return (
            <section className="text-sm text-red-500 p-4">
                Erro ao carregar dados
            </section>
        )

    const totalElements = data?.totalElements || 0
    const totalPages = data?.totalPages || 1
    const startItem = totalElements === 0 ? 0 : (page - 1) * limit + 1
    const endItem = Math.min(page * limit, totalElements)

    return (
        <section className="w-full bg-white rounded-lg shadow-sm border p-4">
            <section className="overflow-x-auto relative">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-25">ID</TableHead>
                            <TableHead>Nome de Usuário</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.content?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    {user.id}
                                </TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            <section className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <section className="text-sm text-gray-500">
                    Mostrando{' '}
                    <span className="font-medium text-gray-900">
                        {startItem}
                    </span>{' '}
                    de{' '}
                    <span className="font-medium text-gray-900">{endItem}</span>{' '}
                    de{' '}
                    <span className="font-medium text-gray-900">
                        {totalElements}
                    </span>{' '}
                    usuários
                </section>

                <section className="flex items-center gap-1">
                    <button
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1 || isFetching}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    {Array.from(
                        { length: Math.min(3, totalPages) },
                        (_, i) => i + 1
                    ).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => setPage(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                                ${
                                    page === pageNum
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                        >
                            {pageNum}
                        </button>
                    ))}

                    {totalPages > 3 && (
                        <span className="w-8 h-8 flex items-center justify-center text-gray-400 tracking-widest">
                            ...
                        </span>
                    )}

                    {totalPages > 3 && (
                        <button
                            onClick={() => setPage(totalPages)}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                                ${
                                    page === totalPages
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }
                            `}
                        >
                            {totalPages}
                        </button>
                    )}

                    <button
                        onClick={() => setPage((old) => old + 1)}
                        disabled={page === totalPages || isFetching}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={16} />
                    </button>
                </section>
            </section>
        </section>
    )
}