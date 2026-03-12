'use client'

import FormLogin from '@/components/auth/layout/form-login'
import { ModalForgotPassword } from '@/components/auth/layout/modal/modal-forgot-password';
import { Formprovider } from '@/components/auth/provider/form-provider'
import { useState } from 'react'

export default function Login() {
    const [isModalOpen , setIsModalOpen] = useState<boolean>(false);
    return (
        <section className="w-full h-full">
            <Formprovider>
                <FormLogin modalOpen={isModalOpen} setModalOpen={() => setIsModalOpen(!isModalOpen)} />
            </Formprovider>

            <ModalForgotPassword isOpen={isModalOpen} isClose={() => setIsModalOpen(!isModalOpen)}/>
            
        </section>



        
    )
}
