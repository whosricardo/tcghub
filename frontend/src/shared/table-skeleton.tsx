import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton (){
    return (
        <section className="flex w-full items-center justify-start gap-6">
            <Skeleton className="h-16 w-16 rounded-2xl shrink-0"/>
            <section className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-3 w-3/4"/>
                <Skeleton className="h-3 w-1/2"/>
            </section>
        </section>
    )
}