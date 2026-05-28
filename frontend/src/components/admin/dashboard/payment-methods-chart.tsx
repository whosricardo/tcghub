'use client'

import React from 'react'
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'
import { ChartCard } from './chart-card'
import { useQueryPaymentMethodDistribution } from '@/hooks/useDashboard'
import { DashboardFilters } from '@/types/api'

interface PaymentMethodsChartProps {
    filters: DashboardFilters
}

export function PaymentMethodsChart({ filters }: PaymentMethodsChartProps) {
    const { data, isLoading, isError } = useQueryPaymentMethodDistribution(filters)

    const METHOD_LABELS: Record<string, string> = {
        CREDIT_CARD: 'C. Crédito',
        DEBIT_CARD: 'C. Débito',
        PIX: 'PIX',
        BOLETO: 'Boleto',
        CASH: 'Dinheiro',
    }

    const chartData = data?.map(item => ({
        ...item,
        name: METHOD_LABELS[item.paymentMethod] || item.paymentMethod,
        value: item.total,
    })) || []

    return (
        <ChartCard
            title="Métodos de Pagamento"
            description="Distribuição volumétrica de transações por modalidade."
            isLoading={isLoading}
            isError={isError}
        >
            <div className="w-full h-[300px] flex items-center justify-center min-w-0">
                {chartData.length === 0 ? (
                    <span className="text-gray-400 text-sm font-semibold">Sem transações no período</span>
                ) : (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="name" stroke="#4b5563" fontSize={11} fontWeight={600} />
                            <PolarRadiusAxis stroke="#9ca3af" fontSize={10} angle={30} domain={[0, 'auto']} />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const entry = payload[0].payload
                                        return (
                                            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-2.5">
                                                <p className="text-xs font-semibold text-gray-500">{entry.name}</p>
                                                <p className="text-sm font-bold text-gray-900 mt-0.5">
                                                    {entry.value} transações
                                                </p>
                                            </div>
                                        )
                                    }
                                    return null
                                }}
                            />
                            <Radar
                                name="Pagamentos"
                                dataKey="value"
                                stroke="#ec4899"
                                fill="#ec4899"
                                fillOpacity={0.25}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </ChartCard>
    )
}
