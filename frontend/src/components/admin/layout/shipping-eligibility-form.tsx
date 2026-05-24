'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { smooth } from '@/motion/transitions'
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
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smooth}
            className="p-6 bg-white border border-gray-300 rounded-2xl shadow-sm"
        >
            <h2 className="text-lg font-semibold mb-4">Verificar Elegibilidade de Envio</h2>
            <p className="text-sm text-gray-500 mb-6">
                Chama a função <strong>fn_can_ship_order</strong> no banco de dados para verificar se o pedido pode ser enviado.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                        ID do Pedido
                    </label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            id="orderId"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            placeholder="Ex: 1"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            required
                        />
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-6 py-2 bg-sky-400 text-white font-medium rounded-lg hover:bg-sky-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                        >
                            {mutation.isPending ? <Spinner className="h-5 w-5" /> : 'Verificar'}
                        </button>
                    </div>
                </div>
            </form>

            {mutation.isSuccess && mutation.data && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={smooth}
                    className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col gap-2"
                >
                    <span className="text-sm font-medium text-gray-700">Resultado do Banco de Dados:</span>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Pedido #{mutation.data.orderId}:</span>
                        <StatusBadge status={mutation.data.result} />
                    </div>
                </motion.div>
            )}

            {mutation.isError && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={smooth}
                    className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 text-sm"
                >
                    <strong>Erro no Servidor:</strong> A API retornou erro 500 ao tentar executar a função no banco de dados. Verifique os logs do Backend (Spring Boot) para detalhes do erro SQL.
                </motion.div>
            )}
        </motion.div>
    )
}
