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

export function CardDetails() {
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
                            />
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
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="raridade">Raridade</FieldLabel>
                            <SelectInput
                                filter="Raridade"
                                defaultValue={onePieceRarities[0]}
                                params={onePieceRarities}
                                className="border border-gray-300"
                            />
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
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="poder">Poder</FieldLabel>
                            <Input
                                id="poder"
                                type="text"
                                placeholder="0"
                                className="border border-gray-300"
                            />
                        </Field>

                        <Field className="col-span-2">
                            <FieldLabel htmlFor="cor">Cor</FieldLabel>
                            <SelectInput
                                filter="Cor"
                                defaultValue={onePieceColors[0]}
                                params={onePieceColors}
                                className="border border-gray-300"
                            />
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
                            />
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
                            />
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
                            />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="counter">Counter</FieldLabel>
                            <Input
                                id="counter"
                                type="text"
                                placeholder="0"
                                className="border border-gray-300"
                            />
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
                            />
                        </Field>

                        <Field className="col-span-2">
                            <FieldLabel htmlFor="subtipos">Subtipos</FieldLabel>
                            <Input
                                id="subtipos"
                                type="text"
                                placeholder="e.g Straw hat Crew, Supernovas"
                            />
                        </Field>
                    </section>
                </section>
            </FieldGroup>
        </section>
    )
}
