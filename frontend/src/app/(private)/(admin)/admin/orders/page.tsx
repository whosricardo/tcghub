import { OrderTable } from '@/components/admin/layout/order-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Orders() {
    return (
        <section className='space-y-10 p-8'>
            <section className="flex justify-between">
                <section className='flex flex-col justify-center gap-1'>
                    <h1 className="text-2xl font-bold text-black">Gerenciamento de Pedidos</h1>
                    <h2 className="text-sm text-gray-400 break-after-auto">Visualize os pedidos cadastrados no sistema e cancele-os utilizando a Procedure</h2>
                </section>
                
                <Button disabled title="Criação via Painel Admin será disponibilizada em breve">
                    <span>Novo Pedido</span>
                </Button>
            </section>

            <section className='max-w-4xl'>
                <OrderTable />
            </section>
        </section>
    )
}
