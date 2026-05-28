'use client'

import React, { useState } from 'react'
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
import { useQueryTopSuppliers } from '@/hooks/useDashboard'
import { DashboardFilters } from '@/types/api'

interface TopSuppliersChartProps {
    filters: DashboardFilters
}

export function TopSuppliersChart({ filters }: TopSuppliersChartProps) {
    const [limit, setLimit] = useState<number>(5)

    const { data, isLoading, isError } = useQueryTopSuppliers({
        ...filters,
        limit,
    })

    const formatBRL = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <ChartCard
            title="Maiores Faturamentos por Loja"
            description="Ranking de fornecedores baseado no faturamento e total de itens vendidos."
            isLoading={isLoading}
            isError={isError}
            headerActions={
                <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-300 bg-white text-gray-700 outline-none cursor-pointer focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20"
                >
                    <option value={5}>Top 5 Lojas</option>
                    <option value={10}>Top 10 Lojas</option>
                </select>
            }
        >
            <div className="w-full h-[300px] min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <BarChart
                        data={data || []}
                        layout="vertical"
                        margin={{ top: 10, right: 20, left: 10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                        <XAxis
                            type="number"
                            stroke="#9ca3af"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `R$ ${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                        />
                        <YAxis
                            type="category"
                            dataKey="storeName"
                            stroke="#1f2937"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            width={110}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const entry = payload[0].payload
                                    return (
                                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                                            <p className="text-xs font-bold text-gray-900 leading-tight">
                                                {entry.storeName}
                                            </p>
                                            <p className="text-xs font-semibold text-gray-500 mt-0.5">
                                                {entry.supplierName} (ID: {entry.supplierId})
                                            </p>
                                            <div className="mt-2 space-y-0.5 text-xs border-t border-gray-100 pt-2">
                                                <p className="flex justify-between gap-4 font-semibold text-gray-600">
                                                    <span>Receita:</span>
                                                    <span className="text-indigo-600 font-bold">{formatBRL(entry.totalRevenue)}</span>
                                                </p>
                                                <p className="flex justify-between gap-4 text-gray-500">
                                                    <span>Itens Vendidos:</span>
                                                    <span className="font-bold text-gray-700">{entry.totalItemsSold} un.</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Bar
                            dataKey="totalRevenue"
                            fill="#6366f1"
                            radius={[0, 6, 6, 0]}
                            barSize={14}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    )
}
