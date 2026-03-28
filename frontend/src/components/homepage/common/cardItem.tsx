import { Heart } from "lucide-react"

export function CardItem({ dataCard }: { dataCard: any }) {
    return (
        <section className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow h-full">
            <section className="w-full bg-gray-100 flex items-center justify-center aspect-2.5/3.5 p-2">
                <img 
                    src={dataCard.card_image} 
                    alt={dataCard.card_name} 
                    className="object-contain w-full h-full drop-shadow-md rounded-sm"
                />
            </section>

            <section className="p-4 flex flex-col justify-between flex-1 gap-2">
                <section className="flex justify-between items-start gap-2">
                    <section className="overflow-hidden">
                        <p className="font-bold text-sm text-gray-800 truncate" title={dataCard.card_name}>
                            {dataCard.card_name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {dataCard.set_name} • {dataCard.card_set_id}
                        </p>
                    </section>
                    <button type="button" className="text-gray-300 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart size={18} />
                    </button>
                </section>

                <section className="mt-2 border-t pt-2 border-gray-100">
                    <p className="text-xs text-gray-500">Preço de Mercado</p>
                    <span className="font-bold text-lg text-green-600">
                        ${dataCard.market_price || '0.00'}
                    </span>
                </section>
            </section>
        </section>
    )
}