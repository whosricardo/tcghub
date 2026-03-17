import { CardDetails } from "@/components/admin/layout/card-details";
import { Button } from "@/components/ui/button";

export default function AddProduct (){
    return (
        <section className="flex flex-col gap-2">
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

            <section className="lg:col-span-1 flex flex-col gap-6">
                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4">Card Art</h2>
                    <section className="h-64 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-400">Área de Upload</section>
                </section>

                <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4">Price Estimates (MSRP)</h2>
                    <section className="h-20 bg-gray-50 rounded border border-gray-200"></section>
                </section>

            </section>
        </section>
    )
}