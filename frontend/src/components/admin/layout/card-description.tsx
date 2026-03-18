export function CardDescription() {
    return (
        <section className="w-full flex flex-col border border-gray-300 rounded-2xl shadow-sm">
            <section className="w-full flex justify-start items-center bg-gray-50 border-b border-b-gray-300  p-4 rounded-t-2xl">
                <h2 className="font-semibold text-md mb-4">
                    Abilities & Description
                </h2>
            </section>

            <section className="flex items-center p-4">
                <textarea className="w-full min-h-24 border text-sm border-gray-400 rounded-lg p-4 outline-none" placeholder="Insira uma descrição da carta/produto"></textarea>
            </section>
            
        </section>
    )
}
