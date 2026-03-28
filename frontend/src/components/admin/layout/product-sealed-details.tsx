'use client'

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import SelectInput from '../common/selectInput'
import { onePieceTcgSetNames } from '@/mockedData/MockedCardDetails'
import { useFormContext, Controller } from 'react-hook-form'
import { formAddSealedProductType } from '../schemas/formAddSealedProductSchema'


const sealedTypesMock = [
    'Booster Box', 
    'Starter Deck', 
    'Booster Pack', 
    'Bundle', 
    'Gift Box',
    'Sleeves',
    'Playmat'
]

export function SealedProductDetails() {
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext<formAddSealedProductType>()

    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Detalhes do produto selado</p>
            </section>

            <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <Field className="col-span-1 md:col-span-2">
                    <FieldLabel htmlFor="nomeproduto">
                        Nome do produto
                    </FieldLabel>
                    <Input
                        id="nomeproduto"
                        type="text"
                        autoComplete="off"
                        placeholder="e.g. OP-05 Awakening of the New Era Booster Box"
                        className="border border-gray-300"
                        {...register('name')}
                    />
                    <div className="min-h-4 mt-1">
                        {errors.name && (
                            <span className="text-red-500 text-xs flex">
                                {errors.name?.message}
                            </span>
                        )}
                    </div>
                </Field>

                <Field>
                    <FieldLabel htmlFor="colecao">
                        Edição / Coleção
                    </FieldLabel>
                    <Controller
                        control={control}
                        name="collection"
                        defaultValue={onePieceTcgSetNames[0]}
                        render={({ field }) => (
                            <SelectInput
                                filter="Edições"
                                className="border border-gray-300"
                                params={onePieceTcgSetNames}
                                value={field.value}
                                onValueChange={field.onChange}
                            />
                        )}
                    />
                    <div className="min-h-4 mt-1">
                        {errors.collection && (
                            <span className="text-red-500 text-xs flex">
                                {errors.collection?.message}
                            </span>
                        )}
                    </div>
                </Field>

                <Field>
                    <FieldLabel htmlFor="tiposelado">
                        Tipo de Selado
                    </FieldLabel>
                    <Controller
                        control={control}
                        name="sealedType"
                        defaultValue={sealedTypesMock[0]}
                        render={({ field }) => (
                            <SelectInput
                                filter="Tipo"
                                className="border border-gray-300"
                                params={sealedTypesMock}
                                value={field.value}
                                onValueChange={field.onChange}
                            />
                        )}
                    />
                    <div className="min-h-4 mt-1">
                        {errors.sealedType && (
                            <span className="text-red-500 text-xs flex">
                                {errors.sealedType?.message}
                            </span>
                        )}
                    </div>
                </Field>
            </FieldGroup>
        </section>
    )
}