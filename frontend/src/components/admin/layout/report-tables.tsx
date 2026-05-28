'use client'

import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { smooth } from '@/motion/transitions'
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
import { 
    useQuerySupplierSales, 
    useQueryPendingOrders, 
    useQueryProductsWithoutListings, 
    useQueryOrdersAboveAverage 
} from '@/hooks/useReports'
import { StatusBadge } from '@/shared/status-badge'
import { 
    SupplierSalesReportResponse, 
    PendingOrderReportResponse, 
    ProductWithoutListingReportResponse, 
    OrdersAboveAverageReportResponse 
} from '@/types/api'
import { FilterInput } from '../common/FilterInput'
import { DollarSign } from 'lucide-react'

export function SupplierSalesTable() {
    const { data, isLoading, isError, isFetching } = useQuerySupplierSales()
    const [page, setPage] = useState(1)
    const limit = 5

    const paginatedData = useMemo(() => {
        if (!data) return []
        const start = (page - 1) * limit
        return data.slice(start, start + limit)
    }, [data, page])

    if (isLoading) return <Spinner className="h-8 w-8 text-sky-600 mx-auto mt-4" />
    if (isError) return <p className="text-sm text-red-500 p-4">Erro ao carregar relatório.</p>
    if (!data || data.length === 0) return <p className="text-sm text-gray-400 p-4">Nenhum dado encontrado.</p>

    const totalElements = data.length
    const totalPages = Math.ceil(totalElements / limit) || 1

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="flex flex-col h-full justify-between"
        >
            <section className="overflow-x-auto min-h-[190px]">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Fornecedor (ID)</TableHead>
                            <TableHead>Loja</TableHead>
                            <TableHead>Total Pedidos</TableHead>
                            <TableHead>Itens Vendidos</TableHead>
                            <TableHead>Faturamento</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((item: SupplierSalesReportResponse) => (
                            <TableRow key={item.supplierId} className="whitespace-nowrap">
                                <TableCell>{item.supplierName} ({item.supplierId})</TableCell>
                                <TableCell>{item.storeName}</TableCell>
                                <TableCell>{item.totalOrders}</TableCell>
                                <TableCell>{item.totalItemsSold}</TableCell>
                                <TableCell>R$ {item.totalRevenue?.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            {totalPages > 1 && (
                <div className="mt-auto border-t border-gray-100">
                    <Pagination
                        currentPage={page}
                        setPage={setPage}
                        limit={limit}
                        isFetching={isFetching}
                        data={paginatedData}
                        totalElements={totalElements}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </motion.section>
    )
}

export function PendingOrdersTable() {
    const { data, isLoading, isError, isFetching } = useQueryPendingOrders()
    const [page, setPage] = useState(1)
    const [minAmount, setMinAmount] = useState('')
    const [maxAmount, setMaxAmount] = useState('')
    const limit = 5

    const filteredData = useMemo(() => {
        if (!data) return []
        return data.filter((item) => {
            const amount = item.totalAmount ?? 0
            const min = minAmount ? parseFloat(minAmount) : 0
            const max = maxAmount ? parseFloat(maxAmount) : Infinity
            return amount >= min && amount <= max
        })
    }, [data, minAmount, maxAmount])

    const paginatedData = useMemo(() => {
        const start = (page - 1) * limit
        return filteredData.slice(start, start + limit)
    }, [filteredData, page])

    if (isLoading) return <Spinner className="h-8 w-8 text-sky-600 mx-auto mt-4" />
    if (isError) return <p className="text-sm text-red-500 p-4">Erro ao carregar relatório.</p>

    const totalElements = filteredData.length
    const totalPages = Math.ceil(totalElements / limit) || 1

    const handleMinChange = (val: string) => {
        setMinAmount(val)
        setPage(1)
    }

    const handleMaxChange = (val: string) => {
        setMaxAmount(val)
        setPage(1)
    }

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="flex flex-col h-full justify-between gap-4"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/50 p-4 border border-gray-200 rounded-xl">
                <FilterInput
                    type="number"
                    placeholder="Valor mínimo (R$)..."
                    icon={DollarSign}
                    value={minAmount}
                    onChange={handleMinChange}
                />
                <FilterInput
                    type="number"
                    placeholder="Valor máximo (R$)..."
                    icon={DollarSign}
                    value={maxAmount}
                    onChange={handleMaxChange}
                />
            </div>

            <section className="overflow-x-auto min-h-[190px]">
                {totalElements === 0 ? (
                    <p className="text-sm text-gray-400 p-4 text-center">Nenhum pedido pendente corresponde a estes valores.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="whitespace-nowrap">
                                <TableHead>Pedido ID</TableHead>
                                <TableHead>Comprador</TableHead>
                                <TableHead>Data de Criação</TableHead>
                                <TableHead>Valor Total</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedData.map((item: PendingOrderReportResponse) => (
                                <TableRow key={item.orderId} className="whitespace-nowrap hover:bg-gray-50/60 transition-colors">
                                    <TableCell className="font-semibold text-gray-500">#{item.orderId}</TableCell>
                                    <TableCell className="font-medium text-gray-900">{item.buyerName} ({item.buyerId})</TableCell>
                                    <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="font-medium text-sky-600">R$ {item.totalAmount?.toFixed(2)}</TableCell>
                                    <TableCell><StatusBadge status={item.status} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </section>
            {totalPages > 1 && (
                <div className="mt-auto border-t border-gray-100 pt-2">
                    <Pagination
                        currentPage={page}
                        setPage={setPage}
                        limit={limit}
                        isFetching={isFetching}
                        data={paginatedData}
                        totalElements={totalElements}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </motion.section>
    )
}

export function ProductsWithoutListingsTable() {
    const { data, isLoading, isError, isFetching } = useQueryProductsWithoutListings()
    const [page, setPage] = useState(1)
    const limit = 5

    const paginatedData = useMemo(() => {
        if (!data) return []
        const start = (page - 1) * limit
        return data.slice(start, start + limit)
    }, [data, page])

    if (isLoading) return <Spinner className="h-8 w-8 text-sky-600 mx-auto mt-4" />
    if (isError) return <p className="text-sm text-red-500 p-4">Erro ao carregar relatório.</p>
    if (!data || data.length === 0) return <p className="text-sm text-gray-400 p-4">Nenhum dado encontrado.</p>

    const totalElements = data.length
    const totalPages = Math.ceil(totalElements / limit) || 1

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="flex flex-col h-full justify-between"
        >
            <section className="overflow-x-auto min-h-[190px]">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Produto ID</TableHead>
                            <TableHead>Nome</TableHead>
                            <TableHead>Coleção</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((item: ProductWithoutListingReportResponse) => (
                            <TableRow key={item.productId} className="whitespace-nowrap">
                                <TableCell>#{item.productId}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.collection}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            {totalPages > 1 && (
                <div className="mt-auto border-t border-gray-100">
                    <Pagination
                        currentPage={page}
                        setPage={setPage}
                        limit={limit}
                        isFetching={isFetching}
                        data={paginatedData}
                        totalElements={totalElements}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </motion.section>
    )
}

export function OrdersAboveAverageTable() {
    const { data, isLoading, isError, isFetching } = useQueryOrdersAboveAverage()
    const [page, setPage] = useState(1)
    const limit = 5

    const paginatedData = useMemo(() => {
        if (!data) return []
        const start = (page - 1) * limit
        return data.slice(start, start + limit)
    }, [data, page])

    if (isLoading) return <Spinner className="h-8 w-8 text-sky-600 mx-auto mt-4" />
    if (isError) return <p className="text-sm text-red-500 p-4">Erro ao carregar relatório.</p>
    if (!data || data.length === 0) return <p className="text-sm text-gray-400 p-4">Nenhum dado encontrado.</p>

    const totalElements = data.length
    const totalPages = Math.ceil(totalElements / limit) || 1

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="flex flex-col h-full justify-between"
        >
            <section className="overflow-x-auto min-h-[190px]">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Pedido ID</TableHead>
                            <TableHead>Comprador</TableHead>
                            <TableHead>Data de Criação</TableHead>
                            <TableHead>Valor Total</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((item: OrdersAboveAverageReportResponse) => (
                            <TableRow key={item.orderId} className="whitespace-nowrap">
                                <TableCell>#{item.orderId}</TableCell>
                                <TableCell>{item.buyerName} ({item.buyerId})</TableCell>
                                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="font-semibold text-emerald-600">R$ {item.totalAmount?.toFixed(2)}</TableCell>
                                <TableCell><StatusBadge status={item.status} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            {totalPages > 1 && (
                <div className="mt-auto border-t border-gray-100">
                    <Pagination
                        currentPage={page}
                        setPage={setPage}
                        limit={limit}
                        isFetching={isFetching}
                        data={paginatedData}
                        totalElements={totalElements}
                        totalPages={totalPages}
                    />
                </div>
            )}
        </motion.section>
    )
}
