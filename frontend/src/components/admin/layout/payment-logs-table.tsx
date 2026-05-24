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
import { useQueryPaymentLogs } from '@/hooks/useFunctions'
import { PaymentLogResponse } from '@/types/api'
import { StatusBadge } from '@/shared/status-badge'
import { ArrowRight } from 'lucide-react'

export function PaymentLogsTable() {
    const { data, isLoading, isError, isFetching } = useQueryPaymentLogs()
    const [page, setPage] = useState(1)
    const limit = 5

    const paginatedData = useMemo(() => {
        if (!data) return []
        const start = (page - 1) * limit
        return data.slice(start, start + limit)
    }, [data, page])

    if (isLoading)
        return <Spinner className="h-10 w-10 text-sky-600 mx-auto mt-6" />

    if (isError)
        return (
            <section className="text-sm text-red-500 p-4">
                Erro ao carregar logs.
            </section>
        )

    if (!data || data.length === 0) {
        return (
            <motion.section 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={smooth}
                className="text-sm text-gray-400 p-4"
            >
                Nenhum log de pagamento encontrado. (Altere o status de um pagamento para gerar um log via Trigger).
            </motion.section>
        )
    }

    const totalElements = data.length
    const totalPages = Math.ceil(totalElements / limit) || 1

    return (
        <motion.section 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm relative overflow-hidden bg-white"
        >
            <section className="w-full flex flex-col justify-start bg-gray-50 border-b border-b-gray-300 p-4">
                <p className="font-semibold text-md">Logs de Pagamentos (Trigger)</p>
                <p className="text-xs text-gray-500 mt-1">Gerados automaticamente pelo trigger <strong>trg_log_payment_status_update</strong></p>
            </section>

            <section className="overflow-x-auto relative px-6 py-4 min-h-[300px]">
                <Table>
                    <TableHeader>
                        <TableRow className="whitespace-nowrap">
                            <TableHead>Log ID</TableHead>
                            <TableHead>Pagamento ID</TableHead>
                            <TableHead>Pedido ID</TableHead>
                            <TableHead>Transição de Status</TableHead>
                            <TableHead>Data da Mudança</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedData.map((log: PaymentLogResponse) => (
                            <TableRow
                                key={log.id}
                                className="whitespace-nowrap"
                            >
                                <TableCell className="font-medium">#{log.id}</TableCell>
                                <TableCell>{log.paymentId}</TableCell>
                                <TableCell>{log.orderId}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <StatusBadge status={log.oldStatus} />
                                        <ArrowRight size={14} className="text-gray-400" />
                                        <StatusBadge status={log.newStatus} />
                                    </div>
                                </TableCell>
                                <TableCell>{new Date(log.changedAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
            {totalPages > 1 && (
                <div className="p-4 border-t border-t-gray-100">
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
