'use client'

import React, { useState } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts'
import { ChartCard } from './chart-card'
import { useQuerySalesTrend } from '@/hooks/useDashboard'
import { DashboardFilters } from '@/types/api'

interface SalesTrendChartProps {
    filters: DashboardFilters
}

export function SalesTrendChart({ filters }: SalesTrendChartProps) {
    const [groupBy, setGroupBy] = useState<'day' | 'month'>('day')
    
    const { data, isLoading, isError } = useQuerySalesTrend({
        ...filters,
        groupBy,
    })

    const formatBRL = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            maximumFractionDigits: 0,
        }).format(value)
    }

    const formatDateLabel = (label: string) => {
        if (!label) return ''
        if (groupBy === 'month') {
            const parts = label.split('-')
            if (parts.length < 2) return label
            const year = parts[0]
            const month = parts[1]
            const months = [
                'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
            ]
            return `${months[parseInt(month, 10) - 1]} / ${year}`
        } else {
            const parts = label.split('-')
            if (parts.length < 3) return label
            return `${parts[2]}/${parts[1]}`
        }
    }

    return (
        <ChartCard
            title="Tendência de Faturamento"
            description="Faturamento diário ou mensal consolidado com base nos pedidos realizados."
            isLoading={isLoading}
            isError={isError}
            headerActions={
                <div className="flex bg-gray-200/60 p-0.5 rounded-lg border border-gray-200">
                    <button
                        onClick={() => setGroupBy('day')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors outline-none cursor-pointer ${
                            groupBy === 'day'
                                ? 'bg-white text-sky-600 shadow-sm font-bold'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Dia
                    </button>
                    <button
                        onClick={() => setGroupBy('month')}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors outline-none cursor-pointer ${
                            groupBy === 'month'
                                ? 'bg-white text-sky-600 shadow-sm font-bold'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Mês
                    </button>
                </div>
            }
        >
            <div className="w-full h-[300px] min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart
                        data={data || []}
                        margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickFormatter={formatDateLabel}
                            stroke="#9ca3af"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(v) => `R$ ${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
                            dx={-10}
                        />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const dataPoint = payload[0].payload
                                    return (
                                        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
                                            <p className="text-xs font-semibold text-gray-500">
                                                {formatDateLabel(dataPoint.label)}
                                            </p>
                                            <p className="text-sm font-bold text-gray-900 mt-1">
                                                {formatBRL(dataPoint.totalRevenue)}
                                            </p>
                                        </div>
                                    )
                                }
                                return null
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="totalRevenue"
                            stroke="#0ea5e9"
                            strokeWidth={2.5}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    )
}
