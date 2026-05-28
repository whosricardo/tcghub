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
                </div>

                <div className="flex flex-col gap-8">
                    <PaymentLogsTable />
                </div>
            </div>
        </section>
    )
}
