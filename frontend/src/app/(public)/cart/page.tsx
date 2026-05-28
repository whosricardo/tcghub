import { CartContent } from '@/components/cart/CartContent';
import { Metadata } from 'next';
import Navbar from "@/components/homepage/layout/navbar";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shopping Cart | TCGHub',
  description: 'Seu carrinho de compras na TCGHub.',
};

export default function CartPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="py-8 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              href="/marketplace" 
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Continuar comprando
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
          <CartContent />
        </div>
      </div>
    </main>
  );
}
