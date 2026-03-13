import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import {registerSchema , type registerType } from '../../../schemas/registerSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

interface ModalSharedEmailProps {
    isClosed: () => void;
    setStep: any;
}

const emailSchema = registerSchema.pick({
    email: true,
})

type EmailFormType = z.infer<typeof emailSchema> 

export function ModalSharedEmail({isClosed , setStep}: ModalSharedEmailProps) {
     const {register , handleSubmit , formState: {errors}} = useForm<EmailFormType>({
        resolver: zodResolver(emailSchema)
    })


    function onSubmit(){
        setStep(2);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <Field>
                    <h2 className="text-2xl font-bold">Redefinir Senha</h2>
                    <p className="text-gray-600">
                        Informe seu email cadastrado para receber o código de
                        verificação.
                    </p>
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <section className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="email"
                            type="text"
                            placeholder="luffy@exemplo.com"
                            className="pl-10 border-gray-400 border py-5"
                            autoComplete="off"
                            {...register('email')}
                            required
                        />
                    </section>
                    
                    {errors.email && (
                        <p className="absolute text-red-500 text-xs">
                            {errors.email.message}
                        </p>
                    )}

                    <section className="w-full flex flex-col gap-2 mt-3">
                        <Button
                            type="submit"
                            className="flex flex-row justify-center items-center shadow-2xl py-6"
                        >
                            <span>Ir para o próximo passo</span>
                            <ArrowRight className="mt-1" />
                        </Button>

                        <button
                            type="button"
                            onClick={isClosed}
                            className="flex-1 text-gray-400 hover:text-gray-500"
                        >
                            <section className="flex flex-row justify-center items-center gap-2 cursor-pointer mt-2">
                                <ArrowLeft size={15} className="mt-1" />
                                <p>voltar para login</p>
                            </section>
                        </button>
                    </section>
                </Field>
            </FieldGroup>
        </form>
    )
}
