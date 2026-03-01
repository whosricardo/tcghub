export default function StepProgress({
    currentStep,
}: {
    currentStep: number | string
}) {
    const stepNumber = Number(currentStep)
    const totalSteps = 4

    return (
        <section className={`flex flex-row gap-2`}>
            {Array.from({ length: totalSteps }).map((_, index) => {
                const stepIndex = index + 1
                return (
                    <div
                        key={stepIndex}
                        className={`h-3 w-3 rounded-full transition-colors ${stepNumber >= stepIndex ? 'bg-blue-500' : 'bg-gray-300'} `}
                    ></div>
                )
            })}
        </section>
    )
}
