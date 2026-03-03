'use client'
import { useAuth } from '@/store/authStore'
import StepProgress from './wizard/step-progress'
import StepUsername from './wizard/step-username'
import StepEmail from './wizard/step-email'
import StepPassword from './wizard/step-password'
import StepResult from './wizard/step-result'

export default function FormCadastro() {
    const { currentRegisterStep } = useAuth()
    return (
        <section className="flex flex-col w-full h-full gap-3 p-4 md:p-6 justify-center">
            <section className="w-full flex flex-row justify-between">
                <p className="text-sm font-medium text-gray-300 uppercase transition-all ease-in-out delay-300">
                    Passo {currentRegisterStep} de 4
                </p>
                <StepProgress currentStep={currentRegisterStep} />
            </section>

            <section>
                {currentRegisterStep === 1 && <StepUsername />}
                {currentRegisterStep === 2 && <StepEmail />}
                {currentRegisterStep === 3 && <StepPassword />}
                {currentRegisterStep === 4 && <StepResult />}
            </section>
        </section>
    )
}
