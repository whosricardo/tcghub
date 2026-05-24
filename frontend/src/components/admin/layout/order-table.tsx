'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { smooth } from '@/motion/transitions'
import { Spinner } from '@/components/ui/spinner'
import { AlertTriangle, XCircle } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Pagination } from '@/components/common/pagination'
import { useQueryOrders, useCancelOrder } from '@/hooks/useOrders'
import { OrderResponse } from '@/types/api'
import { Modal } from '@/shared/modal'
import { StatusBadge } from '@/shared/status-badge'

export function OrderTable() {
    const [page, setPage] = useState(1)
    const limit = 20

    const { data, isLoading, isError, isFetching } = useQueryOrders(page - 1, limit)
    const cancelMutation = useCancelOrder()

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
    const [orderToCancel, setOrderToCancel] = useState<OrderResponse | null>(null)

    const openCancelModal = (order: OrderResponse) => {
        setOrderToCancel(order)
        setIsCancelModalOpen(true)
    }

    const handleConfirmCancel = () => {
        if (orderToCancel) {
            cancelMutation.mutate(orderToCancel.id, {
                onSuccess: () => {
                    setIsCancelModalOpen(false)
                    setOrderToCancel(null)
                },
            })
        }
    }

    if (isLoading)
        return <Spinner className="h-15 w-15 text-sky-600 mx-auto mt-10" />

    if (isError)
        return (
            <section className="text-sm text-red-500 p-4">
                Erro ao carregar dados
            </section>
        )

    if (!data || data.content.length === 0) {
        return (
            <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={smooth}
                className="text-sm text-gray-400 p-4"
            >
                Sem pedidos cadastrados.
            </motion.section>
        )
    }

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm relative"
        >
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Tabela de Pedidos</p>
            </section>

            <section className="overflow-x-auto relative px-6 pt-6 pb-4">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>ID</TableHead>
                            <TableHead>Comprador (ID)</TableHead>
                            <TableHead>Total ($)</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Data Criação</TableHead>
                            <TableHead className="text-center">Ações (Procedure)</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.content?.map((order: OrderResponse) => (
                            <TableRow
                                key={order.id}
                                className="whitespace-nowrap"
                            >
                                <TableCell className="font-medium">
                                    #{order.id}
                                </TableCell>
                                <TableCell>{order.buyerId}</TableCell>
                                <TableCell>R$ {order.totalAmount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <StatusBadge status={order.status} />
                                </TableCell>
                                <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>

                                <TableCell className="flex justify-center gap-3">
                                    {['PENDING', 'PAYMENT_PENDING', 'PAID'].includes(order.status) && (
                                        <button
                                            onClick={() => openCancelModal(order)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                            title="Cancelar Pedido (Procedure)"
                                            disabled={cancelMutation.isPending}
                                        >
                                            <XCircle
                                                className="cursor-pointer"
                                                size={18}
                                            />
                                        </button>
                                    )}
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

            <Modal
                isOpen={isCancelModalOpen}
                isClose={() => setIsCancelModalOpen(false)}
            >
                <div className="flex items-center gap-2 pb-2 text-red-600">
                    <AlertTriangle size={24} />
                    <h1 className="text-xl font-semibold">
                        Confirmar Cancelamento
                    </h1>
                </div>

                <div className="flex h-full justify-around flex-col gap-4 w-full mt-2">
                    <section className='flex flex-col'>
                        <p className="text-gray-700">
                            Tem certeza que deseja cancelar o pedido{' '}
                            <span className="font-bold">
                                #{orderToCancel?.id}
                            </span>
                            ?
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Isso executará a procedure <strong>sp_cancel_order_and_restore_stock</strong> no banco de dados, cancelando o pedido e devolvendo as quantidades ao estoque. Esta ação não poderá ser desfeita.
                        </p>
                    </section>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => setIsCancelModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            disabled={cancelMutation.isPending}
                        >
                            Voltar
                        </button>
                        <button
                            onClick={handleConfirmCancel}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2"
                            disabled={cancelMutation.isPending}
                        >
                            {cancelMutation.isPending
                                ? 'Cancelando...'
                                : 'Sim, cancelar pedido'}
                        </button>
                    </div>
                </div>
            </Modal>
        </motion.section>
    )
}
