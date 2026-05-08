import { ProductDetails } from "@/components/marketplace/ProductDetails";
import Navbar from "@/components/homepage/layout/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Detalhes da Carta | TCGHub',
    description: 'Veja os detalhes, preços e variações desta carta no marketplace.',
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main className="flex min-h-screen flex-col bg-gray-50/50 dark:bg-background">
            <Navbar />
            <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
                <ProductDetails cardId={id} />
            </div>
        </main>
    );
}
