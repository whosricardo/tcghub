'use client'

import React, { useState } from 'react'
import { DashboardSummaryCards } from '@/components/admin/dashboard/dashboard-summary-cards'
import { DashboardFiltersPanel } from '@/components/admin/dashboard/dashboard-filters'
import { SalesTrendChart } from '@/components/admin/dashboard/sales-trend-chart'
import { OrderStatusChart } from '@/components/admin/dashboard/order-status-chart'
import { TopSuppliersChart } from '@/components/admin/dashboard/top-suppliers-chart'
import { PaymentMethodsChart } from '@/components/admin/dashboard/payment-methods-chart'
import { OrderStatisticsChart } from '@/components/admin/dashboard/order-statistics-chart'
import { OrderValueRangesChart } from '@/components/admin/dashboard/order-value-ranges-chart'
import { useQueryDashboardSummary } from '@/hooks/useDashboard'
import { DashboardFilters } from '@/types/api'

export default function AdminPage() {
    const [filters, setFilters] = useState<DashboardFilters>({
        startDate: undefined,
        endDate: undefined,
        collection: undefined,
        status: undefined,
    })

    const { data: summaryData, isLoading: isSummaryLoading, isError: isSummaryError } = useQueryDashboardSummary()

    const handleReset = () => {
        setFilters({
            startDate: undefined,
            endDate: undefined,
            collection: undefined,
            status: undefined,
        })
    }

    return (
        <section className="space-y-6 max-w-7xl mx-auto pb-12">
            {/* Header principal */}
            <section className="flex flex-col justify-center gap-1">
                <h1 className="text-2xl font-bold text-black">Dashboard Estatístico</h1>
                <h2 className="text-sm text-gray-400">
                    Acompanhe em tempo real a telemetria operacional, faturamento, tickets e performance de vendas da plataforma.
                </h2>
            </section>

            {/* Painel de Filtros */}
            <DashboardFiltersPanel
                filters={filters}
                onChange={setFilters}
                onReset={handleReset}
            />

            {/* KPI Summary Cards */}
            <DashboardSummaryCards
                data={summaryData}
                isLoading={isSummaryLoading}
                isError={isSummaryError}
            />

            {/* Gráficos de Faturamento & Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesTrendChart filters={filters} />
                </div>
                <div className="lg:col-span-1">
                    <OrderStatusChart filters={filters} />
                </div>
            </div>

            {/* Gráficos de Ranking & Pagamento */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopSuppliersChart filters={filters} />
                <PaymentMethodsChart filters={filters} />
            </div>

            {/* Gráficos de Estatísticas & Faixas de Valor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrderStatisticsChart filters={filters} />
                <OrderValueRangesChart filters={filters} />
            </div>
        </section>
    )
}