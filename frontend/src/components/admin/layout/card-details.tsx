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
import { useFormContext, Controller } from 'react-hook-form'
import { formAddProductType } from '../schemas/formAddProductSchema'
import { useDebounce } from 'use-debounce'
import { useQueryCardVerification } from '../hooks/useQueryCardVerification'
import { useEffect, useState } from 'react'
import TableSkeleton from '@/shared/table-skeleton'

export function CardDetails() {
    const {
        register,
        control,
        watch,
        formState: { errors },
        setValue,
    } = useFormContext<formAddProductType>()

    const cardNameValue = watch('name') || ''
    const cardType = watch('cardType') || ''
    const [debouncedValue] = useDebounce(cardNameValue, 500)
    const { data: cardSuggestion, isLoading } =
        useQueryCardVerification(debouncedValue, cardType)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    useEffect(() => {
        if (cardNameValue.length > 2) {
            setIsDropdownOpen(true)
        } else {
            setIsDropdownOpen(false)
        }
    }, [cardNameValue])

    function handleSelected(card: any) {
        setValue('name', card.card_name, { shouldValidate: true })
        setValue('cardNumber', card.card_set_id, { shouldValidate: true })
        setValue('rarity', card.rarity, { shouldValidate: true })
        setValue('cost', Number(card.card_cost) || 0, { shouldValidate: true })
        setValue('power', card.card_power, { shouldValidate: true })
        setValue('colors', card.card_color, { shouldValidate: true })
        setValue('collection', card.set_name, { shouldValidate: true })
        setValue('cardType', card.card_type, { shouldValidate: true })
        setValue('counter', card.counter_amount || 0, { shouldValidate: true })
        setValue('combatAttribute', card.attribute, { shouldValidate: true })
        setValue('subTypes', card.sub_types, { shouldValidate: true })
        setValue('description', card.card_text, { shouldValidate: true })

        setIsDropdownOpen(false)
    }

    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300 p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Detalhes da carta</p>
            </section>

            <FieldGroup className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                <section className="">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field className="relative col-span-2">
                            <FieldLabel htmlFor="nomecarta">
                                Nome da carta
                            </FieldLabel>
                            <Input
                                id="nomecarta"
                                type="text"
                                autoComplete="off"
                                placeholder="Carta do luffy"
                                className="border border-gray-300"
                                {...register('name')}
                                onFocus={() => {
                                    if (cardNameValue.length > 2) {
                                        () => setIsDropdownOpen(true)
                                    }
                                }}
                                onBlur={() =>
                                    setTimeout(
                                        () => setIsDropdownOpen(false),
                                        100
                                    )
                                }
                            />

                            {isDropdownOpen && debouncedValue.length > 2 && (
                                <ul className="absolute top-full mt-1 z-50 w-full bg-white border border-gray-200 max-h-60 overflow-y-auto rounded-md shadow-lg">
                                    {isLoading && (
                                        Array.from({length: debouncedValue.length}).map((_ , index) =>(
                                            
                                            <section key={index} className='p-3'>
                                                <TableSkeleton/>
                                            </section>
                                        ))
                                    )}
                                    {cardSuggestion?.length === 0 &&
                                        !isLoading && (
                                            <TableSkeleton/>
                                        )}
                                    {cardSuggestion?.map(
                                        (card: any, index: number) => (
                                            <li
                                                key={card.id || index}
                                                onMouseDown={(e) => {
                                                    e.preventDefault()
                                                    handleSelected(card)
                                                }}
                                                className="p-3 hover:bg-gray-100 border-b last:border-0 text-sm transition-colors cursor-pointer"
                                            >
                                                <section>
                                                    <section>
                                                        {card.card_image && (
                                                            <img
                                                                src={
                                                                    card.card_image
                                                                }
                                                                alt="Imagem da carta"
                                                                className="w-10 h-14 object-cover rounded-sm border border-gray-300"
                                                            />
                                                        )}
                                                        <span>
                                                            {card.card_name}
                                                        </span>
                                                    </section>
                                                    <span>{card.set_name}</span>
                                                </section>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}

                            <div className="min-h-4 mt-1">
                                {errors.name && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.name?.message}
                                    </span>
                                )}
                            </div>
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
                                {...register('cardNumber')}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.cardNumber && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.cardNumber?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="raridade">Raridade</FieldLabel>
                            <Controller
                                control={control}
                                name="rarity"
                                defaultValue={onePieceRarities[0]}
                                render={({ field }) => (
                                    <SelectInput
                                        filter="Raridade"
                                        params={onePieceRarities}
                                        className="border border-gray-300"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.rarity && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.rarity?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="custodacarta">
                                Custo da carta
                            </FieldLabel>
                            <Input
                                id="custodacarta"
                                type="number"
                                placeholder="0"
                                className="border border-gray-300"
                                {...register('cost', { valueAsNumber: true })}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.cost && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.cost?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="poder">Poder</FieldLabel>
                            <Input
                                id="poder"
                                type="text"
                                placeholder="0"
                                className="border border-gray-300"
                                {...register('power')}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.power && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.power?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field className="col-span-2">
                            <FieldLabel htmlFor="cor">Cor</FieldLabel>
                            <Controller
                                control={control}
                                name="colors"
                                defaultValue={onePieceColors[0]}
                                render={({ field }) => (
                                    <SelectInput
                                        filter="Cor"
                                        params={onePieceColors}
                                        className="border border-gray-300"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.colors && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.colors?.message}
                                    </span>
                                )}
                            </div>
                        </Field>
                    </section>
                </section>

                <section className="">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Field className="col-span-2">
                            <FieldLabel htmlFor="edicao">
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
                            <FieldLabel htmlFor="tratamento">
                                Tratamento
                            </FieldLabel>
                            <Controller
                                control={control}
                                name="treatment"
                                defaultValue={onePieceTreatments[0]}
                                render={({ field }) => (
                                    <SelectInput
                                        filter="Tratamento"
                                        className="border border-gray-300"
                                        params={onePieceTreatments}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.treatment && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.treatment?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="tipocarta">
                                Tipo da carta
                            </FieldLabel>
                            <Controller
                                control={control}
                                name="cardType"
                                defaultValue={onePieceCardTypes[0]}
                                render={({ field }) => (
                                    <SelectInput
                                        filter="Tipo da carta"
                                        className="border border-gray-300"
                                        params={onePieceCardTypes}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.cardType && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.cardType?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="counter">Counter</FieldLabel>
                            <Input
                                id="counter"
                                type="number"
                                placeholder="0"
                                className="border border-gray-300"
                                {...register('counter', {
                                    valueAsNumber: true,
                                })}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.counter && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.counter?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="atributocombate">
                                Atributo de combate
                            </FieldLabel>
                            <Controller
                                control={control}
                                name="combatAttribute"
                                defaultValue={onePieceAttributes[0]}
                                render={({ field }) => (
                                    <SelectInput
                                        filter="Atributo de combate"
                                        className="border border-gray-300"
                                        params={onePieceAttributes}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                )}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.combatAttribute && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.combatAttribute?.message}
                                    </span>
                                )}
                            </div>
                        </Field>

                        <Field className="col-span-2">
                            <FieldLabel htmlFor="subtipos">Subtipos</FieldLabel>
                            <Input
                                id="subtipos"
                                type="text"
                                placeholder="e.g Straw hat Crew, Supernovas"
                                {...register('subTypes')}
                            />
                            <div className="min-h-4 mt-1">
                                {errors.subTypes && (
                                    <span className="text-red-500 text-xs flex">
                                        {errors.subTypes?.message}
                                    </span>
                                )}
                            </div>
                        </Field>
                    </section>
                </section>
            </FieldGroup>
        </section>
    )
}
