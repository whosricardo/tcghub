'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { smooth } from '@/motion/transitions'
import { 
    SupplierSalesTable, 
    PendingOrdersTable, 
    ProductsWithoutListingsTable, 
    OrdersAboveAverageTable 
} from '@/components/admin/layout/report-tables'
import {
    ActiveListingsDetailTable,
    AboveAvgCommissionSuppliersTable
} from '@/components/admin/layout/view-tables'
import { FileSpreadsheet, Eye, Grid, Store } from 'lucide-react'

type TabType = 'queries' | 'views';

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState<TabType>('queries');

    return (
        <section className='space-y-8 p-8 max-w-7xl mx-auto'>
            {/* Header principal */}
            <section className="flex flex-col justify-center gap-1">
                <h1 className="text-2xl font-bold text-black">Consultas & Views SQL</h1>
                <h2 className="text-sm text-gray-400">
                    Visualize os resultados das consultas complexas e views otimizadas da Etapa 04 do banco de dados.
                </h2>
            </section>

            {/* Abas de Navegação Premium */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('queries')}
                    className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all relative outline-none ${
                        activeTab === 'queries' 
                        ? 'text-sky-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <FileSpreadsheet size={16} />
                    Consultas Complexas
                    {activeTab === 'queries' && (
                        <motion.div 
                            layoutId="activeTabUnderline" 
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500" 
                            transition={smooth} 
                        />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('views')}
                    className={`flex items-center gap-2 px-6 py-3 font-semibold text-sm border-b-2 transition-all relative outline-none ${
                        activeTab === 'views' 
                        ? 'text-sky-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Eye size={16} />
                    Views Otimizadas (Etapa 04)
                    {activeTab === 'views' && (
                        <motion.div 
                            layoutId="activeTabUnderline" 
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-500" 
                            transition={smooth} 
                        />
                    )}
                </button>
            </div>

            {/* Conteúdo das Abas */}
            <div className="mt-2">
                <AnimatePresence mode="wait">
                    {activeTab === 'queries' ? (
                        <motion.div
                            key="queries-tab"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 8 }}
                            transition={smooth}
                            className="grid grid-cols-1 xl:grid-cols-2 gap-8"
                        >
                            {/* Consulta 1 */}
                            <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                                <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                                    <h3 className="font-semibold text-md text-black">Vendas por Fornecedor</h3>
                                    <p className="text-xs text-gray-500 mt-1">JOIN + GROUP BY + HAVING</p>
                                </div>
                                <div className="p-4">
                                    <SupplierSalesTable />
                                </div>
                            </div>

                            {/* Consulta 2 */}
                            <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                                <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                                    <h3 className="font-semibold text-md text-black">Pedidos Pendentes</h3>
                                    <p className="text-xs text-gray-500 mt-1">2 JOINs + WHERE</p>
                                </div>
                                <div className="p-4">
                                    <PendingOrdersTable />
                                </div>
                            </div>

                            {/* Consulta 3 */}
                            <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                                <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                                    <h3 className="font-semibold text-md text-black">Produtos sem Anúncio</h3>
                                    <p className="text-xs text-gray-500 mt-1">Anti JOIN (LEFT JOIN)</p>
                                </div>
                                <div className="p-4">
                                    <ProductsWithoutListingsTable />
                                </div>
                            </div>

                            {/* Consulta 4 */}
                            <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                                <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                                    <h3 className="font-semibold text-md text-black">Pedidos Acima da Média</h3>
                                    <p className="text-xs text-gray-500 mt-1">Subconsulta</p>
                                </div>
                                <div className="p-4">
                                    <OrdersAboveAverageTable />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="views-tab"
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={smooth}
                            className="flex flex-col gap-8"
                        >
                            {/* View 01 */}
                            <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                                <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                                    <h3 className="font-semibold text-md text-black flex items-center gap-2">
                                        <Grid size={18} className="text-sky-600" />
                                        Detalhes de Anúncios Ativos
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Consulta à View SQL: <code>vw_active_listings_detail</code> (3 JOINs + WHERE)
                                    </p>
                                </div>
                                <div className="p-6">
                                    <ActiveListingsDetailTable />
                                </div>
                            </div>

                            {/* View 02 */}
                            <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                                <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                                    <h3 className="font-semibold text-md text-black flex items-center gap-2">
                                        <Store size={18} className="text-sky-600" />
                                        Fornecedores com Comissão acima da Média
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Consulta à View SQL: <code>vw_above_avg_commission_suppliers</code> (1 JOIN + Subconsulta)
                                    </p>
                                </div>
                                <div className="p-6">
                                    <AboveAvgCommissionSuppliersTable />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

