'use client'

import React from 'react'
import { motion } from 'motion/react'
import { smooth } from '@/motion/transitions'
import { 
    ShoppingCart, 
    BadgeCheck, 
    DollarSign, 
    Receipt, 
    Store, 
    PackageX 
} from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { DashboardSummaryResponse } from '@/types/api'
import { 
    Tooltip, 
    TooltipTrigger, 
    TooltipContent, 
    TooltipProvider 
} from '@/components/ui/tooltip'

interface DashboardSummaryCardsProps {
    data?: DashboardSummaryResponse
    isLoading: boolean
    isError: boolean
}

export function DashboardSummaryCards({ data, isLoading, isError }: DashboardSummaryCardsProps) {
    const formatCurrency = (val?: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val ?? 0)
    }

    const formatCurrencyFull = (val?: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(val ?? 0)
    }

    const formatNumber = (val?: number) => {
        return new Intl.NumberFormat('pt-BR').format(val ?? 0)
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="border border-gray-300 rounded-2xl shadow-sm bg-white p-5 space-y-3">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-7 w-1/2" />
                    </div>
                ))}
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="border border-red-200 bg-red-50 text-red-700 p-4 rounded-2xl text-center text-sm font-medium">
                Falha ao carregar os indicadores consolidados.
            </div>
        )
    }

    const cards = [
        {
            title: 'Total de Pedidos',
            value: formatNumber(data.totalOrders),
            icon: ShoppingCart,
            color: 'text-sky-600 bg-sky-50 border-sky-100',
            tooltip: formatNumber(data.totalOrders),
        },
        {
            title: 'Pagos / Aprovados',
            value: formatNumber(data.totalApprovedPayments),
            icon: BadgeCheck,
            color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
            tooltip: formatNumber(data.totalApprovedPayments),
        },
        {
            title: 'Receita Total',
            value: formatCurrency(data.totalRevenue),
            icon: DollarSign,
            color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
            tooltip: formatCurrencyFull(data.totalRevenue),
        },
        {
            title: 'Ticket Médio',
            value: formatCurrency(data.averageTicket),
            icon: Receipt,
            color: 'text-amber-600 bg-amber-50 border-amber-100',
            tooltip: formatCurrencyFull(data.averageTicket),
        },
        {
            title: 'Lojas com Vendas',
            value: formatNumber(data.totalSuppliersWithSales),
            icon: Store,
            color: 'text-purple-600 bg-purple-50 border-purple-100',
            tooltip: formatNumber(data.totalSuppliersWithSales),
        },
        {
            title: 'Produtos s/ Anúncio',
            value: formatNumber(data.totalProductsWithoutListings),
            icon: PackageX,
            color: 'text-rose-600 bg-rose-50 border-rose-100',
            tooltip: formatNumber(data.totalProductsWithoutListings),
        },
    ]

    return (
        <TooltipProvider>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {cards.map((card, idx) => {
                    const Icon = card.icon
                    return (
                        <Tooltip key={card.title}>
                            <TooltipTrigger asChild>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ ...smooth, delay: idx * 0.05 }}
                                    className="border border-gray-300 rounded-2xl shadow-sm bg-white p-5 flex flex-col justify-between hover:shadow-md transition-shadow cursor-help hover:border-sky-500/40"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div className={`p-2.5 rounded-xl border ${card.color}`}>
                                            <Icon size={20} />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{card.title}</p>
                                        <h4 className="text-xl font-bold text-gray-900 mt-1 truncate">{card.value}</h4>
                                    </div>
                                </motion.div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-900 border border-slate-800 text-white rounded-lg shadow-md px-2.5 py-1.5 text-xs font-bold leading-none">
                                {card.tooltip}
                            </TooltipContent>
                        </Tooltip>
                    )
                })}
            </div>
        </TooltipProvider>
    )
}
