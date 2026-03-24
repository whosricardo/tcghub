'use client'

import { UserAdminRegister } from '@/components/admin/layout/user-admin-register';
import { UserTable } from '@/components/admin/layout/user-table'
import { Button } from '@/components/ui/button'
import { Modal } from '@/shared/modal';
import { useState } from 'react'

export default function Users() {
    const [modalOpen , setModalOpen] = useState(false);
    return (
        <section className="p-8 space-y-10">
            <header className="flex flex-row w-full justify-between">
                <section className='flex flex-col'>
                    <h1 className="text-2xl font-bold text-black">
                        Gestão de usuários
                    </h1>
                    <h2 className="text-md text-gray-400 break-after-auto">
                        Visualize e gerencie os usuário do sistema
                    </h2>
                </section>

                <Button onClick={() => setModalOpen(true)}>
                    Adicionar Usuário
                </Button>
            </header>

            <section className="w-full flex justify-center items-center">
                <UserTable />
            </section>

            <Modal isOpen={modalOpen} isClose={() => setModalOpen(false)}>
                <h1 className='text-xl font-semibold pb-2'>Cadastro de usuários</h1>
                <UserAdminRegister onClose={() => setModalOpen(false)}/>
            </Modal>

        </section>
    )
}
