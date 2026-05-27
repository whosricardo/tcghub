'use client'

import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { ChartCard } from './chart-card'
import { useQueryOrderStatusDistribution } from '@/hooks/useDashboard'
import { DashboardFilters } from '@/types/api'

interface OrderStatusChartProps {
    filters: DashboardFilters
}

export function OrderStatusChart({ filters }: OrderStatusChartProps) {
    const { data, isLoading, isError } = useQueryOrderStatusDistribution(filters)

    const COLORS: Record<string, string> = {
        PENDING: '#f59e0b',
        PAID: '#10b981',
        SHIPPED: '#3b82f6',
        DELIVERED: '#6366f1',
        CANCELLED: '#ef4444',
    }

    const STATUS_LABELS: Record<string, string> = {
        PENDING: 'Pendente',
        PAID: 'Pago',
        SHIPPED: 'Enviado',
        DELIVERED: 'Entregue',
        CANCELLED: 'Cancelado',
    }

    const totalOrders = data?.reduce((acc, curr) => acc + curr.total, 0) ?? 0

    const chartData = data?.map(item => ({
        ...item,
        name: STATUS_LABELS[item.status] || item.status,
        value: item.total,
    })) || []

    return (
        <ChartCard
            title="Distribuição por Status"
            description="Visão proporcional dos pedidos de acordo com o status operacional."
            isLoading={isLoading}
            isError={isError}
        >
            <div className="w-full h-[300px] flex flex-col items-center justify-center relative min-w-0">
                <div className="w-full h-[230px] flex items-center justify-center relative min-w-0">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={58}
                                outerRadius={82}
                                paddingAngle={3}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.status] || '#888888'} />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const entry = payload[0].payload
                                        const percentage = totalOrders > 0 ? ((entry.value / totalOrders) * 100).toFixed(1) : '0'
                                        return (
                                            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-2.5">
                                                <p className="text-xs font-semibold text-gray-500">{entry.name}</p>
                                                <p className="text-sm font-bold text-gray-900 mt-0.5">
                                                    {entry.value} pedidos ({percentage}%)
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Total de Pedidos centralizado */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Total</span>
                        <span className="text-2xl font-black text-gray-900 leading-none mt-1">{totalOrders}</span>
                    </div>
                </div>

                {/* Legendas personalizadas embaixo */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2 px-2 text-xs font-semibold text-gray-600">
                    {chartData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[entry.status] }} />
                            <span className="truncate">{entry.name}: {entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </ChartCard>
    )
}
