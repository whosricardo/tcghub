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
import { Pagination } from '@/components/common/pagination'
import TableSkeleton from '@/shared/table-skeleton'

export function UserTable() {
    const [page, setPage] = useState(1)
    const limit = 10

    const { data, isLoading, isError, isFetching } = useUserList(page, limit)
    console.log('data: ', data?.content)

    if (isLoading) {
        return (
            <section className="flex min-h-100 items-center justify-center">
                <Spinner className="h-15 w-15 text-sky-600 mx-auto mt-10" />
            </section>
        )
    }

    if (isError)
        return (
            <section className="text-sm text-red-500 p-4">
                Erro ao carregar dados
            </section>
        )
    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Tabela de usuários</p>
            </section>
            <section className="overflow-x-auto relative px-6 pt-6">
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

            <section className="flex justify-end p-4">
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
