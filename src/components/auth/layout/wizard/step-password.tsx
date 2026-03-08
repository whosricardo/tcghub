import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/store/authStore'
import { useState, useEffect } from 'react'
import { UserLock } from 'lucide-react'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { Repeat } from 'lucide-react'
import { passwordCheck } from '@/utils/passwordCheck'
import { cn } from '@/lib/utils'

type PasswordState = {
    password: string
    confirmPassword: string
}

type PasswordVisible = {
    password: boolean
    confirmPassword: boolean
}

export default function StepPassword() {
    const { incrementStep, decrementStep, updateUserCredentials, user } =
        useAuth()
    const [credentials, setCredentials] = useState<PasswordState>({
        password: user.password || '',
        confirmPassword: user.password || '',
    })
    const [isVisible, setIsVisible] = useState<PasswordVisible>({
        password: true,
        confirmPassword: true,
    })
    const [error, setError] = useState<string>('')
    const passwordIntense = passwordCheck(credentials.password)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            credentials.password.trim() !== '' &&
            credentials.confirmPassword.trim() !== ''
        ) {
            if (
                credentials.password.trim() ===
                credentials.confirmPassword.trim()
            ) {
                updateUserCredentials({ password: credentials.password })
                incrementStep()
            } else {
                setError('Senha e confirmar senha estão diferentes.')
                return
            }
        } else {
            setError('Por favor, preencha ambos os campos de senha.')
        }
    }

    const handleBack = () => {
        updateUserCredentials({ password: null })
        decrementStep()
    }

    const ChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, password: e.target.value })
        setError('')
    }

    const ChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, confirmPassword: e.target.value })
        setError('')
    }

    const progressColor = (score: number) => {
        if (score === 0) return '[&>div]:bg-sky-300'
        if (score <= 40) return '[&>div]:bg-yellow-400'
        if (score <= 80) return '[&>div]:bg-green-400 saturate-100'
        return '[&>div]:bg-red-700 saturate-150'
    }

    const progressName = (score: number) => {
        if (score === 0) return 'Fraca'
        if (score <= 40) return 'Media'
        if (score <= 80) return 'Forte'
        return 'Yonkou'
    }

    return (
        <section className="space-y-5">
            <section className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-white text-shadow-md">
                    Prepare sua segurança
                </h2>
                <p className="text-sm font-light text-gray-300 break-after-auto">
                    Crie uma senha forte para suas transações.
                </p>
            </section>

            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="senha">Senha</FieldLabel>
                        <section className="relative">
                            <UserLock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="senha"
                                type={!isVisible.password ? 'text' : 'password'}
                                placeholder="Senha"
                                className="pl-10 pr-10 border-gray-600 border py-5 bg-slate-900 overflow-hidden"
                                autoComplete="off"
                                onChange={(e) => ChangePassword(e)}
                                value={credentials?.password}
                                required
                            />
                            {isVisible.password ? (
                                <Eye
                                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                    onClick={() =>
                                        setIsVisible({
                                            ...isVisible,
                                            password: false,
                                        })
                                    }
                                />
                            ) : (
                                <EyeOff
                                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                    onClick={() =>
                                        setIsVisible({
                                            ...isVisible,
                                            password: true,
                                        })
                                    }
                                />
                            )}
                        </section>
                        <Field>
                            <FieldLabel
                                htmlFor="progress-pass"
                                className="flex flex-row justify-between"
                            >
                                <span className="text-xs text-gray-300 text-light">
                                    Intensidade da senha
                                </span>
                                <span className="text-xs">
                                    {progressName(passwordIntense)}
                                </span>
                            </FieldLabel>

                            <Progress
                                value={passwordIntense}
                                id="progress-pass"
                                className={cn(
                                    'transition-all duration-500 ease-in-out bg-gray-200',
                                    progressColor(passwordIntense)
                                )}
                            />
                        </Field>
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="confirmarSenha">
                            Confirmar senha
                        </FieldLabel>
                        <section className="relative">
                            <Repeat className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                id="confirmarSenha"
                                type={
                                    !isVisible.confirmPassword
                                        ? 'text'
                                        : 'password'
                                }
                                placeholder="Confirmar senha"
                                className="pl-10 pr-10 border-gray-600 border py-5 bg-slate-900 overflow-hidden"
                                autoComplete="off"
                                value={credentials?.confirmPassword}
                                onChange={(e) => ChangePasswordConfirm(e)}
                                required
                            />
                            {isVisible.confirmPassword ? (
                                <Eye
                                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                    onClick={() =>
                                        setIsVisible({
                                            ...isVisible,
                                            confirmPassword: false,
                                        })
                                    }
                                />
                            ) : (
                                <EyeOff
                                    className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground cursor-pointer"
                                    onClick={() =>
                                        setIsVisible({
                                            ...isVisible,
                                            confirmPassword: true,
                                        })
                                    }
                                />
                            )}
                        </section>
                        {error && (
                            <span className="text-red-600 text-xs">
                                {error}
                            </span>
                        )}
                    </Field>

                    <section className="w-full flex flex-col lg:flex-row-reverse gap-2">
                        <Button
                            disabled={
                                !credentials.password ||
                                !credentials.confirmPassword
                            }
                            type="submit"
                            className="flex flex-row justify-center items-center shadow-2xl "
                        >
                            <span>Ir para o próximo passo</span>
                            <ArrowRight className="mt-1" />
                        </Button>
                        <Button
                            type="button"
                            onClick={handleBack}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-accent-foreground"
                        >
                            Voltar
                        </Button>
                    </section>
                </FieldGroup>
            </form>
        </section>
    )
}
