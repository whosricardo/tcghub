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
    Cell,
} from 'recharts'
import { ChartCard } from './chart-card'
import { useQueryOrderStatistics } from '@/hooks/useDashboard'
import { DashboardFilters } from '@/types/api'
import { Sigma, TrendingUp } from 'lucide-react'

interface OrderStatisticsChartProps {
    filters: DashboardFilters
}

export function OrderStatisticsChart({ filters }: OrderStatisticsChartProps) {
    const { data, isLoading, isError } = useQueryOrderStatistics(filters)

    const formatBRL = (value?: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value ?? 0)
    }

    const formatDecimals = (value?: number) => {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value ?? 0)
    }

    const chartData = data
        ? [
              { name: 'Média', value: data.average, color: '#06b6d4' },
              { name: 'Mediana', value: data.median, color: '#3b82f6' },
              { name: 'Moda', value: data.mode, color: '#f59e0b' },
          ]
        : []

    return (
        <ChartCard
            title="Estatísticas e Dispersão"
            description="Média, mediana, moda (faturamento) e variabilidade populacional dos pedidos."
            isLoading={isLoading}
            isError={isError}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center w-full">
                {/* Gráfico de Barras - Centralidade (2 cols) */}
                <div className="md:col-span-2 h-[260px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                            <XAxis dataKey="name" stroke="#4b5563" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} />
                            <YAxis
                                stroke="#9ca3af"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => `R$ ${v}`}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const entry = payload[0].payload
                                        return (
                                            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-2.5">
                                                <p className="text-xs font-semibold text-gray-500">{entry.name}</p>
                                                <p className="text-sm font-bold text-gray-900 mt-0.5">
                                                    {formatBRL(entry.value)}
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Cards de Dispersão - Variabilidade (1 col) */}
                <div className="flex flex-col gap-4">
                    {/* Variância */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg shrink-0">
                            <Sigma size={18} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Variância</span>
                            <span className="text-base font-black text-gray-900 leading-tight block truncate mt-0.5">
                                {formatDecimals(data?.variance)}
                            </span>
                        </div>
                    </div>

                    {/* Desvio Padrão */}
                    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex items-center gap-3">
                        <div className="p-2.5 bg-pink-50 border border-pink-100 text-pink-600 rounded-lg shrink-0">
                            <TrendingUp size={18} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Desvio Padrão</span>
                            <span className="text-base font-black text-gray-900 leading-tight block truncate mt-0.5">
                                {formatBRL(data?.standardDeviation)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ChartCard>
    )
}
