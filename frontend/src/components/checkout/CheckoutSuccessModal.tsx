"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { bouncy, smooth } from '@/motion/transitions';
import { useCheckoutStore } from '@/store/checkoutStore';
import { Button } from '@/components/ui/button';
import { Modal } from '@/shared/modal';
import { 
    CheckCircle2, 
    Copy, 
    Check, 
    Download, 
    ShoppingBag, 
    ExternalLink, 
    Calendar,
    ArrowRight
} from 'lucide-react';

export function CheckoutSuccessModal() {
    const router = useRouter();
    const { submissionStatus, orderId, payment, resetCheckout } = useCheckoutStore();
    const [copied, setCopied] = useState(false);

    const isOpen = submissionStatus === 'success';

    const handleClose = () => {
        resetCheckout();
        router.push('/');
    };

    const handleGoToOrders = () => {
        resetCheckout();
        router.push('/admin/dashboard?tab=orders'); // or standard orders page route
    };

    const handleCopyPix = () => {
        navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136tcghub-c7b2-4d22-83b6-checkout1235204000053039865802BR5915TCGHub Payments6009SAO PAULO62070503tcg6304D12B");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} isClose={handleClose}>
            <div className="flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-md mx-auto">
                
                {/* Bouncy success check icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={bouncy}
                    className="p-3 bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400 rounded-full shrink-0"
                >
                    <CheckCircle2 className="size-16" strokeWidth={2.5} />
                </motion.div>

                {/* Text Messages */}
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                        Pedido Realizado!
                    </h2>
                    <p className="text-sm text-gray-500">
                        Sua compra foi processada e enviada para processamento com sucesso.
                    </p>
                    {orderId && (
                        <div className="inline-block bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/50 px-4 py-1.5 rounded-full font-mono text-xs text-sky-700 dark:text-sky-400 font-bold mt-2">
                            Pedido ID: #{orderId}
                        </div>
                    )}
                </div>

                {/* Contextual payment methods details */}
                {payment?.paymentMethod === 'PIX' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={smooth}
                        className="w-full bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4 text-left"
                    >
                        <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-center">
                            Aguardando Pagamento Pix
                        </h4>
                        
                        <div className="flex justify-center py-2">
                            {/* QR Code Placeholder using modern styling */}
                            <div className="size-40 bg-white p-3 rounded-lg border border-gray-200 shadow-sm relative flex items-center justify-center">
                                <img 
                                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=00020126580014BR.GOV.BCB.PIX0136tcghub-c7b2-4d22-83b6-checkout1235204000053039865802BR5915TCGHub Payments6009SAO PAULO62070503tcg6304D12B" 
                                    alt="QR Code Pix"
                                    className="size-full"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] text-gray-500 text-center">
                                Escaneie o QR Code acima no app do seu banco ou utilize o código Copia e Cola abaixo.
                            </p>
                            
                            <div className="flex gap-2 bg-white dark:bg-gray-950 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                                <input 
                                    type="text" 
                                    readOnly 
                                    value="00020126580014BR.GOV.BCB.PIX0136tcghub..."
                                    className="text-xs font-mono text-gray-500 bg-transparent flex-1 select-all outline-none pl-1"
                                />
                                <button 
                                    onClick={handleCopyPix}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-900 text-sky-600 rounded transition-colors"
                                    title="Copiar código Pix"
                                >
                                    {copied ? <Check className="size-4 text-green-600" /> : <Copy className="size-4" />}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {payment?.paymentMethod === 'BOLETO' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={smooth}
                        className="w-full bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-3"
                    >
                        <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Boleto Bancário Gerado
                        </h4>
                        <p className="text-xs text-gray-500">
                            Clique no botão abaixo para baixar ou visualizar o PDF do seu boleto bancário de pagamento.
                        </p>
                        
                        <Button 
                            onClick={() => window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank')}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold flex items-center justify-center gap-2 h-10"
                        >
                            <Download className="size-4" />
                            <span>Baixar Boleto PDF</span>
                        </Button>
                    </motion.div>
                )}

                {(payment?.paymentMethod === 'CREDIT_CARD' || payment?.paymentMethod === 'DEBIT_CARD') && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={smooth}
                        className="w-full bg-green-50/20 dark:bg-green-950/10 p-4 rounded-xl border border-green-100/30 text-center space-y-2 py-4"
                    >
                        <h4 className="text-xs font-bold text-green-800 dark:text-green-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="size-4" />
                            Pagamento Aprovado!
                        </h4>
                        <p className="text-xs text-green-700 dark:text-green-500 max-w-xs mx-auto">
                            A administradora do seu cartão confirmou a transação. O vendedor já foi notificado para preparar o envio.
                        </p>
                    </motion.div>
                )}

                {/* Routing actions buttons */}
                <div className="w-full pt-4 flex flex-col gap-3">
                    <Button 
                        onClick={handleGoToOrders} 
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 h-11"
                    >
                        <span>Acompanhar Pedido</span>
                        <ArrowRight className="size-4" />
                    </Button>
                    
                    <Button 
                        onClick={handleClose} 
                        variant="outline"
                        className="w-full py-3 rounded-lg font-semibold h-11 flex items-center justify-center gap-2 border-gray-300 text-gray-700 dark:text-gray-900"
                    >
                        <ShoppingBag className="size-4" />
                        <span>Voltar às Compras</span>
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
