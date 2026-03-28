'use client'

import { useFormContext } from 'react-hook-form'
import { formAddSealedProductType } from '../schemas/formAddSealedProductSchema'

export function SealedProductDescription() {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext<formAddSealedProductType>()

    const textValue = watch('description') || ''

    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <h2 className="font-semibold text-md mb-4">
                    Descrição do Produto
                </h2>
            </section>

            <section className="flex flex-col p-4 gap-2">
                <textarea
                    className="w-full min-h-24 border text-sm border-gray-400 rounded-lg p-4 outline-none"
                    placeholder="Insira detalhes sobre o conteúdo da Booster Box, Deck, Bundle, etc."
                    {...register('description')}
                ></textarea>

                <section className="ml-auto text-sm flex flex-row items-center justify-between gap-1">
                    <span>Número de caracteres:</span>
                    <span
                        className={`${textValue.length <= 400 ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {textValue.length}
                        <span className="text-black text-sm">/400</span>
                    </span>
                </section>

                {errors.description && (
                    <span className="text-red-500 text-xs">
                        {errors.description?.message}
                    </span>
                )}
            </section>
        </section>
    )
}