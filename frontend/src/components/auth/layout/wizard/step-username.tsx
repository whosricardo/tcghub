import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/store/authStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../schemas/registerSchema'
import z from 'zod'


const userSchema = registerSchema.pick({
    username: true
}) 

type UserFormType = z.infer<typeof userSchema>

export default function StepUsername() {
    const { incrementStep, updateUserCredentials } = useAuth()
    const {register , handleSubmit , formState: {errors}} = useForm<UserFormType>({
        resolver: zodResolver(userSchema)
    })

    const onSubmit = (data: UserFormType) => {
            updateUserCredentials({ username: data.username })
            incrementStep()
    }

    return (
        <section className="space-y-10">
            <section className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white text-shadow-md">
                    Vamos começar?
                </h2>
                <p className="text-sm font-light text-gray-300 break-after-auto">
                    Para dar início a sua jornada, escreva seu nome de usuário.
                </p>
            </section>

            <form onSubmit={handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="username">
                            Nome de capitão
                        </FieldLabel>
                        <section className="relative">
                            <Input
                                id="username"
                                type="text"
                                placeholder="Username"
                                className="pr-10 border-gray-600 border py-5 bg-slate-900 overflow-hidden"
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

                    <Button
                        type="submit"
                        className="flex flex-row justify-center items-center shadow-2xl"
                    >
                        <span>Ir para o próximo passo</span>
                        <ArrowRight className="mt-1" />
                    </Button>
                </FieldGroup>
            </form>
        </section>
    )
}
