import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const CardDetails = dynamic(() => import('@/components/admin/layout/card-details').then((mod) => mod.CardDetails),
    {
        loading: () => <Spinner className="mx-auto my-auto w-15 h-15 text-sky-600"/>
    }
)

export function FormAddProduct (){
    return (
        <form className="flex flex-col gap-2">
            <header className="flex flex-col md:flex-row justify-start items-center md:justify-between gap-3 mb-3">
                <section>
                    <h1 className="text-2xl font-bold text-black">Adicionar novo produto </h1>
                    <p className="text-sm text-gray-400 break-after-auto">Popular banco de dados de cartas/decks/boxes</p>
                </section>

                <section className="flex gap-1">
                    <Button className="bg-gray-300 hover:bg-gray-400 text-accent-foreground">Descartar</Button>
                    <Button className="">Publicar Produto</Button>
                </section>
            </header>
            
            <section className="lg:col-span-2 flex flex-col gap-6">
                <section className="lg:col-span-2 flex">
                    <CardDetails/>
                </section>

                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4">Abilities & Description</h2>
                    <textarea className="w-full h-24 border rounded"></textarea>
                </section>

            </section>
        </form>
    )
}