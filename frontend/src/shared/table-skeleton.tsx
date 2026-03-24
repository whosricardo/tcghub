import { Skeleton } from "@/components/ui/skeleton";

export default function TableSkeleton (){
    return (
        <section className="flex w-fit items-center gap-4">
            <Skeleton className="h-4 w-25"/>
        </section>
    )
}