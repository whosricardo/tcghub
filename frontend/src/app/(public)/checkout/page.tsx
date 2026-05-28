import React from 'react';
import { Metadata } from 'next';
import { CheckoutContent } from '@/components/checkout/CheckoutContent';

export const metadata: Metadata = {
    title: 'Finalizar Compra - TCGHub',
    description: 'Finalize sua compra de cartas TCG de forma rápida e segura no TCGHub.',
};

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-gray-50/50 dark:bg-gray-900/10 py-10">
            <CheckoutContent />
        </main>
    );
}
