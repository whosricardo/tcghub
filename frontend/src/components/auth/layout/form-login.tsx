'use client'

import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { UserLock } from 'lucide-react'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useUserLogin } from '../hooks/useUserLogin'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { loginSchema, type LoginType } from '../schemas/loginSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { gentle } from '@/motion/transitions'


export default function FormLogin() {
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const {register , handleSubmit , formState: {errors}} = useForm<LoginType>({
        resolver: zodResolver(loginSchema)
    })
    const { mutate: loginUser, isPending, isError, error } = useUserLogin()
    const router = useRouter()

    const onSubmit = (data: LoginType) => {
        loginUser(data, {
            onSuccess: () => {
                router.push('/')
            },
        })
    }

    return (
        <motion.section 
            initial={{opacity: 0 , y: 20}}
            animate={{opacity: 1 , y: 0}}
            transition={gentle}
            

            className="text-white space-y-7 p-4 md:p-6"
        >
            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white text-shadow-md">
                    Bem vindo de volta!
                </h2>
                <h3 className="text-[0.85rem] font-light text-gray-300">
                    Digite suas credenciais para aproveitar todos os benefícios
                    do <span>TCGhub</span>
                </h3>
            </section>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <section className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="luffy@exemplo.com"
                                className="pl-10 border-gray-600 border py-5 bg-slate-900"
                                autoComplete="off"
                                {...register('email')}
                                required
                            />
                        </section>
                    </Field>

                    {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email.message}</p>
                    )}

                    <Field>
                        <FieldLabel htmlFor="senha">Senha</FieldLabel>
                        <section className="relative">
                            <UserLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="senha"
                                type={!isVisible ? 'text' : 'password'}
                                placeholder="Senha"
                                className="pl-10 pr-10 border-gray-600 border py-5 bg-slate-900 overflow-hidden"
                                autoComplete="off"
                                {...register('password')}
                                required
                            />
                            {isVisible ? (
                                <Eye
                                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                    onClick={() => setIsVisible(false)}
                                />
                            ) : (
                                <EyeOff
                                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                    onClick={() => setIsVisible(true)}
                                />
                            )}
                        </section>
                        {errors.password && (
                            <p className="text-red-500 text-xs">{errors.password.message}</p>
                        )}
                        {isError && (
                            <p className="text-red-500 text-xs">
                                {error.message}
                            </p>
                        )}
                    </Field>
                    <Button type="submit" className="">
                        {isPending ? (
                            <Spinner className="text-white/80 h-6 w-6" />
                        ) : (
                            <span>Entrar</span>
                        )}
                    </Button>
                    <section className="w-full flex justify-center pt-4 border-t border-gray-400">
                        <span className="font-light text-xs">
                            Esqueceu senha?{' '}
                            <span className="font-medium cursor-pointer hover:text-gray-300  transition-all ease-in-out delay-200">
                                Clique aqui!
                            </span>
                        </span>
                    </section>
                </FieldGroup>
            </form>
        </motion.section>
    )
}
