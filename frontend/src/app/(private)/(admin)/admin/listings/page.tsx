import { ListingTable } from '@/components/admin/layout/listing-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ListingsPage() {
    return (
        <section className='space-y-10 p-8'>
            <section className="flex justify-between">
                <section className='flex flex-col justify-center gap-1'>
                    <h1 className="text-2xl font-bold text-black">Gerenciar Anúncios</h1>
                    <h2 className="text-sm text-gray-400">Gerencie e publique ofertas de venda de cartas</h2>
                </section>
                
                <Button asChild>
                    <Link href={'/admin/listings/add-listing'}>Adicionar anúncio</Link>
                </Button>
            </section>

            <section className='max-w-4xl'>
                <ListingTable/>
            </section>
        </section>
    )
}
