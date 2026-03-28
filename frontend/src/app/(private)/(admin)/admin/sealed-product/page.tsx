import { SealedProductTable } from '@/components/admin/layout/sealed-product-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SealedProduct() {
    return (
        <section className='space-y-10 p-8'>
            <section className="flex justify-between">
                <section className='flex flex-col justify-center gap-1'>
                    <h1 className="text-2xl font-bold text-black">Visualizar catálogo</h1>
                    <h2 className="text-sm text-gray-400 break-after-auto">Visualize os produtos selados cadastrados no sistema</h2>
                </section>
                
                <Button>
                    <Link href={'catalogo/add-sealed-product'}>Adicionar produto</Link>
                </Button>
            </section>

            <section className='max-w-4xl'>
                <SealedProductTable/>
            </section>
           
        </section>
    )
}