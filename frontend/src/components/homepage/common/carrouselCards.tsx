import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { CardItem } from './cardItem'

export function CarrouselCards({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return <p className="text-gray-500 text-sm">Nenhuma carta em destaque no momento.</p>
    }

    return (
        <Carousel
            className="w-full max-w-xs md:max-w-3xl lg:max-w-5xl mx-auto" 
            opts={{
                align: 'start',
            }}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {data.map((item: any, index: number) => (
                    <CarouselItem
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        key={item.card_set_id || index}
                    >
                        <CardItem dataCard={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <section className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
            </section>
        </Carousel>
    )
}