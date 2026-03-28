'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { SealedProductDetails } from '@/components/admin/layout/product-sealed-details'
import { SealedProductDescription } from './product-sealed-description'
import { FormProvider, useForm } from 'react-hook-form'
import {
    formAddSealedProductSchema,
    formAddSealedProductType,
} from '../schemas/formAddSealedProductSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormSealedProduct } from '../hooks/useFormSealedProduct'
import { useRouter } from 'next/navigation'

export function FormAddSealedProduct() {
    const router = useRouter();
    const methods = useForm<formAddSealedProductType>({
        resolver: zodResolver(formAddSealedProductSchema),
        defaultValues: {
            name: '',
            collection: '',
            sealedType: '',
            description: ''
        }
    })
    
    const { mutate: registerSealedProduct, isPending, isError, error } = useFormSealedProduct()

    const onSubmit = (data: formAddSealedProductType) => {
        registerSealedProduct(data, {
            onSuccess : () => {
                router.push('/admin/sealed-product')
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
                            Adicionar produto selado{' '}
                        </h1>
                        <p className="text-sm text-gray-400 break-after-auto">
                            Popular banco de dados de produtos selados (booster boxes, decks, etc.)
                        </p>
                    </section>

                    <section className="flex gap-1 items-center">
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
                            <p className="text-red-500 text-xs mt-1">
                                {error.message}
                            </p>
                        )}
                    </section>
                </header>

                <section className="lg:col-span-2 flex flex-col gap-6">
                    <section className="lg:col-span-2 flex">
                        <SealedProductDetails />
                    </section>
                    <SealedProductDescription />
                </section>
            </form>
        </FormProvider>
    )
}