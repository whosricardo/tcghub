'use client'

import { useState } from 'react'
import { useCheckShippingEligibility } from '@/hooks/useFunctions'
import { StatusBadge } from '@/shared/status-badge'
import { Spinner } from '@/components/ui/spinner'

export function ShippingEligibilityForm() {
    const [orderId, setOrderId] = useState('')
    const mutation = useCheckShippingEligibility()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (orderId) {
            mutation.mutate(Number(orderId))
        }
    }

    return (
        <div className="p-6 bg-white border border-gray-300 rounded-2xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Verificar Elegibilidade de Envio</h2>
            <p className="text-sm text-gray-500 mb-6">
                Chama a função <strong>fn_can_ship_order</strong> no banco de dados para verificar se o pedido pode ser enviado.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                <div className="flex flex-col gap-2">
                    <label htmlFor="orderId" className="text-sm font-medium">ID do Pedido</label>
                    <input
                        id="orderId"
                        type="number"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="Ex: 1"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={mutation.isPending || !orderId}
                    className="px-4 py-2 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 disabled:opacity-50 transition-colors"
                >
                    {mutation.isPending ? 'Verificando...' : 'Verificar'}
                </button>
            </form>

            {mutation.isSuccess && mutation.data && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Resultado da Função:</p>
                    <StatusBadge status={mutation.data.result} />
                </div>
            )}

            {mutation.isError && (
                <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm">
                    <strong>Erro no Servidor:</strong> A API retornou erro 500 ao tentar executar a função no banco de dados. Verifique os logs do Backend (Spring Boot) para detalhes do erro SQL.
                </div>
            )}
        </div>
    )
}
