'use client'

import { useState } from 'react'
import { ShippingEligibilityForm } from '@/components/admin/layout/shipping-eligibility-form'
import { PaymentLogsTable } from '@/components/admin/layout/payment-logs-table'
import { UpdatePaymentStatusModal } from '@/components/admin/layout/update-payment-status-modal'
import { CreditCard } from 'lucide-react'

export default function FunctionsAndTriggers() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <section className='space-y-10 p-8'>
            <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
                <div className="flex flex-col justify-center gap-1">
                    <h1 className="text-2xl font-bold text-black">Funções, Procedimentos e Triggers</h1>
                    <h2 className="text-sm text-gray-400 break-after-auto">
                        Área para testar e visualizar os efeitos das rotinas de banco de dados da Etapa 05.
                    </h2>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2.5 text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-all shadow-sm flex items-center gap-2 border border-sky-600 cursor-pointer self-start md:self-center"
                >
                    <CreditCard size={18} />
                    <span>Atualizar Pagamento</span>
                </button>
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                    <ShippingEligibilityForm />
                </div>

                <div className="flex flex-col gap-8">
                    <PaymentLogsTable />
                </div>
            </div>

            <UpdatePaymentStatusModal 
                isOpen={isModalOpen} 
                isClose={() => setIsModalOpen(false)} 
            />
        </section>
    )
}
