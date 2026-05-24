import { ShippingEligibilityForm } from '@/components/admin/layout/shipping-eligibility-form'
import { PaymentLogsTable } from '@/components/admin/layout/payment-logs-table'

export default function FunctionsAndTriggers() {
    return (
        <section className='space-y-10 p-8'>
            <section className="flex flex-col justify-center gap-1">
                <h1 className="text-2xl font-bold text-black">Funções, Procedimentos e Triggers</h1>
                <h2 className="text-sm text-gray-400 break-after-auto">
                    Área para testar e visualizar os efeitos das rotinas de banco de dados da Etapa 05.
                </h2>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                    <ShippingEligibilityForm />
                    
                    <div className="p-6 bg-white border border-gray-300 rounded-2xl shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Cancelamento de Pedido (Procedure)</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Para testar a procedure <strong>sp_cancel_order_and_restore_stock</strong>, acesse o painel de Gerenciamento de Pedidos e clique no botão de Cancelar (X) de um pedido ativo.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <PaymentLogsTable />
                </div>
            </div>
        </section>
    )
}
