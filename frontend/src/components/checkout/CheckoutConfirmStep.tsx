"use client";

import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCheckoutMutation } from '@/hooks/useCheckout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
    AlertTriangle,
    CheckCircle2,
    ArrowLeft,
    MapPin,
    CreditCard,
    Package,
    Lock,
    QrCode,
    Receipt,
    Wallet
} from 'lucide-react';

export function CheckoutConfirmStep() {
    const { items, getCartTotal, getShippingTotal } = useCartStore();
    const { address, payment, submissionStatus, error, prevStep } = useCheckoutStore();

    const checkoutMutation = useCheckoutMutation();

    const cartTotal = getCartTotal();
    const shippingTotal = getShippingTotal();
    const grandTotal = cartTotal + shippingTotal;

    const handleConfirmOrder = async () => {
        if (!payment?.paymentMethod) return;

        try {
            await checkoutMutation.mutateAsync({
                paymentMethod: payment.paymentMethod,
                totalAmount: grandTotal,
                shippingTotal: shippingTotal
            });
        } catch (err) {
            console.error("Erro ao enviar pedido para o backend:", err);
        }
    };

    const isSubmitting = submissionStatus === 'loading';

    // Mask card digits for privacy
    const getMaskedCardNumber = () => {
        if (!payment?.cardNumber) return '•••• •••• •••• ••••';
        const num = payment.cardNumber.replace(/\s/g, '');
        return `•••• •••• •••• ${num.slice(-4)}`;
    };

    const getPaymentIcon = () => {
        switch (payment?.paymentMethod) {
            case 'CREDIT_CARD':
            case 'DEBIT_CARD':
                return <CreditCard className="size-5 text-sky-600" />;
            case 'PIX':
                return <QrCode className="size-5 text-green-600" />;
            case 'BOLETO':
                return <Receipt className="size-5 text-amber-600" />;
            default:
                return <Wallet className="size-5 text-sky-600" />;
        }
    };

    const getPaymentName = () => {
        switch (payment?.paymentMethod) {
            case 'CREDIT_CARD': return 'Cartão de Crédito';
            case 'DEBIT_CARD': return 'Cartão de Débito';
            case 'PIX': return 'Pix';
            case 'BOLETO': return 'Boleto Bancário';
            default: return 'Dinheiro na Retirada';
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="size-5 text-sky-600" />
                Confirmação do Pedido
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Revise os dados de envio e pagamento abaixo. Sua compra é processada em ambiente 100% seguro.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    {/* Delivery summary card */}
                    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl p-5 shadow-xs space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-sky-600" />
                            Endereço de Envio
                        </h4>
                        {address && (
                            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                <p className="font-semibold text-gray-900 dark:text-white">{address.fullName}</p>
                                <p>{address.street}, Nº {address.number} {address.complement && `- ${address.complement}`}</p>
                                <p>{address.neighborhood} • {address.city} - {address.state}</p>
                                <p className="text-xs text-gray-400 mt-2 font-mono">CEP: {address.zipCode} • Tel: {address.phone}</p>
                            </div>
                        )}
                    </div>

                    {/* Payment summary card */}
                    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl p-5 shadow-xs space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            {getPaymentIcon()}
                            Método de Pagamento
                        </h4>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            <p className="font-semibold text-gray-900 dark:text-white">{getPaymentName()}</p>

                            {(payment?.paymentMethod === 'CREDIT_CARD' || payment?.paymentMethod === 'DEBIT_CARD') && (
                                <div className="mt-2 text-xs text-gray-500 font-mono space-y-0.5">
                                    <p>Cartão: {getMaskedCardNumber()}</p>
                                    <p>Titular: {payment.cardName?.toUpperCase()}</p>
                                    <p>Validade: {payment.expiryDate}</p>
                                </div>
                            )}

                            {payment?.paymentMethod === 'PIX' && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Processamento instantâneo. O QR code será exibido em seguida.
                                </p>
                            )}

                            {payment?.paymentMethod === 'BOLETO' && (
                                <p className="text-xs text-gray-500 mt-1">
                                    Compensação bancária de 1 a 2 dias úteis. Boleto para download em PDF a seguir.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Package breakdown summary */}
                    <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-xl p-5 shadow-xs space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Package className="size-3.5 text-sky-600" />
                            Itens do Pedido ({items.length})
                        </h4>

                        <div className="max-h-[160px] overflow-y-auto pr-1 divide-y divide-gray-50 dark:divide-gray-900">
                            {items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-2 first:pt-0 last:pb-0 text-xs">
                                    <div className="min-w-0 flex-1 pr-3">
                                        <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{item.title}</p>
                                        <p className="text-gray-400 text-[10px] mt-0.5">{item.sellerName} • {item.condition}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="font-bold text-gray-800 dark:text-gray-200">
                                            $ {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <p className="text-gray-400 text-[10px]">Qtd: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final Billing total card */}
                    <div className="bg-sky-50/30 dark:bg-sky-950/10 border border-sky-100/50 dark:border-sky-950/30 rounded-xl p-5 space-y-4">
                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex justify-between">
                                <span>Cartas</span>
                                <span className="font-medium text-gray-900 dark:text-white">$ {cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Frete Total</span>
                                <span className="font-medium text-gray-900 dark:text-white">$ {shippingTotal.toFixed(2)}</span>
                            </div>

                            <Separator className="my-2 bg-sky-100/50 dark:bg-sky-950/30" />

                            <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white">
                                <span>Total a Pagar</span>
                                <span className="text-sky-600 dark:text-sky-400">$ {grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error message alert box */}
            {error && (
                <div className="flex gap-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl items-start animate-shake">
                    <AlertTriangle className="size-5 shrink-0 mt-0.5" />
                    <div>
                        <h5 className="font-bold">Erro ao processar compra</h5>
                        <p className="mt-1 text-xs opacity-90">{error}</p>
                    </div>
                </div>
            )}

            {/* CTA action buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-900 mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="flex-1 h-11 font-semibold flex items-center justify-center gap-2"
                >
                    <ArrowLeft className="size-4" />
                    Voltar para Pagamento
                </Button>

                <Button
                    type="button"
                    onClick={handleConfirmOrder}
                    disabled={isSubmitting}
                    className="flex-1 h-11 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-sm shadow-sky-600/10 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Spinner className="size-5" />
                            <span>Processando Pedido...</span>
                        </>
                    ) : (
                        <>
                            <Lock className="size-4" />
                            <span>Finalizar Compra ($ {grandTotal.toFixed(2)})</span>
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
