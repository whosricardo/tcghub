import StepProgress from './wizard/step-progress'

export default function FormCadastro() {
    return (
        <section className="flex flex-col">
            <section className="w-full flex flex-row justify-between">
                <p>step 1 - 4</p>
                <StepProgress currentStep={3} />
            </section>

            <section></section>
        </section>
    )
}
