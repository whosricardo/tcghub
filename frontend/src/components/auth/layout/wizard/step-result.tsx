import { Button } from '@/components/ui/button'
import { useAuth } from '@/store/authStore'
import { Pencil } from 'lucide-react'
import { useUserRegister } from '../../hooks/useUserRegister'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'

export default function StepResult() {
    const { decrementStep, user, setStep, resetStep, resetUser } = useAuth()
    const {
        mutate: registerUser,
        isPending,
        isError,
        error,
    } = useUserRegister()
    const router = useRouter()

    const handleConfirm = () => {
        registerUser(user, {
            onSuccess: () => {
                resetUser()
                resetStep()
                router.push('/login')
            },
        })
    }

    return (
        <section className="flex flex-col h-full w-full gap-8 sm:gap-10 md:gap-2">
            <section className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-white text-shadow-md">
                    Revise seus dados
                </h2>
                <p className="text-sm font-light text-gray-300 break-after-auto">
                    Verifique se os dados informados estão correspondentes ao
                    necessário
                </p>
            </section>

            <section className="w-full h-60 aspect-square bg-gray-800 border border-gray-500 rounded-2xl p-8 shadow-2xl">
                <section className="border-b-2 border-b-gray-600 pb-5">
                    <div className="flex flex-row justify-between space-y-3">
                        <h3 className="uppercase text-gray-300 text-sm font-medium">
                            Informações
                        </h3>
                        <div
                            className="flex flex-row items-center gap-2 text-sm text-sky-600 font-medium cursor-pointer"
                            onClick={() => setStep(1)}
                        >
                            <span>Editar</span>
                            <Pencil size={15} />
                        </div>
                    </div>

                    <section className="flex flex-row items-center gap-3">
                        <span className="text-xs text-gray-300 font-medium">
                            Nome completo:
                        </span>
                        <span className="text-sm font-medium">
                            {user.username}
                        </span>
                    </section>

                    <section className="flex flex-row items-center gap-3">
                        <span className="text-xs text-gray-300 font-medium">
                            Email:
                        </span>
                        <span className="text-sm font-medium">
                            {user.email}
                        </span>
                    </section>
                </section>

                <section className="pt-5 space-y-3">
                    <div className="flex flex-row justify-between">
                        <h3 className="uppercase text-gray-300 text-sm font-medium">
                            Segurança
                        </h3>
                        <div
                            className="flex flex-row items-center gap-2 text-sm text-sky-600 font-medium cursor-pointer"
                            onClick={() => setStep(3)}
                        >
                            <span>Editar</span>
                            <Pencil size={15} />
                        </div>
                    </div>

                    <section className="flex flex-row items-center gap-3">
                        <span className="text-xs text-gray-300 font-medium">
                            Senha:
                        </span>
                        <span className="text-sm font-medium">
                            {user.password
                                ? '.'.repeat(user.password.length)
                                : ''}
                        </span>
                    </section>
                </section>
            </section>
            {isError && <p className="text-red-500 text-xs">{error.message}</p>}

            <section className="w-full flex flex-col lg:flex-row-reverse gap-2">
                <Button
                    type="button"
                    className=" flex-1 flex flex-row justify-center items-center shadow-2xl transition-all"
                    onClick={handleConfirm}
                >
                    {isPending ? (
                        <Spinner className="text-white/80 h-6 w-6" />
                    ) : (
                        <span>Cadastrar</span>
                    )}
                </Button>
                <Button
                    onClick={decrementStep}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-accent-foreground"
                >
                    Voltar
                </Button>
            </section>
        </section>
    )
}
