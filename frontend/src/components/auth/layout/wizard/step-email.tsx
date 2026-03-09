import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mail } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/store/authStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {z} from 'zod';
import { registerSchema } from '../../schemas/registerSchema'

const emailSchema = registerSchema.pick({
    email: true,
})

type EmailFormType = z.infer<typeof emailSchema> 


export default function StepEmail() {
    const { incrementStep, decrementStep, updateUserCredentials, user } =
        useAuth()
    const {register , handleSubmit , formState: {errors}} = useForm<EmailFormType>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: user?.email || '',
        }
    })

    const onSubmit = (data: EmailFormType ) => {
        updateUserCredentials({ email: data.email })
        incrementStep()
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

            <form onSubmit={handleSubmit(onSubmit)}>
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

                    <section className="w-full flex flex-col lg:flex-row-reverse gap-2">
                        <Button
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
