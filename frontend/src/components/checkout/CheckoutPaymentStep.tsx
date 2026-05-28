"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver as resolver } from '@hookform/resolvers/zod';
import { CreditCard, Wallet, QrCode, Receipt, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { paymentSchema, PaymentType } from '@/types/checkoutSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel, FieldContent, FieldError } from '@/components/ui/field';
import { motion } from 'motion/react';
import { bouncy } from '@/motion/transitions';
import { cn } from '@/lib/utils';
import { PaymentMethod } from '@/types/api';

interface MethodOption {
    id: PaymentMethod;
    title: string;
    description: string;
    icon: React.ReactNode;
}

const paymentMethods: MethodOption[] = [
    {
        id: 'CREDIT_CARD',
        title: 'Cartão de Crédito',
        description: 'Até 12x sem juros (Aprovação imediata)',
        icon: <CreditCard className="size-5" />
    },
    {
        id: 'PIX',
        title: 'Pix',
        description: 'Desconto extra e liberação em minutos',
        icon: <QrCode className="size-5" />
    },
    {
        id: 'BOLETO',
        title: 'Boleto Bancário',
        description: 'Compensação em até 2 dias úteis',
        icon: <Receipt className="size-5" />
    },
    {
        id: 'DEBIT_CARD',
        title: 'Cartão de Débito',
        description: 'Apenas pagamento à vista',
        icon: <CreditCard className="size-5" />
    },
];

export function CheckoutPaymentStep() {
    const { payment, setPayment, nextStep, prevStep } = useCheckoutStore();
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(
        payment?.paymentMethod || 'CREDIT_CARD'
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm<PaymentType>({
        resolver: resolver(paymentSchema),
        defaultValues: payment || {
            paymentMethod: 'CREDIT_CARD',
            cardName: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
        mode: 'onTouched',
    });

    const handleMethodSelect = (method: PaymentMethod) => {
        setSelectedMethod(method);
        setValue('paymentMethod', method, { shouldValidate: true });
    };

    const onSubmit = (data: PaymentType) => {
        // Safe mapping - Zod schema allows nulls for non-card methods
        setPayment(data);
        nextStep();
    };

    const isCardSelected = selectedMethod === 'CREDIT_CARD' || selectedMethod === 'DEBIT_CARD';

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Wallet className="size-5 text-sky-600" />
                Forma de Pagamento
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Selecione a forma de pagamento que deseja utilizar para finalizar a compra.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <input type="hidden" {...register('paymentMethod')} />

                {/* Method Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                        const isSelected = selectedMethod === method.id;

                        return (
                            <motion.div
                                key={method.id}
                                onClick={() => handleMethodSelect(method.id)}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                transition={bouncy}
                                className={cn(
                                    "flex items-start gap-4 p-4 rounded-xl border cursor-pointer select-none transition-all duration-200",
                                    isSelected
                                        ? "bg-sky-50/50 dark:bg-sky-950/10 border-sky-600 shadow-md shadow-sky-600/5 ring-1 ring-sky-600"
                                        : "bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                                )}
                            >
                                <div className={cn(
                                    "p-2 rounded-lg shrink-0",
                                    isSelected
                                        ? "bg-sky-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400"
                                )}>
                                    {method.icon}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                                            {method.title}
                                        </h4>
                                        {isSelected && (
                                            <CheckCircle2 className="size-4 text-sky-600 shrink-0" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {method.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Card Fields (AnimatePresence not strictly required as conditional renders are fast enough, but we make it look outstanding) */}
                {isCardSelected && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-50/50 dark:bg-gray-900/30 p-5 rounded-xl border border-gray-100 dark:border-gray-900 space-y-4"
                    >
                        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Dados do Cartão
                        </h4>

                        {/* Nome no Cartão */}
                        <Field data-invalid={!!errors.cardName}>
                            <FieldLabel htmlFor="cardName">Nome Impresso no Cartão</FieldLabel>
                            <FieldContent>
                                <Input
                                    id="cardName"
                                    placeholder="Ex: LUCAS S MENEZES"
                                    {...register('cardName')}
                                    aria-invalid={!!errors.cardName}
                                />
                                <FieldError errors={[errors.cardName]} />
                            </FieldContent>
                        </Field>

                        {/* Número do Cartão */}
                        <Field data-invalid={!!errors.cardNumber}>
                            <FieldLabel htmlFor="cardNumber">Número do Cartão</FieldLabel>
                            <FieldContent>
                                <Input
                                    id="cardNumber"
                                    placeholder="0000 0000 0000 0000"
                                    maxLength={16}
                                    {...register('cardNumber')}
                                    aria-invalid={!!errors.cardNumber}
                                />
                                <FieldError errors={[errors.cardNumber]} />
                            </FieldContent>
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Data de Validade */}
                            <Field data-invalid={!!errors.expiryDate}>
                                <FieldLabel htmlFor="expiryDate">Validade</FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="expiryDate"
                                        placeholder="MM/AA"
                                        maxLength={5}
                                        {...register('expiryDate')}
                                        aria-invalid={!!errors.expiryDate}
                                    />
                                    <FieldError errors={[errors.expiryDate]} />
                                </FieldContent>
                            </Field>

                            {/* CVV */}
                            <Field data-invalid={!!errors.cvv}>
                                <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                                <FieldContent>
                                    <Input
                                        id="cvv"
                                        placeholder="123"
                                        maxLength={4}
                                        type="password"
                                        {...register('cvv')}
                                        aria-invalid={!!errors.cvv}
                                    />
                                    <FieldError errors={[errors.cvv]} />
                                </FieldContent>
                            </Field>
                        </div>
                    </motion.div>
                )}

                {selectedMethod === 'PIX' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-green-50/30 dark:bg-green-950/10 p-5 rounded-xl border border-green-100/50 dark:border-green-950/30 text-center py-6"
                    >
                        <QrCode className="size-12 mx-auto text-green-600 dark:text-green-400 mb-2" />
                        <h4 className="font-semibold text-green-800 dark:text-green-400 text-sm">
                            Pagamento instantâneo por Pix
                        </h4>
                        <p className="text-xs text-green-600 dark:text-green-500 mt-1 max-w-md mx-auto">
                            O código QR e o código "Copia e Cola" serão gerados no último passo. O processamento é imediato.
                        </p>
                    </motion.div>
                )}

                {selectedMethod === 'BOLETO' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-amber-50/30 dark:bg-amber-950/10 p-5 rounded-xl border border-amber-100/50 dark:border-amber-950/30 text-center py-6"
                    >
                        <Receipt className="size-12 mx-auto text-amber-600 dark:text-amber-400 mb-2" />
                        <h4 className="font-semibold text-amber-800 dark:text-amber-400 text-sm">
                            Pagamento por Boleto Bancário
                        </h4>
                        <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 max-w-md mx-auto">
                            O boleto em PDF será gerado na confirmação. Lembre-se que boletos levam até 48 horas úteis para compensação bancária.
                        </p>
                    </motion.div>
                )}

                {selectedMethod === 'CASH' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-sky-50/30 dark:bg-sky-950/10 p-5 rounded-xl border border-sky-100/50 dark:border-sky-950/30 text-center py-6"
                    >
                        <Wallet className="size-12 mx-auto text-sky-600 dark:text-sky-400 mb-2" />
                        <h4 className="font-semibold text-sky-800 dark:text-sky-400 text-sm">
                            Pagamento em Dinheiro na Retirada
                        </h4>
                        <p className="text-xs text-sky-600 dark:text-sky-500 mt-1 max-w-md mx-auto">
                            Ideal para retirada pessoalmente com vendedores locais credenciados. Combine os detalhes com o vendedor após a confirmação.
                        </p>
                    </motion.div>
                )}

                {/* Back / Next Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-900 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex-1 h-11 font-semibold flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="size-4" />
                        Voltar para Entrega
                    </Button>

                    <Button
                        type="submit"
                        className="flex-1 h-11 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-sm shadow-sky-600/10"
                    >
                        Revisar e Confirmar
                    </Button>
                </div>
            </form>
        </div>
    );
}
