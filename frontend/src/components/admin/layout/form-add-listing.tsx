'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormProvider, useForm, Controller } from 'react-hook-form'
import {
    formAddListingSchema,
    formAddListingType,
} from '../schemas/formAddListingSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormListing } from '../hooks/useFormListing'
import { useQueryCard } from '../hooks/useQueryCard'
import { getCurrentUser } from '../services/getCurrentUser'
import { useRouter } from 'next/navigation'

export function FormAddListing() {
    const router = useRouter()
    const [supplierId, setSupplierId] = useState<number | null>(null)

    useEffect(() => {
        getCurrentUser().then((user) => {
            if (user) {
                setSupplierId(user.id)
            }
        })
    }, [])

    const methods = useForm<formAddListingType>({
        resolver: zodResolver(formAddListingSchema),
        defaultValues: {
            itemCondition: 'NEAR_MINT',
            productLanguage: 'PORTUGUÊS',
        }
    })

    const { mutate: registerListing, isPending, isError, error } = useFormListing()
    const { data: cardsData, isLoading: isLoadingCards } = useQueryCard({}, 1, 100)

    const onSubmit = (data: formAddListingType) => {
        const finalSupplierId = supplierId || 1
        registerListing(
            {
                productId: Number(data.productId),
                currentPrice: Number(data.currentPrice),
                availableQuantity: Number(data.availableQuantity),
                itemCondition: data.itemCondition,
                productLanguage: data.productLanguage,
                supplierId: finalSupplierId,
            },
            {
                onSuccess: () => {
                    router.push('/admin/listings')
                }
            }
        )
    }

    return (
        <FormProvider {...methods}>
            <form
                className="flex flex-col gap-6"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <header className="flex flex-col md:flex-row justify-start items-center md:justify-between gap-3 mb-3">
                    <section>
                        <h1 className="text-2xl font-bold text-black">
                            Criar Novo Anúncio
                        </h1>
                        <p className="text-sm text-gray-400">
                            Cadastrar oferta de venda de carta para o marketplace
                        </p>
                    </section>

                    <section className="flex gap-2 items-center">
                        <Button
                            type="button"
                            onClick={() => methods.reset()}
                            className="bg-gray-300 hover:bg-gray-400 text-accent-foreground"
                        >
                            Descartar
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <Spinner className="text-white/80 h-6 w-6" />
                            ) : (
                                <span>Criar Anúncio</span>
                            )}
                        </Button>
                    </section>
                </header>

                {isError && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-200 text-sm">
                        {error.message || 'Erro ao registrar anúncio'}
                    </div>
                )}

                <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm bg-white">
                    <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                        <p className="font-semibold text-md">Detalhes do Anúncio</p>
                    </section>

                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                        <Field className="col-span-1 md:col-span-2">
                            <FieldLabel htmlFor="productId">
                                Selecionar Carta do Catálogo
                            </FieldLabel>
                            <Controller
                                control={methods.control}
                                name="productId"
                                render={({ field }) => (
                                    <select
                                        id="productId"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                        disabled={isLoadingCards}
                                    >
                                        <option value="">
                                            {isLoadingCards ? 'Carregando cartas...' : 'Selecione uma carta...'}
                                        </option>
                                        {cardsData?.content?.map((card: any) => (
                                            <option key={card.id} value={card.id}>
                                                {card.name} ({card.collection} - #{card.cardNumber})
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {methods.formState.errors.productId && (
                                    <span className="text-red-500 text-xs flex">
                                        {methods.formState.errors.productId?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="currentPrice">
                                Preço Unitário (R$)
                            </FieldLabel>
                            <Input
                                id="currentPrice"
                                type="number"
                                step="0.01"
                                min="0.01"
                                placeholder="e.g. 4.99"
                                className="border border-gray-300"
                                {...methods.register('currentPrice', { valueAsNumber: true })}
                            />
                            <div className="min-h-4 mt-1">
                                {methods.formState.errors.currentPrice && (
                                    <span className="text-red-500 text-xs flex">
                                        {methods.formState.errors.currentPrice?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="availableQuantity">
                                Quantidade Disponível
                            </FieldLabel>
                            <Input
                                id="availableQuantity"
                                type="number"
                                min="0"
                                placeholder="e.g. 5"
                                className="border border-gray-300"
                                {...methods.register('availableQuantity', { valueAsNumber: true })}
                            />
                            <div className="min-h-4 mt-1">
                                {methods.formState.errors.availableQuantity && (
                                    <span className="text-red-500 text-xs flex">
                                        {methods.formState.errors.availableQuantity?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="itemCondition">
                                Condição da Carta
                            </FieldLabel>
                            <Controller
                                control={methods.control}
                                name="itemCondition"
                                render={({ field }) => (
                                    <select
                                        id="itemCondition"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    >
                                        <option value="NEAR_MINT">Near Mint</option>
                                        <option value="LIGHTLY_PLAYED">Lightly Played</option>
                                        <option value="MODERATELY_PLAYED">Moderately Played</option>
                                        <option value="HEAVILY_PLAYED">Heavily Played</option>
                                        <option value="DAMAGED">Damaged</option>
                                    </select>
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {methods.formState.errors.itemCondition && (
                                    <span className="text-red-500 text-xs flex">
                                        {methods.formState.errors.itemCondition?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="productLanguage">
                                Idioma da Carta
                            </FieldLabel>
                            <Controller
                                control={methods.control}
                                name="productLanguage"
                                render={({ field }) => (
                                    <select
                                        id="productLanguage"
                                        className="w-full p-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    >
                                        <option value="PORTUGUÊS">Português</option>
                                        <option value="ENGLISH">English</option>
                                        <option value="JAPANESE">Japanese</option>
                                        <option value="KOREAN">Korean</option>
                                    </select>
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {methods.formState.errors.productLanguage && (
                                    <span className="text-red-500 text-xs flex">
                                        {methods.formState.errors.productLanguage?.message}
                                    </span>
                                )}
                            </div>
                        </Field>
                    </FieldGroup>
                </section>
            </form>
        </FormProvider>
    )
}
