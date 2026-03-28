'use client'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import {
    registerSchema,
    registerType,
} from '@/components/auth/schemas/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, Mail, UserLock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useFormUser } from '../hooks/useFormUser'
import { Spinner } from '@/components/ui/spinner'

export function UserAdminRegister({ onClose }: { onClose: () => void }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<registerType>({
        resolver: zodResolver(registerSchema),
    })

    const { mutate: registerUser, isPending, isError, error } = useFormUser()
    const [isVisible, setIsVisible] = useState(false)

    function onSubmit(data: registerType) {
        registerUser(data, {
            onSuccess: () => {
                onClose()
            },
        })
    }

    if (isPending) {
        return (
            <section className="flex min-h-100 items-center justify-center">
                <Spinner className="h-15 w-15 text-sky-600 mx-auto mt-10" />
            </section>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
                    <section className="relative">
                        <Input
                            id="username"
                            type="text"
                            placeholder="Username"
                            className="pr-10 border-gray-300 border py-5 bg-gray-200 overflow-hidden"
                            autoComplete="off"
                            {...register('username')}
                            required
                        />
                        <User className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </section>

                    {errors.username && (
                        <p className="text-red-500 text-xs">
                            {errors.username.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="email">Endereço de email</FieldLabel>
                    <section className="relative">
                        <Input
                            id="email"
                            type="email"
                            placeholder="zorosola@exemplo.com"
                            className="pr-10 border-gray-300 border py-5 bg-gray-200 overflow-hidden"
                            autoComplete="off"
                            {...register('email')}
                            required
                        />
                        <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </section>
                    {errors.email && (
                        <p className="text-red-500 text-xs">
                            {errors.email.message}
                        </p>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="senha">Senha</FieldLabel>
                    <section className="relative">
                        <UserLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="senha"
                            type={isVisible ? 'text' : 'password'}
                            placeholder="Senha"
                            className="pl-10 pr-10 border-gray-300 border py-5 bg-gray-200 overflow-hidden"
                            autoComplete="off"
                            {...register('password')}
                            required
                        />
                        {isVisible ? (
                            <EyeOff
                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                onClick={() => setIsVisible(false)}
                            />
                        ) : (
                            <Eye
                                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                onClick={() => setIsVisible(true)}
                            />
                        )}
                    </section>

                    <section className="w-full flex flex-col-reverse md:flex-row justify-end gap-2">
                        <Button
                            onClick={() => reset()}
                            className=" bg-gray-300 hover:bg-gray-400 text-accent-foreground"
                        >
                            Apagar
                        </Button>
                        <Button type="submit">Enviar</Button>
                    </section>
                </Field>
            </FieldGroup>
        </form>
    )
}
