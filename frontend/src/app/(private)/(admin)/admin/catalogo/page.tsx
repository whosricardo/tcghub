import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Catalogo() {
    return (
        <section className='p-8'>
            <section className="flex justify-between">
                <h1 className="text-2xl font-bold text-black">Visualizar catalogo</h1>
                <Button>
                    <Link href={'catalogo/add-product'}>Adicionar produto</Link>
                </Button>
            </section>
        </section>
    )
}
