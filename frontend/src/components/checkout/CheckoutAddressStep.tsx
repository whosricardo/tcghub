"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver as resolver } from '@hookform/resolvers/zod';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { addressSchema, AddressType } from '@/types/checkoutSchemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Field, 
    FieldLabel, 
    FieldContent, 
    FieldError 
} from '@/components/ui/field';

export function CheckoutAddressStep() {
    const { address, setAddress, nextStep, prevStep } = useCheckoutStore();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid } 
    } = useForm<AddressType>({
        resolver: resolver(addressSchema),
        defaultValues: address || {
            fullName: '',
            zipCode: '',
            street: '',
            number: '',
            complement: '',
            neighborhood: '',
            city: '',
            state: '',
            phone: '',
        },
        mode: 'onTouched',
    });

    const onSubmit = (data: AddressType) => {
        setAddress(data);
        nextStep();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="size-5 text-sky-600" />
                Endereço de Entrega
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Insira o endereço de destino para a entrega dos seus pacotes.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Nome Completo */}
                <Field data-invalid={!!errors.fullName}>
                    <FieldLabel htmlFor="fullName">Nome Completo do Destinatário</FieldLabel>
                    <FieldContent>
                        <Input 
                            id="fullName" 
                            placeholder="Ex: Lucas de Souza" 
                            {...register('fullName')} 
                            aria-invalid={!!errors.fullName}
                        />
                        <FieldError errors={[errors.fullName]} />
                    </FieldContent>
                </Field>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* CEP */}
                    <Field data-invalid={!!errors.zipCode} className="md:col-span-1">
                        <FieldLabel htmlFor="zipCode">CEP</FieldLabel>
                        <FieldContent>
                            <Input 
                                id="zipCode" 
                                placeholder="00000-000" 
                                {...register('zipCode')} 
                                aria-invalid={!!errors.zipCode}
                            />
                            <FieldError errors={[errors.zipCode]} />
                        </FieldContent>
                    </Field>

                    {/* Rua */}
                    <Field data-invalid={!!errors.street} className="md:col-span-2">
                        <FieldLabel htmlFor="street">Rua / Avenida</FieldLabel>
                        <FieldContent>
                            <Input 
                                id="street" 
                                placeholder="Ex: Av. Paulista" 
                                {...register('street')} 
                                aria-invalid={!!errors.street}
                            />
                            <FieldError errors={[errors.street]} />
                        </FieldContent>
                    </Field>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Número */}
                    <Field data-invalid={!!errors.number} className="col-span-1">
                        <FieldLabel htmlFor="number">Número</FieldLabel>
                        <FieldContent>
                            <Input 
                                id="number" 
                                placeholder="Ex: 123" 
                                {...register('number')} 
                                aria-invalid={!!errors.number}
                            />
                            <FieldError errors={[errors.number]} />
                        </FieldContent>
                    </Field>

                    {/* Complemento */}
                    <Field data-invalid={!!errors.complement} className="col-span-1 md:col-span-3">
                        <FieldLabel htmlFor="complement">Complemento (Opcional)</FieldLabel>
                        <FieldContent>
                            <Input 
                                id="complement" 
                                placeholder="Ex: Apto 42, Bloco B" 
                                {...register('complement')} 
                                aria-invalid={!!errors.complement}
                            />
                            <FieldError errors={[errors.complement]} />
                        </FieldContent>
                    </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Bairro */}
                    <Field data-invalid={!!errors.neighborhood}>
                        <FieldLabel htmlFor="neighborhood">Bairro</FieldLabel>
                        <FieldContent>
                            <Input 
                                id="neighborhood" 
                                placeholder="Ex: Centro" 
                                {...register('neighborhood')} 
                                aria-invalid={!!errors.neighborhood}
                            />
                            <FieldError errors={[errors.neighborhood]} />
                        </FieldContent>
                    </Field>

                    {/* Cidade */}
                    <Field data-invalid={!!errors.city}>
                        <FieldLabel htmlFor="city">Cidade</FieldLabel>
                        <FieldContent>
                            <Input 
                                id="city" 
                                placeholder="Ex: São Paulo" 
                                {...register('city')} 
                                aria-invalid={!!errors.city}
                            />
                            <FieldError errors={[errors.city]} />
                        </FieldContent>
                    </Field>

                    {/* Estado */}
                    <Field data-invalid={!!errors.state}>
                        <FieldLabel htmlFor="state">Estado (UF)</FieldLabel>
                        <FieldContent>
                            <Input 
                                id="state" 
                                placeholder="Ex: SP" 
                                maxLength={2} 
                                {...register('state')} 
                                aria-invalid={!!errors.state}
                            />
                            <FieldError errors={[errors.state]} />
                        </FieldContent>
                    </Field>
                </div>

                {/* Telefone */}
                <Field data-invalid={!!errors.phone}>
                    <FieldLabel htmlFor="phone">Telefone para Contato</FieldLabel>
                    <FieldContent>
                        <Input 
                            id="phone" 
                            placeholder="Ex: (11) 98765-4321" 
                            {...register('phone')} 
                            aria-invalid={!!errors.phone}
                        />
                        <FieldError errors={[errors.phone]} />
                    </FieldContent>
                </Field>

                <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-900 mt-6">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep}
                        className="flex-1 h-11 font-semibold flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="size-4" />
                        Revisar Itens
                    </Button>
                    
                    <Button 
                        type="submit" 
                        className="flex-1 h-11 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-sm shadow-sky-600/10"
                    >
                        Prosseguir para Pagamento
                    </Button>
                </div>
            </form>
        </div>
    );
}
