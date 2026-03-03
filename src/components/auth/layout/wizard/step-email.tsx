import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/store/authStore'
import { useState, useEffect } from 'react'

export default function StepEmail() {
    const { incrementStep, decrementStep, updateUserCredentials, user } =
        useAuth()
    const [email, setEmail] = useState<any>('')

    useEffect(() => {
        if (user.email !== '' && user.email !== null) {
            setEmail(user.email)
        }
        return
    }, [user.email])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (email.trim() !== '') {
            updateUserCredentials({ email })
            incrementStep()
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleBack = () => {
        updateUserCredentials({ email: null })
        decrementStep()
    }

    return (
        <section className="space-y-10">
            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white text-shadow-md">
                    Qual é o seu email?
                </h2>
                <p className="text-sm font-light text-gray-300 break-after-auto">
                    O email é necessário para complementar suas informações e
                    customizar sua experiência na loja.
                </p>
            </section>

            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">
                            Endereço de email
                        </FieldLabel>
                        <section className="relative">
                            <Input
                                id="email"
                                type="email"
                                placeholder="zorosola@exemplo.com"
                                className="pr-10 border-gray-600 border py-5 bg-slate-900 overflow-hidden"
                                autoComplete="off"
                                onChange={(e) => handleChange(e)}
                                value={email}
                                required
                            />
                            <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </section>
                    </Field>

                    <section className="w-full flex flex-col lg:flex-row-reverse gap-2">
                        <Button
                            disabled={!email}
                            type="submit"
                            className="flex flex-row justify-center items-center shadow-2xl"
                        >
                            <span>Ir para o próximo passo</span>
                            <ArrowRight className="mt-1" />
                        </Button>
                        <Button
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
