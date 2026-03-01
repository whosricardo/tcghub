'use client'
import { useAuth } from '@/store/authStore'
import StepProgress from './wizard/step-progress'
import StepUsername from './wizard/step-username'

export default function FormCadastro() {
    const { currentRegisterStep } = useAuth()
    return (
        <section className="flex flex-col w-full h-full gap-8">
            <section className="w-full flex flex-row justify-between">
                <p className="text-sm font-medium text-gray-300 uppercase transition-all ease-in-out delay-300">
                    Passo {currentRegisterStep} de 4
                </p>
                <StepProgress currentStep={currentRegisterStep} />
            </section>

            <section>{currentRegisterStep === 1 && <StepUsername />}</section>
        </section>
    )
}
