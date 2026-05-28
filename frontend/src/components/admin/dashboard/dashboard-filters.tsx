'use client'

import React from 'react'
import { Filter, X } from 'lucide-react'
import { DashboardFilters } from '@/types/api'

interface DashboardFiltersProps {
    filters: DashboardFilters
    onChange: (filters: DashboardFilters) => void
    onReset: () => void
}

export function DashboardFiltersPanel({ filters, onChange, onReset }: DashboardFiltersProps) {
    const handleDateChange = (field: 'startDate' | 'endDate', val: string) => {
        onChange({
            ...filters,
            [field]: val || undefined,
        })
    }

    const handleSelectChange = (field: 'collection' | 'status', val: string) => {
        onChange({
            ...filters,
            [field]: val === 'all' ? undefined : val,
        })
    }

    const hasActiveFilters = !!(filters.startDate || filters.endDate || filters.collection || filters.status)

    return (
        <div className="border border-gray-300 rounded-2xl shadow-sm bg-white p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm">
                    <Filter size={16} className="text-sky-600" />
                    <span>Filtros do Painel</span>
                </div>
                {hasActiveFilters && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors outline-none cursor-pointer"
                    >
                        <X size={14} />
                        Limpar Filtros
                    </button>
                )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Período: Início */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">De (Data Inicial)</label>
                    <input
                        type="date"
                        value={filters.startDate || ''}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl border-gray-300 text-sm bg-white font-medium text-black outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 cursor-pointer"
                    />
                </div>

                {/* Período: Fim */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Até (Data Final)</label>
                    <input
                        type="date"
                        value={filters.endDate || ''}
                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl border-gray-300 text-sm bg-white font-medium text-black outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 cursor-pointer"
                    />
                </div>

                {/* Coleção */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Franquia / Coleção</label>
                    <select
                        value={filters.collection || 'all'}
                        onChange={(e) => handleSelectChange('collection', e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl border-gray-300 text-sm bg-white font-medium text-black outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 cursor-pointer"
                    >
                        <option value="all">Todas Franquias</option>
                        <option value="Magic">Magic: The Gathering</option>
                        <option value="Pokémon">Pokémon</option>
                        <option value="Yu-Gi-Oh!">Yu-Gi-Oh!</option>
                        <option value="One Piece">One Piece</option>
                    </select>
                </div>

                {/* Status do Pedido */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Status do Pedido</label>
                    <select
                        value={filters.status || 'all'}
                        onChange={(e) => handleSelectChange('status', e.target.value)}
                        className="w-full px-3 py-2 border rounded-xl border-gray-300 text-sm bg-white font-medium text-black outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 cursor-pointer"
                    >
                        <option value="all">Todos os Status</option>
                        <option value="PENDING">Pendente</option>
                        <option value="PAID">Pago</option>
                        <option value="SHIPPED">Enviado</option>
                        <option value="DELIVERED">Entregue</option>
                        <option value="CANCELLED">Cancelado</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
