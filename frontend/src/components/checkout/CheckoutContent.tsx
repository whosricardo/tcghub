"use client";

import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { useCartStore } from '@/store/cartStore';
import { gentle } from '@/motion/transitions';
import { CheckoutStepper } from './CheckoutStepper';
import { CheckoutReviewStep } from './CheckoutReviewStep';
import { CheckoutAddressStep } from './CheckoutAddressStep';
import { CheckoutPaymentStep } from './CheckoutPaymentStep';
import { CheckoutConfirmStep } from './CheckoutConfirmStep';
import { CheckoutSuccessModal } from './CheckoutSuccessModal';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function CheckoutContent() {
    const { step, resetCheckout } = useCheckoutStore();
    const { items } = useCartStore();

    // Reset store state on unmount
    useEffect(() => {
        return () => {
            resetCheckout();
        };
    }, [resetCheckout]);

    if (items.length === 0 && step !== 4) {
        return (
            <div className="max-w-xl mx-auto py-16 px-4 text-center space-y-6">
                <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <ShoppingBag className="size-8" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Seu carrinho está vazio</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        Você não possui itens adicionados ao carrinho para prosseguir com o checkout.
                    </p>
                </div>
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Voltar ao Início
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-2xl p-6 md:p-8 shadow-sm">
                
                {/* Heading Banner */}
                <div className="space-y-1 mb-2">
                    <h1 className="text-2xl md:text-3xl font-black text-gray-950 dark:text-white tracking-tight">
                        Checkout Seguro
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Finalize suas trocas e compras de cartas na plataforma TCGHub.
                    </p>
                </div>

                {/* Animated Stepper */}
                <CheckoutStepper currentStep={step} />

                {/* Multi-step screen transition container */}
                <div className="mt-8 relative overflow-hidden min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step-1"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={gentle}
                            >
                                <CheckoutReviewStep />
                            </motion.div>
                        )}
                        
                        {step === 2 && (
                            <motion.div
                                key="step-2"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={gentle}
                            >
                                <CheckoutAddressStep />
                            </motion.div>
                        )}
                        
                        {step === 3 && (
                            <motion.div
                                key="step-3"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={gentle}
                            >
                                <CheckoutPaymentStep />
                            </motion.div>
                        )}
                        
                        {step === 4 && (
                            <motion.div
                                key="step-4"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={gentle}
                            >
                                <CheckoutConfirmStep />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Success Overlay Trigger */}
            <CheckoutSuccessModal />
        </div>
    );
}
