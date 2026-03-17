import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import SelectInput from '../common/selectInput'
import { onePieceTcgSetNames, onePieceCardTypes } from '@/mockedData/MockedCardDetails'



export function CardDetails() {
    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300  p-4 rounded-t-2xl">
                <p className="font-semibold text-md">Detalhes da carta</p>
            </section>

            <FieldGroup className='p-4'>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field className="col-span-2">
                        <FieldLabel htmlFor="nomecarta">
                            Nome da carta
                        </FieldLabel>
                        <Input type="text" placeholder="Carta do luffy" className='border border-gray-300' />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="edicao">
                            Edição / set
                        </FieldLabel>
                        <SelectInput filter='Edições' className='border border-gray-300' params={onePieceTcgSetNames}/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="tipocarta">
                            Tipo da carta
                        </FieldLabel>
                        <SelectInput filter='Tipo da carta' className='border border-gray-300' params={onePieceCardTypes}/>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="hp">
                            Nome da carta
                        </FieldLabel>
                        <Input type="text" placeholder="Carta do luffy" />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="nomecarta">
                            Nome da carta
                        </FieldLabel>
                        <Input type="text" placeholder="Carta do luffy" />
                    </Field>

                </section>
            </FieldGroup>
        </section>
    )
}
