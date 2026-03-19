'use client'

import { useFormContext } from 'react-hook-form'
import {
    formAddProductType,
} from '../schemas/formAddProductSchema'

export function CardDescription() {
    const {
        register,
        formState: { errors },
    } = useFormContext<formAddProductType>()


    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300  p-4 rounded-t-2xl">
                <h2 className="font-semibold text-md mb-4">
                    Abilities & Description
                </h2>
            </section>

            <section className="flex flex-col p-4 gap-2">
                <textarea
                    className="w-full min-h-24 border text-sm border-gray-400 rounded-lg p-4 outline-none"
                    placeholder="Insira uma descrição da carta/produto"
                    {...register('description')}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500 text-xs">
                        {errors.description?.message}
                    </span>
                )}
            </section>
        </section>
    )
}
