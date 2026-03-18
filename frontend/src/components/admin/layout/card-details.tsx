'use client'

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import SelectInput from '../common/selectInput'
import {
    onePieceTcgSetNames,
    onePieceCardTypes,
    onePieceRarities,
    onePieceColors,
    onePieceTreatments,
    onePieceAttributes,
} from '@/mockedData/MockedCardDetails'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    formAddProductSchema,
    formAddProductType,
} from '../schemas/formAddProductSchema'

export function CardDetails() {
    const {
        register,
        formState: { errors },
    } = useForm<formAddProductType>({
        resolver: zodResolver(formAddProductSchema),
    })

    
    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300  p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Detalhes da carta</p>
            </section>

            <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                <section className="">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field className="col-span-2">
                            <FieldLabel htmlFor="nomecarta">
                                Nome da carta
                            </FieldLabel>
                            <Input
                                id="nomecarta"
                                type="text"
                                placeholder="Carta do luffy"
                                className="border border-gray-300"
                                {...register('nomeCarta')}
                            />
                            {errors.nomeCarta && (
                                <span className="text-red-500 text-xs">
                                    {errors.nomeCarta?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="numerocarta">
                                Número da carta
                            </FieldLabel>
                            <Input
                                id="numerocarta"
                                type="text"
                                placeholder="e.g. 001/188"
                                className="border border-gray-300"
                                {...register('numeroCarta')}
                            />
                            {errors.numeroCarta && (
                                <span className="text-red-500 text-xs">
                                    {errors.numeroCarta?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="raridade">Raridade</FieldLabel>
                            <SelectInput
                                filter="Raridade"
                                defaultValue={onePieceRarities[0]}
                                params={onePieceRarities}
                                className="border border-gray-300"
                                {...register('raridade')}
                            />
                            {errors.raridade && (
                                <span className="text-red-500 text-xs">
                                    {errors.raridade?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="custodacarta">
                                Custo da carta
                            </FieldLabel>
                            <Input
                                id="custodacarta"
                                type="text"
                                placeholder="0"
                                className="border border-gray-300"
                                {...register('custoCarta')}
                            />
                            {errors.custoCarta && (
                                <span className="text-red-500 text-xs">
                                    {errors.custoCarta?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="poder">Poder</FieldLabel>
                            <Input
                                id="poder"
                                type="text"
                                placeholder="0"
                                className="border border-gray-300"
                                {...register('poder')}
                            />
                            {errors.poder && (
                                <span className="text-red-500 text-xs">
                                    {errors.poder?.message}
                                </span>
                            )}
                        </Field>

                        <Field className="col-span-2">
                            <FieldLabel htmlFor="cor">Cor</FieldLabel>
                            <SelectInput
                                filter="Cor"
                                defaultValue={onePieceColors[0]}
                                params={onePieceColors}
                                className="border border-gray-300"
                                {...register('cor')}
                            />
                            {errors.cor && (
                                <span className="text-red-500 text-xs">
                                    {errors.cor?.message}
                                </span>
                            )}
                        </Field>
                    </section>
                </section>

                <section className="">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field className="col-span-2">
                            <FieldLabel htmlFor="edicao">
                                Edição / Coleção
                            </FieldLabel>
                            <SelectInput
                                filter="Edições"
                                className="border border-gray-300"
                                params={onePieceTcgSetNames}
                                defaultValue={onePieceTcgSetNames[0]}
                                {...register('colecao')}
                            />
                            {errors.colecao && (
                                <span className="text-red-500 text-xs">
                                    {errors.colecao?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="tratamento">
                                Tratamento
                            </FieldLabel>
                            <SelectInput
                                filter="Character"
                                className="border border-gray-300"
                                params={onePieceTreatments}
                                defaultValue={onePieceTreatments[0]}
                                {...register('tratamento')}
                            />
                            {errors.tratamento && (
                                <span className="text-red-500 text-xs">
                                    {errors.tratamento?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="tipocarta">
                                Tipo da carta
                            </FieldLabel>
                            <SelectInput
                                filter="Tipo da carta"
                                className="border border-gray-300"
                                params={onePieceCardTypes}
                                defaultValue={onePieceCardTypes[0]}
                                {...register('tipoCarta')}
                            />
                            {errors.tipoCarta && (
                                <span className="text-red-500 text-xs">
                                    {errors.tipoCarta?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="counter">Counter</FieldLabel>
                            <Input
                                id="counter"
                                type="text"
                                placeholder="0"
                                className="border border-gray-300"
                                {...register('counter')}
                            />
                            {errors.counter && (
                                <span className="text-red-500 text-xs">
                                    {errors.counter?.message}
                                </span>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="atributocombate">
                                Atributo de combate
                            </FieldLabel>
                            <SelectInput
                                filter="Atributo de combate"
                                className="border border-gray-300"
                                params={onePieceAttributes}
                                defaultValue={onePieceAttributes[0]}
                                {...register('atributoCombate')}
                            />
                            {errors.atributoCombate && (
                                <span className="text-red-500 text-xs">
                                    {errors.atributoCombate?.message}
                                </span>
                            )}
                        </Field>

                        <Field className="col-span-2">
                            <FieldLabel htmlFor="subtipos">Subtipos</FieldLabel>
                            <Input
                                id="subtipos"
                                type="text"
                                placeholder="e.g Straw hat Crew, Supernovas"
                                {...register('subtipos')}
                            />
                            {errors.subtipos && (
                                <span className="text-red-500 text-xs">
                                    {errors.subtipos?.message}
                                </span>
                            )}
                        </Field>
                    </section>
                </section>
            </FieldGroup>
        </section>
    )
}
