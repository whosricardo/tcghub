import { getAllCards } from "@/components/services/getAllCards";
import { useQuery } from "@tanstack/react-query";

export function useQueryAllCards (endpoint:string){
    return useQuery({
        queryKey: ['cards', endpoint],
        queryFn: () => getAllCards(endpoint),
        staleTime: 1000 * 60 * 5,
        select: (data) => data.slice(0,20),
    })
}