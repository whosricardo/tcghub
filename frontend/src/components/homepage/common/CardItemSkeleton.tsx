import { Skeleton } from '@/components/ui/skeleton'

export function CardItemSkeleton() {
    return (
        <section className="flex flex-col border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white h-full min-h-[350px]">
            <section className="w-full bg-gray-100 flex items-center justify-center aspect-2.5/3.5 p-2">
                <Skeleton className="w-full h-full min-h-50 rounded-sm" />
            </section>

            <section className="p-4 flex flex-col justify-between flex-1 gap-2 bg-white">
                <section className="flex justify-between items-start gap-2">
                    <section className="overflow-hidden flex-1 flex flex-col gap-2 mt-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </section>
                    <Skeleton className="h-5 w-5 rounded-md shrink-0 mt-1" />
                </section>

                <section className="mt-4 border-t pt-3 border-gray-100 flex flex-col gap-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-6 w-1/2" />
                </section>
            </section>
        </section>
    )
}
