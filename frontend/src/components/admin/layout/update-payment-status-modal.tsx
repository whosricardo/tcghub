'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/shared/modal'
import SelectInput from '@/components/admin/common/selectInput'
import { StatusBadge } from '@/shared/status-badge'
import { Spinner } from '@/components/ui/spinner'
import { useUpdatePaymentStatus } from '@/hooks/usePayments'
import { PaymentStatus, PaymentResponse } from '@/types/api'
import { Database, CreditCard, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

interface UpdatePaymentStatusModalProps {
    isOpen: boolean;
    isClose: () => void;
}

export function UpdatePaymentStatusModal({ isOpen, isClose }: UpdatePaymentStatusModalProps) {
    const [paymentId, setPaymentId] = useState<string>('')
    const [status, setStatus] = useState<PaymentStatus>('APPROVED')
    const [successData, setSuccessData] = useState<PaymentResponse | null>(null)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    const updateMutation = useUpdatePaymentStatus()

    // Reset state on modal open/close
    useEffect(() => {
        if (!isOpen) {
            setPaymentId('')
            setStatus('APPROVED')
            setSuccessData(null)
            setErrorMsg(null)
            updateMutation.reset()
        }
    }, [isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setErrorMsg(null)
        setSuccessData(null)

        const idNum = Number(paymentId)
        if (isNaN(idNum) || idNum <= 0) {
            setErrorMsg('Por favor, informe um ID de pagamento válido (número inteiro positivo).')
            return
        }

        updateMutation.mutate(
            { paymentId: idNum, status },
            {
                onSuccess: (data) => {
                    setSuccessData(data)
                },
                onError: (err: any) => {
                    setErrorMsg(err?.message || 'Falha ao atualizar o status do pagamento. Verifique se o ID existe.')
                }
            }
        )
    }

    return (
        <Modal isOpen={isOpen} isClose={isClose}>
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                    <Database className="text-sky-500" size={24} />
                    <h2 className="text-xl font-bold text-gray-800">
                        Atualizar Status de Pagamento (Trigger Demo)
                    </h2>
                </div>

                {/* Database Explanation Banner */}
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs text-sky-800 flex items-start gap-2.5">
                    <Database className="shrink-0 text-sky-500 mt-0.5 animate-pulse" size={16} />
                    <div>
                        <span className="font-semibold">Demonstração de Trigger MySQL:</span> Alterar o status do pagamento ativa o trigger <code className="bg-sky-100 px-1 py-0.5 rounded font-mono font-bold text-[10px]">trg_log_payment_status_update</code>, que cria automaticamente um log de auditoria na tabela <code className="bg-sky-100 px-1 py-0.5 rounded font-mono font-bold text-[10px]">payment_logs</code> e atualiza a tabela de logs em tempo real.
                    </div>
                </div>

                {/* Error Alert */}
                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle className="shrink-0 text-red-500" size={18} />
                        <span>{errorMsg}</span>
                    </div>
                )}

                {/* Success Alert */}
                {successData && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="text-emerald-600" size={20} />
                            <span className="font-semibold text-sm">Status Atualizado com Sucesso!</span>
                        </div>
                        <div className="text-xs space-y-1.5 bg-white/60 p-3 rounded-lg border border-emerald-100">
                            <p><span className="font-medium text-gray-600">ID do Pagamento:</span> <span className="font-bold text-gray-900">#{successData.id}</span></p>
                            <p><span className="font-medium text-gray-600">ID do Pedido:</span> <span className="font-bold text-gray-900">#{successData.orderId}</span></p>
                            <p><span className="font-medium text-gray-600">Valor Pago:</span> <span className="font-bold text-gray-900">R$ {successData.amountPaid.toFixed(2)}</span></p>
                            <div className="flex items-center gap-1.5">
                                <span className="font-medium text-gray-600">Novo Status:</span>
                                <StatusBadge status={successData.status} />
                            </div>
                        </div>
                        <p className="text-[11px] text-emerald-600 italic">
                            * O trigger inseriu o histórico na tabela de logs. Os logs na aba de triggers já foram atualizados.
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Payment ID Input */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="paymentId" className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                                <CreditCard size={14} className="text-gray-400" />
                                ID do Pagamento
                            </label>
                            <input
                                id="paymentId"
                                type="number"
                                required
                                min="1"
                                placeholder="Ex: 1"
                                value={paymentId}
                                onChange={(e) => setPaymentId(e.target.value)}
                                disabled={updateMutation.isPending}
                                className="w-full p-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all placeholder:text-gray-400 text-gray-900"
                            />
                        </div>

                        {/* Status Select */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                                <RefreshCw size={14} className="text-gray-400" />
                                Novo Status
                            </label>
                            <SelectInput
                                filter="Selecione o Status"
                                className="w-full h-[40px] bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                                params={['PENDING', 'APPROVED', 'REJECTED', 'REFUNDED']}
                                value={status}
                                onValueChange={(val) => setStatus(val as PaymentStatus)}
                            />
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-2">
                        <button
                            type="button"
                            onClick={isClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        >
                            Fechar
                        </button>
                        <button
                            type="submit"
                            disabled={updateMutation.isPending || !paymentId}
                            className="px-4 py-2 text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 rounded-lg transition-colors flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {updateMutation.isPending ? (
                                <>
                                    <Spinner className="text-white" />
                                    <span>Atualizando...</span>
                                </>
                            ) : (
                                <span>Atualizar Status</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
