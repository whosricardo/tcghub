'use client'

import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { ChartCard } from './chart-card'
import { useQueryOrderValueRanges } from '@/hooks/useDashboard'
import { DashboardFilters } from '@/types/api'

interface OrderValueRangesChartProps {
    filters: DashboardFilters
}

export function OrderValueRangesChart({ filters }: OrderValueRangesChartProps) {
    const { data, isLoading, isError } = useQueryOrderValueRanges(filters)

    return (
        <ChartCard
            title="Faixas de Valor dos Pedidos"
            description="Frequência quantitativa de pedidos agrupados por faixas de ticket financeiro (Histograma)."
            isLoading={isLoading}
            isError={isError}
        >
            <div className="w-full h-[300px] min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart
                        data={data || []}
                        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                        <XAxis
                            dataKey="rangeLabel"
                            stroke="#4b5563"
                            fontSize={11}
                            fontWeight={600}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `${v} ped.`}
                            dx={-10}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const entry = payload[0].payload
                                    return (
                                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-2.5">
                                            <p className="text-xs font-semibold text-gray-500">Faixa: {entry.rangeLabel}</p>
                                            <p className="text-sm font-bold text-gray-900 mt-0.5">
                                                {entry.totalOrders} pedidos
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar
                            dataKey="totalOrders"
                            fill="#8b5cf6"
                            radius={[6, 6, 0, 0]}
                            barSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    )
}
