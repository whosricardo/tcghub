'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { CardDetails } from '@/components/admin/layout/card-details'
import { CardDescription } from './card-description'
import { FormProvider, useForm } from 'react-hook-form'
import {
    formAddProductSchema,
    formAddProductType,
} from '../schemas/formAddProductSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormCard } from '../hooks/useFormCard'
import { useRouter } from 'next/navigation'

export function FormAddProduct() {
    const router = useRouter();
    const methods = useForm<formAddProductType>({
        resolver: zodResolver(formAddProductSchema),
    })
    const { mutate: registerCard, isPending, isError, error } = useFormCard()

    const onSubmit = (data: formAddProductType) => {
        registerCard(data, {
            onSuccess : () => {
                router.push('/admin/catalogo')
            }
        })
    }

    return (
        <FormProvider {...methods}>
            <form
                className="flex flex-col gap-2"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <header className="flex flex-col md:flex-row justify-start items-center md:justify-between gap-3 mb-3">
                    <section>
                        <h1 className="text-2xl font-bold text-black">
                            Adicionar novo produto{' '}
                        </h1>
                        <p className="text-sm text-gray-400 break-after-auto">
                            Popular banco de dados de cartas/decks/boxes
                        </p>
                    </section>

                    <section className="flex gap-1">
                        <Button type='button' onClick={() => methods.reset()} className="bg-gray-300 hover:bg-gray-400 text-accent-foreground">
                            Descartar
                        </Button>
                        <Button type="submit">
                            {isPending ? (
                                <Spinner className="text-white/80 h-6 w-6" />
                            ) : (
                                <span>Adicionar Produto</span>
                            )}
                        </Button>
                        {isError && (
                            <p className="text-red-500 text-xs">
                                {error.message}
                            </p>
                        )}
                    </section>
                </header>

                <section className="lg:col-span-2 flex flex-col gap-6">
                    <section className="lg:col-span-2 flex">
                        <CardDetails />
                    </section>
                    <CardDescription />
                </section>
            </form>
        </FormProvider>
    )
}
