import { CardTable } from '@/components/admin/layout/card-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Catalogo() {
    return (
        <section className='space-y-10 p-8'>
            <section className="flex justify-between">
                <section className='flex flex-col justify-center gap-1'>
                    <h1 className="text-2xl font-bold text-black">Visualizar catalogo</h1>
                    <h2 className="text-sm text-gray-400 break-after-auto">Visualize as cartas cadastradas no sistema</h2>
                </section>
                
                <Button>
                    <Link href={'catalogo/add-product'}>Adicionar produto</Link>
                </Button>
            </section>
            <CardTable/>
        </section>
    )
}
