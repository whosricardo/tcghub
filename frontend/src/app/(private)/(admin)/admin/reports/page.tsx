import { 
    SupplierSalesTable, 
    PendingOrdersTable, 
    ProductsWithoutListingsTable, 
    OrdersAboveAverageTable 
} from '@/components/admin/layout/report-tables'

export default function ReportsPage() {
    return (
        <section className='space-y-10 p-8'>
            <section className="flex flex-col justify-center gap-1">
                <h1 className="text-2xl font-bold text-black">Consultas e Relatórios</h1>
                <h2 className="text-sm text-gray-400 break-after-auto">
                    Visualize os resultados das consultas complexas da Etapa 04.
                </h2>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Consulta 1 */}
                <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                    <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                        <h3 className="font-semibold text-md">Vendas por Fornecedor</h3>
                        <p className="text-xs text-gray-500 mt-1">JOIN + GROUP BY + HAVING</p>
                    </div>
                    <div className="p-4">
                        <SupplierSalesTable />
                    </div>
                </div>

                {/* Consulta 2 */}
                <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                    <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                        <h3 className="font-semibold text-md">Pedidos Pendentes</h3>
                        <p className="text-xs text-gray-500 mt-1">2 JOINs + WHERE</p>
                    </div>
                    <div className="p-4">
                        <PendingOrdersTable />
                    </div>
                </div>

                {/* Consulta 3 */}
                <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                    <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                        <h3 className="font-semibold text-md">Produtos sem Anúncio</h3>
                        <p className="text-xs text-gray-500 mt-1">Anti JOIN (LEFT JOIN)</p>
                    </div>
                    <div className="p-4">
                        <ProductsWithoutListingsTable />
                    </div>
                </div>

                {/* Consulta 4 */}
                <div className="flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white overflow-hidden">
                    <div className="bg-gray-50 border-b border-b-gray-300 p-4">
                        <h3 className="font-semibold text-md">Pedidos Acima da Média</h3>
                        <p className="text-xs text-gray-500 mt-1">Subconsulta</p>
                    </div>
                    <div className="p-4">
                        <OrdersAboveAverageTable />
                    </div>
                </div>
            </div>
        </section>
    )
}
